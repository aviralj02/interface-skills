import { AppWindow } from '../MockApp'
import { type Variant } from './copy'
import { INVOICES } from './data'
import { EmptySurface } from './EmptySurface'
import { InvoiceList } from './InvoiceList'
import { PermissionSurface } from './PermissionSurface'
import { type Moment } from './scenarios'
import { SaveSurface } from './SaveSurface'
import { UploadSurface } from './UploadSurface'
import { ValidationSurface } from './ValidationSurface'

/**
 * One pane. Both panes render this same component; only `variant` (which copy deck to read) differs.
 * Keyed by the moment's counter so re-firing a scenario replays it from a clean state.
 */
export function InvoicesApp({ variant, moment }: { variant: Variant; moment: Moment | null }) {
  return (
    <AppWindow name="Northwind" size="compact">
      <div key={moment?.n ?? 0} className="swap-in">
        {!moment && <InvoiceList invoices={INVOICES} />}
        {moment?.id === 'save' && <SaveSurface variant={variant} />}
        {moment?.id === 'validation' && <ValidationSurface variant={variant} />}
        {moment?.id === 'empty' && <EmptySurface variant={variant} />}
        {moment?.id === 'upload' && <UploadSurface variant={variant} />}
        {moment?.id === 'permission' && <PermissionSurface variant={variant} />}
      </div>
    </AppWindow>
  )
}
