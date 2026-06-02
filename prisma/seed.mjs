// Seeds the demo accounts. Run with: npx prisma db seed
// Requires DATABASE_URL to point at a migrated database.
//
// Passwords are hashed with the same scrypt format as app/lib/password.ts.
// The admin account is created here (by the operator), which is allowed — only
// public self-registration is restricted from assigning the admin role.

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { scrypt, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt)

async function hashPassword(password) {
  const salt = randomBytes(16)
  const derived = await scryptAsync(password, salt, 64)
  return `scrypt$${salt.toString('hex')}$${derived.toString('hex')}`
}

// Seed over the direct/session connection (more reliable than the pooler).
const url = process.env.DIRECT_URL || process.env.DATABASE_URL
if (!url) {
  console.error('DIRECT_URL/DATABASE_URL is not set. Add it to .env.local before seeding.')
  process.exit(1)
}

const isLocal = /@(localhost|127\.0\.0\.1)[:/]/.test(url)
const adapter = isLocal
  ? new PrismaPg(url)
  : new PrismaPg({ connectionString: url, ssl: { rejectUnauthorized: false } })
const prisma = new PrismaClient({ adapter })

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

  const client = await prisma.user.findUnique({ where: { email: 'demo@rentahuman.com' } })
  const agent = await prisma.user.findUnique({ where: { email: 'agent@rentahuman.com' } })

  // Seed sample tasks once (idempotent: only when there are none).
  if (client && agent && (await prisma.task.count()) === 0) {
    const validation = await prisma.task.create({
      data: {
        title: 'AI Model Training Data Validation',
        description: 'Review and validate labeled training data for a new language model.',
        category: 'Data Validation',
        budget: 500,
        deadline: new Date('2026-07-15'),
        status: 'open',
        urgency: 'high',
        skills: ['Data Annotation', 'Quality Assurance'],
        postedById: client.id,
      },
    })
    const moderation = await prisma.task.create({
      data: {
        title: 'Content Moderation for AI Assistant',
        description: 'Review AI-generated responses for accuracy and safety.',
        category: 'Content Moderation',
        budget: 300,
        deadline: new Date('2026-06-20'),
        status: 'in_progress',
        urgency: 'medium',
        progress: 60,
        skills: ['Content Review', 'Policy Enforcement'],
        postedById: client.id,
        assignedAgentId: agent.id,
      },
    })
    const training = await prisma.task.create({
      data: {
        title: 'Customer Service AI Training',
        description: 'Provide real conversation examples for AI training.',
        category: 'AI Training',
        budget: 450,
        status: 'completed',
        urgency: 'low',
        progress: 100,
        skills: ['Customer Service', 'Communication'],
        postedById: client.id,
        assignedAgentId: agent.id,
      },
    })
    console.log('seeded 3 sample tasks')

    if ((await prisma.earning.count()) === 0) {
      await prisma.earning.createMany({
        data: [
          {
            taskId: training.id,
            agentId: agent.id,
            amount: 450,
            status: 'paid_out',
            description: 'Completed customer service AI training.',
            date: new Date('2026-05-20'),
          },
          {
            taskId: moderation.id,
            agentId: agent.id,
            amount: 300,
            status: 'claimable',
            description: 'Content moderation review milestone.',
            date: new Date('2026-05-28'),
          },
          {
            taskId: validation.id,
            agentId: agent.id,
            amount: 500,
            status: 'pending',
            description: 'Data validation in progress.',
            date: new Date('2026-06-01'),
          },
        ],
      })
      console.log('seeded 3 sample earnings')
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
