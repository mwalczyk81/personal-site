import { ArrowLeft } from 'lucide-react'
import projects from '../../data/projects'
import { BACK_LINK_CLASS } from './WritingPages'

const LIST_ITEM_CLASS =
  'text-sm text-ds-text-secondary bg-ds-bg-subtle border border-ds-border rounded-md px-3 py-1.5'

export function ProjectDetailPage({ id }: { id: string }) {
  const project = projects.find((p) => p.id === id)
  const page = project?.page

  if (!project || !page) {
    return (
      <section aria-label="Not found" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <a href="/#projects" className={BACK_LINK_CLASS}>
            <ArrowLeft size={14} aria-hidden /> Back to projects
          </a>
          <h1 className="font-serif text-3xl font-semibold leading-tight text-ds-text">
            Project not found
          </h1>
        </div>
      </section>
    )
  }

  const { image } = page
  // The site switches themes with data-theme and the `dark:` variant, which a
  // prefers-color-scheme <picture> would ignore. Both images lazy-load, so the hidden one
  // is only fetched if the visitor flips the theme.
  const imageClass = 'w-full h-auto rounded-lg border border-ds-border shadow-ds-sm'

  return (
    <article aria-label={project.title} className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <a href="/#projects" className={BACK_LINK_CLASS}>
          <ArrowLeft size={14} aria-hidden /> Back to projects
        </a>
        <h1 className="font-serif text-3xl font-semibold leading-tight text-ds-text mb-3">
          {project.title}
        </h1>
        <p className="text-lg text-ds-text-secondary leading-relaxed mb-6">{page.tagline}</p>
        <p className="text-base text-ds-text-secondary leading-relaxed mb-10">
          {project.description}
        </p>

        <figure className="mb-10">
          <img
            src={image.light}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            className={`${imageClass} dark:hidden`}
          />
          <img
            src={image.dark}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            className={`${imageClass} hidden dark:block`}
          />
        </figure>

        <p className="text-base text-ds-text-secondary leading-relaxed mb-10">
          <strong className="font-semibold text-ds-text">Try it:</strong> {page.tryIt.text}{' '}
          <a
            href={page.tryIt.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ds-primary hover:underline underline-offset-4"
          >
            {page.tryIt.linkLabel}
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold leading-tight text-ds-text mb-4">Stack</h2>
        <ul role="list" aria-label="Stack" className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag) => (
            <li key={tag} className={LIST_ITEM_CLASS}>
              {tag}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold leading-tight text-ds-text mb-4">Facts</h2>
        <ul
          role="list"
          aria-label="Facts"
          className="flex flex-col gap-2 text-base text-ds-text-secondary leading-relaxed mb-10"
        >
          {page.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold leading-tight text-ds-text mb-4">Links</h2>
        <ul role="list" aria-label="Links" className="flex flex-col gap-2 mb-10">
          {page.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-ds-primary hover:underline underline-offset-4"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {project.writeUps && project.writeUps.length > 0 && (
          <>
            <h2 className="text-xl font-semibold leading-tight text-ds-text mb-4">Write-up</h2>
            <ul role="list" aria-label="Write-up" className="flex flex-col gap-2">
              {project.writeUps.map((w) => (
                <li key={w.path}>
                  <a
                    href={w.path}
                    className="text-base text-ds-primary hover:underline underline-offset-4"
                  >
                    {w.label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  )
}
