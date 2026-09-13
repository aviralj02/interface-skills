import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { SKILLS } from '../content/skills'

export function NotFound({ skill }: { skill?: string }) {
  const suggestions = skill ? SKILLS.filter((s) => s.name.includes(skill.split('-')[0])).slice(0, 3) : []

  return (
    <div className="mx-auto max-w-[40rem] px-5 py-24 sm:px-8">
      <h1 tabIndex={-1} className="text-[2rem] leading-tight font-semibold tracking-[-0.025em] text-ink">
        {skill ? 'There’s no skill with that name' : 'This page doesn’t exist'}
      </h1>
      <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2 [overflow-wrap:anywhere]">
        {skill ? (
          <>
            Nothing is published as <code className="font-mono text-ink">{skill}</code>. It may have been renamed, or the link has a typo.
          </>
        ) : (
          'The link may be out of date, or the address has a typo.'
        )}
      </p>
      {suggestions.length > 0 && (
        <ul className="mt-6 border-t border-line">
          {suggestions.map((s) => (
            <li key={s.name} className="border-b border-line">
              <Link to={`/skills/${s.name}`} className="flex items-center justify-between py-3 font-mono text-[0.9375rem] text-ink hover:text-accent">
                {s.name}
                <ArrowRight aria-hidden size={16} strokeWidth={1.75} />
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/#skills" className="mt-8 inline-flex items-center gap-1.5 font-medium text-ink hover:text-accent">
        See all {SKILLS.length} skills
        <ArrowRight aria-hidden size={16} strokeWidth={1.75} />
      </Link>
    </div>
  )
}
