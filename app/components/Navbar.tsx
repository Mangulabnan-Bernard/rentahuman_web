'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, User } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export default function Navbar() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      const userData = localStorage.getItem('user_data')
      
      if (token && userData) {
        setIsLoggedIn(true)
        setUserData(JSON.parse(userData))
      } else {
        setIsLoggedIn(false)
        setUserData(null)
      }
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }
    setIsLoggedIn(false)
    setUserData(null)
    router.push('/')
  }

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              RentHuman
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/browse" className="text-foreground hover:text-primary transition-colors">
              Browse Humans
            </Link>
            <Link href="/bounties" className="text-foreground hover:text-primary transition-colors">
              Task Bounties
            </Link>
            <Link href="/api-docs" className="text-foreground hover:text-primary transition-colors">
              API Docs
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Welcome, {userData?.name}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/join"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/browse"
              className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Humans
            </Link>
            <Link
              href="/bounties"
              className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Task Bounties
            </Link>
            <Link
              href="/api-docs"
              className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              API Docs
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="border-t border-border pt-2">
              {isLoggedIn ? (
                <>
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Welcome, {userData?.name}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/join"
                    className="block px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
