import type { SkillCategory } from '../types'

const skills: SkillCategory[] = [
  {
    name: 'Languages & Runtimes',
    skills: [
      { name: 'C# / .NET' },
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Python' },
      { name: 'PowerShell' },
    ],
  },
  {
    name: 'Frameworks & Libraries',
    skills: [
      { name: 'ASP.NET Core' },
      { name: 'Blazor' },
      { name: 'React' },
      { name: 'Django' },
      { name: 'Click' },
      { name: 'pandas' },
      { name: 'MCP' },
    ],
  },
  {
    name: 'Testing & Quality',
    skills: [
      { name: 'Playwright' },
      { name: 'Vitest' },
      { name: 'xUnit' },
      { name: 'TUnit' },
      { name: 'Portman' },
      { name: 'Postman' },
    ],
  },
  {
    name: 'Infrastructure & DevOps',
    skills: [
      { name: 'Azure' },
      { name: 'Cosmos DB' },
      { name: 'AKS' },
      { name: 'Kubernetes' },
      { name: 'Docker' },
      { name: 'AWS' },
      { name: 'Azure DevOps' },
      { name: 'Apache Kafka' },
      { name: 'Git' },
      { name: 'CI/CD Pipelines' },
    ],
  },
  {
    name: 'Leadership & Process',
    skills: [
      { name: 'Engineering Management' },
      { name: 'Technical Roadmaps' },
      { name: 'Code Review' },
      { name: 'Agile / Scrum' },
    ],
  },
]

export default skills
