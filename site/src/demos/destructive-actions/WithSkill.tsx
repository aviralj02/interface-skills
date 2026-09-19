import { TriangleAlert } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AppWindow } from '../MockApp'
import { button, eyebrow } from '../ui'
import { deletionDate, PROJECTS, WORKSPACE, type Project } from './data'
import { DeleteWorkspaceDialog } from './DeleteWorkspaceDialog'
import { ProjectList } from './ProjectList'
import { UndoToast } from './UndoToast'
import { useUndoWindow } from './useUndoWindow'

/**
 * The same app with the destructive-actions skill applied. Projects are R2 (recoverable): delete at
 * once, name the impact, offer Undo, restore in place. The workspace is R3 x B3: consequences plus
 * type-to-confirm, then a 7-day delayed deletion that can be cancelled. Danger lives in its own zone.
 */
export function WithSkill() {
  const [deleted, setDeleted] = useState<string[]>([])
  const [confirming, setConfirming] = useState(false)
  const [scheduledFor, setScheduledFor] = useState<string | null>(null)
  const undo = useUndoWindow()

  // Focus follows the list: to the next row after a delete, back onto the restored row after an undo.
  // Set in handlers, applied after the render that makes the target focusable.
  const rows = useRef(new Map<string, HTMLButtonElement>())
  const pendingFocus = useRef<string | null>(null)
  useEffect(() => {
    if (!pendingFocus.current) return
    rows.current.get(pendingFocus.current)?.focus()
    pendingFocus.current = null
  })

  const remove = (project: Project) => {
    const remaining = [...deleted, project.id]
    const at = PROJECTS.findIndex((p) => p.id === project.id)
    const neighbour = [...PROJECTS.slice(at + 1), ...PROJECTS.slice(0, at).reverse()].find((p) => !remaining.includes(p.id))
    pendingFocus.current = neighbour?.id ?? null
    setDeleted(remaining)
    undo.open(project.id)
  }

  const restore = () => {
    pendingFocus.current = undo.ids[0]
    setDeleted((d) => d.filter((id) => !undo.ids.includes(id)))
    undo.close()
  }

  const live = PROJECTS.filter((p) => !deleted.includes(p.id))
  const totals = {
    projects: live.length,
    tasks: live.reduce((n, p) => n + p.tasks, 0),
    files: live.reduce((n, p) => n + p.files, 0),
  }

  const dialog = confirming && (
    <DeleteWorkspaceDialog
      totals={totals}
      onCancel={() => setConfirming(false)}
      onConfirm={() => {
        setScheduledFor(deletionDate())
        setConfirming(false)
      }}
    />
  )

  const banner = scheduledFor && (
    <div className="flex items-center gap-3 border-b border-warn/25 bg-warn-soft px-4 py-2.5 text-sm text-warn">
      <TriangleAlert className="size-4 shrink-0" aria-hidden />
      <span className="flex-1">
        {WORKSPACE} will be deleted on <strong className="font-semibold">{scheduledFor}</strong>.
      </span>
      <button type="button" className={button.warn} onClick={() => setScheduledFor(null)}>
        Cancel deletion
      </button>
    </div>
  )

  return (
    <AppWindow name={WORKSPACE} modal={dialog} banner={banner}>
      <ProjectList
        deleted={deleted}
        onDelete={remove}
        rowRef={(id, el) => (el ? rows.current.set(id, el) : rows.current.delete(id))}
      />

      <section>
        <h2 className={`${eyebrow} mb-2.5`}>Workspace settings</h2>
        <div className="rounded-xl border border-line bg-surface p-4">
          <label className="text-xs font-medium text-ink-2" htmlFor="workspace-name-with">
            Workspace name
          </label>
          <input
            id="workspace-name-with"
            defaultValue={WORKSPACE}
            className="mt-1.5 h-9 w-full rounded-lg border border-line-strong bg-paper px-3 text-sm outline-none focus:border-accent"
          />
          <div className="mt-4">
            <button type="button" className={button.primary}>
              Save changes
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className={`${eyebrow} mb-2.5 text-danger`}>Danger zone</h2>
        <div className="flex items-center gap-4 rounded-xl border border-danger/30 p-4">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium">Delete this workspace</div>
            <div className="text-xs text-ink-3">
              {scheduledFor ? `Scheduled for ${scheduledFor}. Cancel it from the banner above.` : 'Removes all projects, files, and access.'}
            </div>
          </div>
          <button type="button" className={button.dangerOutline} disabled={Boolean(scheduledFor)} onClick={() => setConfirming(true)}>
            Delete workspace
          </button>
        </div>
      </section>

      {undo.ids.length > 0 && (
        <UndoToast
          removed={PROJECTS.filter((p) => undo.ids.includes(p.id))}
          progress={undo.progress}
          tickMs={undo.tickMs}
          onUndo={restore}
          onHold={undo.hold}
        />
      )}
    </AppWindow>
  )
}
