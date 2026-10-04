import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Skills from '../../../src/components/sections/Skills'
import skills from '../../../src/data/skills'

describe('Skills component', () => {
  it('should render the Skills heading', () => {
    // Verifies section heading landmark
    render(<Skills />)
    expect(screen.getByRole('heading', { level: 2, name: /skills/i })).toBeInTheDocument()
  })

  it('should render all skill categories', () => {
    // Verifies each skill category title is rendered
    render(<Skills />)
    for (const category of skills) {
      expect(screen.getByRole('heading', { level: 3, name: category.name })).toBeInTheDocument()
    }
  })

  it('should render all individual skill items under each category', () => {
    // Verifies every skill item exists in the DOM
    render(<Skills />)
    for (const category of skills) {
      for (const skill of category.skills) {
        expect(screen.getByText(skill.name)).toBeInTheDocument()
      }
    }
  })
})
