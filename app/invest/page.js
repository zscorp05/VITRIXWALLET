'use client'
import { useState } from 'react'
import AppShell from '@/components/AppShell'

const initStocks = [
  { symbol: 'AAPL', name: 'Apple', price: 189.42, change: 2.3 },
  { symbol: 'GOOGL', name: 'Google', price: 172.15, change: -0.8 },
  { symbol: 'TSLA', name: 'Tesla', price: 248.9, change: 5.1 },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.3, change: 1.2 },
  { symbol: 'NVDA', name: 'Nvidia', price: 875.6, change: 8.4 },
]

export default function Invest() {
  const [tab, setTab] = useState('market')
  const [portfolio, setPortfolio] = useState([])
  const [cash, setCash] = useState(1000)
  const [buying, setBuying] = useState(null)
  const [shares, setShares] = useState(1)

  function buy(stock) {
    const cost = stock.price * shares
    if (cost > cash) return alert('Not enough virtual cash!')
    setCash(c => c - cost)
    setPortfolio(prev => {
      const ex = prev.find(p => p.symbol === stock.symbol)
      if (ex) return prev.map(p => (p.symbol === stock.symbol ? { ...p, shares: p.shares + shares } : p))
      return [...prev, { ...stock, shares }]
    })
    setBuying(null)
    setShares(1)
  }

  return (
    <AppShell title="Invest" subtitle="Learn to invest with virtual money — no risk, real stocks">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Portfolio value', value: `$${portfolio.reduce((s, p) => s + p.price * p.shares, 0).toFixed(2)}`, color: 'var(--success)' },
          { label: 'Virtual cash', value: `$${cash.toFixed(2)}`, color: 'var(--accent)' },
          { label: 'Holdings', value: portfolio.length, color: 'var(--accent3)' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'inline-flex', background: 'var(--bg3)', borderRadius: 12, padding: 4, marginBottom: 24, gap: 4, border: '1px solid var(--border)' }}>
        {['market', 'portfolio', 'learn'].map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            style={{
              padding: '8px 20px', borderRadius: 8, border: 'none',
              background: tab === t ? 'var(--accent)' : 'transparent',
              color: tab === t ? 'var(--bg)' : 'var(--text2)',
              fontWeight: 600, fontSize: 13, cursor: 'pointer', textTransform: 'capitalize',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'market' && (
        <div>
          <div className="badge badge-teal" style={{ marginBottom: 20, padding: '8px 16px' }}>Virtual mode — $1,000 virtual cash. No real money.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {initStocks.map(stock => (
              <div key={stock.symbol} className="card" style={{ padding: '18px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: 'var(--accent)', border: '1px solid var(--border)' }}>{stock.symbol}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{stock.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text2)' }}>{stock.symbol}</div>
                  </div>
                  <div style={{ textAlign: 'right', marginRight: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>${stock.price.toFixed(2)}</div>
                    <div style={{ fontSize: 13, color: stock.change > 0 ? 'var(--success)' : 'var(--danger)' }}>{stock.change > 0 ? '↑' : '↓'} {Math.abs(stock.change)}%</div>
                  </div>
                  <button type="button" className="btn-primary" style={{ padding: '9px 18px' }} onClick={() => setBuying(buying?.symbol === stock.symbol ? null : stock)}>Buy</button>
                </div>
                {buying?.symbol === stock.symbol && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div>
                      <label style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Shares</label>
                      <input type="number" min="1" value={shares} onChange={e => setShares(Number(e.target.value))} style={{ width: 80 }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text2)' }}>Total</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>${(stock.price * shares).toFixed(2)}</div>
                    </div>
                    <button type="button" className="btn-primary" onClick={() => buy(stock)}>Confirm</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'portfolio' && (
        <div className="card">
          <h3 style={{ color: 'var(--text)', fontSize: 16, fontWeight: 700, margin: '0 0 20px', fontFamily: 'var(--font-display)' }}>My holdings</h3>
          {portfolio.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text2)' }}>No holdings yet. Buy your first stock in the Market tab.</div>
          ) : (
            portfolio.map(p => (
              <div key={p.symbol} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, background: 'var(--bg3)', borderRadius: 12, marginBottom: 10, border: '1px solid var(--border)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: 'var(--accent)' }}>{p.symbol}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)' }}>{p.shares} shares</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text)' }}>${(p.price * p.shares).toFixed(2)}</div>
                  <div style={{ fontSize: 12, color: p.change > 0 ? 'var(--success)' : 'var(--danger)' }}>{p.change > 0 ? '+' : ''}{p.change}%</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'learn' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
          {[
            { title: 'What is a stock?', content: 'A stock is a tiny piece of ownership in a company. When you buy Apple stock, you own a small part of Apple.', level: 'Beginner' },
            { title: 'Compound interest', content: 'Earning interest on your interest. $100 at 10%/yr becomes $110 after year 1. Year 2 you earn 10% on $110.', level: 'Beginner' },
            { title: 'Index funds', content: 'Instead of picking one company, you own a tiny piece of 500 companies at once. Less risk, steady growth.', level: 'Intermediate' },
            { title: 'Dollar-cost averaging', content: 'Invest a fixed amount every month regardless of price. Removes emotion from investing.', level: 'Intermediate' },
            { title: 'Diversification', content: "Don't put all your eggs in one basket. Spread investments across sectors.", level: 'Beginner' },
            { title: 'P/E ratio', content: 'Price-to-Earnings ratio shows how much you pay per dollar of profit.', level: 'Advanced' },
          ].map((l, i) => (
            <div key={i} className="card">
              <span className={`badge ${l.level === 'Beginner' ? 'badge-teal' : l.level === 'Intermediate' ? 'badge-amber' : 'badge-red'}`} style={{ marginBottom: 12 }}>{l.level}</span>
              <h4 style={{ color: 'var(--text)', fontWeight: 700, fontSize: 14, margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>{l.title}</h4>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, margin: 0 }}>{l.content}</p>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  )
}
