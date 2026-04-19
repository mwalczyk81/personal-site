import { useState } from 'react'
import type { ContactFormState, ContactFormValues } from '../types'

const INITIAL_VALUES: ContactFormValues = { name: '', email: '', message: '' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: ContactFormValues): Partial<Record<keyof ContactFormValues, string>> {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {}
  if (!values.name.trim()) errors.name = 'Name is required.'
  if (!values.email.trim() || !EMAIL_RE.test(values.email.trim()))
    errors.email = 'A valid email address is required.'
  if (!values.message.trim()) errors.message = 'Message is required.'
  return errors
}

export interface UseContactFormReturn {
  state: ContactFormState
  fieldErrors: Partial<Record<keyof ContactFormValues, string>>
  handleChange: (field: keyof ContactFormValues, value: string) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function useContactForm(): UseContactFormReturn {
  const [state, setState] = useState<ContactFormState>({
    values: INITIAL_VALUES,
    status: 'idle',
  })
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({})

  function handleChange(field: keyof ContactFormValues, value: string) {
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [field]: value },
    }))
    // Clear the error for this field as the user types
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const errors = validate(state.values)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    setFieldErrors({})

    setState((prev) => ({ ...prev, status: 'submitting' }))

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10_000)

    try {
      const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string
      const response = await fetch(`https://formspree.io/f/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: state.values.name.trim(),
          email: state.values.email.trim(),
          message: state.values.message.trim(),
        }),
        signal: controller.signal,
      })

      const data = (await response.json()) as { ok?: boolean; error?: string }

      if (response.ok && data.ok !== false) {
        setState({ values: INITIAL_VALUES, status: 'success' })
      } else {
        setState((prev) => ({
          ...prev,
          status: 'error',
          errorMessage: data.error ?? 'Something went wrong. Please try again.',
        }))
      }
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === 'AbortError'
      setState((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: isTimeout
          ? 'Request timed out. Please try again.'
          : 'Something went wrong. Please try again.',
      }))
    } finally {
      clearTimeout(timeoutId)
    }
  }

  return { state, fieldErrors, handleChange, handleSubmit }
}
