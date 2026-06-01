/**
 * Prisma client singleton (server-only).
 *
 * Returns null when DATABASE_URL is not configured, which lets the rest of the
 * app fall back to the in-memory store (app/lib/users.ts). When DATABASE_URL is
 * set, a single PrismaClient is created using the MariaDB/MySQL driver adapter
 * (Prisma 7 requires a driver adapter rather than a datasource URL in the
 * schema). The instance is cached on globalThis to survive dev hot-reloads.
 */
import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const globalForPrisma = globalThis as unknown as { __rhPrisma?: PrismaClient }

export function getPrisma(): PrismaClient | null {
  const url = process.env.DATABASE_URL
  if (!url) return null

  if (!globalForPrisma.__rhPrisma) {
    const adapter = new PrismaMariaDb(url)
    globalForPrisma.__rhPrisma = new PrismaClient({ adapter })
  }
  return globalForPrisma.__rhPrisma
}

/** True when the app is backed by a real database rather than the mock store. */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL)
}
