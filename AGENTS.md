# AGENTS.md

This document describes the project structure for developers and AI agents
working on this codebase.

## Project overview

A personal coaching website for a Pilates / bodyweight training / mobility
coach. It presents the coach's story and services, and lets prospective
clients submit booking requests, which are stored in Postgres and reviewed
by the coach on an admin page.

### Tech stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Database | Netlify Database (Postgres) via Drizzle ORM |
| Language | TypeScript 5.9 (strict mode) |
| Deployment | Netlify |

## Directory structure

```
├── db
│   ├── schema.ts        # Drizzle table definitions (booking_requests)
│   └── index.ts         # Drizzle client (Netlify Database adapter)
├── drizzle.config.ts    # Drizzle Kit config; migrations output to netlify/database/migrations
├── netlify/database/migrations/  # Auto-generated SQL migrations, applied by Netlify on deploy
├── src
│   ├── components
│   │   ├── Header.tsx        # Site header / nav
│   │   └── BookingForm.tsx   # Client booking form, calls createBooking server fn
│   ├── server
│   │   └── bookings.functions.ts  # createBooking, listBookings, updateBookingStatus
│   ├── routes
│   │   ├── __root.tsx    # Root layout, global styles, page metadata
│   │   ├── index.tsx     # Landing page: hero, journey, services, booking form
│   │   └── admin.tsx     # Admin dashboard: view + accept/decline booking requests
│   ├── router.tsx        # TanStack Router setup
│   └── styles.css        # Tailwind entrypoint
├── netlify.toml          # Build command, publish dir, dev server settings
└── tsconfig.json         # `@/*` path alias for `src/*`
```

## Key concepts

### Booking flow

1. A visitor fills out the form in `BookingForm.tsx` on the homepage.
2. It calls the `createBooking` server function (`src/server/bookings.functions.ts`),
   which inserts a row into the `booking_requests` table with status `pending`.
3. The coach visits `/admin`, enters the shared `ADMIN_KEY` (set as an env var),
   and sees all requests via `listBookings`.
4. Accepting or declining a request calls `updateBookingStatus`, which updates
   the row's status. There is no email/notification integration yet — the
   coach checks `/admin` manually.

### Admin auth

`/admin` is gated by a single shared secret (`ADMIN_KEY` env var) compared
server-side inside the `listBookings` / `updateBookingStatus` server functions.
This is intentionally lightweight (no user accounts) since there is only one
coach. If multi-user auth is ever needed, look at the `tanstack-start-identity`
skill for Netlify Identity integration.

### Database

- All schema changes go in `db/schema.ts`, followed by `npx drizzle-kit generate`
  to produce a migration in `netlify/database/migrations/`. Never hand-write
  `CREATE TABLE` SQL when using Drizzle — the schema file is the source of truth.
- Netlify applies migrations automatically at deploy time; do not run
  `drizzle-kit migrate` or `push` locally.

## Conventions

- Components: PascalCase, in `src/components/`.
- Server functions: `*.functions.ts` in `src/server/`, using `createServerFn`
  with `.inputValidator(...)` (zod schemas) for all inputs.
- Routes: file-based under `src/routes/`, following TanStack Router conventions.
- TypeScript strict mode; import paths use the `@/` alias for `src/*`.
- Tailwind CSS utility classes for styling; no CSS-in-JS.

## Development commands

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build
netlify dev      # Full local emulation including Netlify Database
```
