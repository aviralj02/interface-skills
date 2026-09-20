export type Variant = 'without' | 'with'

/**
 * The copy deck: every string either pane shows, keyed by moment. The components are identical on
 * both sides, so reading this file top to bottom is the whole before/after.
 */
type Copy = {
  save: Record<Variant, { message: string; action: string }>
  validation: Record<Variant, { message: string; button: string; sent: (email: string) => string }>
  empty: Record<Variant, { title: (query: string, paid: boolean) => string; body?: string; action: string }>
  upload: Record<Variant, { message: string; files?: string[]; hint?: string; action: string }>
  permission: Record<Variant, { note?: string }>
}

export const COPY: Copy = {
  save: {
    without: { message: 'Oops! Something went wrong.', action: 'OK' },
    with: {
      message: "Couldn't save because you're offline. Your changes are kept on this device and will sync when you reconnect.",
      action: 'Retry',
    },
  },
  validation: {
    without: { message: 'Invalid input', button: 'Submit', sent: () => 'Success!' },
    with: {
      message: 'Enter an email address like name@example.com',
      button: 'Send invoice',
      sent: (email) => `Invoice sent to ${email}`,
    },
  },
  empty: {
    without: {
      title: () => 'No invoices yet',
      body: 'Create your first invoice to get started!',
      action: 'New invoice',
    },
    with: {
      title: (query, paid) => {
        if (query && paid) return `No invoices match “${query}” in Paid.`
        if (query) return `No invoices match “${query}”.`
        return 'No paid invoices.'
      },
      action: 'Clear filters',
    },
  },
  upload: {
    without: { message: 'Upload failed (413)', action: 'Retry' },
    with: {
      message: '18 of 20 files uploaded. 2 were too large.',
      files: ['site-video.mp4 · 88 MB', 'raw-export.psd · 31 MB'],
      hint: 'Files must be 25 MB or smaller.',
      action: 'Choose smaller files',
    },
  },
  permission: {
    without: {},
    with: { note: 'Only admins can change billing. Ask Priya (owner) for access.' },
  },
}
