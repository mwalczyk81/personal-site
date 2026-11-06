import type { BioData } from '../types'

// TODO: Replace placeholder URLs with real profile links before going live.
const bio: BioData = {
  name: 'Matt Walczyk',
  title: 'Director of Software Development',
  summary:
    'I lead two engineering teams (16 engineers) building the Digital Banking Platform, ' +
    'a cloud-native API platform serving 2,000+ financial institutions on C#/.NET, Azure, Cosmos DB, and AKS. ' +
    'I care about clear, idiomatic code over clever patterns. ' +
    'I also build developer tooling, including AI tooling.',

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
