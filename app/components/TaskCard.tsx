'use client'

import Link from 'next/link'
import { Clock, DollarSign, Users, MapPin, AlertCircle, CheckCircle } from 'lucide-react'

interface TaskCardProps {
  id: number
  title: string
  description: string
  category: string
  budget: number
  deadline: string
  location: string
  applicants: number
  status: 'open' | 'in_progress' | 'completed' | 'cancelled'
  postedBy: string
  postedDate: string
  skills: string[]
  urgency: 'low' | 'medium' | 'high'
}

export default function TaskCard({
  id,
  title,
  description,
  category,
  budget,
  deadline,
  location,
  applicants,
  status,
  postedBy,
  postedDate,
  skills,
  urgency
}: TaskCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getUrgencyColor = () => {
    switch (urgency) {
      case 'high':
        return 'text-red-600 dark:text-red-400'
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'low':
        return 'text-green-600 dark:text-green-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'open':
        return 'Open'
      case 'in_progress':
        return 'In Progress'
      case 'completed':
        return 'Completed'
      case 'cancelled':
        return 'Cancelled'
      default:
        return 'Unknown'
    }
  }

  const getUrgencyIcon = () => {
    switch (urgency) {
      case 'high':
        return <AlertCircle className="w-4 h-4" />
      case 'medium':
        return <Clock className="w-4 h-4" />
      case 'low':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor()}`}>
              {getStatusText()}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded bg-muted text-muted-foreground`}>
              {category}
            </span>
            <div className={`flex items-center space-x-1 ${getUrgencyColor()}`}>
              {getUrgencyIcon()}
              <span className="text-xs">{urgency} priority</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        </div>
        
        <div className="text-right ml-4">
          <div className="flex items-center text-primary font-semibold">
            <DollarSign className="w-4 h-4" />
            <span>${budget}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Budget</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2" />
          {location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-2" />
          Deadline: {deadline}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="w-4 h-4 mr-2" />
          {applicants} applicant{applicants !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
              +{skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Posted by {postedBy} • {postedDate}
        </div>
        
        <div className="flex space-x-2">
          {status === 'open' && (
            <>
              <Link
                href={`/tasks/${id}/apply`}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                Apply Now
              </Link>
              <Link
                href={`/tasks/${id}`}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors text-sm font-medium"
              >
                View Details
              </Link>
            </>
          )}
          {status !== 'open' && (
            <Link
              href={`/tasks/${id}`}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors text-sm font-medium"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
