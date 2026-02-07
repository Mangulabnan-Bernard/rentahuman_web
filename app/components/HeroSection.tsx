'use client'

import Link from 'next/link'
import { ArrowRight, Users, Bot, CheckCircle } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Connect AI with
            <span className="text-primary block">Human Intelligence</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Robots think, humans do. Earn where AI can’t reach.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/join"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Join as Human Agent
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/browse"
              className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
            >
              Browse Available Humans
              <Users className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              For Businesses
            </h3>
            <p className="text-muted-foreground">
              Get human support for tasks where AI fails or requires contextual decision-making
            </p>
          </div>
          
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              AI-Human Workflow
            </h3>
            <p className="text-muted-foreground">
              Seamless integration between automated systems and human intervention points
            </p>
          </div>
          
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              For Agents
            </h3>
            <p className="text-muted-foreground">
              Monetize your expertise by providing supervision and intervention in AI workflows
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="relative">
              <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold text-foreground mb-2">Post Task</h4>
              <p className="text-sm text-muted-foreground">
                Submit your AI workflow task that needs human intervention
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold text-foreground mb-2">Get Matched</h4>
              <p className="text-sm text-muted-foreground">
                Our system matches your task with qualified human agents
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold text-foreground mb-2">Complete Work</h4>
              <p className="text-sm text-muted-foreground">
                Human agent completes the task with quality assurance
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                4
              </div>
              <h4 className="font-semibold text-foreground mb-2">Pay & Review</h4>
              <p className="text-sm text-muted-foreground">
                Review the work and process payment through our secure escrow system
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
