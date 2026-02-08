'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RouteGuard from '../components/RouteGuard'
import { authUtils, UserRole } from '../utils/auth'
import { MOCK_AGENTS, MOCK_CLIENTS, MOCK_TASKS, MOCK_EARNINGS } from '../mock'
import { 
  Users, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Settings
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    totalRevenue: 0,
    activeDisputes: 0,
    pendingVerifications: 0
  })

  useEffect(() => {
    const user = authUtils.getCurrentUser()
    if (!user || user.role !== 'admin') {
      router.push('/unauthorized')
      return
    }

    // Calculate admin stats
    setStats({
      totalUsers: MOCK_AGENTS.length + MOCK_CLIENTS.length,
      totalTasks: MOCK_TASKS.length,
      totalRevenue: MOCK_EARNINGS.reduce((sum, earning) => sum + earning.amount, 0),
      activeDisputes: 2, // Mock data
      pendingVerifications: MOCK_AGENTS.filter((agent: any) => agent.verificationStatus === 'pending').length
    })
  }, [router])

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Total Users</h3>
          <Users className="w-8 h-8 text-primary" />
        </div>
        <p className="text-3xl font-bold text-primary">{stats.totalUsers}</p>
        <p className="text-sm text-muted-foreground">Agents + Clients</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Total Tasks</h3>
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <p className="text-3xl font-bold text-primary">{stats.totalTasks}</p>
        <p className="text-sm text-muted-foreground">All platform tasks</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Total Revenue</h3>
          <DollarSign className="w-8 h-8 text-green-600" />
        </div>
        <p className="text-3xl font-bold text-green-600">${stats.totalRevenue.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">Platform earnings</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Active Disputes</h3>
          <AlertTriangle className="w-8 h-8 text-yellow-600" />
        </div>
        <p className="text-3xl font-bold text-yellow-600">{stats.activeDisputes}</p>
        <p className="text-sm text-muted-foreground">Need attention</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Pending Verifications</h3>
          <CheckCircle className="w-8 h-8 text-blue-600" />
        </div>
        <p className="text-3xl font-bold text-blue-600">{stats.pendingVerifications}</p>
        <p className="text-sm text-muted-foreground">Agent verifications</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Growth Rate</h3>
          <TrendingUp className="w-8 h-8 text-green-600" />
        </div>
        <p className="text-3xl font-bold text-green-600">+24%</p>
        <p className="text-sm text-muted-foreground">Monthly growth</p>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">User Management</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Recent Agents</h4>
            <div className="space-y-3">
              {MOCK_AGENTS.slice(0, 5).map((agent: any) => (
                <div key={agent.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={agent.avatar} 
                      alt={agent.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">{agent.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded ${
                      agent.verificationStatus === 'verified' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {agent.verificationStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Recent Clients</h4>
            <div className="space-y-3">
              {MOCK_CLIENTS.slice(0, 5).map(client => (
                <div key={client.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded">
                  <div>
                    <p className="font-medium text-foreground">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.company}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">Task Management</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Task Statistics</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Open Tasks:</span>
                <span className="font-semibold">{MOCK_TASKS.filter(t => t.status === 'open').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">In Progress:</span>
                <span className="font-semibold">{MOCK_TASKS.filter(t => t.status === 'in_progress').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completed:</span>
                <span className="font-semibold">{MOCK_TASKS.filter(t => t.status === 'completed').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Disputed:</span>
                <span className="font-semibold text-yellow-600">{MOCK_TASKS.filter(t => t.status === 'disputed').length}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Recent Tasks</h4>
            <div className="space-y-3">
              {MOCK_TASKS.slice(0, 5).map(task => (
                <div key={task.id} className="p-3 bg-secondary/20 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-foreground">{task.title}</h5>
                    <span className={`px-2 py-1 text-xs rounded ${
                      task.status === 'open' ? 'bg-blue-100 text-blue-800' :
                      task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Budget: ${task.budget}</span>
                    <span className="text-muted-foreground">Client: {task.postedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEarnings = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">Financial Overview</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Revenue Breakdown</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform Fees:</span>
                <span className="font-semibold">
                  ${MOCK_EARNINGS.reduce((sum, e) => sum + e.fees.platformFee, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processing Fees:</span>
                <span className="font-semibold">
                  ${MOCK_EARNINGS.reduce((sum, e) => sum + e.fees.processingFee, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Fees:</span>
                <span className="font-semibold text-green-600">
                  ${MOCK_EARNINGS.reduce((sum, e) => sum + e.fees.total, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-foreground mb-4">Recent Transactions</h4>
            <div className="space-y-3">
              {MOCK_EARNINGS.slice(0, 5).map(earning => (
                <div key={earning.id} className="p-3 bg-secondary/20 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-foreground">{earning.taskTitle}</h5>
                    <span className={`px-2 py-1 text-xs rounded ${
                      earning.status === 'paid_out' ? 'bg-green-100 text-green-800' :
                      earning.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {earning.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount: ${earning.amount}</span>
                    <span className="text-muted-foreground">Agent: {earning.agentName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDisputes = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">Dispute Management</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Task #123 - Quality Dispute</h4>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Active</span>
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
              Client claims delivered work does not meet quality standards specified in task requirements.
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Agent: Sarah Chen</span>
              <span className="text-muted-foreground">Client: TechCorp AI</span>
            </div>
            <div className="flex space-x-2 mt-3">
              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                Resolve in Favor of Agent
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                Resolve in Favor of Client
              </button>
              <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                Split 50/50
              </button>
            </div>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-red-800 dark:text-red-200">Task #456 - Payment Dispute</h4>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Escalated</span>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300 mb-3">
              Agent claims additional work was performed beyond original scope.
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Agent: Marcus Johnson</span>
              <span className="text-muted-foreground">Client: DataFlow Inc</span>
            </div>
            <div className="flex space-x-2 mt-3">
              <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                Review Evidence
              </button>
              <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700">
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'tasks', label: 'Tasks', icon: FileText },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'disputes', label: 'Disputes', icon: AlertTriangle }
  ]

  return (
    <RouteGuard requiredRole="admin">
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage platform operations and user activities</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Admin Panel</h3>
                <nav className="space-y-2">
                  {tabs.map(tab => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-accent'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'users' && renderUsers()}
              {activeTab === 'tasks' && renderTasks()}
              {activeTab === 'earnings' && renderEarnings()}
              {activeTab === 'disputes' && renderDisputes()}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </RouteGuard>
  )
}
