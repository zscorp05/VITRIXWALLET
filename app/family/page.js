'use client'
import { useState } from 'react'
import AppShell from '@/components/AppShell'

const initMembers = [
  { id: 1, name: 'Erik Rodriguez', role: 'parent', avatar: 'ER', spent: 1240, limit: null },
  { id: 2, name: 'Sofia Rodriguez', role: 'child', avatar: 'SR', spent: 85, limit: 150 },
  { id: 3, name: 'Marco Rodriguez', role: 'child', avatar: 'MR', spent: 42, limit: 100 },
]
const txs = [
  { id: 1, description: 'Whole Foods', amount: 87.43, date: '2026-05-25', status: 'approved', user: 'Erik' },
  { id: 2, description: 'Roblox', amount: 25.0, date: '2026-05-24', status: 'blocked', user: 'Sofia' },
  { id: 3, description: 'Amazon', amount: 34.99, date: '2026-05-22', status: 'approved', user: 'Marco' },
  { id: 4, description: 'Fortnite', amount: 19.99, date: '2026-05-19', status: 'pending', user: 'Marco' },
]

export default function Family() {
  const [members, setMembers] = useState(initMembers)
  const [show, setShow] = useState(false)
  const [newM, setNewM] = useState({ name: '', role: 'child', limit: 100 })

  return (
    <AppShell title="Family" subtitle={`${members.length} members`}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
        <button type="button" className="btn-primary" onClick={() => setShow(!show)}>+ Add member</button>
      </div>

      {show && (
        <div className="card-gold" style={{ marginBottom: 24 }}>
          <h4 style={{ color: 'var(--text)', margin: '0 0 16px', fontFamily: 'var(--font-display)' }}>Add family member</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text2)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Name</label>
              <input placeholder="Full name" value={newM.name} onChange={e => setNewM({ ...newM, name: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text2)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Role</label>
              <select value={newM.role} onChange={e => setNewM({ ...newM, role: e.target.value })}>
                <option value="parent">Parent</option>
                <option value="child">Child</option>
                <option value="teen">Teen</option>
              </select>
            </div>
            {newM.role !== 'parent' && (
              <div>
                <label style={{ fontSize: 11, color: 'var(--text2)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Monthly limit ($)</label>
                <input type="number" value={newM.limit} onChange={e => setNewM({ ...newM, limit: Number(e.target.value) })} />
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                if (!newM.name) return
                const i = newM.name.split(' ').map(n => n[0]).join('').toUpperCase()
                setMembers([...members, { id: Date.now(), ...newM, avatar: i, spent: 0 }])
                setShow(false)
                setNewM({ name: '', role: 'child', limit: 100 })
              }}
            >
              Add
            </button>
            <button type="button" className="btn-ghost" onClick={() => setShow(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginBottom: 28 }}>
        {members.map(m => {
          const isKid = m.role !== 'parent'
          const pct = isKid && m.limit ? m.spent / m.limit : 0
          return (
            <div key={m.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                  background: m.role === 'parent' ? 'linear-gradient(135deg, var(--accent), var(--accent2))' : 'linear-gradient(135deg, var(--accent3), var(--warning))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--bg)', fontWeight: 700, fontSize: 15,
                }}>
                  {m.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{m.name}</div>
                  <span className="badge badge-gold">{m.role}</span>
                </div>
                {isKid && (
                  <div style={{ textAlign: 'right' }}>
                    <div className="stat-label">Spent</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: pct > 0.8 ? 'var(--warning)' : 'var(--text)', fontFamily: 'var(--font-display)' }}>${m.spent}</div>
                  </div>
                )}
              </div>
              {isKid && m.limit && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text2)', marginBottom: 6 }}>
                    <span>Monthly limit</span>
                    <span>${m.spent} / ${m.limit}</span>
                  </div>
                  <div className="progress-bar" style={{ marginBottom: 14 }}>
                    <div className="progress-fill" style={{
                      width: `${Math.min(pct * 100, 100)}%`,
                      background: pct > 0.9 ? 'var(--danger)' : pct > 0.7 ? 'var(--warning)' : 'var(--success)',
                    }} />
                  </div>
                </>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                {isKid && <button type="button" className="btn-ghost" style={{ flex: 1, color: 'var(--danger)', borderColor: 'rgba(201,76,76,0.3)' }}>Lock card</button>}
                <button type="button" className="btn-ghost" style={{ flex: 1 }}>Edit</button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card">
        <h3 style={{ color: 'var(--text)', fontSize: 16, fontWeight: 700, margin: '0 0 20px', fontFamily: 'var(--font-display)' }}>Family activity</h3>
        {txs.map(t => (
          <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, marginBottom: 4, borderBottom: '1px solid var(--border)' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: t.status === 'blocked' ? 'rgba(184,107,90,0.15)' : 'var(--gold-glow)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
              color: t.status === 'blocked' ? 'var(--danger)' : 'var(--gold-light)', fontWeight: 700,
            }}>
              {t.status === 'blocked' ? '×' : t.status === 'pending' ? '…' : '✓'}
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{t.user}</span>
              <span style={{ fontSize: 13, color: 'var(--text2)' }}> — {t.description}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.status === 'blocked' ? 'var(--danger)' : 'var(--text)' }}>${t.amount}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{t.date}</div>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
