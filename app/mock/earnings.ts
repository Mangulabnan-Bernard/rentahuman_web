/**
 * Mock Data: Earnings
 * Financial records for agents' completed tasks and payments
 */

export interface Earning {
  id: number
  taskId: number
  taskTitle: string
  clientId: number
  clientName: string
  agentId: number
  agentName: string
  amount: number
  status: 'pending' | 'claimable' | 'paid_out' | 'disputed'
  date: string
  description: string
  payoutDate: string | null
  invoiceUrl: string | null
  paymentMethod: string
  fees: {
    platformFee: number
    processingFee: number
    total: number
  }
  taxInfo: {
    taxWithheld: number
    taxRate: number
    netAmount: number
  }
  workHours: number
  hourlyRate: number
  bonus?: number
  performanceRating: number
}

export interface PayoutMethod {
  id: number
  type: 'bank' | 'paypal' | 'wise' | 'crypto'
  details: {
    bankName?: string
    accountNumber?: string
    routingNumber?: string
    email?: string
    walletAddress?: string
  }
  isDefault: boolean
  verified: boolean
}

export interface MonthlyEarnings {
  month: string
  year: number
  grossEarnings: number
  netEarnings: number
  tasksCompleted: number
  averageHourlyRate: number
  topClient: string
  bonusEarned: number
}

export const MOCK_EARNINGS: Earning[] = [
  {
    id: 1,
    taskId: 3,
    taskTitle: "Human-in-the-Loop for Medical AI",
    clientId: 103,
    clientName: "MedTech Solutions",
    agentId: 3,
    agentName: "Elena Rodriguez",
    amount: 1200,
    status: "paid_out" as const,
    date: "2024-02-01",
    description: "Completed medical AI validation with 99.8% accuracy rating",
    payoutDate: "2024-02-05",
    invoiceUrl: "/invoices/INV-2024-001.pdf",
    paymentMethod: "bank_transfer",
    fees: {
      platformFee: 60, // 5%
      processingFee: 12, // 1%
      total: 72
    },
    taxInfo: {
      taxWithheld: 180, // 15%
      taxRate: 15,
      netAmount: 948
    },
    workHours: 40,
    hourlyRate: 30,
    bonus: 100,
    performanceRating: 5
  },
  {
    id: 2,
    taskId: 2,
    taskTitle: "Content Moderation for AI Assistant",
    clientId: 102,
    clientName: "ChatAI Inc",
    agentId: 1,
    agentName: "Sarah Chen",
    amount: 300,
    status: "claimable" as const,
    date: "2024-01-28",
    description: "Reviewed AI responses for safety and accuracy - 45% completed",
    payoutDate: null,
    invoiceUrl: null,
    paymentMethod: "paypal",
    fees: {
      platformFee: 15, // 5%
      processingFee: 3, // 1%
      total: 18
    },
    taxInfo: {
      taxWithheld: 0,
      taxRate: 0,
      netAmount: 282
    },
    workHours: 15,
    hourlyRate: 20,
    performanceRating: 4.5
  },
  {
    id: 3,
    taskId: 6,
    taskTitle: "Legal Document Review for AI Training",
    clientId: 106,
    clientName: "LegalTech Corp",
    agentId: 6,
    agentName: "James Wilson",
    amount: 1500,
    status: "paid_out" as const,
    date: "2024-01-25",
    description: "Annotated 500+ legal documents with 99.2% accuracy",
    payoutDate: "2024-01-30",
    invoiceUrl: "/invoices/INV-2024-002.pdf",
    paymentMethod: "bank_transfer",
    fees: {
      platformFee: 75, // 5%
      processingFee: 15, // 1%
      total: 90
    },
    taxInfo: {
      taxWithheld: 225, // 15%
      taxRate: 15,
      netAmount: 1185
    },
    workHours: 50,
    hourlyRate: 30,
    bonus: 200,
    performanceRating: 4
  },
  {
    id: 4,
    taskId: 1,
    taskTitle: "AI Model Training Data Validation",
    clientId: 101,
    clientName: "TechCorp AI",
    agentId: 2,
    agentName: "Marcus Johnson",
    amount: 500,
    status: "pending" as const,
    date: "2024-01-20",
    description: "Data validation project - currently in progress",
    payoutDate: null,
    invoiceUrl: null,
    paymentMethod: "bank_transfer",
    fees: {
      platformFee: 25, // 5%
      processingFee: 5, // 1%
      total: 30
    },
    taxInfo: {
      taxWithheld: 0,
      taxRate: 15,
      netAmount: 470
    },
    workHours: 20,
    hourlyRate: 25,
    performanceRating: 0
  },
  {
    id: 5,
    taskId: 5,
    taskTitle: "Image Classification for Autonomous Vehicles",
    clientId: 105,
    clientName: "AutoDrive AI",
    agentId: 4,
    agentName: "David Kim",
    amount: 800,
    status: "claimable" as const,
    date: "2024-02-02",
    description: "Classified road scenarios from dashcam footage - 30% completed",
    payoutDate: null,
    invoiceUrl: null,
    paymentMethod: "wise",
    fees: {
      platformFee: 40, // 5%
      processingFee: 8, // 1%
      total: 48
    },
    taxInfo: {
      taxWithheld: 0,
      taxRate: 0,
      netAmount: 752
    },
    workHours: 32,
    hourlyRate: 25,
    performanceRating: 4.8
  }
]

export const MOCK_MONTHLY_EARNINGS: MonthlyEarnings[] = [
  {
    month: "January",
    year: 2024,
    grossEarnings: 2300,
    netEarnings: 1912,
    tasksCompleted: 3,
    averageHourlyRate: 28.75,
    topClient: "LegalTech Corp",
    bonusEarned: 200,
  },
  {
    month: "February",
    year: 2024,
    grossEarnings: 1500,
    netEarnings: 1230,
    tasksCompleted: 2,
    averageHourlyRate: 30,
    topClient: "MedTech Solutions",
    bonusEarned: 100,
  },
  {
    month: "December",
    year: 2023,
    grossEarnings: 3200,
    netEarnings: 2688,
    tasksCompleted: 5,
    averageHourlyRate: 32,
    topClient: "TechCorp AI",
    bonusEarned: 300,
  }
]

export const MOCK_PAYOUT_METHODS: PayoutMethod[] = [
  {
    id: 1,
    type: "bank" as const,
    details: {
      bankName: "Chase Bank",
      accountNumber: "****1234",
      routingNumber: "****5678"
    },
    isDefault: true,
    verified: true
  },
  {
    id: 2,
    type: "paypal" as const,
    details: {
      email: "sarah.chen@example.com"
    },
    isDefault: false,
    verified: true
  },
  {
    id: 3,
    type: "wise" as const,
    details: {
      email: "sarah.chen@wise.com"
    },
    isDefault: false,
    verified: false
  }
]

// Helper functions for earnings data
export const earningsHelpers = {
  getEarningsByStatus: (status: string) =>
    MOCK_EARNINGS.filter(earning => earning.status === status),
  
  getEarningsByAgent: (agentId: number) =>
    MOCK_EARNINGS.filter(earning => earning.agentId === agentId),
  
  getEarningsByClient: (clientId: number) =>
    MOCK_EARNINGS.filter(earning => earning.clientId === clientId),
  
  getEarningsByDateRange: (startDate: string, endDate: string) =>
    MOCK_EARNINGS.filter(earning => 
      earning.date >= startDate && earning.date <= endDate
    ),
  
  getTotalEarnings: (agentId?: number) => {
    const earnings = agentId 
      ? MOCK_EARNINGS.filter(e => e.agentId === agentId)
      : MOCK_EARNINGS
    return earnings.reduce((total, earning) => total + earning.amount, 0)
  },
  
  getClaimableEarnings: (agentId: number) =>
    MOCK_EARNINGS.filter(earning => 
      earning.agentId === agentId && earning.status === 'claimable'
    ),
  
  getPendingEarnings: (agentId: number) =>
    MOCK_EARNINGS.filter(earning => 
      earning.agentId === agentId && earning.status === 'pending'
    ),
  
  getMonthlyEarnings: (agentId: number, year: number) =>
    MOCK_MONTHLY_EARNINGS.filter(monthly => 
      monthly.year === year
    ),
  
  getAverageHourlyRate: (agentId: number) => {
    const agentEarnings = MOCK_EARNINGS.filter(e => e.agentId === agentId && e.workHours > 0)
    if (agentEarnings.length === 0) return 0
    const totalEarnings = agentEarnings.reduce((sum, e) => sum + e.amount, 0)
    const totalHours = agentEarnings.reduce((sum, e) => sum + e.workHours, 0)
    return totalEarnings / totalHours
  },
  
  getTopEarningClients: (agentId: number, limit: number = 3) => {
    const clientTotals = MOCK_EARNINGS
      .filter(e => e.agentId === agentId)
      .reduce((acc, earning) => {
        acc[earning.clientName] = (acc[earning.clientName] || 0) + earning.amount
        return acc
      }, {} as Record<string, number>)
    
    return Object.entries(clientTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([name, total]) => ({ name, total }))
  }
}
