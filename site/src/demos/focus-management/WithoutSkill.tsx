import { useEffect, useRef, useState } from 'react'
import { AppWindow } from '../MockApp'
import { button } from '../ui'
import { INITIAL_TASKS, TOAST_MESSAGE, type Task } from './data'
import { TaskRows } from './TaskRows'

const NO_RING = 'focus-visible:outline-none'

/**
 * What an agent writes by default: focus destinations are never chosen, so whatever the browser
 * does by default happens instead. Deleting a row removes the focused Delete button; focus falls
 * to the document and the next Tab starts back at the top of the page. The rename box is a styled
 * `div` with no trap, so Tab walks straight past it into the rest of the list. A background update
 * autofocuses its own Dismiss button, pulling focus away from whatever the user was doing. And
 * none of it would be visible anyway -- every focus ring here is switched off with no replacement.
 */
export function WithoutSkill() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [renaming, setRenaming] = useState<Task | null>(null)
  const [toast, setToast] = useState(false)
  const nextId = useRef(INITIAL_TASKS.length + 1)
  const toastRef = useRef<HTMLButtonElement>(null)
  const renameValue = useRef('')

  const deleteTask = (task: Task) => setTasks((prev) => prev.filter((t) => t.id !== task.id))
  const addTask = () => setTasks((prev) => [...prev, { id: `n${nextId.current}`, name: `New task ${nextId.current++}` }])
  const saveRename = () => {
    setTasks((prev) => prev.map((t) => (t.id === renaming?.id ? { ...t, name: renameValue.current || t.name } : t)))
    setRenaming(null)
  }

  // Bug: the toast grabs focus the instant it exists, whether the user asked for it or not.
  useEffect(() => {
    if (toast) toastRef.current?.focus()
  }, [toast])

  return (
    <AppWindow name="Northwind" size="compact">
      <TaskRows tasks={tasks} noRing onDelete={deleteTask} onRename={setRenaming} />

      <div className="mt-4 flex gap-2">
        <button type="button" className={`${button.primary} ${NO_RING}`} onClick={addTask}>
          Add task
        </button>
        <button type="button" className={`${button.secondary} ${NO_RING}`} onClick={() => setToast(true)}>
          Simulate update
        </button>
      </div>

      {renaming && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-ink/35 p-5 backdrop-blur-[2px]">
          <div className="w-full max-w-[320px] rounded-xl border border-line bg-surface p-5 shadow-2xl">
            <h3 className="text-base font-semibold">Rename task</h3>
            <input
              defaultValue={renaming.name}
              onChange={(e) => (renameValue.current = e.target.value)}
              className={`mt-3 h-9 w-full rounded-lg border border-line-strong bg-paper px-3 text-sm outline-none ${NO_RING}`}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" className={`${button.secondary} ${NO_RING}`} onClick={() => setRenaming(null)}>
                Cancel
              </button>
              <button type="button" className={`${button.primary} ${NO_RING}`} onClick={saveRename}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div role="status" className="absolute inset-x-0 bottom-0 flex items-center gap-3 rounded-lg bg-ink px-4 py-3 text-sm text-paper shadow-xl">
          <span className="flex-1">{TOAST_MESSAGE}</span>
          <button ref={toastRef} type="button" onClick={() => setToast(false)} className={`${button.toast} ${NO_RING}`}>
            Dismiss
          </button>
        </div>
      )}
    </AppWindow>
  )
}
