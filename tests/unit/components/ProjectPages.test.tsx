import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { ProjectDetailPage } from '../../../src/components/pages/ProjectPages'
import projects from '../../../src/data/projects'

const roleradar = projects.find((p) => p.id === 'roleradar')!

describe('Project detail page', () => {
  it('should render the title, tagline and summary', () => {
    render(<ProjectDetailPage id="roleradar" />)
    expect(screen.getByRole('heading', { level: 1, name: 'RoleRadar' })).toBeInTheDocument()
    expect(screen.getByText(roleradar.page!.tagline)).toBeInTheDocument()
    expect(screen.getByText(roleradar.description)).toBeInTheDocument()
  })

  it('should list the stack and the facts', () => {
    render(<ProjectDetailPage id="roleradar" />)
    const stack = screen.getByRole('list', { name: 'Stack' })
    expect(within(stack).getAllByRole('listitem').map((li) => li.textContent)).toEqual(roleradar.tags)

    const facts = screen.getByRole('list', { name: 'Facts' })
    expect(within(facts).getAllByRole('listitem').map((li) => li.textContent)).toEqual(roleradar.page!.facts)
  })

  it('should render every link with a valid href that opens safely in a new tab', () => {
    render(<ProjectDetailPage id="roleradar" />)
    const list = screen.getByRole('list', { name: 'Links' })
    const links = within(list).getAllByRole('link')
    expect(links).toHaveLength(roleradar.page!.links.length)
    roleradar.page!.links.forEach((expected, i) => {
      expect(links[i]).toHaveTextContent(expected.label)
      expect(links[i]).toHaveAttribute('href', expected.url)
      expect(links[i]).toHaveAttribute('target', '_blank')
      expect(links[i]).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('should show the Try it line with a link to the README demo section', () => {
    render(<ProjectDetailPage id="roleradar" />)
    expect(screen.getByText(/^Try it:/)).toBeInTheDocument()
    const readme = screen.getByRole('link', { name: 'README' })
    expect(readme).toHaveAttribute('href', 'https://github.com/mwalczyk81/roleradar#try-the-demo')
  })

  it('should render a light and dark image pair that follows the site theme switch', () => {
    // The site toggles themes with data-theme and the `dark:` variant, so the pair uses
    // dark:hidden / hidden dark:block rather than a prefers-color-scheme <picture>.
    render(<ProjectDetailPage id="roleradar" />)
    const [light, dark] = screen.getAllByAltText(roleradar.page!.image.alt)
    expect(light).toHaveAttribute('src', '/images/roleradar/insights-light.webp')
    expect(light).toHaveClass('dark:hidden')
    expect(dark).toHaveAttribute('src', '/images/roleradar/insights-dark.webp')
    expect(dark).toHaveClass('hidden', 'dark:block')
    for (const img of [light, dark]) {
      expect(img).toHaveAttribute('loading', 'lazy')
      expect(img).toHaveAttribute('width')
      expect(img).toHaveAttribute('height')
    }
  })

  it('should link back to the projects section and on to the write-up', () => {
    render(<ProjectDetailPage id="roleradar" />)
    expect(screen.getByRole('link', { name: /back to projects/i })).toHaveAttribute('href', '/#projects')
    expect(screen.getByRole('link', { name: /spec-first ai agents/i })).toHaveAttribute(
      'href',
      '/writing/what-held-up-spec-first-ai-agents',
    )
  })

  it('should render no em dashes', () => {
    const { container } = render(<ProjectDetailPage id="roleradar" />)
    expect(container.textContent).not.toContain('—')
  })

  it('should show a not-found message for an unknown project', () => {
    render(<ProjectDetailPage id="nope" />)
    expect(screen.getByRole('heading', { name: /project not found/i })).toBeInTheDocument()
  })

  it('should not offer a project page for projects without page data', () => {
    render(<ProjectDetailPage id="querylens" />)
    expect(screen.getByRole('heading', { name: /project not found/i })).toBeInTheDocument()
  })
})
