import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { REPO } from '../content/site'
import type { Skill } from '../content/skills'
import { CopyButton } from './CopyButton'

export function SkillIndex({ skills }: { skills: Skill[] }) {
  return (
    <ul className="border-t border-line">
      {skills.map((skill) => (
        <li
          key={skill.name}
          className="group/row relative border-b border-line after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-700 after:ease-out-expo has-[a:focus-visible]:after:scale-x-100 hover:after:scale-x-100 motion-reduce:after:transition-none"
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-8 gap-y-3 py-7 md:grid-cols-[minmax(0,21rem)_minmax(0,1fr)_auto] md:py-9">
            <h3 className="col-span-2 min-w-0 text-[1.5rem] leading-tight font-medium tracking-[-0.03em] text-ink sm:text-[2rem] md:col-span-1">
              <Link
                to={`/skills/${skill.name}`}
                className="inline-block outline-none transition-transform duration-500 ease-out-expo group-hover/row:translate-x-2 motion-reduce:transition-none after:absolute after:inset-0"
              >
                {skill.name}
              </Link>
            </h3>
            <div className="col-span-2 max-w-[52ch] md:col-span-1">
              {/* Non-breaking hyphens keep compound terms like "type-to-confirm" on one line. */}
              <p className="text-[1rem] leading-snug text-pretty text-ink-2 transition-colors duration-300 group-hover/row:text-ink">
                {skill.summary.replace(/-/g, '\u2011')}
              </p>
              <p className="mt-1.5 text-[0.8125rem] text-ink-3">Produces {skill.produces.toLowerCase()}</p>
            </div>
            <div className="relative z-10 col-span-2 flex items-center justify-between gap-1 md:col-span-1 md:justify-end">
              <CopyButton
                text={`npx skills add ${REPO} --skill ${skill.name}`}
                label="Copy install"
                showLabel
                className="-ml-2 opacity-100 transition-opacity duration-300 md:ml-0 [@media(hover:hover)]:md:opacity-0 [@media(hover:hover)]:md:group-focus-within/row:opacity-100 [@media(hover:hover)]:md:group-hover/row:opacity-100"
              />
              <span
                aria-hidden
                className="grid size-10 place-items-center rounded-full border border-line text-ink-2 transition-[background-color,border-color,color] duration-300 group-hover/row:border-ink group-hover/row:bg-ink group-hover/row:text-paper"
              >
                <ArrowRight size={17} strokeWidth={1.5} className="transition-transform duration-500 ease-out-expo group-hover/row:-rotate-45 motion-reduce:transition-none" />
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
