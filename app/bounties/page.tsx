'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TaskCard from '../components/TaskCard'
import { Search, Filter, Briefcase, Clock, DollarSign, MapPin } from 'lucide-react'

const dummyTasks = [
  {
    id: 1,
    title: "AI Model Training Data Validation",
    description: "Need experienced data validators to review and correct training data for a new language model. The task involves verifying the accuracy of labeled data and ensuring consistency across the dataset.",
    category: "Data Validation",
    budget: 500,
    deadline: "2024-02-15",
    location: "Remote",
    applicants: 12,
    status: "open" as const,
    postedBy: "TechCorp AI",
    postedDate: "2 days ago",
    skills: ["Data Annotation", "Quality Assurance", "Machine Learning", "Attention to Detail"],
    urgency: "high" as const
  },
  {
    id: 2,
    title: "Content Moderation for AI Assistant",
    description: "Looking for content moderators to review AI-generated responses for accuracy, safety, and appropriateness. This is an ongoing project with flexible hours.",
    category: "Content Moderation",
    budget: 300,
    deadline: "2024-02-20",
    location: "Remote",
    applicants: 8,
    status: "open" as const,
    postedBy: "ChatAI Inc",
    postedDate: "1 week ago",
    skills: ["Content Review", "Policy Enforcement", "Critical Thinking", "Communication"],
    urgency: "medium" as const
  },
  {
    id: 3,
    title: "Human-in-the-Loop for Medical AI",
    description: "Medical professionals needed to validate AI diagnoses and provide expert feedback on medical imaging analysis. Requires relevant medical background.",
    category: "Healthcare AI",
    budget: 1200,
    deadline: "2024-02-10",
    location: "New York, NY",
    applicants: 5,
    status: "in_progress" as const,
    postedBy: "MedTech Solutions",
    postedDate: "3 days ago",
    skills: ["Medical Knowledge", "Radiology", "AI Validation", "Healthcare"],
    urgency: "high" as const
  },
  {
    id: 4,
    title: "Customer Service AI Training",
    description: "Help train customer service AI by providing real conversation examples and feedback on response quality. Previous customer service experience preferred.",
    category: "AI Training",
    budget: 450,
    deadline: "2024-02-25",
    location: "Remote",
    applicants: 18,
    status: "open" as const,
    postedBy: "SupportBot Co",
    postedDate: "5 days ago",
    skills: ["Customer Service", "Communication", "Training", "Quality Control"],
    urgency: "low" as const
  },
  {
    id: 5,
    title: "Image Classification for Autonomous Vehicles",
    description: "Help improve autonomous vehicle AI by classifying and labeling road scenarios, traffic signs, and pedestrian behavior from dashcam footage.",
    category: "Computer Vision",
    budget: 800,
    deadline: "2024-02-18",
    location: "Remote",
    applicants: 9,
    status: "open" as const,
    postedBy: "AutoDrive AI",
    postedDate: "1 day ago",
    skills: ["Image Recognition", "Attention to Detail", "Transportation Knowledge", "Data Labeling"],
    urgency: "medium" as const
  },
  {
    id: 6,
    title: "Legal Document Review for AI Training",
    description: "Legal professionals needed to review and annotate legal documents for AI training purposes. Must have legal background and understanding of document structure.",
    category: "Legal AI",
    budget: 1500,
    deadline: "2024-02-12",
    location: "San Francisco, CA",
    applicants: 3,
    status: "completed" as const,
    postedBy: "LegalTech Corp",
    postedDate: "2 weeks ago",
    skills: ["Legal Knowledge", "Document Analysis", "Attention to Detail", "Research"],
    urgency: "high" as const
  }
]

export default function BountiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 })
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedUrgency, setSelectedUrgency] = useState('')
  const [sortBy, setSortBy] = useState('deadline')

  const categories = Array.from(new Set(dummyTasks.map(task => task.category))).sort()
  const locations = Array.from(new Set(dummyTasks.map(task => task.location))).sort()

  const filteredTasks = dummyTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = !selectedCategory || task.category === selectedCategory
    const matchesLocation = !selectedLocation || task.location === selectedLocation
    const matchesUrgency = !selectedUrgency || task.urgency === selectedUrgency
    const matchesPrice = task.budget >= priceRange.min && task.budget <= priceRange.max

    return matchesSearch && matchesCategory && matchesLocation && matchesUrgency && matchesPrice
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      case 'budget-high':
        return b.budget - a.budget
      case 'budget-low':
        return a.budget - b.budget
      case 'applicants':
        return b.applicants - a.applicants
      case 'posted':
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
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
            Task Bounties
          </h1>
          <p className="text-muted-foreground">
            Find AI-related tasks that need human expertise and earn money by completing them
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
                      placeholder="Search tasks, skills..."
                      className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Budget Range: ${priceRange.min} - ${priceRange.max}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Urgency
                  </label>
                  <select
                    value={selectedUrgency}
                    onChange={(e) => setSelectedUrgency(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">All Urgencies</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
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
                    <option value="deadline">Deadline</option>
                    <option value="budget-high">Budget: High to Low</option>
                    <option value="budget-low">Budget: Low to High</option>
                    <option value="applicants">Most Applicants</option>
                    <option value="posted">Recently Posted</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                {sortedTasks.length} task{sortedTasks.length !== 1 ? 's' : ''} found
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  <span>{sortedTasks.filter(t => t.status === 'open').length} open</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{sortedTasks.filter(t => t.status === 'in_progress').length} in progress</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {sortedTasks.map(task => (
                <TaskCard key={task.id} {...task} />
              ))}
            </div>

            {sortedTasks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No tasks found matching your criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('')
                    setSelectedLocation('')
                    setSelectedUrgency('')
                    setPriceRange({ min: 0, max: 2000 })
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
