---

description: "Task list template for feature implementation"
---

# Tasks: Personal Website — Matt Walczyk

**Input**: Design documents from `specs/001-personal-website/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: No test tasks generated — not explicitly requested in spec. Vitest + RTL dependencies are installed in Phase 1 for future use; test files can be added alongside implementation tasks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Exact file paths are included in every task description

## Path Conventions

Single-project SPA at repository root:

```text
src/               → React components, hooks, types, data
tests/unit/        → Vitest unit tests (future)
vercel.json        → Vercel deployment config
.env.local         → Local environment variables (gitignored)
```

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Replace the default Vite starter, install all required dependencies, and create the deployment config.

- [x] T001 Install Tailwind CSS v4 and Vite plugin: `pnpm add -D tailwindcss @tailwindcss/vite`, then add `tailwindcss()` plugin to `vite.config.ts` alongside the existing react plugin
- [x] T002 Replace `src/index.css` contents with `@import "tailwindcss";` and add `html { scroll-behavior: smooth; }` global rule; delete `src/App.css`
- [x] T003 [P] Install Lucide React icon library: `pnpm add lucide-react`
- [x] T004 [P] Install test dependencies (for future use): `pnpm add -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom`
- [x] T005 [P] Create `vercel.json` at repo root with SPA rewrite rule: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- [x] T006 Create `.env.local` at repo root with placeholder: `VITE_FORMSPREE_ENDPOINT=your_form_id_here` (add `.env.local` to `.gitignore` if not already present)

**Checkpoint**: All dependencies installed, Tailwind configured, Vercel config in place, default starter cleaned up.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared TypeScript types, static data structure, Navbar, and App shell must be in place before any user story section can be built.

**⚠️ CRITICAL**: No user story implementation can begin until this phase is complete.

- [x] T007 Create `src/types/index.ts` with all shared TypeScript interfaces: `SocialLink`, `BioData`, `Skill`, `SkillCategory`, `Project`, `ContactFormValues`, `ContactFormStatus` (type alias), and `ContactFormState` — exact shapes from `specs/001-personal-website/data-model.md`
- [x] T008 [P] Create stub `src/components/sections/Bio.tsx` — renders `<section id="bio" aria-label="About">` with a placeholder `<p>` so App.tsx can import it without TypeScript errors
- [x] T009 [P] Create stub `src/components/sections/Skills.tsx` — renders `<section id="skills" aria-label="Skills">` with a placeholder `<p>`
- [x] T010 [P] Create stub `src/components/sections/Projects.tsx` — renders `<section id="projects" aria-label="Projects">` with a placeholder `<p>`
- [x] T011 [P] Create stub `src/components/sections/Contact.tsx` — renders `<section id="contact" aria-label="Contact">` with a placeholder `<p>`
- [x] T012 Create `src/components/layout/Navbar.tsx` — sticky nav bar with four anchor links per `contracts/navigation.md`: `href="#bio"` (About), `href="#skills"` (Skills), `href="#projects"` (Projects), `href="#contact"` (Contact); apply minimalist Tailwind styling (sticky top, background, responsive horizontal layout on desktop)
- [x] T013 Rewrite `src/App.tsx` to: remove all default Vite starter code, import `Navbar` and all four stub section components, render them in order (`<Navbar />`, `<Bio />`, `<Skills />`, `<Projects />`, `<Contact />`), remove the import of the deleted `App.css`

**Checkpoint**: Site renders in browser with Navbar and four placeholder sections. All anchor links scroll smoothly to correct section IDs. TypeScript compiles clean (`pnpm build`).

---

## Phase 3: User Story 1 — Discover Matt's Professional Identity (Priority: P1) 🎯 MVP

**Goal**: Bio section displays Matt's name, professional title, and summary paragraph above the fold on all screen widths (375px–2560px).

**Independent Test**: Open `http://localhost:5173`, confirm Matt's name, title, and a summary paragraph are visible without scrolling. Resize to 375px width and confirm no content is clipped. Click "About" in the Navbar and confirm the page scrolls to `#bio`.

### Implementation for User Story 1

- [x] T014 [P] [US1] Create `src/data/bio.ts` exporting a `BioData` constant with Matt's actual content: `name: "Matt Walczyk"`, `title: "Software Development Manager & Engineer"`, `summary` (2–4 sentence professional summary), `socialLinks` array with at minimum GitHub and LinkedIn entries (use placeholder URLs until Matt supplies them)
- [x] T015 [US1] Implement `src/components/sections/Bio.tsx` — replace the stub with a hero section that: imports `BioData` from `src/data/bio.ts`, renders name as an `<h1>`, title as a `<p>` or `<h2>`, summary as a `<p>`, and maps `socialLinks` to icon-accompanied anchor links using Lucide React icons (`Github`, `Linkedin`)
- [x] T016 [US1] Apply minimalist Tailwind styling to `src/components/sections/Bio.tsx` — full-viewport-height hero (`min-h-screen`), centered content, generous vertical padding, responsive text sizing (`text-4xl` on desktop → `text-2xl` on mobile), limited color palette (neutral/white background, dark text)

**Checkpoint**: US1 fully functional. Visitor can identify Matt's name and role within 10 seconds of page load. Bio renders correctly at 375px, 768px, 1280px, and 2560px.

---

## Phase 4: User Story 2 — Evaluate Technical and Leadership Skills (Priority: P2)

**Goal**: Skills section presents Matt's competencies organized by category in a scannable, responsive layout.

**Independent Test**: Scroll or click "Skills" in the Navbar. Confirm skill categories are visible with skill items listed under each. Resize to 375px and confirm all skills are legible without horizontal scrolling or truncation.

### Implementation for User Story 2

- [x] T017 [P] [US2] Create `src/data/skills.ts` exporting a `SkillCategory[]` constant with Matt's actual skills organized into meaningful categories (e.g. "Languages & Runtimes", "Frameworks & Libraries", "Tools & Infrastructure", "Leadership & Process")
- [x] T018 [US2] Implement `src/components/sections/Skills.tsx` — replace the stub with a section that: imports `SkillCategory[]` from `src/data/skills.ts`, renders each category as a group with a category heading and a list/grid of skill names
- [x] T019 [US2] Apply minimalist Tailwind styling to `src/components/sections/Skills.tsx` — alternating background or subtle dividers between categories, responsive grid layout (`grid-cols-2` on mobile → `grid-cols-4` on desktop), consistent padding and whitespace

**Checkpoint**: US2 fully functional. Hiring manager can scan all of Matt's competency areas at a glance. Skills section works independently at all breakpoints.

---

## Phase 5: User Story 3 — Browse Notable Projects (Priority: P3)

**Goal**: Projects section displays notable work as scannable cards with titles, descriptions, and optional external links that open in a new tab.

**Independent Test**: Scroll or click "Projects" in the Navbar. Confirm at least one project card renders with a title and description. If a URL is defined, confirm the link opens in a new browser tab without navigating away from the site. Resize to 375px and confirm no horizontal scrolling.

### Implementation for User Story 3

- [x] T020 [P] [US3] Create `src/data/projects.ts` exporting a `Project[]` constant with Matt's actual projects (minimum 1 entry); each entry includes `id`, `title`, `description`, `url` (optional), and `tags`; use placeholder data if Matt hasn't yet supplied project details
- [x] T021 [US3] Implement `src/components/sections/Projects.tsx` — replace the stub with a section that: imports `Project[]` from `src/data/projects.ts`, maps each project to a card showing title, description, tags, and an external link icon + anchor (`target="_blank" rel="noopener noreferrer"`) when `url` is defined
- [x] T022 [US3] Apply minimalist Tailwind styling to `src/components/sections/Projects.tsx` — card-based layout with subtle borders or shadows, responsive grid (`grid-cols-1` on mobile → `grid-cols-2` or `grid-cols-3` on desktop), tags displayed as small badges, consistent padding

**Checkpoint**: US3 fully functional. Technical peer can browse Matt's projects and follow external links. Layout holds at all target breakpoints without horizontal scrolling.

---

## Phase 6: User Story 4 — Contact Matt Directly (Priority: P4)

**Goal**: Contact section presents a validated form that delivers messages to Matt via Formspree and shows clear success/error feedback.

**Independent Test**: Scroll or click "Contact" in the Navbar. Submit the form with empty fields — confirm inline validation errors appear for each required field. Submit with a malformed email — confirm email validation error. Fill all fields with valid data and submit — confirm a success message appears and the form clears. Disconnect from the internet and submit valid data — confirm a friendly error message appears.

### Implementation for User Story 4

- [x] T023 [US4] Create `src/hooks/useContactForm.ts` — implements `ContactFormState` management: initial idle state, field update handler, client-side validation (name required, email valid format, message required), Formspree POST to `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ENDPOINT}` with JSON body and `Accept: application/json`, state transitions per `data-model.md` (`idle → submitting → success/error`), 10-second timeout per `contracts/contact-form.md`
- [x] T024 [US4] Implement `src/components/sections/Contact.tsx` — replace the stub with a section that: uses `useContactForm` hook, renders labeled inputs for name, email, and message, shows inline validation error messages below each field (from `ContactFormState`), renders a submit button disabled during `submitting` status, shows a success banner when status is `success`, shows an error message with retry guidance when status is `error`
- [x] T025 [US4] Apply minimalist Tailwind styling to `src/components/sections/Contact.tsx` — clean form layout with consistent input sizing, visible focus rings (WCAG 2.1 AA), error state styling (red border/text), success state styling (green or neutral confirmation banner), responsive single-column layout on mobile

**Checkpoint**: US4 fully functional. Visitor can successfully send a message. Invalid submissions are blocked with clear feedback. Success and error states are clearly distinguishable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, responsive QA, mobile navigation, and production validation across all four user stories.

- [ ] T026 [P] Add `aria-label` attributes to all `<section>` elements (already on stubs — verify these are preserved after implementation), add `aria-current="page"` or active styling to Navbar links, ensure all interactive elements have accessible labels — edit `src/components/sections/*.tsx` and `src/components/layout/Navbar.tsx`
- [ ] T027 [P] Implement mobile hamburger menu in `src/components/layout/Navbar.tsx` — on screens narrower than 768px (`md:` breakpoint), show a hamburger icon button (Lucide `Menu` icon) that toggles a dropdown or slide-in drawer with the four nav links; use React `useState` for open/closed state
- [ ] T028 [P] Verify hash deep-link navigation for all four section IDs — open `http://localhost:5173/#bio`, `#skills`, `#projects`, and `#contact` directly in the browser and confirm each loads the app and scrolls to the correct section; fix any `vercel.json` or `id` attribute issues found
- [ ] T029 QA responsive layout at four breakpoints — use browser DevTools to test at 375px, 768px, 1280px, and 2560px; fix any Tailwind class issues in `src/components/sections/*.tsx` and `src/components/layout/Navbar.tsx` that cause overflow, truncation, or layout breaks
- [ ] T030 Run production build and TypeScript check — `pnpm build`; resolve all TypeScript errors and warnings; confirm the `dist/` output is generated without errors
- [ ] T031 Run Lighthouse audit in Chrome DevTools against the built site (`pnpm preview`) — target Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90; resolve any flagged issues in `src/` files or `index.html`

**Checkpoint**: Production build passes TypeScript. Lighthouse score ≥ 90 on all four categories. Site is WCAG 2.1 AA compliant. Mobile hamburger menu works. All deep links resolve correctly.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **User Stories (Phases 3–6)**: All depend on Phase 2 completion; can then proceed in priority order (P1 → P2 → P3 → P4) or in parallel if capacity allows
- **Polish (Phase 7)**: Depends on all four user story phases being complete

### User Story Dependencies

- **US1 — Bio (P1)**: Can start after Phase 2 — no dependency on other user stories
- **US2 — Skills (P2)**: Can start after Phase 2 — no dependency on US1 (different component and data file)
- **US3 — Projects (P3)**: Can start after Phase 2 — no dependency on US1 or US2
- **US4 — Contact (P4)**: Can start after Phase 2 — no dependency on other user stories (depends only on `useContactForm` hook and Formspree endpoint config from Phase 1)

### Within Each User Story

- Data file [P] task can begin immediately (parallel with other data files)
- Component implementation depends on the data file existing
- Styling task follows component implementation (or can be done inline)

### Parallel Opportunities

- T003, T004, T005, T006 can all run in parallel after T001 completes
- T008, T009, T010, T011 (stub components) can all run in parallel after T007 completes
- T014, T017, T020 (data files for US1, US2, US3) can all run in parallel after Phase 2 completes
- T026, T027, T028, T029 (Polish tasks) can run in parallel after Phase 6 completes

---

## Parallel Example: Foundational Stubs

```bash
# After T007 (types) completes, launch all stub components in parallel:
Task: "T008 Create stub Bio.tsx"
Task: "T009 Create stub Skills.tsx"
Task: "T010 Create stub Projects.tsx"
Task: "T011 Create stub Contact.tsx"
```

## Parallel Example: Data Files (after Phase 2)

```bash
# Launch all data file tasks together:
Task: "T014 [US1] Create src/data/bio.ts"
Task: "T017 [US2] Create src/data/skills.ts"
Task: "T020 [US3] Create src/data/projects.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T006)
2. Complete Phase 2: Foundational (T007–T013)
3. Complete Phase 3: US1 — Bio (T014–T016)
4. **STOP and VALIDATE**: Bio section visible above the fold, name/title/summary correct, responsive at 375px
5. Run `pnpm build` to confirm TypeScript is clean
6. Deploy to Vercel if ready — site already shows bio with Navbar

### Incremental Delivery

1. Setup (T001–T006) + Foundational (T007–T013) → Site scaffolded with stubs
2. US1 Bio (T014–T016) → **Deploy as MVP** — professional identity established
3. US2 Skills (T017–T019) → **Re-deploy** — competencies visible
4. US3 Projects (T020–T022) → **Re-deploy** — portfolio visible
5. US4 Contact (T023–T025) → **Re-deploy** — fully contactable
6. Polish (T026–T031) → Final production-quality release

Each Vercel deploy takes ~30 seconds. Any phase can be released independently.

---

## Notes

- [P] tasks write to different files and have no cross-dependencies within the same phase
- [Story] labels map tasks to acceptance scenarios in `specs/001-personal-website/spec.md`
- Stub components (T008–T011) are intentionally minimal — they exist only to satisfy TypeScript imports; replace them fully in each US phase
- Content in `src/data/*.ts` uses placeholder data where Matt's actual content is not yet available; update before final deploy
- `VITE_FORMSPREE_ENDPOINT` must be set in both `.env.local` (local dev) and Vercel dashboard (production) before US4 works
- Run `pnpm build` after each phase checkpoint to catch TypeScript errors early
- Commit after each phase or task group for clean rollback points
