import { useState } from 'react'

// A stone skipping across water, drawn under the word: three arcs, each lower and shorter than
// the last, with a ripple where it touches down. Coordinates on a 200×32 board; y=26 is the water.
const ARCS = [
  { d: 'M2 26 Q 43 -22 84 26', ripple: 84 },
  { d: 'M84 26 Q 112 -2 140 26', ripple: 140 },
  { d: 'M140 26 Q 158 12 176 26', ripple: 176 },
]

/**
 * The headline's last word, which acts out its meaning: its letters skip and a stone skips beneath
 * them, once just after the photograph settles and again whenever the pointer finds the word.
 * Screen readers get the plain word.
 */
export function SkipWord({ word }: { word: string }) {
  const [round, setRound] = useState(0)
  const start = round === 0 ? 1100 : 0

  return (
    <span className="skip-word" onPointerEnter={() => setRound((n) => n + 1)}>
      <span className="sr-only">{word}</span>
      {/* Keyed by round so each hover remounts the letters and the stone and replays both. */}
      <span key={round} aria-hidden>
        {[...word].map((char, i) => (
          <span key={i} className="skip-letter" style={{ animationDelay: `${start + i * 55}ms` }}>
            {char}
          </span>
        ))}
        <svg viewBox="0 0 200 32" preserveAspectRatio="none" className="skip-stone">
          {ARCS.map((arc, i) => {
            const delay = start + 420 + [0, 520, 860][i]
            return (
              <g key={arc.d}>
                <path d={arc.d} pathLength={1} className="skip-arc" style={{ animationDelay: `${delay}ms` }} />
                <ellipse cx={arc.ripple} cy="27" rx="9" ry="1.8" className="skip-ripple" style={{ animationDelay: `${delay + [480, 320, 220][i]}ms` }} />
              </g>
            )
          })}
        </svg>
      </span>
    </span>
  )
}
