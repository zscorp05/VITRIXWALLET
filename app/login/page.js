'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 20 }}>V</div>
      <span style={{ color: 'white', fontWeight: 800, fontSize: 24, letterSpacing: '-0.5px' }}>VITRIX</span>
    </div>
  )
}

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [role, setRole] = useState('parent')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function enterDemo() {
    document.cookie = 'vitrix_demo=1; path=/; max-age=86400'
    window.location.href = '/dashboard'
  }

  async function handleSubmit() {
    setLoading(true)
    setError('')

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
          options: { data: { name: form.name, role } },
        })
        if (signUpError) throw signUpError
        if (!data.user) throw new Error('Signup failed')

        const { data: family, error: familyError } = await supabase
          .from('families')
          .insert({ name: `${form.name.split(' ')[0]}'s Family` })
          .select()
          .single()
        if (familyError) throw familyError

        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          name: form.name,
          role,
          family_id: family.id,
          avatar: form.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        })
        if (profileError) throw profileError

        document.cookie = 'vitrix_demo=; path=/; max-age=0'
        window.location.href = '/onboarding'

      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        })
        if (signInError) throw signInError
        document.cookie = 'vitrix_demo=; path=/; max-age=0'
        await new Promise(resolve => setTimeout(resolve, 500))
        window.location.href = '/dashboard'
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.')
    }
    setLoading(false)
  }

  const inp = {
    background: '#222640',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10, color: 'white',
    padding: '12px 14px', fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    outline: 'none', width: '100%',
    boxSizing: 'border-box'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0F1117', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Logo />
          <p style={{ color: '#555870', fontSize: 12, margin: '10px 0 0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Private Family Finance</p>
        </div>

        <div style={{ background: '#1A1D2E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32 }}>
          <div style={{ display: 'flex', background: '#222640', borderRadius: 12, padding: 4, marginBottom: 28, gap: 4 }}>
            {['login', 'signup'].map(m => (
              <button key={m} type="button" onClick={() => setMode(m)} style={{
                flex: 1, padding: '9px', borderRadius: 8, border: 'none',
                background: mode === m ? 'linear-gradient(135deg, #6C63FF, #8B84FF)' : 'transparent',
                color: mode === m ? 'white' : '#555870',
                fontWeight: 700, fontSize: 13, cursor: 'pointer',
                fontFamily: 'Inter, sans-serif'
              }}>
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {mode === 'signup' && (
              <>
                <div>
                  <label style={{ fontSize: 11, color: '#555870', display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>Full Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Erik Rodriguez" style={inp} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: '#555870', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>I Am A...</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['parent', 'individual', 'teen'].map(r => (
                      <button key={r} type="button" onClick={() => setRole(r)} style={{
                        flex: 1, padding: '10px 6px', borderRadius: 10, cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        background: role === r ? 'rgba(108,99,255,0.15)' : '#222640',
                        border: role === r ? '1px solid #6C63FF' : '1px solid rgba(255,255,255,0.08)',
                        color: role === r ? '#6C63FF' : '#555870',
                        fontWeight: 600, fontSize: 12, textTransform: 'capitalize'
                      }}>
                        {r === 'parent' ? '👨‍👩‍👧' : r === 'individual' ? '👤' : '🎓'}<br />{r}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label style={{ fontSize: 11, color: '#555870', display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" style={inp} />
            </div>

            <div>
              <label style={{ fontSize: 11, color: '#555870', display: 'block', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" style={inp} />
            </div>

            {error && (
              <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: '#FF6B6B' }}>
                {error}
              </div>
            )}

            <button type="button" onClick={handleSubmit} disabled={loading} style={{
              background: 'linear-gradient(135deg, #6C63FF, #8B84FF)',
              color: 'white', border: 'none', borderRadius: 12,
              padding: '13px', fontSize: 15, fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif', marginTop: 8,
              opacity: loading ? 0.7 : 1, width: '100%'
            }}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in to Vitrix' : 'Create account'}
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button type="button" onClick={enterDemo} style={{ background: 'none', border: 'none', color: '#555870', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>
              Skip — explore demo
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, display: 'flex', justifyContent: 'center', gap: 20 }}>
          {['🔒 Bank-level security', '🤖 AI powered', '👨‍👩‍👧 Family controls'].map(f => (
            <span key={f} style={{ fontSize: 11, color: '#555870' }}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  )
}