'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Users, Bot, BrainCircuit } from 'lucide-react'
import { MOCK_AGENTS } from '../mock'

interface HumanCard {
  id: number
  name: string
  role: string
  skills: string[]
  rating: number
  icon: React.ReactNode
}

export default function FloatingHumans() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Map real agents to floating cards format
  const humanCards: HumanCard[] = MOCK_AGENTS.map(agent => ({
    id: agent.id,
    name: agent.name,
    role: agent.role,
    skills: agent.skills,
    rating: agent.rating,
    icon: agent.id % 4 === 1 ? <User className="w-8 h-8" /> :
           agent.id % 4 === 2 ? <Users className="w-8 h-8" /> :
           agent.id % 4 === 3 ? <BrainCircuit className="w-8 h-8" /> :
           <Bot className="w-8 h-8" />
  }))

  // Duplicate cards for continuous looping
  const duplicatedCards = [...humanCards, ...humanCards]

  return (
    <div className="relative h-48 overflow-hidden">
      <div 
        className={`flex items-center gap-2 absolute whitespace-nowrap animate-slide ${
          isPaused ? 'paused' : ''
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedCards.map((card, index) => {
          const isHovered = hoveredCard === card.id
          
          return (
            <div
              key={`${card.id}-${index}`}
              className={`bg-card border border-border rounded-lg p-3 shadow-lg transition-all duration-300 cursor-pointer ${
                isHovered ? 'scale-110 z-10' : 'scale-100'
              }`}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center space-x-2 mb-1">
                <div className="text-primary">
                  {card.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{card.name}</h4>
                  <p className="text-xs text-muted-foreground">{card.role}</p>
                </div>
              </div>
              
              <div className="mb-1">
                <div className="flex flex-wrap gap-1">
                  {card.skills.slice(0, 2).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs bg-secondary text-secondary-foreground px-1 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {card.skills.length > 2 && (
                    <span className="text-xs bg-muted text-muted-foreground px-1 py-0.5 rounded">
                      +{card.skills.length - 2}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-500 text-xs">★</span>
                  <span className="text-xs text-foreground ml-1">{card.rating}</span>
                </div>
                {isHovered && (
                  <Link 
                    href={`/agents/${card.id}`}
                    className="text-xs bg-primary text-primary-foreground px-1 py-0.5 rounded hover:bg-primary/90"
                  >
                    View
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
