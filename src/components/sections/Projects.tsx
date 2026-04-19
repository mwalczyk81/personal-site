import { ExternalLink } from 'lucide-react'
import projects from '../../data/projects'

export default function Projects() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="py-24 px-6 bg-white dark:bg-slate-900"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-light tracking-tight text-gray-900 dark:text-slate-100 mb-16">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card border border-gray-100 dark:border-slate-700 rounded-lg p-6 flex flex-col gap-4 hover:border-accent-600 dark:hover:border-accent-500 motion-safe:hover:-translate-y-[3px] hover:shadow-md dark:hover:shadow-slate-900/50 transition-all duration-150 dark:bg-slate-800/50"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-medium text-gray-900 dark:text-slate-100 leading-snug">
                  {project.title}
                </h3>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title}`}
                    className="shrink-0 text-gray-400 hover:text-gray-900 dark:text-slate-500 dark:hover:text-slate-100 transition-colors duration-150"
                  >
                    <ExternalLink size={15} aria-hidden />
                  </a>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed flex-1">
                {project.description}
              </p>

              {project.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2" role="list">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-xs text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded px-2 py-0.5"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
