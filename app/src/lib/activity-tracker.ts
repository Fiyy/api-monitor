/**
 * Activity Tracker
 *
 * Records user activities with IP geolocation
 */

import { prisma } from './prisma'
import { getGeoLocation } from './geo-ip'

export type ActivityAction =
  | 'signup'
  | 'login'
  | 'logout'
  | 'api_create'
  | 'api_update'
  | 'api_delete'
  | 'api_check'
  | 'alert_view'
  | 'alert_acknowledge'
  | 'notification_config'
  | 'trial_start'
  | 'subscription_change'

export interface ActivityData {
  userId: string
  action: ActivityAction
  ip?: string
  userAgent?: string
}

/**
 * Track user activity
 */
export async function trackActivity(data: ActivityData): Promise<void> {
  try {
    let country: string | undefined
    let city: string | undefined

    // Get geolocation if IP is provided
    if (data.ip) {
      const geo = await getGeoLocation(data.ip)
      if (geo) {
        country = geo.country
        city = geo.city
      }
    }

    // Save activity to database
    await prisma.userActivity.create({
      data: {
        userId: data.userId,
        action: data.action,
        ip: data.ip,
        userAgent: data.userAgent,
        country,
        city,
      },
    })
  } catch (error) {
    // Don't throw errors for activity tracking failures
    console.error('Failed to track activity:', error)
  }
}

/**
 * Get activity statistics for a date range
 */
export async function getActivityStats(startDate: Date, endDate: Date) {
  const activities = await prisma.userActivity.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      user: {
        select: {
          email: true,
          name: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return activities
}

/**
 * Get country statistics
 */
export async function getCountryStats(startDate: Date, endDate: Date) {
  const activities = await prisma.userActivity.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
      country: {
        not: null,
      },
    },
    select: {
      country: true,
    },
  })

  // Count by country
  const countryMap = new Map<string, number>()
  for (const activity of activities) {
    if (activity.country) {
      countryMap.set(activity.country, (countryMap.get(activity.country) || 0) + 1)
    }
  }

  // Convert to array and sort
  return Array.from(countryMap.entries())
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
}
