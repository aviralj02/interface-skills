import type { MouseEvent } from 'react'
import { useLocation } from 'react-router'

/** On the home page, glide to the skills index instead of jumping (and still work when the hash is already set). */
export function useScrollToSkills() {
  const { pathname } = useLocation()
  return (e: MouseEvent) => {
    if (pathname !== '/') return
    const target = document.getElementById('skills')
    if (!target) return
    e.preventDefault()
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
    history.replaceState(history.state, '', '/#skills')
  }
}
