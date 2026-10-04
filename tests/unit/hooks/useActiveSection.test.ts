import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useActiveSection } from '../../../src/hooks/useActiveSection'

describe('useActiveSection hook', () => {
  it('should initialize with the first section ID in the list', () => {
    // Verifies initial default selection matches first section
    const { result } = renderHook(() => useActiveSection(['bio', 'skills', 'projects', 'contact']))
    expect(result.current).toBe('bio')
  })

  it('should return null if sectionIds array is empty', () => {
    // Verifies edge case with no section IDs
    const { result } = renderHook(() => useActiveSection([]))
    expect(result.current).toBeNull()
  })

  it('should observe elements present in the DOM and disconnect on unmount', () => {
    // Verifies IntersectionObserver observes each section and disconnects when unmounted
    const el1 = document.createElement('div')
    el1.id = 'sec1'
    const el2 = document.createElement('div')
    el2.id = 'sec2'
    document.body.appendChild(el1)
    document.body.appendChild(el2)

    const observeSpy = vi.fn()
    const disconnectSpy = vi.fn()

    class TestIntersectionObserver {
      readonly root: Element | Document | null = null
      readonly rootMargin: string = ''
      readonly scrollMargin: string = ''
      readonly thresholds: ReadonlyArray<number> = []
      observe = observeSpy
      unobserve = vi.fn()
      disconnect = disconnectSpy
      takeRecords = vi.fn().mockReturnValue([])
    }

    vi.stubGlobal('IntersectionObserver', TestIntersectionObserver)

    const { unmount } = renderHook(() => useActiveSection(['sec1', 'sec2']))

    expect(observeSpy).toHaveBeenCalledWith(el1)
    expect(observeSpy).toHaveBeenCalledWith(el2)

    unmount()
    expect(disconnectSpy).toHaveBeenCalledTimes(1)

    // Cleanup DOM elements
    document.body.removeChild(el1)
    document.body.removeChild(el2)
  })

  it('should update activeId when observer callback fires with intersecting entries', () => {
    // Verifies viewport intersection calculation chooses the correct in-view element
    const el1 = document.createElement('div')
    el1.id = 'sec1'
    const el2 = document.createElement('div')
    el2.id = 'sec2'
    document.body.appendChild(el1)
    document.body.appendChild(el2)

    el1.getBoundingClientRect = vi.fn().mockReturnValue({ top: 120 })
    el2.getBoundingClientRect = vi.fn().mockReturnValue({ top: 40 })

    let observerCallback: (entries: Partial<IntersectionObserverEntry>[]) => void = () => {}

    class TestIntersectionObserver {
      constructor(callback: (entries: Partial<IntersectionObserverEntry>[]) => void) {
        observerCallback = callback
      }
      readonly root: Element | Document | null = null
      readonly rootMargin: string = ''
      readonly scrollMargin: string = ''
      readonly thresholds: ReadonlyArray<number> = []
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
      takeRecords = vi.fn().mockReturnValue([])
    }

    vi.stubGlobal('IntersectionObserver', TestIntersectionObserver)

    const { result } = renderHook(() => useActiveSection(['sec1', 'sec2']))
    expect(result.current).toBe('sec1')

    // Simulate sec2 entering view closer to top (top: 40 vs top: 120)
    act(() => {
      observerCallback([
        { target: el1, isIntersecting: true },
        { target: el2, isIntersecting: true },
      ])
    })

    expect(result.current).toBe('sec2')

    // Simulate all visible sections scrolled past (top < 0) - picks least negative
    el1.getBoundingClientRect = vi.fn().mockReturnValue({ top: -300 })
    el2.getBoundingClientRect = vi.fn().mockReturnValue({ top: -50 })

    act(() => {
      observerCallback([
        { target: el1, isIntersecting: true },
        { target: el2, isIntersecting: true },
      ])
    })

    expect(result.current).toBe('sec2')

    // Simulate empty intersection list (no change in activeId)
    act(() => {
      observerCallback([
        { target: el1, isIntersecting: false },
        { target: el2, isIntersecting: false },
      ])
    })

    expect(result.current).toBe('sec2')

    document.body.removeChild(el1)
    document.body.removeChild(el2)
  })
})
