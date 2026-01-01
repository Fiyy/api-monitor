# APIShift 技术架构设计

---

## 1. 架构概览

### 系统架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                         用户层                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Web UI  │  │   CLI    │  │   API    │  │  Webhook │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
└───────┼─────────────┼─────────────┼─────────────┼───────────────┘
        │             │             │             │
        └─────────────┴──────┬──────┴─────────────┘
                             │
┌────────────────────────────┼────────────────────────────────────┐
│                      应用层 │                                    │
│  ┌─────────────────────────┴─────────────────────────────────┐  │
│  │                    Next.js App                             │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │  │
│  │  │  Dashboard  │  │  API Routes │  │   Auth      │        │  │
│  │  │  (React)    │  │  (tRPC)     │  │  (NextAuth) │        │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘        │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────────┐
│                      服务层 │                                    │
│  ┌──────────────┐  ┌───────┴──────┐  ┌──────────────┐          │
│  │   Scheduler  │  │   Checker    │  │   Notifier   │          │
│  │  (Trigger.dev)│  │   Service   │  │   Service    │          │
│  │              │  │              │  │              │          │
│  │  - Cron Jobs │  │  - Fetch API │  │  - Email     │          │
│  │  - Queue     │  │  - Compare   │  │  - Slack     │          │
│  │              │  │  - Diff      │  │  - Webhook   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────────┐
│                      数据层 │                                    │
│  ┌──────────────┐  ┌───────┴──────┐  ┌──────────────┐          │
│  │   Postgres   │  │    Redis     │  │  S3/R2      │          │
│  │  (Supabase)  │  │   (Upstash)  │  │ (Cloudflare)│          │
│  │              │  │              │  │              │          │
│  │  - Users     │  │  - Rate Limit│  │  - Snapshots │          │
│  │  - APIs      │  │  - Cache     │  │  - Logs      │          │
│  │  - History   │  │  - Queue     │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### 技术选型

| 层级 | 技术 | 理由 |
|------|------|------|
| **前端** | Next.js 14 + React | SSR, App Router, 全栈能力 |
| **样式** | Tailwind CSS + shadcn/ui | 快速开发，美观 |
| **后端API** | tRPC | 类型安全，与Next.js集成好 |
| **数据库** | PostgreSQL (Supabase) | 免费tier足够，托管省心 |
| **认证** | NextAuth.js | 开箱即用，支持多种登录 |
| **定时任务** | Trigger.dev | 现代化cron，可视化管理 |
| **缓存/队列** | Upstash Redis | Serverless，按需付费 |
| **邮件** | Resend | 开发者友好，免费额度高 |
| **部署** | Vercel | 与Next.js完美集成 |
| **监控** | Sentry | 错误追踪，免费tier |

---

## 2. 核心功能设计

### 2.1 API结构检测算法

```typescript
// 核心差异比对逻辑
interface SchemaNode {
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  properties?: Record<string, SchemaNode>;
  items?: SchemaNode;
  nullable?: boolean;
}

interface SchemaDiff {
  path: string;
  changeType: 'added' | 'removed' | 'type_changed' | 'nullable_changed';
  oldValue?: any;
  newValue?: any;
}

function inferSchema(data: any): SchemaNode {
  if (data === null) {
    return { type: 'null' };
  }

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

function compareSchemas(
  oldSchema: SchemaNode,
  newSchema: SchemaNode,
  path: string = ''
): SchemaDiff[] {
  const diffs: SchemaDiff[] = [];

  // 类型变化
  if (oldSchema.type !== newSchema.type) {
    diffs.push({
      path,
      changeType: 'type_changed',
      oldValue: oldSchema.type,
      newValue: newSchema.type
    });
    return diffs;
  }

  // 对象属性比较
  if (oldSchema.type === 'object' && newSchema.type === 'object') {
    const oldKeys = new Set(Object.keys(oldSchema.properties || {}));
    const newKeys = new Set(Object.keys(newSchema.properties || {}));

    // 检测新增字段
    for (const key of newKeys) {
      if (!oldKeys.has(key)) {
        diffs.push({
          path: path ? `${path}.${key}` : key,
          changeType: 'added',
          newValue: newSchema.properties![key]
        });
      }
    }

    // 检测删除字段
    for (const key of oldKeys) {
      if (!newKeys.has(key)) {
        diffs.push({
          path: path ? `${path}.${key}` : key,
          changeType: 'removed',
          oldValue: oldSchema.properties![key]
        });
      }
    }

    // 递归比较共有字段
    for (const key of oldKeys) {
      if (newKeys.has(key)) {
        const nestedPath = path ? `${path}.${key}` : key;
        diffs.push(...compareSchemas(
          oldSchema.properties![key],
          newSchema.properties![key],
          nestedPath
        ));
      }
    }
  }

  // 数组元素比较
  if (oldSchema.type === 'array' && newSchema.type === 'array') {
    if (oldSchema.items && newSchema.items) {
      diffs.push(...compareSchemas(
        oldSchema.items,
        newSchema.items,
        `${path}[]`
      ));
    }
  }

  return diffs;
}
```

### 2.2 定时检查流程

```typescript
// Trigger.dev Job定义
import { Job, cronTrigger } from "@trigger.dev/sdk";

export const apiCheckJob = new Job({
  id: "api-check",
  name: "API Structure Check",
  version: "1.0.0",
  trigger: cronTrigger({
    cron: "*/15 * * * *" // 每15分钟（可配置）
  }),
  run: async (payload, io) => {
    // 1. 获取需要检查的API列表
    const apis = await io.runTask("fetch-apis", async () => {
      return await db.api.findMany({
        where: {
          nextCheckAt: { lte: new Date() },
          enabled: true
        },
        take: 100 // 批量处理
      });
    });

    // 2. 并行检查每个API
    const results = await Promise.allSettled(
      apis.map(api => checkSingleApi(api, io))
    );

    // 3. 处理结果
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const api = apis[i];

      if (result.status === 'fulfilled' && result.value.hasChanges) {
        // 发送通知
        await io.runTask(`notify-${api.id}`, async () => {
          await sendNotification(api, result.value.diffs);
        });
      }
    }

    return { checked: apis.length };
  }
});

async function checkSingleApi(api: Api, io: IO) {
  // 1. 获取当前响应
  const response = await fetch(api.url, {
    headers: api.headers,
    timeout: 30000
  });

  const data = await response.json();

  // 2. 推断schema
  const newSchema = inferSchema(data);

  // 3. 比较差异
  const diffs = compareSchemas(api.lastSchema, newSchema);

  // 4. 保存快照
  await db.apiSnapshot.create({
    data: {
      apiId: api.id,
      schema: newSchema,
      responseHash: hash(data),
      checkedAt: new Date()
    }
  });

  // 5. 更新API记录
  await db.api.update({
    where: { id: api.id },
    data: {
      lastSchema: newSchema,
      lastCheckedAt: new Date(),
      nextCheckAt: calculateNextCheck(api.checkInterval)
    }
  });

  return {
    hasChanges: diffs.length > 0,
    diffs
  };
}
```

---

## 3. 数据库设计

### ER图

```
┌──────────────────┐       ┌──────────────────┐
│      User        │       │   Subscription   │
├──────────────────┤       ├──────────────────┤
│ id: uuid PK      │───┐   │ id: uuid PK      │
│ email: string    │   │   │ userId: uuid FK  │
│ name: string     │   └──→│ plan: enum       │
│ createdAt: time  │       │ status: enum     │
│ settings: json   │       │ expiresAt: time  │
└──────────────────┘       └──────────────────┘
         │
         │ 1:N
         ▼
┌──────────────────┐       ┌──────────────────┐
│       Api        │       │   Notification   │
├──────────────────┤       ├──────────────────┤
│ id: uuid PK      │───┐   │ id: uuid PK      │
│ userId: uuid FK  │   │   │ userId: uuid FK  │
│ name: string     │   │   │ type: enum       │
│ url: string      │   │   │ config: json     │
│ method: enum     │   │   │ enabled: bool    │
│ headers: json    │   │   └──────────────────┘
│ checkInterval: int│  │
│ lastSchema: json │   │
│ lastCheckedAt: t │   │
│ enabled: bool    │   │
└──────────────────┘   │
         │             │
         │ 1:N         │
         ▼             │
┌──────────────────┐   │   ┌──────────────────┐
│   ApiSnapshot    │   │   │   ChangeAlert    │
├──────────────────┤   │   ├──────────────────┤
│ id: uuid PK      │   │   │ id: uuid PK      │
│ apiId: uuid FK   │   └──→│ apiId: uuid FK   │
│ schema: json     │       │ diffs: json      │
│ responseHash: str│       │ notifiedAt: time │
│ checkedAt: time  │       │ acknowledged: bool│
└──────────────────┘       └──────────────────┘
```

### Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String         @id @default(cuid())
  email         String         @unique
  name          String?
  image         String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  apis          Api[]
  subscription  Subscription?
  notifications Notification[]

  @@index([email])
}

model Subscription {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  plan      Plan     @default(FREE)
  status    SubStatus @default(ACTIVE)

  stripeCustomerId     String?
  stripeSubscriptionId String?

  currentPeriodStart DateTime?
  currentPeriodEnd   DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Plan {
  FREE
  PRO
  TEAM
  LIFETIME
}

enum SubStatus {
  ACTIVE
  CANCELED
  PAST_DUE
  TRIALING
}

model Api {
  id            String   @id @default(cuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  name          String
  url           String
  method        HttpMethod @default(GET)
  headers       Json?      @default("{}")

  checkInterval Int        @default(1440) // 分钟，默认每日
  lastSchema    Json?
  lastCheckedAt DateTime?
  nextCheckAt   DateTime?

  enabled       Boolean    @default(true)

  snapshots     ApiSnapshot[]
  alerts        ChangeAlert[]

  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt

  @@index([userId])
  @@index([nextCheckAt])
  @@index([enabled])
}

enum HttpMethod {
  GET
  POST
  PUT
  PATCH
  DELETE
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

  @@index([apiId])
  @@index([checkedAt])
}

model ChangeAlert {
  id           String   @id @default(cuid())
  apiId        String
  api          Api      @relation(fields: [apiId], references: [id], onDelete: Cascade)

  diffs        Json
  severity     Severity @default(MEDIUM)

  notifiedAt   DateTime @default(now())
  acknowledged Boolean  @default(false)
  acknowledgedAt DateTime?

  @@index([apiId])
  @@index([notifiedAt])
}

enum Severity {
  LOW      // 新增可选字段
  MEDIUM   // 类型变化
  HIGH     // 删除字段
  CRITICAL // 根结构变化
}

model Notification {
  id       String          @id @default(cuid())
  userId   String
  user     User            @relation(fields: [userId], references: [id], onDelete: Cascade)

  type     NotificationType
  config   Json
  enabled  Boolean         @default(true)

  createdAt DateTime       @default(now())

  @@index([userId])
}

enum NotificationType {
  EMAIL
  SLACK
  DISCORD
  WEBHOOK
}
```

---

## 4. API设计

### tRPC Router

```typescript
// src/server/routers/api.ts

import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

export const apiRouter = router({
  // 获取所有API
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.api.findMany({
      where: { userId: ctx.user.id },
      include: {
        _count: { select: { alerts: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }),

  // 创建API
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1).max(100),
      url: z.string().url(),
      method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).default('GET'),
      headers: z.record(z.string()).optional(),
      checkInterval: z.number().min(60).max(1440).default(1440)
    }))
    .mutation(async ({ ctx, input }) => {
      // 检查配额
      const count = await ctx.db.api.count({
        where: { userId: ctx.user.id }
      });
      const limit = getPlanLimit(ctx.user.subscription?.plan);

      if (count >= limit) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `API limit reached. Upgrade to add more.`
        });
      }

      // 立即获取初始schema
      const initialSchema = await fetchAndInferSchema(input.url, input.method, input.headers);

      return ctx.db.api.create({
        data: {
          ...input,
          userId: ctx.user.id,
          lastSchema: initialSchema,
          lastCheckedAt: new Date(),
          nextCheckAt: new Date(Date.now() + input.checkInterval * 60 * 1000)
        }
      });
    }),

  // 获取单个API详情
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const api = await ctx.db.api.findFirst({
        where: { id: input.id, userId: ctx.user.id },
        include: {
          snapshots: { take: 10, orderBy: { checkedAt: 'desc' } },
          alerts: { take: 20, orderBy: { notifiedAt: 'desc' } }
        }
      });

      if (!api) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return api;
    }),

  // 手动触发检查
  checkNow: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const api = await ctx.db.api.findFirst({
        where: { id: input.id, userId: ctx.user.id }
      });

      if (!api) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      // 触发即时检查
      const result = await performApiCheck(api);

      return result;
    }),

  // 删除API
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.api.deleteMany({
        where: { id: input.id, userId: ctx.user.id }
      });
    }),

  // 确认告警
  acknowledgeAlert: protectedProcedure
    .input(z.object({ alertId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.changeAlert.updateMany({
        where: {
          id: input.alertId,
          api: { userId: ctx.user.id }
        },
        data: {
          acknowledged: true,
          acknowledgedAt: new Date()
        }
      });
    })
});
```

### REST API Endpoints（供CLI/外部使用）

```
POST   /api/v1/apis          创建API监控
GET    /api/v1/apis          列出所有API
GET    /api/v1/apis/:id      获取API详情
PUT    /api/v1/apis/:id      更新API配置
DELETE /api/v1/apis/:id      删除API
POST   /api/v1/apis/:id/check 立即检查

GET    /api/v1/alerts        获取告警列表
POST   /api/v1/alerts/:id/ack 确认告警

GET    /api/v1/usage         获取使用统计
```

---

## 5. 前端页面设计

### 页面结构

```
/                     Landing Page（未登录）
/login                登录页
/signup               注册页

/dashboard            仪表盘（已登录首页）
/apis                 API列表
/apis/new             添加新API
/apis/:id             API详情
/apis/:id/history     变更历史

/alerts               告警中心
/settings             设置
/settings/billing     订阅管理
/settings/notifications 通知配置
```

### 关键组件

```typescript
// components/ApiCard.tsx
export function ApiCard({ api }: { api: Api }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusIndicator status={api.status} />
            <CardTitle>{api.name}</CardTitle>
          </div>
          <Badge variant={api.enabled ? "default" : "secondary"}>
            {api.enabled ? "Active" : "Paused"}
          </Badge>
        </div>
        <CardDescription className="truncate">
          {api.url}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Last checked: {formatRelative(api.lastCheckedAt)}</span>
          <span>Every {formatInterval(api.checkInterval)}</span>
        </div>
        {api.alertCount > 0 && (
          <Alert variant="warning" className="mt-2">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {api.alertCount} unacknowledged changes
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

// components/SchemaDiffViewer.tsx
export function SchemaDiffViewer({ diffs }: { diffs: SchemaDiff[] }) {
  return (
    <div className="space-y-2">
      {diffs.map((diff, i) => (
        <div
          key={i}
          className={cn(
            "p-2 rounded font-mono text-sm",
            diff.changeType === 'added' && "bg-green-50 text-green-700",
            diff.changeType === 'removed' && "bg-red-50 text-red-700",
            diff.changeType === 'type_changed' && "bg-yellow-50 text-yellow-700"
          )}
        >
          <span className="font-semibold">{diff.path}</span>
          {diff.changeType === 'added' && (
            <span> + {JSON.stringify(diff.newValue)}</span>
          )}
          {diff.changeType === 'removed' && (
            <span> - {JSON.stringify(diff.oldValue)}</span>
          )}
          {diff.changeType === 'type_changed' && (
            <span> {diff.oldValue} → {diff.newValue}</span>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## 6. 部署架构

### 生产环境

```
┌─────────────────────────────────────────────────────────────┐
│                        Cloudflare                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                      CDN + WAF                       │   │
│  └───────────────────────────┬─────────────────────────┘   │
└──────────────────────────────┼──────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────┐
│                        Vercel│                              │
│  ┌───────────────────────────┴─────────────────────────┐   │
│  │                   Next.js App                        │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │   Edge      │  │  Serverless │  │   Static    │  │   │
│  │  │  Functions  │  │  Functions  │  │   Assets    │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  Supabase   │      │  Upstash    │      │ Trigger.dev │
│  (Postgres) │      │  (Redis)    │      │  (Jobs)     │
└─────────────┘      └─────────────┘      └─────────────┘
         │                                         │
         ▼                                         ▼
┌─────────────┐                           ┌─────────────┐
│   Resend    │                           │   Sentry    │
│  (Email)    │                           │ (Monitoring)│
└─────────────┘                           └─────────────┘
```

### 环境变量

```bash
# .env.example

# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://apishift.dev"

# OAuth Providers
GITHUB_ID="..."
GITHUB_SECRET="..."
GOOGLE_ID="..."
GOOGLE_SECRET="..."

# Redis
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."

# Background Jobs
TRIGGER_API_KEY="..."
TRIGGER_API_URL="..."

# Email
RESEND_API_KEY="..."

# Payments
STRIPE_SECRET_KEY="..."
STRIPE_WEBHOOK_SECRET="..."
STRIPE_PRO_PRICE_ID="..."
STRIPE_TEAM_PRICE_ID="..."

# Monitoring
SENTRY_DSN="..."
```

---

## 7. 安全考虑

### 认证与授权

```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // 保护的路由
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        return !!token;
      }
      if (req.nextUrl.pathname.startsWith('/api/v1')) {
        // API需要Bearer token
        const authHeader = req.headers.get('authorization');
        return authHeader?.startsWith('Bearer ');
      }
      return true;
    }
  }
});

export const config = {
  matcher: ['/dashboard/:path*', '/apis/:path*', '/api/v1/:path*']
};
```

### 速率限制

```typescript
// lib/rateLimit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// 不同端点的限制
export const rateLimits = {
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 req/min
    analytics: true,
  }),

  check: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 checks/min
    analytics: true,
  }),

  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 attempts/min
    analytics: true,
  }),
};
```

### 敏感数据处理

```typescript
// 加密存储API headers中的敏感信息
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!; // 32 bytes

export function encryptHeaders(headers: Record<string, string>): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY), iv);

  let encrypted = cipher.update(JSON.stringify(headers), 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

export function decryptHeaders(encrypted: string): Record<string, string> {
  const [ivHex, authTagHex, encryptedData] = encrypted.split(':');

  const decipher = createDecipheriv(
    'aes-256-gcm',
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(ivHex, 'hex')
  );
  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));

  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
}
```

---

## 8. 扩展性设计

### 水平扩展

```
当前架构支持的扩展路径：

1. 定时任务扩展
   Trigger.dev自动处理任务分发
   可并行处理数千个API检查

2. 数据库扩展
   Supabase支持连接池
   读副本用于报表查询

3. 缓存扩展
   Upstash Redis自动扩展
   热点数据缓存

4. 边缘计算
   Vercel Edge Functions处理低延迟请求
   全球分布式部署
```

### 未来扩展点

```typescript
// 插件系统预留
interface CheckerPlugin {
  name: string;
  check: (api: Api) => Promise<CheckResult>;
  diff: (old: any, new: any) => Diff[];
}

// 可扩展的检查器
const checkers: Record<string, CheckerPlugin> = {
  json: jsonChecker,
  graphql: graphqlChecker,  // 未来
  grpc: grpcChecker,        // 未来
  websocket: wsChecker,     // 未来
};
```

---

*技术架构版本: v1.0*
*更新日期: 2026年1月*
