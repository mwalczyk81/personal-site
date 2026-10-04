# Matt Walczyk — Personal Website

[![CI](https://github.com/mwalczyk81/personal-site/actions/workflows/ci.yml/badge.svg)](https://github.com/mwalczyk81/personal-site/actions/workflows/ci.yml)

Source code for [mattwalczyk.com](https://mattwalczyk.com), a modern single-page portfolio and engineering showcase built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## Overview

This repository contains the full source code for Matt Walczyk's personal site. The site is designed as a high-performance, accessible, and responsive single-page application (SPA) showcasing software leadership, full-stack enterprise platform engineering, and open-source developer tooling.

### Key Highlights

- **Fast & Lightweight**: Static SPA built with Vite 8 and React 19, delivering minimal bundle overhead and sub-second asset hydration.
- **Dark Mode Support**: Seamless toggle between dark and light themes with preference detection via `prefers-color-scheme` and persistence in `localStorage`.
- **Responsive & Accessible**: Mobile-first design adhering to WCAG 2.1 AA standards, responsive across screen sizes from 375px mobile to ultra-wide displays.
- **Formspree Contact Integration**: Client-side validated contact form with asynchronous submission, rate limit handling, and timeout safeguards.
- **100% Test Coverage**: Comprehensive test suite with 40 unit and integration tests using Vitest 5 and React Testing Library.
- **Automated Quality Gates**: Pre-commit validation via Husky and automated CI builds on GitHub Actions.

---

## Sections

1. **Hero / About**: Professional summary, background in software engineering leadership (Director of Software Development), and verified GitHub / LinkedIn links.
2. **Skills**: Categorized technical capabilities spanning Languages & Runtimes, Frameworks & Libraries, Testing & Quality, Infrastructure & DevOps, and Leadership & Process.
3. **Projects**: Showcase of key work including:
   - **Enterprise Architecture**: Fiserv Digital Banking Platform accounts service layer rewrite, AI security analysis tools, and Azure DevOps compliance automation.
   - **Open-Source Tools**:
     - [`specprobe`](https://github.com/mwalczyk81/specprobe): Local-first CLI turning OpenAPI specs into searchable vector indices and deterministic test suites.
     - [`mogboard-mcp`](https://github.com/mwalczyk81/mogboard-mcp): Python MCP server providing FFXIV market board data to AI assistants.
     - [`mcp-fitbit-obsidian`](https://github.com/mwalczyk81/mcp-fitbit-obsidian): Python MCP server syncing Fitbit telemetry to Obsidian daily notes.
     - [`system-monitor`](https://github.com/mwalczyk81/system-monitor): Cross-platform performance monitor built with .NET MAUI and Blazor.
4. **Contact**: Direct communication form backed by Formspree with inline error feedback and submission state management.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & UI** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) (pinned ~6.0.3) |
| **Build & Tooling** | [Vite 8](https://vite.dev/), [pnpm](https://pnpm.io/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite` |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Testing** | [Vitest 5](https://vitest.dev/), [React Testing Library](https://testing-library.com/), [jsdom 30](https://github.com/jsdom/jsdom), [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom) |
| **Code Quality** | [ESLint 10](https://eslint.org/), [typescript-eslint](https://typescript-eslint.io/) |
| **Git Hooks** | [Husky 9](https://typicode.github.io/husky/), `.pre-commit-config.yaml` |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/), [Cloudflare](https://www.cloudflare.com/) (DNS & HTTPS), [GitHub Actions](https://github.com/features/actions) |
| **Form Delivery** | [Formspree](https://formspree.io/) |

---

## Project Structure

```text
personal-site/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI workflow (lint, test, build)
├── .husky/
│   └── pre-commit              # Git pre-commit hook (lint, test, build)
├── public/                     # Static favicons, OG image, and SVG icons
├── src/
│   ├── assets/                 # Profile images and visual assets
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.tsx      # Sticky nav header with active section tracking
│   │   └── sections/
│   │       ├── Bio.tsx         # Hero / about section
│   │       ├── Contact.tsx     # Formspree contact form
│   │       ├── Projects.tsx    # Professional & open-source project grid
│   │       └── Skills.tsx      # Categorized skill badges
│   ├── data/
│   │   ├── bio.ts              # Bio text, title, and social links
│   │   ├── projects.ts         # Project metadata, tags, and URLs
│   │   └── skills.ts           # Skill categories and items
│   ├── hooks/
│   │   ├── useActiveSection.ts # Viewport IntersectionObserver hook
│   │   ├── useContactForm.ts   # Form state, validation, and submission logic
│   │   └── useDarkMode.ts      # Theme state and localStorage persistence
│   ├── types/
│   │   └── index.ts            # Shared TypeScript data models
│   ├── App.tsx                 # Root application component
│   ├── index.css               # Tailwind CSS imports and global styles
│   └── main.tsx                # Application DOM entry point
├── tests/
│   ├── setup.ts                # Vitest global setup, JSDOM stubs, and cleanups
│   └── unit/
│       ├── App.test.tsx        # Integration smoke tests
│       ├── components/         # Component unit tests (Bio, Skills, Projects, Navbar, Contact)
│       ├── data/               # Data model validation and specprobe invariants
│       └── hooks/              # Custom hook tests (active section, contact form, dark mode)
├── .env.example                # Example environment variables
├── .pre-commit-config.yaml     # Standard pre-commit configuration
├── eslint.config.js            # ESLint 10 flat configuration
├── package.json                # Project dependencies and script definitions
├── tsconfig.app.json           # Application TypeScript configuration
├── vercel.json                 # Vercel SPA routing and HTTPS headers
└── vite.config.ts              # Vite & Vitest configuration
```

---

## Getting Started

### Prerequisites

- **Node.js**: `v22.0.0` or higher
- **pnpm**: `v10.0.0` or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mwalczyk81/personal-site.git
   cd personal-site
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` to provide your Formspree endpoint ID:
   ```env
   VITE_FORMSPREE_ENDPOINT=your_formspree_form_id
   ```

### Running Locally

Start the Vite development server with Hot Module Replacement (HMR):

```bash
pnpm dev
```

Navigate to `http://localhost:5173` in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the Vite local development server. |
| `pnpm build` | Type-checks with `tsc -b` and builds minified assets for production in `dist/`. |
| `pnpm preview` | Serves the production build locally for verification. |
| `pnpm test` | Runs the full Vitest unit test suite once. |
| `pnpm run test:watch` | Starts Vitest in interactive watch mode for rapid TDD. |
| `pnpm run test:coverage`| Runs Vitest with V8 coverage reporting in terminal and HTML. |
| `pnpm run lint` | Runs ESLint 10 over all TypeScript and TSX files. |
| `pnpm run lint:fix` | Automatically fixes autofixable ESLint errors. |

---

## Testing & Quality Assurance

Testing is built with **Vitest 5** and **React Testing Library**:

- **Test Suite**: 40 unit and component tests across 10 dedicated test files.
- **Coverage**: **100% line coverage** across all components, custom hooks, and data definitions.
- **Mock Strategy**: Realistic JSDOM mocks for `window.matchMedia` and `window.IntersectionObserver` with automatic cleanup between runs.

Run the test suite with detailed coverage:

```bash
pnpm run test:coverage
```

### Git Hooks

The repository uses **Husky** to enforce quality before code enters version control. On each `git commit`, the pre-commit hook automatically executes:
1. `pnpm run lint` (ESLint 10 validation)
2. `pnpm test` (Unit test suite execution)
3. `pnpm run build` (TypeScript compilation + production bundle)

---

## CI/CD & Deployment

- **Continuous Integration**: Powered by GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)). On every pull request and push to `main`, the workflow executes frozen-lockfile installation, linting, tests, and production build checks.
- **Continuous Deployment**: Hosted on [Vercel](https://vercel.com) with automatic deployments triggered on pushes to `main`.
- **Edge Network**: DNS and SSL termination managed via [Cloudflare](https://www.cloudflare.com) with full HTTPS enforcement.

---

## License

This project is personal and proprietary. All rights reserved.
