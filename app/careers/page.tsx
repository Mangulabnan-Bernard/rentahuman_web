import type { Metadata } from 'next'
import Link from 'next/link'
import { Briefcase, Heart, Globe, Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Careers - RentHuman',
  description: 'Join the team building the bridge between AI systems and human intelligence.',
}

const openRoles = [
  { title: 'Senior Full-Stack Engineer', team: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'Product Designer', team: 'Design', location: 'Remote', type: 'Full-time' },
  { title: 'Trust & Safety Specialist', team: 'Operations', location: 'Remote', type: 'Full-time' },
  { title: 'Developer Advocate', team: 'Growth', location: 'Remote', type: 'Contract' },
]

const perks = [
  { icon: Globe, title: 'Remote-first', description: 'Work from anywhere, with flexible hours.' },
  { icon: Heart, title: 'Health & wellness', description: 'Comprehensive coverage and wellness stipend.' },
  { icon: Zap, title: 'Growth budget', description: 'Annual budget for learning and conferences.' },
  { icon: Briefcase, title: 'Meaningful equity', description: 'Share in the value you help create.' },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Build the future of work</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are a small, focused team connecting AI systems with human expertise. If that mission excites
            you, we would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {perks.map((perk) => {
            const Icon = perk.icon
            return (
              <div key={perk.title} className="bg-card border border-border rounded-lg p-6">
                <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{perk.title}</h3>
                <p className="text-sm text-muted-foreground">{perk.description}</p>
              </div>
            )
          })}
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-6">Open roles</h2>
        <div className="space-y-4">
          {openRoles.map((role) => (
            <div
              key={role.title}
              className="bg-card border border-border rounded-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <h3 className="font-semibold text-foreground">{role.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {role.team} &middot; {role.location} &middot; {role.type}
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex justify-center bg-primary text-primary-foreground px-5 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                Apply
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-muted-foreground">
          <p>
            Do not see your role?{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Get in touch
            </Link>{' '}
            and tell us how you can help.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
