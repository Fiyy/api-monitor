/**
 * Daily Stats Generator
 *
 * Generates daily statistics for admin dashboard
 */

import { prisma } from './prisma'
import { getCountryStats } from './activity-tracker'

/**
 * Generate daily stats for a specific date
 */
export async function generateDailyStats(date: Date): Promise<void> {
  // Normalize date to start of day
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(startOfDay)
  endOfDay.setDate(endOfDay.getDate() + 1)

  // Count new users
  const newUsers = await prisma.user.count({
    where: {
      createdAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
  })

  // Count total users up to this date
  const totalUsers = await prisma.user.count({
    where: {
      createdAt: {
        lt: endOfDay,
      },
    },
  })

  // Count active users (users with at least one API)
  const activeUsers = await prisma.user.count({
    where: {
      createdAt: {
        lt: endOfDay,
      },
      apis: {
        some: {},
      },
    },
  })

  // Count new APIs
  const newApis = await prisma.api.count({
    where: {
      createdAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
  })

  // Count total APIs up to this date
  const totalApis = await prisma.api.count({
    where: {
      createdAt: {
        lt: endOfDay,
      },
    },
  })

  // Count checks run
  const checksRun = await prisma.apiSnapshot.count({
    where: {
      checkedAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
  })

  // Count alerts created
  const alertsCreated = await prisma.changeAlert.count({
    where: {
      notifiedAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
  })

  // Get top countries
  const topCountries = await getCountryStats(startOfDay, endOfDay)

  // Upsert daily stats
  await prisma.dailyStats.upsert({
    where: {
      date: startOfDay,
    },
    create: {
      date: startOfDay,
      newUsers,
      totalUsers,
      activeUsers,
      newApis,
      totalApis,
      checksRun,
      alertsCreated,
      topCountries: topCountries.slice(0, 10) as any, // Top 10 countries
    },
    update: {
      newUsers,
      totalUsers,
      activeUsers,
      newApis,
      totalApis,
      checksRun,
      alertsCreated,
      topCountries: topCountries.slice(0, 10) as any,
    },
  })

  console.log(`Daily stats generated for ${startOfDay.toISOString().split('T')[0]}`)
}

/**
 * Generate stats for yesterday (to be run daily)
 */
export async function generateYesterdayStats(): Promise<void> {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  await generateDailyStats(yesterday)
}

/**
 * Get formatted summary for email
 */
export async function getDailySummary(date: Date) {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)

  const stats = await prisma.dailyStats.findUnique({
    where: {
      date: startOfDay,
    },
  })

  if (!stats) {
    return null
  }

  // Get new users with details
  const endOfDay = new Date(startOfDay)
  endOfDay.setDate(endOfDay.getDate() + 1)

  const newUsers = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
    include: {
      subscription: true,
      _count: {
        select: {
          apis: true,
        },
      },
      activities: {
        where: {
          createdAt: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
        select: {
          country: true,
          city: true,
          ip: true,
        },
        take: 1,
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return {
    stats,
    newUsers,
  }
}
