import { useEffect, useState } from 'react'
import { UNDO_MS } from './data'

const TICK_MS = 100

/**
 * The undo window behind an undo toast: deletions inside it are batched (a new one restarts the
 * clock instead of dropping the earlier undo), and the countdown holds while the toast is hovered
 * or focused, so it can't vanish under someone who is reaching for it.
 */
export function useUndoWindow(durationMs = UNDO_MS) {
  const [state, setState] = useState<{ ids: string[]; remaining: number }>({ ids: [], remaining: 0 })
  const [held, setHeld] = useState(false)
  const active = state.ids.length > 0

  useEffect(() => {
    if (!active || held) return
    const timer = setInterval(() => {
      setState((s) => (s.remaining - TICK_MS <= 0 ? { ids: [], remaining: 0 } : { ...s, remaining: s.remaining - TICK_MS }))
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [active, held])

  return {
    ids: state.ids,
    /** 0 to 1, for the progress bar. */
    progress: state.remaining / durationMs,
    tickMs: TICK_MS,
    /** Start (or extend) the window with one more deleted item. */
    open: (id: string) => {
      setHeld(false)
      setState((s) => ({ ids: [...s.ids, id], remaining: durationMs }))
    },
    /** Close the window, whether by undo or by dismissal. */
    close: () => {
      setHeld(false)
      setState({ ids: [], remaining: 0 })
    },
    hold: setHeld,
  }
}
