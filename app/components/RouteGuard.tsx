'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { authUtils, UserRole } from '../utils/auth'

interface RouteGuardProps {
  children: ReactNode
  requiredRole?: UserRole
  allowedRoles?: UserRole[]
  fallbackPath?: string
}

export default function RouteGuard({ 
  children, 
  requiredRole, 
  allowedRoles, 
  fallbackPath = '/login' 
}: RouteGuardProps) {
  const router = useRouter()
  const user = authUtils.getCurrentUser()
  const userRole = user?.role || 'guest'

  useEffect(() => {
    // Check if user is authenticated
    if (!authUtils.isAuthenticated()) {
      router.push(fallbackPath)
      return
    }

    // Check role-based access
    if (requiredRole && userRole !== requiredRole) {
      router.push('/unauthorized')
      return
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      router.push('/unauthorized')
      return
    }
  }, [router, userRole, requiredRole, allowedRoles, fallbackPath])

  // If all checks pass, render children
  return <>{children}</>
}

// Higher-order component for route protection
export const withRoleProtection = (
  Component: React.ComponentType<any>,
  options: { requiredRole?: UserRole; allowedRoles?: UserRole[]; fallbackPath?: string }
) => {
  return function ProtectedComponent(props: any) {
    return (
      <RouteGuard {...options}>
        <Component {...props} />
      </RouteGuard>
    )
  }
}
