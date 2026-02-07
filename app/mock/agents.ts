/**
 * Mock Data: Human Agents
 * Professional human agents available for AI assistance tasks
 */

export interface Agent {
  id: number
  name: string
  role: string
  avatar: string
  rating: number
  reviews: number
  location: string
  hourlyRate: number
  skills: string[]
  availability: 'available' | 'busy' | 'offline'
  completedTasks: number
  responseTime: string
  bio: string
  joinedDate: string
  languages: string[]
  verificationStatus: 'verified' | 'pending' | 'unverified'
  averageResponseTime: number // in hours
  successRate: number // percentage
  lastActive: string
}

export const MOCK_AGENTS: Agent[] = [
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
    availability: "available" as const,
    completedTasks: 342,
    responseTime: "1 hour",
    bio: "Experienced AI Training Specialist with 5+ years of experience in machine learning and data annotation. Specialized in NLP and computer vision projects.",
    joinedDate: "2023-01-15",
    languages: ["English", "Mandarin", "Spanish"],
    verificationStatus: "verified" as const,
    averageResponseTime: 1.2,
    successRate: 98.5,
    lastActive: "2024-02-06T10:30:00Z"
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
    availability: "available" as const,
    completedTasks: 256,
    responseTime: "2 hours",
    bio: "Detail-oriented QA specialist with expertise in testing and documentation. 10+ years in software quality assurance.",
    joinedDate: "2023-03-20",
    languages: ["English", "French"],
    verificationStatus: "verified" as const,
    averageResponseTime: 2.1,
    successRate: 96.8,
    lastActive: "2024-02-06T09:15:00Z"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "AI Supervisor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5.0,
    reviews: 203,
    location: "Austin, TX",
    hourlyRate: 90,
    skills: ["Model Training", "Prompt Engineering", "NLP", "Deep Learning"],
    availability: "busy" as const,
    completedTasks: 489,
    responseTime: "30 minutes",
    bio: "AI supervisor specializing in model training and natural language processing. PhD in Computer Science with focus on ML.",
    joinedDate: "2022-11-10",
    languages: ["English", "Spanish"],
    verificationStatus: "verified" as const,
    averageResponseTime: 0.5,
    successRate: 99.2,
    lastActive: "2024-02-06T11:45:00Z"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Human-in-the-Loop Expert",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 4.7,
    reviews: 156,
    location: "Seattle, WA",
    hourlyRate: 80,
    skills: ["Content Moderation", "Decision Making", "Ethics", "Policy"],
    availability: "available" as const,
    completedTasks: 178,
    responseTime: "1 hour",
    bio: "Expert in human oversight and ethical AI implementation. Background in philosophy and computer science.",
    joinedDate: "2023-06-05",
    languages: ["English", "Korean"],
    verificationStatus: "verified" as const,
    averageResponseTime: 1.3,
    successRate: 97.1,
    lastActive: "2024-02-06T08:20:00Z"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Data Annotation Specialist",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    rating: 4.6,
    reviews: 94,
    location: "Boston, MA",
    hourlyRate: 55,
    skills: ["Data Labeling", "Image Recognition", "Text Analysis", "Quality Control"],
    availability: "available" as const,
    completedTasks: 412,
    responseTime: "3 hours",
    bio: "Specialized in data annotation and quality control for AI training datasets. Fast and accurate worker.",
    joinedDate: "2023-08-12",
    languages: ["English"],
    verificationStatus: "verified" as const,
    averageResponseTime: 3.2,
    successRate: 95.8,
    lastActive: "2024-02-06T07:30:00Z"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "AI Ethics Consultant",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviews: 178,
    location: "Portland, OR",
    hourlyRate: 120,
    skills: ["AI Ethics", "Policy Development", "Risk Assessment", "Compliance"],
    availability: "offline" as const,
    completedTasks: 89,
    responseTime: "4 hours",
    bio: "AI ethics consultant helping companies implement responsible AI practices. JD with focus on technology law.",
    joinedDate: "2022-09-18",
    languages: ["English", "German"],
    verificationStatus: "verified" as const,
    averageResponseTime: 4.1,
    successRate: 99.5,
    lastActive: "2024-02-05T16:45:00Z"
  }
]

// Helper functions for agent data
export const agentHelpers = {
  getAvailableAgents: () => MOCK_AGENTS.filter(agent => agent.availability === 'available'),
  
  getAgentsBySkill: (skill: string) => 
    MOCK_AGENTS.filter(agent => 
      agent.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    ),
  
  getAgentsByLocation: (location: string) =>
    MOCK_AGENTS.filter(agent => 
      agent.location.toLowerCase().includes(location.toLowerCase())
    ),
  
  getTopRatedAgents: (limit: number = 5) =>
    MOCK_AGENTS.sort((a, b) => b.rating - a.rating).slice(0, limit),
  
  getAgentById: (id: number) =>
    MOCK_AGENTS.find(agent => agent.id === id),
  
  searchAgents: (query: string) => {
    const searchLower = query.toLowerCase()
    return MOCK_AGENTS.filter(agent =>
      agent.name.toLowerCase().includes(searchLower) ||
      agent.role.toLowerCase().includes(searchLower) ||
      agent.location.toLowerCase().includes(searchLower) ||
      agent.skills.some(skill => skill.toLowerCase().includes(searchLower))
    )
  }
}
