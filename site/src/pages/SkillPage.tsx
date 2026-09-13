import { ArrowLeft, ArrowRight, ChevronRight, ExternalLink } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { AgentTrigger } from '../components/AgentTrigger'
import { CopyButton } from '../components/CopyButton'
import { InstallBlock } from '../components/InstallBlock'
import { Markdown } from '../components/Markdown'
import { Toc } from '../components/Toc'
import { REPO_URL, skillInstall } from '../content/site'
import { getSkill, GROUPS, neighbors } from '../content/skills'
import { NotFound } from './NotFound'

export function SkillPage() {
  const { name } = useParams()
  const skill = getSkill(name)
  if (!skill) return <NotFound skill={name} />

  const group = GROUPS.find((g) => g.id === skill.group)
  const { prev, next } = neighbors(skill.name)

  return (
    <div className="mx-auto max-w-[76rem] px-5 pt-8 pb-24 sm:px-8 sm:pt-10">
      <nav aria-label="Breadcrumb" className="mb-8 text-[0.875rem]">
        <ol className="flex flex-wrap items-center gap-1.5 text-ink-3">
          <li>
            <Link to="/#skills" className="hover:text-ink">
              Skills
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight size={14} strokeWidth={1.75} />
          </li>
          <li>
            <span aria-current="page" className="text-ink-2">
              {skill.name}
            </span>
          </li>
        </ol>
      </nav>

      <header className="grid gap-x-14 gap-y-7 border-b border-line pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:grid-rows-[auto_1fr]">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <h1 tabIndex={-1} className="font-mono text-[1.875rem] leading-tight font-medium tracking-[-0.03em] [overflow-wrap:anywhere] text-ink sm:text-[2.5rem]">
            {skill.name}
          </h1>
          <p className="mt-3 max-w-[48ch] text-[1.25rem] leading-snug text-pretty text-ink-2">{skill.summary}</p>
        </div>
        <div className="min-w-0 lg:col-start-1 lg:row-start-2">
          <AgentTrigger key={skill.name} description={skill.description} />
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[0.875rem]">
            <div>
              <dt className="text-ink-3">Group</dt>
              <dd className="mt-0.5 font-medium text-ink">{group?.title}</dd>
            </div>
            <div>
              <dt className="text-ink-3">Produces</dt>
              <dd className="mt-0.5 font-medium text-ink">{skill.produces}</dd>
            </div>
            <div>
              <dt className="text-ink-3">Length</dt>
              <dd className="mt-0.5 font-medium text-ink [font-variant-numeric:tabular-nums]">{skill.lines} lines</dd>
            </div>
          </dl>
        </div>
        <div className="row-start-2 flex min-w-0 flex-col gap-3 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-1">
          <InstallBlock methods={skillInstall(skill.name)} />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.875rem]">
            <CopyButton text={skill.raw} label="Copy SKILL.md" showLabel className="-ml-2" />
            <a
              href={`${REPO_URL}/blob/main/skills/${skill.name}/SKILL.md`}
              className="inline-flex items-center gap-1.5 text-ink-3 transition-colors hover:text-ink"
            >
              View source
              <ExternalLink aria-hidden size={14} strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </header>

      <div className="mt-10 grid gap-x-14 gap-y-8 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_13rem]">
        <div className="lg:col-start-2 lg:row-start-1">
          <Toc headings={skill.headings} />
        </div>
        <article className="min-w-0 lg:col-start-1 lg:row-start-1">
          <Markdown source={skill.body} />
        </article>
      </div>

      <nav aria-label="More skills" className="mt-20 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link to={`/skills/${prev.name}`} className="group rounded-xl border border-line p-4 transition-colors hover:border-line-strong hover:bg-surface">
            <span className="flex items-center gap-1.5 text-[0.8125rem] text-ink-3">
              <ArrowLeft aria-hidden size={14} strokeWidth={1.75} className="transition-transform group-hover:-translate-x-0.5" />
              Previous
            </span>
            <span className="mt-1 block font-mono text-[0.9375rem] text-ink">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/skills/${next.name}`}
            className="group rounded-xl border border-line p-4 text-right transition-colors hover:border-line-strong hover:bg-surface sm:col-start-2"
          >
            <span className="flex items-center justify-end gap-1.5 text-[0.8125rem] text-ink-3">
              Next
              <ArrowRight aria-hidden size={14} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="mt-1 block font-mono text-[0.9375rem] text-ink">{next.name}</span>
          </Link>
        )}
      </nav>
    </div>
  )
}
