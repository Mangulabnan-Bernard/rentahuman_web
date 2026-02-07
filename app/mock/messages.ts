/**
 * Mock Data: Messages
 * Communication between clients and agents regarding tasks
 */

export interface Message {
  id: number
  taskId: number
  senderId: number
  senderName: string
  senderAvatar: string
  recipientId: number
  recipientName: string
  recipientAvatar: string
  content: string
  timestamp: string
  isFromClient: boolean
  read: boolean
  readAt?: string
  type: 'text' | 'file' | 'image' | 'system'
  attachments?: MessageAttachment[]
  replyTo?: number
  edited?: boolean
  editedAt?: string
  deleted?: boolean
  deletedAt?: string
  metadata?: {
    taskUpdate?: boolean
    deadlineChange?: boolean
    paymentUpdate?: boolean
    [key: string]: any
  }
}

export interface MessageAttachment {
  id: number
  filename: string
  url: string
  size: number
  type: string
  uploadedAt: string
  uploadedBy: number
}

export interface Conversation {
  id: number
  taskId: number
  taskTitle: string
  clientId: number
  clientName: string
  clientAvatar: string
  agentId: number
  agentName: string
  agentAvatar: string
  lastMessage: Message
  unreadCount: number
  totalMessages: number
  status: 'active' | 'completed' | 'archived'
  createdAt: string
  updatedAt: string
}

export const MOCK_MESSAGES: Message[] = [
  {
    id: 1,
    taskId: 3,
    senderId: 106,
    senderName: "LegalTech Corp",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=legaltech",
    recipientId: 6,
    recipientName: "James Wilson",
    recipientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Hi James, we've reviewed your work on the legal document annotation task. Excellent quality! Could you please provide some additional context on document type #3? We need to clarify the classification criteria.",
    timestamp: "2024-02-06T10:15:00Z",
    isFromClient: true,
    read: false,
    type: "text" as const,
    metadata: {
      taskUpdate: true
    }
  },
  {
    id: 2,
    taskId: 3,
    senderId: 6,
    senderName: "James Wilson",
    senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    recipientId: 106,
    recipientName: "LegalTech Corp",
    recipientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=legaltech",
    content: "Thank you for the feedback! Document type #3 refers to contract agreements. I classified them based on the standard legal document categories provided in the guidelines. The classification follows the NDA requirements and confidentiality protocols.",
    timestamp: "2024-02-06T11:30:00Z",
    isFromClient: false,
    read: true,
    readAt: "2024-02-06T11:45:00Z",
    type: "text" as const,
    replyTo: 1,
    metadata: {
      taskUpdate: true
    }
  },
  {
    id: 3,
    taskId: 3,
    senderId: 106,
    senderName: "LegalTech Corp",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=legaltech",
    recipientId: 6,
    recipientName: "James Wilson",
    recipientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Perfect! That clarifies everything. The task deadline is February 15th - does that work for you? We may have additional documents if you're available.",
    timestamp: "2024-02-06T12:00:00Z",
    isFromClient: true,
    read: false,
    type: "text" as const,
    replyTo: 2,
    metadata: {
      deadlineChange: true
    }
  },
  {
    id: 4,
    taskId: 2,
    senderId: 1,
    senderName: "Sarah Chen",
    senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    recipientId: 102,
    recipientName: "ChatAI Inc",
    recipientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chatai",
    content: "Thank you for the opportunity! I have experience with content moderation and can start immediately. What are the expected working hours and is there a specific schedule I need to follow?",
    timestamp: "2024-02-05T14:30:00Z",
    isFromClient: false,
    read: true,
    readAt: "2024-02-05T15:00:00Z",
    type: "text" as const,
    metadata: {
      taskUpdate: true
    }
  },
  {
    id: 5,
    taskId: 2,
    senderId: 102,
    senderName: "ChatAI Inc",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chatai",
    recipientId: 1,
    recipientName: "Sarah Chen",
    recipientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content: "Hi Sarah! We're excited to have you on board. The schedule is flexible - you can work any hours between 6 AM and 10 PM PST. We expect about 15-20 hours per week. Please review the attached guidelines before starting.",
    timestamp: "2024-02-05T15:30:00Z",
    isFromClient: true,
    read: true,
    readAt: "2024-02-05T16:00:00Z",
    type: "text" as const,
    attachments: [
      {
        id: 1,
        filename: "moderation_guidelines.pdf",
        url: "/files/moderation_guidelines.pdf",
        size: 1048576,
        type: "application/pdf",
        uploadedAt: "2024-02-05T15:25:00Z",
        uploadedBy: 102
      }
    ],
    replyTo: 4,
    metadata: {
      taskUpdate: true
    }
  },
  {
    id: 6,
    taskId: 5,
    senderId: 105,
    senderName: "AutoDrive AI",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=autodrive",
    recipientId: 4,
    recipientName: "David Kim",
    recipientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content: "Hi David, we've noticed you're making great progress on the image classification task. The quality is excellent! Just a reminder that the milestone for first 25% is due tomorrow.",
    timestamp: "2024-02-08T09:00:00Z",
    isFromClient: true,
    read: false,
    type: "text" as const,
    metadata: {
      taskUpdate: true,
      deadlineChange: true
    }
  },
  {
    id: 7,
    taskId: 5,
    senderId: 4,
    senderName: "David Kim",
    senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    recipientId: 105,
    recipientName: "AutoDrive AI",
    recipientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=autodrive",
    content: "Thanks for the update! I'm actually at 35% completion now. I've identified some edge cases in the labeling guidelines that might need clarification. Can we schedule a quick call to discuss?",
    timestamp: "2024-02-08T10:30:00Z",
    isFromClient: false,
    read: false,
    type: "text" as const,
    replyTo: 6,
    metadata: {
      taskUpdate: true
    }
  }
]

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    taskId: 3,
    taskTitle: "Legal Document Review for AI Training",
    clientId: 106,
    clientName: "LegalTech Corp",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=legaltech",
    agentId: 6,
    agentName: "James Wilson",
    agentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    lastMessage: MOCK_MESSAGES[2], // Latest message in this conversation
    unreadCount: 1,
    totalMessages: 3,
    status: "active" as const,
    createdAt: "2024-02-06T10:15:00Z",
    updatedAt: "2024-02-06T12:00:00Z"
  },
  {
    id: 2,
    taskId: 2,
    taskTitle: "Content Moderation for AI Assistant",
    clientId: 102,
    clientName: "ChatAI Inc",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chatai",
    agentId: 1,
    agentName: "Sarah Chen",
    agentAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    lastMessage: MOCK_MESSAGES[5], // Latest message in this conversation
    unreadCount: 0,
    totalMessages: 2,
    status: "active" as const,
    createdAt: "2024-02-05T14:30:00Z",
    updatedAt: "2024-02-05T15:30:00Z"
  },
  {
    id: 3,
    taskId: 5,
    taskTitle: "Image Classification for Autonomous Vehicles",
    clientId: 105,
    clientName: "AutoDrive AI",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=autodrive",
    agentId: 4,
    agentName: "David Kim",
    agentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    lastMessage: MOCK_MESSAGES[7], // Latest message in this conversation
    unreadCount: 1,
    totalMessages: 2,
    status: "active" as const,
    createdAt: "2024-02-08T09:00:00Z",
    updatedAt: "2024-02-08T10:30:00Z"
  }
]

// Helper functions for message data
export const messageHelpers = {
  getMessagesByTask: (taskId: number) =>
    MOCK_MESSAGES.filter(message => message.taskId === taskId),
  
  getMessagesByUser: (userId: number) =>
    MOCK_MESSAGES.filter(message => 
      message.senderId === userId || message.recipientId === userId
    ),
  
  getConversation: (taskId: number) =>
    MOCK_CONVERSATIONS.find(conversation => conversation.taskId === taskId),
  
  getConversationsByUser: (userId: number) =>
    MOCK_CONVERSATIONS.filter(conversation => 
      conversation.agentId === userId || conversation.clientId === userId
    ),
  
  getUnreadMessages: (userId: number) =>
    MOCK_MESSAGES.filter(message => 
      message.recipientId === userId && !message.read
    ),
  
  getUnreadCount: (userId: number) =>
    MOCK_MESSAGES.filter(message => 
      message.recipientId === userId && !message.read
    ).length,
  
  markAsRead: (messageId: number) => {
    const message = MOCK_MESSAGES.find(m => m.id === messageId)
    if (message) {
      message.read = true
      message.readAt = new Date().toISOString()
    }
  },
  
  markConversationAsRead: (taskId: number) => {
    const conversation = MOCK_CONVERSATIONS.find(c => c.taskId === taskId)
    if (conversation) {
      conversation.unreadCount = 0
      MOCK_MESSAGES.forEach(message => {
        if (message.taskId === taskId && !message.read) {
          message.read = true
          message.readAt = new Date().toISOString()
        }
      })
    }
  },
  
  sendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
    const newMessage: Message = {
      ...message,
      id: MOCK_MESSAGES.length + 1,
      timestamp: new Date().toISOString(),
      read: false
    }
    MOCK_MESSAGES.push(newMessage)
    
    // Update conversation
    const conversation = MOCK_CONVERSATIONS.find(c => c.taskId === message.taskId)
    if (conversation) {
      conversation.lastMessage = newMessage
      conversation.totalMessages += 1
      if (message.recipientId !== conversation.agentId) {
        conversation.unreadCount += 1
      }
      conversation.updatedAt = newMessage.timestamp
    }
    
    return newMessage
  },
  
  deleteMessage: (messageId: number) => {
    const index = MOCK_MESSAGES.findIndex(m => m.id === messageId)
    if (index !== -1) {
      const message = MOCK_MESSAGES[index]
      MOCK_MESSAGES.splice(index, 1)
      
      // Update conversation
      const conversation = MOCK_CONVERSATIONS.find(c => c.taskId === message.taskId)
      if (conversation) {
        conversation.totalMessages -= 1
        if (message.read === false && message.recipientId !== conversation.agentId) {
          conversation.unreadCount -= 1
        }
      }
    }
  },
  
  searchMessages: (userId: number, query: string) => {
    const searchLower = query.toLowerCase()
    return MOCK_MESSAGES.filter(message =>
      (message.senderId === userId || message.recipientId === userId) &&
      (
        message.content.toLowerCase().includes(searchLower) ||
        message.senderName.toLowerCase().includes(searchLower) ||
        message.recipientName.toLowerCase().includes(searchLower)
      )
    )
  }
}
