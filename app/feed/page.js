'use client'
import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { categoryColors } from '@/lib/theme'

const allPosts = [
  { id: 1, author: 'FinanceKing', avatar: 'FK', content: 'Pay yourself first. Before you spend anything, move 20% to savings automatically.', likes: 2840, category: 'Saving', time: '2h ago' },
  { id: 2, author: 'MoneyMom', avatar: 'MM', content: 'The 50/30/20 rule changed my life. 50% needs, 30% wants, 20% savings.', likes: 1920, category: 'Budgeting', time: '4h ago' },
  { id: 3, author: 'TeenInvestor', avatar: 'TI', content: 'Started investing at 16. $50/month in index funds. Compound interest is magic.', likes: 4510, category: 'Investing', time: '6h ago' },
  { id: 4, author: 'DebtFree Dave', avatar: 'DD', content: 'Paid off $34,000 in debt in 18 months using the avalanche method.', likes: 3200, category: 'Debt', time: '8h ago' },
  { id: 5, author: 'CreditQueen', avatar: 'CQ', content: 'Your credit score is a game. Pay on time, keep utilization under 30%.', likes: 1750, category: 'Credit', time: '12h ago' },
  { id: 6, author: 'BudgetBoss', avatar: 'BB', content: '$5/day coffee = $1,825/yr. Invested at 10% for 30 years = $330,000.', likes: 5120, category: 'Saving', time: '1d ago' },
  { id: 7, author: 'IndexFundIan', avatar: 'II', content: 'Stop picking stocks. 90% of fund managers cannot beat the S&P 500.', likes: 8340, category: 'Investing', time: '1d ago' },
  { id: 8, author: 'NoMoreDebt', avatar: 'ND', content: 'Emergency fund first — 3-6 months of expenses in a high yield savings account.', likes: 2890, category: 'Budgeting', time: '2d ago' },
]

export default function Feed() {
  const [liked, setLiked] = useState({})
  const [saved, setSaved] = useState({})
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Saving', 'Budgeting', 'Investing', 'Debt', 'Credit']
  const filtered = filter === 'All' ? allPosts : allPosts.filter(p => p.category === filter)

  return (
    <AppShell title="Finance Feed" subtitle="Learn from the community. Share what you know.">
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 18px', borderRadius: 20, border: '1px solid var(--border)',
              background: filter === f ? 'var(--accent)' : 'var(--card)',
              color: filter === f ? 'var(--bg)' : 'var(--text2)',
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16, marginBottom: 24 }}>
        {filtered.map(post => {
          const catColor = categoryColors[post.category] || 'var(--accent)'
          return (
            <div key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${catColor}, ${catColor}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--bg)', fontWeight: 700, fontSize: 13,
                }}>
                  {post.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{post.author}</div>
                  <div style={{ fontSize: 11, color: 'var(--text2)' }}>{post.time}</div>
                </div>
                <span className="badge badge-gold">{post.category}</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text)', margin: 0 }}>{post.content}</p>
              <div style={{ display: 'flex', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                <button
                  type="button"
                  onClick={() => setLiked(l => ({ ...l, [post.id]: !l[post.id] }))}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: liked[post.id] ? 'var(--danger)' : 'var(--text2)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  {liked[post.id] ? '♥' : '♡'} {post.likes + (liked[post.id] ? 1 : 0)}
                </button>
                <button type="button" style={{ background: 'none', border: 'none', color: 'var(--text2)', fontSize: 13, cursor: 'pointer' }}>Reply</button>
                <button
                  type="button"
                  onClick={() => setSaved(s => ({ ...s, [post.id]: !s[post.id] }))}
                  className={saved[post.id] ? 'btn-ghost' : 'btn-ghost'}
                  style={{ marginLeft: 'auto', padding: '4px 10px', fontSize: 13, background: saved[post.id] ? 'var(--gold-glow)' : undefined }}
                >
                  {saved[post.id] ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card">
        <h4 style={{ color: 'var(--text)', fontWeight: 700, fontSize: 14, margin: '0 0 12px', fontFamily: 'var(--font-display)' }}>Share a finance tip</h4>
        <textarea placeholder="Share something you have learned about money..." rows={3} style={{ marginBottom: 12 }} />
        <button type="button" className="btn-primary">Post tip</button>
      </div>
    </AppShell>
  )
}
