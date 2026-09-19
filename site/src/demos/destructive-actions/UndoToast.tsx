import { button } from '../ui'
import type { Project } from './data'

/**
 * Names the object and the impact, says where it went, and stays reachable: a status region so
 * screen readers announce it, a real button so keyboards can Undo, paused by hover and focus.
 */
export function UndoToast({
  removed,
  progress,
  tickMs,
  onUndo,
  onHold,
}: {
  removed: Project[]
  progress: number
  tickMs: number
  onUndo: () => void
  onHold: (held: boolean) => void
}) {
  const tasks = removed.reduce((n, p) => n + p.tasks, 0)

  return (
    <div
      role="status"
      onMouseEnter={() => onHold(true)}
      onMouseLeave={() => onHold(false)}
      onFocus={() => onHold(true)}
      onBlur={() => onHold(false)}
      className="absolute inset-x-4 bottom-4 z-20 overflow-hidden rounded-xl bg-ink text-paper shadow-2xl"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1 text-sm">
          <div className="truncate font-medium">
            {removed.length === 1
              ? `Deleted “${removed[0].name}” and its ${removed[0].tasks} tasks`
              : `${removed.length} projects deleted · ${tasks} tasks`}
          </div>
          <div className="text-xs opacity-60">Restorable from Trash for 30 days</div>
        </div>
        <button type="button" onClick={onUndo} className={button.toast}>
          Undo
        </button>
      </div>
      <div className="h-0.5 bg-paper/15">
        <div
          className="h-full bg-paper/70 transition-[width] ease-linear motion-reduce:transition-none"
          style={{ width: `${Math.max(progress, 0) * 100}%`, transitionDuration: `${tickMs}ms` }}
        />
      </div>
    </div>
  )
}
