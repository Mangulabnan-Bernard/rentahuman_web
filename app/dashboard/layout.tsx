'use client'

import { ReactNode } from 'react'
import RouteGuard from '../components/RouteGuard'

/**
 * Wraps every /dashboard route (including subpages) in the client-side guard.
 * The server-side middleware (middleware.ts) is the authoritative gate; this
 * layer prevents any flash of dashboard content during client navigation and
 * redirects anonymous users to /login (C4).
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <RouteGuard allowedRoles={['client', 'agent', 'admin']}>{children}</RouteGuard>
}
