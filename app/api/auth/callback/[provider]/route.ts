import { NextRequest, NextResponse } from 'next/server'
import {
  getProvider,
  exchangeCodeForToken,
  appBaseUrl,
  OAUTH_STATE_COOKIE,
} from '../../../../lib/oauth'
import { upsertOAuthUser } from '../../../../lib/users'
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from '../../../../lib/session'
import { getRedirectPath } from '../../../../utils/auth'

/** OAuth provider redirect target: verify state, exchange code, sign the user in. */
export async function GET(request: NextRequest, ctx: { params: Promise<{ provider: string }> }) {
  const { provider } = await ctx.params
  const config = getProvider(provider)

  const fail = (reason: string) => {
    const url = new URL('/login', appBaseUrl())
    url.searchParams.set('error', reason)
    return NextResponse.redirect(url)
  }

  if (!config) return fail('oauth_unavailable')

  const params = request.nextUrl.searchParams
  const code = params.get('code')
  const state = params.get('state')
  const stateCookie = request.cookies.get(OAUTH_STATE_COOKIE)?.value

  // CSRF: the returned state must match the one we stored for this provider.
  if (!code || !state || stateCookie !== `${provider}:${state}`) {
    return fail('oauth_state')
  }

  try {
    const accessToken = await exchangeCodeForToken(config, code)
    if (!accessToken) return fail('oauth_token')

    const profile = await config.fetchUser(accessToken)
    if (!profile?.email) return fail('oauth_email')

    const user = await upsertOAuthUser({ email: profile.email, name: profile.name, image: profile.image })
    const sessionToken = await createSessionToken(user)

    const response = NextResponse.redirect(new URL(getRedirectPath(user.role), appBaseUrl()))
    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: SESSION_MAX_AGE,
    })
    // Clear the one-time state cookie.
    response.cookies.set(OAUTH_STATE_COOKIE, '', { path: '/', maxAge: 0 })
    return response
  } catch {
    return fail('oauth_failed')
  }
}
