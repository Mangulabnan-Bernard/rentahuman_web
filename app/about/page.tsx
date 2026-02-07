import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Users, Target, Shield, Globe, BrainCircuit, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About RentHuman
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building the future of human-AI collaboration, connecting skilled professionals 
            with AI systems that need human intelligence to thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              RentHuman was founded on the belief that the most powerful AI systems are those 
              that seamlessly integrate human intelligence. We bridge the gap between automated 
              processes and human expertise, creating a marketplace where AI systems can access 
              the human insight they need to succeed.
            </p>
            <p className="text-muted-foreground">
              Our platform enables businesses to augment their AI workflows with human expertise 
              while providing meaningful work opportunities for skilled professionals around the world.
            </p>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Vision</h2>
            <p className="text-muted-foreground mb-4">
              We envision a future where human intelligence and artificial intelligence work in 
              perfect harmony, each amplifying the strengths of the other. Our platform is the 
              foundation for this collaborative future.
            </p>
            <p className="text-muted-foreground">
              By creating efficient, secure, and fair connections between AI systems and human 
              experts, we're building the infrastructure for the next generation of intelligent 
              applications.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Human-Centered AI</h3>
              <p className="text-muted-foreground">
                We believe AI should augment human capabilities, not replace them. Our platform 
                ensures humans remain at the center of AI decision-making processes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Trust & Security</h3>
              <p className="text-muted-foreground">
                We provide secure escrow payments, identity verification, and quality assurance 
                to ensure safe and reliable human-AI collaborations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Global Opportunity</h3>
              <p className="text-muted-foreground">
                We create economic opportunities for skilled professionals worldwide while providing 
                businesses with access to diverse human expertise.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-foreground mb-2">Post Task</h3>
              <p className="text-sm text-muted-foreground">
                Businesses post AI-related tasks that need human expertise
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-foreground mb-2">Get Matched</h3>
              <p className="text-sm text-muted-foreground">
                Our AI matches tasks with qualified human agents
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-foreground mb-2">Complete Work</h3>
              <p className="text-sm text-muted-foreground">
                Agents complete tasks with quality assurance
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-foreground mb-2">Get Paid</h3>
              <p className="text-sm text-muted-foreground">
                Secure payment through our escrow system
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">By the Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-muted-foreground">Human Agents</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <p className="text-muted-foreground">Tasks Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-4">$2M+</div>
              <p className="text-muted-foreground">Earned by Agents</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <p className="text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of businesses and human agents already using RentHuman
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/join"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Join as Human Agent
            </a>
            <a
              href="/browse"
              className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
            >
              Browse Tasks
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
