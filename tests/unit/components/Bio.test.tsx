import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Bio from '../../../src/components/sections/Bio'
import bio from '../../../src/data/bio'

describe('Bio component', () => {
  it('should render the bio name, title, and summary', () => {
    // Verifies hero personal information matches bio dataset
    render(<Bio />)
    expect(screen.getByRole('heading', { level: 1, name: bio.name })).toBeInTheDocument()
    expect(screen.getByText(bio.title)).toBeInTheDocument()
    expect(screen.getByText(bio.summary)).toBeInTheDocument()
  })

  it('should render location when defined', () => {
    // Verifies conditional location rendering
    render(<Bio />)
    if (bio.location) {
      expect(screen.getByText(bio.location)).toBeInTheDocument()
    }
  })

  it('should render social links with secure attributes', () => {
    // Verifies external social links open securely in new tabs
    render(<Bio />)
    for (const link of bio.socialLinks) {
      const anchor = screen.getByRole('link', { name: link.label })
      expect(anchor).toBeInTheDocument()
      expect(anchor).toHaveAttribute('href', link.url)
      expect(anchor).toHaveAttribute('target', '_blank')
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
})
