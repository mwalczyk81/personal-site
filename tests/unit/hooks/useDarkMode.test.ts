import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDarkMode } from '../../../src/hooks/useDarkMode'

describe('useDarkMode hook', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('should initialize to false when localStorage is empty and prefers-color-scheme is light', () => {
    // Verifies default light mode fallback
    const { result } = renderHook(() => useDarkMode())
    expect(result.current.isDark).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('should initialize to true when localStorage has dark saved', () => {
    // Verifies persistence recovery from localStorage
    localStorage.setItem('color-scheme', 'dark')
    const { result } = renderHook(() => useDarkMode())
    expect(result.current.isDark).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should toggle dark mode state and update DOM class and localStorage', () => {
    // Verifies toggle behavior and document class synchronization
    const { result } = renderHook(() => useDarkMode())
    expect(result.current.isDark).toBe(false)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.isDark).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('color-scheme')).toBe('dark')

    act(() => {
      result.current.toggle()
    })

    expect(result.current.isDark).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('color-scheme')).toBe('light')
  })
})
