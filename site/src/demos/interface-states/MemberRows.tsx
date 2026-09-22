import { MoreVertical } from 'lucide-react'
import type { Member } from './data'

const ROLE_STYLE: Record<Member['role'], string> = {
  owner: 'text-accent',
  admin: 'text-ink-2',
  member: 'text-ink-3',
}
const ROLE_LABEL: Record<Member['role'], string> = { owner: 'Owner', admin: 'Admin', member: 'Member' }

/** Shared row rendering for both panes. `showActions` hides the kebab entirely rather than disabling it. */
export function MemberRows({
  members,
  showActions,
  onAction,
}: {
  members: Member[]
  showActions: boolean
  onAction?: (member: Member) => void
}) {
  return (
    <ul className="overflow-hidden rounded-xl border border-line bg-surface">
      {members.map((m, i) => (
        <li key={m.id} className={`flex items-center gap-3 px-4 py-3 ${i === 0 ? '' : 'border-t border-line'}`}>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
            {m.initials}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{m.name}</div>
            <div className="truncate text-xs text-ink-3">{m.email}</div>
          </div>
          <span className={`text-xs font-medium ${ROLE_STYLE[m.role]}`}>{ROLE_LABEL[m.role]}</span>
          {showActions && (
            <button
              type="button"
              aria-label={`Manage ${m.name}`}
              onClick={() => onAction?.(m)}
              className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-md text-ink-3 hover:bg-well hover:text-ink"
            >
              <MoreVertical className="size-4" aria-hidden />
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
