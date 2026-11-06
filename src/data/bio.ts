import type { BioData } from '../types'

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
      url: 'https://github.com/mwalczyk81',
      label: 'GitHub profile',
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/walczykmatthew',
      label: 'LinkedIn profile',
    },
  ],
}

export default bio
