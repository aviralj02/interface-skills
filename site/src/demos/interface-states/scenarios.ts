export const SCENARIOS = [
  { id: 'join', label: 'Member joins', toggle: false },
  { id: 'hiccup', label: 'Refetch hiccup', toggle: false },
  { id: 'viewer', label: 'Become a Viewer', toggle: true },
  { id: 'seats', label: 'Fill all 5 seats', toggle: true },
] as const

export type ScenarioId = (typeof SCENARIOS)[number]['id']

/** One firing of a one-shot scenario. `n` changes on every click so re-firing the same moment replays it. */
export type Moment = { id: Extract<ScenarioId, 'join' | 'hiccup'>; n: number }
