'use client'
import { useTheme } from '@/components/ThemeProvider'

export default function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn-ghost"
      style={{
        padding: compact ? '8px 12px' : '10px 16px',
        fontSize: compact ? 12 : 13,
        width: compact ? '100%' : 'auto',
      }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
    </button>
  )
}
