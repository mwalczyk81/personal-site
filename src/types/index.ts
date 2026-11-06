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
}

// Writing section

export interface WritingSection {
  heading: string;
  paragraphs: string[];
}

export interface WritingPost {
  slug: string;
  title: string;
  summary: string;
  sections: WritingSection[];
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
