# Feature Specification: Visual Redesign — Premium Personal Site

**Feature Branch**: `002-visual-redesign`
**Created**: 2026-04-19
**Status**: Draft
**Input**: User description: "Redesign the personal site for visual impact. Goals: remove the default Vite favicon and replace with an "MW" monogram favicon, improve typography with better font pairing, add subtle depth with shadows/gradients/color accents, make the hero section more striking, improve the skills grid layout, make project cards more polished with hover effects, and add smooth scroll behavior with active nav highlighting. Keep the minimalist aesthetic but make it feel premium. Remove Java, Karate, and Dredd from skills, add Postman."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Premium First Impression (Priority: P1)

A first-time visitor arrives at the site and within seconds forms a positive, professional impression. The browser tab shows a distinctive "MW" monogram rather than a generic icon, the typography feels considered and elegant, and the hero section is visually arresting — not just plain text on a white background. The overall aesthetic remains clean and minimal, but it now reads as intentional and polished rather than default.

**Why this priority**: The hero section and favicon are the very first things a visitor perceives. This is the highest-leverage change for leaving a strong professional impression on hiring managers and peers.

**Independent Test**: Open the deployed site in a fresh browser tab. The tab shows the MW monogram favicon. The hero section has a visually distinctive quality — depth, accent color, or typographic weight that makes it stand out. Share a screenshot with a peer and ask whether it reads as a premium portfolio; the answer should be yes without prompting.

**Acceptance Scenarios**:

1. **Given** a visitor opens the site in a browser, **When** the page loads, **Then** the browser tab displays an "MW" monogram favicon instead of the default Vite icon.
2. **Given** a visitor views the hero section, **When** they arrive at the page, **Then** the hero uses a premium font pairing (distinct display font for the name, complementary body font for descriptive text) that is legible and visually hierarchical.
3. **Given** a visitor views the hero section, **When** they arrive at the page, **Then** the section has visible depth — at least one of: a subtle gradient background, a color accent element, or a typographic treatment that differentiates it from a plain white page.
4. **Given** a visitor on mobile (375px width), **When** they view the hero, **Then** all text is legible, nothing is clipped, and the premium feel is preserved.

---

### User Story 2 — Effortless Navigation with Active Awareness (Priority: P2)

A visitor is scrolling through the site and always knows which section they are in. The navigation bar highlights the active section link as they scroll, providing a sense of orientation and polish. Navigating between sections by clicking nav links produces a smooth scroll rather than an abrupt jump.

**Why this priority**: Active nav highlighting and smooth scrolling are low-effort, high-impact polish signals. They make the site feel more like a carefully crafted product and less like a static document.

**Independent Test**: Open the site and slowly scroll from top to bottom. Each section's corresponding nav link becomes visually distinct (highlighted, underlined, or bolder) as that section occupies the viewport. Clicking a nav link scrolls smoothly to the section rather than jumping. Test at 375px and 1280px widths.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls down through the site, **When** a new section enters the viewport, **Then** its corresponding navigation link is visually distinguished from the inactive links (e.g., different color, weight, or underline).
2. **Given** a visitor clicks a navigation link, **When** the link is activated, **Then** the page scrolls smoothly to the target section rather than jumping instantly.
3. **Given** a visitor is at the very top of the page (bio section), **When** the page loads, **Then** the "About" nav link is shown as active.
4. **Given** the page is scrolled to a section, **When** the visitor uses the back button or browser navigation, **Then** the active nav state updates to reflect the new scroll position.

---

### User Story 3 — Refined Content Sections (Priority: P3)

A visitor scrolling through the Skills and Projects sections experiences a more visually polished layout. Skills are presented in a grid that makes better use of space and is easier to scan. Project cards have a hover interaction that signals interactivity and adds a sense of depth. The section backgrounds and spacing create visual rhythm that guides the eye down the page. The skills list reflects current tools (Java, Karate, and Dredd removed; Postman added).

**Why this priority**: These sections contain the core content — skills and work samples — that a hiring manager evaluates. Polished presentation increases perceived credibility.

**Independent Test**: Scroll to the Skills section and hover over (or tap on mobile) various skill categories. Scroll to Projects and hover over project cards — each card responds with a visible effect (shadow lift, border color change, or subtle transform). Resize to 375px and confirm skills and projects remain legible and well-laid-out. Verify Postman appears in the skills list and Java, Karate, and Dredd do not.

**Acceptance Scenarios**:

1. **Given** a visitor views the Skills section, **When** they scan it, **Then** skills are organized in an improved grid that makes better use of horizontal space and is easy to scan at a glance.
2. **Given** a visitor hovers over a project card, **When** the hover state is triggered, **Then** the card responds with a visible visual effect (e.g., shadow elevation, accent border, or slight upward movement) within 200ms.
3. **Given** a visitor views the skills list, **When** they scan it, **Then** Postman is present and Java, Karate, and Dredd are absent.
4. **Given** a visitor on any screen width, **When** they scroll through content sections, **Then** section backgrounds, spacing, or dividers create clear visual separation between sections without hard borders.

---

### Edge Cases

- What happens when the user has reduced motion preferences enabled? Hover effects and scroll animations must respect `prefers-reduced-motion` and fall back gracefully.
- What happens on touch devices where hover states don't fire? Cards must remain visually distinct and interactive without relying exclusively on hover.
- What happens if the custom font fails to load? A well-chosen system font fallback must preserve legibility and hierarchy.
- What happens if the favicon format is not supported by an older browser? The page must still render correctly; the favicon is an enhancement, not a requirement.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST display a custom "MW" monogram favicon in browser tabs, bookmarks, and mobile home screen shortcuts, replacing the default Vite placeholder icon.
- **FR-002**: The site MUST apply a premium font pairing: a distinct display or serif font for large headings (name, section titles) and a complementary sans-serif for body and descriptive text.
- **FR-003**: The hero section MUST include at least one visual depth element — a subtle gradient, color accent, decorative typographic treatment, or background texture — while preserving the minimalist character of the overall design.
- **FR-004**: The navigation MUST highlight the link corresponding to the section currently visible in the viewport as the visitor scrolls.
- **FR-005**: The navigation MUST scroll smoothly to the target section when a nav link is clicked (smooth scroll behavior).
- **FR-006**: The Skills section MUST present skills in an improved grid layout that more effectively uses horizontal space compared to the current implementation.
- **FR-007**: Project cards MUST respond to hover interaction with a visible effect (shadow, border accent, or slight vertical displacement) that completes within 200ms.
- **FR-008**: The skills data MUST be updated: Java, Karate, and Dredd removed; Postman added to the appropriate category.
- **FR-009**: All transition and animation effects MUST respect the `prefers-reduced-motion` media query, reducing or eliminating motion for users who prefer it.
- **FR-010**: Page load performance MUST NOT degrade — the visual improvements must not cause a meaningful increase in initial load time.
- **FR-011**: All changes MUST preserve WCAG 2.1 AA accessibility compliance: color contrast ratios, focus visibility, and screen reader compatibility must remain intact or improve.

### Key Entities

- **Favicon**: A browser-displayable icon (16×16, 32×32, and ideally SVG) representing the "MW" monogram in the site's brand style.
- **Typography Scale**: A defined pairing of display and body typefaces applied consistently across headings, labels, and body text throughout the site.
- **Active Nav State**: The visual styling applied to the navigation link whose corresponding section is currently in the viewport.
- **Card Hover State**: The visual treatment applied to a project card when a pointer device hovers over it.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor, shown the redesigned site for 5 seconds, can identify it as a premium professional portfolio without additional prompting (qualitative peer review criterion).
- **SC-002**: The active navigation link is always visually distinct from inactive links as the visitor scrolls — verifiable on all four breakpoints (375px, 768px, 1280px, 2560px).
- **SC-003**: All project card hover effects complete within 200ms of the pointer entering the card, with no visible jank on standard hardware.
- **SC-004**: Lighthouse Performance score remains ≥ 90 after the redesign is applied.
- **SC-005**: The "MW" favicon is correctly displayed in the browser tab on Chrome, Firefox, and Safari.
- **SC-006**: Typography is legible at all target breakpoints — no overflow, truncation, or loss of hierarchy from 375px to 2560px.
- **SC-007**: The skills list contains Postman and does not contain Java, Karate, or Dredd — verifiable by direct inspection.
- **SC-008**: Hover effects are absent or substituted with a non-motion alternative when `prefers-reduced-motion: reduce` is active.

## Assumptions

- The redesign preserves the existing site structure (Bio, Skills, Projects, Contact sections) and only modifies visual presentation and the skills data.
- Custom fonts will be loaded from a web font service (e.g., Google Fonts) or bundled; the font selection should prioritize performance (minimal weight, subset loading where possible).
- The "MW" monogram favicon will be produced as an inline SVG or PNG; no external design assets are required beyond what can be generated in code.
- Active nav highlighting will use Intersection Observer for scroll detection, which is universally supported in all target browsers.
- Color accents will be drawn from a neutral, professional palette (e.g., slate, stone, or a single restrained accent hue) rather than introducing bright or saturated colors that conflict with the minimalist aesthetic.
- The contact section and form behavior are out of scope for this redesign — only visual styling may be adjusted for consistency.
- No new sections or navigation items are added; the four existing sections remain unchanged in structure.
