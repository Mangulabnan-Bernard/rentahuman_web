'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  DollarSign, 
  Settings, 
  MessageSquare,
  Calendar,
  FileText,
  Bell,
  HelpCircle
} from 'lucide-react'

interface SidebarItem {
  name: string
  href: string
  icon: React.ReactNode
  badge?: number
}

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
    icon: <Briefcase className="w-5 h-5" />,
    badge: 3
  },
  {
    name: 'Earnings',
    href: '/dashboard/earnings',
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: <MessageSquare className="w-5 h-5" />,
    badge: 2
  },
  {
    name: 'Calendar',
    href: '/dashboard/calendar',
    icon: <Calendar className="w-5 h-5" />
  },
  {
    name: 'Documents',
    href: '/dashboard/documents',
    icon: <FileText className="w-5 h-5" />
  },
  {
    name: 'Notifications',
    href: '/dashboard/notifications',
    icon: <Bell className="w-5 h-5" />,
    badge: 5
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="w-5 h-5" />
  },
  {
    name: 'Help & Support',
    href: '/dashboard/help',
    icon: <HelpCircle className="w-5 h-5" />
  }
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen">
      <div className="p-6">
        <Link href="/dashboard" className="text-2xl font-bold text-primary">
          RentHuman
        </Link>
      </div>

      <nav className="px-4 pb-6">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
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

      <div className="px-6 py-4 border-t border-border">
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Need Help?</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Check out our documentation or contact support
          </p>
          <Link
            href="/help"
            className="text-primary text-sm hover:underline"
          >
            Get Help →
          </Link>
        </div>
      </div>
    </aside>
  )
}
