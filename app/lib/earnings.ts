/**
 * Server-only earnings store. Backed by Prisma/MySQL when DATABASE_URL is set,
 * otherwise an in-memory list so the demo runs without a database.
 */
import { getPrisma } from './prisma'

export type EarningStatus = 'pending' | 'claimable' | 'paid_out'

export interface EarningDTO {
  id: number
  taskId: number | null
  taskTitle: string | null
  amount: number
  status: EarningStatus
  description: string | null
  date: string
}

// ---- in-memory fallback ----
const memEarnings: EarningDTO[] = [
  {
    id: 8001,
    taskId: null,
    taskTitle: 'Content Moderation Review',
    amount: 300,
    status: 'claimable',
    description: 'Reviewed AI responses for safety and accuracy.',
    date: '2026-05-28',
  },
  {
    id: 8002,
    taskId: null,
    taskTitle: 'AI Model Training Data Validation',
    amount: 500,
    status: 'paid_out',
    description: 'Validated training data for a language model.',
    date: '2026-05-20',
  },
]

export async function listEarningsForUser(userId: number): Promise<EarningDTO[]> {
  const prisma = getPrisma()
  if (prisma) {
    const rows = await prisma.earning.findMany({
      where: { agentId: userId },
      include: { task: { select: { title: true } } },
      orderBy: { date: 'desc' },
    })
    return rows.map((r) => ({
      id: r.id,
      taskId: r.taskId ?? null,
      taskTitle: r.task?.title ?? null,
      amount: Number(r.amount),
      status: r.status as EarningStatus,
      description: r.description ?? null,
      date: r.date ? new Date(r.date).toISOString().split('T')[0] : '',
    }))
  }
  return memEarnings
}
