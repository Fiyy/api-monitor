# Technical Architecture

This document describes the technical design and system architecture of APIShift.

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    User Layer                           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │  Browser   │  │   Mobile   │  │  Webhooks  │        │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘        │
└────────┼────────────────┼────────────────┼───────────────┘
         │                │                │
         └────────────────┴────────┬───────┘
                                   │
┌──────────────────────────────────┼──────────────────────┐
│               Application Layer  │                      │
│  ┌──────────────────────────────┴────────────────────┐ │
│  │              Next.js 16 App                        │ │
│  │  ┌─────────┐  ┌─────────┐  ┌──────────────────┐  │ │
│  │  │ Pages   │  │  tRPC   │  │  NextAuth.js     │  │ │
│  │  │ (React) │  │  API    │  │  (Auth)          │  │ │
│  │  └─────────┘  └─────────┘  └──────────────────┘  │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────┼───────────────────────────────┐
│               Service Layer                             │
│  ┌────────────┐  ┌──────┴───────┐  ┌─────────────┐    │
│  │  Vercel    │  │   Monitor    │  │  Notifier   │    │
│  │   Cron     │  │   Service    │  │  Service    │    │
│  │            │  │              │  │             │    │
│  │  Schedule  │  │  - Fetch API │  │  - Email    │    │
│  │  Checks    │  │  - Compare   │  │  - Webhook  │    │
│  │            │  │  - Diff      │  │             │    │
│  └────────────┘  └──────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────┼───────────────────────────────┐
│               Data Layer                                │
│  ┌────────────────────┐                                 │
│  │  PostgreSQL        │                                 │
│  │  (Supabase)        │                                 │
│  │                    │                                 │
│  │  - Users           │                                 │
│  │  - APIs            │                                 │
│  │  - Snapshots       │                                 │
│  │  - Alerts          │                                 │
│  └────────────────────┘                                 │
└─────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Next.js 16 + React 19 | SSR, App Router, full-stack capability |
| **Styling** | Tailwind CSS v4 + shadcn/ui | Rapid development, modern UI |
| **Backend API** | tRPC | Type-safe, excellent Next.js integration |
| **Database** | PostgreSQL (Supabase) | Reliable, managed, free tier |
| **ORM** | Prisma v5 | Type-safe database access |
| **Auth** | NextAuth.js v5 | OAuth providers, database sessions |
| **Scheduling** | Vercel Cron | Native integration, serverless |
| **Deployment** | Vercel | Edge network, automatic deployments |

## Core Algorithms

### Schema Inference

Automatically infers JSON API response structure:

```typescript
interface SchemaNode {
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  properties?: Record<string, SchemaNode>;
  items?: SchemaNode;
  nullable?: boolean;
}

function inferSchema(data: any): SchemaNode {
  if (data === null) return { type: 'null' };

  if (Array.isArray(data)) {
    return {
      type: 'array',
      items: data.length > 0 ? inferSchema(data[0]) : { type: 'null' }
    };
  }

  if (typeof data === 'object') {
    const properties: Record<string, SchemaNode> = {};
    for (const [key, value] of Object.entries(data)) {
      properties[key] = inferSchema(value);
    }
    return { type: 'object', properties };
  }

  return { type: typeof data as SchemaNode['type'] };
}
```

### Schema Comparison

Detects changes between API versions:

```typescript
interface SchemaChange {
  path: string;
  type: 'added' | 'removed' | 'type_changed' | 'nullable_changed';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  oldValue?: any;
  newValue?: any;
  message: string;
}

function compareSchemas(
  oldSchema: SchemaNode,
  newSchema: SchemaNode,
  path: string = ''
): SchemaChange[] {
  const changes: SchemaChange[] = [];

  // Type changes (breaking)
  if (oldSchema.type !== newSchema.type) {
    changes.push({
      path,
      type: 'type_changed',
      severity: 'HIGH',
      oldValue: oldSchema.type,
      newValue: newSchema.type,
      message: `Type changed from ${oldSchema.type} to ${newSchema.type}`
    });
    return changes;
  }

  // Object property comparison
  if (oldSchema.type === 'object' && newSchema.type === 'object') {
    const oldKeys = new Set(Object.keys(oldSchema.properties || {}));
    const newKeys = new Set(Object.keys(newSchema.properties || {}));

    // Detect additions
    for (const key of newKeys) {
      if (!oldKeys.has(key)) {
        changes.push({
          path: path ? `${path}.${key}` : key,
          type: 'added',
          severity: 'LOW',
          newValue: newSchema.properties![key],
          message: `Field added`
        });
      }
    }

    // Detect removals (breaking)
    for (const key of oldKeys) {
      if (!newKeys.has(key)) {
        changes.push({
          path: path ? `${path}.${key}` : key,
          type: 'removed',
          severity: 'CRITICAL',
          oldValue: oldSchema.properties![key],
          message: `Field removed`
        });
      }
    }

    // Recursively compare shared fields
    for (const key of oldKeys) {
      if (newKeys.has(key)) {
        const nestedPath = path ? `${path}.${key}` : key;
        changes.push(...compareSchemas(
          oldSchema.properties![key],
          newSchema.properties![key],
          nestedPath
        ));
      }
    }
  }

  return changes;
}
```

### Monitoring Flow

```typescript
export async function checkApi(apiId: string): Promise<CheckResult> {
  // 1. Fetch API details
  const api = await prisma.api.findUnique({ where: { id: apiId } });

  // 2. Make HTTP request
  const response = await fetch(api.url, {
    method: api.method,
    headers: api.headers as Record<string, string>
  });

  // 3. Infer current schema
  const data = await response.json();
  const newSchema = inferSchema(data);

  // 4. Compare with previous schema
  const changes = api.lastSchema
    ? compareSchemas(api.lastSchema as SchemaNode, newSchema)
    : [];

  // 5. Save snapshot
  await prisma.apiSnapshot.create({
    data: {
      apiId: api.id,
      schema: newSchema,
      responseHash: hash(data),
      statusCode: response.status,
      latencyMs: responseTime
    }
  });

  // 6. Create alert if changes detected
  if (changes.length > 0) {
    await prisma.changeAlert.create({
      data: {
        apiId: api.id,
        diffs: changes,
        severity: getOverallSeverity(changes)
      }
    });
  }

  // 7. Update API record
  await prisma.api.update({
    where: { id: api.id },
    data: {
      lastSchema: newSchema,
      lastCheckedAt: new Date(),
      nextCheckAt: new Date(Date.now() + api.checkInterval * 60 * 1000)
    }
  });

  return { success: true, hasChanges: changes.length > 0 };
}
```

## Database Schema

```prisma
model User {
  id            String         @id @default(cuid())
  email         String         @unique
  name          String?
  image         String?

  apis          Api[]
  subscription  Subscription?

  @@index([email])
}

model Api {
  id            String      @id @default(cuid())
  userId        String
  user          User        @relation(fields: [userId], references: [id], onDelete: Cascade)

  name          String
  url           String
  method        HttpMethod  @default(GET)
  headers       Json        @default("{}")

  checkInterval Int         @default(1440)  // minutes
  lastSchema    Json?
  lastCheckedAt DateTime?
  nextCheckAt   DateTime?
  enabled       Boolean     @default(true)

  snapshots     ApiSnapshot[]
  alerts        ChangeAlert[]

  @@index([userId])
  @@index([nextCheckAt])
}

model ApiSnapshot {
  id           String   @id @default(cuid())
  apiId        String
  api          Api      @relation(fields: [apiId], references: [id], onDelete: Cascade)

  schema       Json
  responseHash String
  statusCode   Int
  latencyMs    Int
  checkedAt    DateTime @default(now())

  @@index([apiId, checkedAt])
}

model ChangeAlert {
  id             String   @id @default(cuid())
  apiId          String
  api            Api      @relation(fields: [apiId], references: [id], onDelete: Cascade)

  diffs          Json
  severity       Severity @default(MEDIUM)
  notifiedAt     DateTime @default(now())
  acknowledged   Boolean  @default(false)
  acknowledgedAt DateTime?

  @@index([apiId, notifiedAt])
}

enum Severity {
  LOW       // New optional fields
  MEDIUM    // Type changes
  HIGH      // Field removals
  CRITICAL  // Root structure changes
}
```

## Security

### Authentication
- OAuth 2.0 via GitHub and Google
- Secure session management with NextAuth.js
- Database-backed sessions (not JWT)

### Data Protection
- All API headers stored in database (consider encryption for production)
- User data scoped by userId in all queries
- No API keys exposed to client-side code

### API Security
- tRPC procedures use `protectedProcedure` middleware
- All database queries filtered by user ownership
- No direct SQL exposure

## Performance

### Optimization Strategies
1. **Database Indexing**: Key fields indexed for fast queries
2. **Connection Pooling**: Supabase pgBouncer for scalable connections
3. **Batch Processing**: Scheduled checks run in batches of 5
4. **Serverless Functions**: Auto-scaling with Vercel
5. **Edge Network**: Static assets served via CDN

### Scaling Considerations
- Current architecture supports up to 10,000 APIs per user
- Cron jobs can be split across multiple schedules
- Database can be upgraded to higher Supabase tier
- Consider Redis caching for frequently accessed data

## Monitoring Architecture

```
Scheduled Check (Vercel Cron)
    │
    ├─> Fetch APIs due for check
    │
    ├─> Batch process (5 at a time)
    │   ├─> HTTP request to target API
    │   ├─> Infer schema from response
    │   ├─> Compare with previous schema
    │   ├─> Save snapshot
    │   ├─> Create alert if changes detected
    │   └─> Update next check time
    │
    └─> Return summary statistics
```

## Future Enhancements

### Planned Features
- **WebSocket Support**: Real-time API monitoring
- **GraphQL Schema Detection**: Support for GraphQL APIs
- **Custom Diff Rules**: User-defined severity levels
- **Notification Channels**: Email, Slack, Discord, webhooks
- **Historical Analytics**: Trend analysis and charts
- **Team Collaboration**: Shared API monitoring

### Scalability Roadmap
- Implement Redis for caching and rate limiting
- Add queue system for high-volume checks
- Introduce background job processing with Trigger.dev
- Database read replicas for analytics queries
