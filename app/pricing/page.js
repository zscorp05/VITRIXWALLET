'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { supabase } from '@/lib/supabase'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    priceId: null,
    features: ['1 parent account', 'Basic budgets', 'Finance feed', 'AI coach (limited)'],
  },
  {
    name: 'Family',
    price: '$9.99',
    period: 'per month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_FAMILY_PRICE_ID || '',
    popular: true,
    features: ['Up to 6 family members', 'Card locking', 'Budget email alerts', 'Full AI coach', 'Parent approvals'],
  },
  {
    name: 'Premium',
    price: '$14.99',
    period: 'per month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID || '',
    features: ['Everything in Family', 'Advanced reports', 'Priority support', 'Unlimited members'],
  },
]

export default function Pricing() {
  const router = useRouter()
  const [loading, setLoading] = useState(null)

  async function subscribe(plan) {
    if (!plan.priceId) {
      router.push('/login')
      return
    }
    setLoading(plan.name)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: plan.priceId, email: user.email }),
    })
    const data = await res.json()
    if (data.url) globalThis.location.assign(data.url)
    setLoading(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '60px 20px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Link href="/" style={{ color: 'var(--text2)', fontSize: 14, textDecoration: 'none' }}>← Back</Link>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}><Logo width={160} /></div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--text)', margin: '0 0 12px' }}>Simple pricing</h1>
          <p style={{ color: 'var(--text2)' }}>Start free. Upgrade when your family is ready.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
          {plans.map(plan => (
            <div key={plan.name} className="card" style={{ border: plan.popular ? '1px solid var(--border2)' : undefined }}>
              {plan.popular && <span className="badge badge-gold" style={{ marginBottom: 12 }}>Most popular</span>}
              <div style={{ fontSize: 14, color: 'var(--text2)' }}>{plan.name}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--accent)', margin: '8px 0 20px' }}>{plan.price}</div>
              <ul style={{ padding: 0, listStyle: 'none', margin: '0 0 24px' }}>
                {plan.features.map(f => (
                  <li key={f} style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 8 }}>✓ {f}</li>
                ))}
              </ul>
              <button type="button" className={plan.popular ? 'btn-primary' : 'btn-ghost'} style={{ width: '100%' }} onClick={() => subscribe(plan)} disabled={loading === plan.name}>
                {loading === plan.name ? 'Loading...' : plan.priceId ? `Get ${plan.name}` : 'Get started free'}
              </button>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 32, color: 'var(--text3)', fontSize: 13 }}>Secured by Stripe. Cancel anytime.</p>
      </div>
    </div>
  )
}
