# Research: Personal Website — Matt Walczyk

**Feature**: `001-personal-website`
**Date**: 2026-04-19
**Status**: Complete — all unknowns resolved

## Decision 1: Tailwind CSS Version

**Decision**: Tailwind CSS v4 with the `@tailwindcss/vite` plugin

**Rationale**: Tailwind v4 replaces the PostCSS pipeline with a native Vite plugin (`@tailwindcss/vite`), eliminating `tailwind.config.js` and `postcss.config.js` entirely. Configuration moves to CSS via `@import "tailwindcss"` in `index.css`. The new Oxide engine produces smaller output. This is the canonical setup for Vite 8 projects.

**Alternatives considered**:
- Tailwind v3: Requires PostCSS config and `tailwind.config.js` — unnecessary complexity when v4 is available and fully compatible.
- CSS Modules: More verbose for responsive/utility-first design; no built-in design system tokens.
- Styled Components / Emotion: Runtime CSS-in-JS overhead; poor tree-shaking characteristics.

---

## Decision 2: Contact Form Delivery

**Decision**: Formspree (free tier)

**Rationale**: Zero backend code required. The contact form POSTs JSON to `https://formspree.io/f/{formId}`. Formspree delivers messages to Matt's registered email. The free tier (50 submissions/month) is sufficient for a personal site. AJAX mode returns JSON responses, enabling a clean SPA confirmation flow without page reloads. Spam filtering is included.

**Alternatives considered**:
- EmailJS: Client-side only but exposes the API key in browser source; less built-in spam protection.
- Resend + Vercel Edge Function: Full control, but requires writing and maintaining a serverless function and a separate Resend account — overkill for this scope.
- Netlify Forms: Platform-locked to Netlify; incompatible with Vercel deployment.
- `mailto:` link: Zero friction to set up but exposes Matt's email publicly and provides no UX feedback.

---

## Decision 3: Testing Framework

**Decision**: Vitest + @testing-library/react + @testing-library/user-event + jsdom

**Rationale**: Vitest is Vite-native — it shares the same `vite.config.ts`, requires no separate Babel transform, and has near-identical API to Jest. React Testing Library enforces testing from the user's perspective (behaviour over implementation details), which aligns with the spec's acceptance scenarios. `jsdom` provides the DOM environment. `@testing-library/user-event` simulates realistic user interactions for form testing.

**Alternatives considered**:
- Jest: Requires separate transform configuration for Vite/ESM projects; slower cold start.
- Playwright: Ideal for E2E but exceeds scope for a static SPA; would be a future addition.
- No tests: Ruled out — FR-005/FR-006 require verifiable contact form validation behaviour.

---

## Decision 4: Icon Library

**Decision**: Lucide React

**Rationale**: Fully tree-shakeable — each icon is an independent named export, so only icons in use are bundled. TypeScript-first with complete type definitions. MIT-licensed. Provides all icons needed: GitHub, LinkedIn, external link, hamburger menu.

**Alternatives considered**:
- Heroicons: React-friendly but smaller selection; requires manual SVG for GitHub/LinkedIn.
- React Icons: Large monorepo with many icon sets; requires care to avoid pulling in the entire package.
- Inline SVGs: Works but increases authoring friction for every new icon.

---

## Decision 5: In-Page Navigation / Smooth Scrolling

**Decision**: CSS `scroll-behavior: smooth` on `html` + native anchor links (`href="#section-id"`)

**Rationale**: Zero JavaScript required. Hash navigation (`#bio`, `#skills`, `#projects`, `#contact`) is handled by the browser natively. Deep links work out-of-the-box. Browser back/forward history is maintained correctly. Vercel's SPA rewrite rule ensures direct deep-link access works after a hard refresh.

**Alternatives considered**:
- `react-scroll`: Adds a dependency for something CSS handles natively; no benefit for this use case.
- Framer Motion scroll animations: Useful for animated reveals but exceeds scope — the spec calls for minimalist style, not heavy animations.
- `IntersectionObserver` for active nav highlighting: Noted as a future enhancement (see contracts/navigation.md); not required for initial implementation.

---

## Decision 6: Vercel Deployment Configuration

**Decision**: `vercel.json` with SPA routing rewrites and HTTPS redirect

**Rationale**: Vite outputs a static `dist/` directory. Without rewrites, Vercel would return 404 for direct access to hash routes (`/mattwalczyk.com/#contact`). A single rewrite rule (`/* → /index.html`) solves this. HTTPS is enforced by Vercel automatically for custom domains; the redirect rule (`http → https`) is belt-and-suspenders.

**Alternatives considered**:
- No `vercel.json`: Works for the root path but hash anchor direct links may 404 on hard refresh depending on Vercel's detection.
- Next.js: Substantial framework overhead for a site that has no routing, SSR, or dynamic data requirements.

---

## Resolved Unknowns

| Unknown | Resolution |
|---------|-----------|
| Tailwind version | v4 with `@tailwindcss/vite` |
| Contact delivery | Formspree free tier |
| Test framework | Vitest + RTL |
| Icon library | Lucide React |
| Scroll / nav | CSS native |
| Vercel config | `vercel.json` with SPA rewrite |
