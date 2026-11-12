// Bio section

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | string;
  url: string;
  label: string; // accessible label, e.g. "GitHub profile"
}

export interface BioData {
  name: string;
  title: string;
  summary: string;
  location?: string;
  avatarUrl?: string;
  socialLinks: SocialLink[];
}

// Skills section

export interface Skill {
  name: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

// Projects section

export interface ProjectLink {
  label: string;
  url: string;
}

/** A light and dark screenshot pair. Paths are under /public. */
export interface ProjectImage {
  light: string;
  dark: string;
  alt: string;
  width: number;
  height: number;
}

/** Extra content for a project that has its own page at /projects/:id. */
export interface ProjectPage {
  tagline: string;
  facts: string[];
  links: ProjectLink[];
  image: ProjectImage;
  /** "Try it" line: text, then a trailing link (e.g. the README). */
  tryIt: { text: string; linkLabel: string; url: string };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  tags: string[];
  featured?: boolean;
  type: 'open-source' | 'professional';
  /** Shown under the collapsed "Personal projects" heading instead of the main grid. */
  personal?: boolean;
  /** Case studies on this site that cover this project. */
  writeUps?: { label: string; path: string }[];
  /** When set, the card links to /projects/:id and the page renders this content. */
  page?: ProjectPage;
}

// Writing section

export interface WritingSubsection {
  heading: string;
  paragraphs: string[];
}

export interface WritingSection {
  heading: string;
  paragraphs: string[];
  /** Lead-in subheadings under this section, rendered after its paragraphs. */
  subsections?: WritingSubsection[];
}

export interface WritingLink {
  label: string;
  /** Site path ("/projects/roleradar") or an https URL. */
  href: string;
}

export interface WritingPost {
  slug: string;
  /** Publish date, ISO format (YYYY-MM-DD). */
  date: string;
  title: string;
  summary: string;
  /** Paragraphs shown before the first section heading. */
  intro?: string[];
  sections: WritingSection[];
  /** Related links shown after the last section. */
  links?: WritingLink[];
}

// Contact form

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactFormState {
  values: ContactFormValues;
  status: ContactFormStatus;
  errorMessage?: string;
}
