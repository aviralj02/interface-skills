import { useState } from 'react'
import { AppWindow } from '../MockApp'
import { eyebrow } from '../ui'
import { BASELINE_ROW, CONSTANT_ROWS, FIXTURES, HUGE_COUNT, TYPICAL_COUNT, type Row } from './data'
import type { FixtureId } from './scenarios'

// Correct: splits into grapheme clusters, so an emoji's surrogate pair is treated as one unit --
// "🦊 Fox" gives "🦊F", not a broken half of one.
function safeInitials(name: string) {
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => [...segmenter.segment(w)][0]?.segment ?? '')
    .join('')
}

function AvatarWith({ row }: { row: Row }) {
  const [broken, setBroken] = useState(false)
  if (row.avatarUrl && !broken) {
    return <img src={row.avatarUrl} alt="" onError={() => setBroken(true)} className="size-8 shrink-0 rounded-full bg-well object-cover" />
  }
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
      {safeInitials(row.name)}
    </span>
  )
}

const compact = (n: number) => new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n)

/**
 * The same activity feed with a content contract behind it: the text column has `min-width: 0`
 * and wraps, so nothing can push the timestamp out of the row; a long unbroken run breaks instead
 * of overflowing; a failed image falls back to initials instead of staying broken; the initials
 * themselves are grapheme-safe; and a huge count is compact, with the exact number one hover or
 * Tab away.
 */
export function WithSkill({ fixture, hugeCount }: { fixture: FixtureId | null; hugeCount: boolean }) {
  const row = fixture ? FIXTURES[fixture] : BASELINE_ROW
  const rows = [row, ...CONSTANT_ROWS]
  const count = hugeCount ? HUGE_COUNT : TYPICAL_COUNT

  return (
    <AppWindow name="Northwind" size="short">
      <div className="mb-2.5 flex items-center gap-2">
        <h2 className={eyebrow}>Activity</h2>
        <span
          title={`${count.toLocaleString()} unread`}
          className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-accent-ink"
        >
          {compact(count)}
        </span>
      </div>

      <ul className="overflow-hidden rounded-xl border border-line bg-surface">
        {rows.map((r, i) => (
          <li key={r.id} className={`flex items-start gap-3 px-4 py-3 ${i === 0 ? '' : 'border-t border-line'}`}>
            <AvatarWith row={r} />
            <div className="min-w-0 flex-1">
              <p tabIndex={0} title={`${r.name} ${r.verb} ${r.object}`} className="line-clamp-2 text-sm break-words">
                <span className="font-medium text-ink">{r.name}</span> <span className="text-ink-2">{r.verb}</span>{' '}
                <span className="text-ink-3 italic">{r.object}</span>
              </p>
            </div>
            <span className="shrink-0 text-xs text-ink-3">{r.time}</span>
          </li>
        ))}
      </ul>
    </AppWindow>
  )
}
