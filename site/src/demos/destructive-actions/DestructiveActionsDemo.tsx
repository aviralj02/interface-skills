import { DemoStage, Pane } from '../DemoStage'
import { WithoutSkill } from './WithoutSkill'
import { WithSkill } from './WithSkill'

/**
 * Before/after for the destructive-actions skill. Same app, same data, same delete buttons on both
 * sides: only the behavior differs. Built to be screen-recorded (press R to reset between takes).
 */
export function DestructiveActionsDemo() {
  return (
    <DemoStage heading="destructive-actions: the same app with and without the skill">
      <Pane tone="bad" title="Without the skill" caption="Confirm everything. Undo nothing. Yes is already focused.">
        <WithoutSkill />
      </Pane>
      <Pane tone="good" title="With destructive-actions" caption="Undo what you can restore. Type the name for what you can't.">
        <WithSkill />
      </Pane>
    </DemoStage>
  )
}
