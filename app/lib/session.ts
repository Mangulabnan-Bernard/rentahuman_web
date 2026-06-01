/**
 * Server-side session management.
 *
 * Sessions are stored in a stateless, signed cookie. The payload (including the
 * user's role) is signed with an HMAC-SHA256 key derived from AUTH_SECRET, so it
 * cannot be forged or tampered with on the client. This is the single source of
 * truth for authorization decisions in middleware and API routes — the client's
 * localStorage is treated as display-only and is never trusted for access control.
 *
 * Implemented with the Web Crypto API so it runs in both the Edge (middleware)
 * and Node.js (route handler) runtimes.
 */

import type { UserRole } from '../utils/auth'

export const SESSION_COOKIE = 'rh_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days, in seconds

export interface SessionPayload {
  id: number
  email: string
  name: string
  role: UserRole
  /** Expiry as a Unix epoch in milliseconds. */
  exp: number
}

const encoder = new TextEncoder()

function getSecret(): string {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    // A stable dev fallback keeps local runs working without a .env file.
    // Production MUST set AUTH_SECRET (see .env.example) or sessions are insecure.
    if (process.env.NODE_ENV === 'production') {
      throw new Error('AUTH_SECRET is not set. Refusing to sign sessions in production.')
    }
    return 'dev-insecure-secret-do-not-use-in-production'
  }
  return secret
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  let binary = ''
  for (let i = 0; i < arr.length; i++) binary += String.fromCharCode(arr[i])
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(value: string): Uint8Array {
  let normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  while (normalized.length % 4) normalized += '='
  const binary = atob(normalized)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

async function sign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  return toBase64Url(signature)
}

/** Compare two strings in length-constant time to avoid timing leaks. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return mismatch === 0
}

/** Create a signed session token for the given user data. */
export async function createSessionToken(
  user: { id: number; email: string; name: string; role: UserRole },
  maxAgeSeconds: number = SESSION_MAX_AGE
): Promise<string> {
  const payload: SessionPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Date.now() + maxAgeSeconds * 1000,
  }
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)))
  const signature = await sign(body)
  return `${body}.${signature}`
}

/** Verify a session token's signature and expiry. Returns null if invalid. */
export async function verifySessionToken(token: string | undefined | null): Promise<SessionPayload | null> {
  if (!token) return null
  const [body, signature] = token.split('.')
  if (!body || !signature) return null

  const expected = await sign(body)
  if (!safeEqual(signature, expected)) return null

  try {
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(body))) as SessionPayload
    if (typeof payload.exp !== 'number' || Date.now() > payload.exp) return null
    return payload
  } catch {
    return null
  }
}
