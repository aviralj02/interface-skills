import { CircleAlert } from 'lucide-react'
import { useId, useState } from 'react'
import { button, eyebrow, field } from '../ui'
import { COPY, type Variant } from './copy'

/** A network failure on save. The skill's error formula: what failed, is my work safe, what now. */
export function SaveSurface({ variant }: { variant: Variant }) {
  const [dismissed, setDismissed] = useState(false)
  const clientId = useId()
  const amountId = useId()
  const copy = COPY.save[variant]

  return (
    <section>
      <h2 className={`${eyebrow} mb-2.5`}>New invoice</h2>
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor={clientId} className="text-xs font-medium text-ink-2">
              Client
            </label>
            <input id={clientId} defaultValue="Acme Corp" className={`${field} mt-1.5`} />
          </div>
          <div>
            <label htmlFor={amountId} className="text-xs font-medium text-ink-2">
              Amount
            </label>
            <input id={amountId} defaultValue="$4,200" className={`${field} mt-1.5`} />
          </div>
        </div>
        <div className="mt-4">
          <button type="button" className={button.primary}>
            Save draft
          </button>
        </div>

        {!dismissed && (
          <div role="alert" className="swap-in mt-4 flex items-start gap-3 rounded-lg bg-danger-soft px-3.5 py-3 text-sm text-danger">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            <p className="flex-1">{copy.message}</p>
            <button type="button" className={button.dangerOutline} onClick={() => setDismissed(true)}>
              {copy.action}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
