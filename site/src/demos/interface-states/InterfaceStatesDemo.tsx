import { useEffect, useState } from 'react'
import { DemoStage, Pane } from '../DemoStage'
import { SCENARIOS, type Moment, type ScenarioId } from './scenarios'
import { TriggerBar } from './TriggerBar'
import { WithoutSkill } from './WithoutSkill'
import { WithSkill } from './WithSkill'

function Session() {
  const [moment, setMoment] = useState<Moment | null>(null)
  const [viewerMode, setViewerMode] = useState(false)
  const [seatsFull, setSeatsFull] = useState(false)

  const fire = (id: ScenarioId) => {
    if (id === 'viewer') return setViewerMode((v) => !v)
    if (id === 'seats') return setSeatsFull((v) => !v)
    setMoment((m) => ({ id, n: (m?.n ?? 0) + 1 }))
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

  return (
    <>
      <TriggerBar active={{ viewer: viewerMode, seats: seatsFull }} onFire={fire} />
      <Pane
        tone="bad"
        title="Without the skill"
        caption="Loading blanks the screen, even mid-session. A failed refetch throws away good data. Permission fails silently, on click."
      >
        <WithoutSkill moment={moment} viewerMode={viewerMode} seatsFull={seatsFull} />
      </Pane>
      <Pane
        tone="good"
        title="With interface-states"
        caption="One status per region. A background refetch never hides good data, and every non-happy state says why."
      >
        <WithSkill moment={moment} viewerMode={viewerMode} seatsFull={seatsFull} />
      </Pane>
    </>
  )
}

/**
 * Before/after for the interface-states skill. Reset (R) replays the initial load itself — blank
 * card versus skeleton rows is the fastest tell, every time. Keys 1-4 fire the rest: a member
 * joining mid session, a failed background refetch, a permission change, and a seat limit — run
 * on both panes from the same trigger bar.
 */
export function InterfaceStatesDemo() {
  return (
    <DemoStage heading="interface-states: the same surface with and without a state matrix">
      <Session />
    </DemoStage>
  )
}
