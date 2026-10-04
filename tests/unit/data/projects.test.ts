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
