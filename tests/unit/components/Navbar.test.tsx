import { describe, it, expect, vi } from 'vitest'
import { act, render, screen, within } from '@testing-library/react'
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

  it('should link to the writing page and point section links home when off the home page', () => {
    render(<Navbar isDark={false} onToggleDark={vi.fn()} homePath="/" />)
    expect(screen.getByRole('link', { name: 'Writing' })).toHaveAttribute('href', '/writing')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects')
  })

  it('should place Writing before Contact in the nav', () => {
    render(<Navbar isDark={false} onToggleDark={vi.fn()} />)
    const labels = screen.getAllByRole('link').map((a) => a.textContent)
    expect(labels.indexOf('Writing')).toBe(labels.indexOf('Contact') - 1)
  })

  it('should open and close the mobile menu with correct aria state', async () => {
    // Verifies the menu button toggles aria-expanded and reveals the panel its aria-controls points at
    const user = userEvent.setup()
    render(<Navbar isDark={false} onToggleDark={vi.fn()} />)
    const button = screen.getByRole('button', { name: /open menu/i })
    const panel = document.getElementById(button.getAttribute('aria-controls')!)!
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(panel).not.toBeVisible()

    await user.click(button)
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute('aria-expanded', 'true')
    expect(panel).toBeVisible()
  })

  it('should close the menu and return focus to the button on Escape', async () => {
    const user = userEvent.setup()
    render(<Navbar isDark={false} onToggleDark={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /open menu/i }))
    await user.keyboard('{Escape}')
    const button = screen.getByRole('button', { name: /open menu/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveFocus()
  })

  it('should close the menu and return focus to the button when a menu link is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar isDark={false} onToggleDark={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /open menu/i }))
    const panelLinks = within(document.getElementById('mobile-nav-panel')!).getAllByRole('link')
    expect(panelLinks.map((a) => a.textContent)).toEqual(['About', 'Skills', 'Projects', 'Writing', 'Contact'])
    await user.click(panelLinks[2])
    const button = screen.getByRole('button', { name: /open menu/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveFocus()
  })

  it('should close the open menu when the viewport grows past the mobile breakpoint', async () => {
    // Verifies aria-expanded cannot go stale after a resize to the desktop layout
    const user = userEvent.setup()
    let onChange: ((event: MediaQueryListEvent) => void) | undefined
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: (_: string, cb: (event: MediaQueryListEvent) => void) => {
        onChange = cb
      },
      removeEventListener: vi.fn(),
    }))
    render(<Navbar isDark={false} onToggleDark={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /open menu/i }))
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()

    act(() => onChange?.({ matches: true } as MediaQueryListEvent))
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute('aria-expanded', 'false')
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
