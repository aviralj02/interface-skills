import { useEffect, useRef, useState } from 'react'

/**
 * Tracks the natural height of an element's content so its container can animate to it.
 * Returns a ref for the content and the height to apply (undefined until measured, so
 * server-rendered markup and the first paint keep their natural height).
 */
export function useMorphHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setHeight(entry.borderBoxSize[0]?.blockSize ?? el.offsetHeight))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, height }
}
