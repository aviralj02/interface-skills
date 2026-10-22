/**
 * The copy glyph, drawn so it can turn into a tick: on `done` the back sheet slides away,
 * the front sheet folds down to nothing, and the tick draws itself in its place.
 * Same geometry as lucide's Copy, so it sits with the rest of the icon set.
 */
export function CopyIcon({ done, size = 16, strokeWidth = 1.75 }: { done: boolean; size?: number; strokeWidth?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-done={done}
      className="copy-icon shrink-0"
    >
      <path className="copy-icon-back" d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      <rect className="copy-icon-front" x="8" y="8" width="14" height="14" rx="2" />
      <path className="copy-icon-tick" d="M5 12.5 9.5 17 19 7" pathLength={1} strokeWidth={strokeWidth + 0.5} />
    </svg>
  )
}
