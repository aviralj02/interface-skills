import { CircleAlert, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AppWindow } from '../MockApp'
import { button } from '../ui'
import { CONTENT_H, JOINERS, LOAD_MS, MEMBERS, REFETCH_MS, TOAST_MS, type Member } from './data'
import { MemberRows } from './MemberRows'
import type { Moment } from './scenarios'

/**
 * What an agent writes by default: independent loading/error/data flags, checked in the wrong
 * order, so `loading` wins even during a routine background refetch and blanks the whole card.
 * A failed refetch throws away the good data it already had for a generic error screen.
 * Permission is never checked — the UI stays clickable and only fails, confusingly, on submit.
 */
export function WithoutSkill({ moment, viewerMode, seatsFull }: { moment: Moment | null; viewerMode: boolean; seatsFull: boolean }) {
  const [members, setMembers] = useState<Member[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [refetching, setRefetching] = useState(false)
  const [errored, setErrored] = useState(false)
  const [denied, setDenied] = useState(false)
  const joinIndex = useRef(0)

  useEffect(() => {
    const t = setTimeout(() => {
      setMembers(MEMBERS)
      setLoading(false)
    }, LOAD_MS)
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
        setErrored(true)
        setRefetching(false)
      }, REFETCH_MS)
    }
    return () => timers.forEach(clearTimeout)
  }, [moment])

  useEffect(() => {
    if (!denied) return
    const t = setTimeout(() => setDenied(false), TOAST_MS)
    return () => clearTimeout(t)
  }, [denied])

  const retry = () => {
    setRefetching(true)
    setTimeout(() => {
      setErrored(false)
      setRefetching(false)
    }, 500)
  }

  // No permission model: clicking just finds out. `viewerMode` never blocks the click itself.
  const attempt = () => {
    if (viewerMode) setDenied(true)
  }

  // Bug: `loading` is checked before the data check, so it wins even mid-refetch — the whole
  // card blanks out while good data is sitting in state, on every background update.
  if (loading || refetching) {
    return (
      <AppWindow name="Northwind" size="medium">
        <div className={`${CONTENT_H} grid place-items-center`}>
          <Loader2 className="size-6 animate-spin text-ink-3 motion-reduce:animate-none" aria-hidden />
        </div>
      </AppWindow>
    )
  }

  // Bug: one failed background refetch replaces everything, including the members that already loaded.
  if (errored) {
    return (
      <AppWindow name="Northwind" size="medium">
        <div className={`${CONTENT_H} grid place-items-center px-8 text-center`}>
          <div>
            <CircleAlert className="mx-auto size-7 text-danger" aria-hidden />
            <p className="mt-3 text-sm font-medium">Something went wrong.</p>
            <button type="button" className={`${button.secondary} mt-4`} onClick={retry}>
              Try again
            </button>
          </div>
        </div>
      </AppWindow>
    )
  }

  return (
    <AppWindow name="Northwind" size="medium">
      <div className="space-y-4">
        <MemberRows members={members ?? []} showActions onAction={attempt} />

        <div className="flex items-center gap-3">
          {/* Bug: disabled with no reason. */}
          <button type="button" disabled={seatsFull} className={button.primary} onClick={attempt}>
            Invite
          </button>
        </div>

        {denied && (
          <div role="alert" className="swap-in rounded-lg bg-danger-soft px-3.5 py-2.5 text-sm text-danger">
            Request failed (403).
          </div>
        )}
      </div>
    </AppWindow>
  )
}
