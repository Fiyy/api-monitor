# APIShift - Development Setup

This is the main application for APIShift, an API structure change monitoring tool.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **API**: tRPC for type-safe APIs
- **State Management**: React Query (@tanstack/react-query)

## Prerequisites

- Node.js 18+ (22.17.1 recommended)
- PostgreSQL 14+ (local or hosted)
- GitHub account (for OAuth)
- Git

## Getting Started

### 1. Clone and Install Dependencies

```bash
npm install --legacy-peer-deps
```

**Note**: We use `--legacy-peer-deps` due to Next.js 16 and NextAuth 5 beta compatibility.

### 2. Set Up Database

#### Option A: Local PostgreSQL

Install PostgreSQL locally and create a database:

```bash
# On macOS with Homebrew
brew install postgresql@16
brew services start postgresql@16

# Create database
createdb apishift

# Or using psql
psql postgres
CREATE DATABASE apishift;
\q
```

#### Option B: Use Supabase (Recommended for production)

1. Go to https://supabase.com
2. Create a new project
3. Copy the connection string from Settings > Database
4. Use the "Connection pooling" URL for DATABASE_URL

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your values:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/apishift?schema=public"

# NextAuth
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth (create at https://github.com/settings/developers)
GITHUB_ID="your-github-oauth-app-id"
GITHUB_SECRET="your-github-oauth-app-secret"

# Google OAuth (optional)
GOOGLE_ID="your-google-oauth-client-id"
GOOGLE_SECRET="your-google-oauth-client-secret"
```

### 4. Set Up GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - Application name: `APIShift Dev`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env`

### 5. Generate Prisma Client and Run Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Optional: Open Prisma Studio to view database
npx prisma studio
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth API routes
│   │   │   └── trpc/          # tRPC API routes
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   └── ui/                # shadcn/ui components
│   ├── lib/                   # Utilities
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── prisma.ts          # Prisma client
│   │   └── trpc/              # tRPC client setup
│   ├── server/                # Server-side code
│   │   ├── routers/           # tRPC routers
│   │   │   ├── api.ts         # API monitoring routes
│   │   │   ├── user.ts        # User routes
│   │   │   └── _app.ts        # Main router
│   │   └── trpc.ts            # tRPC initialization
│   └── types/                 # TypeScript type definitions
├── .env                       # Environment variables (git-ignored)
├── .env.example               # Example environment variables
├── prisma.config.ts           # Prisma configuration
└── package.json
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npx prisma generate      # Generate Prisma Client
npx prisma migrate dev   # Create and apply migrations
npx prisma migrate deploy # Apply migrations (production)
npx prisma studio        # Open Prisma Studio GUI
npx prisma db push       # Push schema changes without migrations
```

## Database Migrations

When you modify the Prisma schema:

1. Make changes to `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name describe_your_change`
3. Prisma will generate SQL migrations and update the client

## Using tRPC

The app uses tRPC for type-safe API calls. Example:

```tsx
'use client'

import { trpc } from '@/lib/trpc/client'

export function MyComponent() {
  const { data, isLoading } = trpc.api.list.useQuery()

  if (isLoading) return <div>Loading...</div>

  return <div>{data?.length} APIs monitored</div>
}
```

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# etc...
```

## Authentication

The app uses NextAuth.js with database sessions. To protect a page:

```tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return <div>Protected content</div>
}
```

## Common Issues

### Prisma Client not found

```bash
npx prisma generate
```

### Database connection fails

- Check that PostgreSQL is running
- Verify DATABASE_URL in `.env`
- Ensure the database exists

### OAuth redirect errors

- Verify callback URLs match exactly
- Check NEXTAUTH_URL is set correctly
- Ensure OAuth app is not suspended

### TypeScript errors

```bash
npm run build
```

## Deployment

See [deployment-guide.md](../docs/deployment-guide.md) for production deployment instructions.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [tRPC Documentation](https://trpc.io)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Support

For issues or questions, please create an issue in the GitHub repository.
