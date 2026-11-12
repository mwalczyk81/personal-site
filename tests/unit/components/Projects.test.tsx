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

  it('should render RoleRadar with its tags, repo link, project page link and write-up link', () => {
    // Same card as querylens and specprobe, plus links to the project page and the case study
    render(<Projects />)
    expect(screen.getByRole('heading', { level: 3, name: 'RoleRadar' })).toBeInTheDocument()

    const repo = screen.getByRole('link', { name: /visit roleradar/i })
    expect(repo).toHaveAttribute('href', 'https://github.com/mwalczyk81/roleradar')
    expect(repo).toHaveAttribute('target', '_blank')
    expect(repo).toHaveAttribute('rel', 'noopener noreferrer')

    expect(screen.getByRole('link', { name: /roleradar project page/i })).toHaveAttribute(
      'href',
      '/projects/roleradar',
    )
    expect(screen.getByRole('link', { name: /write-up: spec-first ai agents/i })).toHaveAttribute(
      'href',
      '/writing/what-held-up-spec-first-ai-agents',
    )
    for (const tag of ['.NET 10', 'MongoDB replica set', 'React Router v7', 'Duende IdentityServer', 'OpenTelemetry', 'Docker']) {
      expect(screen.getByText(tag)).toBeInTheDocument()
    }
  })

  it('should list RoleRadar in the main grid, not under Personal projects', () => {
    render(<Projects />)
    const card = screen.getByRole('heading', { level: 3, name: 'RoleRadar' })
    expect(card.closest('details')).toBeNull()
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
