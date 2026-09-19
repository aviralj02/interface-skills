import { Folder, Trash2 } from 'lucide-react'
import { button, eyebrow } from '../ui'
import { describe, PROJECTS, type Project } from './data'

/**
 * Deleted rows collapse instead of unmounting, so an undo puts them back in the same position,
 * and are `inert` so a hidden row's buttons can't be tabbed to.
 */
export function ProjectList({
  deleted,
  onDelete,
  rowRef,
}: {
  deleted: string[]
  onDelete: (project: Project) => void
  rowRef?: (id: string, el: HTMLButtonElement | null) => void
}) {
  const firstVisible = PROJECTS.find((p) => !deleted.includes(p.id))?.id

  return (
    <section>
      <h2 className={`${eyebrow} mb-2.5`}>Projects</h2>
      <ul className="overflow-hidden rounded-xl border border-line bg-surface">
        {PROJECTS.map((p) => {
          const hidden = deleted.includes(p.id)
          return (
            <li
              key={p.id}
              inert={hidden}
              className="grid transition-[grid-template-rows,opacity] duration-300 ease-out-expo motion-reduce:transition-none"
              style={{ gridTemplateRows: hidden ? '0fr' : '1fr', opacity: hidden ? 0 : 1 }}
            >
              <div className="min-h-0 overflow-hidden">
                <div className={`flex items-center gap-3 px-4 py-3.5 ${p.id === firstVisible ? '' : 'border-t border-line'}`}>
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-well text-ink-2">
                    <Folder className="size-[18px]" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{p.name}</div>
                    <div className="truncate text-xs text-ink-3">{describe(p)}</div>
                  </div>
                  <button type="button" className={button.ghost}>
                    Open
                  </button>
                  <button
                    type="button"
                    ref={rowRef ? (el) => rowRef(p.id, el) : undefined}
                    className={button.ghostDanger}
                    onClick={() => onDelete(p)}
                    aria-label={`Delete ${p.name}`}
                  >
                    <Trash2 className="size-4" aria-hidden />
                    Delete
                  </button>
                </div>
              </div>
            </li>
          )
        })}
        {deleted.length === PROJECTS.length && <li className="px-4 py-6 text-center text-sm text-ink-3">No projects</li>}
      </ul>
    </section>
  )
}
