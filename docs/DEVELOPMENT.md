# Local Development Guide

Get APIShift running on your local machine for development.

## Prerequisites

- **Node.js 18+** (v22.17.1 recommended)
- **PostgreSQL 14+** (local installation or Supabase)
- **GitHub account** (for OAuth)
- **Git**

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/Fiyy/api-monitor.git
cd api-monitor/app

# Install dependencies
npm install --legacy-peer-deps
```

**Note**: `--legacy-peer-deps` is required due to Next.js 16 and NextAuth.js v5 beta compatibility.

### 2. Database Setup

#### Option A: Local PostgreSQL

Install and start PostgreSQL:

```bash
# macOS (Homebrew)
brew install postgresql@16
brew services start postgresql@16

# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql

# Create database
createdb apishift

# Or using psql
psql postgres
CREATE DATABASE apishift;
\q
```

#### Option B: Supabase (Recommended)

1. Go to https://supabase.com and create project
2. Get connection string from Settings > Database
3. Use "Connection pooling" URL with Transaction mode
4. Add `?pgbouncer=true` parameter

### 3. Environment Configuration

Create `.env` file:

```bash
cp .env.example .env
```

Update with your values:

```bash
# Database (local)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/apishift?schema=public"

# Or Supabase
DATABASE_URL="postgresql://postgres.[ref]:[password]@...pooler.supabase.com:6543/postgres?pgbouncer=true"

# NextAuth (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="development-secret-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth
GITHUB_ID="your-github-oauth-client-id"
GITHUB_SECRET="your-github-oauth-client-secret"

# Google OAuth (optional)
GOOGLE_ID="your-google-oauth-client-id"
GOOGLE_SECRET="your-google-oauth-client-secret"

# Cron Security (any random string for dev)
CRON_SECRET="development-cron-secret"
```

### 4. Set Up GitHub OAuth

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Configure:
   - **Application name**: `APIShift Dev`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID → `GITHUB_ID` in `.env`
5. Generate and copy Client Secret → `GITHUB_SECRET` in `.env`

### 5. Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Optional: View database in GUI
npx prisma studio
```

### 6. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Project Structure

```
app/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts  # NextAuth
│   │   │   ├── cron/check-apis/route.ts     # Cron job
│   │   │   └── trpc/[trpc]/route.ts         # tRPC handler
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── login/             # Auth pages
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── dashboard/         # Dashboard components
│   │   ├── alerts/            # Alert components
│   │   └── apis/              # API management components
│   ├── lib/                   # Utilities and services
│   │   ├── auth.ts            # NextAuth config
│   │   ├── prisma.ts          # Prisma client
│   │   ├── monitoring-service.ts  # Core monitoring logic
│   │   ├── schema-extractor.ts    # Schema inference
│   │   ├── schema-diff.ts         # Change detection
│   │   └── trpc/              # tRPC client setup
│   ├── server/                # Server-side code
│   │   ├── routers/           # tRPC routers
│   │   │   ├── api.ts         # API CRUD operations
│   │   │   ├── monitor.ts     # Monitoring operations
│   │   │   └── _app.ts        # Root router
│   │   └── trpc.ts            # tRPC config
│   └── types/                 # TypeScript types
├── .env                       # Environment variables (gitignored)
├── .env.example               # Template
├── vercel.json                # Vercel config
└── package.json
```

## Development Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production build
npm run lint             # Run ESLint

# Database
npx prisma generate      # Generate Prisma Client
npx prisma migrate dev   # Create and apply migration
npx prisma migrate reset # Reset database (destructive!)
npx prisma studio        # Open database GUI
npx prisma db push       # Push schema changes (no migration)
npx prisma db pull       # Pull schema from database

# Formatting
npm run format           # Format code with Prettier (if configured)
```

## Working with the Database

### Creating Migrations

When you modify `prisma/schema.prisma`:

```bash
# Create migration with descriptive name
npx prisma migrate dev --name add_user_preferences

# Prisma will:
# 1. Generate SQL migration file
# 2. Apply migration to database
# 3. Regenerate Prisma Client
```

### Viewing Data

```bash
# Open Prisma Studio GUI
npx prisma studio
# Opens at http://localhost:5555
```

### Seeding Data (Optional)

Create `prisma/seed.ts` for test data:

```typescript
import { prisma } from '../src/lib/prisma'

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User'
    }
  })

  console.log({ user })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Run with: `npx prisma db seed`

## Using tRPC

### Client-side Usage

```tsx
'use client'

import { trpc } from '@/lib/trpc/client'

export function MyComponent() {
  // Query
  const { data, isLoading } = trpc.api.list.useQuery()

  // Mutation
  const createApi = trpc.api.create.useMutation({
    onSuccess: () => {
      // Refetch list after creation
      trpc.useUtils().api.list.invalidate()
    }
  })

  const handleCreate = () => {
    createApi.mutate({
      name: 'My API',
      url: 'https://api.example.com/data',
      method: 'GET'
    })
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <button onClick={handleCreate}>Add API</button>
      {data?.map(api => <div key={api.id}>{api.name}</div>)}
    </div>
  )
}
```

### Server-side Usage

```tsx
import { api } from '@/server/routers/_app'

export default async function ServerComponent() {
  const apis = await api.api.list()

  return <div>{apis.length} APIs</div>
}
```

## Authentication

### Protecting Pages

```tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return <div>Hello {session.user?.name}</div>
}
```

### Protecting API Routes

```typescript
import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ data: 'Protected data' })
}
```

## Adding UI Components

APIShift uses shadcn/ui. Add components as needed:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
```

Components are added to `src/components/ui/`

## Debugging

### Enable Prisma Query Logging

```typescript
// src/lib/prisma.ts
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})
```

### View tRPC Requests

tRPC logs are visible in the browser console and server terminal.

### NextAuth Debug Mode

```bash
# In .env
NEXTAUTH_DEBUG=true
```

## Common Issues

### Database Connection Fails

```bash
# Check PostgreSQL is running
brew services list  # macOS
sudo systemctl status postgresql  # Linux

# Test connection
psql -h localhost -U postgres -d apishift
```

### Prisma Client Not Found

```bash
# Regenerate client
npx prisma generate
```

### OAuth Errors

- Verify callback URL matches exactly: `http://localhost:3000/api/auth/callback/github`
- Check `NEXTAUTH_URL` is set to `http://localhost:3000`
- Ensure `NEXTAUTH_SECRET` is set (any random string for dev)

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### TypeScript Errors After Schema Change

```bash
# Regenerate Prisma Client and restart dev server
npx prisma generate
# Ctrl+C to stop dev server
npm run dev
```

## Testing Workflow

### Manual Testing

1. Start dev server: `npm run dev`
2. Sign in with GitHub OAuth
3. Add a test API (e.g., https://api.github.com/users/github)
4. Manually trigger check
5. Verify snapshot and schema detection
6. Modify API structure and check again to test diff detection

### API Endpoints to Test

- Dashboard: http://localhost:3000/dashboard
- APIs List: http://localhost:3000/dashboard/apis
- Alerts: http://localhost:3000/dashboard/alerts
- Add API: http://localhost:3000/dashboard/apis/new

## Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Run `npm run lint` before committing
- **Imports**: Use `@/` alias for absolute imports from `src/`
- **Components**: Functional components with TypeScript
- **File naming**: kebab-case for files, PascalCase for components

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/add-webhook-notifications

# Make changes, commit frequently
git add .
git commit -m "Add webhook notification support"

# Push and create PR
git push origin feature/add-webhook-notifications
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Getting Help

- Check existing GitHub issues
- Review documentation above
- Ask in project discussions (if enabled)
