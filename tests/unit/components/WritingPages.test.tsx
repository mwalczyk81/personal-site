import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { WritingIndex, WritingPostPage } from '../../../src/components/pages/WritingPages'
import writing from '../../../src/data/writing'
import projects from '../../../src/data/projects'

const CASE_STUDY = 'shared-library-memory-leak'
const SPEC_FIRST = 'what-held-up-spec-first-ai-agents'

describe('Writing pages', () => {
  it('should list every post on the index', () => {
    render(<WritingIndex />)
    for (const post of writing) {
      expect(screen.getByRole('link', { name: post.title })).toHaveAttribute('href', `/writing/${post.slug}`)
    }
  })

  it('should list posts newest first', () => {
    const dates = writing.map((p) => p.date)
    expect(dates).toEqual([...dates].sort().reverse())
  })

  it('should render a post with all five sections', () => {
    const post = writing.find((p) => p.slug === CASE_STUDY)!
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

  it('should have post links that resolve to real project pages or https URLs', () => {
    const pages = new Set(projects.filter((p) => p.page).map((p) => `/projects/${p.id}`))
    for (const link of writing.flatMap((p) => p.links ?? [])) {
      if (link.href.startsWith('/')) expect(pages.has(link.href)).toBe(true)
      else expect(new URL(link.href).protocol).toBe('https:')
    }
  })
})

describe('Writing dates', () => {
  it('should show the formatted publish date on the index and on the post', () => {
    const { unmount } = render(<WritingIndex />)
    expect(screen.getAllByText('Nov 5, 2026')).toHaveLength(2)
    expect(screen.getAllByText('Nov 12, 2026')).toHaveLength(1)
    unmount()

    render(<WritingPostPage slug={CASE_STUDY} />)
    expect(screen.getByText('Nov 5, 2026')).toHaveAttribute('datetime', '2026-11-05')
  })
})

describe('What held up when AI agents built this under a spec-first process', () => {
  const TITLE = 'What held up when AI agents built this under a spec-first process'

  // The supplied text, sentence for sentence. Lead-ins become subheadings; the rest stays a paragraph.
  const INTRO = [
    'I built a job-search tracker. AI agents wrote most of the code. I wrote the rules.',
    'RoleRadar is a local-first tracker with an MCP server, a web UI and a MongoDB store. Every write is audited. Nothing is ever hard-deleted. It has 16 specs and 53 ADRs. It took 99 pull requests. The .NET suites pass 2,253 tests. The web suite passes 1,368, plus 154 browser tests.',
    'Here is what held up, and what did not.',
  ]
  const HELD_UP: [string, string][] = [
    ['A spec before code', 'Every feature starts as a spec with measurable success criteria. The agent cannot start without one.'],
    ['Tests first, shown failing', 'The agent writes the failing test and shows the red run. Then it writes the code. It reports command output, not impressions.'],
    ['Gates a machine checks', 'Architecture tests enforce the layers. A review gate rebuilds and retests a clean clone. Secrets and real names are scanned on every commit.'],
    ['One pull request per gate', 'Small enough to read.'],
  ]
  const DID_NOT: [string, string][] = [
    ['Agent reports', "They are fast, confident and sometimes wrong. More than once an agent's summary disagreed with its own ADR. I trusted the ADR and the command output."],
    ['A "census" that guessed', 'A table of evidence said a rule "can embed" a secret. Nobody had seen it happen. I sent it back twice.'],
    ['A privacy gate that failed open', 'If a field it relied on went missing, it scrubbed nothing. It now fails closed, with a test.'],
    ['Tests that proved the wrong thing', 'The privacy tests all passed. Then I ran the stack and opened the dashboard. A PKCE code verifier was sitting in an exported log record. The tests had only covered failed sign-ins. No one had checked a successful one.'],
    ['A restart bug', 'The local dev loop worked once. The second start failed. A generated database password no longer matched the saved volume. Only a person using it twice found it.'],
  ]
  const LESSON = [
    'Gates prove what they assert and nothing else. Someone has to run the thing.',
    'There are things I never hand over. Committing and pushing. Anything near real data. Trust decisions on my machine. Upstream pull requests. The calls themselves. When we kept our own log scrubber instead of a library, I decided. An ADR records why.',
    'AI made me faster. It did not make me less responsible. It moved my work from typing to deciding and checking.',
  ]

  it('should say only once that the agents wrote the code, and keep the summary from echoing the opener', () => {
    // The opener says it; the summary and the later lines must not restate it.
    const post = writing[0]
    expect(JSON.stringify(post).match(/wrote most of the code/g)).toHaveLength(1)
    expect(post.summary).not.toContain(post.intro![0].split('. ')[1])
    expect(post.intro![0]).toBe(
      'I built a job-search tracker. AI agents wrote most of the code. I wrote the rules.',
    )
  })

  it('should be the newest post and dated 2026-11-12', () => {
    expect(writing[0].slug).toBe(SPEC_FIRST)
    expect(writing[0].title).toBe(TITLE)
    expect(writing[0].date).toBe('2026-11-12')
  })

  it('should appear on the index with a link to the post', () => {
    render(<WritingIndex />)
    expect(screen.getByRole('link', { name: TITLE })).toHaveAttribute('href', `/writing/${SPEC_FIRST}`)
  })

  it('should render the title, date and the three sections', () => {
    render(<WritingPostPage slug={SPEC_FIRST} />)
    expect(screen.getByRole('heading', { level: 1, name: TITLE })).toBeInTheDocument()
    expect(screen.getByText('Nov 12, 2026')).toHaveAttribute('datetime', '2026-11-12')
    expect(screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual([
      'What held up',
      'What did not hold up',
      'The lesson',
    ])
  })

  it('should keep the bold lead-ins as subheadings and the sentences as they were', () => {
    render(<WritingPostPage slug={SPEC_FIRST} />)
    expect(screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(
      [...HELD_UP, ...DID_NOT].map(([lead]) => lead),
    )
    for (const text of [...INTRO, ...HELD_UP.map(([, t]) => t), ...DID_NOT.map(([, t]) => t), ...LESSON]) {
      expect(screen.getByText(text)).toBeInTheDocument()
    }
  })

  it('should link to the RoleRadar project page and the repo', () => {
    render(<WritingPostPage slug={SPEC_FIRST} />)
    const links = screen.getByRole('list', { name: 'Related links' })
    expect(within(links).getByRole('link', { name: /roleradar project page/i })).toHaveAttribute(
      'href',
      '/projects/roleradar',
    )
    const repo = within(links).getByRole('link', { name: /roleradar repository/i })
    expect(repo).toHaveAttribute('href', 'https://github.com/mwalczyk81/roleradar')
    expect(repo).toHaveAttribute('target', '_blank')
    expect(repo).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should contain no em dashes', () => {
    const { container } = render(<WritingPostPage slug={SPEC_FIRST} />)
    expect(container.textContent).not.toContain('—')
    expect(JSON.stringify(writing[0])).not.toContain('—')
  })
})
