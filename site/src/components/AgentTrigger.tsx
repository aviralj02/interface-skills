import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'

/** The frontmatter description agents match against, collapsed to two lines until asked for. */
export function AgentTrigger({ description }: { description: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <div className="max-w-[68ch] border-l border-line-strong pl-4">
      <p className="text-[0.8125rem] font-medium text-ink">When your agent loads it</p>
      <p id={id} className={`mt-1 text-[0.875rem] leading-relaxed text-ink-3 ${open ? '' : 'line-clamp-2'}`}>
        {description}
      </p>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="mt-1.5 inline-flex items-center gap-1 rounded-sm text-[0.8125rem] font-medium text-ink-2 hover:text-ink"
      >
        {open ? 'Show less' : 'Show full description'}
        <ChevronDown aria-hidden size={14} strokeWidth={1.75} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}
