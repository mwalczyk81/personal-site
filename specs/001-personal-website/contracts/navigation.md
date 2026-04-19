# Contract: In-Page Navigation

**Feature**: `001-personal-website`
**Date**: 2026-04-19
**Provider**: Each section component (Bio, Skills, Projects, Contact)
**Consumer**: `src/components/layout/Navbar.tsx`, direct browser hash navigation

---

## Section ID Contract

Each section component MUST render a top-level element with the following `id` attribute. These IDs are the stable contract between the Navbar and the section components — changing them is a breaking change.

| Section Component | Element ID  | Navbar Label | Anchor href   |
|-------------------|-------------|--------------|---------------|
| `Bio.tsx`         | `bio`        | "About"      | `#bio`        |
| `Skills.tsx`      | `skills`     | "Skills"     | `#skills`     |
| `Projects.tsx`    | `projects`   | "Projects"   | `#projects`   |
| `Contact.tsx`     | `contact`    | "Contact"    | `#contact`    |

**Implementation note**: Each section renders as `<section id="<id>" ...>`. The `id` attribute on the section's root element is the anchor target.

---

## Scroll Behaviour

Smooth scrolling is implemented via a single CSS rule applied globally:

```css
html {
  scroll-behavior: smooth;
}
```

No JavaScript scroll library is used. When a user clicks a Navbar link, the browser scrolls smoothly to the section with the matching `id`.

---

## Deep Linking

Direct URL access (e.g. `https://mattwalczyk.com/#contact`) MUST scroll to the correct section after the page loads. This works natively with hash anchor links — no JavaScript is required.

Vercel's SPA rewrite rule (`/* → /index.html`) ensures that `mattwalczyk.com/#contact` loads the app and the browser resolves the hash anchor.

---

## Navbar Behaviour

- The Navbar MUST be visible at all times (sticky/fixed positioning).
- On mobile (< 768px), the Navbar MAY collapse into a hamburger menu revealing the four links.
- On desktop (≥ 768px), all four links are displayed inline.
- Active section highlighting is a FUTURE ENHANCEMENT (not required for v1). If implemented, use `IntersectionObserver` to detect which section is in the viewport and apply an active style to the corresponding nav link.

---

## Accessibility

- Navbar links MUST have descriptive `aria-label` attributes where the visible label alone is insufficient.
- The Navbar MUST be reachable via keyboard (Tab + Enter navigation).
- Section `id` values double as ARIA landmark targets. Each `<section>` element SHOULD also have an `aria-label` matching its nav label for screen reader context.
