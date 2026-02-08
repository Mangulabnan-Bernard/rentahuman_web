/**
 * Authentication & Role Management System
 * Handles user roles, permissions, and access control
 */

export type UserRole = 'guest' | 'client' | 'agent' | 'admin'

export interface User {
  id: number
  email: string
  name: string
  role: UserRole
  avatar?: string
  joinedDate?: string
  verificationStatus?: 'verified' | 'pending' | 'unverified'
  profileCompleted?: boolean
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Role-based permissions
export const ROLE_PERMISSIONS = {
  guest: {
    canAccess: ['landing', 'browse', 'about', 'blog', 'api-docs'] as const,
    cannotAccess: ['dashboard', 'submit-task', 'hire-agent', 'messages', 'earnings', 'settings'] as const,
    description: 'Can explore platform and view public content'
  },
  client: {
    canAccess: ['landing', 'browse', 'dashboard', 'submit-task', 'hire-agent', 'messages', 'earnings', 'settings', 'about', 'blog', 'api-docs'] as const,
    cannotAccess: ['admin-panel', 'manage-users', 'system-settings'] as const,
    description: 'Can submit tasks, hire agents, and manage their activities'
  },
  agent: {
    canAccess: ['landing', 'browse', 'dashboard', 'messages', 'settings', 'about', 'blog', 'api-docs'] as const,
    cannotAccess: ['submit-task', 'hire-agent', 'earnings', 'admin-panel', 'manage-users'] as const,
    description: 'Can view assigned tasks and manage their profile'
  },
  admin: {
    canAccess: ['*'] as const, // Full access
    cannotAccess: [] as const,
    description: 'Full platform access and management capabilities'
  }
}

// Access control functions
export const hasPermission = (userRole: UserRole, resource: string): boolean => {
  // Admin has full access
  if (userRole === 'admin') return true
  
  const permissions = ROLE_PERMISSIONS[userRole]
  // Check if resource is in allowed list
  return permissions.canAccess.some(perm => perm === resource)
}

export const canAccessRoute = (userRole: UserRole, route: string): boolean => {
  // Map routes to resources
  const routeToResource: Record<string, string> = {
    '/': 'landing',
    '/browse': 'browse',
    '/dashboard': 'dashboard',
    '/submit-task': 'submit-task',
    '/hire': 'hire-agent',
    '/messages': 'messages',
    '/earnings': 'earnings',
    '/settings': 'settings',
    '/admin': 'admin-panel',
    '/about': 'about',
    '/blog': 'blog',
    '/api-docs': 'api-docs'
  }

  const resource = routeToResource[route] || route.substring(1)
  return hasPermission(userRole, resource)
}

export const getRedirectPath = (userRole: UserRole): string => {
  switch (userRole) {
    case 'client':
      return '/dashboard'
    case 'agent':
      return '/dashboard'
    case 'admin':
      return '/admin'
    default:
      return '/login'
  }
}

export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames = {
    guest: 'Guest',
    client: 'Client',
    agent: 'Agent',
    admin: 'Administrator'
  }
  return roleNames[role] || 'Unknown'
}

// Mock authentication functions
export const authUtils = {
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false
    const token = localStorage.getItem('auth_token')
    return !!token
  },

  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem('current_user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Get current user role
  getCurrentRole: (): UserRole => {
    const user = authUtils.getCurrentUser()
    return user?.role || 'guest'
  },

  // Login function
  login: async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    // Mock authentication logic
    const mockUsers = [
      {
        id: 1,
        email: 'demo@rentahuman.com',
        password: 'demo123',
        name: 'Demo Client',
        role: 'client' as UserRole,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        joinedDate: '2023-01-15',
        verificationStatus: 'verified' as const,
        profileCompleted: true
      },
      {
        id: 2,
        email: 'agent@rentahuman.com',
        password: 'agent123',
        name: 'Demo Agent',
        role: 'agent' as UserRole,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        joinedDate: '2023-02-20',
        verificationStatus: 'verified' as const,
        profileCompleted: true
      },
      {
        id: 3,
        email: 'admin@rentahuman.com',
        password: 'admin123',
        name: 'Demo Admin',
        role: 'admin' as UserRole,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        joinedDate: '2023-01-01',
        verificationStatus: 'verified' as const,
        profileCompleted: true
      }
    ]

    const user = mockUsers.find(u => u.email === email && u.password === password)
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user
      const token = `mock_token_${user.id}_${Date.now()}`
      
      // Store in localStorage
      localStorage.setItem('auth_token', token)
      localStorage.setItem('current_user', JSON.stringify(userWithoutPassword))
      
      return { success: true, user: userWithoutPassword }
    }
    
    return { success: false, error: 'Invalid email or password' }
  },

  // Register function
  register: async (userData: {
    email: string
    password: string
    name: string
    role: UserRole
  }): Promise<{ success: boolean; user?: User; error?: string }> => {
    // Mock registration logic
    const newUser: User = {
      id: Math.floor(Math.random() * 1000) + 100,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=150&h=150&fit=crop&crop=face`,
      joinedDate: new Date().toISOString().split('T')[0],
      verificationStatus: 'pending',
      profileCompleted: false
    }

    const token = `mock_token_${newUser.id}_${Date.now()}`
    
    // Store in localStorage
    localStorage.setItem('auth_token', token)
    localStorage.setItem('current_user', JSON.stringify(newUser))
    
    return { success: true, user: newUser }
  },

  // Logout function
  logout: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('current_user')
    }
  },

  // Check if user can access specific feature
  canAccessFeature: (feature: string): boolean => {
    const currentRole = authUtils.getCurrentRole()
    return hasPermission(currentRole, feature)
  },

  // Get user-specific dashboard data
  getDashboardData: () => {
    const user = authUtils.getCurrentUser()
    const role = user?.role || 'guest'

    switch (role) {
      case 'client':
        return {
          sections: ['overview', 'tasks', 'messages', 'earnings'],
          stats: ['totalSpent', 'activeTasks', 'completedTasks', 'totalHires']
        }
      case 'agent':
        return {
          sections: ['overview', 'tasks', 'earnings', 'profile'],
          stats: ['totalEarnings', 'completedTasks', 'averageRating', 'successRate']
        }
      case 'admin':
        return {
          sections: ['overview', 'users', 'tasks', 'earnings', 'disputes'],
          stats: ['totalUsers', 'totalTasks', 'totalRevenue', 'activeDisputes']
        }
      default:
        return { sections: [], stats: [] }
    }
  }
}
