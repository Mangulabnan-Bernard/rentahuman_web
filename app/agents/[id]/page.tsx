'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { MOCK_AGENTS, type Agent } from '../../mock'
import { Star, MapPin, Clock, CheckCircle, DollarSign, Mail, Calendar, Award, Languages, Shield } from 'lucide-react'

export default function AgentProfilePage() {
  const params = useParams()
  const router = useRouter()
  const agentId = parseInt(params.id as string)
  
  const agent = MOCK_AGENTS.find((a: Agent) => a.id === agentId)
  
  const [isHiring, setIsHiring] = useState(false)
  
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

  const handleHire = () => {
    setIsHiring(true)
    // Simulate hiring process
    setTimeout(() => {
      setIsHiring(false)
      router.push('/dashboard/tasks')
    }, 2000)
  }

  const getAvailabilityColor = () => {
    switch (agent.availability) {
      case 'available':
        return 'bg-green-500'
      case 'busy':
        return 'bg-yellow-500'
      case 'offline':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getAvailabilityText = () => {
    switch (agent.availability) {
      case 'available':
        return 'Available'
      case 'busy':
        return 'Busy'
      case 'offline':
        return 'Offline'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full ${getAvailabilityColor()} border-2 border-card`}></div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{agent.name}</h1>
                    <p className="text-muted-foreground">{agent.role}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-primary font-semibold text-lg mb-2">
                      <DollarSign className="w-6 h-6 mr-2" />
                      ${agent.hourlyRate}/hr
                    </div>
                    <p className="text-sm text-muted-foreground">Hourly Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-primary font-semibold text-lg mb-2">
                      <Star className="w-6 h-6 mr-2 text-yellow-500 fill-current" />
                      {agent.rating}
                    </div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {agent.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    Avg response: {agent.responseTime}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {agent.completedTasks} tasks completed
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">About</h3>
                  <p className="text-muted-foreground leading-relaxed">{agent.bio}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.languages.map((language, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Verification Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm text-foreground">
                    {agent.verificationStatus === 'verified' ? 'Verified Professional' : 'Verification Pending'}
                  </span>
                </div>
                <div className="flex items-center">
                  <Languages className="w-4 h-4 mr-2" />
                  <span className="text-sm text-muted-foreground">
                    {agent.languages.length} languages spoken
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Member since {new Date(agent.joinedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    {agent.successRate}% success rate
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/messages/${agent.id}`)}
                  className="w-full flex items-center justify-center bg-secondary text-secondary-foreground py-3 px-4 rounded-md hover:bg-secondary/90 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </button>
                
                <button
                  onClick={handleHire}
                  disabled={isHiring || agent.availability !== 'available'}
                  className="w-full flex items-center justify-center bg-primary text-primary-foreground py-3 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isHiring ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent animate-spin"></div>
                      Hiring...
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4 mr-2" />
                      Hire Now
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Performance Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Earnings</span>
                  <span className="text-sm font-semibold text-foreground">
                    ${(agent.completedTasks * agent.hourlyRate * 0.8).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Project Value</span>
                  <span className="text-sm font-semibold text-foreground">
                    ${(agent.hourlyRate * 25).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Response Rate</span>
                  <span className="text-sm font-semibold text-foreground">
                    {agent.averageResponseTime}h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
