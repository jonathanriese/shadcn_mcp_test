import { useState } from "react"
import { Play, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TaskCard, type Task } from "@/components/TaskCard"

const INITIAL_TASKS: Task[] = [
  { id: "1", label: "Test", done: false },
  { id: "2", label: "Test 2", done: true },
]

export default function TimerPage() {
  const [time, setTime] = useState("25")
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [newTaskId, setNewTaskId] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const selectedTask = tasks.find((t) => t.id === selectedTaskId) ?? null

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        if (!t.done && selectedTaskId === id) setSelectedTaskId(null)
        return { ...t, done: !t.done }
      })
    )
  }

  function renameTask(id: string, label: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, label } : t)))
    if (id === newTaskId) setNewTaskId(null)
  }

  function deleteTask(id: string) {
    if (selectedTaskId === id) setSelectedTaskId(null)
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function addTask() {
    const newTask: Task = {
      id: String(Date.now()),
      label: "New task",
      done: false,
    }
    setTasks((prev) => [...prev, newTask])
    setNewTaskId(newTask.id)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    const id = e.dataTransfer.getData("taskId")
    if (id) setSelectedTaskId(id)
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-start justify-center p-8">
      <div className="w-full max-w-sm flex flex-col gap-10">

        {/* Timer area */}
        <div className="flex flex-col gap-4">

          {/* Time field */}
          <div className="flex items-center gap-4">
            <Label className="text-[var(--foreground)] text-base font-normal w-10 shrink-0">
              Time
            </Label>
            <div className="relative flex-1">
              <Input
                type="number"
                min={1}
                max={120}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)] pr-20"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted-foreground)] pointer-events-none">
                minutes
              </span>
            </div>
          </div>

          {/* Task drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`flex items-center gap-2 px-3 py-2 rounded-[var(--rounded-lg,8px)] border text-sm transition-colors ${selectedTask ? "justify-between" : "justify-center"}
              ${isDragOver
                ? "border-[var(--ring)] bg-[var(--accent)] text-[var(--accent-foreground)]"
                : selectedTask
                  ? "border-[var(--border)] bg-[var(--input)] text-[var(--foreground)]"
                  : "border-dashed border-[var(--border)] bg-transparent text-[var(--muted-foreground)]"
              }`}
          >
            <span className="truncate leading-6">
              {selectedTask ? selectedTask.label : "Drag a task here"}
            </span>
            {selectedTask && (
              <button
                onClick={() => setSelectedTaskId(null)}
                className="shrink-0 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Start button */}
          <Button className="w-fit">
            <Play className="h-4 w-4" />
            Start timer
          </Button>
        </div>

        {/* Task list area */}
        <div className="flex flex-col gap-4">
          <p className="text-[var(--foreground)] text-base font-normal">
            My tasks for today
          </p>

          <div className="flex flex-col gap-3">
            {[...tasks].sort((a, b) => Number(a.done) - Number(b.done)).map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onRename={renameTask}
                autoEdit={task.id === newTaskId}
                draggable={!task.done}
                selected={task.id === selectedTaskId}
              />
            ))}
          </div>

          {/* Add task button */}
          <Button variant="secondary" className="w-fit" onClick={addTask}>
            <Plus className="h-4 w-4" />
            Add task
          </Button>
        </div>

      </div>
    </div>
  )
}
