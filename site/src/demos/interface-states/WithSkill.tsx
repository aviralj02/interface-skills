import { AlertTriangle, Lock } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AppWindow } from '../MockApp'
import { button } from '../ui'
import { CONTENT_H, JOINERS, LOAD_MS, MEMBERS, REFETCH_MS, type Member } from './data'
import { MemberRows } from './MemberRows'
import type { Moment } from './scenarios'

type Status = { kind: 'loading' } | { kind: 'ready'; members: Member[] }

/**
 * The same surface modeled with one status per the state matrix (loading / ready), plus
 * orthogonal flags — refetching, stale, viewer mode, seats full — layered on top of "ready"
 * without ever being confused for a region status of their own. A background refetch never
 * un-renders good data; a failed one marks it stale instead of replacing it; permission and seat
 * limits are explicit states with a reason, not silent no-ops discovered on click.
 */
export function WithSkill({ moment, viewerMode, seatsFull }: { moment: Moment | null; viewerMode: boolean; seatsFull: boolean }) {
  const [members, setMembers] = useState<Member[] | null>(null)
  const [refetching, setRefetching] = useState(false)
  const [stale, setStale] = useState<Date | null>(null)
  const joinIndex = useRef(0)

  useEffect(() => {
    const t = setTimeout(() => setMembers(MEMBERS), LOAD_MS)
    return () => clearTimeout(t)
  }, [])

  // Every reaction runs one tick later, via `runLater`, rather than as a direct setState call in
  // the effect body -- so `moment` (something that happened outside this component) is what
  // triggers the update, not the effect running.
  useEffect(() => {
    if (!moment) return
    const timers: ReturnType<typeof setTimeout>[] = []
    const runLater = (fn: () => void, ms = 0) => timers.push(setTimeout(fn, ms))

    if (moment.id === 'join') {
      runLater(() => setRefetching(true))
      runLater(() => {
        setMembers((prev) => [...(prev ?? MEMBERS), JOINERS[joinIndex.current % JOINERS.length]])
        joinIndex.current += 1
        setRefetching(false)
      }, REFETCH_MS)
    }
    if (moment.id === 'hiccup') {
      runLater(() => setRefetching(true))
      runLater(() => {
        setStale(new Date())
        setRefetching(false)
      }, REFETCH_MS)
    }
    return () => timers.forEach(clearTimeout)
  }, [moment])

  const retry = () => {
    setRefetching(true)
    setTimeout(() => {
      setStale(null)
      setRefetching(false)
    }, 500)
  }

  const status: Status = members ? { kind: 'ready', members } : { kind: 'loading' }

  const banner = refetching ? (
    <div className="h-1 overflow-hidden bg-accent-soft" role="status" aria-label="Refreshing members">
      <div className="h-full w-1/3 animate-pulse rounded-r-full bg-accent motion-reduce:animate-none" />
    </div>
  ) : stale ? (
    <div role="status" className="flex items-center gap-3 border-b border-warn/25 bg-warn-soft px-4 py-2.5 text-sm text-warn">
      <AlertTriangle className="size-4 shrink-0" aria-hidden />
      <span className="flex-1">Showing members as of {stale.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.</span>
      <button type="button" className={button.warn} onClick={retry}>
        Retry
      </button>
    </div>
  ) : undefined

  return (
    <AppWindow name="Northwind" size="medium" banner={banner}>
      {status.kind === 'loading' ? (
        <div className={CONTENT_H}>
          <div className="overflow-hidden rounded-xl border border-line">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-15 animate-pulse bg-well motion-reduce:animate-none ${i === 0 ? '' : 'border-t border-line'}`}
                style={{ animationDelay: `${i * 90}ms` }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <MemberRows members={status.members} showActions={!viewerMode} />

          {viewerMode ? (
            <p className="flex flex-wrap items-center gap-1.5 text-sm text-ink-2">
              <Lock className="size-4 shrink-0 text-ink-3" aria-hidden />
              Only admins can manage members.
              <button type="button" className="cursor-pointer font-medium text-accent hover:underline">
                Ask an admin
              </button>
            </p>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" disabled={seatsFull} className={button.primary}>
                Invite
              </button>
              {seatsFull && (
                <span className="text-sm text-ink-3">
                  5 of 5 seats used ·{' '}
                  <button type="button" className="cursor-pointer font-medium text-accent hover:underline">
                    Upgrade plan
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </AppWindow>
  )
}
