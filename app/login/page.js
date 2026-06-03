'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState('login')
  const [role, setRole] = useState('parent')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    setTimeout(() => router.push('/dashboard'), 800)
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: 'var(--font-body)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <img src="/vitrix-logo.png" alt="Vitrix" style={{ width: 140, height: 'auto', filter: 'invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(0.85)', opacity: 0.9, marginBottom: 16 }} />
          <p style={{ color: 'var(--text3)', fontSize: 13, margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Private Family Finance</p>
        </div>

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 18, padding: '32px', boxShadow: '0 8px 48px rgba(0,0,0,0.7)' }}>
          <div style={{ display: 'flex', background: 'var(--bg3)', borderRadius: 10, padding: 3, marginBottom: 28, gap: 3 }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: '9px', borderRadius: 8,
                background: mode === m ? 'linear-gradient(135deg, #C9A84C, #A67C00)' : 'transparent',
                color: mode === m ? '#080808' : 'var(--text3)',
                border: 'none', cursor: 'pointer', fontWeight: 700,
                fontSize: 13, fontFamily: 'var(--font-body)', transition: 'all 0.2s',
              }}>
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {mode === 'signup' && (
              <div>
                <label style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: 7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Full Name</label>
                <input placeholder="Erik Rodriguez" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
            )}
            <div>
              <label style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: 7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Email</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: 7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>

            {mode === 'signup' && (
              <div>
                <label style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>I Am A...</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['parent', 'individual', 'teen'].map(r => (
                    <button key={r} onClick={() => setRole(r)} style={{
                      flex: 1, padding: '10px 6px',
                      background: role === r ? 'rgba(201,168,76,0.12)' : 'var(--bg3)',
                      border: role === r ? '1px solid var(--accent)' : '1px solid var(--border)',
                      borderRadius: 10, color: role === r ? 'var(--accent)' : 'var(--text3)',
                      cursor: 'pointer', fontWeight: 600, fontSize: 11,
                      fontFamily: 'var(--font-body)', textTransform: 'capitalize', transition: 'all 0.2s',
                    }}>
                      {r === 'parent' ? '👨‍👩‍👧' : r === 'individual' ? '👤' : '🎓'}<br />{r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className="btn-primary" onClick={handleSubmit} style={{ marginTop: 8, padding: '13px', fontSize: 14 }}>
              {loading ? 'Entering...' : mode === 'login' ? 'Enter Vitrix' : 'Create Account'}
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button onClick={() => router.push('/dashboard')} style={{ background: 'none', border: 'none', color: 'var(--text3)', fontSize: 12, cursor: 'pointer', letterSpacing: '0.04em' }}>
              Skip — explore demo
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, marginTop: 24, justifyContent: 'center' }}>
          {['🔒 Bank-level security', '◆ AI insights', '◉ Family controls'].map(f => (
            <span key={f} style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: '0.04em' }}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  )
}