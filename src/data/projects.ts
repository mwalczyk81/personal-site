import type { Project } from '../types'

const projects: Project[] = [
  {
    id: 'digital-banking-accounts',
    title: 'Digital Banking Platform — Accounts Service',
    type: 'professional',
    description:
      "Led delivery of the accounts service layer within a cloud-native rewrite of Fiserv's digital banking platform. Architected and maintained C#/.NET microservices on Azure, and drove a full AutoMapper-to-Mapperly migration to resolve a high-severity CVE — validated by 595 unit tests and 176 contract tests with zero regressions. Diagnosed systemic latency traced to Azure Redis Cache disconnection causing Cosmos DB fallback at scale.",
    tags: ['C#/.NET', 'Azure', 'Microservices', 'Cosmos DB', 'Redis'],
  },
  {
    id: 'ai-developer-tooling',
    title: 'AI Developer Tooling — Agent Package Manager',
    type: 'professional',
    description:
      'Built and distributed an Agent Package Manager (APM) to deliver GitHub Copilot skills and custom Claude agent prompts to 150+ engineers across a large .NET platform. Includes an MCP server for autonomous skill navigation and a team-wide rollout across Mac and Windows.',
    tags: ['TypeScript', 'MCP', 'GitHub Copilot', 'Azure DevOps', 'AI'],
  },
  {
    id: 'ado-compliance-runner',
    title: 'Azure DevOps Pipeline Compliance Runner',
    type: 'professional',
    description:
      "Internal tool that automatically triggered Azure DevOps pipeline builds for any repository that hadn't built successfully in the last 30 days, keeping them compliant with Fiserv security scanning standards. Generated an HTML report summarizing pipeline status across all repositories.",
    tags: ['C#/.NET', 'Azure DevOps', 'Security Compliance'],
  },
  {
    id: 'mogboard-mcp',
    title: 'mogboard-mcp',
    type: 'open-source',
    description:
      'A Python MCP server that gives AI assistants natural language access to FFXIV market board data via the Universalis API. Supports live price lookups, cross-world price comparison, sale history, market tax rates, and automated flip opportunity detection.',
    tags: ['Python', 'FastMCP', 'MCP', 'Universalis API', 'asyncio'],
    url: 'https://github.com/mwalczyk81/mogboard-mcp',
  },
  {
    id: 'mcp-fitbit-obsidian',
    title: 'MCP Fitbit Obsidian',
    type: 'open-source',
    description:
      'Python MCP server that syncs Fitbit health data into Obsidian daily notes. Supports stdio and SSE transports, OAuth 2.0 token management, and exposes tools usable in Claude Desktop and Claude.ai.',
    tags: ['Python', 'MCP', 'Fitbit API', 'Obsidian'],
    url: 'https://github.com/mwalczyk81/mcp-fitbit-obsidian',
  },
  {
    id: 'system-monitor',
    title: 'System Monitor',
    type: 'open-source',
    description:
      'Real-time system monitoring dashboard built with Blazor. Displays CPU, RAM, disk, and network metrics with live charts in the browser.',
    tags: ['C#', 'Blazor', '.NET'],
    url: 'https://github.com/mwalczyk81/system-monitor',
  },
]

export default projects
