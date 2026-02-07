import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FloatingHumans from './components/FloatingHumans'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <section className="relative bg-muted/50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Meet Our Human Agents
              </h2>
              <p className="text-lg text-muted-foreground">
                Skilled professionals ready to assist with your AI workflows
              </p>
            </div>
            <FloatingHumans />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
