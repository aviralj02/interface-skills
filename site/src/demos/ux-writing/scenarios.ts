/** The moments the operator can trigger. Each fires the same event on both panes at once. */
export const SCENARIOS = [
  { id: 'save', label: 'Save while offline' },
  { id: 'validation', label: 'Send with no email' },
  { id: 'empty', label: 'Search finds nothing' },
  { id: 'upload', label: 'Upload 20 files' },
  { id: 'permission', label: 'Open billing as a member' },
] as const

export type Scenario = (typeof SCENARIOS)[number]['id']

/** One firing of a scenario. `n` changes on every click so re-firing the same moment replays it. */
export type Moment = { id: Scenario; n: number }
