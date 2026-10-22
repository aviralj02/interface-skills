import { useState } from 'react'

/**
 * The headline's last word, which acts out its meaning: its letters skip once just after the
 * photograph settles, and again whenever the pointer finds it. Screen readers get the plain word.
 */
export function SkipWord({ word }: { word: string }) {
  const [round, setRound] = useState(0)

  return (
    <span className="skip-word" onPointerEnter={() => setRound((n) => n + 1)}>
      <span className="sr-only">{word}</span>
      {/* Keyed by round so each hover remounts the letters and replays the hop. */}
      <span key={round} aria-hidden data-round={round}>
        {[...word].map((char, i) => (
          <span key={i} className="skip-letter" style={{ animationDelay: `${(round === 0 ? 1100 : 0) + i * 55}ms` }}>
            {char}
          </span>
        ))}
      </span>
    </span>
  )
}
