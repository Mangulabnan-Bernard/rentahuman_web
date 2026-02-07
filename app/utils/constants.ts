export const DUMMY_AGENTS = [
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
    availability: "available" as const,
    completedTasks: 256,
    responseTime: "2 hours"
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
    responseTime: "30 minutes"
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
    responseTime: "1 hour"
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
    responseTime: "3 hours"
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
    responseTime: "4 hours"
  }
]

export const DUMMY_TASKS = [
  {
    id: 1,
    title: "AI Model Training Data Validation",
    description: "Need experienced data validators to review and correct training data for a new language model. The task involves verifying the accuracy of labeled data and ensuring consistency across the dataset.",
    category: "Data Validation",
    budget: 500,
    deadline: "2024-02-15",
    location: "Remote",
    applicants: 12,
    status: "open" as const,
    postedBy: "TechCorp AI",
    postedDate: "2 days ago",
    skills: ["Data Annotation", "Quality Assurance", "Machine Learning", "Attention to Detail"],
    urgency: "high" as const
  },
  {
    id: 2,
    title: "Content Moderation for AI Assistant",
    description: "Looking for content moderators to review AI-generated responses for accuracy, safety, and appropriateness. This is an ongoing project with flexible hours.",
    category: "Content Moderation",
    budget: 300,
    deadline: "2024-02-20",
    location: "Remote",
    applicants: 8,
    status: "open" as const,
    postedBy: "ChatAI Inc",
    postedDate: "1 week ago",
    skills: ["Content Review", "Policy Enforcement", "Critical Thinking", "Communication"],
    urgency: "medium" as const
  },
  {
    id: 3,
    title: "Human-in-the-Loop for Medical AI",
    description: "Medical professionals needed to validate AI diagnoses and provide expert feedback on medical imaging analysis. Requires relevant medical background.",
    category: "Healthcare AI",
    budget: 1200,
    deadline: "2024-02-10",
    location: "New York, NY",
    applicants: 5,
    status: "in_progress" as const,
    postedBy: "MedTech Solutions",
    postedDate: "3 days ago",
    skills: ["Medical Knowledge", "Radiology", "AI Validation", "Healthcare"],
    urgency: "high" as const
  },
  {
    id: 4,
    title: "Customer Service AI Training",
    description: "Help train customer service AI by providing real conversation examples and feedback on response quality. Previous customer service experience preferred.",
    category: "AI Training",
    budget: 450,
    deadline: "2024-02-25",
    location: "Remote",
    applicants: 18,
    status: "open" as const,
    postedBy: "SupportBot Co",
    postedDate: "5 days ago",
    skills: ["Customer Service", "Communication", "Training", "Quality Control"],
    urgency: "low" as const
  },
  {
    id: 5,
    title: "Image Classification for Autonomous Vehicles",
    description: "Help improve autonomous vehicle AI by classifying and labeling road scenarios, traffic signs, and pedestrian behavior from dashcam footage.",
    category: "Computer Vision",
    budget: 800,
    deadline: "2024-02-18",
    location: "Remote",
    applicants: 9,
    status: "open" as const,
    postedBy: "AutoDrive AI",
    postedDate: "1 day ago",
    skills: ["Image Recognition", "Attention to Detail", "Transportation Knowledge", "Data Labeling"],
    urgency: "medium" as const
  },
  {
    id: 6,
    title: "Legal Document Review for AI Training",
    description: "Legal professionals needed to review and annotate legal documents for AI training purposes. Must have legal background and understanding of document structure.",
    category: "Legal AI",
    budget: 1500,
    deadline: "2024-02-12",
    location: "San Francisco, CA",
    applicants: 3,
    status: "completed" as const,
    postedBy: "LegalTech Corp",
    postedDate: "2 weeks ago",
    skills: ["Legal Knowledge", "Document Analysis", "Attention to Detail", "Research"],
    urgency: "high" as const
  }
]

export const DASHBOARD_STATS = {
  totalEarnings: 4250,
  activeTasks: 8,
  completedTasks: 47,
  clientRating: 4.9,
  recentActivity: [
    {
      id: 1,
      type: "completed",
      title: "Task completed: AI Model Training",
      description: "2 hours ago • $150 earned",
      icon: "check"
    },
    {
      id: 2,
      type: "assigned",
      title: "New task assigned: Content Moderation",
      description: "5 hours ago • Due in 3 days",
      icon: "briefcase"
    },
    {
      id: 3,
      type: "deadline",
      title: "Task deadline approaching",
      description: "1 day ago • Data Validation task",
      icon: "alert"
    }
  ],
  upcomingDeadlines: [
    {
      id: 1,
      title: "AI Model Training Data Validation",
      client: "TechCorp AI",
      deadline: "Tomorrow",
      budget: 500,
      urgency: "high"
    },
    {
      id: 2,
      title: "Content Moderation Review",
      client: "ChatAI Inc",
      deadline: "In 3 days",
      budget: 300,
      urgency: "medium"
    },
    {
      id: 3,
      title: "Customer Service AI Training",
      client: "SupportBot Co",
      deadline: "In 5 days",
      budget: 450,
      urgency: "low"
    }
  ]
}

export const CATEGORIES = [
  "Data Validation",
  "Content Moderation", 
  "Healthcare AI",
  "AI Training",
  "Computer Vision",
  "Legal AI",
  "Customer Service",
  "Research",
  "Quality Assurance"
]

export const SKILLS = [
  "Machine Learning",
  "Data Annotation",
  "Model Training",
  "Python",
  "Quality Assurance",
  "Testing",
  "Documentation",
  "Agile",
  "Prompt Engineering",
  "NLP",
  "Deep Learning",
  "Content Moderation",
  "Decision Making",
  "Ethics",
  "Policy",
  "Data Labeling",
  "Image Recognition",
  "Text Analysis",
  "Quality Control",
  "AI Ethics",
  "Policy Development",
  "Risk Assessment",
  "Compliance",
  "Medical Knowledge",
  "Radiology",
  "AI Validation",
  "Healthcare",
  "Customer Service",
  "Communication",
  "Training",
  "Transportation Knowledge",
  "Legal Knowledge",
  "Document Analysis",
  "Research",
  "Attention to Detail"
]
