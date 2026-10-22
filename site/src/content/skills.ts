import { slugify } from '../lib/slug'

// The repo's skills are the only source of truth; nothing here copies their content.
const files = import.meta.glob('../../../skills/*/SKILL.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export type Heading = { depth: 2 | 3; text: string; id: string }

export type Skill = {
  name: string
  description: string
  summary: string
  produces: string
  group: GroupId
  body: string
  raw: string
  headings: Heading[]
  lines: number
}

export type GroupId = 'start' | 'behavior'

export const GROUPS: { id: GroupId; title: string; blurb: string }[] = [
  { id: 'start', title: 'Start here', blurb: 'Find what a feature is missing, then route each gap to the skill that fixes it.' },
  { id: 'behavior', title: 'States and actions', blurb: 'What a surface shows, what happens after someone acts, and how they undo it.' },
]

// Curation only: grouping, order, and a one-line summary for the index.
const CATALOG: { name: string; group: GroupId; summary: string; produces: string }[] = [
  { name: 'feature-completeness', group: 'start', summary: 'Scores a feature across eight paths and ranks every gap by harm.', produces: 'Completeness scorecard' },
  { name: 'interface-states', group: 'behavior', summary: 'Every state a surface can be in, with UI and a next action for each.', produces: 'State matrix' },
  { name: 'async-interactions', group: 'behavior', summary: 'Pending feedback, races, retries, optimistic updates, background jobs.', produces: 'Action spec' },
  { name: 'destructive-actions', group: 'behavior', summary: 'Safeguards matched to risk: undo, trash, confirm, type-to-confirm.', produces: 'Destructive action inventory' },
]

function parse(raw: string) {
  const text = raw.replace(/\r\n/g, '\n')
  const fm = text.match(/^---\n([\s\S]*?)\n---\n/)
  const meta = fm?.[1] ?? ''
  const field = (key: string) => meta.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1].trim() ?? ''
  const body = text
    .slice(fm ? fm[0].length : 0)
    .replace(/^\s*# .+\n/, '')
    .trim()
  return { name: field('name'), description: field('description'), body, raw: text, lines: text.split('\n').length }
}

function extractHeadings(body: string): Heading[] {
  const out: Heading[] = []
  let fenced = false
  for (const line of body.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced
    if (fenced) continue
    const m = line.match(/^(##|###) (.+)$/)
    if (m) {
      const text = m[2].replace(/`/g, '').trim()
      out.push({ depth: m[1].length as 2 | 3, text, id: slugify(text) })
    }
  }
  return out
}

const parsed = new Map(
  Object.values(files).map((raw) => {
    const p = parse(raw)
    return [p.name, p] as const
  }),
)

export const SKILLS: Skill[] = CATALOG.flatMap((entry) => {
  const p = parsed.get(entry.name)
  if (!p) return []
  return [{ ...entry, ...p, name: entry.name, headings: extractHeadings(p.body) }]
})

// Skills present in the repo but missing from the catalog still get a page.
for (const [name, p] of parsed) {
  if (!SKILLS.some((s) => s.name === name)) {
    SKILLS.push({ ...p, name, group: 'behavior', summary: p.description.split('. ')[0], produces: 'See skill', headings: extractHeadings(p.body) })
  }
}

export const SKILL_NAMES = new Set(SKILLS.map((s) => s.name))

export function getSkill(name: string | undefined) {
  return SKILLS.find((s) => s.name === name)
}

export function neighbors(name: string) {
  const i = SKILLS.findIndex((s) => s.name === name)
  return { prev: i > 0 ? SKILLS[i - 1] : undefined, next: i < SKILLS.length - 1 ? SKILLS[i + 1] : undefined }
}
