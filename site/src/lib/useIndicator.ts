import { useLayoutEffect, useState, type RefObject } from 'react'

type Box = { x: number; w: number }

/**
 * Measures the active item so a single indicator can slide between items.
 * Returns null until measured; callers render a static per-item fallback until then,
 * so server-rendered HTML never shows a misplaced indicator.
 */
export function useIndicator(items: RefObject<(HTMLElement | null)[]>, active: number) {
  const [box, setBox] = useState<Box | null>(null)
  const [animate, setAnimate] = useState(false)

  useLayoutEffect(() => {
    const el = items.current?.[active]
    if (!el) return
    const measure = () => setBox({ x: el.offsetLeft, w: el.offsetWidth })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [items, active])

  // Only animate after the first measured paint, so the indicator never slides in from zero.
  useLayoutEffect(() => {
    if (!box || animate) return
    const id = requestAnimationFrame(() => setAnimate(true))
    return () => cancelAnimationFrame(id)
  }, [box, animate])

  return { box, animate }
}
