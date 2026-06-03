'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import { supabase } from '@/lib/supabase'

const steps = [
  { title: 'Welcome to Vitrix', subtitle: 'Private family finance' },
  { title: 'Set your budget', subtitle: 'Monthly spending limits' },
  { title: 'Add family', subtitle: 'Optional — add members now or later' },
  { title: "You're all set", subtitle: 'Launch your dashboard' },
]

const categories = ['Food', 'Entertainment', 'Transport', 'Shopping', 'Gaming', 'Health']

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [budgets, setBudgets] = useState({ Food: 600, Entertainment: 150, Transport: 300, Shopping: 400, Gaming: 50, Health: 200 })
  const [members, setMembers] = useState([])
  const [newMember, setNewMember] = useState({ name: '', role: 'child', limit: 100 })

  async function finish() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/dashboard')
      return
    }
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (profile?.family_id) {
      const budgetRows = Object.entries(budgets).map(([category, limit]) => ({
        family_id: profile.family_id,
        category,
        limit_amount: limit,
        period: 'monthly',
        is_hard_block: true,
      }))
      await supabase.from('budget_rules').insert(budgetRows)
    }
    router.push('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 520 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}><Logo width={140} /></div>
        <div className="progress-bar" style={{ marginBottom: 24, height: 6 }}>
          <div className="progress-fill" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <div className="card">
          <h2 style={{ fontFamily: 'var(--font-display)', margin: '0 0 8px' }}>{steps[step].title}</h2>
          <p style={{ color: 'var(--text2)', marginBottom: 24 }}>{steps[step].subtitle}</p>

          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Control family spending', 'AI money coach', 'Card lock & alerts', 'Parent approvals'].map(t => (
                <div key={t} style={{ padding: 14, background: 'var(--bg3)', borderRadius: 10, fontSize: 14 }}>{t}</div>
              ))}
            </div>
          )}

          {step === 1 && categories.map(cat => (
            <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span>{cat}</span>
              <input type="number" value={budgets[cat]} onChange={e => setBudgets({ ...budgets, [cat]: Number(e.target.value) })} style={{ width: 100 }} />
            </div>
          ))}

          {step === 2 && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <input placeholder="Name" value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} />
                <input type="number" placeholder="Limit" value={newMember.limit} onChange={e => setNewMember({ ...newMember, limit: Number(e.target.value) })} />
              </div>
              <button type="button" className="btn-ghost" style={{ marginBottom: 12 }} onClick={() => {
                if (!newMember.name) return
                setMembers([...members, newMember])
                setNewMember({ name: '', role: 'child', limit: 100 })
              }}>Add member</button>
              {members.map((m, i) => <div key={i} style={{ fontSize: 13, color: 'var(--text2)' }}>{m.name} — ${m.limit}/mo</div>)}
            </>
          )}

          {step === 3 && <p style={{ color: 'var(--text2)' }}>Vitrix is ready. Your budgets are saved.</p>}
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          {step > 0 && <button type="button" className="btn-ghost" style={{ flex: 1 }} onClick={() => setStep(step - 1)}>Back</button>}
          <button type="button" className="btn-primary" style={{ flex: 2 }} onClick={() => (step === steps.length - 1 ? finish() : setStep(step + 1))}>
            {step === steps.length - 1 ? 'Launch Vitrix' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}
