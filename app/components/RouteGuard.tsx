'use client'

import { useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { authUtils, UserRole } from '../utils/auth'

interface RouteGuardProps {
  children: ReactNode
  requiredRole?: UserRole
  allowedRoles?: UserRole[]
  fallbackPath?: string
}

type GuardStatus = 'checking' | 'authorized'

/**
 * Client-side guard that complements the server-side middleware. It renders a
 * loading state and refuses to render `children` until authorization has been
 * verified, so protected content is never painted (even for a frame) before the
 * check completes (C2). Middleware remains the authoritative gate; this prevents
 * a flash of protected UI during client navigation.
 */
export default function RouteGuard({
  children,
  requiredRole,
  allowedRoles,
  fallbackPath = '/login',
}: RouteGuardProps) {
  const router = useRouter()
  const [status, setStatus] = useState<GuardStatus>('checking')

  useEffect(() => {
    const user = authUtils.getCurrentUser()

    if (!user) {
      router.replace(fallbackPath)
      return
    }

    if (requiredRole && user.role !== requiredRole) {
      router.replace('/unauthorized')
      return
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace('/unauthorized')
      return
    }

    setStatus('authorized')
  }, [router, requiredRole, allowedRoles, fallbackPath])

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" role="status" aria-live="polite">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm">Verifying access…</span>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Higher-order component for route protection
export const withRoleProtection = <P extends object>(
  Component: React.ComponentType<P>,
  options: { requiredRole?: UserRole; allowedRoles?: UserRole[]; fallbackPath?: string }
) => {
  return function ProtectedComponent(props: P) {
    return (
      <RouteGuard {...options}>
        <Component {...props} />
      </RouteGuard>
    )
  }
}
