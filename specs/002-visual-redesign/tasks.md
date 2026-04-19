---

description: "Task list for Visual Redesign — Premium Personal Site"
---

# Tasks: Visual Redesign — Premium Personal Site

**Input**: Design documents from `specs/002-visual-redesign/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: No test tasks generated — not requested in spec. Changes are visual/presentational; manual QA at breakpoints is the validation strategy.

**Organization**: Tasks are grouped by user story. Phase 1 (Setup) contains two shared prerequisite changes — Google Fonts wiring and Tailwind design token definitions — that every user story depends on.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths are included in every task description

## Path Conventions

Single-project SPA at repository root:

```text
src/                → React components, hooks, types, data
public/             → Static assets (favicon files)
index.html          → HTML shell — Google Fonts links, favicon links
src/index.css       → Tailwind entry — @theme tokens, global rules
```

---

## Phase 1: Setup (Shared Prerequisites)

**Purpose**: Wire in Google Fonts and establish the Tailwind design token system. Both tasks are blocking prerequisites for all three user stories — typography tokens are needed for Bio, accent color tokens for all hover and active states.

- [x] T001 Add Google Fonts to `index.html` — insert `<link rel="preconnect" href="https://fonts.googleapis.com">`, `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`, and a single `<link>` loading Fraunces (variable: `ital,opsz,wght@0,9..144,100..900`) and Inter (variable: `wght@100..900`) from Google Fonts with `&display=swap`; both Latin-subset only
- [x] T002 Add `@theme` design token block to `src/index.css` — define `--font-display: "Fraunces", serif`, override `--font-sans: "Inter", system-ui, sans-serif`, add accent scale `--color-accent-100` through `--color-accent-900` using oklch values from `data-model.md`, add `--duration-fast: 150ms`; also add `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }` global rule below existing `html { scroll-behavior: smooth; }` — these tokens unlock all subsequent styling tasks

**Checkpoint**: Run `pnpm dev` — page loads with Fraunces and Inter fonts visible. Tailwind utilities `font-display`, `font-sans`, `text-accent-600`, `bg-accent-100` are available in source.

---

## Phase 2: User Story 1 — Premium First Impression (Priority: P1) 🎯 MVP

**Goal**: A visitor's very first experience — the browser tab, the hero typography, and the hero section depth — establishes the site as a premium, considered portfolio rather than a default scaffold.

**Independent Test**: Open the deployed (or local `pnpm dev`) site. The browser tab shows an "MW" monogram icon. The hero heading ("Matt Walczyk") renders in Fraunces — visually distinct from plain system sans-serif. The hero section has a subtle warm-tinted background that differentiates it from a flat white page. Test in Chrome, Firefox, and Safari. Resize to 375px and confirm all hero text remains legible and unclipped.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create `public/favicon.svg` — SVG favicon with `<rect>` background (`fill="#1C1C1E"`, `rx="4"`) covering the full viewBox, and `<text>` element rendering "MW" in white, `font-family="system-ui, -apple-system, sans-serif"`, `font-weight="600"`, centered at `x="50%" y="50%" dominant-baseline="central" text-anchor="middle"`; set `viewBox="0 0 32 32"` and `xmlns="http://www.w3.org/2000/svg"`
- [x] T004 [P] [US1] Create `public/favicon-32x32.png` — 32×32 PNG raster of the favicon.svg for Safari fallback; generate using any available tool (Inkscape CLI: `inkscape public/favicon.svg --export-type=png --export-width=32 --export-filename=public/favicon-32x32.png`; or online converter at realfavicongenerator.net; or ImageMagick: `magick public/favicon.svg -resize 32x32 public/favicon-32x32.png`)
- [x] T005 [P] [US1] Create `public/apple-touch-icon.png` — 180×180 PNG of the favicon design for iOS home screen; generate from `public/favicon.svg` the same way as T004 but at 180×180 size (`--export-width=180` or `-resize 180x180`)
- [x] T006 [US1] Update `index.html` favicon links — remove the existing `<link rel="icon" href="/vite.svg" />` line; add three replacement `<link>` tags: `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`, `<link rel="icon" type="image/png" href="/favicon-32x32.png">`, `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` — depends on T003, T004, T005
- [x] T007 [US1] Update `src/components/sections/Bio.tsx` — (a) apply `font-display` class to the `<h1>` (name) element; (b) update the `<section>` background from the current neutral to a subtle accent gradient using an inline style or Tailwind arbitrary value: `style={{ background: 'linear-gradient(135deg, white 0%, var(--color-accent-100) 100%)' }}` or equivalent Tailwind `bg-gradient-to-br from-white to-accent-100`; (c) ensure the subtitle and summary text remain in `font-sans` with existing gray colors — no contrast regression

**Checkpoint**: US1 fully functional. Browser tab shows MW monogram. Hero name renders in Fraunces. Hero has visible warm gradient depth. Safari shows PNG favicon. All text remains WCAG 2.1 AA compliant.

---

## Phase 3: User Story 2 — Active Navigation with Active Awareness (Priority: P2)

**Goal**: As the visitor scrolls, the navigation always highlights the current section's link. Smooth scroll also correctly disables under `prefers-reduced-motion`.

**Independent Test**: Open `pnpm dev`. Slowly scroll from top to bottom — each section's nav link becomes visually distinct (accent-colored, slightly bolder, or underlined) as it enters the viewport. Click each nav link and confirm smooth scroll. Enable "Prefer reduced motion" in OS accessibility settings and confirm scroll jumps rather than animates.

### Implementation for User Story 2

- [x] T008 [US2] Create `src/hooks/useActiveSection.ts` — export `function useActiveSection(sectionIds: string[]): string | null`; inside, `useEffect` creates a single `IntersectionObserver` with `{ threshold: 0.5, rootMargin: '0px 0px -50% 0px' }`; callback receives all entries, filters to `isIntersecting === true`, selects the entry whose element has the smallest `getBoundingClientRect().top` value (topmost visible), and calls `setActiveId(entry.target.id)`; observe each element found by `document.getElementById(id)` for each id in `sectionIds`; initialize `activeId` state to `sectionIds[0]`; return cleanup `observer.disconnect()`; export the returned `activeId`
- [x] T009 [US2] Update `src/components/layout/Navbar.tsx` — import `useActiveSection` from `../../hooks/useActiveSection`; call `const activeId = useActiveSection(['bio', 'skills', 'projects', 'contact'])` inside the component; for each nav link, conditionally apply active styles when `link.href === \`#${activeId}\``: change text color to `text-accent-600` (vs inactive `text-gray-500`), add `font-medium` weight, and add a bottom border or underline indicator (e.g., `border-b-2 border-accent-600 pb-0.5`); wrap each link's color and weight change in a `transition-colors duration-150` class

**Checkpoint**: US2 fully functional. Active nav link updates as user scrolls. Nav link styling matches the contract in `contracts/design-tokens.md`. No scroll event listeners used — only IntersectionObserver. Reduced-motion scroll behavior correct.

---

## Phase 4: User Story 3 — Refined Content Sections (Priority: P3)

**Goal**: Skills section uses a more visually polished layout with chip-style skill tags. Project cards respond to hover with a dimensional effect. Skills data is updated to reflect current tools.

**Independent Test**: Scroll to Skills — skill items appear as small bordered chips/badges rather than plain text list items; categories have a card-like container. Scroll to Projects — hover each card and confirm a visible lift + shadow + accent border appears within 200ms. Inspect the skills list and confirm Postman is present; Java, Karate, and Dredd are absent. Enable reduced-motion and confirm card hover shows no transform but still changes border/shadow.

### Implementation for User Story 3

- [x] T010 [P] [US3] Update `src/data/skills.ts` — in the "Languages & Runtimes" category, remove `{ name: 'Java' }`; in the "Testing & Quality" category, remove `{ name: 'Karate' }` and `{ name: 'Dredd' }`, and add `{ name: 'Postman' }` (position it near related API-testing tools such as after Portman)
- [x] T011 [US3] Update `src/components/sections/Skills.tsx` — replace the current `<ul>/<li>` skill list with a chip/badge layout: wrap the skills list in a `<div className="flex flex-wrap gap-2">` and render each skill as a `<span className="text-xs text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1">` chip; wrap each category in a card container: `<div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">` — this gives each category a subtle card appearance; keep the existing `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` responsive grid
- [x] T012 [US3] Update `src/components/sections/Projects.tsx` — on each project card `<div>`: (a) add `group` Tailwind class to the card wrapper; (b) change `hover:border-gray-200` to `hover:border-accent-600`; (c) add `hover:-translate-y-[3px]` and `hover:shadow-md` to the card; (d) add `transition-all duration-150` for smooth transitions; (e) add a CSS-in-JSX `<style>` block or use a global CSS selector in `src/index.css` for the reduced-motion override: `@media (prefers-reduced-motion: reduce) { .project-card:hover { transform: none; } }` — alternatively add `motion-safe:hover:-translate-y-[3px]` (Tailwind's built-in reduced-motion variant) instead of `hover:-translate-y-[3px]` so the transform only applies when motion is permitted

**Checkpoint**: US3 fully functional. Skills render as chips inside card-style category containers. Project cards lift on hover with accent border. Skills data is correct. Reduced-motion users see border/shadow change only, no transform.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Build verification, responsive QA, and accessibility confirmation across all three user stories.

- [x] T013 [P] Run `pnpm build` from repo root — verify TypeScript compiles clean (`tsc -b`), Vite bundles successfully, and `dist/` is generated; confirm JS bundle remains under 250KB gzipped and CSS under 25KB gzipped
- [x] T014 [P] QA responsive layout at four breakpoints using browser DevTools — at 375px: hero text legible, skills chips wrap cleanly, no horizontal scroll; at 768px: grid layouts correct; at 1280px: full desktop layout, active nav visible; at 2560px: content max-width preserved, no layout breaks; fix any Tailwind class issues found in `src/components/`
- [x] T015 [P] Verify accessibility compliance — check color contrast of `accent-600` text on white background meets WCAG 2.1 AA (≥ 4.5:1 for normal text, ≥ 3:1 for large text) using browser DevTools or axe; confirm all focus rings remain visible on Navbar links and project card links; confirm `prefers-reduced-motion` overrides are in effect for both card transforms and scroll behavior

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately; **BLOCKS all user stories**
- **US1 (Phase 2)**: Depends on Phase 1 (needs font and token setup)
- **US2 (Phase 3)**: Depends on Phase 1 (needs accent color token for active state)
- **US3 (Phase 4)**: Depends on Phase 1 (needs accent color token for hover); T010 depends on nothing and can run parallel with Phase 1
- **Polish (Phase 5)**: Depends on all user story phases complete

### User Story Dependencies

- **US1 (P1)**: Blocked only by Phase 1 — no dependency on US2 or US3
- **US2 (P2)**: Blocked only by Phase 1 — no dependency on US1 or US3 (different files)
- **US3 (P3)**: T010 (data change) can run immediately; T011/T012 blocked by Phase 1 only — no dependency on US1 or US2

### Within Each User Story

- US1: T003, T004, T005 can run in parallel → T006 depends on all three → T007 is independent of T006 (different file, depends only on Phase 1)
- US2: T008 first → T009 depends on T008
- US3: T010 runs independently → T011 and T012 are parallel (different files)

### Parallel Opportunities

- T003, T004, T005 (favicon assets) run in parallel within US1
- T011 and T012 (Skills and Projects component updates) run in parallel within US3
- T013, T014, T015 (polish tasks) are all independent and can run in parallel after US1–US3 complete
- After Phase 1, all three user stories can start simultaneously if desired

---

## Parallel Example: US1 Favicon Assets

```bash
# After T001+T002 (Phase 1), launch favicon assets in parallel:
Task: "T003 [US1] Create public/favicon.svg"
Task: "T004 [US1] Create public/favicon-32x32.png"
Task: "T005 [US1] Create public/apple-touch-icon.png"

# Then sequentially:
Task: "T006 [US1] Update index.html favicon links"
Task: "T007 [US1] Update Bio.tsx"
```

## Parallel Example: US3 Content Sections

```bash
# After Phase 1:
Task: "T010 [US3] Update src/data/skills.ts"   # can even run during Phase 1

# After T010:
Task: "T011 [US3] Update src/components/sections/Skills.tsx"
Task: "T012 [US3] Update src/components/sections/Projects.tsx"  # parallel with T011
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T002)
2. Complete Phase 2: US1 — Premium First Impression (T003–T007)
3. **STOP and VALIDATE**: Check favicon in browser tab (Chrome, Safari), verify Fraunces renders on hero name, confirm accent gradient on hero
4. Run `pnpm build` — TypeScript clean
5. Deploy to Vercel if ready — site immediately looks more premium

### Incremental Delivery

1. Phase 1 (T001–T002) → Design system wired
2. US1 (T003–T007) → **Deploy as visual MVP** — favicon + typography + hero depth
3. US2 (T008–T009) → **Re-deploy** — active nav established
4. US3 (T010–T012) → **Re-deploy** — skills + project polish complete
5. Polish (T013–T015) → Final production-quality validation

Each Vercel deploy takes ~30 seconds. Any phase can be released independently.

---

## Notes

- [P] tasks write to different files and have no cross-dependencies within the same phase
- T010 (skills data update) has zero dependencies — it can be done at any point, even before Phase 1 completes
- The Tailwind `motion-safe:` variant (T012) is the cleanest approach for `prefers-reduced-motion` on transforms — it generates the correct CSS without a separate media query
- PNG favicon generation (T004, T005) requires an external tool; if unavailable, the SVG favicon alone (T003) provides sufficient coverage for Chromium/Firefox — Safari will show no favicon until PNGs are generated, which is acceptable for an incremental deploy
- Run `pnpm build` after each phase checkpoint to catch TypeScript errors early
- Font rendering may differ slightly across OS/browser combinations — verify Fraunces renders in all three major browsers before final deploy
