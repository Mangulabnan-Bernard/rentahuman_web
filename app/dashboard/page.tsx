'use client'

import { useState } from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import Tabs from '../components/Tabs'
import { 
  DollarSign, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Calendar,
  BarChart3,
  Activity
} from 'lucide-react'

const DashboardOverview = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Earnings</p>
            <p className="text-2xl font-bold text-foreground">$4,250</p>
            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-lg">
            <DollarSign className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Active Tasks</p>
            <p className="text-2xl font-bold text-foreground">8</p>
            <p className="text-xs text-muted-foreground mt-1">3 due this week</p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
            <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Completed Tasks</p>
            <p className="text-2xl font-bold text-foreground">47</p>
            <p className="text-xs text-green-600 mt-1">98% success rate</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Client Rating</p>
            <p className="text-2xl font-bold text-foreground">4.9</p>
            <p className="text-xs text-muted-foreground mt-1">Based on 47 reviews</p>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Task completed: AI Model Training</p>
              <p className="text-xs text-muted-foreground">2 hours ago • $150 earned</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
              <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">New task assigned: Content Moderation</p>
              <p className="text-xs text-muted-foreground">5 hours ago • Due in 3 days</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
              <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Task deadline approaching</p>
              <p className="text-xs text-muted-foreground">1 day ago • Data Validation task</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Deadlines</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">AI Model Training Data Validation</p>
              <p className="text-xs text-muted-foreground">Client: TechCorp AI</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-red-600">Tomorrow</p>
              <p className="text-xs text-muted-foreground">$500</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Content Moderation Review</p>
              <p className="text-xs text-muted-foreground">Client: ChatAI Inc</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-yellow-600">In 3 days</p>
              <p className="text-xs text-muted-foreground">$300</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Customer Service AI Training</p>
              <p className="text-xs text-muted-foreground">Client: SupportBot Co</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">In 5 days</p>
              <p className="text-xs text-muted-foreground">$450</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const PerformanceChart = () => (
  <div className="bg-card border border-border rounded-lg p-6">
    <h3 className="text-lg font-semibold text-foreground mb-4">Performance Overview</h3>
    <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
      <div className="text-center">
        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">Performance charts coming soon</p>
      </div>
    </div>
  </div>
)

const QuickActions = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <button className="bg-primary text-primary-foreground p-4 rounded-lg hover:bg-primary/90 transition-colors">
      <Briefcase className="w-6 h-6 mb-2" />
      <p className="font-medium">Browse Tasks</p>
    </button>
    <button className="bg-secondary text-secondary-foreground p-4 rounded-lg hover:bg-secondary/90 transition-colors">
      <Calendar className="w-6 h-6 mb-2" />
      <p className="font-medium">View Calendar</p>
    </button>
    <button className="bg-accent text-accent-foreground p-4 rounded-lg hover:bg-accent/90 transition-colors">
      <Activity className="w-6 h-6 mb-2" />
      <p className="font-medium">View Analytics</p>
    </button>
  </div>
)

export default function DashboardPage() {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: <DashboardOverview />
    },
    {
      id: 'performance',
      label: 'Performance',
      content: <PerformanceChart />
    },
    {
      id: 'actions',
      label: 'Quick Actions',
      content: <QuickActions />
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, Sarah!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your tasks and earnings today.
            </p>
          </div>

          <Tabs tabs={tabs} defaultTab="overview" />
        </main>
      </div>
    </div>
  )
}
