/**
 * Server-only user store.
 *
 * In a real deployment this module would be backed by the database (see
 * prisma/schema.prisma). For this demo it holds an in-memory list of users.
 *
 * IMPORTANT: this file must only ever be imported by server code (route
 * handlers / server components). Keeping credentials and role logic here ensures
 * password hashes and the credential list are never shipped in the client bundle.
 */

import type { User, UserRole } from '../utils/auth'

interface StoredUser extends User {
  password: string
}

/**
 * Roles a user is allowed to self-assign at registration. `admin` is
 * deliberately excluded — it can never be granted through the public sign-up
 * flow, which closes the privilege-escalation hole.
 */
const SELF_ASSIGNABLE_ROLES: UserRole[] = ['client', 'agent']

export function isSelfAssignableRole(role: unknown): role is UserRole {
  return typeof role === 'string' && (SELF_ASSIGNABLE_ROLES as string[]).includes(role)
}

// Seed accounts for the demo. Passwords are plaintext only because there is no
// database; with Prisma these become hashed columns and this array goes away.
const users: StoredUser[] = [
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

function stripPassword(user: StoredUser): User {
  const { password: _password, ...safe } = user
  return safe
}

/** Validate credentials. Returns the user (without password) on success. */
export function verifyCredentials(email: string, password: string): User | null {
  const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
  return match ? stripPassword(match) : null
}

export function findUserByEmail(email: string): User | null {
  const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  return match ? stripPassword(match) : null
}

let nextId = 100

/**
 * Register a new user. The role is validated server-side: anything other than a
 * self-assignable role is rejected before a session is ever issued.
 */
export function createUser(input: {
  email: string
  password: string
  name: string
  role: UserRole
}): { user: User } | { error: string } {
  if (!input.email || !input.password || !input.name) {
    return { error: 'Email, password and name are required' }
  }
  if (!isSelfAssignableRole(input.role)) {
    return { error: 'Invalid role selection' }
  }
  if (findUserByEmail(input.email)) {
    return { error: 'An account with this email already exists' }
  }

  const stored: StoredUser = {
    id: nextId++,
    email: input.email,
    password: input.password,
    name: input.name,
    role: input.role,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(input.email)}`,
    joinedDate: new Date().toISOString().split('T')[0],
    verificationStatus: 'pending',
    profileCompleted: false,
  }
  users.push(stored)
  return { user: stripPassword(stored) }
}
