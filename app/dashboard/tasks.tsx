'use client'

import { useState } from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import Tabs from '../components/Tabs'
import { Briefcase, Clock, DollarSign, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'

const mockTasks = [
  {
    id: 1,
    title: "AI Model Training Data Validation",
    client: "TechCorp AI",
    status: "in_progress",
    deadline: "2024-02-15",
    budget: 500,
    progress: 65,
    priority: "high",
    description: "Review and validate training data for new language model",
    skills: ["Data Annotation", "Quality Assurance"]
  },
  {
    id: 2,
    title: "Content Moderation for AI Assistant",
    client: "ChatAI Inc", 
    status: "completed",
    deadline: "2024-02-10",
    budget: 300,
    progress: 100,
    priority: "medium",
    description: "Review AI-generated responses for accuracy and safety",
    skills: ["Content Review", "Policy Enforcement"]
  },
  {
    id: 3,
    title: "Customer Service AI Training",
    client: "SupportBot Co",
    status: "pending",
    deadline: "2024-02-25",
    budget: 450,
    progress: 0,
    priority: "low",
    description: "Provide real conversation examples for AI training",
    skills: ["Customer Service", "Communication"]
  },
  {
    id: 4,
    title: "Image Classification for Autonomous Vehicles",
    client: "AutoDrive AI",
    status: "in_progress",
    deadline: "2024-02-18",
    budget: 800,
    progress: 30,
    priority: "medium",
    description: "Classify and label road scenarios from dashcam footage",
    skills: ["Image Recognition", "Transportation Knowledge"]
  }
]

const ActiveTasks = () => (
  <div className="space-y-6">
    <div className="grid gap-4">
      {mockTasks.filter(task => task.status === 'in_progress').map(task => (
        <div key={task.id} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{task.title}</h3>
              <p className="text-sm text-muted-foreground">Client: {task.client}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.priority} priority
              </span>
              <span className="text-sm text-muted-foreground">
                Due: {task.deadline}
              </span>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4">{task.description}</p>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>${task.budget}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{task.deadline}</span>
              </div>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const CompletedTasks = () => (
  <div className="space-y-6">
    <div className="grid gap-4">
      {mockTasks.filter(task => task.status === 'completed').map(task => (
        <div key={task.id} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{task.title}</h3>
              <p className="text-sm text-muted-foreground">Client: {task.client}</p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-600">Completed</span>
              <span className="text-sm text-muted-foreground">
                {task.deadline}
              </span>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4">{task.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>${task.budget}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Briefcase className="w-4 h-4" />
                <span>{task.skills.join(', ')}</span>
              </div>
            </div>
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const PendingTasks = () => (
  <div className="space-y-6">
    <div className="grid gap-4">
      {mockTasks.filter(task => task.status === 'pending').map(task => (
        <div key={task.id} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{task.title}</h3>
              <p className="text-sm text-muted-foreground">Client: {task.client}</p>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-yellow-600">Pending</span>
              <span className="text-sm text-muted-foreground">
                Due: {task.deadline}
              </span>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4">{task.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>${task.budget}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Briefcase className="w-4 h-4" />
                <span>{task.skills.join(', ')}</span>
              </div>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Start Task
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default function TasksPage() {
  const tabs = [
    {
      id: 'active',
      label: 'Active Tasks',
      content: <ActiveTasks />
    },
    {
      id: 'completed',
      label: 'Completed Tasks',
      content: <CompletedTasks />
    },
    {
      id: 'pending',
      label: 'Pending Tasks',
      content: <PendingTasks />
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Tasks
            </h1>
            <p className="text-muted-foreground">
              Manage your active, completed, and pending tasks.
            </p>
          </div>

          <Tabs tabs={tabs} defaultTab="active" />
        </main>
      </div>
    </div>
  )
}
