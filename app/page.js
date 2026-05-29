export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0F1117',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16, margin: '0 auto 20px',
          background: 'linear-gradient(135deg, #6C63FF, #00D4AA)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 800, fontSize: 28
        }}>V</div>
        <h1 style={{ color: 'white', fontSize: 40, fontWeight: 800, margin: '0 0 10px' }}>Vitrix</h1>
        <p style={{ color: '#8B8FA8', fontSize: 18, margin: '0 0 40px' }}>
          Smart family finance — budget, invest, learn
        </p>
        <a href="/dashboard" style={{
          background: 'linear-gradient(135deg, #6C63FF, #8B84FF)',
          color: 'white', padding: '14px 32px', borderRadius: 12,
          textDecoration: 'none', fontWeight: 700, fontSize: 16
        }}>Get started</a>
      </div>
    </div>
  )
}
