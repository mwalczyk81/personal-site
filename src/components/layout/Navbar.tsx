import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useActiveSection } from '../../hooks/useActiveSection'

// Section ID ↔ nav label contract defined in contracts/navigation.md.
// Do NOT change the href values without updating all section id attributes.
const NAV_LINKS = [
  { href: '#bio', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  // Writing is a separate page, not a section, so it links by path rather than by hash.
  { href: '/writing', label: 'Writing' },
  { href: '#contact', label: 'Contact' },
] as const

// Stable reference — derived once at module level so useActiveSection doesn't re-observe on each render
const SECTION_IDS = NAV_LINKS.filter(({ href }) => href.startsWith('#')).map(({ href }) => href.slice(1))

// Matches Tailwind's `sm` breakpoint, where the inline desktop links take over from the menu.
const DESKTOP_QUERY = '(min-width: 640px)'

const MENU_PANEL_ID = 'mobile-nav-panel'

interface NavbarProps {
  isDark: boolean
  onToggleDark: () => void
  /** Set on pages other than the home page so section links point back to "/#section". */
  homePath?: string
}

interface NavLinkProps {
  href: string
  label: string
  homePath: string
  activeId: string | null
  className?: string
  onClick?: () => void
}

function NavLink({ href, label, homePath, activeId, className = '', onClick }: NavLinkProps) {
  const isPage = !href.startsWith('#')
  const isActive = isPage ? !!homePath : !homePath && href.slice(1) === activeId
  return (
    <a
      href={isPage ? href : `${homePath}${href}`}
      aria-current={isActive ? (isPage ? 'page' : 'true') : undefined}
      onClick={onClick}
      className={[
        'text-sm transition-colors duration-(--ds-duration-fast)',
        isActive
          ? 'text-ds-primary font-medium underline underline-offset-4 decoration-2 decoration-ds-primary'
          : 'text-ds-text-muted hover:text-ds-text',
        className,
      ].join(' ')}
    >
      {label}
    </a>
  )
}

export default function Navbar({ isDark, onToggleDark, homePath = '' }: NavbarProps) {
  const activeId = useActiveSection(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const closeMenu = useCallback((returnFocus: boolean) => {
    setMenuOpen(false)
    // preventScroll keeps focus return from fighting the anchor jump after a link click.
    if (returnFocus) menuButtonRef.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu(true)
    }
    // Leaving the menu open after growing past the breakpoint would leave aria-expanded stale.
    const mql = window.matchMedia(DESKTOP_QUERY)
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    mql.addEventListener('change', onChange)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      mql.removeEventListener('change', onChange)
    }
  }, [menuOpen, closeMenu])

  return (
    <header className="sticky top-0 z-50 bg-ds-bg border-b border-ds-border">
      <nav
        className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <span className="font-serif text-lg font-semibold text-ds-text whitespace-nowrap">
          Matt Walczyk
        </span>

        <div className="flex items-center gap-2 sm:gap-6">
          {/* Desktop links: shown from the sm breakpoint up */}
          <ul className="hidden sm:flex sm:gap-5 md:gap-8" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <NavLink href={href} label={label} homePath={homePath} activeId={activeId} className="whitespace-nowrap" />
              </li>
            ))}
          </ul>

          {/* Menu button: below the sm breakpoint only. The theme toggle stays beside it. */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={MENU_PANEL_ID}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden p-2 rounded-md text-ds-text-muted hover:text-ds-text hover:bg-ds-surface-hover transition-colors duration-(--ds-duration-fast)"
          >
            {menuOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>

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

      {/* Dropdown panel for narrow screens. Stays in the DOM (hidden) so aria-controls always resolves. */}
      <div
        id={MENU_PANEL_ID}
        hidden={!menuOpen}
        className="sm:hidden absolute left-0 right-0 top-full bg-ds-bg border-b border-ds-border shadow-ds-md"
      >
        <ul className="px-6 py-2" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <NavLink
                href={href}
                label={label}
                homePath={homePath}
                activeId={activeId}
                className="block py-3"
                onClick={() => closeMenu(true)}
              />
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
