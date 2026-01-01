import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "@/server/trpc"

export const apiRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.api.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const api = await ctx.prisma.api.findUnique({
        where: { id: input.id },
        include: {
          snapshots: {
            orderBy: { checkedAt: "desc" },
            take: 10,
          },
          alerts: {
            orderBy: { notifiedAt: "desc" },
            take: 5,
          },
        },
      })

      if (!api || api.userId !== ctx.session.user.id) {
        throw new Error("API not found")
      }

      return api
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        url: z.string().url(),
        method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]).default("GET"),
        headers: z.record(z.string()).optional(),
        checkInterval: z.number().min(60).default(1440),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.api.create({
        data: {
          userId: ctx.session.user.id,
          name: input.name,
          url: input.url,
          method: input.method,
          headers: input.headers || {},
          checkInterval: input.checkInterval,
        },
      })
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        url: z.string().url().optional(),
        method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]).optional(),
        headers: z.record(z.string()).optional(),
        checkInterval: z.number().min(60).optional(),
        enabled: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input

      const api = await ctx.prisma.api.findUnique({
        where: { id },
      })

      if (!api || api.userId !== ctx.session.user.id) {
        throw new Error("API not found")
      }

      return await ctx.prisma.api.update({
        where: { id },
        data,
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const api = await ctx.prisma.api.findUnique({
        where: { id: input.id },
      })

      if (!api || api.userId !== ctx.session.user.id) {
        throw new Error("API not found")
      }

      return await ctx.prisma.api.delete({
        where: { id: input.id },
      })
    }),
})
