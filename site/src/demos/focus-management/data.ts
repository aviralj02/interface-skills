export type Task = { id: string; name: string }

export const INITIAL_TASKS: Task[] = [
  { id: 't1', name: 'Finish Q3 deck' },
  { id: 't2', name: 'Draft brief' },
  { id: 't3', name: 'Review PR #482' },
  { id: 't4', name: 'Sync with design' },
]

export const TOAST_MESSAGE = 'Sam also updated this list.'
