import { AppWindow } from '../MockApp'
import { eyebrow } from '../ui'
import { BASELINE_ROW, CONSTANT_ROWS, FIXTURES, HUGE_COUNT, TYPICAL_COUNT, type Row } from './data'
import type { FixtureId } from './scenarios'

// Bug: splits on spaces and takes each word's first UTF-16 code unit. Fine for plain names, but an
// emoji is a surrogate pair, so `name[0]` is half of one -- an unpaired surrogate that renders as a
// broken glyph.
function naiveInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function AvatarWithout({ row }: { row: Row }) {
  // Bug: assumes the URL always resolves. No onerror, no fallback.
  if (row.avatarUrl) {
    return <img src={row.avatarUrl} alt="" className="size-8 shrink-0 rounded-full bg-well object-cover" />
  }
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
      {naiveInitials(row.name)}
    </span>
  )
}

/**
 * What an agent writes by default: one sample of content, styled to fit. The text column has no
 * `min-width: 0`, so a flex row won't let it shrink below its content's width -- it just pushes
 * past the card and gets clipped by the list's own rounded corner, timestamp and all. Long
 * unbroken strings do the same, for the same reason. A missing avatar is a broken `<img>`, and a
 * huge count is crammed raw into a badge sized for one digit.
 */
export function WithoutSkill({ fixture, hugeCount }: { fixture: FixtureId | null; hugeCount: boolean }) {
  const row = fixture ? FIXTURES[fixture] : BASELINE_ROW
  const rows = [row, ...CONSTANT_ROWS]
  const count = hugeCount ? HUGE_COUNT : TYPICAL_COUNT

  return (
    <AppWindow name="Northwind" size="short">
      <div className="mb-2.5 flex items-center gap-2">
        <h2 className={eyebrow}>Activity</h2>
        {/* Bug: fixed size, no room for more than a couple of digits. */}
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent text-[10px] font-bold whitespace-nowrap text-accent-ink">
          {count}
        </span>
      </div>

      <ul className="overflow-hidden rounded-xl border border-line bg-surface">
        {rows.map((r, i) => (
          <li key={r.id} className={`flex items-center gap-3 px-4 py-3 ${i === 0 ? '' : 'border-t border-line'}`}>
            <AvatarWithout row={r} />
            {/* Bug: flex-1 with no min-width: 0 and no wrapping -- content keeps its intrinsic width. */}
            <div className="flex-1 text-sm whitespace-nowrap">
              <span className="font-medium text-ink">{r.name}</span> <span className="text-ink-3">{r.verb}</span>{' '}
              <span className="text-ink-2 italic">{r.object}</span>
            </div>
            <span className="ml-2 shrink-0 text-xs text-ink-3">{r.time}</span>
          </li>
        ))}
      </ul>
    </AppWindow>
  )
}
