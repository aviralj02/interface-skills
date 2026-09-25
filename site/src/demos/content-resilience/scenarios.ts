export const SCENARIOS = [
  { id: 'longName', label: 'Long name' },
  { id: 'unbroken', label: 'Unbroken string' },
  { id: 'noAvatar', label: 'Missing avatar' },
  { id: 'emoji', label: 'Emoji name' },
  { id: 'hugeCount', label: 'Huge count' },
] as const

export type ScenarioId = (typeof SCENARIOS)[number]['id']

/** The four row fixtures are mutually exclusive (picking one replaces another); "Huge count" is independent. */
export type FixtureId = Exclude<ScenarioId, 'hugeCount'>
