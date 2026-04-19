import type { Project } from '../types'

const projects: Project[] = [
  {
    id: 'pr-review-optimizer',
    title: 'PR Review Optimizer',
    description:
      'Python CLI tool that integrates with Azure DevOps to score pull request complexity using Roslyn AST analysis. Helps teams prioritize review effort and surface high-risk changes before they merge.',
    tags: ['Python', 'Azure DevOps', 'CLI'],
  },
  {
    id: 'ado-pipeline-manager',
    title: 'Azure DevOps Pipeline Manager',
    description:
      'Build manager with graceful shutdown handling and Azure Functions as a deployment target. Provides reliable pipeline orchestration with clean teardown on interruption.',
    tags: ['C#/.NET', 'Azure DevOps', 'Azure Functions'],
  },
  {
    id: 'fitgpt-discord-bot',
    title: 'FitGPT Discord Bot',
    description:
      'Discord bot that integrates Fitbit health data with GPT to enable conversational health insights. Ask questions about your activity, sleep, and trends directly in Discord.',
    tags: ['Python', 'Discord', 'Fitbit API', 'GPT'],
  },
  {
    id: 'congress-stock-tracker',
    title: 'Congress Stock Tracker',
    description:
      'Tracks congressional stock trades and surfaces patterns across members, sectors, and timing. Aggregates public disclosure data into a queryable format for trend analysis.',
    tags: ['C#', 'Python', 'Data'],
  },
  {
    id: 'ai-toolkit',
    title: 'AI Toolkit',
    description:
      'Agent Package Manager (APM) for distributing GitHub Copilot skills and Claude MCP servers to 150+ engineers across a large .NET platform team. Standardizes AI tooling adoption at scale.',
    tags: ['TypeScript', 'MCP', 'GitHub Copilot', 'AI'],
  },
]

export default projects
