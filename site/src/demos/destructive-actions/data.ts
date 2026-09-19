export type Project = { id: string; name: string; tasks: number; files: number; note?: string }

export const WORKSPACE = 'Northwind'

export const PROJECTS: Project[] = [
  { id: 'q3', name: 'Q3 plan', tasks: 24, files: 8, note: 'shared with 5 people' },
  { id: 'onboarding', name: 'Onboarding redesign', tasks: 12, files: 3 },
  { id: 'site', name: 'Marketing site', tasks: 31, files: 14, note: '2 public links' },
]

/** How long Undo stays available (skill: 5-10s). */
export const UNDO_MS = 8000

export const describe = (p: Project) => [`${p.tasks} tasks`, `${p.files} files`, p.note].filter(Boolean).join(' · ')

export const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

export const deletionDate = () =>
  new Date(Date.now() + 7 * 864e5).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
