# Research: Visual Redesign — Premium Personal Site

**Feature**: `002-visual-redesign`
**Date**: 2026-04-19
**Status**: Complete — all unknowns resolved

## Decision 1: Font Pairing

**Decision**: Fraunces (variable, display serif) for large headings + Inter (variable, sans-serif) for body, labels, and UI text

**Rationale**: Fraunces is a true variable font (single file covers all weights and optical sizes) with exaggerated serifs that convey craftsmanship and intention at large display sizes. Inter's geometric neutrality provides maximum legibility at small sizes and zero visual competition with the display face. The contrast between the two — expressive serif headline vs. clean sans body — is the classic formula for premium editorial design. Fraunces is sufficiently differentiated from the saturated Playfair Display / Cormorant Garamond space while loading faster (one variable file rather than multiple weight files). Inter is effectively a system font on most modern platforms, reducing actual download weight.

**Loading strategy**: Load Fraunces from Google Fonts as a variable font (`ital,opsz,wght` axes) restricted to the Latin subset. Load Inter from Google Fonts as a variable font. Apply `font-display: swap` to prevent invisible text during font load. Define the pairing in the Tailwind `@theme` block so it's available as utility classes (`font-display` for Fraunces, `font-sans` override for Inter).

**Alternatives considered**:
- DM Serif Display + DM Sans: Same design DNA — lower visual tension, reads less "premium". More geometric than classical serif feel.
- Cormorant Garamond + Inter: Elegant but not a variable font; requires multiple weight files (higher payload). Widely used in fashion/wedding contexts — dilutes distinctiveness.
- System font only: Zero load cost but indistinguishable from an out-of-the-box site; fails the premium first-impression goal.

---

## Decision 2: MW Monogram Favicon

**Decision**: SVG favicon (primary) + PNG 32×32 (fallback) + Apple Touch Icon 180×180

**Rationale**: SVG favicons scale perfectly at any size, support dark-mode media queries within the SVG, and are a single small file (< 1 KB). Chrome, Firefox, and Edge natively support `<link rel="icon" type="image/svg+xml">`. Safari does not display SVG favicons in browser tabs (only in pinned tabs), so a PNG 32×32 fallback is required for Safari and older browsers. The Apple Touch Icon at 180×180 covers iOS home screen shortcuts.

**Monogram design approach**: The SVG will use a rounded rectangle background in a neutral dark color (matching the site's gray-900 palette) with "MW" rendered in a clean, geometric sans-serif — ensuring legibility at 16×16 and 32×32 pixel sizes where Fraunces serifs would be indistinguishable. System fonts in the SVG avoid external font dependencies within the favicon asset. The PNG fallback will be a rasterized version of the same SVG.

**Alternatives considered**:
- Emoji favicon (`🖥️`): Zero-effort but reads as unserious and off-brand.
- Vite default SVG: The current state — must be replaced; provides no brand identity.
- Font-dependent SVG favicon: Risks inconsistent rendering cross-browser if the embedded font doesn't resolve.

---

## Decision 3: Active Navigation Highlighting

**Decision**: Custom `useActiveSection` React hook using the IntersectionObserver API

**Rationale**: IntersectionObserver runs off the main thread and fires asynchronously, making it significantly more performant than `scroll` event listeners for this use case. A custom hook encapsulates the observer lifecycle (creation, observation, cleanup via `disconnect()`) and returns the ID of the currently active section. The Navbar consumes this hook and applies the active style to the matching link. Decision 5 from the 001-personal-website research (CSS `scroll-behavior: smooth`) is preserved — the IntersectionObserver handles visual highlighting only; scroll navigation remains CSS-native.

**Configuration**: `threshold: 0.5` (section must be ≥ 50% visible to become active); `rootMargin: '0px 0px -50% 0px'` (activates in the upper half of the viewport, so nav updates feel snappy before the section fully fills the screen). When multiple sections are simultaneously above threshold, the topmost one (lowest scroll offset) takes priority. Cleanup: `observer.disconnect()` in `useEffect` return function.

**Alternatives considered**:
- `scroll` event listener + `getBoundingClientRect()`: Works but fires on every scroll tick (main-thread overhead); requires manual throttling.
- Framer Motion `useScroll` + `useTransform`: Adds a heavy dependency (~30KB) for functionality IntersectionObserver provides natively.
- Inline `useEffect` in Navbar: Works for a single-use case but a hook is marginally cleaner and reusable if needed elsewhere.

---

## Decision 4: Color Accent Token

**Decision**: A single warm stone accent (`oklch(60% 0.06 60)` approximately — a muted warm amber/stone) applied sparingly: hero section accent element, active nav link indicator, card hover border accent

**Rationale**: The current site is exclusively gray-neutral. A single restrained accent is the minimal change that creates visual personality without compromising the minimalist character. The oklch color space ensures perceptual uniformity — the accent reads as equally vivid across different hues and backgrounds. Warm stone/amber is professional and non-gendered; it reads as thoughtful rather than bold. Using it in exactly three contexts (hero, active nav, card hover) prevents overuse.

**Alternatives considered**:
- Indigo/blue accent: Common in developer portfolios — reduces differentiation.
- No accent (pure neutral redesign): Possible but the brief explicitly calls for "color accents"; a pure neutral upgrade would only address typography and spacing.
- Multiple accent colors: Risks losing the minimalist quality — one accent is the maximum for this aesthetic.

---

## Decision 5: Tailwind v4 Design Token Strategy

**Decision**: Define all custom tokens (`--font-display`, `--color-accent-*`) in the `@theme` block in `src/index.css`; no separate config file

**Rationale**: Tailwind v4 has no `tailwind.config.js`. All customization is CSS-native via `@theme`. Tokens defined here are automatically exposed as both Tailwind utility classes (`font-display`, `text-accent-500`) and as CSS custom properties (`var(--color-accent-500)`) usable in arbitrary CSS. Using oklch for accent color tokens enables precise tonal control.

**Alternatives considered**:
- Inline style overrides: No reusability; defeats the utility-class system.
- CSS custom properties outside `@theme`: Works for CSS usage but doesn't generate Tailwind utilities.

---

## Decision 6: Card Hover and Transition Effects

**Decision**: CSS `transform: translateY(-2px)` + `box-shadow` elevation increase on card hover; `transition: transform 150ms ease, box-shadow 150ms ease`; `prefers-reduced-motion` fallback omits the transform, retains the border-color change only

**Rationale**: A 2px vertical lift paired with shadow increase is the industry-standard micro-interaction for card interactivity — it reads as "clickable" without being distracting. 150ms is fast enough to feel instant but slow enough to be perceived as smooth. The `prefers-reduced-motion` override removes physical movement while preserving the visual state change, satisfying FR-009 and WCAG 2.3.3 (Animation from Interactions).

**Alternatives considered**:
- Scale transform: Creates text reflow in some browsers; less elegant than lift.
- Background color change only: Less dimensional than a shadow lift; doesn't fully leverage the "depth" goal.
- Framer Motion hover: Overkill dependency for a CSS-native interaction.

---

## Resolved Unknowns

| Unknown | Resolution |
|---------|------------|
| Display font | Fraunces (variable, Google Fonts) |
| Body font | Inter (variable, Google Fonts) |
| Favicon format | SVG + PNG 32 + Apple Touch Icon 180 |
| Active nav tech | IntersectionObserver custom hook |
| Accent color | Single warm stone oklch token |
| Tailwind token strategy | `@theme` in index.css |
| Card hover | translateY(-2px) + shadow, reduced-motion safe |
