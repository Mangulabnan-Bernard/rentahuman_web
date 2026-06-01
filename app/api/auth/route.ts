import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, verifySessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from '../../lib/session'
import { verifyCredentials, createUser } from '../../lib/users'

function withSessionCookie(response: NextResponse, token: string): NextResponse {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
  return response
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }

  const action = body.action

  if (action === 'login') {
    const email = String(body.email ?? '')
    const password = String(body.password ?? '')
    const user = verifyCredentials(email, password)
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 })
    }
    const token = await createSessionToken(user)
    return withSessionCookie(NextResponse.json({ success: true, user }), token)
  }

  if (action === 'register') {
    // Accept either a single `name` or first/last name parts from the form.
    const name =
      String(body.name ?? '').trim() ||
      `${String(body.firstName ?? '').trim()} ${String(body.lastName ?? '').trim()}`.trim()

    const result = createUser({
      email: String(body.email ?? ''),
      password: String(body.password ?? ''),
      name,
      // Role is re-validated inside createUser; the client cannot escalate here.
      role: body.role as never,
    })

    if ('error' in result) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }
    const token = await createSessionToken(result.user)
    return withSessionCookie(NextResponse.json({ success: true, user: result.user }), token)
  }

  return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
}

/** Returns the current authenticated user from the signed session cookie. */
export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  const session = await verifySessionToken(token)
  if (!session) {
    return NextResponse.json({ success: false, user: null }, { status: 200 })
  }
  const { exp: _exp, ...user } = session
  return NextResponse.json({ success: true, user }, { status: 200 })
}

/** Logout: clear the session cookie. */
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
  return response
}
