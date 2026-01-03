/**
 * Monitoring Service
 *
 * Core service for checking APIs and detecting changes
 * Used by both manual checks and automated cron jobs
 */

import { prisma } from "./prisma"
import { fetchAndExtractSchema } from "./schema-extractor"
import { compareSchemas, getOverallSeverity } from "./schema-diff"
import { SchemaNode } from "./schema-extractor"

export interface CheckResult {
  apiId: string
  success: boolean
  hasChanges: boolean
  snapshotId?: string
  alertId?: string
  error?: string
  statusCode?: number
  latencyMs?: number
}

/**
 * Check a single API for changes
 */
export async function checkApi(apiId: string): Promise<CheckResult> {
  try {
    // Get API details
    const api = await prisma.api.findUnique({
      where: { id: apiId },
    })

    if (!api || !api.enabled) {
      return {
        apiId,
        success: false,
        hasChanges: false,
        error: "API not found or disabled",
      }
    }

    // Fetch and extract schema
    const { schema, statusCode, latencyMs, responseHash } =
      await fetchAndExtractSchema(
        api.url,
        api.method,
        (api.headers as Record<string, string>) || {}
      )

    // Save snapshot
    const snapshot = await prisma.apiSnapshot.create({
      data: {
        apiId: api.id,
        schema: schema as any,
        responseHash,
        statusCode,
        latencyMs,
      },
    })

    // Compare with last schema if exists
    let hasChanges = false
    let alertId: string | undefined

    if (api.lastSchema) {
      const oldSchema = api.lastSchema as unknown as SchemaNode
      const changes = compareSchemas(oldSchema, schema)

      if (changes.length > 0) {
        hasChanges = true
        const severity = getOverallSeverity(changes)

        // Create alert
        const alert = await prisma.changeAlert.create({
          data: {
            apiId: api.id,
            diffs: changes as any,
            severity,
          },
        })

        alertId = alert.id
      }
    }

    // Update API with latest check info
    await prisma.api.update({
      where: { id: api.id },
      data: {
        lastSchema: schema as any,
        lastCheckedAt: new Date(),
        nextCheckAt: new Date(Date.now() + api.checkInterval * 60 * 1000),
      },
    })

    return {
      apiId,
      success: true,
      hasChanges,
      snapshotId: snapshot.id,
      alertId,
      statusCode,
      latencyMs,
    }
  } catch (error) {
    console.error(`Error checking API ${apiId}:`, error)

    return {
      apiId,
      success: false,
      hasChanges: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Get all APIs that need to be checked now
 */
export async function getApisDueForCheck(): Promise<string[]> {
  const apis = await prisma.api.findMany({
    where: {
      enabled: true,
      OR: [
        { nextCheckAt: null }, // Never checked
        { nextCheckAt: { lte: new Date() } }, // Due for check
      ],
    },
    select: { id: true },
  })

  return apis.map((api) => api.id)
}

/**
 * Check multiple APIs in batches
 */
export async function checkApis(
  apiIds: string[],
  batchSize: number = 5
): Promise<CheckResult[]> {
  const results: CheckResult[] = []

  // Process in batches to avoid overwhelming the system
  for (let i = 0; i < apiIds.length; i += batchSize) {
    const batch = apiIds.slice(i, i + batchSize)

    const batchResults = await Promise.all(
      batch.map((apiId) => checkApi(apiId))
    )

    results.push(...batchResults)

    // Small delay between batches
    if (i + batchSize < apiIds.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  return results
}

/**
 * Check all APIs that are due for checking
 */
export async function checkAllDueApis(): Promise<{
  total: number
  successful: number
  failed: number
  changesDetected: number
  results: CheckResult[]
}> {
  const apiIds = await getApisDueForCheck()
  const results = await checkApis(apiIds)

  const summary = {
    total: results.length,
    successful: results.filter((r) => r.success).length,
    failed: results.filter((r) => !r.success).length,
    changesDetected: results.filter((r) => r.hasChanges).length,
    results,
  }

  console.log(`Check summary: ${summary.successful}/${summary.total} successful, ${summary.changesDetected} changes detected`)

  return summary
}
