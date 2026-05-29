export const metadata = {
  title: 'Vitrix — Smart Family Finance',
  description: 'Budget smarter. Invest earlier. Learn money.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
