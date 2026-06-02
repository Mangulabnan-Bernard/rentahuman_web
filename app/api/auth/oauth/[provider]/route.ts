import { NextRequest, NextResponse } from 'next/server'
import { getProvider, buildAuthorizeUrl, appBaseUrl, OAUTH_STATE_COOKIE } from '../../../../lib/oauth'

/** Begin the OAuth flow: set a CSRF state cookie and redirect to the provider. */
export async function GET(_request: NextRequest, ctx: { params: Promise<{ provider: string }> }) {
  const { provider } = await ctx.params
  const config = getProvider(provider)

  if (!config) {
    const url = new URL('/login', appBaseUrl())
    url.searchParams.set('error', 'oauth_unavailable')
    return NextResponse.redirect(url)
  }

  const state = crypto.randomUUID()
  const response = NextResponse.redirect(buildAuthorizeUrl(config, state))
  response.cookies.set(OAUTH_STATE_COOKIE, `${provider}:${state}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 600, // 10 minutes
  })
  return response
}
