/**
 * Mock Data: Clients
 * Business clients who post tasks and hire human agents
 */

export interface Client {
  id: number
  name: string
  email: string
  company: string
  avatar: string
  verified: boolean
  joinedDate: string
  totalSpent: number
  tasksPosted: number
  industry: string
  website?: string
  description?: string
  companySize: 'startup' | 'small' | 'medium' | 'large' | 'enterprise'
  paymentMethod: 'card' | 'bank' | 'crypto'
  averageTaskBudget: number
  completionRate: number
  rating: number
  location: string
  timezone: string
}

export const MOCK_CLIENTS: Client[] = [
  {
    id: 101,
    name: "TechCorp AI",
    email: "contact@techcorp.ai",
    company: "TechCorp Industries",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=techcorp",
    verified: true,
    joinedDate: "2023-02-01",
    totalSpent: 15420,
    tasksPosted: 23,
    industry: "Artificial Intelligence",
    website: "https://techcorp.ai",
    description: "Leading AI company developing next-generation language models and computer vision systems.",
    companySize: "large" as const,
    paymentMethod: "card" as const,
    averageTaskBudget: 670,
    completionRate: 96.5,
    rating: 4.8,
    location: "San Francisco, CA",
    timezone: "PST"
  },
  {
    id: 102,
    name: "ChatAI Inc",
    email: "hello@chatai.com",
    company: "ChatAI Solutions",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chatai",
    verified: true,
    joinedDate: "2023-03-15",
    totalSpent: 8900,
    tasksPosted: 18,
    industry: "Customer Service",
    website: "https://chatai.com",
    description: "Innovative customer service AI platform helping businesses automate support while maintaining human touch.",
    companySize: "medium" as const,
    paymentMethod: "bank" as const,
    averageTaskBudget: 494,
    completionRate: 94.2,
    rating: 4.6,
    location: "New York, NY",
    timezone: "EST"
  },
  {
    id: 103,
    name: "MedTech Solutions",
    email: "projects@medtech.com",
    company: "MedTech Solutions LLC",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=medtech",
    verified: true,
    joinedDate: "2023-05-20",
    totalSpent: 22500,
    tasksPosted: 31,
    industry: "Healthcare AI",
    website: "https://medtech.com",
    description: "Healthcare technology company specializing in AI-assisted medical diagnosis and treatment planning.",
    companySize: "medium" as const,
    paymentMethod: "card" as const,
    averageTaskBudget: 726,
    completionRate: 98.1,
    rating: 4.9,
    location: "Boston, MA",
    timezone: "EST"
  },
  {
    id: 104,
    name: "SupportBot Co",
    email: "partners@supportbot.co",
    company: "SupportBot Company",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=supportbot",
    verified: false,
    joinedDate: "2023-07-10",
    totalSpent: 6750,
    tasksPosted: 15,
    industry: "Customer Service",
    website: "https://supportbot.co",
    description: "Startup building AI-powered customer service bots for e-commerce and SaaS companies.",
    companySize: "startup" as const,
    paymentMethod: "crypto" as const,
    averageTaskBudget: 450,
    completionRate: 91.8,
    rating: 4.4,
    location: "Austin, TX",
    timezone: "CST"
  },
  {
    id: 105,
    name: "AutoDrive AI",
    email: "procurement@autodrive.ai",
    company: "AutoDrive Technologies",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=autodrive",
    verified: true,
    joinedDate: "2023-04-05",
    totalSpent: 32100,
    tasksPosted: 42,
    industry: "Automotive AI",
    website: "https://autodrive.ai",
    description: "Autonomous vehicle technology company developing self-driving systems for commercial and consumer vehicles.",
    companySize: "large" as const,
    paymentMethod: "bank" as const,
    averageTaskBudget: 764,
    completionRate: 95.3,
    rating: 4.7,
    location: "Detroit, MI",
    timezone: "EST"
  },
  {
    id: 106,
    name: "LegalTech Corp",
    email: "contracts@legaltech.com",
    company: "LegalTech Corporation",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=legaltech",
    verified: true,
    joinedDate: "2023-01-10",
    totalSpent: 45800,
    tasksPosted: 28,
    industry: "Legal AI",
    website: "https://legaltech.com",
    description: "Legal technology company providing AI-powered document analysis and contract review services.",
    companySize: "enterprise" as const,
    paymentMethod: "card" as const,
    averageTaskBudget: 1636,
    completionRate: 97.8,
    rating: 4.9,
    location: "Washington, DC",
    timezone: "EST"
  }
]

// Helper functions for client data
export const clientHelpers = {
  getVerifiedClients: () => MOCK_CLIENTS.filter(client => client.verified),
  
  getClientsByIndustry: (industry: string) =>
    MOCK_CLIENTS.filter(client => 
      client.industry.toLowerCase().includes(industry.toLowerCase())
    ),
  
  getClientsBySize: (size: string) =>
    MOCK_CLIENTS.filter(client => 
      client.companySize === size
    ),
  
  getTopSpendingClients: (limit: number = 5) =>
    MOCK_CLIENTS.sort((a, b) => b.totalSpent - a.totalSpent).slice(0, limit),
  
  getClientById: (id: number) =>
    MOCK_CLIENTS.find(client => client.id === id),
  
  searchClients: (query: string) => {
    const searchLower = query.toLowerCase()
    return MOCK_CLIENTS.filter(client =>
      client.name.toLowerCase().includes(searchLower) ||
      client.company.toLowerCase().includes(searchLower) ||
      client.industry.toLowerCase().includes(searchLower) ||
      client.location.toLowerCase().includes(searchLower)
    )
  }
}
