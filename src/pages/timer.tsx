import { useState, useEffect } from "react"
import { Play, Pause, Plus, RotateCcw, X, ChevronsRight, Settings } from "lucide-react"
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

type TimerState = "idle" | "running" | "paused"

const INITIAL_TASKS: Task[] = [
  { id: "1", label: "Test", done: false },
  { id: "2", label: "Test 2", done: true },
]

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

export default function TimerPage() {
  const [time, setTime] = useState("25")
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [newTaskId, setNewTaskId] = useState<string | null>(null)

  const [timerState, setTimerState] = useState<TimerState>("idle")
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [initialSeconds, setInitialSeconds] = useState(0)

  const selectedTask = tasks.find((t) => t.id === selectedTaskId) ?? null
  const incompleteTasks = tasks.filter((t) => !t.done)

  useEffect(() => {
    if (timerState !== "running") return
    const id = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setTimerState("idle")
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [timerState])

  function startTimer() {
    const minutes = Math.max(1, parseInt(time) || 1)
    const secs = minutes * 60
    setInitialSeconds(secs)
    setRemainingSeconds(secs)
    setTimerState("running")
  }

  function revertTimer() {
    setRemainingSeconds(initialSeconds)
  }

  function cancelTimer() {
    setTimerState("idle")
    setRemainingSeconds(0)
  }

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

  const sortedTasks = [...tasks].sort((a, b) => Number(a.done) - Number(b.done))

  return (
    <div className="min-h-screen bg-neutral-950 flex items-start justify-center p-8">
      <div className="w-full max-w-sm bg-black rounded-[12px] p-6 flex flex-col gap-10 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between h-10">
          <span className="text-white text-[18px] font-semibold leading-normal whitespace-nowrap">
            Focusly
          </span>
          <button className="text-white text-[20px] leading-none hover:opacity-70 transition-opacity">
            <Settings className="h-5 w-5" />
          </button>
        </div>

        {/* ── IDLE VIEW ── */}
        {timerState === "idle" && (
          <div className="flex flex-col gap-4">

            {/* Time field */}
            <div className="flex items-center gap-4">
              <Label className="text-[#fafafa] text-base font-normal w-10 shrink-0 leading-6">
                Time
              </Label>
              <div className="relative flex-1">
                <Input
                  type="number"
                  min={1}
                  max={120}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-white/5 border-[#404040] text-[#fafafa] h-9 text-sm rounded-lg pr-20 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus-visible:ring-[#525252]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#e0e0e0] pointer-events-none leading-5">
                  minutes
                </span>
              </div>
            </div>

            {/* Task field */}
            <div className="flex items-center gap-4">
              <Label className="text-[#fafafa] text-base font-normal w-10 shrink-0 leading-6">
                Task
              </Label>
              <Select
                value={selectedTaskId ?? "none"}
                onValueChange={(v) => setSelectedTaskId(v === "none" ? null : v)}
              >
                <SelectTrigger className="flex-1 bg-white/5 border-[#404040] text-[#fafafa] h-9 text-sm rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:ring-[#525252] data-[placeholder]:text-[#737373]">
                  <SelectValue placeholder="Select a task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">
                    <span className="text-muted-foreground">No task</span>
                  </SelectItem>
                  {incompleteTasks.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.label}
                    </SelectItem>
                  ))}
                  {incompleteTasks.length === 0 && (
                    <div className="py-1.5 px-2 text-sm text-muted-foreground">
                      No incomplete tasks
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Start button */}
            <Button className="w-fit" onClick={startTimer}>
              <Play className="h-4 w-4" />
              Start timer
            </Button>
          </div>
        )}

        {/* ── RUNNING / PAUSED VIEW ── */}
        {timerState !== "idle" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#d4d4d4]">
              <ChevronsRight className="h-5 w-5 shrink-0" />
              <span className="text-base leading-6 truncate">
                {selectedTask?.label ?? "No task selected"}
              </span>
            </div>
            <p className="text-[64px] leading-none text-white font-normal tracking-[0px]">
              {formatTime(remainingSeconds)}
            </p>
            <div className="flex items-center gap-2">
              {timerState === "running" ? (
                <Button onClick={() => setTimerState("paused")}>
                  <Pause className="h-4 w-4" />
                  Pause
                </Button>
              ) : (
                <Button onClick={() => setTimerState("running")}>
                  <Play className="h-4 w-4" />
                  Resume
                </Button>
              )}
              <Button variant="secondary" size="icon" onClick={revertTimer}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={cancelTimer}
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ── TASK LIST ── */}
        <div className="flex flex-col gap-4">
          <p className="text-[#fafafa] text-base font-normal leading-6">My tasks for today</p>
          <div className="flex flex-col gap-3">
            {sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onRename={renameTask}
                autoEdit={task.id === newTaskId}
                draggable={false}
                selected={task.id === selectedTaskId}
              />
            ))}
          </div>
          <Button variant="secondary" className="w-fit" onClick={addTask}>
            <Plus className="h-4 w-4" />
            Add task
          </Button>
        </div>

      </div>
    </div>
  )
}
