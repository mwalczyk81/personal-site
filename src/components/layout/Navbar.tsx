import { Moon, Sun } from 'lucide-react'
import { useActiveSection } from '../../hooks/useActiveSection'

// Section ID ↔ nav label contract defined in contracts/navigation.md.
// Do NOT change the href values without updating all section id attributes.
const NAV_LINKS = [
  { href: '#bio', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const

// Stable reference — derived once at module level so useActiveSection doesn't re-observe on each render
const SECTION_IDS = NAV_LINKS.map(({ href }) => href.slice(1))

interface NavbarProps {
  isDark: boolean
  onToggleDark: () => void
  /** Set on pages other than the home page so section links point back to "/#section". */
  homePath?: string
}

export default function Navbar({ isDark, onToggleDark, homePath = '' }: NavbarProps) {
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <header className="sticky top-0 z-50 bg-ds-bg border-b border-ds-border">
      <nav
        className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <span className="font-serif text-lg font-semibold text-ds-text">Matt Walczyk</span>

        <div className="flex items-center gap-6">
          {/* Desktop links — mobile hamburger added in T027 */}
          <ul className="flex gap-8" role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const sectionId = href.slice(1)
              const isActive = !homePath && sectionId === activeId
              return (
                <li key={href}>
                  <a
                    href={`${homePath}${href}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={[
                      'text-sm transition-colors duration-(--ds-duration-fast)',
                      isActive
                        ? 'text-ds-primary font-medium underline underline-offset-4 decoration-2 decoration-ds-primary'
                        : 'text-ds-text-muted hover:text-ds-text',
                    ].join(' ')}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
            {/* Writing is a separate page, not a section, so it links by path and is active on /writing pages */}
            <li>
              <a
                href="/writing"
                aria-current={homePath ? 'page' : undefined}
                className={[
                  'text-sm transition-colors duration-(--ds-duration-fast)',
                  homePath
                    ? 'text-ds-primary font-medium underline underline-offset-4 decoration-2 decoration-ds-primary'
                    : 'text-ds-text-muted hover:text-ds-text',
                ].join(' ')}
              >
                Writing
              </a>
            </li>
          </ul>

          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={onToggleDark}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-md text-ds-text-muted hover:text-ds-text hover:bg-ds-surface-hover transition-colors duration-(--ds-duration-fast)"
          >
            {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
          </button>
        </div>
      </nav>
    </header>
  )
}
