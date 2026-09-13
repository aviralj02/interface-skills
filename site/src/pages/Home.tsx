import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Compose } from '../components/Compose'
import { GithubMark } from '../components/GithubMark'
import { InstallBlock } from '../components/InstallBlock'
import { SkillIndex } from '../components/SkillIndex'
import { Specimens } from '../components/Specimens'
import { packInstall, REPO_URL } from '../content/site'
import { SKILLS } from '../content/skills'

const wrap = 'mx-auto max-w-[76rem] px-5 sm:px-8'

export function Home() {
  return (
    <>
      <section className={`${wrap} grid items-center gap-x-14 gap-y-12 pt-12 pb-20 sm:pt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:pt-20 lg:pb-28`}>
        <div className="min-w-0 max-w-[36rem]">
          <h1 tabIndex={-1} className="text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.04em] text-balance text-ink sm:text-[3.75rem] xl:text-[4.25rem]">
            Beyond the happy path.
          </h1>
          <p className="mt-5 max-w-[42ch] text-[1.1875rem] leading-relaxed text-pretty text-ink-2">
            UI patterns teach how interfaces look. These {SKILLS.length} agent skills teach how they behave.
          </p>
          <InstallBlock methods={packInstall()} className="mt-8" />
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
            <a href="#skills" className="group inline-flex items-center gap-1.5 font-medium text-ink transition-colors hover:text-accent">
              <span className="link-draw">Browse the skills</span>
              <ArrowDown
                aria-hidden
                size={15}
                strokeWidth={1.75}
                className="transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
            <a href={REPO_URL} className="group inline-flex items-center gap-1.5 text-ink-2 transition-colors hover:text-ink">
              <GithubMark size={14} />
              <span className="link-draw">Source on GitHub</span>
              <ArrowUpRight
                aria-hidden
                size={14}
                strokeWidth={1.75}
                className="transition-transform duration-300 ease-out-expo group-hover:translate-x-px group-hover:-translate-y-px motion-reduce:transition-none"
              />
            </a>
          </div>
        </div>
        <Specimens />
      </section>

      <section id="skills" aria-labelledby="skills-heading" className="border-t border-line">
        <div className={`${wrap} py-20 lg:py-28`}>
          <div className="mb-14 max-w-[40rem]">
            <h2 id="skills-heading" className="text-[1.875rem] leading-tight font-semibold tracking-[-0.025em] text-balance text-ink sm:text-[2.25rem]">
              Twelve skills, one job each
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">
              Every skill solves one behavioral problem and produces something concrete: a matrix, a spec, a map, a report. Open any of them to read
              it in full before you install.
            </p>
          </div>
          <SkillIndex />
        </div>
      </section>

      <section aria-labelledby="compose-heading" className="border-t border-line bg-well">
        <div className={`${wrap} grid gap-x-14 gap-y-10 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:py-24`}>
          <div className="max-w-[30rem]">
            <h2 id="compose-heading" className="text-[1.875rem] leading-tight font-semibold tracking-[-0.025em] text-balance text-ink sm:text-[2.25rem]">
              They hand off to each other
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">
              Start with <code className="rounded-[5px] border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.875em] text-ink">feature-completeness</code>.
              It finds the gaps and names the skill that closes each one. Each skill works alone too, and the outputs share one vocabulary, so one
              skill's result feeds the next.
            </p>
          </div>
          <Compose />
        </div>
      </section>

      <section aria-labelledby="install-heading" className="border-t border-line">
        <div className={`${wrap} grid items-center gap-x-14 gap-y-8 py-20 lg:grid-cols-2 lg:py-24`}>
          <div>
            <h2 id="install-heading" className="text-[1.875rem] leading-tight font-semibold tracking-[-0.025em] text-balance text-ink sm:text-[2.25rem]">
              Install the pack
            </h2>
            <p className="mt-3 max-w-[42ch] text-[1.0625rem] leading-relaxed text-ink-2">
              One command adds all {SKILLS.length} skills. Your agent loads the right one when the task calls for it. You can also ask for one by name.
            </p>
          </div>
          <InstallBlock methods={packInstall()} />
        </div>
      </section>
    </>
  )
}
