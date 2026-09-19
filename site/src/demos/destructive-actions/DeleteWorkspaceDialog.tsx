import { useId, useState } from 'react'
import { ModalDialog } from '../MockApp'
import { button } from '../ui'
import { plural, WORKSPACE } from './data'

/**
 * R3 x B3: irreversible and it affects other people. So the dialog states the blast radius, asks
 * for the resource's name (not "DELETE"), enables the button only on an exact match, and doesn't
 * default focus to anything destructive. Deletion is then delayed, not immediate.
 */
export function DeleteWorkspaceDialog({
  totals,
  onCancel,
  onConfirm,
}: {
  totals: { projects: number; tasks: number; files: number }
  onCancel: () => void
  onConfirm: () => void
}) {
  const [typed, setTyped] = useState('')
  const inputId = useId()
  const matches = typed === WORKSPACE

  return (
    <ModalDialog title={`Delete workspace “${WORKSPACE}”?`} onClose={onCancel}>
      <p className="mt-1.5 text-sm text-ink-2">
        It's scheduled for deletion in 7 days. You can cancel any time before then. After that it's permanent.
      </p>
      <ul className="mt-3.5 space-y-1.5 rounded-lg bg-danger-soft px-3.5 py-3 text-sm text-danger">
        <li>
          {plural(totals.projects, 'project')} · {plural(totals.tasks, 'task')} · {plural(totals.files, 'file')}
        </li>
        <li>14 members lose access</li>
        <li>3 integrations stop working</li>
      </ul>
      <label htmlFor={inputId} className="mt-4 block text-sm text-ink-2">
        Type <span className="font-mono font-semibold text-ink">{WORKSPACE}</span> to confirm
      </label>
      <input
        id={inputId}
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && matches && onConfirm()}
        autoComplete="off"
        spellCheck={false}
        className="mt-1.5 h-9 w-full rounded-lg border border-line-strong bg-paper px-3 font-mono text-sm outline-none focus:border-danger"
      />
      <div className="mt-5 flex justify-end gap-2">
        <button type="button" className={button.secondary} onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className={button.danger} disabled={!matches} onClick={onConfirm}>
          Delete workspace
        </button>
      </div>
    </ModalDialog>
  )
}
