/**
 * Mock Data Index
 * Central export point for all mock data and helper functions
 */

// Import all mock data and types directly
import { MOCK_AGENTS, type Agent } from './agents'
import { MOCK_CLIENTS, type Client } from './clients'
import { MOCK_TASKS, type Task } from './tasks'
import { MOCK_EARNINGS, type Earning } from './earnings'
import { MOCK_NOTIFICATIONS, type Notification } from './notifications'
import { MOCK_MESSAGES, type Message } from './messages'

// Export all mock data
export { MOCK_AGENTS, MOCK_CLIENTS, MOCK_TASKS, MOCK_EARNINGS, MOCK_NOTIFICATIONS, MOCK_MESSAGES }

// Export types
export type { Agent, Client, Task, Earning, Notification, Message }

// Combined helper functions for easy database replacement
export const mockApi = {
  // User operations
  getUsers: async (filters: any = {}) => {
    await new Promise(resolve => setTimeout(resolve, 100))
    return MOCK_AGENTS.filter((user: Agent) => {
      if (filters.role && !user.role.toLowerCase().includes(filters.role.toLowerCase())) {
        return false
      }
      if (filters.availability && user.availability !== filters.availability) {
        return false
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        return !(
          user.name.toLowerCase().includes(searchLower) ||
          user.role.toLowerCase().includes(searchLower) ||
          user.location.toLowerCase().includes(searchLower) ||
          user.skills.some((skill: string) => skill.toLowerCase().includes(searchLower))
        )
      }
      return true
    })
  },

  // Task operations
  getTasks: async (filters: any = {}) => {
    await new Promise(resolve => setTimeout(resolve, 100))
    return MOCK_TASKS.filter((task: Task) => {
      if (filters.status && task.status !== filters.status) {
        return false
      }
      if (filters.category && task.category !== filters.category) {
        return false
      }
      if (filters.urgency && task.urgency !== filters.urgency) {
        return false
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        return !(
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower) ||
          task.skills.some((skill: string) => skill.toLowerCase().includes(searchLower))
        )
      }
      return true
    })
  },

  // Earnings operations
  getEarnings: async (userId: number) => {
    await new Promise(resolve => setTimeout(resolve, 100))
    return MOCK_EARNINGS.filter((earning: Earning) => earning.agentId === userId)
  },

  // Notification operations
  getNotifications: async (userId: number) => {
    await new Promise(resolve => setTimeout(resolve, 100))
    return MOCK_NOTIFICATIONS.filter((notif: Notification) => !notif.read)
  },

  // Message operations
  getMessages: async (userId: number, taskId?: number) => {
    await new Promise(resolve => setTimeout(resolve, 100))
    return MOCK_MESSAGES.filter((msg: Message) => 
      (msg.senderId === userId || msg.recipientId === userId) && 
      (!taskId || msg.taskId === taskId)
    )
  },

  // Client operations
  getClients: async (filters: any = {}) => {
    await new Promise(resolve => setTimeout(resolve, 100))
    return MOCK_CLIENTS.filter((client: Client) => {
      if (filters.industry && !client.industry.toLowerCase().includes(filters.industry.toLowerCase())) {
        return false
      }
      if (filters.verified && client.verified !== filters.verified) {
        return false
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        return !(
          client.name.toLowerCase().includes(searchLower) ||
          client.company.toLowerCase().includes(searchLower) ||
          client.industry.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
  }
}

// Database schema for reference
export const DATABASE_SCHEMA = {
  agents: {
    table: 'agents',
    fields: [
      'id', 'name', 'role', 'avatar', 'rating', 'reviews',
      'location', 'hourlyRate', 'skills', 'availability',
      'completedTasks', 'responseTime', 'bio', 'joinedDate',
      'languages', 'verificationStatus', 'averageResponseTime',
      'successRate', 'lastActive'
    ]
  },
  clients: {
    table: 'clients',
    fields: [
      'id', 'name', 'email', 'company', 'avatar', 'verified',
      'joinedDate', 'totalSpent', 'tasksPosted', 'industry',
      'website', 'description', 'companySize', 'paymentMethod',
      'averageTaskBudget', 'completionRate', 'rating', 'location', 'timezone'
    ]
  },
  tasks: {
    table: 'tasks',
    fields: [
      'id', 'title', 'description', 'category', 'budget', 'deadline',
      'location', 'applicants', 'status', 'postedBy', 'postedDate',
      'skills', 'urgency', 'clientId', 'assignedAgentId', 'progress',
      'requirements', 'deliverables', 'estimatedHours', 'complexity',
      'tags', 'attachments', 'milestones', 'clientRating', 'agentRating',
      'completedDate', 'paymentStatus'
    ]
  },
  earnings: {
    table: 'earnings',
    fields: [
      'id', 'taskId', 'taskTitle', 'clientId', 'clientName',
      'agentId', 'agentName', 'amount', 'status', 'date',
      'description', 'payoutDate', 'invoiceUrl', 'paymentMethod',
      'fees', 'taxInfo', 'workHours', 'hourlyRate',
      'bonus', 'performanceRating'
    ]
  },
  notifications: {
    table: 'notifications',
    fields: [
      'id', 'userId', 'type', 'title', 'message', 'description',
      'timestamp', 'read', 'readAt', 'actionUrl', 'actionText',
      'priority', 'metadata', 'expiresAt', 'category'
    ]
  },
  messages: {
    table: 'messages',
    fields: [
      'id', 'taskId', 'senderId', 'senderName', 'senderAvatar',
      'recipientId', 'recipientName', 'recipientAvatar', 'content',
      'timestamp', 'isFromClient', 'read', 'readAt', 'type',
      'attachments', 'replyTo', 'edited', 'editedAt', 'deleted',
      'deletedAt', 'metadata'
    ]
  }
}

// Migration helpers for database setup
export const createMigrationSQL = () => {
  return `
-- Create agents table
CREATE TABLE agents (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  avatar VARCHAR(500),
  rating DECIMAL(3,2) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  location VARCHAR(255),
  hourlyRate DECIMAL(10,2),
  skills TEXT[],
  availability VARCHAR(20) DEFAULT 'offline',
  completedTasks INTEGER DEFAULT 0,
  responseTime VARCHAR(50),
  bio TEXT,
  joinedDate DATE,
  languages TEXT[],
  verificationStatus VARCHAR(20) DEFAULT 'unverified',
  averageResponseTime DECIMAL(5,2),
  successRate DECIMAL(5,2),
  lastActive TIMESTAMP
);

-- Create clients table
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  company VARCHAR(255) NOT NULL,
  avatar VARCHAR(500),
  verified BOOLEAN DEFAULT FALSE,
  joinedDate DATE,
  totalSpent DECIMAL(12,2) DEFAULT 0,
  tasksPosted INTEGER DEFAULT 0,
  industry VARCHAR(255),
  website VARCHAR(500),
  description TEXT,
  companySize VARCHAR(20) DEFAULT 'startup',
  paymentMethod VARCHAR(20) DEFAULT 'card',
  averageTaskBudget DECIMAL(10,2),
  completionRate DECIMAL(5,2),
  rating DECIMAL(3,2),
  location VARCHAR(255),
  timezone VARCHAR(50)
);

-- Create tasks table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  budget DECIMAL(10,2) NOT NULL,
  deadline DATE,
  location VARCHAR(255),
  applicants INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'open',
  postedBy VARCHAR(255) NOT NULL,
  postedDate DATE,
  skills TEXT[],
  urgency VARCHAR(10) DEFAULT 'medium',
  clientId INTEGER REFERENCES clients(id),
  assignedAgentId INTEGER REFERENCES agents(id),
  progress INTEGER DEFAULT 0,
  requirements TEXT[],
  deliverables TEXT[],
  estimatedHours INTEGER,
  complexity VARCHAR(10) DEFAULT 'moderate',
  tags TEXT[],
  attachments JSONB,
  milestones JSONB,
  clientRating DECIMAL(3,2),
  agentRating DECIMAL(3,2),
  completedDate DATE,
  paymentStatus VARCHAR(20) DEFAULT 'pending'
);

-- Create earnings table
CREATE TABLE earnings (
  id SERIAL PRIMARY KEY,
  taskId INTEGER REFERENCES tasks(id),
  taskTitle VARCHAR(500),
  clientId INTEGER REFERENCES clients(id),
  clientName VARCHAR(255),
  agentId INTEGER REFERENCES agents(id),
  agentName VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  date DATE,
  description TEXT,
  payoutDate DATE,
  invoiceUrl VARCHAR(500),
  paymentMethod VARCHAR(50),
  fees JSONB,
  taxInfo JSONB,
  workHours DECIMAL(5,2),
  hourlyRate DECIMAL(10,2),
  bonus DECIMAL(10,2),
  performanceRating DECIMAL(3,2)
);

-- Create notifications table
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  userId INTEGER,
  type VARCHAR(50),
  title VARCHAR(255) NOT NULL,
  message TEXT,
  description TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read BOOLEAN DEFAULT FALSE,
  readAt TIMESTAMP,
  actionUrl VARCHAR(500),
  actionText VARCHAR(100),
  priority VARCHAR(10) DEFAULT 'medium',
  metadata JSONB,
  expiresAt TIMESTAMP,
  category VARCHAR(20)
);

-- Create messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  taskId INTEGER REFERENCES tasks(id),
  senderId INTEGER,
  senderName VARCHAR(255),
  senderAvatar VARCHAR(500),
  recipientId INTEGER,
  recipientName VARCHAR(255),
  recipientAvatar VARCHAR(500),
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  isFromClient BOOLEAN,
  read BOOLEAN DEFAULT FALSE,
  readAt TIMESTAMP,
  type VARCHAR(20) DEFAULT 'text',
  attachments JSONB,
  replyTo INTEGER REFERENCES messages(id),
  edited BOOLEAN DEFAULT FALSE,
  editedAt TIMESTAMP,
  deleted BOOLEAN DEFAULT FALSE,
  deletedAt TIMESTAMP,
  metadata JSONB
);

-- Create indexes for performance
CREATE INDEX idx_agents_availability ON agents(availability);
CREATE INDEX idx_agents_rating ON agents(rating DESC);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_client ON tasks(clientId);
CREATE INDEX idx_tasks_agent ON tasks(assignedAgentId);
CREATE INDEX idx_tasks_deadline ON tasks(deadline);
CREATE INDEX idx_earnings_agent ON earnings(agentId);
CREATE INDEX idx_earnings_status ON earnings(status);
CREATE INDEX idx_notifications_user ON notifications(userId);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_messages_task ON messages(taskId);
CREATE INDEX idx_messages_recipient ON messages(recipientId);
  `
}
