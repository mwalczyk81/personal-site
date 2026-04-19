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
