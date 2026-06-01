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
  // Optional profile fields (editable on the dashboard, persisted via /api/profile)
  bio?: string
  title?: string
  hourlyRate?: number
  location?: string
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

/**
 * Client-side auth helpers.
 *
 * Authentication is performed by the `/api/auth` route, which validates
 * credentials server-side and issues an httpOnly, signed session cookie. That
 * cookie — not the value below — is the source of truth for authorization
 * (enforced in middleware.ts). The `current_user` entry persisted here is used
 * only to render the UI (name, avatar, role label); tampering with it cannot
 * grant access to a protected route or API, because the server re-validates the
 * signed cookie on every request.
 */
const STORAGE_KEY = 'current_user'

export const authUtils = {
  // A user is "authenticated" for UI purposes if we have a cached user object.
  // Authorization itself is always re-checked server-side via the session cookie.
  isAuthenticated: (): boolean => {
    return authUtils.getCurrentUser() !== null
  },

  // Get current user from localStorage (single, unified key).
  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem(STORAGE_KEY)
    if (!userStr) return null
    try {
      return JSON.parse(userStr) as User
    } catch {
      // Corrupt value — clear it so the app recovers gracefully.
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
  },

  // Get current user role
  getCurrentRole: (): UserRole => {
    const user = authUtils.getCurrentUser()
    return user?.role || 'guest'
  },

  // Persist the user returned by the API for UI hydration.
  setCurrentUser: (user: User): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    }
  },

  // Login: delegates credential checking to the server, which sets the session cookie.
  login: async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      })
      const result = await response.json()
      if (result.success && result.user) {
        authUtils.setCurrentUser(result.user)
        return { success: true, user: result.user }
      }
      return { success: false, error: result.error || 'Invalid email or password' }
    } catch {
      return { success: false, error: 'Network error. Please try again.' }
    }
  },

  // Register: server validates the role and sets the session cookie, then we
  // cache the returned user. Login and registration now share one flow + one key.
  register: async (userData: {
    email: string
    password: string
    name: string
    role: UserRole
  }): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', ...userData }),
      })
      const result = await response.json()
      if (result.success && result.user) {
        authUtils.setCurrentUser(result.user)
        return { success: true, user: result.user }
      }
      return { success: false, error: result.error || 'Registration failed' }
    } catch {
      return { success: false, error: 'Network error. Please try again.' }
    }
  },

  // Logout: clear the cached user and ask the server to clear the session cookie.
  logout: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem('auth_token') // remove any legacy key from older builds
      localStorage.removeItem('user_data') // remove any legacy key from older builds
      void fetch('/api/auth', { method: 'DELETE' }).catch(() => {})
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
