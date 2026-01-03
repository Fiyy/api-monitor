# APIShift

> Real-time API schema monitoring and change detection platform

![Production](https://img.shields.io/badge/status-production-green)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

**Live**: [https://apishift.site](https://apishift.site)

## Overview

APIShift automatically monitors third-party APIs for schema changes and alerts you before breaking changes affect your production systems. Stop discovering API changes through errors—detect them proactively.

### Key Features

- **Automatic Schema Detection**: Intelligently infers API response schemas
- **Change Tracking**: Detects additions, removals, and type changes
- **Smart Alerts**: Configurable severity levels (Critical, High, Medium, Low)
- **Historical Snapshots**: Track API evolution over time
- **Multi-Method Support**: GET, POST, PUT, PATCH, DELETE
- **Custom Headers**: Support for authentication and custom headers
- **Real-time Dashboard**: Monitor all APIs from a single interface

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Supabase account)
- Vercel account (for deployment)

### Local Development

```bash
# Clone the repository
git clone https://github.com/Fiyy/api-monitor.git
cd api-monitor/app

# Install dependencies
npm install --legacy-peer-deps

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"
GOOGLE_ID="your-google-oauth-id"          # Optional
GOOGLE_SECRET="your-google-oauth-secret"  # Optional

# Cron Security
CRON_SECRET="your-cron-secret"
```

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](./docs/ARCHITECTURE.md) | Technical design and system architecture |
| [Deployment](./docs/DEPLOYMENT.md) | Production deployment guide |
| [Development](./docs/DEVELOPMENT.md) | Local development setup |
| [API Reference](./docs/API.md) | API endpoints and tRPC procedures |

## Tech Stack

**Frontend**
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS
- shadcn/ui

**Backend**
- tRPC (Type-safe APIs)
- Prisma ORM
- NextAuth.js (Authentication)
- PostgreSQL (Supabase)

**Infrastructure**
- Vercel (Hosting & Serverless Functions)
- Vercel Cron (Scheduled Checks)
- Supabase (Database)

## Project Structure

```
api-monitor/
├── app/                    # Next.js application
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities and core logic
│   │   ├── server/        # tRPC routers
│   │   └── styles/        # Global styles
│   ├── prisma/            # Database schema
│   ├── public/            # Static assets
│   └── vercel.json        # Vercel configuration
└── docs/                  # Documentation
```

## Core Concepts

### API Monitoring

APIShift periodically fetches your configured APIs and extracts their response schemas. When a schema change is detected, the system:

1. **Compares** the new schema with the last known schema
2. **Identifies** additions, removals, and type changes
3. **Categorizes** changes by severity
4. **Creates** an alert in the dashboard
5. **Notifies** via configured channels (email, webhooks, etc.)

### Schema Inference

The schema inference engine analyzes JSON responses and creates a structured representation of the data types and structure. It handles:

- Primitive types (string, number, boolean, null)
- Objects and nested structures
- Arrays and array item types
- Nullable fields

### Change Detection

Changes are categorized as:

- **Added**: New fields or properties
- **Removed**: Deleted fields (breaking change)
- **Type Changed**: Field type modifications (breaking change)
- **Nullable Changed**: Nullability modifications

## Pricing Tiers

| Plan | Price | APIs | Check Frequency | Features |
|------|-------|------|-----------------|----------|
| **Free** | $0/mo | 5 | Hourly | Basic monitoring |
| **Pro** | $29/mo | 50 | Every 5 min | Advanced diff, webhooks |
| **Team** | $99/mo | Unlimited | Real-time | Custom rules, team features |

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support

- **Documentation**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/Fiyy/api-monitor/issues)
- **Email**: support@apishift.site

---

**Built with ❤️ using Next.js and deployed on Vercel**
