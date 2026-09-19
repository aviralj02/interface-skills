// Class strings shared by the mock apps inside demos. Kept in a .ts file (not exported next to
// components) so react-refresh keeps working, and so every demo's buttons look like the same product.
const btn =
  'inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3.5 text-sm font-medium transition-[background-color,filter,opacity] disabled:cursor-not-allowed disabled:opacity-40'

export const button = {
  primary: `${btn} bg-accent text-accent-ink hover:brightness-110`,
  secondary: `${btn} border border-line-strong bg-surface text-ink hover:bg-well`,
  danger: `${btn} bg-danger text-paper hover:brightness-110`,
  dangerOutline: `${btn} border border-danger/40 text-danger hover:bg-danger-soft`,
  ghost: `${btn} h-8 px-2.5 text-ink-2 hover:bg-well`,
  ghostDanger: `${btn} h-8 px-2.5 text-danger hover:bg-danger-soft`,
  warn: `${btn} h-8 border border-warn/40 px-3 text-warn hover:bg-surface/60`,
  toast: `${btn} h-8 bg-paper/15 px-3 text-paper hover:bg-paper/25`,
} as const

export const eyebrow = 'font-mono text-[11px] font-medium uppercase tracking-wider text-ink-3'
