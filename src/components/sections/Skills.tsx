import skills from '../../data/skills'

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="py-24 px-6 bg-ds-bg-subtle">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-ds-text mb-12">
          Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((category, index) => (
            <div
              key={category.name}
              className={`bg-ds-surface rounded-lg border border-ds-border shadow-ds-sm p-6${index === skills.length - 1 && skills.length % 2 !== 0 ? ' sm:col-span-2' : ''}`}
            >
              <h3 className="text-lg font-semibold leading-tight text-ds-text mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="text-xs font-medium text-ds-text-secondary bg-ds-bg-subtle border border-ds-border rounded-md px-3 py-1"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
