import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "@/server/trpc"
import { fetchAndExtractSchema } from "@/lib/schema-extractor"
import { compareSchemas, getOverallSeverity } from "@/lib/schema-diff"
import { SchemaNode } from "@/lib/schema-extractor"

export const monitorRouter = createTRPCRouter({
  /**
   * Manually check an API for changes
   */
  checkApi: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const api = await ctx.prisma.api.findUnique({
        where: { id: input.id },
      })

      if (!api || api.userId !== ctx.session.user.id) {
        throw new Error("API not found")
      }

      // Fetch and extract schema
      const { schema, statusCode, latencyMs, responseHash } =
        await fetchAndExtractSchema(
          api.url,
          api.method,
          (api.headers as Record<string, string>) || {}
        )

      // Save snapshot
      const snapshot = await ctx.prisma.apiSnapshot.create({
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
      let changeAlert = null

      if (api.lastSchema) {
        const oldSchema = api.lastSchema as SchemaNode
        const changes = compareSchemas(oldSchema, schema)

        if (changes.length > 0) {
          hasChanges = true
          const severity = getOverallSeverity(changes)

          // Create alert
          changeAlert = await ctx.prisma.changeAlert.create({
            data: {
              apiId: api.id,
              diffs: changes as any,
              severity,
            },
          })
        }
      }

      // Update API with latest check info
      await ctx.prisma.api.update({
        where: { id: api.id },
        data: {
          lastSchema: schema as any,
          lastCheckedAt: new Date(),
          nextCheckAt: new Date(Date.now() + api.checkInterval * 60 * 1000),
        },
      })

      return {
        success: true,
        hasChanges,
        snapshot,
        changeAlert,
      }
    }),

  /**
   * Get recent snapshots for an API
   */
  getSnapshots: protectedProcedure
    .input(
      z.object({
        apiId: z.string(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const api = await ctx.prisma.api.findUnique({
        where: { id: input.apiId },
      })

      if (!api || api.userId !== ctx.session.user.id) {
        throw new Error("API not found")
      }

      return await ctx.prisma.apiSnapshot.findMany({
        where: { apiId: input.apiId },
        orderBy: { checkedAt: "desc" },
        take: input.limit,
      })
    }),

  /**
   * Get alerts for an API
   */
  getAlerts: protectedProcedure
    .input(
      z.object({
        apiId: z.string().optional(),
        acknowledged: z.boolean().optional(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: any = {}

      if (input.apiId) {
        const api = await ctx.prisma.api.findUnique({
          where: { id: input.apiId },
        })

        if (!api || api.userId !== ctx.session.user.id) {
          throw new Error("API not found")
        }

        where.apiId = input.apiId
      } else {
        // Get all alerts for user's APIs
        const userApis = await ctx.prisma.api.findMany({
          where: { userId: ctx.session.user.id },
          select: { id: true },
        })

        where.apiId = { in: userApis.map((a) => a.id) }
      }

      if (input.acknowledged !== undefined) {
        where.acknowledged = input.acknowledged
      }

      return await ctx.prisma.changeAlert.findMany({
        where,
        include: {
          api: {
            select: {
              name: true,
              url: true,
            },
          },
        },
        orderBy: { notifiedAt: "desc" },
        take: input.limit,
      })
    }),

  /**
   * Acknowledge an alert
   */
  acknowledgeAlert: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const alert = await ctx.prisma.changeAlert.findUnique({
        where: { id: input.id },
        include: { api: true },
      })

      if (!alert || alert.api.userId !== ctx.session.user.id) {
        throw new Error("Alert not found")
      }

      return await ctx.prisma.changeAlert.update({
        where: { id: input.id },
        data: {
          acknowledged: true,
          acknowledgedAt: new Date(),
        },
      })
    }),
})
