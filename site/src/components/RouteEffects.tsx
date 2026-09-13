import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
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
    document.title = headFor(pathname).title

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
