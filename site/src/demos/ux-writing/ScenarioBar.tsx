import { Lock, Mail, SearchX, Upload, WifiOff, type LucideIcon } from 'lucide-react'
import { eyebrow } from '../ui'
import { SCENARIOS, type Scenario } from './scenarios'

const ICONS: Record<Scenario, LucideIcon> = {
  save: WifiOff,
  validation: Mail,
  empty: SearchX,
  upload: Upload,
  permission: Lock,
}

/** Fires one moment on both panes at once. Keys 1-5 do the same, for recording. */
export function ScenarioBar({ current, onFire }: { current: Scenario | undefined; onFire: (id: Scenario) => void }) {
  return (
    <div role="group" aria-label="Trigger a moment on both panes" className="flex flex-wrap items-center gap-2 lg:col-span-2">
      <span className={`${eyebrow} mr-1`}>Trigger</span>
      {SCENARIOS.map((s, i) => {
        const Icon = ICONS[s.id]
        return (
          <button
            key={s.id}
            type="button"
            aria-pressed={current === s.id}
            onClick={() => onFire(s.id)}
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-surface px-3.5 text-sm font-medium text-ink-2 transition-colors hover:bg-well aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:text-accent"
          >
            <Icon className="size-4" aria-hidden />
            {s.label}
            <kbd className="font-mono text-[11px] opacity-60">{i + 1}</kbd>
          </button>
        )
      })}
    </div>
  )
}
