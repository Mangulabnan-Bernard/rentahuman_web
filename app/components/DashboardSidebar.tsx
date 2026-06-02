'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  User,
  Briefcase,
  DollarSign,
  Settings,
  Shield,
  PlusCircle,
  LogOut
} from 'lucide-react'
import { authUtils, getRoleDisplayName, type User as AuthUser, type UserRole } from '../utils/auth'
import { useToast } from './Toast'

interface SidebarItem {
  name: string
  href: string
  icon: React.ReactNode
  badge?: number
  // If set, the item only shows for these roles; otherwise it shows for everyone.
  roles?: UserRole[]
}

// Only routes that actually exist are listed here, and items are filtered by the
// signed-in user's role (e.g. Earnings is agent-only; Admin is admin-only).
const sidebarItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: <User className="w-5 h-5" />
  },
  {
    name: 'Tasks',
    href: '/dashboard/tasks',
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    name: 'Post a Task',
    href: '/submit-task',
    icon: <PlusCircle className="w-5 h-5" />,
    roles: ['client', 'admin']
  },
  {
    name: 'Earnings',
    href: '/dashboard/earnings',
    icon: <DollarSign className="w-5 h-5" />,
    roles: ['agent', 'admin']
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="w-5 h-5" />
  },
  {
    name: 'Admin Console',
    href: '/admin',
    icon: <Shield className="w-5 h-5" />,
    roles: ['admin']
  }
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const toast = useToast()
  const [user, setUser] = useState<AuthUser | null>(null)

  // Read the user after mount to avoid an SSR/CSR hydration mismatch.
  useEffect(() => {
    setUser(authUtils.getCurrentUser())
  }, [])

  const handleLogout = () => {
    authUtils.logout()
    toast('You have been signed out')
    router.push('/')
    router.refresh()
  }

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen">
      <div className="p-6">
        <Link href="/dashboard" className="text-2xl font-bold text-primary">
          RentHuman
        </Link>
      </div>

      <nav className="px-4 pb-6">
        <ul className="space-y-2">
          {sidebarItems
            .filter((item) => !item.roles || (user != null && item.roles.includes(user.role)))
            .map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isActive 
                        ? 'bg-primary-foreground text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t border-border space-y-3">
        {user && (
          <div className="flex items-center gap-3 px-2">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">{getRoleDisplayName(user.role)}</p>
            </div>
          </div>
        )}

        <Link
          href="/contact"
          className="block text-sm text-muted-foreground hover:text-foreground px-2"
        >
          Help &amp; support
        </Link>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-2 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log out</span>
        </button>
      </div>
    </aside>
  )
}
