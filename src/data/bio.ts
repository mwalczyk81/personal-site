import type { BioData } from '../types'

// TODO: Replace placeholder URLs with real profile links before going live.
const bio: BioData = {
  name: 'Matt Walczyk',
  title: 'Software Development Manager & Engineer',
  summary:
    'I build and lead software teams that ship products people rely on. ' +
    'With a background spanning full-stack engineering, platform development, and team leadership, ' +
    'I bring both the technical depth to solve hard problems and the people focus to help teams do their best work. ' +
    "I'm passionate about clean systems, developer experience, and building things that last.",

  socialLinks: [
    {
      platform: 'github',
      url: 'https://github.com/mwalczyk81',   // TODO: confirm username
      label: 'GitHub profile',
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/walczykmatthew', // TODO: confirm handle
      label: 'LinkedIn profile',
    },
  ],
}

export default bio
