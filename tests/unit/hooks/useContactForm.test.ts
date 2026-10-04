import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useContactForm } from '../../../src/hooks/useContactForm'

describe('useContactForm hook', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('should initialize with empty values and idle status', () => {
    // Verifies initial form state contract
    const { result } = renderHook(() => useContactForm())
    expect(result.current.state.values).toEqual({ name: '', email: '', message: '' })
    expect(result.current.state.status).toBe('idle')
    expect(result.current.fieldErrors).toEqual({})
  })

  it('should update values and clear field error on handleChange', () => {
    // Verifies controlled input value updates and inline error clearing
    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.handleChange('name', 'Matt')
    })
    expect(result.current.state.values.name).toBe('Matt')

    // Simulate validation error then typing to clear it
    act(() => {
      const dummyEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>
      result.current.handleSubmit(dummyEvent)
    })
    expect(result.current.fieldErrors.email).toBe('A valid email address is required.')

    act(() => {
      result.current.handleChange('email', 'test@example.com')
    })
    expect(result.current.fieldErrors.email).toBeUndefined()
  })

  it('should reject submission and set field errors when values are missing or invalid', async () => {
    // Verifies client-side validation prevents fetch call
    const { result } = renderHook(() => useContactForm())
    const preventDefault = vi.fn()

    await act(async () => {
      result.current.handleSubmit({ preventDefault } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(preventDefault).toHaveBeenCalled()
    expect(result.current.fieldErrors.name).toBe('Name is required.')
    expect(result.current.fieldErrors.email).toBe('A valid email address is required.')
    expect(result.current.fieldErrors.message).toBe('Message is required.')
    expect(fetch).not.toHaveBeenCalled()
  })

  it('should handle successful submission and reset form values', async () => {
    // Verifies submission lifecycle on 200 OK from Formspree
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response)

    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.handleChange('name', 'Matt')
      result.current.handleChange('email', 'matt@example.com')
      result.current.handleChange('message', 'Hello world!')
    })

    await act(async () => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(result.current.state.status).toBe('success')
    expect(result.current.state.values).toEqual({ name: '', email: '', message: '' })
  })

  it('should handle server error response', async () => {
    // Verifies error handling when endpoint returns non-200 or ok: false
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Formspree rate limit exceeded' }),
    } as Response)

    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.handleChange('name', 'Matt')
      result.current.handleChange('email', 'matt@example.com')
      result.current.handleChange('message', 'Hello world!')
    })

    await act(async () => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(result.current.state.status).toBe('error')
    expect(result.current.state.errorMessage).toBe('Formspree rate limit exceeded')
  })

  it('should handle network failure gracefully', async () => {
    // Verifies network exception recovery
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.handleChange('name', 'Matt')
      result.current.handleChange('email', 'matt@example.com')
      result.current.handleChange('message', 'Hello world!')
    })

    await act(async () => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(result.current.state.status).toBe('error')
    expect(result.current.state.errorMessage).toBe('Something went wrong. Please try again.')
  })

  it('should handle request timeout with specific timeout message', async () => {
    // Verifies AbortError maps to timeout message
    const abortError = new Error('The operation was aborted.')
    abortError.name = 'AbortError'
    vi.mocked(fetch).mockRejectedValueOnce(abortError)

    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.handleChange('name', 'Matt')
      result.current.handleChange('email', 'matt@example.com')
      result.current.handleChange('message', 'Hello world!')
    })

    await act(async () => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(result.current.state.status).toBe('error')
    expect(result.current.state.errorMessage).toBe('Request timed out. Please try again.')
  })

  it('should use default error message if server response has no error field', async () => {
    // Verifies fallback message when response.ok is false and json has no error string
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response)

    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.handleChange('name', 'Matt')
      result.current.handleChange('email', 'matt@example.com')
      result.current.handleChange('message', 'Hello world!')
    })

    await act(async () => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(result.current.state.status).toBe('error')
    expect(result.current.state.errorMessage).toBe('Something went wrong. Please try again.')
  })
})
