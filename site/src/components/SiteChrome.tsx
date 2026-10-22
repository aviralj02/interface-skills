import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AUTHOR, REPO_URL } from '../content/site'
import { useScrollToSkills } from '../lib/useScrollToSkills'
import { GithubMark } from './GithubMark'

/** A sun on the horizon line; on hover it rises clear of it. */
export function Logo({ size = 20 }: { size?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" width={size} height={size} className="shrink-0 overflow-visible">
      <defs>
        <clipPath id="logo-horizon">
          <rect x="0" y="0" width="32" height="20" />
        </clipPath>
      </defs>
      <circle
        cx="16"
        cy="20"
        r="9"
        clipPath="url(#logo-horizon)"
        className="fill-accent transition-transform duration-500 ease-out-expo group-hover/logo:-translate-y-[3px] motion-reduce:transition-none"
      />
      <rect x="3" y="21.5" width="26" height="2" rx="1" className="fill-ink" />
    </svg>
  )
}

function useScrolled(offset = 4) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > offset))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
    }
  }, [offset])
  return scrolled
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const scrolled = useScrolled()
  const toSkills = useScrollToSkills()
  // Over the hero photograph the header is clear and keeps dark ink in both color schemes.
  const clear = overlay && !scrolled
  return (
    <header
      className={`sticky top-0 z-20 border-b transition-[background-color,border-color] duration-300 ${
        clear
          ? 'border-transparent bg-transparent [--color-ink:#17140f] [--color-ink-2:#3d3324]'
          : `bg-paper/85 backdrop-blur-md supports-[not(backdrop-filter:blur(0))]:bg-paper ${scrolled ? 'border-line' : 'border-transparent'}`
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:rounded-md focus:border focus:border-line focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 max-w-[76rem] items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" className="group/logo flex items-center gap-2.5 rounded-md text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">
          <Logo />
          Interface Skills
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 text-[0.875rem]">
          <Link to="/#skills" onClick={toSkills} className="rounded-md px-2.5 py-1.5 text-ink-2 transition-colors hover:text-ink">
            <span className="link-draw">Skills</span>
          </Link>
          <a href={REPO_URL} className="group flex items-center gap-2 rounded-md px-2.5 py-1.5 text-ink-2 transition-colors hover:text-ink">
            <GithubMark size={15} className="transition-transform duration-300 ease-out-expo group-hover:-rotate-8 motion-reduce:transition-none" />
            <span className="link-draw max-sm:sr-only">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  )
}

const FOOTER_LINKS = [
  { href: REPO_URL, label: 'Source' },
  { href: `${REPO_URL}/blob/main/CONTRIBUTING.md`, label: 'Contribute' },
  { href: `${REPO_URL}/issues`, label: 'Issues' },
]

export function SiteFooter() {
  const year = 2026
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[76rem] flex-col gap-x-10 gap-y-4 px-5 py-8 text-[0.8125rem] text-ink-3 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <Link to="/" className="group/logo inline-flex items-center gap-2 rounded-md text-[0.875rem] font-semibold tracking-[-0.01em] text-ink">
            <Logo size={18} />
            Interface Skills
          </Link>
          <span>
            by{' '}
            <a href={AUTHOR.site} className="link-draw font-medium text-ink-2 hover:text-ink">
              {AUTHOR.name}
            </a>
          </span>
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-ink-2">
          {FOOTER_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="group inline-flex items-center gap-1 transition-colors hover:text-ink">
              <span className="link-draw">{l.label}</span>
              <ArrowUpRight
                aria-hidden
                size={12}
                strokeWidth={1.75}
                className="text-ink-3 transition-transform duration-300 ease-out-expo group-hover:translate-x-px group-hover:-translate-y-px motion-reduce:transition-none"
              />
            </a>
          ))}
        </nav>
        <p>
          © {year} · MIT licensed
        </p>
      </div>
    </footer>
  )
}
