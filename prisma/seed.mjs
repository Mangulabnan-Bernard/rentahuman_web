// Seeds the demo accounts. Run with: npx prisma db seed
// Requires DATABASE_URL to point at a migrated database.
//
// Passwords are hashed with the same scrypt format as app/lib/password.ts.
// The admin account is created here (by the operator), which is allowed — only
// public self-registration is restricted from assigning the admin role.

import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { scrypt, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt)

async function hashPassword(password) {
  const salt = randomBytes(16)
  const derived = await scryptAsync(password, salt, 64)
  return `scrypt$${salt.toString('hex')}$${derived.toString('hex')}`
}

const url = process.env.DATABASE_URL
if (!url) {
  console.error('DATABASE_URL is not set. Add it to .env.local before seeding.')
  process.exit(1)
}

const prisma = new PrismaClient({ adapter: new PrismaMariaDb(url) })

const demoUsers = [
  {
    email: 'demo@rentahuman.com',
    password: 'demo123',
    name: 'Demo Client',
    role: 'client',
    verificationStatus: 'verified',
    profileCompleted: true,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    email: 'agent@rentahuman.com',
    password: 'agent123',
    name: 'Demo Agent',
    role: 'agent',
    verificationStatus: 'verified',
    profileCompleted: true,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  {
    email: 'admin@rentahuman.com',
    password: 'admin123',
    name: 'Demo Admin',
    role: 'admin',
    verificationStatus: 'verified',
    profileCompleted: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
]

async function main() {
  for (const u of demoUsers) {
    const passwordHash = await hashPassword(u.password)
    const data = {
      name: u.name,
      role: u.role,
      passwordHash,
      verificationStatus: u.verificationStatus,
      profileCompleted: u.profileCompleted,
      image: u.image,
    }
    await prisma.user.upsert({
      where: { email: u.email },
      update: data,
      create: { email: u.email, ...data },
    })
    console.log(`seeded ${u.email} (${u.role})`)
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
