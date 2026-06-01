import path from 'node:path'
import fs from 'node:fs'
import { defineConfig } from 'prisma/config'

/**
 * Prisma 7 no longer implicitly loads .env files. Load .env.local then .env
 * (first definition wins, never overwriting already-set vars) so the Prisma CLI
 * (`migrate`, `db seed`) reads DATABASE_URL from the same place the Next app
 * does. Best-effort and never throws.
 */
function loadEnvFiles() {
  for (const file of ['.env.local', '.env']) {
    try {
      const fullPath = path.join(process.cwd(), file)
      if (!fs.existsSync(fullPath)) continue
      for (const rawLine of fs.readFileSync(fullPath, 'utf8').split('\n')) {
        const line = rawLine.trim()
        if (!line || line.startsWith('#')) continue
        const eq = line.indexOf('=')
        if (eq === -1) continue
        const key = line.slice(0, eq).trim()
        if (!key || key in process.env) continue
        let value = line.slice(eq + 1).trim()
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1)
        }
        process.env[key] = value
      }
    } catch {
      // Ignore unreadable / malformed env files.
    }
  }
}

loadEnvFiles()

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
  migrations: {
    seed: 'node prisma/seed.mjs',
  },
})
