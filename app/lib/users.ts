/**
 * Server-only user store.
 *
 * Backed by Prisma/MySQL when DATABASE_URL is configured; otherwise falls back
 * to an in-memory list so the demo runs without a database. In both modes the
 * registration role is validated server-side (admin is never self-assignable),
 * which is what closes the privilege-escalation hole.
 *
 * Must only ever be imported by server code (route handlers / server
 * components) so credentials never reach the client bundle.
 */

import type { User as PrismaUser } from '@prisma/client'
import type { User, UserRole } from '../utils/auth'
import { getPrisma } from './prisma'
import { hashPassword, verifyPassword } from './password'

type SelfAssignableRole = 'client' | 'agent'

/**
 * Roles a user may self-assign at registration. `admin` is deliberately
 * excluded — it can never be granted through public sign-up.
 */
const SELF_ASSIGNABLE_ROLES: SelfAssignableRole[] = ['client', 'agent']

export function isSelfAssignableRole(role: unknown): role is SelfAssignableRole {
  return typeof role === 'string' && (SELF_ASSIGNABLE_ROLES as string[]).includes(role)
}

function avatarFor(email: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`
}

// Map a Prisma row to the app's User shape (enum values and ids already match).
function toAppUser(row: PrismaUser): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name ?? '',
    role: row.role as UserRole,
    avatar: row.image ?? undefined,
    joinedDate: row.createdAt ? new Date(row.createdAt).toISOString().split('T')[0] : undefined,
    verificationStatus: row.verificationStatus as User['verificationStatus'],
    profileCompleted: row.profileCompleted,
  }
}

// ---------------------------------------------------------------------------
// In-memory fallback (used only when DATABASE_URL is unset). Passwords are
// plaintext here purely because it is a throwaway demo store; the Prisma path
// stores scrypt hashes.
// ---------------------------------------------------------------------------

interface MemoryUser extends User {
  password: string
}

const memoryUsers: MemoryUser[] = [
  {
    id: 1,
    email: 'demo@rentahuman.com',
    password: 'demo123',
    name: 'Demo Client',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinedDate: '2023-01-15',
    verificationStatus: 'verified',
    profileCompleted: true,
  },
  {
    id: 2,
    email: 'agent@rentahuman.com',
    password: 'agent123',
    name: 'Demo Agent',
    role: 'agent',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    joinedDate: '2023-02-20',
    verificationStatus: 'verified',
    profileCompleted: true,
  },
  {
    id: 3,
    email: 'admin@rentahuman.com',
    password: 'admin123',
    name: 'Demo Admin',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinedDate: '2023-01-01',
    verificationStatus: 'verified',
    profileCompleted: true,
  },
]

let nextMemoryId = 100

function stripPassword(user: MemoryUser): User {
  const { password: _password, ...safe } = user
  return safe
}

// ---------------------------------------------------------------------------
// Public API (async; works against Prisma or the in-memory fallback)
// ---------------------------------------------------------------------------

export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const prisma = getPrisma()
  if (prisma) {
    const row = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (!row || !row.passwordHash) return null
    const ok = await verifyPassword(password, row.passwordHash)
    return ok ? toAppUser(row) : null
  }

  const match = memoryUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )
  return match ? stripPassword(match) : null
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const prisma = getPrisma()
  if (prisma) {
    const row = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    return row ? toAppUser(row) : null
  }

  const match = memoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
  return match ? stripPassword(match) : null
}

export async function createUser(input: {
  email: string
  password: string
  name: string
  role: UserRole
}): Promise<{ user: User } | { error: string }> {
  if (!input.email || !input.password || !input.name) {
    return { error: 'Email, password and name are required' }
  }
  const role = input.role
  if (!isSelfAssignableRole(role)) {
    return { error: 'Invalid role selection' }
  }
  const email = input.email.toLowerCase()

  const prisma = getPrisma()
  if (prisma) {
    if (await prisma.user.findUnique({ where: { email } })) {
      return { error: 'An account with this email already exists' }
    }
    const row = await prisma.user.create({
      data: {
        email,
        name: input.name,
        role,
        passwordHash: await hashPassword(input.password),
        image: avatarFor(email),
        verificationStatus: 'pending',
        profileCompleted: false,
      },
    })
    return { user: toAppUser(row) }
  }

  if (memoryUsers.some((u) => u.email.toLowerCase() === email)) {
    return { error: 'An account with this email already exists' }
  }
  const stored: MemoryUser = {
    id: nextMemoryId++,
    email,
    password: input.password,
    name: input.name,
    role,
    avatar: avatarFor(email),
    joinedDate: new Date().toISOString().split('T')[0],
    verificationStatus: 'pending',
    profileCompleted: false,
  }
  memoryUsers.push(stored)
  return { user: stripPassword(stored) }
}
