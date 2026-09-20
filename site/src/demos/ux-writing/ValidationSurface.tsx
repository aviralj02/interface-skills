import { useEffect, useId, useRef, useState } from 'react'
import { button, eyebrow, field } from '../ui'
import { COPY, type Variant } from './copy'

const isEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value.trim())

/**
 * Same form, same empty submit. Without the skill the message is a toast that disappears before
 * anyone finds the field, and the button says "Submit". With it, the requirement sits next to the
 * field, is tied to it with aria-describedby, and the button names its outcome.
 */
export function ValidationSurface({ variant }: { variant: Variant }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [toast, setToast] = useState(variant === 'without')
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const errorId = useId()
  const copy = COPY.validation[variant]
  const invalid = !isEmail(email)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(false), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  const submit = () => {
    if (!invalid) return setSent(true)
    if (variant === 'without') setToast(true)
    else inputRef.current?.focus()
  }

  return (
    <section className="relative">
      <h2 className={`${eyebrow} mb-2.5`}>Send invoice</h2>
      <div className="rounded-xl border border-line bg-surface p-4">
        <label htmlFor={inputId} className="text-xs font-medium text-ink-2">
          Client email
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          inputMode="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setSent(false)
          }}
          aria-invalid={invalid}
          aria-describedby={variant === 'with' && invalid ? errorId : undefined}
          className={`${field} mt-1.5`}
        />
        {variant === 'with' && invalid && (
          <p id={errorId} className="mt-1.5 text-xs text-danger">
            {copy.message}
          </p>
        )}

        <div className="mt-4 flex items-center gap-3">
          <button type="button" className={button.primary} onClick={submit}>
            {copy.button}
          </button>
          {sent && (
            <span role="status" className="swap-in text-sm text-ok">
              {copy.sent(email.trim())}
            </span>
          )}
        </div>
      </div>

      {variant === 'without' && toast && (
        <div role="alert" className="swap-in absolute -top-3 right-0 z-10 rounded-lg bg-ink px-3.5 py-2 text-sm text-paper shadow-xl">
          {copy.message}
        </div>
      )}
    </section>
  )
}
