import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Projects from '../../../src/components/sections/Projects'
import projects from '../../../src/data/projects'

describe('Projects component', () => {
  it('should render the Projects section heading', () => {
    // Verifies accessibility landmark and section header
    render(<Projects />)
    const heading = screen.getByRole('heading', { level: 2, name: /projects/i })
    expect(heading).toBeInTheDocument()
  })

  it('should render a card for each project in projects data', () => {
    // Verifies all project items are rendered into card containers
    render(<Projects />)
    for (const project of projects) {
      expect(screen.getByRole('heading', { level: 3, name: project.title })).toBeInTheDocument()
    }
  })

  it('should render specprobe with its tags and GitHub link', () => {
    // Verifies specprobe is specifically rendered with tags and an accessible external link
    render(<Projects />)
    const specprobeHeading = screen.getByRole('heading', { level: 3, name: 'specprobe' })
    expect(specprobeHeading).toBeInTheDocument()

    const specprobeLink = screen.getByRole('link', { name: /visit specprobe/i })
    expect(specprobeLink).toBeInTheDocument()
    expect(specprobeLink).toHaveAttribute('href', 'https://github.com/mwalczyk81/specprobe')
    expect(specprobeLink).toHaveAttribute('target', '_blank')
    expect(specprobeLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should render external links for open-source projects and badges for professional projects', () => {
    // Verifies open-source vs professional visual distinction
    render(<Projects />)
    const openSourceProjects = projects.filter((p) => p.type === 'open-source')
    const professionalProjects = projects.filter((p) => p.type === 'professional')

    // Open-source projects should have outbound links
    for (const project of openSourceProjects) {
      const link = screen.getByRole('link', { name: new RegExp(`visit ${project.title}`, 'i') })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', project.url)
    }

    // Professional projects should display the "Professional" badge
    const badges = screen.getAllByText('Professional')
    expect(badges.length).toBe(professionalProjects.length)
  })
})
