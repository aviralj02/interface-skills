import type { FixtureId } from './scenarios'

export type Row = { id: string; name: string; verb: string; object: string; time: string; avatarUrl?: string }

/** Two rows that never change, so the test-subject row (always first) can be judged against a normal scale. */
export const CONSTANT_ROWS: Row[] = [
  { id: 'sam', name: 'Sam Okafor', verb: 'uploaded', object: 'brand-guidelines.pdf', time: '1d ago' },
  { id: 'priya', name: 'Priya Nair', verb: 'resolved', object: '3 comments on Marketing site', time: '2d ago' },
]

export const BASELINE_ROW: Row = { id: 'subject', name: 'Ana Ruiz', verb: 'commented on', object: 'Q3 plan', time: '3h ago' }

export const FIXTURES: Record<FixtureId, Row> = {
  longName: {
    id: 'subject',
    name: 'Maximilian Alexander von Hohenberg-Schwarzenbach',
    verb: 'commented on',
    object: 'Q3 planning and budget review for the Northwind growth initiative',
    time: '3h ago',
  },
  unbroken: {
    id: 'subject',
    name: 'Ana Ruiz',
    verb: 'commented on',
    object: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    time: '3h ago',
  },
  noAvatar: {
    id: 'subject',
    name: 'Leo Chen',
    verb: 'mentioned you in',
    object: 'Onboarding redesign',
    time: '5h ago',
    // Deliberately broken, like a stale or deleted upload -- there is no fallback logic behind this.
    avatarUrl: '/avatars/leo-does-not-exist.png',
  },
  emoji: {
    id: 'subject',
    name: '🦊 Fox',
    verb: 'reacted to',
    object: 'Marketing site',
    time: '2h ago',
  },
}

export const HUGE_COUNT = 1284332
export const TYPICAL_COUNT = 6
