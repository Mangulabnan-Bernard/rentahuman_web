import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, SESSION_COOKIE } from '../../lib/session'
import { getUserById, updateUserProfile, changePassword } from '../../lib/users'

async function requireSession(request: NextRequest) {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)
}

/** Return the current user's full profile. */
export async function GET(request: NextRequest) {
  const session = await requireSession(request)
  if (!session) {
    return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
  }
  const user = await getUserById(session.id)
  if (!user) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true, user })
}

/** Update the current user's editable profile fields. */
export async function PATCH(request: NextRequest) {
  const session = await requireSession(request)
  if (!session) {
    return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }

  const updated = await updateUserProfile(session.id, {
    name: typeof body.name === 'string' ? body.name : undefined,
    bio: typeof body.bio === 'string' ? body.bio : undefined,
    title: typeof body.title === 'string' ? body.title : undefined,
    location: typeof body.location === 'string' ? body.location : undefined,
    hourlyRate:
      body.hourlyRate === undefined || body.hourlyRate === null || body.hourlyRate === ''
        ? undefined
        : Number(body.hourlyRate),
  })

  if (!updated) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true, user: updated })
}

/** Change the current user's password. Body: { currentPassword, newPassword }. */
export async function POST(request: NextRequest) {
  const session = await requireSession(request)
  if (!session) {
    return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }

  const result = await changePassword(
    session.id,
    String(body.currentPassword ?? ''),
    String(body.newPassword ?? '')
  )
  if ('error' in result) {
    return NextResponse.json({ success: false, error: result.error }, { status: 400 })
  }
  return NextResponse.json({ success: true })
}
