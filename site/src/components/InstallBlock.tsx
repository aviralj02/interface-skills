import { Fragment, useId, useRef, useState, type KeyboardEvent } from 'react'
import type { InstallMethod } from '../content/site'
import { useIndicator } from '../lib/useIndicator'
import { CopyButton } from './CopyButton'

// Commands may wrap only at spaces or after a slash, never mid-word where a hyphen would look typed.
function breakable(line: string) {
  return line.split(/(\s+)/).map((word, i) =>
    /^\s+$/.test(word) ? (
      word
    ) : (
      <Fragment key={i}>
        {word.split(/(?<=\/)/).map((part, j) => (
          <Fragment key={j}>
            {j > 0 && <wbr />}
            <span className="whitespace-nowrap">{part}</span>
          </Fragment>
        ))}
      </Fragment>
    ),
  )
}

export function InstallBlock({ methods, className = '' }: { methods: InstallMethod[]; className?: string }) {
  const [active, setActive] = useState(0)
  const [copies, setCopies] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const base = useId()
  const method = methods[active]
  const { box, animate } = useIndicator(tabs, active)

  function select(i: number) {
    setActive(i)
    setCopies(0)
  }

  function onKeyDown(e: KeyboardEvent) {
    const last = methods.length - 1
    const next =
      e.key === 'ArrowRight' ? (active === last ? 0 : active + 1)
      : e.key === 'ArrowLeft' ? (active === 0 ? last : active - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    select(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className={`min-w-0 rounded-xl border border-line bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.08)] ${className}`}>
      <div className="flex items-center justify-between gap-2 border-b border-line pr-1.5 pl-1.5">
        <div
          role="tablist"
          aria-label="Install method"
          className="relative flex min-w-0 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onKeyDown={onKeyDown}
        >
          {methods.map((m, i) => (
            <button
              key={m.id}
              ref={(el) => {
                tabs.current[i] = el
              }}
              role="tab"
              type="button"
              id={`${base}-tab-${m.id}`}
              aria-selected={i === active}
              aria-controls={`${base}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              className={`relative shrink-0 px-2.5 py-2.5 text-[0.8125rem] font-medium whitespace-nowrap transition-colors duration-150 ${
                i === active ? 'text-ink' : 'text-ink-3 hover:text-ink-2'
              }`}
            >
              {m.label}
              {/* Static underline until the sliding one has been measured (and for server-rendered HTML). */}
              {!box && i === active && <span aria-hidden className="absolute inset-x-2.5 bottom-0 h-[2px] rounded-full bg-accent" />}
            </button>
          ))}
          {box && (
            <span
              aria-hidden
              className={`pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full bg-accent motion-reduce:transition-none ${
                animate ? 'transition-[transform,width] duration-300 ease-out-expo' : ''
              }`}
              style={{ width: box.w - 20, transform: `translateX(${box.x + 10}px)` }}
            />
          )}
        </div>
        <CopyButton
          text={method.lines.join('\n')}
          label="Copy command"
          showLabel
          compact
          tone="accent"
          className="shrink-0"
          onCopied={() => setCopies((n) => n + 1)}
        />
      </div>
      <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${method.id}`} className="px-4 pt-3.5 pb-3">
        {/* Keyed so switching tabs replays a short settle, and each copy replays the highlight. */}
        <div key={method.id} className="swap-in">
          <pre className="overflow-x-auto font-mono text-[0.875rem] leading-6 text-ink">
            {method.lines.map((line) => (
              <div key={line} className="flex gap-3 py-0.5">
                <span aria-hidden className="shrink-0 text-ink-3 select-none">
                  {line.startsWith('/') ? '›' : '$'}
                </span>
                <span key={copies} className={`min-w-0 whitespace-pre-wrap ${copies ? 'copied-flash' : ''}`}>
                  {breakable(line)}
                </span>
              </div>
            ))}
          </pre>
          {method.note && <p className="mt-2 text-[0.8125rem] text-ink-3">{method.note}</p>}
        </div>
      </div>
    </div>
  )
}
