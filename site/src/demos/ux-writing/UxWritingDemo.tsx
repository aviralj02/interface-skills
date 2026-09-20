import { useEffect, useState } from 'react'
import { DemoStage, Pane } from '../DemoStage'
import { InvoicesApp } from './InvoicesApp'
import { ScenarioBar } from './ScenarioBar'
import { SCENARIOS, type Moment, type Scenario } from './scenarios'

/**
 * Lives inside DemoStage's keyed grid, so the Reset button remounts it and the moment goes back to
 * "nothing has happened yet".
 */
function Session() {
  const [moment, setMoment] = useState<Moment | null>(null)
  const fire = (id: Scenario) => setMoment((m) => ({ id, n: (m?.n ?? 0) + 1 }))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (/^(INPUT|TEXTAREA)$/.test((e.target as HTMLElement).tagName)) return
      const scenario = SCENARIOS[Number(e.key) - 1]
      if (scenario) fire(scenario.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <ScenarioBar current={moment?.id} onFire={fire} />
      <Pane tone="bad" title="Without the skill" caption="Something happened. Nobody says what, or what to do about it.">
        <InvoicesApp variant="without" moment={moment} />
      </Pane>
      <Pane
        tone="good"
        title="With ux-writing"
        caption="What happened, whether your work is safe, and what to do next."
      >
        <InvoicesApp variant="with" moment={moment} />
      </Pane>
    </>
  )
}

/**
 * Before/after for the ux-writing skill. The UI is identical on both sides and one control fires the
 * same failure on both, so the only difference on screen is the words. Keys 1-5 fire, R resets.
 */
export function UxWritingDemo() {
  return (
    <DemoStage heading="ux-writing: the same five moments with default copy and with the skill">
      <Session />
    </DemoStage>
  )
}
