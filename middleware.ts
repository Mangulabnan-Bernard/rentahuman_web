import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, SESSION_COOKIE } from './app/lib/session'
import type { UserRole } from './app/utils/auth'

/**
 * Server-side authorization. Runs before any protected page or layout renders,
 * so unauthorized users are redirected at the edge and never receive protected
 * markup. Role is read from the cryptographically-signed session cookie, which
 * the client cannot forge — replacing the frontend-only access control that the
 * audit flagged (C3/C4/C5).
 */

interface ProtectedRule {
  prefix: string
  /** If set, only these roles may access the route; otherwise any signed-in user may. */
  roles?: UserRole[]
}

const PROTECTED_ROUTES: ProtectedRule[] = [
  { prefix: '/admin', roles: ['admin'] },
  { prefix: '/dashboard' }, // any authenticated user
  { prefix: '/submit-task', roles: ['client'] },
]

function matchRule(pathname: string): ProtectedRule | undefined {
  return PROTECTED_ROUTES.find(
    (rule) => pathname === rule.prefix || pathname.startsWith(`${rule.prefix}/`)
  )
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const rule = matchRule(pathname)
  if (!rule) return NextResponse.next()

  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)

  // Not signed in → send to login and remember where they were headed.
  if (!session) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.search = ''
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Signed in but lacks the required role → unauthorized.
  if (rule.roles && !rule.roles.includes(session.role)) {
    const deniedUrl = request.nextUrl.clone()
    deniedUrl.pathname = '/unauthorized'
    deniedUrl.search = ''
    return NextResponse.redirect(deniedUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Scope the middleware to protected route trees only; everything else is public.
  matcher: ['/admin/:path*', '/dashboard/:path*', '/submit-task/:path*'],
}
