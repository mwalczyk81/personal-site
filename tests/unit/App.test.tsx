import { describe, it, expect } from 'vitest'
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
})
