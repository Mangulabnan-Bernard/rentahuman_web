# RentHuman

A marketplace that connects AI systems with human intelligence. **Clients** post and
fund tasks; **agents** complete them. The app is built with the Next.js App Router,
TypeScript, and Tailwind CSS.

> The current build runs on in-memory mock data so it can be explored without any
> external services. A Prisma/MySQL schema is included as the persistence foundation
> (see [Database](#database)).

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

Copy `.env.example` to `.env.local`. For local development the only variable that
matters is `AUTH_SECRET` (used to sign session cookies); a dev fallback is used if it
is unset, but you should set a real value:

```bash
# generate a secret
openssl rand -base64 32
```

`DATABASE_URL` and the OAuth variables are only needed once you wire up the database
and social sign-in.

### Demo accounts

| Role   | Email                  | Password   |
| ------ | ---------------------- | ---------- |
| Client | demo@rentahuman.com    | demo123    |
| Agent  | agent@rentahuman.com   | agent123   |
| Admin  | admin@rentahuman.com   | admin123   |

New sign-ups can register as **client** or **agent** only — the admin role is never
self-assignable.

## Authentication & Authorization

Auth is intentionally server-authoritative:

- `POST /api/auth` validates credentials and issues a **signed, httpOnly session
  cookie** (`app/lib/session.ts`, HMAC-SHA256 over the payload).
- `middleware.ts` verifies that cookie on every request to a protected route and
  enforces role-based access **on the server** — `localStorage` is never trusted for
  authorization.
- `app/components/RouteGuard.tsx` adds a client-side guard that shows a loading state
  and never paints protected content before access is verified.

Protected route trees: `/dashboard/*` (any signed-in user), `/admin/*` (admin only),
`/submit-task` (clients).

## Project structure

```
app/
  api/            Route handlers (auth, tasks, users)
  components/     Shared UI (Navbar, Footer, RouteGuard, ...)
  dashboard/      Authenticated dashboard + subpages (layout-guarded)
  lib/            Server-only modules (session signing, user store)
  mock/           In-memory demo data
  utils/          Client helpers, auth types, theme
middleware.ts     Server-side route protection + RBAC
prisma/           Database schema (MySQL)
```

## Database

`prisma/schema.prisma` defines the MySQL models (`User`, `Task`, `Earning`, plus the
Auth.js adapter tables). To move off mock data:

```bash
# 1. set DATABASE_URL in .env.local
npx prisma generate
npx prisma migrate dev --name init
```

Then replace the in-memory store in `app/lib/users.ts` and the mock data in
`app/mock/*` with Prisma queries.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start the dev server     |
| `npm run build` | Production build         |
| `npm run start` | Serve the production build |
| `npm run lint`  | Run ESLint               |
