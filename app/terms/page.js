import Link from 'next/link'

const sections = [
  { title: 'Acceptance', content: 'By using Vitrix you agree to these terms. Vitrix is a finance tracking and education platform — we do not move real money or issue debit cards.' },
  { title: 'Accounts', content: 'You must be 18+ to create a parent account. Child accounts must be managed by a parent or guardian.' },
  { title: 'Subscriptions', content: 'Paid plans bill monthly via Stripe. Cancel anytime. Refunds are at our discretion within 7 days of charge.' },
  { title: 'Prohibited use', content: 'Do not use Vitrix for illegal activity, harassment, or attempts to breach security.' },
  { title: 'Disclaimer', content: 'Vitrix is not financial advice. Consult a qualified professional for financial decisions.' },
  { title: 'Contact', content: 'Questions: legal@vitrix.app' },
]

export default function Terms() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '60px 20px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Link href="/" style={{ color: 'var(--accent)', fontSize: 14 }}>← Back</Link>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--text)', margin: '24px 0 8px' }}>Terms of Service</h1>
        <p style={{ color: 'var(--text3)', marginBottom: 40 }}>Last updated: June 2026</p>
        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            <h3 style={{ color: 'var(--text)', marginBottom: 8 }}>{s.title}</h3>
            <p style={{ color: 'var(--text2)', lineHeight: 1.8, margin: 0 }}>{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
