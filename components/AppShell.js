'use client'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo'
import ThemeToggle from '@/components/ThemeToggle'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: 'D' },
  { href: '/budget', label: 'Budget', icon: 'B' },
  { href: '/cards', label: 'Cards', icon: 'C' },
  { href: '/family', label: 'Family', icon: 'F' },
  { href: '/ai-coach', label: 'AI Coach', icon: 'AI' },
  { href: '/credit', label: 'Credit Score', icon: 'CR' },
  { href: '/invest', label: 'Invest', icon: 'I' },
  { href: '/feed', label: 'Finance Feed', icon: 'N' },
]

export default function AppShell({ children, title, subtitle }) {
  const pathname = usePathname()

  return (
    <div className="app-shell" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-body)' }}>
      <aside className="app-sidebar" style={{
        width: 240,
        background: 'var(--bg2)',
        borderRight: '1px solid var(--border)',
        padding: '28px 16px',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        flexShrink: 0,
      }}>
        <a href="/dashboard" style={{ marginBottom: 40, paddingLeft: 8, display: 'block', textDecoration: 'none' }}>
          <Logo width={150} />
        </a>
        <nav className="app-nav" style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {nav.map(item => {
            const isActive = pathname === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '11px 14px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  background: isActive ? 'var(--gold-glow)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--text3)',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  transition: 'all 0.15s',
                  letterSpacing: '0.01em',
                }}
              >
                <span style={{ width: 22, fontSize: 10, opacity: isActive ? 1 : 0.65, fontWeight: 800 }}>{item.icon}</span>
                {item.label}
              </a>
            )
          })}
        </nav>
        <div style={{ marginBottom: 12 }}>
          <ThemeToggle compact />
        </div>
        <div style={{ padding: '12px 14px', borderRadius: 10, background: 'var(--gold-glow)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Vitrix Private</div>
          <div style={{ fontSize: 11, color: 'var(--text3)' }}>Family Finance Platform</div>
        </div>
      </aside>
      <main className="app-main" style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>
        {title && (
          <div style={{ marginBottom: 28, borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'var(--text)', margin: 0, letterSpacing: '-0.01em' }}>{title}</h1>
            {subtitle && <p style={{ color: 'var(--text2)', fontSize: 14, margin: '8px 0 0' }}>{subtitle}</p>}
            <div style={{ width: 36, height: 2, background: 'linear-gradient(90deg, var(--accent), transparent)', marginTop: 10, borderRadius: 2 }} />
          </div>
        )}
        {children}
      </main>
    </div>
  )
}
