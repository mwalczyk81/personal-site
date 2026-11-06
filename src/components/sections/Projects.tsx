import { ExternalLink } from 'lucide-react'
import projects from '../../data/projects'
import type { Project } from '../../types'

function ProjectCard({ project }: { project: Project }) {
  return (
  <div
    className="project-card bg-ds-surface border border-ds-border rounded-lg shadow-ds-sm p-6 flex flex-col gap-4 hover:border-ds-primary hover:shadow-ds-md transition-[border-color,box-shadow] duration-(--ds-duration-base)"
  >
    <div className="flex items-start justify-between gap-2">
      <h3 className="text-lg font-semibold leading-tight text-ds-text">{project.title}</h3>
      {/* Only open-source projects get an external link icon */}
      {project.type === 'open-source' && project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.title}`}
          className="shrink-0 text-ds-text-muted hover:text-ds-text transition-colors duration-(--ds-duration-fast)"
        >
          <ExternalLink size={16} aria-hidden />
        </a>
      )}
    </div>

    <p className="text-sm text-ds-text-secondary leading-relaxed flex-1">{project.description}</p>

    {project.writeUps && project.writeUps.length > 0 && (
      <ul className="flex flex-col gap-1" role="list">
        {project.writeUps.map((w) => (
          <li key={w.path}>
            <a
              href={w.path}
              className="text-sm text-ds-primary hover:underline underline-offset-4"
            >
              {w.label}
            </a>
          </li>
        ))}
      </ul>
    )}

    <div className="flex items-end justify-between gap-3">
      {project.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2" role="list">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="text-xs font-medium text-ds-text-secondary bg-ds-bg-subtle border border-ds-border rounded-md px-2 py-1"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {/* Professional badge — signals no public link is available */}
      {project.type === 'professional' && (
        <span className="shrink-0 text-xs font-medium text-ds-text-secondary border border-ds-border-control rounded-md px-2 py-1 whitespace-nowrap">
          Professional
        </span>
      )}
    </div>
  </div>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => !p.personal)
  const personal = projects.filter((p) => p.personal)

  return (
    <section id="projects" aria-label="Projects" className="py-24 px-6 bg-ds-bg">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-ds-text mb-12">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {personal.length > 0 && (
          <details className="mt-16 group">
            <summary className="cursor-pointer select-none text-sm font-medium text-ds-text-secondary hover:text-ds-text transition-colors duration-(--ds-duration-fast)">
              Personal projects
            </summary>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {personal.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </details>
        )}
      </div>
    </section>
  )
}
