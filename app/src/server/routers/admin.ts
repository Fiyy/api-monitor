import { z } from "zod"
import { createTRPCRouter, adminProcedure } from "@/server/trpc"
import { getActivityStats, getCountryStats } from "@/lib/activity-tracker"

export const adminRouter = createTRPCRouter({
  /**
   * Get dashboard overview stats
   */
  getOverview: adminProcedure.query(async ({ ctx }) => {
    const now = new Date()
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Total counts
    const totalUsers = await ctx.prisma.user.count()
    const totalApis = await ctx.prisma.api.count()
    const totalAlerts = await ctx.prisma.changeAlert.count()

    // New users today
    const newUsersToday = await ctx.prisma.user.count({
      where: {
        createdAt: {
          gte: yesterday,
        },
      },
    })

    // New users this week
    const newUsersWeek = await ctx.prisma.user.count({
      where: {
        createdAt: {
          gte: lastWeek,
        },
      },
    })

    // Active users (users who have APIs)
    const activeUsers = await ctx.prisma.user.count({
      where: {
        apis: {
          some: {},
        },
      },
    })

    // Users on trial
    const trialUsers = await ctx.prisma.subscription.count({
      where: {
        status: "TRIALING",
      },
    })

    // Paying users
    const payingUsers = await ctx.prisma.subscription.count({
      where: {
        plan: {
          in: ["PRO", "TEAM"],
        },
        status: "ACTIVE",
      },
    })

    return {
      totalUsers,
      newUsersToday,
      newUsersWeek,
      activeUsers,
      totalApis,
      totalAlerts,
      trialUsers,
      payingUsers,
    }
  }),

  /**
   * Get recent users with details
   */
  getRecentUsers: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        days: z.number().min(1).max(30).default(7),
      })
    )
    .query(async ({ ctx, input }) => {
      const startDate = new Date(Date.now() - input.days * 24 * 60 * 60 * 1000)

      const users = await ctx.prisma.user.findMany({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
        include: {
          subscription: true,
          activities: {
            orderBy: {
              createdAt: "asc",
            },
            take: 1,
            select: {
              country: true,
              city: true,
              ip: true,
            },
          },
          _count: {
            select: {
              apis: true,
              activities: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: input.limit,
      })

      return users
    }),

  /**
   * Get user activities
   */
  getActivities: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        days: z.number().min(1).max(30).default(7),
        action: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const startDate = new Date(Date.now() - input.days * 24 * 60 * 60 * 1000)

      const activities = await ctx.prisma.userActivity.findMany({
        where: {
          createdAt: {
            gte: startDate,
          },
          ...(input.action ? { action: input.action } : {}),
        },
        include: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: input.limit,
      })

      return activities
    }),

  /**
   * Get geographic distribution
   */
  getGeoStats: adminProcedure
    .input(
      z.object({
        days: z.number().min(1).max(30).default(7),
      })
    )
    .query(async ({ ctx, input }) => {
      const startDate = new Date(Date.now() - input.days * 24 * 60 * 60 * 1000)
      const endDate = new Date()

      const countryStats = await getCountryStats(startDate, endDate)

      return countryStats
    }),

  /**
   * Get daily stats for a date range
   */
  getDailyStats: adminProcedure
    .input(
      z.object({
        days: z.number().min(1).max(90).default(30),
      })
    )
    .query(async ({ ctx, input }) => {
      const endDate = new Date()
      const startDate = new Date(endDate.getTime() - input.days * 24 * 60 * 60 * 1000)

      const dailyStats = await ctx.prisma.dailyStats.findMany({
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: {
          date: "asc",
        },
      })

      return dailyStats
    }),

  /**
   * Get all users (admin list)
   */
  getAllUsers: adminProcedure
    .input(
      z.object({
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const where = input.search
        ? {
            OR: [
              { email: { contains: input.search, mode: "insensitive" as const } },
              { name: { contains: input.search, mode: "insensitive" as const } },
            ],
          }
        : {}

      const [users, total] = await Promise.all([
        ctx.prisma.user.findMany({
          where,
          include: {
            subscription: true,
            _count: {
              select: {
                apis: true,
                notifications: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: input.limit,
          skip: input.offset,
        }),
        ctx.prisma.user.count({ where }),
      ])

      return {
        users,
        total,
        hasMore: input.offset + input.limit < total,
      }
    }),

  /**
   * Get system health
   */
  getSystemHealth: adminProcedure.query(async ({ ctx }) => {
    // Check last cron execution
    const lastSnapshot = await ctx.prisma.apiSnapshot.findFirst({
      orderBy: {
        checkedAt: "desc",
      },
      select: {
        checkedAt: true,
      },
    })

    // Check for stale APIs (not checked in 48 hours)
    const staleApis = await ctx.prisma.api.count({
      where: {
        enabled: true,
        lastCheckedAt: {
          lt: new Date(Date.now() - 48 * 60 * 60 * 1000),
        },
      },
    })

    // Check for unacknowledged critical alerts
    const criticalAlerts = await ctx.prisma.changeAlert.count({
      where: {
        severity: "CRITICAL",
        acknowledged: false,
      },
    })

    return {
      lastCronRun: lastSnapshot?.checkedAt || null,
      staleApis,
      criticalAlerts,
      healthy: staleApis === 0,
    }
  }),
})
