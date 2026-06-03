'use client'
import AppShell from '@/components/AppShell'

const score = 724
const change = 12
const history = [688, 695, 701, 710, 708, 715, 718, 724]
const factors = [
  { name: 'Payment history', status: 'good', value: 98, impact: 'High' },
  { name: 'Credit utilization', status: 'fair', value: 34, impact: 'High' },
  { name: 'Credit age', status: 'good', value: 72, impact: 'Medium' },
  { name: 'New inquiries', status: 'good', value: 90, impact: 'Low' },
  { name: 'Credit mix', status: 'fair', value: 55, impact: 'Low' },
]

export default function Credit() {
  const pct = (score - 300) / (850 - 300)
  const color = score >= 740 ? 'var(--success)' : score >= 670 ? 'var(--warning)' : 'var(--danger)'
  const label = score >= 740 ? 'Very Good' : score >= 670 ? 'Good' : 'Fair'

  return (
    <AppShell title="Credit Score" subtitle="Track and improve your credit health">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div className="stat-label" style={{ marginBottom: 20 }}>Your credit score</div>
          <svg viewBox="0 0 200 110" width="200" height="110" style={{ margin: '0 auto 20px', display: 'block' }}>
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--bg3)" strokeWidth="16" strokeLinecap="round" />
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={color} strokeWidth="16" strokeLinecap="round" strokeDasharray={`${pct * 251.2} 251.2`} />
            <text x="100" y="82" textAnchor="middle" fill="var(--text)" fontSize="32" fontWeight="700" fontFamily="var(--font-display)">{score}</text>
            <text x="100" y="102" textAnchor="middle" fill={color} fontSize="12" fontWeight="600">{label}</text>
          </svg>
          <span className="badge badge-teal">↑ +{change} this month</span>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text)', fontSize: 16, fontWeight: 700, margin: '0 0 20px', fontFamily: 'var(--font-display)' }}>Score history</h3>
          <svg viewBox="0 0 300 160" width="100%" height="160">
            {[0, 1, 2, 3].map(i => (
              <line key={i} x1="0" y1={i * 40} x2="300" y2={i * 40} stroke="var(--border)" strokeWidth="1" />
            ))}
            {history.map((s, i) => {
              const x = (i / (history.length - 1)) * 280 + 10
              const y = 140 - ((s - 650) / 100) * 120
              const next = history[i + 1]
              const nx = ((i + 1) / (history.length - 1)) * 280 + 10
              const ny = 140 - ((next - 650) / 100) * 120
              return next ? <line key={i} x1={x} y1={y} x2={nx} y2={ny} stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" /> : null
            })}
            {history.map((s, i) => {
              const x = (i / (history.length - 1)) * 280 + 10
              const y = 140 - ((s - 650) / 100) * 120
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="4" fill="var(--accent)" />
                  <text x={x} y={y - 10} textAnchor="middle" fill="var(--text2)" fontSize="10">{s}</text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ color: 'var(--text)', fontSize: 16, fontWeight: 700, margin: '0 0 20px', fontFamily: 'var(--font-display)' }}>Score factors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
          {factors.map((f, i) => {
            const fc = f.status === 'good' ? 'var(--success)' : 'var(--warning)'
            return (
              <div key={i} style={{ padding: 16, background: 'var(--bg3)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{f.name}</span>
                  <span className={`badge ${f.status === 'good' ? 'badge-teal' : 'badge-amber'}`}>{f.status}</span>
                </div>
                <div className="progress-bar" style={{ marginBottom: 6 }}>
                  <div className="progress-fill" style={{ width: `${f.value}%`, background: fc }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text2)' }}>
                  <span>{f.impact} impact</span>
                  <span>{f.value}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="card-gold">
        <h3 style={{ color: 'var(--text)', fontSize: 16, fontWeight: 700, margin: '0 0 16px', fontFamily: 'var(--font-display)' }}>How to improve</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
          {[
            { tip: 'Keep utilization below 30%', impact: '+20-40 pts', note: 'Currently at 34%' },
            { tip: 'Never miss a payment', impact: '+10-20 pts', note: '98% on-time' },
            { tip: 'Keep oldest accounts open', impact: '+5-15 pts', note: 'Good history' },
            { tip: 'Avoid new credit inquiries', impact: '+5-10 pts', note: 'No recent pulls' },
          ].map((t, i) => (
            <div key={i} className="card" style={{ padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 6 }}>{t.tip}</div>
              <div style={{ fontSize: 12, color: 'var(--success)', marginBottom: 4 }}>Potential: {t.impact}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)' }}>{t.note}</div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
