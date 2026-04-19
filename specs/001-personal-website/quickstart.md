# Quickstart: Personal Website — Matt Walczyk

**Feature**: `001-personal-website`
**Stack**: React 19 + Vite 8 + TypeScript 6 + Tailwind CSS v4 + Formspree + Vercel

---

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **pnpm** (project uses pnpm — see `pnpm-lock.yaml`)
- **Formspree account** — free tier at [formspree.io](https://formspree.io)
- **Vercel account** — free tier at [vercel.com](https://vercel.com)

---

## 1. Install Dependencies

The project is already scaffolded with React, Vite, and TypeScript. Install the base dependencies first, then add new ones:

```bash
# Install existing dependencies
pnpm install

# Add Tailwind CSS v4 (Vite-native plugin)
pnpm add -D tailwindcss @tailwindcss/vite

# Add Lucide icons
pnpm add lucide-react

# Add test dependencies
pnpm add -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

---

## 2. Configure Tailwind CSS v4

Update `vite.config.ts` to add the Tailwind plugin:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

Replace the contents of `src/index.css` with:

```css
@import "tailwindcss";

html {
  scroll-behavior: smooth;
}
```

---

## 3. Configure Formspree

1. Sign in to [formspree.io](https://formspree.io) and create a new form.
2. Copy the form ID (the part after `/f/` in the endpoint URL, e.g. `xabcd1234`).
3. Create `.env.local` at the repo root (this file is gitignored):

```env
VITE_FORMSPREE_ENDPOINT=xabcd1234
```

---

## 4. Configure Vitest

Add a `test` configuration block to `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
  },
})
```

Create `tests/setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

Add the `test` script to `package.json`:

```json
"scripts": {
  "test": "vitest",
  "test:run": "vitest run"
}
```

---

## 5. Add Vercel Configuration

Create `vercel.json` at the repo root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This ensures all routes (including hash-anchored direct links) serve `index.html`.

---

## Development

```bash
pnpm dev
```

Opens at `http://localhost:5173` with Hot Module Replacement (HMR).

---

## Testing

```bash
pnpm test          # Watch mode
pnpm test:run      # Single run (CI)
```

---

## Build and Preview

```bash
pnpm build         # TypeScript check + Vite build → dist/
pnpm preview       # Serve dist/ locally at http://localhost:4173
```

---

## Deployment to Vercel

1. Push the repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Vercel auto-detects Vite. Build command: `pnpm build`. Output directory: `dist`.
4. Add Environment Variable in Vercel dashboard:
   - Key: `VITE_FORMSPREE_ENDPOINT`
   - Value: your Formspree form ID
5. Deploy.
6. In Vercel → **Domains**, add `mattwalczyk.com`.
7. Update DNS at your registrar to point to Vercel's nameservers (Vercel provides the DNS records after adding the domain).

HTTPS is enforced automatically by Vercel for custom domains.

---

## Content Updates

All site content is statically authored in `src/data/`:

| File | Content |
|------|---------|
| `src/data/bio.ts` | Name, title, summary, social links |
| `src/data/skills.ts` | Skill categories and individual skills |
| `src/data/projects.ts` | Project entries with descriptions and links |

Edit these files and run `pnpm build` to update the site. No CMS or API calls are involved.
