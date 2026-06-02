/**
 * Minimal OAuth 2.0 (authorization-code) for Google and GitHub.
 *
 * On success the callback issues the app's own signed session cookie (see
 * lib/session.ts), so OAuth sign-in flows through the exact same authorization
 * path as credential sign-in — no separate session system.
 *
 * Configuration is read from env (see .env.example). Providers without
 * credentials are simply reported as unavailable; nothing breaks.
 */

export type ProviderId = 'google' | 'github'

export const OAUTH_STATE_COOKIE = 'rh_oauth_state'

export interface OAuthUserInfo {
  email: string
  name?: string
  image?: string
}

export interface OAuthProvider {
  id: ProviderId
  label: string
  clientId: string
  clientSecret: string
  authorizeUrl: string
  tokenUrl: string
  scope: string
  fetchUser: (accessToken: string) => Promise<OAuthUserInfo | null>
}

export function appBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '')
}

export function redirectUriFor(id: ProviderId): string {
  return `${appBaseUrl()}/api/auth/callback/${id}`
}

function credentials(id: ProviderId): { clientId?: string; clientSecret?: string } {
  if (id === 'google') {
    return { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }
  }
  return { clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET }
}

export function isConfigured(id: ProviderId): boolean {
  const { clientId, clientSecret } = credentials(id)
  return Boolean(clientId && clientSecret)
}

async function fetchGoogleUser(accessToken: string): Promise<OAuthUserInfo | null> {
  const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) return null
  const data = (await res.json()) as { email?: string; name?: string; picture?: string }
  if (!data.email) return null
  return { email: data.email, name: data.name, image: data.picture }
}

async function fetchGitHubUser(accessToken: string): Promise<OAuthUserInfo | null> {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'RentHuman-App',
  }
  const res = await fetch('https://api.github.com/user', { headers })
  if (!res.ok) return null
  const data = (await res.json()) as { login?: string; name?: string; avatar_url?: string; email?: string | null }

  let email = data.email ?? undefined
  if (!email) {
    // Primary email may be private; fetch it explicitly.
    const emailsRes = await fetch('https://api.github.com/user/emails', { headers })
    if (emailsRes.ok) {
      const emails = (await emailsRes.json()) as { email: string; primary: boolean; verified: boolean }[]
      email = (emails.find((e) => e.primary && e.verified) ?? emails.find((e) => e.verified))?.email
    }
  }
  if (!email) return null
  return { email, name: data.name || data.login, image: data.avatar_url }
}

export function getProvider(id: string | undefined): OAuthProvider | null {
  if (id !== 'google' && id !== 'github') return null
  const { clientId, clientSecret } = credentials(id)
  if (!clientId || !clientSecret) return null

  if (id === 'google') {
    return {
      id,
      label: 'Google',
      clientId,
      clientSecret,
      authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      scope: 'openid email profile',
      fetchUser: fetchGoogleUser,
    }
  }
  return {
    id,
    label: 'GitHub',
    clientId,
    clientSecret,
    authorizeUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    scope: 'read:user user:email',
    fetchUser: fetchGitHubUser,
  }
}

export function buildAuthorizeUrl(provider: OAuthProvider, state: string): string {
  const params = new URLSearchParams({
    client_id: provider.clientId,
    redirect_uri: redirectUriFor(provider.id),
    response_type: 'code',
    scope: provider.scope,
    state,
  })
  if (provider.id === 'google') {
    params.set('access_type', 'online')
    params.set('prompt', 'select_account')
  }
  return `${provider.authorizeUrl}?${params.toString()}`
}

/** Exchange an authorization code for an access token. Returns null on failure. */
export async function exchangeCodeForToken(provider: OAuthProvider, code: string): Promise<string | null> {
  const body = new URLSearchParams({
    client_id: provider.clientId,
    client_secret: provider.clientSecret,
    code,
    redirect_uri: redirectUriFor(provider.id),
    grant_type: 'authorization_code',
  })
  const res = await fetch(provider.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body,
  })
  if (!res.ok) return null
  const data = (await res.json()) as { access_token?: string }
  return data.access_token ?? null
}
