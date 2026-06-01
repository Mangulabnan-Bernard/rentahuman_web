import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, SESSION_COOKIE } from '../../lib/session'
import { listOpenTasks, listTasksForUser, createTask, type TaskUrgency } from '../../lib/tasks'

/**
 * GET /api/tasks            -> all open tasks (public browse)
 * GET /api/tasks?scope=mine -> the signed-in user's tasks (posted, or assigned for agents)
 */
export async function GET(request: NextRequest) {
  const scope = new URL(request.url).searchParams.get('scope')

  if (scope === 'mine') {
    const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }
    const tasks = await listTasksForUser(session.id, session.role)
    return NextResponse.json({ success: true, data: tasks, total: tasks.length })
  }

  const tasks = await listOpenTasks()
  return NextResponse.json({ success: true, data: tasks, total: tasks.length })
}

/** POST /api/tasks — create a task (authenticated clients only). Persists to the DB. */
export async function POST(request: NextRequest) {
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)
  if (!session) {
    return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
  }
  if (session.role !== 'client' && session.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Only clients can post tasks' }, { status: 403 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }

  const title = String(body.title ?? '').trim()
  const description = String(body.description ?? '').trim()
  const category = String(body.category ?? '').trim()
  if (!title || !description || !category) {
    return NextResponse.json(
      { success: false, error: 'Title, description and category are required' },
      { status: 400 }
    )
  }

  const budget = Number(body.budget)
  const task = await createTask({
    postedById: session.id,
    title,
    description,
    category,
    budget: Number.isNaN(budget) ? 0 : budget,
    deadline: typeof body.deadline === 'string' && body.deadline ? body.deadline : null,
    location: typeof body.location === 'string' ? body.location : 'Remote',
    skills: Array.isArray(body.skills) ? (body.skills as string[]) : [],
    urgency: (['low', 'medium', 'high'].includes(String(body.urgency))
      ? body.urgency
      : 'medium') as TaskUrgency,
  })

  return NextResponse.json({ success: true, data: task, message: 'Task created successfully' })
}
