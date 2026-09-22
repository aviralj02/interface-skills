export type Member = { id: string; name: string; initials: string; role: 'owner' | 'admin' | 'member'; email: string }

export const MEMBERS: Member[] = [
  { id: 'ana', name: 'Ana Ruiz', initials: 'AR', role: 'owner', email: 'ana@northwind.co' },
  { id: 'sam', name: 'Sam Okafor', initials: 'SO', role: 'admin', email: 'sam@northwind.co' },
  { id: 'priya', name: 'Priya Nair', initials: 'PN', role: 'member', email: 'priya@northwind.co' },
  { id: 'leo', name: 'Leo Chen', initials: 'LC', role: 'member', email: 'leo@northwind.co' },
]

/** Cycled through as the "Member joins" scenario fires more than once in a session. */
export const JOINERS: Member[] = [
  { id: 'jordan', name: 'Jordan Lee', initials: 'JL', role: 'member', email: 'jordan@northwind.co' },
  { id: 'mia', name: 'Mia Torres', initials: 'MT', role: 'member', email: 'mia@northwind.co' },
  { id: 'owen', name: 'Owen Diaz', initials: 'OD', role: 'member', email: 'owen@northwind.co' },
]

export const LOAD_MS = 650
export const REFETCH_MS = 900
export const TOAST_MS = 2600

/** Both panes render at AppWindow size="medium" (620px); this centers a full-card placeholder inside it. */
export const CONTENT_H = 'h-[520px]'
