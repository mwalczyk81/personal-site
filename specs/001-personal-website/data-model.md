# Data Model: Personal Website — Matt Walczyk

**Feature**: `001-personal-website`
**Date**: 2026-04-19
**Source file**: `src/types/index.ts`

## Overview

All data is statically authored — no database, no API, no CMS. Content lives in typed TypeScript modules under `src/data/`. The types below define the shape of that content and of runtime state (contact form).

---

## Entities

### BioData

Represents Matt's personal and professional identity displayed in the hero/bio section.

```typescript
export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | string; // open string for extensibility
  url: string;       // fully-qualified URL
  label: string;     // accessible label, e.g. "GitHub profile"
}

export interface BioData {
  name: string;          // full name, e.g. "Matt Walczyk"
  title: string;         // professional title, e.g. "Software Development Manager & Engineer"
  summary: string;       // 2–4 sentence professional summary
  location?: string;     // optional, e.g. "Chicago, IL"
  avatarUrl?: string;    // optional path to profile photo in /public
  socialLinks: SocialLink[];
}
```

**Source file**: `src/data/bio.ts`
**Validation**: All required fields are non-empty strings. `socialLinks.url` must be a valid absolute URL. If `avatarUrl` is omitted, the Bio component renders a placeholder or initials fallback.

---

### SkillCategory / Skill

Represents Matt's competencies, grouped into categories for organized display.

```typescript
export interface Skill {
  name: string;  // e.g. "C#", "React", "Team Leadership"
}

export interface SkillCategory {
  name: string;       // e.g. "Languages", "Frameworks", "Leadership", "Tools"
  skills: Skill[];    // ordered list within the category
}
```

**Source file**: `src/data/skills.ts`
**Validation**: Each `SkillCategory` must have at least one `Skill`. Category names must be unique. Skill names within a category must be unique.

---

### Project

Represents a notable piece of work shown in the projects section.

```typescript
export interface Project {
  id: string;           // unique slug, e.g. "speckit", "personal-site"
  title: string;        // display name, e.g. "SpecKit"
  description: string;  // 1–3 sentence description of what it is and why it matters
  url?: string;         // optional external link (GitHub repo, live site, etc.)
  tags: string[];       // technology/domain tags, e.g. ["C#", ".NET", "CLI"]
  featured?: boolean;   // if true, rendered more prominently (optional v1 enhancement)
}
```

**Source file**: `src/data/projects.ts`
**Validation**: `id` must be unique across all projects. `title` and `description` are required. If `url` is provided it must be an absolute URL. `tags` may be empty but an empty array is preferred over omission.

---

### ContactFormValues / ContactFormState

Runtime state for the contact form — not persisted anywhere.

```typescript
export interface ContactFormValues {
  name: string;     // required, min 1 char after trim
  email: string;    // required, valid email format
  message: string;  // required, min 1 char after trim
}

export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactFormState {
  values: ContactFormValues;
  status: ContactFormStatus;
  errorMessage?: string;  // populated on 'error' status
}
```

**Source**: `src/hooks/useContactForm.ts` (runtime state, no persistence)

---

## State Transitions — Contact Form

```
idle
 └─► submitting   (user submits form with valid inputs)
       ├─► success  (Formspree returns 2xx)
       └─► error    (non-2xx response or network failure)

success ──► idle  (user clicks "Send another message" or edits a field)
error   ──► idle  (user edits any field to retry)
```

---

## Validation Rules

| Field     | Rule                                                       |
|-----------|------------------------------------------------------------|
| `name`    | Required. Non-empty after whitespace trim.                 |
| `email`   | Required. Must match standard email format (RFC 5322 subset). Validated client-side before submission. |
| `message` | Required. Non-empty after whitespace trim.                 |

Client-side validation runs on form submit (not on every keystroke). Errors are shown inline below each field. No server-side validation is in scope — Formspree performs its own checks as a secondary layer.

---

## Content Authoring Notes

All content is hard-coded in `src/data/`. To update site content:
- **Bio**: Edit `src/data/bio.ts` — update `name`, `title`, `summary`, `socialLinks`.
- **Skills**: Edit `src/data/skills.ts` — add/remove `SkillCategory` entries or individual `Skill` items.
- **Projects**: Edit `src/data/projects.ts` — add/remove `Project` entries; set `featured: true` for highlighted projects.
