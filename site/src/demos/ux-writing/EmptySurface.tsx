import { Search, SearchX } from 'lucide-react'
import { useId, useState } from 'react'
import { button, eyebrow, field } from '../ui'
import { COPY, type Variant } from './copy'
import { INVOICES } from './data'
import { InvoiceRows } from './InvoiceList'

/**
 * Empty by reason. The search and the Paid filter are live, so the result is real: with filters on,
 * "create your first invoice" is wrong, and the useful message echoes the criteria and offers a way out.
 */
export function EmptySurface({ variant }: { variant: Variant }) {
  const [query, setQuery] = useState('globex')
  const [paid, setPaid] = useState(true)
  const searchId = useId()
  const copy = COPY.empty[variant]

  const results = INVOICES.filter(
    (i) => (!paid || i.status === 'Paid') && i.client.toLowerCase().includes(query.trim().toLowerCase()),
  )
  const clear = () => {
    setQuery('')
    setPaid(false)
  }

  return (
    <section>
      <h2 className={`${eyebrow} mb-2.5`}>Invoices</h2>
      <div className="mb-3 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-3" aria-hidden />
          <label htmlFor={searchId} className="sr-only">
            Search invoices
          </label>
          <input id={searchId} value={query} onChange={(e) => setQuery(e.target.value)} className={`${field} pl-9`} />
        </div>
        <button
          type="button"
          aria-pressed={paid}
          onClick={() => setPaid((p) => !p)}
          className={`${button.secondary} aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:text-accent`}
        >
          Paid
        </button>
      </div>

      {results.length > 0 ? (
        <InvoiceRows invoices={results} />
      ) : (
        <div className="swap-in grid place-items-center rounded-xl border border-dashed border-line-strong px-6 py-12 text-center">
          <div>
            <SearchX className="mx-auto size-7 text-ink-3" aria-hidden />
            <p className="mt-3 text-sm font-medium">{copy.title(query.trim(), paid)}</p>
            {copy.body && <p className="mt-1 text-sm text-ink-3">{copy.body}</p>}
            <button type="button" className={`${variant === 'with' ? button.secondary : button.primary} mt-4`} onClick={variant === 'with' ? clear : undefined}>
              {copy.action}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
