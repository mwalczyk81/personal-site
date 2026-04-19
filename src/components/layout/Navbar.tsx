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

export default function Navbar() {
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav
        className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <span className="text-sm font-medium tracking-wide text-gray-900">
          Matt Walczyk
        </span>

        {/* Desktop links — mobile hamburger added in T027 */}
        <ul className="flex gap-8" role="list">
          {NAV_LINKS.map(({ href, label }) => {
            const sectionId = href.slice(1)
            const isActive = sectionId === activeId
            return (
              <li key={href}>
                <a
                  href={href}
                  aria-current={isActive ? 'true' : undefined}
                  className={[
                    'text-sm transition-colors duration-150',
                    isActive
                      ? 'text-accent-600 font-medium underline underline-offset-4 decoration-2 decoration-accent-600'
                      : 'text-gray-500 hover:text-gray-900',
                  ].join(' ')}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
