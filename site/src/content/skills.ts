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

export type GroupId = 'start' | 'states' | 'structure' | 'content' | 'adapt' | 'scale'

export const GROUPS: { id: GroupId; title: string; blurb: string }[] = [
  { id: 'start', title: 'Start here', blurb: 'Find what a feature is missing, then route each gap to the skill that fixes it.' },
  { id: 'states', title: 'States and actions', blurb: 'What a surface shows, and what happens after someone acts.' },
  { id: 'structure', title: 'Structure', blurb: 'Journeys across screens, and where things live.' },
  { id: 'content', title: 'Content', blurb: 'Words for every state, and layouts that survive real data.' },
  { id: 'adapt', title: 'Adaptation and input', blurb: 'Screen sizes, touch, keyboard, and screen readers.' },
  { id: 'scale', title: 'Product scale', blurb: 'Consistency across a product, and a system grown from it.' },
]

// Curation only: grouping, order, and a one-line summary for the index.
const CATALOG: { name: string; group: GroupId; summary: string; produces: string }[] = [
  { name: 'feature-completeness', group: 'start', summary: 'Scores a feature across eight paths and ranks every gap by harm.', produces: 'Completeness scorecard' },
  { name: 'interface-states', group: 'states', summary: 'Every state a surface can be in, with UI and a next action for each.', produces: 'State matrix' },
  { name: 'async-interactions', group: 'states', summary: 'Pending feedback, races, retries, optimistic updates, background jobs.', produces: 'Action spec' },
  { name: 'destructive-actions', group: 'states', summary: 'Safeguards matched to risk: undo, trash, confirm, type-to-confirm.', produces: 'Destructive action inventory' },
  { name: 'user-flows', group: 'structure', summary: 'Entry points, failure branches, interruptions, and returning users.', produces: 'Flow + interruption tables' },
  { name: 'information-architecture', group: 'structure', summary: 'Page, modal, drawer, or tab, decided from objects and tasks.', produces: 'Placement decisions' },
  { name: 'ux-writing', group: 'content', summary: 'Errors, empty states, and confirmations that say what to do next.', produces: 'Copy deck + glossary' },
  { name: 'content-resilience', group: 'content', summary: 'Long names, missing images, huge numbers, translations, 0 to 10,000 items.', produces: 'Content contract + fixtures' },
  { name: 'responsive-behavior', group: 'adapt', summary: 'What each component becomes at each size and input type.', produces: 'Transformation matrix' },
  { name: 'focus-management', group: 'adapt', summary: 'Where focus goes after every open, close, delete, and route change.', produces: 'Focus map' },
  { name: 'pattern-consistency', group: 'scale', summary: 'Finds behavior that differs across the product and picks the rule.', produces: 'Canonical rules + migration' },
  { name: 'design-system-evolution', group: 'scale', summary: 'What to abstract from real code, and what to leave alone.', produces: 'Extraction report' },
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
    SKILLS.push({ ...p, name, group: 'scale', summary: p.description.split('. ')[0], produces: 'See skill', headings: extractHeadings(p.body) })
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
