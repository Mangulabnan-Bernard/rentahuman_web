'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProfileCard from '../components/ProfileCard'
import { Search, Filter, MapPin, DollarSign, Star } from 'lucide-react'

const dummyAgents = [
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

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 })
  const [availability, setAvailability] = useState<string>('all')
  const [sortBy, setSortBy] = useState('rating')

  const allSkills = Array.from(
    new Set(dummyAgents.flatMap(agent => agent.skills))
  ).sort()

  const filteredAgents = dummyAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.some(skill => agent.skills.includes(skill))
    
    const matchesPrice = agent.hourlyRate >= priceRange.min && agent.hourlyRate <= priceRange.max
    
    const matchesAvailability = availability === 'all' || agent.availability === availability

    return matchesSearch && matchesSkills && matchesPrice && matchesAvailability
  })

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'price-low':
        return a.hourlyRate - b.hourlyRate
      case 'price-high':
        return b.hourlyRate - a.hourlyRate
      case 'completed':
        return b.completedTasks - a.completedTasks
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Browse Human Agents
          </h1>
          <p className="text-muted-foreground">
            Find skilled professionals to assist with your AI workflows
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                <Filter className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search agents, skills..."
                      className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Skills
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {allSkills.map(skill => (
                      <label key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSkills([...selectedSkills, skill])
                            } else {
                              setSelectedSkills(selectedSkills.filter(s => s !== skill))
                            }
                          }}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span className="ml-2 text-sm text-foreground">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Hourly Rate: ${priceRange.min} - ${priceRange.max}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Availability
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="completed">Most Tasks Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                {sortedAgents.length} agent{sortedAgents.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {sortedAgents.map(agent => (
                <ProfileCard key={agent.id} {...agent} />
              ))}
            </div>

            {sortedAgents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No agents found matching your criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedSkills([])
                    setPriceRange({ min: 0, max: 200 })
                    setAvailability('all')
                  }}
                  className="text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
