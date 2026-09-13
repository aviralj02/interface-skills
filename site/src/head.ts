import { getSkill, SKILLS } from './content/skills'

const SITE = 'Interface Skills'
const HOME_DESCRIPTION = `${SKILLS.length} agent skills for how interfaces behave: states, failures, flows, focus, and recovery. Install with npx skills or as a Claude Code plugin.`

export function headFor(pathname: string) {
  const match = pathname.match(/^\/skills\/([^/]+)\/?$/)
  if (match) {
    const skill = getSkill(match[1])
    if (skill) return { title: `${skill.name} · ${SITE}`, description: skill.summary }
    return { title: `Skill not found · ${SITE}`, description: HOME_DESCRIPTION }
  }
  if (pathname === '/' || pathname === '') return { title: `${SITE}: how interfaces behave`, description: HOME_DESCRIPTION }
  return { title: `Page not found · ${SITE}`, description: HOME_DESCRIPTION }
}
