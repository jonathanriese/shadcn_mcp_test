import { useState } from "react"
import { Play, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TaskCard, type Task } from "@/components/TaskCard"

const INITIAL_TASKS: Task[] = [
  { id: "1", label: "Test", done: false },
  { id: "2", label: "Test 2", done: true },
]

export default function TimerPage() {
  const [time, setTime] = useState("25")
  const [selectedTask, setSelectedTask] = useState("")
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [newTaskId, setNewTaskId] = useState<string | null>(null)

  const pendingTasks = tasks.filter((t) => !t.done)

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        // If we're checking off the currently selected task, clear the selection
        if (!t.done && selectedTask === id) setSelectedTask("")
        return { ...t, done: !t.done }
      })
    )
  }

  function renameTask(id: string, label: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, label } : t)))
    if (id === newTaskId) setNewTaskId(null)
  }

  function deleteTask(id: string) {
    if (selectedTask === id) setSelectedTask("")
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

          {/* Task field */}
          <div className="flex items-center gap-4">
            <Label className="text-[var(--foreground)] text-base font-normal w-10 shrink-0">
              Task
            </Label>
            <Select value={selectedTask} onValueChange={setSelectedTask}>
              <SelectTrigger className="flex-1 bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]">
                <SelectValue placeholder="Select a task" />
              </SelectTrigger>
              <SelectContent>
                {pendingTasks.length === 0 ? (
                  <SelectItem value="__empty" disabled>
                    No pending tasks
                  </SelectItem>
                ) : (
                  pendingTasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
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
