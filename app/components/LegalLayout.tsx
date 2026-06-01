import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface LegalLayoutProps {
  title: string
  lastUpdated: string
  intro?: string
  children: ReactNode
}

/** Shared shell for static legal / policy pages (Terms, Privacy, Security, Compliance). */
export default function LegalLayout({ title, lastUpdated, intro, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: {lastUpdated}</p>
        {intro && <p className="text-muted-foreground leading-relaxed mb-8">{intro}</p>}
        <div className="space-y-8">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

/** A titled section used within LegalLayout. */
export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-foreground mb-3">{heading}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </section>
  )
}
