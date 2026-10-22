import { ArrowUpRight } from 'lucide-react'
import { CommandPill } from '../components/hero/CommandPill'
import { DawnHero } from '../components/hero/DawnHero'
import { SkipWord } from '../components/hero/SkipWord'
import { InstallBlock } from '../components/InstallBlock'
import { SkillIndex } from '../components/SkillIndex'
import { packInstall, REPO, REPO_URL } from '../content/site'
import { GROUPS, SKILLS } from '../content/skills'

const wrap = 'mx-auto max-w-[76rem] px-5 sm:px-8'

export function Home() {
  return (
    <>
      <DawnHero>
        <div className={`${wrap} flex w-full flex-1 flex-col items-center pt-[clamp(8rem,22vh,13rem)] pb-24 text-center`}>
          <h1
            tabIndex={-1}
            className="max-w-[15ch] text-[clamp(2.75rem,7.2vw,5.75rem)] leading-[0.98] font-[520] tracking-[-0.04em] text-balance text-[#17140f]"
          >
            Teach your agent the parts it <SkipWord word="skips." />
          </h1>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-pretty text-[#3d3324] sm:text-[1.1875rem]">Small, focused skills for your coding agent.</p>
          <div className="mt-8 flex w-full justify-center">
            <CommandPill command={`npx skills add ${REPO}`} />
          </div>
        </div>
      </DawnHero>

      <section id="skills" aria-labelledby="skills-heading">
        <div className={`${wrap} pt-24 pb-20 lg:pt-32 lg:pb-28`}>
          {/* Intro copy and the group blurb share the row-description column, so the section has one left edge on the right. */}
          <h2 id="skills-heading" className="max-w-[18ch] text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.02] font-normal tracking-[-0.035em] text-balance text-ink">
            Every skill installs on its own.
          </h2>
          <div className="mt-5 grid gap-x-8 md:grid-cols-[minmax(0,21rem)_minmax(0,1fr)]">
            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-2 md:col-start-2">
              Add only what your agent is missing. Open any skill to read every word of it before you install.
            </p>
          </div>

          {GROUPS.map((group) => {
            const skills = SKILLS.filter((s) => s.group === group.id)
            if (!skills.length) return null
            return (
              <div key={group.id} className="mt-16 lg:mt-20">
                <div className="mb-3 grid gap-x-8 gap-y-1.5 md:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] md:items-baseline">
                  <h3 className="text-[0.9375rem] font-medium text-ink">
                    {group.title}
                    <span className="ml-2.5 text-ink-3 [font-variant-numeric:tabular-nums]">{skills.length}</span>
                  </h3>
                  <p className="max-w-[60ch] text-[0.875rem] leading-snug text-ink-3">{group.blurb}</p>
                </div>
                <SkillIndex skills={skills} />
              </div>
            )
          })}

          <p className="mt-10 text-[0.875rem] text-ink-3">More collections will follow, for work well beyond interfaces.</p>
        </div>
      </section>

      <section aria-labelledby="install-heading" className="border-t border-line">
        <div className={`${wrap} grid items-center gap-x-14 gap-y-8 py-20 lg:grid-cols-2 lg:py-28`}>
          <div>
            <h2 id="install-heading" className="text-[clamp(2rem,3.8vw,2.75rem)] leading-[1.05] font-normal tracking-[-0.035em] text-balance text-ink">
              Or take the whole set.
            </h2>
            <p className="mt-4 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink-2">
              One command adds all {SKILLS.length} skills. Each is a plain SKILL.md file, so it works in Claude Code, Cursor, Codex, and any agent that loads
              skills. Your agent picks the right one when the task calls for it.
            </p>
            <a href={REPO_URL} className="group mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink">
              <span className="link-draw">Read the source</span>
              <ArrowUpRight
                aria-hidden
                size={15}
                strokeWidth={1.75}
                className="transition-transform duration-300 ease-out-expo group-hover:translate-x-px group-hover:-translate-y-px motion-reduce:transition-none"
              />
            </a>
          </div>
          <InstallBlock methods={packInstall()} />
        </div>
      </section>
    </>
  )
}
