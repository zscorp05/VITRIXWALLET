import Link from 'next/link'
import { LOGO_SRC } from '@/components/Logo'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--card)',
      borderTop: '1px solid var(--border)',
      padding: '24px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={LOGO_SRC} alt="" style={{ width: 72, height: 'auto' }} />
        <span style={{ color: 'var(--text3)', fontSize: 13 }}>© {new Date().getFullYear()} Vitrix</span>
      </div>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <Link href="/privacy" style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none' }}>Privacy</Link>
        <Link href="/terms" style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none' }}>Terms</Link>
        <Link href="/pricing" style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none' }}>Pricing</Link>
        <a href="mailto:support@vitrix.app" style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none' }}>Support</a>
      </div>
    </footer>
  )
}
