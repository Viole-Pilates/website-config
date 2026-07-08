# Pilates, Bodyweight & Mobility Coaching

A personal coaching website for promoting a Pilates / bodyweight training /
mobility practice and taking booking requests online.

## What's here

- A landing page with a hero section, the coach's journey/story, a services
  overview (Pilates, Bodyweight Training, Mobility), and a booking form.
- A booking form that saves requests to a Postgres database (Netlify Database).
- An admin page (`/admin`) protected by a shared admin key, where the coach
  can view incoming booking requests and accept or decline them.

The coach name ("Alex Rivera") and hero copy are placeholders — replace them
in `src/components/Header.tsx` and `src/routes/index.tsx` with real details.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19 + TanStack Router)
- Vite 7
- Tailwind CSS 4
- Netlify Database (managed Postgres) with Drizzle ORM
- Deployed on Netlify

## Running locally

```bash
npm install
npm run dev
```

For full local emulation of Netlify features (database, functions), use the
Netlify CLI instead:

```bash
netlify dev
```

## Admin access

Set an `ADMIN_KEY` environment variable (in Netlify site settings, or a local
`.env`) — this is the password used to unlock `/admin`.

## Database

Schema lives in `db/schema.ts`. After changing it, generate a migration:

```bash
npx drizzle-kit generate
```

Netlify applies migrations automatically on deploy.
