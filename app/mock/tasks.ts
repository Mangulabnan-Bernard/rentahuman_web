/**
 * Mock Data: Tasks
 * AI-related tasks posted by clients for human agents to complete
 */

export interface Task {
  id: number
  title: string
  description: string
  category: string
  budget: number
  deadline: string
  location: string
  applicants: number
  status: 'open' | 'in_progress' | 'completed' | 'cancelled' | 'disputed'
  postedBy: string
  postedDate: string
  skills: string[]
  urgency: 'low' | 'medium' | 'high'
  clientId: number
  assignedAgentId: number | null
  progress: number
  requirements: string[]
  deliverables: string[]
  estimatedHours: number
  complexity: 'simple' | 'moderate' | 'complex'
  tags: string[]
  attachments: TaskAttachment[]
  milestones: TaskMilestone[]
  clientRating?: number
  agentRating?: number
  completedDate?: string
  paymentStatus: 'pending' | 'processing' | 'paid' | 'disputed'
}

export interface TaskAttachment {
  id: number
  filename: string
  url: string
  size: number
  type: string
  uploadedAt: string
}

export interface TaskMilestone {
  id: number
  title: string
  description: string
  dueDate: string
  completed: boolean
  completedAt?: string
}

export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: "AI Model Training Data Validation",
    description: "Need experienced data validators to review and correct training data for a new language model. The task involves verifying the accuracy of labeled data and ensuring consistency across the dataset. Must have experience with ML data preparation.",
    category: "Data Validation",
    budget: 500,
    deadline: "2024-02-15",
    location: "Remote",
    applicants: 12,
    status: "open" as const,
    postedBy: "TechCorp AI",
    postedDate: "2024-02-01",
    skills: ["Data Annotation", "Quality Assurance", "Machine Learning", "Attention to Detail"],
    urgency: "high" as const,
    clientId: 101,
    assignedAgentId: null,
    progress: 0,
    requirements: [
      "Experience with data annotation",
      "Attention to detail",
      "Ability to meet deadlines",
      "Strong communication skills"
    ],
    deliverables: [
      "Validated dataset with corrections",
      "Quality report with findings",
      "Documentation of changes made"
    ],
    estimatedHours: 20,
    complexity: "moderate" as const,
    tags: ["data-validation", "ml", "quality-control"],
    attachments: [
      {
        id: 1,
        filename: "dataset_sample.csv",
        url: "/files/dataset_sample.csv",
        size: 2048576,
        type: "text/csv",
        uploadedAt: "2024-02-01T09:00:00Z"
      }
    ],
    milestones: [
      {
        id: 1,
        title: "Initial Review",
        description: "Review first 25% of dataset",
        dueDate: "2024-02-08",
        completed: false
      },
      {
        id: 2,
        title: "Mid-Point Check",
        description: "Review 50% of dataset and provide status update",
        dueDate: "2024-02-11",
        completed: false
      },
      {
        id: 3,
        title: "Final Validation",
        description: "Complete full dataset validation",
        dueDate: "2024-02-15",
        completed: false
      }
    ],
    paymentStatus: "pending" as const
  },
  {
    id: 2,
    title: "Content Moderation for AI Assistant",
    description: "Looking for content moderators to review AI-generated responses for accuracy, safety, and appropriateness. This is an ongoing project with flexible hours. Must understand content policies and community guidelines.",
    category: "Content Moderation",
    budget: 300,
    deadline: "2024-02-20",
    location: "Remote",
    applicants: 8,
    status: "in_progress" as const,
    postedBy: "ChatAI Inc",
    postedDate: "2024-01-28",
    skills: ["Content Review", "Policy Enforcement", "Critical Thinking", "Communication"],
    urgency: "medium" as const,
    clientId: 102,
    assignedAgentId: 1,
    progress: 45,
    requirements: [
      "Experience in content moderation",
      "Understanding of AI safety guidelines",
      "Flexible availability",
      "Strong judgment skills"
    ],
    deliverables: [
      "Moderated content with decisions",
      "Weekly activity reports",
      "Quality metrics documentation"
    ],
    estimatedHours: 15,
    complexity: "simple" as const,
    tags: ["moderation", "ai-safety", "content-review"],
    attachments: [],
    milestones: [
      {
        id: 1,
        title: "Training Completion",
        description: "Complete moderation training and guidelines review",
        dueDate: "2024-02-05",
        completed: true,
        completedAt: "2024-02-04T14:30:00Z"
      },
      {
        id: 2,
        title: "First Week Review",
        description: "Complete first week of moderation tasks",
        dueDate: "2024-02-12",
        completed: false
      }
    ],
    paymentStatus: "processing" as const
  },
  {
    id: 3,
    title: "Human-in-the-Loop for Medical AI",
    description: "Medical professionals needed to validate AI diagnoses and provide expert feedback on medical imaging analysis. Requires relevant medical background and experience with medical terminology. HIPAA compliance required.",
    category: "Healthcare AI",
    budget: 1200,
    deadline: "2024-02-10",
    location: "New York, NY",
    applicants: 5,
    status: "completed" as const,
    postedBy: "MedTech Solutions",
    postedDate: "2024-01-25",
    skills: ["Medical Knowledge", "Radiology", "AI Validation", "Healthcare"],
    urgency: "high" as const,
    clientId: 103,
    assignedAgentId: 3,
    progress: 100,
    requirements: [
      "Medical degree required",
      "Experience with medical imaging",
      "HIPAA compliance",
      "Professional certification"
    ],
    deliverables: [
      "Validated AI diagnoses",
      "Expert feedback reports",
      "Accuracy assessment"
    ],
    estimatedHours: 40,
    complexity: "complex" as const,
    tags: ["medical", "ai-validation", "healthcare"],
    attachments: [
      {
        id: 2,
        filename: "ai_diagnosis_examples.pdf",
        url: "/files/ai_diagnosis_examples.pdf",
        size: 5242880,
        type: "application/pdf",
        uploadedAt: "2024-01-25T10:00:00Z"
      }
    ],
    milestones: [
      {
        id: 1,
        title: "Initial Validation",
        description: "Review first batch of AI diagnoses",
        dueDate: "2024-02-02",
        completed: true,
        completedAt: "2024-02-01T16:30:00Z"
      },
      {
        id: 2,
        title: "Final Report",
        description: "Submit final validation report",
        dueDate: "2024-02-10",
        completed: true,
        completedAt: "2024-02-09T11:45:00Z"
      }
    ],
    clientRating: 5,
    agentRating: 5,
    completedDate: "2024-02-09",
    paymentStatus: "paid" as const
  },
  {
    id: 4,
    title: "Customer Service AI Training",
    description: "Help train customer service AI by providing real conversation examples and feedback on response quality. Previous customer service experience preferred. Must understand customer service best practices.",
    category: "AI Training",
    budget: 450,
    deadline: "2024-02-25",
    location: "Remote",
    applicants: 18,
    status: "open" as const,
    postedBy: "SupportBot Co",
    postedDate: "2024-01-20",
    skills: ["Customer Service", "Communication", "Training", "Quality Control"],
    urgency: "low" as const,
    clientId: 104,
    assignedAgentId: null,
    progress: 0,
    requirements: [
      "Customer service experience",
      "Excellent communication skills",
      "Patience and empathy",
      "Ability to provide constructive feedback"
    ],
    deliverables: [
      "Conversation examples",
      "Response quality feedback",
      "Training data annotations"
    ],
    estimatedHours: 18,
    complexity: "simple" as const,
    tags: ["customer-service", "ai-training", "communication"],
    attachments: [],
    milestones: [
      {
        id: 1,
        title: "Sample Conversations",
        description: "Provide 50 sample conversations",
        dueDate: "2024-02-10",
        completed: false
      }
    ],
    paymentStatus: "pending" as const
  },
  {
    id: 5,
    title: "Image Classification for Autonomous Vehicles",
    description: "Help improve autonomous vehicle AI by classifying and labeling road scenarios, traffic signs, and pedestrian behavior from dashcam footage. Must understand traffic scenarios and vehicle safety protocols.",
    category: "Computer Vision",
    budget: 800,
    deadline: "2024-02-18",
    location: "Remote",
    applicants: 9,
    status: "in_progress" as const,
    postedBy: "AutoDrive AI",
    postedDate: "2024-02-02",
    skills: ["Image Recognition", "Attention to Detail", "Transportation Knowledge", "Data Labeling"],
    urgency: "medium" as const,
    clientId: 105,
    assignedAgentId: 2,
    progress: 30,
    requirements: [
      "Experience with image classification",
      "Understanding of traffic scenarios",
      "Attention to detail",
      "Ability to work with large datasets"
    ],
    deliverables: [
      "Labeled image dataset",
      "Classification accuracy report",
      "Quality assurance documentation"
    ],
    estimatedHours: 32,
    complexity: "moderate" as const,
    tags: ["computer-vision", "autonomous-vehicles", "image-classification"],
    attachments: [
      {
        id: 3,
        filename: "labeling_guidelines.pdf",
        url: "/files/labeling_guidelines.pdf",
        size: 1048576,
        type: "application/pdf",
        uploadedAt: "2024-02-02T08:00:00Z"
      }
    ],
    milestones: [
      {
        id: 1,
        title: "Dataset Review",
        description: "Review and understand the dataset",
        dueDate: "2024-02-05",
        completed: true,
        completedAt: "2024-02-04T10:15:00Z"
      },
      {
        id: 2,
        title: "First Batch",
        description: "Complete labeling of first 25% of images",
        dueDate: "2024-02-09",
        completed: false
      }
    ],
    paymentStatus: "processing" as const
  },
  {
    id: 6,
    title: "Legal Document Review for AI Training",
    description: "Legal professionals needed to review and annotate legal documents for AI training purposes. Must have legal background and understanding of document structure. Confidentiality agreement required.",
    category: "Legal AI",
    budget: 1500,
    deadline: "2024-02-12",
    location: "San Francisco, CA",
    applicants: 3,
    status: "completed" as const,
    postedBy: "LegalTech Corp",
    postedDate: "2024-01-15",
    skills: ["Legal Knowledge", "Document Analysis", "Attention to Detail", "Research"],
    urgency: "high" as const,
    clientId: 106,
    assignedAgentId: 6,
    progress: 100,
    requirements: [
      "Law degree required",
      "Experience with legal documents",
      "Confidentiality agreement",
      "Bar admission preferred"
    ],
    deliverables: [
      "Annotated legal documents",
      "Classification metadata",
      "Quality assessment report"
    ],
    estimatedHours: 50,
    complexity: "complex" as const,
    tags: ["legal", "document-analysis", "ai-training"],
    attachments: [
      {
        id: 4,
        filename: "nda_template.pdf",
        url: "/files/nda_template.pdf",
        size: 262144,
        type: "application/pdf",
        uploadedAt: "2024-01-15T09:30:00Z"
      }
    ],
    milestones: [
      {
        id: 1,
        title: "Document Review",
        description: "Review all provided documents",
        dueDate: "2024-02-08",
        completed: true,
        completedAt: "2024-02-07T15:20:00Z"
      },
      {
        id: 2,
        title: "Annotation Complete",
        description: "Complete all document annotations",
        dueDate: "2024-02-12",
        completed: true,
        completedAt: "2024-02-11T17:45:00Z"
      }
    ],
    clientRating: 5,
    agentRating: 4,
    completedDate: "2024-02-11",
    paymentStatus: "paid" as const
  }
]

// Helper functions for task data
export const taskHelpers = {
  getTasksByStatus: (status: string) =>
    MOCK_TASKS.filter(task => task.status === status),
  
  getTasksByCategory: (category: string) =>
    MOCK_TASKS.filter(task => 
      task.category.toLowerCase().includes(category.toLowerCase())
    ),
  
  getTasksByUrgency: (urgency: string) =>
    MOCK_TASKS.filter(task => task.urgency === urgency),
  
  getTasksByClient: (clientId: number) =>
    MOCK_TASKS.filter(task => task.clientId === clientId),
  
  getTasksByAgent: (agentId: number) =>
    MOCK_TASKS.filter(task => task.assignedAgentId === agentId),
  
  getOpenTasks: () =>
    MOCK_TASKS.filter(task => task.status === 'open'),
  
  getTasksByBudget: (min: number, max: number) =>
    MOCK_TASKS.filter(task => task.budget >= min && task.budget <= max),
  
  searchTasks: (query: string) => {
    const searchLower = query.toLowerCase()
    return MOCK_TASKS.filter(task =>
      task.title.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower) ||
      task.category.toLowerCase().includes(searchLower) ||
      task.skills.some(skill => skill.toLowerCase().includes(searchLower)) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  },
  
  getTaskById: (id: number) =>
    MOCK_TASKS.find(task => task.id === id),
  
  getTasksNeedingAttention: () =>
    MOCK_TASKS.filter(task => 
      task.status === 'in_progress' && 
      new Date(task.deadline) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    )
}
