'use client'
import { useState } from 'react'

const budgets = [
  { category: 'Food', spent: 412, limit: 600, color: '#00D4AA' },
  { category: 'Entertainment', spent: 143, limit: 150, color: '#6C63FF' },
  { category: 'Transport', spent: 187, limit: 300, color: '#FFB347' },
  { category: 'Shopping', spent: 312, limit: 400, color: '#FF6B6B' },
  { category: 'Gaming', spent: 45, limit: 50, color: '#60A5FA' },
]

const transactions = [
  { id: 1, description: 'Whole Foods', amount: 87.43, category: 'Food', date: '2026-05-25', status: 'approved', user: 'Erik' },
  { id: 2, description: 'Shell Gas', amount: 62.10, category: 'Transport', date: '2026-05-24', status: 'approved', user: 'Erik' },
  { id: 3, description: 'Roblox', amount: 25.00, category: 'Gaming', date: '2026-05-24', status: 'blocked', user: 'Sofia' },
  { id: 4, description: 'Starbucks', amount: 7.85, category: 'Food', date: '2026-05-23', status: 'approved', user: 'Erik' },
  { id: 5, description: 'Fortnite', amount: 19.99, category: 'Gaming', date: '2026-05-19', status: 'pending', user: 'Marco' },
]

const nav = [
  { href: '/dashboard', label: 'Dashboard', e: '🏠' },
  { href: '/budget', label: 'Budget', e: '📊' },
  { href: '/cards', label: 'Cards', e: '💳' },
  { href: '/family', label: 'Family', e: '👨‍👩‍👧' },
  { href: '/ai-coach', label: 'AI Coach', e: '🤖' },
  { href: '/credit', label: 'Credit Score', e: '⭐' },
  { href: '/invest', label: 'Invest', e: '📈' },
  { href: '/feed', label: 'Finance Feed', e: '📱' },
]

function Sidebar({ active }) {
  return (
    <div style={{ width: 220, background: '#1A1D2E', borderRight: '1px solid rgba(255,255,255,0.08)', padding: '24px 14px', display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'sticky', top: 0, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 16 }}>V</div>
        <span style={{ color: 'white', fontWeight: 800, fontSize: 18 }}>VITRIX</span>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {nav.map(item => (
          <a key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, textDecoration: 'none', background: active === item.href ? 'rgba(108,99,255,0.15)' : 'transparent', color: active === item.href ? '#6C63FF' : '#8B8FA8', fontSize: 14, fontWeight: active === item.href ? 600 : 400 }}>
            <span style={{ fontSize: 16 }}>{item.e}</span>{item.label}
          </a>
        ))}
      </nav>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 12 }}>ER</div>
        <div>
          <div style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>Erik Rodriguez</div>
          <div style={{ color: '#8B8FA8', fontSize: 11 }}>Parent account</div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const pending = transactions.filter(t => t.status === 'pending')
  const [approved, setApproved] = useState([])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0F1117', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar active="/dashboard" />
      <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        <h1 style={{ color: 'white', fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>Good morning, Erik 👋</h1>
        <p style={{ color: '#8B8FA8', fontSize: 14, margin: '0 0 32px' }}>Here's your family financial snapshot for May 2026</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total Spent', value: '$1,240', sub: 'of $2,000 budget', color: '#6C63FF' },
            { label: 'Subscriptions', value: '$145/mo', sub: '6 active', color: '#00D4AA' },
            { label: 'Blocked', value: '1', sub: 'transactions', color: '#FF6B6B' },
            { label: 'Pending', value: pending.length, sub: 'need approval', color: '#FFB347' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#1A1D2E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11, color: '#8B8FA8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#8B8FA8' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, marginBottom: 20 }}>
          <div style={{ background: '#1A1D2E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
            <h3 style={{ color: 'white', fontSize: 16, fontWeight: 700, margin: '0 0 20px' }}>Budget overview</h3>
            {budgets.map(b => {
              const pct = b.spent / b.limit
              return (
                <div key={b.category} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: 'white', fontSize: 13 }}>{b.category}</span>
                    <span style={{ color: pct > 0.85 ? '#FF6B6B' : '#8B8FA8', fontSize: 13 }}>${b.spent} / ${b.limit}</span>
                  </div>
                  <div style={{ height: 6, background: '#222640', borderRadius: 3 }}>
                    <div style={{ height: '100%', borderRadius: 3, width: `${Math.min(pct*100,100)}%`, background: pct > 0.9 ? '#FF6B6B' : pct > 0.7 ? '#FFB347' : b.color }} />
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,170,0.08))', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11, color: '#6C63FF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>🤖 AI Insight</div>
              <p style={{ color: 'white', fontSize: 13, lineHeight: 1.6, margin: 0 }}>You're paying for Netflix + Apple One — $37/mo overlapping. Cancel Netflix and save $16/mo. Entertainment budget is 95% used with 6 days left.</p>
            </div>
            <div style={{ background: '#1A1D2E', border: '1px solid rgba(255,179,71,0.3)', borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#FFB347', marginBottom: 12 }}>⏳ Pending Approvals ({pending.length})</div>
              {pending.map(t => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'white' }}>{t.description}</div>
                    <div style={{ fontSize: 11, color: '#8B8FA8' }}>{t.user} · ${t.amount}</div>
                  </div>
                  <button onClick={() => setApproved([...approved, t.id])} style={{ background: 'rgba(0,212,170,0.15)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.3)', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}>✓</button>
                  <button style={{ background: 'rgba(255,107,107,0.1)', color: '#FF6B6B', border: '1px solid rgba(255,107,107,0.3)', borderRadius: 8, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}>✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: '#1A1D2E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
          <h3 style={{ color: 'white', fontSize: 16, fontWeight: 700, margin: '0 0 20px' }}>Recent transactions</h3>
          {transactions.map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 12px', borderRadius: 10, marginBottom: 4 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'white' }}>{t.description}</div>
                <div style={{ fontSize: 12, color: '#8B8FA8' }}>{t.user} · {t.date}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.status === 'blocked' ? '#FF6B6B' : t.status === 'pending' ? '#FFB347' : 'white' }}>{t.status === 'blocked' ? '🚫 ' : ''}-${t.amount}</div>
                <div style={{ fontSize: 11, color: t.status === 'approved' ? '#00D4AA' : t.status === 'blocked' ? '#FF6B6B' : '#FFB347' }}>{t.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
