import { createTRPCRouter, protectedProcedure } from "@/server/trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"

export const notificationRouter = createTRPCRouter({
  // Get all notification configurations for the user
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const notifications = await ctx.prisma.notification.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    })

    return notifications
  }),

  // Create or update email notification
  upsertEmail: protectedProcedure
    .input(
      z.object({
        enabled: z.boolean(),
        severityFilter: z.array(z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"])).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if email notification already exists
      const existing = await ctx.prisma.notification.findFirst({
        where: {
          userId: ctx.session.user.id,
          type: "EMAIL",
        },
      })

      const config = {
        severityFilter: input.severityFilter || ["HIGH", "CRITICAL"],
      }

      if (existing) {
        return await ctx.prisma.notification.update({
          where: { id: existing.id },
          data: {
            enabled: input.enabled,
            config,
          },
        })
      }

      return await ctx.prisma.notification.create({
        data: {
          userId: ctx.session.user.id,
          type: "EMAIL",
          enabled: input.enabled,
          config,
        },
      })
    }),

  // Create or update Slack webhook
  upsertSlack: protectedProcedure
    .input(
      z.object({
        enabled: z.boolean(),
        webhookUrl: z.string().url(),
        severityFilter: z.array(z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"])).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.prisma.notification.findFirst({
        where: {
          userId: ctx.session.user.id,
          type: "SLACK",
        },
      })

      const config = {
        webhookUrl: input.webhookUrl,
        severityFilter: input.severityFilter || ["HIGH", "CRITICAL"],
      }

      if (existing) {
        return await ctx.prisma.notification.update({
          where: { id: existing.id },
          data: {
            enabled: input.enabled,
            config,
          },
        })
      }

      return await ctx.prisma.notification.create({
        data: {
          userId: ctx.session.user.id,
          type: "SLACK",
          enabled: input.enabled,
          config,
        },
      })
    }),

  // Create or update Discord webhook
  upsertDiscord: protectedProcedure
    .input(
      z.object({
        enabled: z.boolean(),
        webhookUrl: z.string().url(),
        severityFilter: z.array(z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"])).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.prisma.notification.findFirst({
        where: {
          userId: ctx.session.user.id,
          type: "DISCORD",
        },
      })

      const config = {
        webhookUrl: input.webhookUrl,
        severityFilter: input.severityFilter || ["HIGH", "CRITICAL"],
      }

      if (existing) {
        return await ctx.prisma.notification.update({
          where: { id: existing.id },
          data: {
            enabled: input.enabled,
            config,
          },
        })
      }

      return await ctx.prisma.notification.create({
        data: {
          userId: ctx.session.user.id,
          type: "DISCORD",
          enabled: input.enabled,
          config,
        },
      })
    }),

  // Delete a notification configuration
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const notification = await ctx.prisma.notification.findUnique({
        where: { id: input.id },
      })

      if (!notification || notification.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Notification not found",
        })
      }

      return await ctx.prisma.notification.delete({
        where: { id: input.id },
      })
    }),

  // Toggle notification on/off
  toggle: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        enabled: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const notification = await ctx.prisma.notification.findUnique({
        where: { id: input.id },
      })

      if (!notification || notification.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Notification not found",
        })
      }

      return await ctx.prisma.notification.update({
        where: { id: input.id },
        data: { enabled: input.enabled },
      })
    }),
})
