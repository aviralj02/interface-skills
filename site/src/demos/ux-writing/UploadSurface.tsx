import { CircleAlert, FileWarning } from 'lucide-react'
import { button, eyebrow } from '../ui'
import { COPY, type Variant } from './copy'

/**
 * A batch where 2 of 20 files were rejected. Without the skill it's one catch-all failure with a
 * Retry that can't help; with it, the copy says what succeeded, what didn't and why, and what to do.
 */
export function UploadSurface({ variant }: { variant: Variant }) {
  const copy = COPY.upload[variant]

  return (
    <section>
      <h2 className={`${eyebrow} mb-2.5`}>Upload receipts</h2>
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="text-sm font-medium">20 files selected</div>

        {variant === 'without' ? (
          <div role="alert" className="swap-in mt-4 flex items-center gap-3 rounded-lg bg-danger-soft px-3.5 py-3 text-sm text-danger">
            <CircleAlert className="size-4 shrink-0" aria-hidden />
            <p className="flex-1">{copy.message}</p>
            <button type="button" className={button.dangerOutline}>
              {copy.action}
            </button>
          </div>
        ) : (
          <div role="alert" className="swap-in mt-4 rounded-lg bg-warn-soft px-3.5 py-3 text-sm text-warn">
            <p className="font-medium">{copy.message}</p>
            <ul className="mt-2 space-y-1">
              {copy.files?.map((file) => (
                <li key={file} className="flex items-center gap-2">
                  <FileWarning className="size-4 shrink-0" aria-hidden />
                  {file}
                </li>
              ))}
            </ul>
            <p className="mt-2 opacity-80">{copy.hint}</p>
            <button type="button" className={`${button.warn} mt-3`}>
              {copy.action}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
