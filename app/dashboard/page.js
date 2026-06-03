'use client'
import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import { supabase, mockData } from '@/lib/supabase'
import { categoryColors } from '@/lib/theme'

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [subscriptions, setSubscriptions] = useState(mockData.subscriptions)
  const [transactions, setTransactions] = useState(mockData.transactions)
  const [budgets, setBudgets] = useState(mockData.budgets)
  const [loading, setLoading] = useState(true)
  const [aiInsight] = useState("You're spending $45.93/mo on overlapping streaming services. Cancel one duplicate subscription to save ~$22/mo.")

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (prof) {
        setProfile(prof)
        const fid = prof.family_id

        const { data: subs } = await supabase.from('subscriptions').select('*').eq('family_id', fid)
        if (subs?.length) setSubscriptions(subs)

        const { data: txs } = await supabase.from('transactions').select('*').eq('family_id', fid).order('date', { ascending: false }).limit(20)
        if (txs?.length) setTransactions(txs)

        const { data: rules } = await supabase.from('budget_rules').select('*').eq('family_id', fid)
        if (rules?.length) {
          setBudgets(rules.map((r, i) => ({
            id: r.id,
            category: r.category,
            spent: 0,
            limit: r.limit_amount,
            color: Object.values(categoryColors)[i % 6] || '#C9A84C',
          })))
        }
      }
      setLoading(false)
    }
    loadData()
  }, [])

  async function handleApproval(t, action) {
    const { data: { user } } = await supabase.auth.getUser()
    if (user && t.id) {
      await fetch('/api/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: t.id,
          action,
          parentEmail: user.email,
          parentName: profile?.name || mockData.user.name,
          kidName: t.user || t.user_id || 'Family member',
          amount: t.amount,
          description: t.description,
        }),
      })
    }
    setTransactions(prev => prev.map(tx => (tx.id === t.id ? { ...tx, status: action === 'approve' ? 'approved' : 'blocked' } : tx)))
  }

  const displayName = profile?.name?.split(' ')[0] || mockData.user.name.split(' ')[0]
  const totalSubs = subscriptions.reduce((s, x) => s + (x.amount || 0), 0)
  const totalSpent = transactions.filter(t => t.status === 'approved').reduce((s, t) => s + (t.amount || 0), 0)
  const blocked = transactions.filter(t => t.status === 'blocked').length
  const pending = transactions.filter(t => t.status === 'pending').length

  if (loading) {
    return (
      <AppShell title="Dashboard">
        <p style={{ color: 'var(--text2)' }}>Loading your overview...</p>
      </AppShell>
    )
  }

  return (
    <AppShell title="Dashboard">
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'var(--text)', margin: '0 0 4px' }}>
          Good morning, {displayName}
        </h2>
        <p style={{ color: 'var(--text3)', fontSize: 13, margin: 0 }}>Family financial overview</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total Spent', value: `$${totalSpent.toFixed(0)}`, sub: 'approved', color: 'var(--accent)', pct: totalSpent / 2000 },
          { label: 'Subscriptions', value: `$${totalSubs.toFixed(0)}/mo`, sub: `${subscriptions.length} active`, color: 'var(--accent3)', pct: null },
          { label: 'Blocked', value: blocked, sub: 'transactions', color: 'var(--danger)', pct: null },
          { label: 'Pending Review', value: pending, sub: 'need approval', color: 'var(--warning)', pct: null },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{s.sub}</div>
            {s.pct !== null && (
              <div className="progress-bar" style={{ marginTop: 10 }}>
                <div className="progress-fill" style={{ width: `${Math.min(s.pct * 100, 100)}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, marginBottom: 20 }}>
        <div className="card">
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, margin: '0 0 20px' }}>Budget Overview</h3>
          {budgets.map(b => {
            const pct = b.spent / b.limit
            return (
              <div key={b.id || b.category} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ fontSize: 13, color: 'var(--text2)' }}>{b.category}</span>
                  <span style={{ fontSize: 12, color: 'var(--text3)' }}>${b.spent} / ${b.limit}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.min(pct * 100, 100)}%` }} />
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card-gold">
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', marginBottom: 8, textTransform: 'uppercase' }}>Vitrix AI Insight</div>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>{aiInsight}</p>
          </div>

          {pending > 0 && (
            <div className="card">
              <div className="stat-label" style={{ marginBottom: 14 }}>Pending approvals ({pending})</div>
              {transactions.filter(t => t.status === 'pending').map(t => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{t.description}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>${t.amount}</div>
                  </div>
                  <button type="button" className="btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => handleApproval(t, 'approve')}>Approve</button>
                  <button type="button" className="btn-ghost" style={{ padding: '4px 10px', fontSize: 12, color: 'var(--danger)' }} onClick={() => handleApproval(t, 'deny')}>Deny</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, margin: '0 0 20px' }}>Recent Transactions</h3>
        {transactions.map(t => (
          <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{t.description}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t.user || 'Family'} · {t.date?.slice?.(0, 10) || t.date}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600 }}>${Number(t.amount).toFixed(2)}</div>
              <span className={`badge badge-${t.status === 'approved' ? 'gold' : t.status === 'blocked' ? 'red' : 'amber'}`}>{t.status}</span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
