import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from '../../../src/components/sections/Contact'

describe('Contact component', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('should render form fields and submit button', () => {
    // Verifies accessibility form labels and controls
    render(<Contact />)
    expect(screen.getByRole('heading', { level: 2, name: /get in touch/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('should show validation errors when submitted with empty fields', async () => {
    // Verifies required field validation messages appear
    const user = userEvent.setup()
    render(<Contact />)

    const submitBtn = screen.getByRole('button', { name: /send message/i })
    await user.click(submitBtn)

    expect(screen.getByText('Name is required.')).toBeInTheDocument()
    expect(screen.getByText('A valid email address is required.')).toBeInTheDocument()
    expect(screen.getByText('Message is required.')).toBeInTheDocument()
  })

  it('should show an error when email is malformed', async () => {
    // Verifies regex validation on email input
    const user = userEvent.setup()
    render(<Contact />)

    await user.type(screen.getByLabelText(/name/i), 'Matt')
    await user.type(screen.getByLabelText(/email/i), 'invalid-email-format')
    await user.type(screen.getByLabelText(/message/i), 'Hello there!')

    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(screen.getByText('A valid email address is required.')).toBeInTheDocument()
  })

  it('should display success confirmation when form is submitted successfully', async () => {
    // Verifies successful submission transitions to success status view
    const user = userEvent.setup()
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response)

    render(<Contact />)

    await user.type(screen.getByLabelText(/name/i), 'Alice')
    await user.type(screen.getByLabelText(/email/i), 'alice@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Testing contact submission.')

    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(screen.getByText('Message sent!')).toBeInTheDocument()
      expect(screen.getByText(/thanks for reaching out/i)).toBeInTheDocument()
    })
  })

  it('should display error message when submission fails', async () => {
    // Verifies failure alert banner appears on API error
    const user = userEvent.setup()
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Unable to send message' }),
    } as Response)

    render(<Contact />)

    await user.type(screen.getByLabelText(/name/i), 'Bob')
    await user.type(screen.getByLabelText(/email/i), 'bob@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Testing error handling.')

    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Unable to send message')
    })
  })
})
