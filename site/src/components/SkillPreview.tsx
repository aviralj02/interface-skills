import { ChevronDown } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState, type FocusEvent, type ReactNode } from 'react'
import { prefersReducedMotion } from '../lib/motion'

/**
 * Shows the opening of a long SKILL.md under a soft fade, with a control to read the rest, so a
 * skill page doesn't run on for screens. It opens on its own whenever something needs content
 * past the fold: a table-of-contents link, a #heading in the URL, or keyboard focus.
 * Without JavaScript, and in print, the whole skill shows (see .skill-preview in index.css).
 */
export function SkillPreview({ lines, children }: { lines: number; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const id = useId()

  const reveal = useCallback((target?: HTMLElement | null) => {
    setOpen(true)
    // Scroll after the expanded layout has been painted, so the target is where it will stay.
    if (target)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })),
      )
  }, [])

  useEffect(() => {
    const el = box.current
    if (!el || open) return
    const inside = (hash: string) => {
      const target = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
      return target && el.contains(target) ? target : null
    }
    // A deep link to a section opens the skill there.
    const fromUrl = inside(window.location.hash)
    if (fromUrl) reveal(fromUrl)
    // In-page links (the table of contents) open it before jumping, including a repeat click on the current hash.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]')
      const target = link && inside(link.getAttribute('href') ?? '')
      if (!target) return
      e.preventDefault()
      history.pushState(history.state, '', link.getAttribute('href'))
      reveal(target)
    }
    const onHash = () => reveal(inside(window.location.hash))
    document.addEventListener('click', onClick, true)
    window.addEventListener('hashchange', onHash)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('hashchange', onHash)
    }
  }, [open, reveal])

  // Keyboard users tabbing into a code block's copy button below the fold get the full skill, not a hidden control.
  function onFocus(e: FocusEvent<HTMLDivElement>) {
    if (open || !box.current) return
    const fold = box.current.getBoundingClientRect().bottom
    if (e.target.getBoundingClientRect().bottom > fold) reveal()
  }

  return (
    <div className="skill-preview relative" data-open={open}>
      <div ref={box} id={id} className="skill-preview-body" onFocus={onFocus}>
        {children}
      </div>
      <div aria-hidden={open} className="skill-preview-more">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          tabIndex={open ? -1 : 0}
          onClick={() => reveal()}
          className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-2.5 pr-4 pl-5 text-[0.9375rem] font-medium text-ink shadow-[0_1px_2px_rgb(0_0_0/0.04),0_10px_28px_-14px_rgb(40_28_10/0.35)] transition-[border-color,box-shadow,translate] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_1px_2px_rgb(0_0_0/0.04),0_16px_34px_-14px_rgb(40_28_10/0.45)] motion-reduce:hover:translate-y-0"
        >
          Read the full skill
          <span className="text-ink-3 [font-variant-numeric:tabular-nums]">{lines} lines</span>
          <ChevronDown
            aria-hidden
            size={16}
            strokeWidth={1.75}
            className="text-ink-3 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5 motion-reduce:transition-none"
          />
        </button>
      </div>
    </div>
  )
}
