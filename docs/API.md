# API Reference

APIShift uses tRPC for type-safe API communication. This document covers all available procedures.

## tRPC Routers

The API is organized into logical routers:

- `api` - API monitoring CRUD operations
- `monitor` - Monitoring and check operations
- `user` - User profile and settings

## API Router

Manage monitored APIs.

### `api.list`

Get all APIs for the current user.

**Type**: Query
**Auth**: Required

**Response**:
```typescript
type Response = Array<{
  id: string
  name: string
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers: Record<string, string>
  checkInterval: number
  lastSchema: SchemaNode | null
  lastCheckedAt: Date | null
  nextCheckAt: Date | null
  enabled: boolean
  createdAt: Date
  updatedAt: Date
}>
```

**Example**:
```tsx
const { data: apis } = trpc.api.list.useQuery()
```

### `api.getById`

Get detailed information about a specific API.

**Type**: Query
**Auth**: Required

**Input**:
```typescript
{
  id: string
}
```

**Response**:
```typescript
{
  id: string
  name: string
  url: string
  method: string
  headers: Record<string, string>
  checkInterval: number
  lastSchema: SchemaNode | null
  lastCheckedAt: Date | null
  enabled: boolean
  snapshots: Array<{
    id: string
    schema: SchemaNode
    responseHash: string
    statusCode: number
    latencyMs: number
    checkedAt: Date
  }>
  alerts: Array<{
    id: string
    diffs: SchemaChange[]
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    notifiedAt: Date
    acknowledged: boolean
  }>
}
```

**Example**:
```tsx
const { data: api } = trpc.api.getById.useQuery({ id: 'clx123...' })
```

### `api.create`

Create a new API to monitor.

**Type**: Mutation
**Auth**: Required

**Input**:
```typescript
{
  name: string              // 1-100 characters
  url: string               // Valid URL
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'  // Default: 'GET'
  headers?: Record<string, string>
  checkInterval?: number    // Minutes, 60-1440, default: 1440 (daily)
}
```

**Response**:
```typescript
{
  id: string
  name: string
  url: string
  method: string
  // ... other fields
}
```

**Example**:
```tsx
const createApi = trpc.api.create.useMutation()

createApi.mutate({
  name: 'GitHub User API',
  url: 'https://api.github.com/users/github',
  method: 'GET',
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  },
  checkInterval: 1440
})
```

### `api.update`

Update an existing API configuration.

**Type**: Mutation
**Auth**: Required

**Input**:
```typescript
{
  id: string
  name?: string
  url?: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  checkInterval?: number
  enabled?: boolean
}
```

**Response**: Updated API object

**Example**:
```tsx
const updateApi = trpc.api.update.useMutation()

updateApi.mutate({
  id: 'clx123...',
  enabled: false  // Pause monitoring
})
```

### `api.delete`

Delete an API and all associated data (snapshots, alerts).

**Type**: Mutation
**Auth**: Required

**Input**:
```typescript
{
  id: string
}
```

**Response**: Deleted API object

**Example**:
```tsx
const deleteApi = trpc.api.delete.useMutation()

deleteApi.mutate({ id: 'clx123...' })
```

## Monitor Router

Operations related to monitoring and alerts.

### `monitor.checkNow`

Manually trigger an immediate check for a specific API.

**Type**: Mutation
**Auth**: Required

**Input**:
```typescript
{
  id: string  // API ID
}
```

**Response**:
```typescript
{
  apiId: string
  success: boolean
  hasChanges: boolean
  snapshotId?: string
  alertId?: string
  statusCode?: number
  latencyMs?: number
  error?: string
}
```

**Example**:
```tsx
const checkNow = trpc.monitor.checkNow.useMutation()

checkNow.mutate(
  { id: 'clx123...' },
  {
    onSuccess: (result) => {
      if (result.hasChanges) {
        console.log('Changes detected!')
      }
    }
  }
)
```

### `monitor.getAlerts`

Get alerts with optional filtering.

**Type**: Query
**Auth**: Required

**Input**:
```typescript
{
  acknowledged?: boolean  // Filter by acknowledged status
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  apiId?: string          // Filter by specific API
  limit?: number          // Max results (default: 50)
}
```

**Response**:
```typescript
Array<{
  id: string
  apiId: string
  api: {
    id: string
    name: string
    url: string
  }
  diffs: SchemaChange[]
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  notifiedAt: Date
  acknowledged: boolean
  acknowledgedAt: Date | null
}>
```

**Example**:
```tsx
// Get unacknowledged alerts
const { data: alerts } = trpc.monitor.getAlerts.useQuery({
  acknowledged: false,
  limit: 20
})
```

### `monitor.acknowledgeAlert`

Mark an alert as acknowledged.

**Type**: Mutation
**Auth**: Required

**Input**:
```typescript
{
  id: string  // Alert ID
}
```

**Response**: Updated alert object

**Example**:
```tsx
const acknowledge = trpc.monitor.acknowledgeAlert.useMutation()

acknowledge.mutate({ id: 'clx456...' })
```

### `monitor.getStats`

Get monitoring statistics for dashboard.

**Type**: Query
**Auth**: Required

**Response**:
```typescript
{
  totalApis: number
  activeApis: number
  totalChecks: number
  recentAlerts: number
  criticalAlerts: number
}
```

**Example**:
```tsx
const { data: stats } = trpc.monitor.getStats.useQuery()
```

## User Router

User profile and settings management.

### `user.getProfile`

Get current user profile.

**Type**: Query
**Auth**: Required

**Response**:
```typescript
{
  id: string
  email: string
  name: string | null
  image: string | null
  createdAt: Date
  subscription: {
    plan: 'FREE' | 'PRO' | 'TEAM' | 'LIFETIME'
    status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'TRIALING'
  } | null
}
```

**Example**:
```tsx
const { data: profile } = trpc.user.getProfile.useQuery()
```

### `user.updateProfile`

Update user profile information.

**Type**: Mutation
**Auth**: Required

**Input**:
```typescript
{
  name?: string
  email?: string
}
```

**Response**: Updated user object

**Example**:
```tsx
const updateProfile = trpc.user.updateProfile.useMutation()

updateProfile.mutate({
  name: 'John Doe'
})
```

## Type Definitions

### SchemaNode

Represents an inferred API schema structure.

```typescript
type SchemaNode = {
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null'
  properties?: Record<string, SchemaNode>  // For objects
  items?: SchemaNode                       // For arrays
  nullable?: boolean
}
```

### SchemaChange

Represents a detected change in API structure.

```typescript
type SchemaChange = {
  path: string
  type: 'added' | 'removed' | 'type_changed' | 'nullable_changed'
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  oldValue?: any
  newValue?: any
  message: string
}
```

## Error Handling

tRPC uses standard error codes:

- `UNAUTHORIZED` - Not authenticated
- `FORBIDDEN` - Authenticated but not authorized (e.g., accessing another user's API)
- `NOT_FOUND` - Resource doesn't exist
- `BAD_REQUEST` - Invalid input
- `INTERNAL_SERVER_ERROR` - Server error

**Example**:
```tsx
const { error } = trpc.api.getById.useQuery({ id: 'invalid' })

if (error) {
  if (error.data?.code === 'NOT_FOUND') {
    console.log('API not found')
  }
}
```

## Optimistic Updates

tRPC supports optimistic updates for better UX:

```tsx
const utils = trpc.useUtils()

const deleteApi = trpc.api.delete.useMutation({
  onMutate: async (deletedApi) => {
    // Cancel outgoing refetches
    await utils.api.list.cancel()

    // Snapshot current value
    const previous = utils.api.list.getData()

    // Optimistically update
    utils.api.list.setData(undefined, (old) =>
      old?.filter(api => api.id !== deletedApi.id)
    )

    return { previous }
  },
  onError: (err, deletedApi, context) => {
    // Rollback on error
    utils.api.list.setData(undefined, context?.previous)
  },
  onSettled: () => {
    // Refetch after mutation
    utils.api.list.invalidate()
  }
})
```

## Pagination (Future)

Currently not implemented, but the pattern would be:

```typescript
// Future implementation
const { data, fetchNextPage } = trpc.monitor.getAlerts.useInfiniteQuery(
  { limit: 20 },
  {
    getNextPageParam: (lastPage) => lastPage.nextCursor
  }
)
```

## REST API Endpoints

For external integrations (not yet implemented):

```
POST   /api/v1/apis          # Create API
GET    /api/v1/apis          # List APIs
GET    /api/v1/apis/:id      # Get API
PUT    /api/v1/apis/:id      # Update API
DELETE /api/v1/apis/:id      # Delete API
POST   /api/v1/apis/:id/check # Trigger check

GET    /api/v1/alerts        # List alerts
POST   /api/v1/alerts/:id/ack # Acknowledge alert

GET    /api/v1/stats         # Get statistics
```

Authentication: `Authorization: Bearer <api-token>`

## Rate Limiting

Current limits (subject to change):

- **API Creation**: 10 per minute per user
- **Manual Checks**: 5 per minute per API
- **Query Operations**: 100 per minute per user

Rate limit information is included in error responses.

## Webhooks (Future Feature)

Planned webhook events:

- `api.change_detected` - Schema change detected
- `api.check_failed` - API check failed
- `api.created` - New API added
- `api.deleted` - API removed

Payload format:
```typescript
{
  event: string
  timestamp: string
  data: object
  apiId: string
  userId: string
}
```
