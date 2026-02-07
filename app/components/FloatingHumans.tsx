'use client'

import { useState } from 'react'
import { User, Users, Bot, BrainCircuit } from 'lucide-react'

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

  const humanCards: HumanCard[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "AI Trainer",
      skills: ["Machine Learning", "Data Annotation"],
      rating: 4.9,
      icon: <User className="w-8 h-8" />
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Task Validator",
      skills: ["Quality Assurance", "Testing"],
      rating: 4.8,
      icon: <Users className="w-8 h-8" />
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "AI Supervisor",
      skills: ["Model Training", "Prompt Engineering"],
      rating: 5.0,
      icon: <BrainCircuit className="w-8 h-8" />
    },
    {
      id: 4,
      name: "David Kim",
      role: "Human-in-the-Loop",
      skills: ["Content Moderation", "Decision Making"],
      rating: 4.7,
      icon: <Bot className="w-8 h-8" />
    }
  ]

  return (
    <div className="relative h-96 overflow-hidden">
      <div className="absolute inset-0">
        {humanCards.map((card, index) => {
          const positions = [
            { top: '10%', left: '5%' },
            { top: '15%', right: '10%' },
            { top: '50%', left: '8%' },
            { top: '45%', right: '5%' }
          ]
          
          const position = positions[index]
          const isHovered = hoveredCard === card.id
          
          return (
            <div
              key={card.id}
              className={`absolute bg-card border border-border rounded-lg p-4 shadow-lg transition-all duration-300 cursor-pointer ${
                isHovered ? 'scale-110 z-10' : 'scale-100'
              } ${index % 2 === 0 ? 'animate-float' : 'animate-float-delayed'}`}
              style={position}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="text-primary">
                  {card.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{card.name}</h4>
                  <p className="text-sm text-muted-foreground">{card.role}</p>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex flex-wrap gap-1">
                  {card.skills.slice(0, 2).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-foreground ml-1">{card.rating}</span>
                </div>
                {isHovered && (
                  <button className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90">
                    View Profile
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
