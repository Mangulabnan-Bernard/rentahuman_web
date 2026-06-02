import { NextResponse } from 'next/server'
import { isConfigured } from '../../../lib/oauth'

/** Reports which OAuth providers are configured, so the UI can show only those. */
export async function GET() {
  return NextResponse.json({
    success: true,
    providers: {
      google: isConfigured('google'),
      github: isConfigured('github'),
    },
  })
}
