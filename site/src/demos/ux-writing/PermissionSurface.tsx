import { useId } from 'react'
import { button, eyebrow } from '../ui'
import { COPY, type Variant } from './copy'

/** A control the user can't use. Disabled with no reason is a dead end; the skill puts the reason and the way forward beside it. */
export function PermissionSurface({ variant }: { variant: Variant }) {
  const noteId = useId()
  const { note } = COPY.permission[variant]

  return (
    <section>
      <h2 className={`${eyebrow} mb-2.5`}>Billing</h2>
      <div className="rounded-xl border border-line bg-surface p-4">
        <dl className="grid grid-cols-[6rem_1fr] gap-y-2 text-sm">
          <dt className="text-ink-3">Plan</dt>
          <dd>Team · $48 per month</dd>
          <dt className="text-ink-3">Your role</dt>
          <dd>Member</dd>
        </dl>
        <div className="mt-4">
          <button type="button" disabled aria-describedby={note ? noteId : undefined} className={button.primary}>
            Change plan
          </button>
          {note && (
            <p id={noteId} className="swap-in mt-2.5 text-sm text-ink-2">
              {note}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
