import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "@/server/trpc"
import { checkApi as checkApiService } from "@/lib/monitoring-service"

export const monitorRouter = createTRPCRouter({
  /**
   * Manually check an API for changes
   */
  checkApi: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const api = await ctx.prisma.api.findUnique({
        where: { id: input.id },
      })

      if (!api || api.userId !== ctx.session.user.id) {
        throw new Error("API not found")
      }

      // Use the monitoring service
      const result = await checkApiService(input.id)

      if (!result.success) {
        throw new Error(result.error || "Check failed")
      }

      return {
        success: true,
        hasChanges: result.hasChanges,
        snapshot: result.snapshotId ? { id: result.snapshotId } : null,
        changeAlert: result.alertId ? { id: result.alertId } : null,
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
