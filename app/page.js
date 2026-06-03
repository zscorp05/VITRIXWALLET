export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(201,168,76,0.08) 0%, transparent 70%)',
      }} />
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <img
          src="/vitrix-logo.png"
          alt="Vitrix"
          style={{ width: 180, height: 'auto', filter: 'invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(0.85)', opacity: 0.9, marginBottom: 28 }}
        />
        <p style={{ color: '#9A9590', fontSize: 16, margin: '0 0 48px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 300 }}>
          Private Family Finance
        </p>
        <a href="/dashboard" style={{
          background: 'linear-gradient(135deg, #C9A84C, #A67C00)',
          color: '#080808',
          padding: '15px 40px',
          borderRadius: 12,
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>Enter</a>
        <div style={{ marginTop: 48, display: 'flex', gap: 32, justifyContent: 'center' }}>
          {['Budget Smarter', 'Invest Earlier', 'Learn Together'].map(f => (
            <span key={f} style={{ fontSize: 11, color: '#5A5550', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  )
}