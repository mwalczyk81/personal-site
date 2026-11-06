import { ArrowLeft } from 'lucide-react'
import writing from '../../data/writing'

// Highlights [TODO: ...] placeholders so they are impossible to miss before publishing.
function Text({ children }: { children: string }) {
  const parts = children.split(/(\[TODO:[^\]]*\])/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[TODO:') ? (
          <mark
            key={i}
            className="bg-ds-warning-subtle text-ds-warning-text rounded-sm px-1"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

const BACK_LINK_CLASS =
  'inline-flex items-center gap-2 text-sm text-ds-text-muted hover:text-ds-text transition-colors duration-(--ds-duration-fast) mb-10'

export function WritingIndex() {
  return (
    <section aria-label="Writing" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <a href="/#projects" className={BACK_LINK_CLASS}>
          <ArrowLeft size={14} aria-hidden /> Back to projects
        </a>
        <h1 className="font-serif text-3xl font-semibold leading-tight text-ds-text mb-12">
          Writing
        </h1>
        <ul className="flex flex-col gap-8" role="list">
          {writing.map((post) => (
            <li key={post.slug}>
              <h2 className="text-lg font-semibold leading-tight text-ds-text mb-2">
                <a
                  href={`/writing/${post.slug}`}
                  className="hover:text-ds-primary transition-colors duration-(--ds-duration-fast)"
                >
                  {post.title}
                </a>
              </h2>
              <p className="text-sm text-ds-text-secondary leading-relaxed">
                {post.summary}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function WritingPostPage({ slug }: { slug: string }) {
  const post = writing.find((p) => p.slug === slug)

  if (!post) {
    return (
      <section aria-label="Not found" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <a href="/writing" className={BACK_LINK_CLASS}>
            <ArrowLeft size={14} aria-hidden /> All writing
          </a>
          <h1 className="font-serif text-3xl font-semibold leading-tight text-ds-text">
            Post not found
          </h1>
        </div>
      </section>
    )
  }

  return (
    <article aria-label={post.title} className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <a href="/writing" className={BACK_LINK_CLASS}>
          <ArrowLeft size={14} aria-hidden /> All writing
        </a>
        <h1 className="font-serif text-3xl font-semibold leading-tight text-ds-text mb-12">
          {post.title}
        </h1>
        {post.sections.map((section) => (
          <div key={section.heading} className="mb-10">
            <h2 className="text-xl font-semibold leading-tight text-ds-text mb-4">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-base text-ds-text-secondary leading-relaxed mb-4"
              >
                <Text>{paragraph}</Text>
              </p>
            ))}
          </div>
        ))}
      </div>
    </article>
  )
}
