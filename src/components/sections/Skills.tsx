import skills from '../../data/skills'

export default function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="py-24 px-6 bg-gray-50 dark:bg-slate-950"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-light tracking-tight text-gray-900 dark:text-slate-100 mb-16">
          Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((category, index) => (
            <div
              key={category.name}
              className={`bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-6 shadow-sm${index === skills.length - 1 && skills.length % 2 !== 0 ? ' sm:col-span-2' : ''}`}
            >
              <h3 className="text-xs font-semibold tracking-widest text-gray-400 dark:text-slate-500 uppercase mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="text-xs text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-full px-3 py-1"
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
