/**
 * Mock Data: Notifications
 * System notifications for users about tasks, payments, and platform updates
 */

export interface Notification {
  id: number
  userId: number
  type: 'task_assigned' | 'task_completed' | 'payment_received' | 'payment_sent' | 'task_reminder' | 'deadline_approaching' | 'system_update' | 'review_request' | 'message_received' | 'profile_verified' | 'task_disputed'
  title: string
  message: string
  description?: string
  timestamp: string
  read: boolean
  readAt?: string
  actionUrl?: string
  actionText?: string
  priority: 'low' | 'medium' | 'high'
  metadata?: {
    taskId?: number
    clientId?: number
    agentId?: number
    amount?: number
    deadline?: string
    [key: string]: any
  }
  expiresAt?: string
  category: 'tasks' | 'payments' | 'system' | 'messages' | 'profile'
}

export interface NotificationPreferences {
  userId: number
  emailNotifications: boolean
  pushNotifications: boolean
  taskReminders: boolean
  paymentAlerts: boolean
  marketingEmails: boolean
  weeklyDigest: boolean
  deadlineReminders: boolean
  messageNotifications: boolean
  systemUpdates: boolean
  quietHours: {
    enabled: boolean
    start: string
    end: string
  }
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    userId: 1,
    type: "task_assigned" as const,
    title: "New Task Assigned",
    message: "You have been assigned to 'Content Moderation for AI Assistant'",
    description: "TechCorp AI has assigned you to a content moderation task. Review the requirements and start working.",
    timestamp: "2024-02-06T09:00:00Z",
    read: false,
    actionUrl: "/dashboard/tasks/2",
    actionText: "View Task",
    priority: "high" as const,
    metadata: {
      taskId: 2,
      clientId: 102,
      deadline: "2024-02-20"
    },
    category: "tasks" as const
  },
  {
    id: 2,
    userId: 1,
    type: "payment_received" as const,
    title: "Payment Received",
    message: "You received $1,200 for completing 'Human-in-the-Loop for Medical AI'",
    description: "Payment for your medical AI validation work has been processed and deposited to your account.",
    timestamp: "2024-02-05T14:30:00Z",
    read: false,
    actionUrl: "/dashboard/earnings/1",
    actionText: "View Earnings",
    priority: "medium" as const,
    metadata: {
      taskId: 3,
      amount: 1200,
      clientId: 103
    },
    category: "payments" as const
  },
  {
    id: 3,
    userId: 1,
    type: "deadline_approaching" as const,
    title: "Task Deadline Reminder",
    message: "Task 'AI Model Training Data Validation' is due in 2 days",
    description: "Your data validation task is approaching its deadline. Ensure you complete all required work.",
    timestamp: "2024-02-06T08:00:00Z",
    read: true,
    readAt: "2024-02-06T08:15:00Z",
    actionUrl: "/dashboard/tasks/1",
    actionText: "View Task",
    priority: "high" as const,
    metadata: {
      taskId: 1,
      deadline: "2024-02-15"
    },
    category: "tasks" as const
  },
  {
    id: 4,
    userId: 1,
    type: "system_update" as const,
    title: "System Update",
    message: "New features have been added to the dashboard",
    description: "We've added new analytics and reporting features to help you track your performance better.",
    timestamp: "2024-02-04T16:00:00Z",
    read: true,
    readAt: "2024-02-04T16:30:00Z",
    actionUrl: "/dashboard",
    actionText: "View Dashboard",
    priority: "low" as const,
    category: "system" as const,
    expiresAt: "2024-02-18T16:00:00Z"
  },
  {
    id: 5,
    userId: 1,
    type: "review_request" as const,
    title: "Review Request",
    message: "Please rate your experience with 'MedTech Solutions'",
    description: "Your feedback helps us maintain quality and improve the platform.",
    timestamp: "2024-02-03T11:00:00Z",
    read: false,
    actionUrl: "/dashboard/tasks/3/review",
    actionText: "Leave Review",
    priority: "medium" as const,
    metadata: {
      taskId: 3,
      clientId: 103
    },
    category: "tasks" as const,
    expiresAt: "2024-02-17T11:00:00Z"
  },
  {
    id: 6,
    userId: 1,
    type: "message_received" as const,
    title: "New Message",
    message: "LegalTech Corp sent you a message about your task",
    description: "You have a new message regarding your legal document review task.",
    timestamp: "2024-02-02T13:45:00Z",
    read: true,
    readAt: "2024-02-02T14:00:00Z",
    actionUrl: "/dashboard/messages/6",
    actionText: "View Message",
    priority: "medium" as const,
    metadata: {
      taskId: 6,
      clientId: 106
    },
    category: "messages" as const
  },
  {
    id: 7,
    userId: 1,
    type: "profile_verified" as const,
    title: "Profile Verified",
    message: "Your profile has been verified and is now marked as trusted",
    description: "Congratulations! Your verification documents have been approved.",
    timestamp: "2024-01-30T10:00:00Z",
    read: true,
    readAt: "2024-01-30T10:30:00Z",
    actionUrl: "/dashboard/profile",
    actionText: "View Profile",
    priority: "low" as const,
    category: "profile" as const
  },
  {
    id: 8,
    userId: 1,
    type: "task_reminder" as const,
    title: "Daily Task Reminder",
    message: "You have 2 tasks that need attention today",
    description: "Check your active tasks and update progress.",
    timestamp: "2024-02-06T07:00:00Z",
    read: false,
    actionUrl: "/dashboard/tasks",
    actionText: "View Tasks",
    priority: "medium" as const,
    category: "tasks" as const,
    expiresAt: "2024-02-06T23:59:59Z"
  }
]

export const MOCK_NOTIFICATION_PREFERENCES: NotificationPreferences[] = [
  {
    userId: 1,
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    paymentAlerts: true,
    marketingEmails: false,
    weeklyDigest: true,
    deadlineReminders: true,
    messageNotifications: true,
    systemUpdates: true,
    quietHours: {
      enabled: false,
      start: "22:00",
      end: "08:00"
    }
  }
]

// Helper functions for notification data
export const notificationHelpers = {
  getNotificationsByUser: (userId: number) =>
    MOCK_NOTIFICATIONS.filter(notification => notification.userId === userId),
  
  getUnreadNotifications: (userId: number) =>
    MOCK_NOTIFICATIONS.filter(notification => 
      notification.userId === userId && !notification.read
    ),
  
  getNotificationsByType: (type: string) =>
    MOCK_NOTIFICATIONS.filter(notification => notification.type === type),
  
  getNotificationsByCategory: (category: string) =>
    MOCK_NOTIFICATIONS.filter(notification => notification.category === category),
  
  getHighPriorityNotifications: (userId: number) =>
    MOCK_NOTIFICATIONS.filter(notification => 
      notification.userId === userId && 
      notification.priority === 'high' && 
      !notification.read
    ),
  
  getExpiredNotifications: () => {
    const now = new Date()
    return MOCK_NOTIFICATIONS.filter(notification => 
      notification.expiresAt && 
      new Date(notification.expiresAt) < now
    )
  },
  
  markAsRead: (notificationId: number) => {
    const notification = MOCK_NOTIFICATIONS.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
      notification.readAt = new Date().toISOString()
    }
  },
  
  markAllAsRead: (userId: number) => {
    MOCK_NOTIFICATIONS.forEach(notification => {
      if (notification.userId === userId && !notification.read) {
        notification.read = true
        notification.readAt = new Date().toISOString()
      }
    })
  },
  
  deleteNotification: (notificationId: number) => {
    const index = MOCK_NOTIFICATIONS.findIndex(n => n.id === notificationId)
    if (index !== -1) {
      MOCK_NOTIFICATIONS.splice(index, 1)
    }
  },
  
  getNotificationCount: (userId: number, unreadOnly: boolean = false) => {
    return MOCK_NOTIFICATIONS.filter(notification => 
      notification.userId === userId && 
      (unreadOnly ? !notification.read : true)
    ).length
  },
  
  getRecentNotifications: (userId: number, limit: number = 10) => {
    return MOCK_NOTIFICATIONS
      .filter(notification => notification.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
  }
}
