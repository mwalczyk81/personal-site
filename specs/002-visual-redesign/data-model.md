# Data Model: Visual Redesign — Premium Personal Site

**Feature**: `002-visual-redesign`
**Date**: 2026-04-19

This feature has no database entities or runtime data structures. The "model" for a visual redesign is the **design token system** — the authoritative set of values that govern typography, color, spacing, and motion across the site.

---

## Design Token System

### Typography Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--font-display` | `"Fraunces", serif` | Hero name (`<h1>`), section titles (`<h2>`) |
| `--font-sans` (override) | `"Inter", system-ui, sans-serif` | All body text, labels, UI elements |
| `--font-mono` | `ui-monospace, monospace` | Code snippets (if any) |

**Scale** (applied via Tailwind size utilities — no custom scale needed):
- Hero name: `text-5xl sm:text-6xl lg:text-7xl`, `font-display`, `font-light`
- Section titles: `text-3xl`, `font-display`, `font-light`
- Body: `text-base`, `font-sans`, `leading-relaxed`
- Labels/captions: `text-xs`, `font-sans`, `tracking-widest`, `uppercase`

---

### Color Tokens

| Token | oklch Value | Hex Approx | Usage |
|-------|-------------|------------|-------|
| `--color-accent-100` | `oklch(96% 0.04 60)` | `#F5EFE6` | Accent background tint (hero, hover bg) |
| `--color-accent-400` | `oklch(72% 0.08 60)` | `#C4A882` | Accent mid (decorative elements) |
| `--color-accent-600` | `oklch(55% 0.09 60)` | `#9B7D58` | Accent base (active nav, card hover border) |
| `--color-accent-900` | `oklch(28% 0.05 60)` | `#3D2E1E` | Deep accent (hero typographic accent if needed) |

Existing gray-neutral palette (from Tailwind default) is preserved unchanged.

---

### Motion Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | `150ms` | Card hover transitions, nav link transitions |
| `--duration-base` | `250ms` | Section entry animations (if any) |
| `--ease-default` | `ease` | All transitions |

**`prefers-reduced-motion` behavior**: All `transform` properties are suppressed; `color`, `border-color`, `box-shadow` transitions remain active.

---

### Favicon Tokens

| Asset | Size | Format | Purpose |
|-------|------|--------|---------|
| `public/favicon.svg` | Vector | SVG | Primary favicon (Chrome, Firefox, Edge) |
| `public/favicon-32x32.png` | 32×32 | PNG | Safari fallback |
| `public/apple-touch-icon.png` | 180×180 | PNG | iOS home screen |

**Monogram spec**: "MW" text on a `#1C1C1E` (near-black) rounded-rectangle background, rendered in a geometric sans system font at a weight that ensures legibility at 16px.

---

## Active Section State

The `useActiveSection` hook manages a single piece of UI state:

| Property | Type | Description |
|----------|------|-------------|
| `activeId` | `string \| null` | The `id` of the section currently visible in the viewport |

**Valid values**: `'bio'`, `'skills'`, `'projects'`, `'contact'`, `null` (before first observation fires)

**Consumed by**: `Navbar.tsx` — applies active visual style to the matching nav link.

**Sections observed**: All four `<section>` elements with IDs matching the navigation contract from `specs/001-personal-website/contracts/navigation.md`.

---

## Skills Data Changes

The `src/data/skills.ts` file is a static data structure — this feature requires the following mutations:

| Action | Item | Category |
|--------|------|----------|
| Remove | Java | Languages & Runtimes |
| Remove | Karate | Testing & Quality |
| Remove | Dredd | Testing & Quality |
| Add | Postman | Testing & Quality |

No other data files are modified by this feature.
