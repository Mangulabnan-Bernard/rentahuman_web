import { NextRequest, NextResponse } from 'next/server'

const dummyAgents = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "AI Training Specialist",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviews: 127,
    location: "San Francisco, CA",
    hourlyRate: 75,
    skills: ["Machine Learning", "Data Annotation", "Model Training", "Python"],
    availability: "available",
    completedTasks: 342,
    responseTime: "1 hour"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Task Validator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviews: 89,
    location: "New York, NY",
    hourlyRate: 60,
    skills: ["Quality Assurance", "Testing", "Documentation", "Agile"],
    availability: "available",
    completedTasks: 256,
    responseTime: "2 hours"
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const role = searchParams.get('role')
  const availability = searchParams.get('availability')
  const search = searchParams.get('search')
  const skills = searchParams.get('skills')

  let filteredAgents = dummyAgents

  if (role) {
    filteredAgents = filteredAgents.filter(agent => 
      agent.role.toLowerCase().includes(role.toLowerCase())
    )
  }

  if (availability) {
    filteredAgents = filteredAgents.filter(agent => agent.availability === availability)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredAgents = filteredAgents.filter(agent =>
      agent.name.toLowerCase().includes(searchLower) ||
      agent.role.toLowerCase().includes(searchLower) ||
      agent.location.toLowerCase().includes(searchLower)
    )
  }

  if (skills) {
    const skillsArray = skills.split(',').map(s => s.trim().toLowerCase())
    filteredAgents = filteredAgents.filter(agent =>
      skillsArray.some(skill => 
        agent.skills.some(agentSkill => 
          agentSkill.toLowerCase().includes(skill)
        )
      )
    )
  }

  return NextResponse.json({
    success: true,
    data: filteredAgents,
    total: filteredAgents.length
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, role, skills, hourlyRate, location } = body

    const newAgent = {
      id: Date.now(),
      name,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      rating: 0,
      reviews: 0,
      location,
      hourlyRate: parseInt(hourlyRate),
      skills,
      availability: "available",
      completedTasks: 0,
      responseTime: "1 hour"
    }

    return NextResponse.json({
      success: true,
      data: newAgent,
      message: "Agent profile created successfully"
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create agent profile' },
      { status: 500 }
    )
  }
}
