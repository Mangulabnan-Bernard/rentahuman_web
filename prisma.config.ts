import path from 'node:path'
import { defineConfig } from 'prisma/config'

/**
 * Prisma 7 configuration. The datasource URL lives here (read from
 * DATABASE_URL) rather than in schema.prisma. An empty fallback keeps
 * `prisma generate` working when no database is configured; migrate/seed
 * commands require a real DATABASE_URL.
 */
export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
  migrations: {
    seed: 'node prisma/seed.mjs',
  },
})
