import Logo from '@/components/Logo'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(232,201,106,0.1) 0%, transparent 70%)',
      }} />
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <Logo width={220} />
        </div>
        <p style={{ color: 'var(--text2)', fontSize: 16, margin: '0 0 48px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 300 }}>
          Private Family Finance
        </p>
        <a href="/dashboard" className="btn-primary" style={{
          padding: '15px 40px',
          borderRadius: 12,
          textDecoration: 'none',
          fontSize: 14,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          display: 'inline-block',
        }}>Enter</a>
        <div style={{ marginTop: 48, display: 'flex', gap: 32, justifyContent: 'center' }}>
          {['Budget Smarter', 'Invest Earlier', 'Learn Together'].map(f => (
            <span key={f} style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  )
}