import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Heading } from '../content/skills'

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-72px 0px -65% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])
  return active
}

function Links({ headings, active }: { headings: Heading[]; active?: string }) {
  return (
    <ul className="flex flex-col">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            aria-current={active === h.id ? 'location' : undefined}
            className={`-ml-px block border-l py-1.5 pl-3.5 text-[0.875rem] leading-snug transition-colors ${
              active === h.id ? 'border-ink font-medium text-ink' : 'border-transparent text-ink-3 hover:text-ink-2'
            }`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Toc({ headings }: { headings: Heading[] }) {
  const top = headings.filter((h) => h.depth === 2)
  const active = useActiveHeading(top.map((h) => h.id))
  return (
    <>
      <nav aria-label="On this page" className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto lg:block">
        <p className="mb-2 text-[0.8125rem] font-semibold text-ink">On this page</p>
        <div className="border-l border-line">
          <Links headings={top} active={active} />
        </div>
      </nav>
      <details className="group rounded-xl border border-line bg-surface lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-[0.875rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
          On this page
          <ChevronDown aria-hidden size={16} className="text-ink-3 transition-transform group-open:rotate-180" />
        </summary>
        <nav aria-label="On this page" className="border-t border-line px-4 py-2">
          <div className="border-l border-line">
            <Links headings={top} />
          </div>
        </nav>
      </details>
    </>
  )
}
