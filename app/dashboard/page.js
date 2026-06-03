'use client'
import AppShell from '@/components/AppShell'
import { mockData } from '@/lib/supabase'
import { useState } from 'react'

const categoryColors = {
  Food: '#C9A84C', Entertainment: '#A67C00', Transport: '#E8C96A',
  Shopping: '#C94C4C', Gaming: '#4CAF7C', Health: '#C9894C'
}

export default function Dashboard() {
  const { subscriptions, transactions, budgets, user } = mockData
  const totalSubs = subscriptions.reduce((s, x) => s + x.amount, 0)
  const totalSpent = transactions.filter(t => t.status === 'approved').reduce((s, t) => s + t.amount, 0)
  const blocked = transactions.filter(t => t.status === 'blocked').length
  const pending = transactions.filter(t => t.status === 'pending').length
  const [aiInsight] = useState("You're spending $45.93/mo on overlapping streaming services. Switching to Apple One only could save ~$21/mo. Sofia is also approaching her gaming limit with 3 days left this month.")

  return (
    <AppShell title="Dashboard">
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'var(--text)', margin: '0 0 4px' }}>
          Good morning, {user.name.split(' ')[0]}
        </h2>
        <p style={{ color: 'var(--text3)', fontSize: 13, margin: 0, letterSpacing: '0.03em' }}>Family financial overview · May 2026</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total Spent', value: `$${totalSpent.toFixed(0)}`, sub: 'of $2,000 budget', color: 'var(--accent)', pct: totalSpent / 2000 },
          { label: 'Subscriptions', value: `$${totalSubs.toFixed(0)}/mo`, sub: `${subscriptions.length} active`, color: 'var(--accent3)', pct: null },
          { label: 'Blocked', value: blocked, sub: 'transactions', color: 'var(--danger)', pct: null },
          { label: 'Pending Review', value: pending, sub: 'need approval', color: 'var(--warning)', pct: null },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${s.color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{s.sub}</div>
            {s.pct !== null && <div className="progress-bar" style={{ marginTop: 10 }}><div className="progress-fill" style={{ width: `${Math.min(s.pct * 100, 100)}%` }} /></div>}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, marginBottom: 20 }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, margin: 0 }}>Budget Overview</h3>
            <span className="badge badge-gold">May 2026</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {budgets.map(b => {
              const pct = b.spent / b.limit
              return (
                <div key={b.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text2)' }}>{b.category}</span>
                    <span style={{ fontSize: 12, color: pct > 0.85 ? 'var(--danger)' : 'var(--text3)' }}>${b.spent} / ${b.limit}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min(pct * 100, 100)}%`, background: pct > 0.9 ? 'var(--danger)' : pct > 0.7 ? 'var(--warning)' : 'linear-gradient(90deg, var(--accent2), var(--accent))' }} />
                  </div>
                  {pct > 0.85 && <div style={{ fontSize: 11, color: 'var(--danger)', marginTop: 4 }}>⚠ {Math.round(pct * 100)}% used</div>}
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card-gold">
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: 'linear-gradient(135deg, #C9A84C, #A67C00)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>◆</div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vitrix AI Insight</div>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>{aiInsight}</p>
              </div>
            </div>
          </div>

          {pending > 0 && (
            <div className="card" style={{ border: '1px solid rgba(201,137,76,0.25)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--warning)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Pending Approvals ({pending})</div>
              {transactions.filter(t => t.status === 'pending').map(t => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{t.description}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t.user} · ${t.amount}</div>
                  </div>
                  <button style={{ background: 'rgba(76,175,124,0.12)', color: 'var(--success)', border: '1px solid rgba(76,175,124,0.25)', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}>✓</button>
                  <button style={{ background: 'rgba(201,76,76,0.1)', color: 'var(--danger)', border: '1px solid rgba(201,76,76,0.25)', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, margin: 0 }}>Recent Transactions</h3>
          <button className="btn-ghost" style={{ padding: '6px 14px', fontSize: 12 }}>View all</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {transactions.map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 12px', borderRadius: 10, transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: (categoryColors[t.category] || '#C9A84C') + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                {t.category === 'Food' ? '🍔' : t.category === 'Transport' ? '🚗' : t.category === 'Gaming' ? '🎮' : t.category === 'Shopping' ? '🛍️' : t.category === 'Entertainment' ? '🎬' : '💳'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{t.description}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t.user} · {t.date}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.status === 'blocked' ? 'var(--danger)' : t.status === 'pending' ? 'var(--warning)' : 'var(--text)' }}>
                  {t.status === 'blocked' ? '🚫 ' : ''}-${t.amount.toFixed(2)}
                </div>
                <span className={`badge badge-${t.status === 'approved' ? 'teal' : t.status === 'blocked' ? 'red' : 'amber'}`} style={{ fontSize: 10 }}>{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}