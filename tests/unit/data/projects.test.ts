/// <reference types="node" />
import { existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import projects from '../../../src/data/projects'

describe('projects data', () => {
  it('should contain a non-empty array of projects', () => {
    // Verifies that project definitions are populated and available to the UI
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)
  })

  it('should include specprobe with complete open-source metadata', () => {
    // Verifies that specprobe is correctly added to the projects data with required open-source fields
    const specprobe = projects.find((p) => p.id === 'specprobe')
    expect(specprobe).toBeDefined()
    expect(specprobe?.title).toBe('specprobe')
    expect(specprobe?.type).toBe('open-source')
    expect(specprobe?.url).toBe('https://github.com/mwalczyk81/specprobe')
    expect(specprobe?.description).toBeTruthy()
    expect(specprobe?.tags).toContain('Python')
    expect(specprobe?.tags).toContain('OpenAPI')
    expect(specprobe?.tags).toContain('CLI')
  })

  it('should include querylens with complete open-source metadata', () => {
    // Verifies that querylens is correctly added to the projects data with required open-source fields
    const querylens = projects.find((p) => p.id === 'querylens')
    expect(querylens).toBeDefined()
    expect(querylens?.title).toBe('querylens')
    expect(querylens?.type).toBe('open-source')
    expect(querylens?.url).toBe('https://github.com/mwalczyk81/querylens')
    expect(querylens?.description).toBeTruthy()
    expect(querylens?.tags).toContain('Python')
    expect(querylens?.tags).toContain('Azure Cosmos DB')
    expect(querylens?.tags).toContain('CLI')
  })

  it('should ensure all project IDs are unique', () => {
    // Prevents duplicate keys in React list rendering
    const ids = projects.map((p) => p.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should ensure all open-source projects have a valid URL', () => {
    // Verifies external links are valid HTTPS links for open-source repositories
    const openSourceProjects = projects.filter((p) => p.type === 'open-source')
    for (const project of openSourceProjects) {
      expect(project.url).toBeDefined()
      expect(project.url).toMatch(/^https:\/\//)
    }
  })

  it('should ensure all projects have required fields and non-empty tags', () => {
    // Verifies data integrity across all entries
    for (const project of projects) {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(Array.isArray(project.tags)).toBe(true)
      expect(project.tags.length).toBeGreaterThan(0)
      expect(['open-source', 'professional']).toContain(project.type)
    }
  })
})

describe('roleradar project data', () => {
  const roleradar = projects.find((p) => p.id === 'roleradar')
  // Not `new URL(..., import.meta.url)`: Vite rewrites that pattern into an asset URL.
  const publicFile = (path: string) => resolve(import.meta.dirname, '../../../public', `.${path}`)

  it('should include RoleRadar with complete open-source metadata', () => {
    // Same shape as the querylens and specprobe entries, in the main grid rather than under "Personal projects"
    expect(roleradar).toBeDefined()
    expect(roleradar?.title).toBe('RoleRadar')
    expect(roleradar?.type).toBe('open-source')
    expect(roleradar?.personal).toBeFalsy()
    expect(roleradar?.url).toBe('https://github.com/mwalczyk81/roleradar')
    expect(roleradar?.description).toBe(
      'Long-term memory for AI agents over MCP, and a job-search tracker with a web UI. Local-first: everything stays on your machine, every write is audited, and nothing is ever hard-deleted. It runs my own job search. The public repo contains fictional data only.',
    )
    expect(roleradar?.tags).toEqual([
      '.NET 10',
      'MongoDB replica set',
      'React Router v7',
      'Duende IdentityServer',
      'OpenTelemetry',
      'Docker',
    ])
  })

  it('should carry the tagline, facts and Try it line for its page', () => {
    const page = roleradar?.page
    expect(page?.tagline).toBe(
      'A local-first job-search tracker with an MCP server and a CLI on one data store.',
    )
    expect(page?.facts).toEqual([
      'v0.1.0 released Nov 12, 2026',
      '16 specs, 53 ADRs, 99 pull requests',
      '2,253 .NET tests and 1,368 web tests, plus 154 browser tests',
      'Mutation score floor of 81 on the web library code',
      '85 percent line coverage floor on Domain and Application',
    ])
    expect(page?.tryIt.text).toMatch(/clone the repo/i)
    expect(page?.tryIt.linkLabel).toBe('README')
    expect(page?.tryIt.url).toBe('https://github.com/mwalczyk81/roleradar#try-the-demo')
  })

  it('should link to the repo, release, governance doc and reports site over https', () => {
    const links = roleradar?.page?.links ?? []
    expect(links.map((l) => [l.label, l.url])).toEqual([
      ['Repository', 'https://github.com/mwalczyk81/roleradar'],
      ['Release v0.1.0', 'https://github.com/mwalczyk81/roleradar/releases/tag/v0.1.0'],
      [
        'How AI-written code is governed',
        'https://github.com/mwalczyk81/roleradar/blob/main/docs/ai-assisted-development.md',
      ],
      ['Reports site', 'https://mwalczyk81.github.io/roleradar/'],
    ])
    for (const link of links) {
      const url = new URL(link.url)
      expect(url.protocol).toBe('https:')
      expect(['github.com', 'mwalczyk81.github.io']).toContain(url.hostname)
    }
  })

  it('should point the light and dark image pair at small files that exist', () => {
    const image = roleradar?.page?.image
    expect(image?.alt).toBe(
      'The Insights page over fictional demo data: a postings funnel and an applications funnel.',
    )
    for (const src of [image?.light, image?.dark]) {
      expect(src).toMatch(/^\/images\/roleradar\/insights-(light|dark)\.webp$/)
      expect(existsSync(publicFile(src!))).toBe(true)
      expect(statSync(publicFile(src!)).size).toBeLessThan(60 * 1024)
    }
    expect(image?.light).not.toBe(image?.dark)
  })

  it('should contain no em dashes in its copy', () => {
    expect(JSON.stringify(roleradar)).not.toContain('—')
  })
})
