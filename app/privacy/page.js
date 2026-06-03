import Link from 'next/link'

const sections = [
  { title: 'Information we collect', content: 'Account details (name, email) and financial data you enter manually. We do not connect to banks unless you explicitly authorize it later.' },
  { title: 'How we use data', content: 'To provide Vitrix, send budget alerts, process subscriptions via Stripe, and improve the product. We never sell personal data.' },
  { title: 'Security', content: 'Data is stored on Supabase with row-level security. Connections use HTTPS. Payments are handled by Stripe; we do not store full card numbers.' },
  { title: 'Family accounts', content: 'Parents can view managed child accounts. Each family\'s data is isolated from other Vitrix users.' },
  { title: 'Your rights (GDPR)', content: 'You may access, correct, or delete your data by contacting privacy@vitrix.app.' },
  { title: 'Cookies', content: 'Essential cookies for authentication and preferences only. No ad tracking.' },
]

export default function Privacy() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '60px 20px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Link href="/" style={{ color: 'var(--accent)', fontSize: 14 }}>← Back</Link>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--text)', margin: '24px 0 8px' }}>Privacy Policy</h1>
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
