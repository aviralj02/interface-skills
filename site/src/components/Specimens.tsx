import { CircleAlert, Lock, RotateCw, UserPlus } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link } from 'react-router'
import { useIndicator } from '../lib/useIndicator'

type Mode = 'happy' | 'every'

type Member = { name: string; role: string; initials: string; tone: string }

const MEMBERS: Member[] = [
  { name: 'Ana Ruiz', role: 'Admin', initials: 'AR', tone: 'bg-[#dfe7ff] text-[#2748a8] dark:bg-[#1f2a4a] dark:text-[#a9bcff]' },
  { name: 'Sam Okafor', role: 'Member', initials: 'SO', tone: 'bg-[#e3f1e8] text-[#23603c] dark:bg-[#18301f] dark:text-[#8fd6ab]' },
  { name: 'Priya Nair', role: 'Member', initials: 'PN', tone: 'bg-[#f6e9dc] text-[#7a4a17] dark:bg-[#33241a] dark:text-[#e8b98a]' },
]

function Panel({ children, action = true, disabled = false }: { children: ReactNode; action?: boolean; disabled?: boolean }) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-line bg-surface p-3 shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
      <div className="mb-2.5 flex min-h-6 items-center justify-between gap-2">
        <span className="text-[0.8125rem] font-semibold text-ink">Team</span>
        {action && (
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[0.6875rem] font-semibold ${
              disabled ? 'bg-well text-ink-3' : 'bg-accent text-accent-ink'
            }`}
          >
            <UserPlus aria-hidden size={12} strokeWidth={2} />
            Invite
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}

function Row({ m, long }: { m: Member; long?: boolean }) {
  return (
    <div className="flex items-center gap-2 border-t border-line py-1.5 first:border-t-0">
      <span className={`grid size-6 shrink-0 place-items-center rounded-full text-[0.5625rem] font-bold ${m.tone}`}>{m.initials}</span>
      <span className={`min-w-0 flex-1 text-[0.75rem] leading-tight text-ink ${long ? 'line-clamp-2 [overflow-wrap:break-word]' : 'truncate'}`} title={m.name}>
        {m.name}
      </span>
      <span className="shrink-0 text-[0.6875rem] text-ink-3 max-sm:hidden">{m.role}</span>
    </div>
  )
}

const STATES: { id: string; label: string; skill?: string; ui: ReactNode }[] = [
  {
    id: 'populated',
    label: 'Populated',
    ui: (
      <Panel>
        {MEMBERS.map((m) => (
          <Row key={m.name} m={m} />
        ))}
      </Panel>
    ),
  },
  {
    id: 'loading',
    label: 'Loading',
    skill: 'interface-states',
    ui: (
      <Panel disabled>
        {[0.62, 0.5, 0.56].map((w, i) => (
          <div key={i} className="flex items-center gap-2 border-t border-line py-[0.4375rem] first:border-t-0">
            <span className="size-6 shrink-0 animate-pulse rounded-full bg-well motion-reduce:animate-none" />
            <span className="h-2.5 animate-pulse rounded bg-well motion-reduce:animate-none" style={{ width: `${w * 100}%` }} />
          </div>
        ))}
      </Panel>
    ),
  },
  {
    id: 'empty',
    label: 'Empty',
    skill: 'ux-writing',
    ui: (
      <Panel action={false}>
        <div className="flex flex-1 flex-col items-start justify-center gap-1.5 py-1">
          <p className="text-[0.75rem] font-medium text-ink">You’re the only member</p>
          <p className="text-[0.6875rem] leading-snug text-ink-3">Invite people to work on projects with you.</p>
          <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-[0.6875rem] font-semibold text-accent-ink">
            <UserPlus aria-hidden size={12} strokeWidth={2} />
            Invite teammates
          </span>
        </div>
      </Panel>
    ),
  },
  {
    id: 'error',
    label: 'Failed request',
    skill: 'async-interactions',
    ui: (
      <Panel disabled>
        <div className="flex flex-1 flex-col items-start justify-center gap-1.5 rounded-md bg-danger-soft px-2.5 py-2">
          <p className="flex items-center gap-1.5 text-[0.75rem] font-medium text-danger">
            <CircleAlert aria-hidden size={13} strokeWidth={2} />
            Couldn’t load members
          </p>
          <p className="text-[0.6875rem] leading-snug text-ink-2">Check your connection and try again.</p>
          <span className="inline-flex items-center gap-1 rounded-md border border-line-strong bg-surface px-2 py-0.5 text-[0.6875rem] font-semibold text-ink">
            <RotateCw aria-hidden size={11} strokeWidth={2} />
            Retry
          </span>
        </div>
      </Panel>
    ),
  },
  {
    id: 'denied',
    label: 'No permission',
    skill: 'feature-completeness',
    ui: (
      <Panel action={false}>
        {MEMBERS.slice(0, 2).map((m) => (
          <Row key={m.name} m={m} />
        ))}
        <p className="mt-auto flex items-start gap-1.5 rounded-md bg-well px-2 py-1.5 text-[0.6875rem] leading-snug text-ink-2">
          <Lock aria-hidden size={11} strokeWidth={2} className="mt-px shrink-0" />
          Only admins can invite. Ask Ana.
        </p>
      </Panel>
    ),
  },
  {
    id: 'long',
    label: 'Long content',
    skill: 'content-resilience',
    ui: (
      <Panel>
        <Row m={{ name: 'Maximilian Alexander von Hohenberg-Schwarzenbach', role: 'Admin', initials: 'MH', tone: MEMBERS[0].tone }} long />
        <Row m={MEMBERS[1]} />
        <p className="mt-auto pt-1 text-[0.6875rem] text-ink-3">+ 1,284 more</p>
      </Panel>
    ),
  },
]

function Unhandled() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-dashed border-line-strong p-3">
      <div className="mb-2.5 flex min-h-6 items-center justify-between">
        <span className="text-[0.8125rem] font-semibold text-ink-3">Team</span>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <span className="text-[0.75rem] text-ink-3">Not handled</span>
      </div>
    </div>
  )
}

const MODES: { id: Mode; label: string; line: string }[] = [
  { id: 'happy', label: 'Happy path', line: 'What agents usually ship: one state, designed.' },
  { id: 'every', label: 'Every state', line: 'With Interface Skills: every state has a design and a next step.' },
]

export function Specimens() {
  // Visitors land on what agents usually ship, then the sheet fills in once it is in view.
  // Without JavaScript, or with reduced motion, CSS shows every state from the start.
  const [mode, setMode] = useState<Mode>('happy')
  const [autoplay, setAutoplay] = useState<'pending' | 'done'>('pending')
  const figure = useRef<HTMLElement>(null)
  const radios = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (autoplay === 'done') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMode('every')
      setAutoplay('done')
      return
    }
    let timer: number | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer)
        if (!entry.isIntersecting) return
        timer = window.setTimeout(() => {
          setMode('every')
          setAutoplay('done')
        }, 1100)
      },
      { threshold: 0.4 },
    )
    if (figure.current) observer.observe(figure.current)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [autoplay])

  function choose(next: Mode) {
    setAutoplay('done')
    setMode(next)
  }

  function onKeyDown(e: KeyboardEvent) {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return
    e.preventDefault()
    const next = mode === 'happy' ? 1 : 0
    choose(MODES[next].id)
    radios.current[next]?.focus()
  }

  const current = MODES.find((m) => m.id === mode)!
  const thumb = useIndicator(radios, mode === 'happy' ? 0 : 1)

  return (
    <figure ref={figure} data-autoplay={autoplay} className="specimens rounded-2xl border border-line bg-well p-3 sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1">
        <div
          role="radiogroup"
          aria-label="Specimen view"
          onKeyDown={onKeyDown}
          className="relative inline-flex rounded-lg border border-line bg-surface p-0.5"
        >
          {thumb.box && (
            <span
              aria-hidden
              className={`absolute inset-y-0.5 left-0 rounded-md bg-accent motion-reduce:transition-none ${
                thumb.animate ? 'transition-[transform,width] duration-300 ease-out-expo' : ''
              }`}
              style={{ width: thumb.box.w, transform: `translateX(${thumb.box.x}px)` }}
            />
          )}
          {MODES.map((m, i) => (
            <button
              key={m.id}
              ref={(el) => {
                radios.current[i] = el
              }}
              type="button"
              role="radio"
              aria-checked={mode === m.id}
              tabIndex={mode === m.id ? 0 : -1}
              onClick={() => choose(m.id)}
              className={`relative rounded-md px-3 py-1.5 text-[0.8125rem] font-medium transition-colors duration-200 ${
                mode === m.id ? `text-accent-ink ${thumb.box ? '' : 'bg-accent'}` : 'text-ink-3 hover:text-ink'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <figcaption aria-live="polite" className="text-[0.8125rem] text-ink-2">
          {current.line}
          {mode === 'happy' && <span className="hidden [@media(hover:hover)]:inline"> Hover a gap to preview it.</span>}
        </figcaption>
      </div>

      <ul className="sheet grid grid-cols-[repeat(2,minmax(0,1fr))] gap-2.5 sm:gap-3 lg:grid-cols-[repeat(3,minmax(0,1fr))]">
        {STATES.map((s, i) => {
          const shown = mode === 'every' || i === 0
          return (
            <li key={s.id} data-shown={shown} className="tile flex min-w-0 flex-col gap-2 transition-[opacity,filter] duration-300">
              <div className="grid min-h-[9.75rem] flex-1 grid-cols-[minmax(0,1fr)] [&>*]:[grid-area:1/1]">
                <div
                  inert={!shown}
                  aria-hidden={!shown}
                  className="specimen-layer layer-real min-w-0"
                  data-shown={shown}
                  style={{ transitionDelay: shown ? `${i * 55}ms` : '0ms' }}
                >
                  {s.ui}
                </div>
                {i > 0 && (
                  <div
                    inert={shown}
                    aria-hidden={shown}
                    className="specimen-layer layer-unhandled min-w-0"
                    data-shown={!shown}
                    style={{ transitionDelay: !shown ? `${i * 55}ms` : '0ms' }}
                  >
                    <Unhandled />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-0.5 px-0.5">
                <span className="state-label text-[0.8125rem] font-medium text-ink">{s.label}</span>
                {s.skill ? (
                  <Link to={`/skills/${s.skill}`} className="font-mono text-[0.75rem] text-ink-2 transition-colors hover:text-accent">
                    {s.skill}
                  </Link>
                ) : (
                  <span className="text-[0.75rem] text-ink-2">the happy path</span>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </figure>
  )
}
