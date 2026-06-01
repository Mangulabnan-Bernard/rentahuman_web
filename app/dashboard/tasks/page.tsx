'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import DashboardSidebar from '../../components/DashboardSidebar'
import Tabs from '../../components/Tabs'
import { Briefcase, Clock, DollarSign, Loader2 } from 'lucide-react'

interface TaskDTO {
  id: number
  title: string
  description: string
  category: string
  budget: number
  deadline: string | null
  location: string | null
  status: 'open' | 'in_progress' | 'completed' | 'disputed'
  urgency: 'low' | 'medium' | 'high'
  skills: string[]
  progress: number
  applicants: number
}

const STATUS_BADGE: Record<TaskDTO['status'], string> = {
  open: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  disputed: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
}

function TaskItem({ task }: { task: TaskDTO }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{task.title}</h3>
          <p className="text-sm text-muted-foreground">{task.category}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded ${STATUS_BADGE[task.status]}`}>
          {task.status.replace('_', ' ')}
        </span>
      </div>

      <p className="text-muted-foreground mb-4">{task.description}</p>

      {task.status === 'in_progress' && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${task.progress}%` }} />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />${task.budget}
        </span>
        {task.deadline && (
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {task.deadline}
          </span>
        )}
        {task.skills.length > 0 && (
          <span className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            {task.skills.join(', ')}
          </span>
        )}
      </div>
    </div>
  )
}

function TaskList({ tasks, empty }: { tasks: TaskDTO[]; empty: string }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 bg-card border border-border rounded-lg">
        <Briefcase className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground mb-4">{empty}</p>
        <Link
          href="/submit-task"
          className="inline-flex bg-primary text-primary-foreground px-5 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          Post a task
        </Link>
      </div>
    )
  }
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskDTO[] | null>(null)

  useEffect(() => {
    let active = true
    fetch('/api/tasks?scope=mine')
      .then((r) => r.json())
      .then((data) => {
        if (active) setTasks(data.success ? data.data : [])
      })
      .catch(() => {
        if (active) setTasks([])
      })
    return () => {
      active = false
    }
  }, [])

  const byStatus = (status: TaskDTO['status']) => (tasks ?? []).filter((t) => t.status === status)

  const tabs = [
    { id: 'open', label: `Open (${byStatus('open').length})`, content: <TaskList tasks={byStatus('open')} empty="You have no open tasks yet." /> },
    {
      id: 'in_progress',
      label: `In Progress (${byStatus('in_progress').length})`,
      content: <TaskList tasks={byStatus('in_progress')} empty="No tasks are in progress." />,
    },
    {
      id: 'completed',
      label: `Completed (${byStatus('completed').length})`,
      content: <TaskList tasks={byStatus('completed')} empty="No completed tasks yet." />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My Tasks</h1>
              <p className="text-muted-foreground">Manage your open, in-progress, and completed tasks.</p>
            </div>
            <Link
              href="/submit-task"
              className="hidden sm:inline-flex bg-primary text-primary-foreground px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              Post a task
            </Link>
          </div>

          {tasks === null ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Loading tasks…
            </div>
          ) : (
            <Tabs tabs={tabs} defaultTab="open" />
          )}
        </main>
      </div>
    </div>
  )
}
