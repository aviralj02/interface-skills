import { Lock, UserPlus, Users, WifiOff, type LucideIcon } from 'lucide-react'
import { eyebrow } from '../ui'
import { SCENARIOS, type ScenarioId } from './scenarios'

const ICONS: Record<ScenarioId, LucideIcon> = {
  join: UserPlus,
  hiccup: WifiOff,
  viewer: Lock,
  seats: Users,
}

/**
 * Fires one scenario on both panes at once. "Become a Viewer" and "Fill all 5 seats" are modes
 * (aria-pressed reflects them); the rest are one-shot events replayed by clicking again. Keys 1-4
 * do the same, for recording.
 */
export function TriggerBar({ active, onFire }: { active: Partial<Record<ScenarioId, boolean>>; onFire: (id: ScenarioId) => void }) {
  return (
    <div role="group" aria-label="Trigger a scenario on both panes" className="flex flex-wrap items-center gap-2 lg:col-span-2">
      <span className={`${eyebrow} mr-1`}>Trigger</span>
      {SCENARIOS.map((s, i) => {
        const Icon = ICONS[s.id]
        return (
          <button
            key={s.id}
            type="button"
            aria-pressed={s.toggle ? Boolean(active[s.id]) : undefined}
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
