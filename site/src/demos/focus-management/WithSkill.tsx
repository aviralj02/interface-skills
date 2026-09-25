import { useEffect, useRef, useState } from 'react'
import { AppWindow, ModalDialog } from '../MockApp'
import { button } from '../ui'
import { INITIAL_TASKS, TOAST_MESSAGE, type Task } from './data'
import { TaskRows } from './TaskRows'

/**
 * The same task list with a focus destination chosen for every change. Deleting a row moves focus
 * to a neighbor, never the document. The rename dialog is a real modal: focus goes to the input,
 * Tab is trapped, Escape returns focus to the Rename button that opened it. Adding a task focuses
 * the new row. A background update announces itself via role="status" and never touches focus.
 * Every button keeps the site's own visible focus ring -- nothing here turns it off.
 */
export function WithSkill() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [renaming, setRenaming] = useState<Task | null>(null)
  const [toast, setToast] = useState(false)
  const nextId = useRef(INITIAL_TASKS.length + 1)
  const renameValue = useRef('')

  const rows = useRef(new Map<string, HTMLButtonElement>())
  const pendingFocus = useRef<string | null>(null)
  useEffect(() => {
    if (!pendingFocus.current) return
    rows.current.get(pendingFocus.current)?.focus()
    pendingFocus.current = null
  })

  const deleteTask = (task: Task) => {
    setTasks((prev) => {
      const at = prev.findIndex((t) => t.id === task.id)
      const neighbour = [...prev.slice(at + 1), ...prev.slice(0, at).reverse()].find((t) => t.id !== task.id)
      pendingFocus.current = neighbour?.id ?? null
      return prev.filter((t) => t.id !== task.id)
    })
  }

  const addTask = () => {
    const id = `n${nextId.current}`
    setTasks((prev) => [...prev, { id, name: `New task ${nextId.current++}` }])
    pendingFocus.current = id
  }

  const saveRename = () => {
    setTasks((prev) => prev.map((t) => (t.id === renaming?.id ? { ...t, name: renameValue.current || t.name } : t)))
    setRenaming(null)
  }

  const dialog = renaming && (
    <ModalDialog title="Rename task" onClose={() => setRenaming(null)}>
      <label htmlFor="rename-input" className="sr-only">
        Task name
      </label>
      <input
        id="rename-input"
        data-autofocus
        defaultValue={renaming.name}
        onChange={(e) => (renameValue.current = e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && saveRename()}
        className="mt-3 h-9 w-full rounded-lg border border-line-strong bg-paper px-3 text-sm outline-none focus:border-accent"
      />
      <div className="mt-4 flex justify-end gap-2">
        <button type="button" className={button.secondary} onClick={() => setRenaming(null)}>
          Cancel
        </button>
        <button type="button" className={button.primary} onClick={saveRename}>
          Save
        </button>
      </div>
    </ModalDialog>
  )

  return (
    <AppWindow name="Northwind" size="compact" modal={dialog}>
      <TaskRows
        tasks={tasks}
        onDelete={deleteTask}
        onRename={setRenaming}
        rowRef={(id, el) => (el ? rows.current.set(id, el) : rows.current.delete(id))}
      />

      <div className="mt-4 flex gap-2">
        <button type="button" className={button.primary} onClick={addTask}>
          Add task
        </button>
        <button type="button" className={button.secondary} onClick={() => setToast(true)}>
          Simulate update
        </button>
      </div>

      {toast && (
        <div role="status" className="absolute inset-x-0 bottom-0 flex items-center gap-3 rounded-lg bg-ink px-4 py-3 text-sm text-paper shadow-xl">
          <span className="flex-1">{TOAST_MESSAGE}</span>
          <button type="button" onClick={() => setToast(false)} className={button.toast}>
            Dismiss
          </button>
        </div>
      )}
    </AppWindow>
  )
}
