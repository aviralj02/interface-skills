import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from 'react'

/** A fake product window. Fixed height so banners and toasts never make one pane jump. */
const HEIGHT = {
  tall: 'h-[740px]',
  medium: 'h-[620px]',
  compact: 'h-[440px]',
  short: 'h-[340px]',
} as const

export function AppWindow({
  name,
  size = 'tall',
  modal,
  banner,
  children,
}: {
  name: string
  /** tall: a settings page plus a toast. medium: a table plus a control bar above the panes. compact/short: less content, no scroll. */
  size?: keyof typeof HEIGHT
  modal?: ReactNode
  banner?: ReactNode
  children: ReactNode
}) {
  return (
    <div className={`relative ${HEIGHT[size]} overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_1px_0_var(--color-line),0_24px_48px_-24px_rgb(0_0_0/0.18)]`}>
      {/* While a dialog is open the app behind it is inert, so Tab and screen readers can't reach it. */}
      <div inert={Boolean(modal)} className="flex h-full flex-col">
        <div className="flex h-12 items-center gap-2.5 border-b border-line bg-surface px-4">
          <span className="size-5 rounded-md bg-accent" aria-hidden />
          <span className="text-sm font-semibold tracking-tight">{name}</span>
          <span className="ml-auto grid size-7 place-items-center rounded-full bg-accent-soft text-[11px] font-bold text-accent">
            AJ
          </span>
        </div>
        {banner}
        <div className="flex-1 space-y-6 overflow-hidden px-5 pt-5">{children}</div>
      </div>
      {modal}
    </div>
  )
}

/**
 * Modal that stays inside its own window (not the top layer), so the other pane stays visible on
 * video. Focus goes to the [data-autofocus] element if there is one, otherwise to the dialog itself;
 * Tab is trapped, Escape closes, and focus returns to the trigger on close.
 */
export function ModalDialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const titleId = useId()

  // Captured once, during the first render -- before the background becomes inert -- rather than
  // inside the effect. In React StrictMode's dev-only double-invoke, capturing it in the effect
  // would sometimes read back the dialog's own input: the first invocation's cleanup tries to
  // restore focus to the trigger, but the trigger is still inert at that instant so the call is a
  // silent no-op, and the second invocation then captures "trigger" as whatever is still focused
  // -- the dialog's own input -- instead of the real trigger.
  const triggerRef = useRef<HTMLElement | null>(null)
  if (triggerRef.current === null) triggerRef.current = document.activeElement as HTMLElement

  useEffect(() => {
    const el = ref.current
    if (!el) return
    ;(el.querySelector<HTMLElement>('[data-autofocus]') ?? el).focus()
    return () => triggerRef.current?.focus?.()
  }, [])

  const onKeyDown = (e: KeyboardEvent) => {
    const el = ref.current
    if (!el) return
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key !== 'Tab') return
    const items = [...el.querySelectorAll<HTMLElement>('button:not(:disabled), input')]
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    const active = document.activeElement
    if (e.shiftKey && (active === first || active === el)) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="absolute inset-0 z-10 grid place-items-center bg-ink/35 p-5 backdrop-blur-[2px]">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className="w-full max-w-[400px] rounded-xl border border-line bg-surface p-5 shadow-2xl outline-none"
      >
        <h3 id={titleId} className="text-base font-semibold">
          {title}
        </h3>
        {children}
      </div>
    </div>
  )
}
