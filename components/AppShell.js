'use client'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { mockData } from '@/lib/supabase'
import { useState } from 'react'

export default function AppShell({ children, title }) {
  const user = mockData.user
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar user={{ name: user.name, role: user.role, avatar: user.avatar }} />
      <div style={{
        marginLeft: 240,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        transition: 'margin-left 0.3s'
      }}>
        <Navbar title={title} user={{ avatar: user.avatar }} />
        <main style={{ flex: 1, padding: '28px 28px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
