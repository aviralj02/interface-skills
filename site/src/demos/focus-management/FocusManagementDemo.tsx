import { DemoStage, Pane } from '../DemoStage'
import { eyebrow } from '../ui'
import { WithoutSkill } from './WithoutSkill'
import { WithSkill } from './WithSkill'

/**
 * Before/after for the focus-management skill. Unlike the other demos, there's no shared trigger
 * bar: focus is one thing per page, so firing an event on both panes at once would let one pane's
 * own (correct) refocusing steal the browser's actual focus from whichever pane is being watched.
 * Click Delete, Rename, or Add on ONE side, then press Tab, to see where focus goes on that side.
 */
export function FocusManagementDemo() {
  return (
    <DemoStage heading="focus-management: the same task list with and without a focus map">
      <p className={`${eyebrow} lg:col-span-2`}>Click Delete, Rename, or Add on one side, then press Tab.</p>
      <Pane
        tone="bad"
        title="Without the skill"
        caption="No focus ring to begin with. Delete a row and the next Tab starts at the top of the page. The rename box doesn't trap Tab. The update steals focus for itself."
      >
        <WithoutSkill />
      </Pane>
      <Pane
        tone="good"
        title="With focus-management"
        caption="Delete moves focus to a neighbor. Rename traps Tab and gives it back on close. The update announces itself and leaves focus alone."
      >
        <WithSkill />
      </Pane>
    </DemoStage>
  )
}
