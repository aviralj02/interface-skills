import { RotateCcw } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { button } from './ui'

/**
 * Full-viewport split screen for a before/after demo. Sits outside the site chrome so a screen
 * recording is just the two panes. Pressing R (or the button) remounts both panes to a clean state.
 */
export function DemoStage({ heading, children }: { heading: string; children: ReactNode }) {
  const [run, setRun] = useState(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'r' || e.metaKey || e.ctrlKey || e.altKey) return
      if (/^(INPUT|TEXTAREA)$/.test((e.target as HTMLElement).tagName)) return
      setRun((n) => n + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <main id="main" className="min-h-dvh bg-paper px-6 py-5 text-ink">
      <h1 className="sr-only">{heading}</h1>
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-3 flex justify-end">
          <button type="button" onClick={() => setRun((n) => n + 1)} className={`${button.ghost} text-xs text-ink-3`}>
            <RotateCcw className="size-3.5" aria-hidden />
            Reset <kbd className="font-mono">R</kbd>
          </button>
        </div>
        <div key={run} className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          {children}
        </div>
      </div>
    </main>
  )
}

export function Pane({
  tone,
  title,
  caption,
  children,
}: {
  tone: 'bad' | 'good'
  title: string
  caption: string
  children: ReactNode
}) {
  return (
    <section className="min-w-0">
      <div className="mb-3 flex items-center gap-2.5">
        <span className={`size-2.5 rounded-full ${tone === 'bad' ? 'bg-danger' : 'bg-ok'}`} aria-hidden />
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
      <p className="mt-3.5 text-sm text-ink-2">{caption}</p>
    </section>
  )
}
