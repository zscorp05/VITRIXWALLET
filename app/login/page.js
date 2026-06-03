'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import { supabase } from '@/lib/supabase'
import { validateEmail } from '@/lib/validate'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState('login')
  const [role, setRole] = useState('parent')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function enterDemo() {
    document.cookie = 'vitrix_demo=1; path=/; max-age=86400'
    router.push('/dashboard')
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
        router.push('/onboarding')
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        })
        if (signInError) throw signInError
        document.cookie = 'vitrix_demo=; path=/; max-age=0'
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: 'var(--font-body)', position: 'relative',
    }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(232,201,106,0.08) 0%, transparent 70%)' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Logo width={200} />
          </div>
          <p style={{ color: 'var(--text3)', fontSize: 13, margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Private Family Finance</p>
        </div>

        <div className="card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', background: 'var(--bg3)', borderRadius: 10, padding: 3, marginBottom: 28, gap: 3 }}>
            {['login', 'signup'].map(m => (
              <button key={m} type="button" onClick={() => setMode(m)} style={{
                flex: 1, padding: '9px', borderRadius: 8,
                background: mode === m ? 'var(--gradient-gold)' : 'transparent',
                color: mode === m ? 'var(--bg)' : 'var(--text3)',
                border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
              }}>
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {mode === 'signup' && (
              <>
                <div>
                  <label className="stat-label" style={{ display: 'block', marginBottom: 7 }}>Full Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Erik Rodriguez" />
                </div>
                <div>
                  <label className="stat-label" style={{ display: 'block', marginBottom: 10 }}>I Am A...</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['parent', 'individual', 'teen'].map(r => (
                      <button key={r} type="button" onClick={() => setRole(r)} style={{
                        flex: 1, padding: '10px 6px',
                        background: role === r ? 'var(--gold-glow)' : 'var(--bg3)',
                        border: role === r ? '1px solid var(--accent)' : '1px solid var(--border)',
                        borderRadius: 10, color: role === r ? 'var(--accent)' : 'var(--text3)',
                        cursor: 'pointer', fontWeight: 600, fontSize: 11, textTransform: 'capitalize',
                      }}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            <div>
              <label className="stat-label" style={{ display: 'block', marginBottom: 7 }}>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            </div>
            <div>
              <label className="stat-label" style={{ display: 'block', marginBottom: 7 }}>Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
            </div>

            {error && (
              <div style={{ background: 'rgba(184,107,90,0.15)', border: '1px solid rgba(184,107,90,0.35)', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: 'var(--danger)' }}>
                {error}
              </div>
            )}

            <button type="button" className="btn-primary" onClick={handleSubmit} style={{ marginTop: 8, padding: '13px' }} disabled={loading}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in to Vitrix' : 'Create account'}
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button type="button" onClick={enterDemo} style={{ background: 'none', border: 'none', color: 'var(--text3)', fontSize: 12, cursor: 'pointer' }}>
              Skip — explore demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
