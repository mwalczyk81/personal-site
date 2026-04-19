# Implementation Plan: Personal Website — Matt Walczyk

**Branch**: `001-personal-website` | **Date**: 2026-04-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-personal-website/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build a single-page personal website for Matt Walczyk (Software Development Manager and engineer) with four sections — bio, skills, projects, and contact — using React 19, Vite 8, TypeScript 6, and Tailwind CSS v4. The contact form delivers messages via Formspree. The site deploys to Vercel at mattwalczyk.com with HTTPS enforced. All content is statically authored; no backend or CMS is required.

## Technical Context

**Language/Version**: TypeScript 6 / ES2023
**Primary Dependencies**: React 19, Vite 8, Tailwind CSS v4, Formspree, Lucide React, Vitest, @testing-library/react
**Storage**: N/A (static site — no database)
**Testing**: Vitest, @testing-library/react, @testing-library/user-event, jsdom
**Target Platform**: Web browser (Chrome, Firefox, Safari, Edge — current and previous major); hosted on Vercel CDN
**Project Type**: web-application (single-page app, static)
**Performance Goals**: Lighthouse score ≥ 90; LCP < 3s on broadband; bundle < 200KB gzipped
**Constraints**: Zero server-side runtime; WCAG 2.1 AA; responsive 375px–2560px
**Scale/Scope**: Low-traffic personal site; no horizontal scaling required

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project constitution (`/.specify/memory/constitution.md`) contains only unfilled template placeholders — no project-specific principles have been ratified for this repository. No constitution gates are in effect. This is recorded as an informational note; the constitution should be completed before additional features are planned.

**Post-design re-check**: No violations. Architecture is a minimal single-project SPA — the simplest viable structure for the requirements.

## Project Structure

### Documentation (this feature)

```text
specs/001-personal-website/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── contact-form.md
│   └── navigation.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          # Sticky nav with anchor links to each section
│   └── sections/
│       ├── Bio.tsx             # Hero/bio section (P1)
│       ├── Skills.tsx          # Skills section (P2)
│       ├── Projects.tsx        # Projects section (P3)
│       └── Contact.tsx         # Contact form section (P4)
├── data/
│   ├── bio.ts                  # Static bio content (BioData)
│   ├── skills.ts               # Static skills data (SkillCategory[])
│   └── projects.ts             # Static projects data (Project[])
├── hooks/
│   └── useContactForm.ts       # Form state and Formspree submission logic
├── types/
│   └── index.ts                # Shared TypeScript types
├── App.tsx                     # Root component — assembles Navbar + all sections
├── main.tsx                    # Entry point (unchanged from scaffold)
└── index.css                   # @import "tailwindcss" + global scroll-behavior

tests/
└── unit/
    ├── components/
    │   ├── Bio.test.tsx
    │   ├── Skills.test.tsx
    │   ├── Projects.test.tsx
    │   └── Contact.test.tsx
    └── hooks/
        └── useContactForm.test.ts

vercel.json                     # SPA routing rewrites + HTTPS redirect
.env.local                      # VITE_FORMSPREE_ENDPOINT (gitignored)
```

**Structure Decision**: Single-project SPA (Option 1 variant). No separate backend directory — all server concerns are delegated to Formspree and Vercel. The `data/` directory holds static content as typed TypeScript modules, which keeps content editable without touching component logic.
