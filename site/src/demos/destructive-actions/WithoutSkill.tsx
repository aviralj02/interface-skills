import { Folder } from 'lucide-react'
import { useState } from 'react'
import { AppWindow, ModalDialog } from '../MockApp'
import { button, eyebrow } from '../ui'
import { WORKSPACE, type Project } from './data'
import { ProjectList } from './ProjectList'

type Ask = { kind: 'project'; project: Project } | { kind: 'workspace' }

/**
 * What an agent writes by default: "Are you sure?" on everything, Yes pre-focused as the primary
 * button, Delete sitting next to Save, no undo, no consequences named, and one Yes ends the workspace.
 */
export function WithoutSkill() {
  const [deleted, setDeleted] = useState<string[]>([])
  const [ask, setAsk] = useState<Ask | null>(null)
  const [gone, setGone] = useState(false)

  const confirm = () => {
    if (ask?.kind === 'project') setDeleted((d) => [...d, ask.project.id])
    if (ask?.kind === 'workspace') setGone(true)
    setAsk(null)
  }

  const dialog = ask && (
    <ModalDialog title="Are you sure?" onClose={() => setAsk(null)}>
      <p className="mt-1.5 text-sm text-ink-2">This action cannot be undone.</p>
      <div className="mt-5 flex justify-end gap-2">
        <button type="button" className={button.secondary} onClick={() => setAsk(null)}>
          No
        </button>
        <button type="button" data-autofocus className={button.primary} onClick={confirm}>
          Yes
        </button>
      </div>
    </ModalDialog>
  )

  if (gone) {
    return (
      <AppWindow name={WORKSPACE}>
        <div className="grid h-[560px] place-items-center text-center">
          <div>
            <Folder className="mx-auto size-8 text-ink-3" aria-hidden />
            <p className="mt-3 text-sm font-medium">Workspace deleted</p>
            <p className="mt-1 text-sm text-ink-3">{WORKSPACE} and everything in it was removed.</p>
          </div>
        </div>
      </AppWindow>
    )
  }

  return (
    <AppWindow name={WORKSPACE} modal={dialog}>
      <ProjectList deleted={deleted} onDelete={(project) => setAsk({ kind: 'project', project })} />

      <section>
        <h2 className={`${eyebrow} mb-2.5`}>Workspace settings</h2>
        <div className="rounded-xl border border-line bg-surface p-4">
          <label className="text-xs font-medium text-ink-2" htmlFor="workspace-name-without">
            Workspace name
          </label>
          <input
            id="workspace-name-without"
            defaultValue={WORKSPACE}
            className="mt-1.5 h-9 w-full rounded-lg border border-line-strong bg-paper px-3 text-sm outline-none focus:border-accent"
          />
          <div className="mt-4 flex gap-2">
            <button type="button" className={button.primary}>
              Save changes
            </button>
            <button type="button" className={button.danger} onClick={() => setAsk({ kind: 'workspace' })}>
              Delete workspace
            </button>
          </div>
        </div>
      </section>
    </AppWindow>
  )
}
