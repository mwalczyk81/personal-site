import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WritingIndex, WritingPostPage } from '../../../src/components/pages/WritingPages'
import writing from '../../../src/data/writing'
import projects from '../../../src/data/projects'

describe('Writing pages', () => {
  it('should list every post on the index', () => {
    render(<WritingIndex />)
    for (const post of writing) {
      expect(screen.getByRole('link', { name: post.title })).toHaveAttribute('href', `/writing/${post.slug}`)
    }
  })

  it('should render a post with all five sections', () => {
    const post = writing[0]
    render(<WritingPostPage slug={post.slug} />)
    expect(screen.getByRole('heading', { level: 1, name: post.title })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(5)
  })

  it('should show a not-found message for an unknown slug', () => {
    render(<WritingPostPage slug="nope" />)
    expect(screen.getByRole('heading', { name: /post not found/i })).toBeInTheDocument()
  })

  it('should have project write-up links that resolve to real posts', () => {
    const slugs = new Set(writing.map((p) => `/writing/${p.slug}`))
    const paths = projects.flatMap((p) => p.writeUps ?? []).map((w) => w.path)
    expect(paths.length).toBe(writing.length)
    for (const path of paths) expect(slugs.has(path)).toBe(true)
  })
})

describe('Writing dates', () => {
  it('should show the formatted publish date on the index and on the post', () => {
    const { unmount } = render(<WritingIndex />)
    expect(screen.getAllByText('Nov 5, 2026')).toHaveLength(writing.length)
    unmount()

    render(<WritingPostPage slug={writing[0].slug} />)
    expect(screen.getByText('Nov 5, 2026')).toHaveAttribute('datetime', '2026-11-05')
  })
})
