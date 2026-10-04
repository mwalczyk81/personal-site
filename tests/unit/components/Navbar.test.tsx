import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '../../../src/components/layout/Navbar'

describe('Navbar component', () => {
  it('should render the brand name', () => {
    // Verifies brand heading/name exists in navigation header
    render(<Navbar isDark={false} onToggleDark={vi.fn()} />)
    expect(screen.getByText('Matt Walczyk')).toBeInTheDocument()
  })

  it('should render navigation links to all main sections', () => {
    // Verifies navigation anchor targets match site sections
    render(<Navbar isDark={false} onToggleDark={vi.fn()} />)
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#bio')
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
  })

  it('should call onToggleDark when clicking the theme toggle button', async () => {
    // Verifies user interaction with dark mode toggle triggers state handler
    const user = userEvent.setup()
    const handleToggle = vi.fn()
    render(<Navbar isDark={false} onToggleDark={handleToggle} />)

    const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(toggleButton).toBeInTheDocument()

    await user.click(toggleButton)
    expect(handleToggle).toHaveBeenCalledTimes(1)
  })

  it('should render appropriate label and icon in dark mode', () => {
    // Verifies accessibility aria-label reflects dark state
    render(<Navbar isDark={true} onToggleDark={vi.fn()} />)
    const toggleButton = screen.getByRole('button', { name: /switch to light mode/i })
    expect(toggleButton).toBeInTheDocument()
  })
})
