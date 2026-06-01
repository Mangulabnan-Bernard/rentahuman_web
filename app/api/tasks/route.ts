import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, SESSION_COOKIE } from '../../lib/session'

const dummyTasks = [
  {
    id: 1,
    title: "AI Model Training Data Validation",
    description: "Need experienced data validators to review and correct training data for a new language model.",
    category: "Data Validation",
    budget: 500,
    deadline: "2024-02-15",
    location: "Remote",
    applicants: 12,
    status: "open",
    postedBy: "TechCorp AI",
    postedDate: "2 days ago",
    skills: ["Data Annotation", "Quality Assurance", "Machine Learning"],
    urgency: "high"
  },
  {
    id: 2,
    title: "Content Moderation for AI Assistant",
    description: "Looking for content moderators to review AI-generated responses for accuracy and safety.",
    category: "Content Moderation",
    budget: 300,
    deadline: "2024-02-20",
    location: "Remote",
    applicants: 8,
    status: "open",
    postedBy: "ChatAI Inc",
    postedDate: "1 week ago",
    skills: ["Content Review", "Policy Enforcement", "Critical Thinking"],
    urgency: "medium"
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const status = searchParams.get('status')
  const search = searchParams.get('search')

  let filteredTasks = dummyTasks

  if (category) {
    filteredTasks = filteredTasks.filter(task => task.category === category)
  }

  if (status) {
    filteredTasks = filteredTasks.filter(task => task.status === status)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower) ||
      task.skills.some(skill => skill.toLowerCase().includes(searchLower))
    )
  }

  return NextResponse.json({
    success: true,
    data: filteredTasks,
    total: filteredTasks.length
  })
}

export async function POST(request: NextRequest) {
  // Posting a task requires an authenticated client. The role is read from the
  // signed session cookie, never from the request body or client storage.
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)
  if (!session) {
    return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
  }
  if (session.role !== 'client' && session.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Only clients can post tasks' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { title, description, category, budget, deadline, location, skills, urgency } = body

    const newTask = {
      id: Date.now(),
      title,
      description,
      category,
      budget: parseInt(budget),
      deadline,
      location,
      applicants: 0,
      status: "open",
      postedBy: session.name, // derived from the authenticated session, not client input
      postedDate: "Just now",
      skills,
      urgency
    }

    return NextResponse.json({
      success: true,
      data: newTask,
      message: "Task created successfully"
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create task' },
      { status: 500 }
    )
  }
}
