'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { MOCK_AGENTS, MOCK_TASKS, type Agent, type Task } from '../../mock'
import { CheckCircle, Clock, DollarSign, Calendar, FileText, AlertCircle, ArrowRight } from 'lucide-react'

export default function HirePage() {
  const params = useParams()
  const router = useRouter()
  const agentId = parseInt(params.id as string)
  
  const agent = MOCK_AGENTS.find((a: Agent) => a.id === agentId)
  const availableTasks = MOCK_TASKS.filter(task => task.status === 'open')
  
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [projectDetails, setProjectDetails] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    requirements: ''
  })
  
  if (!agent) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">Agent Not Found</h1>
            <p className="text-muted-foreground mb-6">The agent you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/browse')}
              className="bg-primary text-primary-foreground py-2 px-6 rounded-md hover:bg-primary/90 transition-colors"
            >
              Browse Agents
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (agent.availability !== 'available') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Agent Currently Unavailable</h2>
            </div>
            <p className="text-yellow-700 dark:text-yellow-300 mb-4">
              {agent.name} is currently {agent.availability}. Please check back later or choose another available agent.
            </p>
            <button
              onClick={() => router.push('/browse')}
              className="bg-primary text-primary-foreground py-2 px-6 rounded-md hover:bg-primary/90 transition-colors"
            >
              Browse Available Agents
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedTaskId) {
      alert('Please select a task or create a custom project')
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate hiring process
    setTimeout(() => {
      setIsSubmitting(false)
      router.push('/dashboard/tasks')
    }, 2000)
  }

  const selectedTask = selectedTaskId ? MOCK_TASKS.find(t => t.id === selectedTaskId) : null

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Agent Info */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Hire {agent.name}</h2>
              
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground">{agent.role}</p>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    <span className="text-sm text-green-600">Available</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <DollarSign className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-semibold">${agent.hourlyRate}/hour</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Response time: {agent.responseTime}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>{agent.completedTasks} tasks completed</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Member since {new Date(agent.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="font-semibold text-foreground mb-2">Top Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {agent.skills.slice(0, 6).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Task Selection */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Select Task</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Choose an existing task or create custom project
                  </label>
                  <select
                    value={selectedTaskId || ''}
                    onChange={(e) => setSelectedTaskId(e.target.value ? parseInt(e.target.value) : null)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a task...</option>
                    {availableTasks.map(task => (
                      <option key={task.id} value={task.id}>
                        {task.title} - ${task.budget}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedTask && (
                  <div className="mt-4 p-4 bg-secondary/20 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">{selectedTask.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{selectedTask.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Budget:</span>
                        <span>${selectedTask.budget}</span>
                      </div>
                      <div>
                        <span className="font-medium">Deadline:</span>
                        <span>{selectedTask.deadline}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Custom Project</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={projectDetails.title}
                      onChange={(e) => setProjectDetails({...projectDetails, title: e.target.value})}
                      placeholder="Enter project title"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Project Description
                    </label>
                    <textarea
                      value={projectDetails.description}
                      onChange={(e) => setProjectDetails({...projectDetails, description: e.target.value})}
                      placeholder="Describe your project requirements"
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Budget ($)
                      </label>
                      <input
                        type="number"
                        value={projectDetails.budget}
                        onChange={(e) => setProjectDetails({...projectDetails, budget: e.target.value})}
                        placeholder="Enter budget"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Deadline
                      </label>
                      <input
                        type="date"
                        value={projectDetails.deadline}
                        onChange={(e) => setProjectDetails({...projectDetails, deadline: e.target.value})}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Requirements
                    </label>
                    <textarea
                      value={projectDetails.requirements}
                      onChange={(e) => setProjectDetails({...projectDetails, requirements: e.target.value})}
                      placeholder="List specific requirements"
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Send Hiring Request
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Hiring Summary</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Selected Agent:</span>
                    <span className="font-semibold">{agent.name}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Hourly Rate:</span>
                    <span className="font-semibold">${agent.hourlyRate}/hr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Est. Duration:</span>
                    <span className="font-semibold">25 hours</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm font-medium">Est. Total:</span>
                    <span className="text-lg font-bold text-primary">${(agent.hourlyRate * 25).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  What Happens Next?
                </h4>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <li>• Agent receives your hiring request</li>
                  <li>• You'll be notified when agent accepts</li>
                  <li>• Project appears in your dashboard</li>
                  <li>• Communication channel opens</li>
                  <li>• Payment held in escrow until completion</li>
                </ul>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full flex items-center justify-center bg-muted text-muted-foreground py-2 px-4 rounded-md hover:bg-muted/90 transition-colors"
                >
                  View Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
