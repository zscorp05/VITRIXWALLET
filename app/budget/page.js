'use client'
import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { supabase } from '@/lib/supabase'
import { chartColors, categoryColors } from '@/lib/theme'

async function checkAlerts(updatedBudgets, userEmail, userName) {
  if (!userEmail) return
  for (const b of updatedBudgets) {
    const pct = b.spent / b.limit
    if (pct >= 0.8) {
      await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          memberName: userName,
          category: b.category,
          spent: b.spent,
          limit: b.limit,
        }),
      }).catch(() => {})
    }
  }
}

const initial = [
  { category: 'Food', spent: 412, limit: 600, color: categoryColors.Food },
  { category: 'Entertainment', spent: 143, limit: 150, color: categoryColors.Entertainment },
  { category: 'Transport', spent: 187, limit: 300, color: categoryColors.Transport },
  { category: 'Shopping', spent: 312, limit: 400, color: categoryColors.Shopping },
  { category: 'Gaming', spent: 45, limit: 50, color: categoryColors.Gaming },
]

export default function Budget() {
  const [budgets, setBudgets] = useState(initial)
  const [show, setShow] = useState(false)
  const [newB, setNewB] = useState({ category: 'Food', limit: '', period: 'monthly', block: true })

  return (
    <AppShell title="Budget" subtitle="Set spending limits and rules for your family">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
        <button type="button" className="btn-primary" onClick={() => setShow(!show)}>+ Add rule</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total budget', value: `$${budgets.reduce((s, b) => s + b.limit, 0)}`, color: 'var(--accent)' },
          { label: 'Total spent', value: `$${budgets.reduce((s, b) => s + b.spent, 0)}`, color: 'var(--danger)' },
          { label: 'Remaining', value: `$${budgets.reduce((s, b) => s + (b.limit - b.spent), 0)}`, color: 'var(--success)' },
          { label: 'Categories', value: budgets.length, color: 'var(--accent3)' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {show && (
        <div className="card-gold" style={{ marginBottom: 24 }}>
          <h4 style={{ color: 'var(--text)', margin: '0 0 16px', fontFamily: 'var(--font-display)' }}>New budget rule</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text2)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Category</label>
              <select value={newB.category} onChange={e => setNewB({ ...newB, category: e.target.value })}>
                {['Food', 'Entertainment', 'Transport', 'Shopping', 'Gaming', 'Health', 'Education', 'Utilities'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text2)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Limit ($)</label>
              <input type="number" placeholder="500" value={newB.limit} onChange={e => setNewB({ ...newB, limit: Number(e.target.value) })} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text2)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Period</label>
              <select value={newB.period} onChange={e => setNewB({ ...newB, period: e.target.value })}>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text2)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Action</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[true, false].map(v => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => setNewB({ ...newB, block: v })}
                    className={newB.block === v ? 'btn-ghost' : 'btn-ghost'}
                    style={{
                      flex: 1,
                      padding: '9px',
                      background: newB.block === v ? 'var(--gold-glow)' : 'var(--bg3)',
                      color: newB.block === v ? 'var(--accent)' : 'var(--text3)',
                    }}
                  >
                    {v ? 'Block' : 'Alert'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              className="btn-primary"
              onClick={async () => {
                if (!newB.limit) return
                const next = [...budgets, { ...newB, spent: 0, color: chartColors[budgets.length % chartColors.length] }]
                setBudgets(next)
                setShow(false)
                setNewB({ category: 'Food', limit: '', period: 'monthly', block: true })
                const { data: { user } } = await supabase.auth.getUser()
                const { data: profile } = user ? await supabase.from('profiles').select('name').eq('id', user.id).single() : { data: null }
                checkAlerts(next.filter(b => b.spent / b.limit >= 0.8), user?.email, profile?.name)
              }}
            >
              Save rule
            </button>
            <button type="button" className="btn-ghost" onClick={() => setShow(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
        {budgets.map((b, i) => {
          const pct = b.spent / b.limit
          const status = pct >= 1 ? 'exceeded' : pct > 0.85 ? 'warning' : 'ok'
          return (
            <div
              key={i}
              className="card"
              style={{
                borderColor: status === 'exceeded' ? 'rgba(201,76,76,0.4)' : status === 'warning' ? 'rgba(201,137,76,0.3)' : undefined,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{b.category}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>{b.period || 'monthly'} budget</div>
                </div>
                {b.block && <span className="badge badge-red">Block</span>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: b.color, fontFamily: 'var(--font-display)' }}>${b.spent}</span>
                <span style={{ fontSize: 14, color: 'var(--text2)', alignSelf: 'flex-end' }}>/ ${b.limit}</span>
              </div>
              <div className="progress-bar" style={{ marginBottom: 8 }}>
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min(pct * 100, 100)}%`,
                    background: status === 'exceeded' ? 'var(--danger)' : status === 'warning' ? 'var(--warning)' : undefined,
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: 'var(--text2)' }}>{Math.round(pct * 100)}% used</span>
                <span style={{ color: status === 'exceeded' ? 'var(--danger)' : status === 'warning' ? 'var(--warning)' : 'var(--success)' }}>
                  {status === 'exceeded' ? 'Exceeded' : status === 'warning' ? 'Near limit' : `$${b.limit - b.spent} left`}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </AppShell>
  )
}
