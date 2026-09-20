import { eyebrow } from '../ui'
import { type Invoice } from './data'

const STATUS_STYLE: Record<Invoice['status'], string> = {
  Paid: 'text-ok',
  Overdue: 'text-danger',
  Draft: 'text-ink-3',
}

export function InvoiceRows({ invoices }: { invoices: Invoice[] }) {
  return (
    <ul className="overflow-hidden rounded-xl border border-line bg-surface">
      {invoices.map((inv, i) => (
        <li key={inv.id} className={`flex items-center gap-3 px-4 py-3.5 ${i === 0 ? '' : 'border-t border-line'}`}>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{inv.client}</div>
            <div className="font-mono text-xs text-ink-3">{inv.id}</div>
          </div>
          <span className="text-sm tabular-nums">{inv.amount}</span>
          <span className={`w-16 text-right text-xs font-medium ${STATUS_STYLE[inv.status]}`}>{inv.status}</span>
        </li>
      ))}
    </ul>
  )
}

/** The neutral starting screen: identical on both panes until a moment is triggered. */
export function InvoiceList({ invoices }: { invoices: Invoice[] }) {
  return (
    <section>
      <h2 className={`${eyebrow} mb-2.5`}>Invoices</h2>
      <InvoiceRows invoices={invoices} />
    </section>
  )
}
