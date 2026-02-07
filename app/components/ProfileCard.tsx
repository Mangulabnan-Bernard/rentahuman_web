'use client'

import Link from 'next/link'
import { Star, MapPin, Clock, DollarSign, CheckCircle } from 'lucide-react'

interface ProfileCardProps {
  id: number
  name: string
  role: string
  avatar: string
  rating: number
  reviews: number
  location: string
  hourlyRate: number
  skills: string[]
  availability: 'available' | 'busy' | 'offline'
  completedTasks: number
  responseTime: string
}

export default function ProfileCard({
  id,
  name,
  role,
  avatar,
  rating,
  reviews,
  location,
  hourlyRate,
  skills,
  availability,
  completedTasks,
  responseTime
}: ProfileCardProps) {
  const getAvailabilityColor = () => {
    switch (availability) {
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
    switch (availability) {
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
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${getAvailabilityColor()} border-2 border-card`}></div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{name}</h3>
            <p className="text-muted-foreground">{role}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm text-foreground">{rating}</span>
              <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-primary font-semibold">
            <DollarSign className="w-4 h-4" />
            <span>${hourlyRate}/hr</span>
          </div>
          <div className={`text-sm mt-1 ${availability === 'available' ? 'text-green-600' : 'text-muted-foreground'}`}>
            {getAvailabilityText()}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2" />
          {location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-2" />
          Avg response: {responseTime}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <CheckCircle className="w-4 h-4 mr-2" />
          {completedTasks} tasks completed
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

      <div className="flex space-x-3">
        <Link
          href={`/agents/${id}`}
          className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors text-center font-medium"
        >
          View Profile
        </Link>
        <Link
          href={`/hire/${id}`}
          className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-md hover:bg-secondary/90 transition-colors text-center font-medium"
        >
          Hire Now
        </Link>
      </div>
    </div>
  )
}
