import { useEffect, useRef, type ReactNode } from 'react'

// Photograph: "Golden sunrise illuminates a foggy mountain landscape" by Zetong Li,
// https://unsplash.com/photos/MaeshPdBGV4, Unsplash License. Files live in public/hero/.
const DAWN = {
  webp: '/hero/dawn-640.webp 640w, /hero/dawn-1280.webp 1280w, /hero/dawn-2400.webp 2400w',
  jpg: '/hero/dawn-1280.jpg 1280w, /hero/dawn-2400.jpg 2400w',
  fallback: '/hero/dawn-1280.jpg',
}

/** Writes --sy (scroll, px) and --mx / --my (pointer, -1..1, eased) on the hero while it is on screen. */
function useParallax(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let visible = true
    let frame = 0
    const target = { x: 0, y: 0 }
    const eased = { x: 0, y: 0 }

    const tick = () => {
      frame = 0
      eased.x += (target.x - eased.x) * 0.06
      eased.y += (target.y - eased.y) * 0.06
      el.style.setProperty('--sy', String(Math.min(window.scrollY, el.offsetHeight)))
      el.style.setProperty('--mx', eased.x.toFixed(4))
      el.style.setProperty('--my', eased.y.toFixed(4))
      if (Math.abs(target.x - eased.x) > 0.001 || Math.abs(target.y - eased.y) > 0.001) schedule()
    }
    const schedule = () => {
      if (!frame && visible) frame = requestAnimationFrame(tick)
    }
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = (e.clientY / window.innerHeight) * 2 - 1
      schedule()
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      schedule()
    })
    io.observe(el)
    window.addEventListener('scroll', schedule, { passive: true })
    if (window.matchMedia('(pointer: fine)').matches) window.addEventListener('pointermove', onPointer, { passive: true })
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [ref])
}

export function DawnHero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  useParallax(ref)

  return (
    <section ref={ref} className="dawn relative isolate flex min-h-[max(38rem,100svh)] flex-col overflow-hidden bg-[#e9c79d] [--mx:0] [--my:0] [--sy:0]">
      <div
        aria-hidden
        className="absolute -inset-[4%] will-change-transform"
        style={{ transform: 'translate3d(calc(var(--mx) * -14px), calc(var(--sy) * 0.32px + var(--my) * -8px), 0)' }}
      >
        <picture>
          <source type="image/webp" srcSet={DAWN.webp} sizes="108vw" />
          <img
            src={DAWN.fallback}
            srcSet={DAWN.jpg}
            sizes="108vw"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="dawn-photo h-full w-full object-cover object-[50%_62%]"
          />
        </picture>
      </div>
      {/* Lifts the sky a touch behind the type, and lets the fog at the foot of the frame fade into the page ground. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_42%_at_50%_34%,rgb(255_247_236/0.55),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-paper/45 to-paper" />

      <div className="relative z-10 flex flex-1 flex-col" style={{ transform: 'translate3d(0, calc(var(--sy) * 0.18px), 0)', opacity: 'calc(1 - var(--sy) / 760)' }}>
        {children}
      </div>
    </section>
  )
}
