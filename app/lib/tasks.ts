/**
 * Server-only task store. Backed by Prisma/MySQL when DATABASE_URL is set,
 * otherwise an in-memory list so the demo runs without a database.
 */
import { getPrisma } from './prisma'

export type TaskStatus = 'open' | 'in_progress' | 'completed' | 'disputed'
export type TaskUrgency = 'low' | 'medium' | 'high'

export interface TaskDTO {
  id: number
  title: string
  description: string
  category: string
  budget: number
  deadline: string | null
  location: string | null
  status: TaskStatus
  urgency: TaskUrgency
  skills: string[]
  progress: number
  applicants: number
  postedById: number | null
  assignedAgentId: number | null
  createdAt: string
}

export interface CreateTaskInput {
  postedById: number
  title: string
  description: string
  category: string
  budget: number
  deadline?: string | null
  location?: string | null
  skills?: string[]
  urgency?: TaskUrgency
}

// Prisma row -> serializable DTO (Decimal -> number, Json -> string[], dates -> ISO).
function toTaskDTO(row: {
  id: number
  title: string
  description: string
  category: string
  budget: unknown
  deadline: Date | null
  location: string | null
  status: string
  urgency: string
  skills: unknown
  progress: number
  applicants: number
  postedById: number | null
  assignedAgentId: number | null
  createdAt: Date
}): TaskDTO {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    budget: Number(row.budget),
    deadline: row.deadline ? new Date(row.deadline).toISOString().split('T')[0] : null,
    location: row.location ?? null,
    status: row.status as TaskStatus,
    urgency: row.urgency as TaskUrgency,
    skills: Array.isArray(row.skills) ? (row.skills as string[]) : [],
    progress: row.progress,
    applicants: row.applicants,
    postedById: row.postedById ?? null,
    assignedAgentId: row.assignedAgentId ?? null,
    createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : '',
  }
}

// ---- in-memory fallback ----
let memTaskSeq = 9000
const memTasks: TaskDTO[] = [
  {
    id: 9001,
    title: 'AI Model Training Data Validation',
    description: 'Review and validate training data for a new language model.',
    category: 'Data Validation',
    budget: 500,
    deadline: '2026-07-15',
    location: 'Remote',
    status: 'open',
    urgency: 'high',
    skills: ['Data Annotation', 'Quality Assurance'],
    progress: 0,
    applicants: 4,
    postedById: 1,
    assignedAgentId: null,
    createdAt: '2026-06-01T00:00:00.000Z',
  },
]

export async function listOpenTasks(): Promise<TaskDTO[]> {
  const prisma = getPrisma()
  if (prisma) {
    const rows = await prisma.task.findMany({ where: { status: 'open' }, orderBy: { createdAt: 'desc' } })
    return rows.map(toTaskDTO)
  }
  return memTasks.filter((t) => t.status === 'open')
}

export async function listTasksForUser(userId: number, role: string): Promise<TaskDTO[]> {
  const prisma = getPrisma()
  if (prisma) {
    const where =
      role === 'admin' ? {} : role === 'agent' ? { assignedAgentId: userId } : { postedById: userId }
    const rows = await prisma.task.findMany({ where, orderBy: { createdAt: 'desc' } })
    return rows.map(toTaskDTO)
  }
  return memTasks.filter(
    (t) => role === 'admin' || t.postedById === userId || t.assignedAgentId === userId
  )
}

export async function createTask(input: CreateTaskInput): Promise<TaskDTO> {
  const prisma = getPrisma()
  if (prisma) {
    const row = await prisma.task.create({
      data: {
        title: input.title,
        description: input.description,
        category: input.category,
        budget: input.budget,
        deadline: input.deadline ? new Date(input.deadline) : null,
        location: input.location ?? 'Remote',
        skills: input.skills ?? [],
        urgency: input.urgency ?? 'medium',
        postedById: input.postedById,
      },
    })
    return toTaskDTO(row)
  }

  const task: TaskDTO = {
    id: ++memTaskSeq,
    title: input.title,
    description: input.description,
    category: input.category,
    budget: Number(input.budget),
    deadline: input.deadline ?? null,
    location: input.location ?? 'Remote',
    status: 'open',
    urgency: input.urgency ?? 'medium',
    skills: input.skills ?? [],
    progress: 0,
    applicants: 0,
    postedById: input.postedById,
    assignedAgentId: null,
    createdAt: new Date().toISOString(),
  }
  memTasks.unshift(task)
  return task
}
