import './globals.css'
import Providers from '@/components/Providers'
import CookieBanner from '@/components/CookieBanner'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Vitrix — Private Family Finance',
  description: 'Budget smarter. Invest earlier. Learn money.',
  manifest: '/manifest.json',
  themeColor: '#080808',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Vitrix',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Vitrix" />
        <link rel="apple-touch-icon" href="/vitrix_logo_v3.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Providers>
          <div style={{ flex: 1 }}>{children}</div>
          <Footer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  )
}
