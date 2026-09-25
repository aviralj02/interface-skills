import { button } from '../ui'
import type { Task } from './data'

/**
 * Shared row rendering for both panes. `noRing` reproduces "outline: none with no replacement" --
 * the only difference from the correct side is that class, everything else about the row is identical.
 */
export function TaskRows({
  tasks,
  noRing,
  rowRef,
  onRename,
  onDelete,
}: {
  tasks: Task[]
  noRing?: boolean
  rowRef?: (id: string, el: HTMLButtonElement | null) => void
  onRename: (task: Task) => void
  onDelete: (task: Task) => void
}) {
  const ring = noRing ? 'focus-visible:outline-none' : ''

  return (
    <ul className="overflow-hidden rounded-xl border border-line bg-surface">
      {tasks.map((t, i) => (
        <li key={t.id} className={`flex items-center gap-3 px-4 py-3 ${i === 0 ? '' : 'border-t border-line'}`}>
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{t.name}</span>
          <button
            type="button"
            ref={rowRef ? (el) => rowRef(t.id, el) : undefined}
            onClick={() => onRename(t)}
            className={`${button.ghost} ${ring}`}
          >
            Rename
          </button>
          <button type="button" onClick={() => onDelete(t)} className={`${button.ghostDanger} ${ring}`}>
            Delete
          </button>
        </li>
      ))}
      {tasks.length === 0 && <li className="px-4 py-6 text-center text-sm text-ink-3">No tasks</li>}
    </ul>
  )
}
