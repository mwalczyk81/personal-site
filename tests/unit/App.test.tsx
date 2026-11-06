import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../../src/App'

describe('App component', () => {
  it('should render navbar and all main site sections', () => {
    // Verifies the entire single-page portfolio assembles and renders cleanly
    render(<App />)

    // Navbar
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()

    // Bio
    expect(screen.getByRole('region', { name: /about/i })).toBeInTheDocument()

    // Skills
    expect(screen.getByRole('region', { name: /skills/i })).toBeInTheDocument()

    // Projects
    expect(screen.getByRole('region', { name: /projects/i })).toBeInTheDocument()

    // Contact
    expect(screen.getByRole('region', { name: /contact/i })).toBeInTheDocument()
  })

  it('should scroll to the section named in the URL hash on load', () => {
    // Verifies deep links like /#projects work even though sections render after page load
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView
    window.history.pushState({}, '', '/#projects')
    render(<App />)
    expect(scrollIntoView).toHaveBeenCalledTimes(1)
    expect(scrollIntoView.mock.contexts[0]).toBe(document.getElementById('projects'))
    window.history.pushState({}, '', '/')
  })

  it('should route /writing and /writing/:slug to the writing pages', () => {
    // Verifies the pathname check renders the index and a post instead of the home sections
    window.history.pushState({}, '', '/writing')
    const { unmount } = render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Writing' })).toBeInTheDocument()
    expect(screen.queryByRole('region', { name: /skills/i })).not.toBeInTheDocument()
    unmount()

    window.history.pushState({}, '', '/writing/automapper-to-mapperly')
    render(<App />)
    expect(screen.getByRole('article')).toBeInTheDocument()

    window.history.pushState({}, '', '/')
  })
})
