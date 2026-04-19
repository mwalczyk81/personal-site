import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently visible in the viewport using IntersectionObserver.
 * Returns the id of the topmost intersecting section, or null before the first observation fires.
 *
 * @param sectionIds - Ordered list of section element IDs to observe (e.g. ['bio', 'skills', ...])
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null)

  // Stringify ids to avoid re-running the effect when the caller passes a new array reference
  const idsKey = sectionIds.join(',')

  useEffect(() => {
    const ids = idsKey.split(',').filter(Boolean)
    if (ids.length === 0) return

    // Track which sections are currently intersecting
    const intersectingMap = new Map<string, boolean>()

    const observer = new IntersectionObserver(
      (entries) => {
        // Update intersection state for each changed entry
        entries.forEach((entry) => {
          intersectingMap.set(entry.target.id, entry.isIntersecting)
        })

        // Collect all currently-intersecting section IDs with their viewport positions
        const visible = ids
          .filter((id) => intersectingMap.get(id))
          .map((id) => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top ?? Infinity }))

        if (visible.length === 0) return

        // Prefer sections still entering/in view (top >= 0); among those, pick the topmost.
        // If all visible sections are scrolled past (top < 0), pick the one least past (closest to 0).
        // This handles tall sections that can never fill the detection root.
        const inView = visible.filter(({ top }) => top >= 0)
        const candidates = inView.length > 0 ? inView : visible
        const winner = candidates.reduce((best, curr) =>
          Math.abs(curr.top) < Math.abs(best.top) ? curr : best
        )

        setActiveId(winner.id)
      },
      {
        // Fire when any 10% of the section enters the detection root.
        // Lower threshold handles tall sections that can never reach 50% in a restricted root.
        threshold: 0.1,
        // Detection root = top 70% of viewport. Prevents premature activation of sections
        // that are barely visible at the bottom of the screen.
        rootMargin: '0px 0px -30% 0px',
      }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey])

  return activeId
}
