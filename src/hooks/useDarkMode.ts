import { useEffect, useState } from 'react'

const STORAGE_KEY = 'color-scheme'

/** Returns the initial dark preference from localStorage, falling back to the OS preference. */
function getInitialDark(): boolean {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) return stored === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Manages the site-wide dark mode state.
 *
 * - Reads the initial state from localStorage (falls back to prefers-color-scheme)
 * - Toggles the `dark` class on <html> so Tailwind's class-based dark variants fire
 * - Persists the choice to localStorage on every change
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(getInitialDark)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
  }, [isDark])

  const toggle = () => setIsDark((prev) => !prev)

  return { isDark, toggle }
}
