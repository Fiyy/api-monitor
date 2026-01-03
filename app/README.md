# APIShift Application

This directory contains the main Next.js application for APIShift.

## Documentation

For comprehensive documentation, please refer to:

- **[Project Overview](../README.md)** - Main README with project introduction
- **[Development Setup](../docs/DEVELOPMENT.md)** - Complete local development guide
- **[Deployment Guide](../docs/DEPLOYMENT.md)** - Production deployment instructions
- **[Architecture](../docs/ARCHITECTURE.md)** - Technical design and system architecture
- **[API Reference](../docs/API.md)** - tRPC API documentation

## Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Copy environment template
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
npx prisma generate
npx prisma migrate dev

# Start development server
npm run dev
```

Visit http://localhost:3000

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS v4
- shadcn/ui
- Prisma ORM
- NextAuth.js v5
- tRPC

## Learn More

See the [Development Guide](../docs/DEVELOPMENT.md) for detailed setup instructions and development workflows.
