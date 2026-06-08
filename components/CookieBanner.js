'use client'
import { useEffect, useState } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(!localStorage.getItem('vitrix_cookies'))
  }, [])

  function accept() {
    localStorage.setItem('vitrix_cookies', 'accepted')
    setShow(false)
  }

  function decline() {
    localStorage.setItem('vitrix_cookies', 'declined')
    setShow(false)
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
      background: 'var(--card)', border: '1px solid var(--border2)',
      borderRadius: 16, padding: '20px 24px', zIndex: 9999,
      width: '90%', maxWidth: 520, boxShadow: 'var(--shadow)',
      display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
    }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Cookie notice</div>
        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>
          Essential cookies only — authentication and preferences. No ad tracking.
          <a href="/privacy" style={{ color: 'var(--accent)', marginLeft: 6 }}>Privacy policy</a>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" className="btn-ghost" onClick={decline} style={{ padding: '8px 14px', fontSize: 12 }}>Decline</button>
        <button type="button" className="btn-primary" onClick={accept} style={{ padding: '8px 14px', fontSize: 12 }}>Accept</button>
      </div>
    </div>
  )
}
