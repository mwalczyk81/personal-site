# Contract: Interactions & Motion

**Feature**: `002-visual-redesign`
**Date**: 2026-04-19
**Consumed by**: `src/components/layout/Navbar.tsx`, `src/components/sections/Projects.tsx`, `src/components/sections/Skills.tsx`, `src/index.css`

---

## Active Navigation Contract

### Hook: `useActiveSection`

**Location**: `src/hooks/useActiveSection.ts`

**Signature**:
```typescript
function useActiveSection(sectionIds: string[]): string | null
```

**Returns**: The `id` of the section currently active in the viewport, or `null` before the first observation fires.

**Configuration**:
| Parameter | Value | Rationale |
|-----------|-------|-----------|
| `threshold` | `0.5` | Section must be ≥50% visible to become active |
| `rootMargin` | `'0px 0px -50% 0px'` | Triggers in upper half of viewport — nav feels responsive |
| Observer instance | Single instance observing all sections | Performance — one observer > N observers |

**Section IDs** (must match `specs/001-personal-website/contracts/navigation.md`):
- `'bio'`
- `'skills'`
- `'projects'`
- `'contact'`

**Multiple-visible-sections priority**: When multiple sections exceed threshold simultaneously (e.g., on a very tall viewport), the section with the smallest `top` value in the viewport (topmost) is considered active.

**Lifecycle**:
1. `useEffect` with empty deps array — observer created once on mount
2. `observer.observe(el)` called for each resolved section element
3. Cleanup: `observer.disconnect()` returned from `useEffect`

---

## Active Nav Link Visual Contract

**Applied to**: Each `<a>` in `Navbar.tsx` whose `href` matches `#${activeId}`

| Property | Inactive state | Active state |
|----------|---------------|-------------|
| `color` | `gray-500` | `accent-600` (or `gray-900` if accent fails contrast) |
| `font-weight` | `font-normal` (400) | `font-medium` (500) |
| Bottom indicator | none | 2px bottom border or underline in `accent-600` |
| Transition | `color 150ms ease` | — |

**`prefers-reduced-motion`**: No changes — color and weight transitions are non-motion effects and are preserved under reduced-motion.

---

## Project Card Hover Contract

**Applied to**: Each project card `<div>` in `Projects.tsx`

| Property | Default state | Hover state | Transition |
|----------|--------------|-------------|------------|
| `transform` | `translateY(0)` | `translateY(-3px)` | `150ms ease` |
| `box-shadow` | `none` or `sm` | `md` (Tailwind: `shadow-md`) | `150ms ease` |
| `border-color` | `gray-100` | `accent-600` | `150ms ease` |
| `cursor` | `default` | `pointer` (if card has a link) | — |

**`prefers-reduced-motion` override**:
```css
@media (prefers-reduced-motion: reduce) {
  .project-card {
    transition: border-color 150ms ease, box-shadow 150ms ease;
    /* transform transition removed */
  }
  .project-card:hover {
    transform: none; /* no lift */
  }
}
```

Border-color and shadow transitions are preserved (non-motion) — the card is still visually distinct in hover state.

---

## Smooth Scroll Contract

**Preserved from `specs/001-personal-website`**: CSS `scroll-behavior: smooth` on `html` remains the implementation. No JavaScript scroll logic is added.

```css
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

The `prefers-reduced-motion` override for `scroll-behavior` is added in this feature (was missing from 001 implementation).

---

## Hero Section Visual Depth Contract

The hero section must include **at least one** of the following depth elements:

| Option | Description | Preferred |
|--------|-------------|-----------|
| Gradient background | Subtle warm gradient from `white` → `accent-100` (very light tint) | ✓ Preferred |
| Typographic accent | Hero name with a portion or underline styled in `accent-600` | Alternative |
| Decorative element | A horizontal rule, geometric shape, or oversized monogram watermark | Alternative |

**Chosen approach**: Subtle radial or linear gradient background on the `<section id="bio">` element, transitioning from `white` at center/top to `accent-100` at the edges/bottom. This provides depth without adding visual noise and preserves the minimalist aesthetic.

**Contrast**: The gradient must not reduce text contrast below WCAG 2.1 AA at any point along the gradient (since the tint is very light — ~96% lightness — this is expected to pass easily).
