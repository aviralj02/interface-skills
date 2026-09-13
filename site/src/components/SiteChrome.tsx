import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AUTHOR, REPO_URL } from '../content/site'
import { GithubMark } from './GithubMark'

/** Two of the four tiles are faded "gaps"; hovering the mark fills them in. */
export function Logo({ size = 20 }: { size?: number }) {
  const gap = 'fill-ink opacity-30 transition-opacity duration-300 ease-out-expo group-hover/logo:opacity-100 motion-reduce:transition-none'
  return (
    <svg aria-hidden viewBox="0 0 32 32" width={size} height={size} className="shrink-0">
      <rect x="3" y="3" width="11" height="11" rx="2.5" className="fill-ink" />
      <rect x="18" y="3" width="11" height="11" rx="2.5" className={gap} />
      <rect x="3" y="18" width="11" height="11" rx="2.5" className={`${gap} group-hover/logo:delay-75`} />
      <rect x="18" y="18" width="11" height="11" rx="2.5" className="fill-accent" />
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

export function SiteHeader() {
  const scrolled = useScrolled()
  return (
    <header
      className={`sticky top-0 z-20 border-b bg-paper/85 backdrop-blur-md transition-colors duration-300 supports-[not(backdrop-filter:blur(0))]:bg-paper ${
        scrolled ? 'border-line' : 'border-transparent'
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
          <Link to="/#skills" className="rounded-md px-2.5 py-1.5 text-ink-2 transition-colors hover:text-ink">
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

export function SiteFooter() {
  const year = 2026
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link to="/" className="group/logo inline-flex items-center gap-2.5 rounded-md text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">
              <Logo />
              Interface Skills
            </Link>
            <p className="mt-2 max-w-[34ch] text-[0.875rem] leading-relaxed text-ink-3">
              Agent skills for how interfaces behave, past the happy path.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-[0.875rem] text-ink-2">
            {[
              { href: REPO_URL, label: 'Source' },
              { href: `${REPO_URL}/blob/main/CONTRIBUTING.md`, label: 'Contribute' },
              { href: `${REPO_URL}/issues`, label: 'Report an issue' },
            ].map((l) => (
              <a key={l.label} href={l.href} className="group inline-flex items-center gap-1 transition-colors hover:text-ink">
                <span className="link-draw">{l.label}</span>
                <ArrowUpRight
                  aria-hidden
                  size={13}
                  strokeWidth={1.75}
                  className="text-ink-3 transition-transform duration-300 ease-out-expo group-hover:translate-x-px group-hover:-translate-y-px motion-reduce:transition-none"
                />
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-line py-6 text-[0.8125rem] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Designed and engineered by{' '}
            <a href={AUTHOR.site} className="link-draw font-medium text-ink-2 hover:text-ink">
              {AUTHOR.name}
            </a>
            <span aria-hidden className="mx-2 text-line-strong">
              /
            </span>
            <a href={AUTHOR.url} className="link-draw hover:text-ink-2">
              @aviralj02
            </a>
          </p>
          <p>
            Set in Schibsted Grotesk and JetBrains Mono. © {year}, MIT licensed.
          </p>
        </div>
      </div>
    </footer>
  )
}
