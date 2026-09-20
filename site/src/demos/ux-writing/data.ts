export type Invoice = { id: string; client: string; amount: string; status: 'Paid' | 'Overdue' | 'Draft' }

export const INVOICES: Invoice[] = [
  { id: 'INV-1042', client: 'Acme Corp', amount: '$4,200', status: 'Paid' },
  { id: 'INV-1041', client: 'Globex', amount: '$1,850', status: 'Overdue' },
  { id: 'INV-1040', client: 'Initech', amount: '$960', status: 'Draft' },
]
