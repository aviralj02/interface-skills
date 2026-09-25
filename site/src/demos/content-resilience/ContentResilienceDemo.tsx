import { useEffect, useState } from 'react'
import { DemoStage, Pane } from '../DemoStage'
import { SCENARIOS, type FixtureId, type ScenarioId } from './scenarios'
import { TriggerBar } from './TriggerBar'
import { WithoutSkill } from './WithoutSkill'
import { WithSkill } from './WithSkill'

function Session() {
  const [fixture, setFixture] = useState<FixtureId | null>(null)
  const [hugeCount, setHugeCount] = useState(false)

  const fire = (id: ScenarioId) => {
    if (id === 'hugeCount') return setHugeCount((v) => !v)
    // Radio-like: firing the active fixture again clears it back to the baseline row.
    setFixture((f) => (f === id ? null : id))
  }

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

  const active: Partial<Record<ScenarioId, boolean>> = {
    longName: fixture === 'longName',
    unbroken: fixture === 'unbroken',
    noAvatar: fixture === 'noAvatar',
    emoji: fixture === 'emoji',
    hugeCount,
  }

  return (
    <>
      <TriggerBar active={active} onFire={fire} />
      <Pane
        tone="bad"
        title="Without the skill"
        caption="Long content clips mid-sentence with the timestamp gone, a broken image icon, a mangled initial, and a count crammed into a badge built for one digit."
      >
        <WithoutSkill fixture={fixture} hugeCount={hugeCount} />
      </Pane>
      <Pane
        tone="good"
        title="With content-resilience"
        caption="Every row wraps and falls back instead of breaking. The full sentence and the exact count are one hover or Tab away."
      >
        <WithSkill fixture={fixture} hugeCount={hugeCount} />
      </Pane>
    </>
  )
}

/**
 * Before/after for the content-resilience skill. The first row is the test subject and swaps per
 * scenario; the next two never change, so you can judge the broken one against a normal scale.
 * Keys 1-4 swap the test row (long name, an unbroken string, a missing avatar, an emoji name --
 * pressing the active one again returns to the typical baseline); key 5 toggles a huge count in
 * the header badge, independent of whichever row is showing.
 */
export function ContentResilienceDemo() {
  return (
    <DemoStage heading="content-resilience: the same feed with and without a content contract">
      <Session />
    </DemoStage>
  )
}
