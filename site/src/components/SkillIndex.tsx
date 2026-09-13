import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { GROUPS, SKILLS } from '../content/skills'

export function SkillIndex() {
  return (
    <div className="flex flex-col gap-12">
      {GROUPS.map((group) => {
        const skills = SKILLS.filter((s) => s.group === group.id)
        if (!skills.length) return null
        const lead = group.id === 'start'
        return (
          <section key={group.id} aria-labelledby={`group-${group.id}`} className="grid gap-x-10 gap-y-3 lg:grid-cols-[15rem_minmax(0,1fr)]">
            <div className="lg:pt-4">
              <h3 id={`group-${group.id}`} className="text-[0.9375rem] font-semibold text-ink">
                {group.title}
              </h3>
              <p className="mt-1 max-w-[34ch] text-[0.875rem] leading-snug text-ink-3">{group.blurb}</p>
            </div>
            <ul className="border-t border-line">
              {skills.map((skill) => (
                <li key={skill.name} className="border-b border-line">
                  <Link
                    to={`/skills/${skill.name}`}
                    className="group relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-1 rounded-sm py-4 transition-colors after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 after:ease-out-expo hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_auto] md:py-[1.125rem]"
                  >
                    <span
                      className={`font-mono font-medium tracking-[-0.01em] text-ink transition-colors group-hover:text-accent ${
                        lead ? 'text-[1.25rem] sm:text-[1.375rem]' : 'text-[0.9375rem]'
                      }`}
                    >
                      {skill.name}
                    </span>
                    <span className="col-start-1 row-start-2 text-[0.9375rem] leading-snug text-ink-2 transition-colors duration-200 group-hover:text-ink sm:col-start-2 sm:row-start-1">
                      {skill.summary}
                      <span className="mt-0.5 block text-[0.8125rem] text-ink-3">Produces: {skill.produces}</span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      size={17}
                      strokeWidth={1.75}
                      className="col-start-2 row-span-2 row-start-1 text-ink-3 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-accent sm:col-start-3 sm:row-span-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
