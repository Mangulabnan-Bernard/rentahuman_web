import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, SESSION_COOKIE } from '../../lib/session'
import { listEarningsForUser } from '../../lib/earnings'

/** GET /api/earnings?scope=mine — the signed-in user's earnings. */
export async function GET(request: NextRequest) {
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)
  if (!session) {
    return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
  }
  const earnings = await listEarningsForUser(session.id)
  return NextResponse.json({ success: true, data: earnings, total: earnings.length })
}
