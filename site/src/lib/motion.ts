const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Call-time read. Use this inside event handlers, timers and animation
 * callbacks, where a value captured at render could be stale, and in any
 * non-component function, where a hook is not allowed.
 *
 * SSR-safe: returns `false` (animate) when there is no window, which matches
 * the pre-hydration render.
 */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && (window.matchMedia?.(QUERY).matches ?? false)
}
