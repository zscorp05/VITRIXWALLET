'use client'
import { useEffect, useState } from 'react'
import Logo from '@/components/Logo'
import { supabase } from '@/lib/supabase'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [role, setRole] = useState('parent')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('error')) {
      setError('Your confirmation link could not be completed. Try signing in again.')
    }
  }, [])

  function enterDemo() {
    document.cookie = 'vitrix_demo=1; path=/; max-age=86400'
    window.location.href = '/dashboard'
  }

  async function handleSubmit() {
    setLoading(true)
    setError('')
    setNotice('')

    if (!validateEmail(form.email) || form.password.length < 6) {
      setError('Enter a valid email and password (6+ characters).')
      setLoading(false)
      return
    }

    try {
      if (mode === 'signup') {
        if (!form.name.trim()) {
          setError('Please enter your full name.')
          setLoading(false)
          return
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: { name: form.name, role },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (signUpError) throw signUpError
        if (!data.user) throw new Error('Signup failed')

        document.cookie = 'vitrix_demo=; path=/; max-age=0'
        if (data.session) {
          await fetch('/api/profile/bootstrap', { method: 'POST' })
          window.location.href = '/onboarding'
          return
        }
        setNotice('Check your email to confirm your account. After confirmation, Vitrix will open your dashboard.')

      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        })
        if (signInError) throw signInError
        document.cookie = 'vitrix_demo=; path=/; max-age=0'
        await fetch('/api/profile/bootstrap', { method: 'POST' })
        window.location.href = '/dashboard'
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.')
    }
    setLoading(false)
  }

  const label = { fontSize: 11, color: 'var(--text3)', display: 'block', marginBottom: 7, textTransform: 'uppercase', fontWeight: 700 }

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div style={{ marginBottom: 34 }}>
          <Logo width={180} framed={false} />
          <p style={{ color: 'var(--text3)', fontSize: 12, margin: '12px 0 0', textTransform: 'uppercase', fontWeight: 700 }}>
            Private finance workspace
          </p>
        </div>

        <div className="auth-card">
          <div className="segmented-control">
            {['login', 'signup'].map(m => (
              <button key={m} type="button" onClick={() => setMode(m)} className={mode === m ? 'active' : ''}>
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {mode === 'signup' && (
              <>
                <div>
                  <label style={label}>Full Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Erik Rodriguez" />
                </div>
                <div>
                  <label style={label}>Account Type</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {['parent', 'individual', 'teen'].map(r => (
                      <button key={r} type="button" onClick={() => setRole(r)} className={`choice-button ${role === r ? 'active' : ''}`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label style={label}>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            </div>

            <div>
              <label style={label}>Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" />
            </div>

            {notice && <div className="notice-box">{notice}</div>}
            {error && (
              <div className="error-box">
                {error}
              </div>
            )}

            <button type="button" onClick={handleSubmit} disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: 8, opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in to Vitrix' : 'Create account'}
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button type="button" onClick={enterDemo} style={{ background: 'none', border: 'none', color: 'var(--text3)', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>
              Explore demo
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap' }}>
          {['Secure sessions', 'Budget controls', 'Family ready'].map(f => (
            <span key={f} style={{ fontSize: 11, color: '#555870' }}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
