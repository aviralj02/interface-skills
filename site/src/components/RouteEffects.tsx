import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { SITE_URL } from '../content/site'
import { headFor } from '../head'

/**
 * On client-side navigation: update the title, scroll to the hash target or top,
 * and move focus to the new page's heading so keyboard and screen reader users
 * land at the start of the new content.
 */
export function RouteEffects() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    const head = headFor(pathname)
    document.title = head.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', head.description)
    document.querySelector('meta[name="robots"]')?.setAttribute('content', head.index ? 'index, follow' : 'noindex, follow')
    // Canonical and JSON-LD are correct for the URL the visitor actually landed on (each route is
    // its own static file); this only needs to run if a client-side nav then changes the path.
    // Not-indexed pages (404) carry no canonical at all, matching the prerendered HTML. The element
    // is recreated rather than left missing, so a later nav back to an indexed page always has one.
    let canonical = document.querySelector('link[rel="canonical"]')
    if (head.index) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', `${SITE_URL}${head.path}`)
    } else {
      canonical?.remove()
    }

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView()
        if (!first.current) {
          target.setAttribute('tabindex', '-1')
          target.focus({ preventScroll: true })
        }
      }
    } else if (!first.current) {
      window.scrollTo(0, 0)
      document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
    }
    first.current = false
  }, [pathname, hash])

  return null
}
