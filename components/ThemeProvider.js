'use client'
import { createContext, useContext, useEffect, useSyncExternalStore } from 'react'

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

function getTheme() {
  if (typeof window === 'undefined') return 'dark'
  return localStorage.getItem('vitrix_theme') === 'light' ? 'light' : 'dark'
}

function subscribeTheme(cb) {
  window.addEventListener('vitrix-theme', cb)
  return () => window.removeEventListener('vitrix-theme', cb)
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function toggleTheme() {
    const next = getTheme() === 'dark' ? 'light' : 'dark'
    localStorage.setItem('vitrix_theme', next)
    window.dispatchEvent(new Event('vitrix-theme'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
