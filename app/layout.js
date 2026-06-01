export const metadata = {
  title: 'Vitrix — Smart Family Finance',
  description: 'Budget smarter. Invest earlier. Learn money.',
  manifest: '/manifest.json',
  themeColor: '#6C63FF',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Vitrix',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Vitrix" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body style={{ margin:0, padding:0, fontFamily:'Inter, sans-serif' }}>{children}</body>
    </html>
  )
}