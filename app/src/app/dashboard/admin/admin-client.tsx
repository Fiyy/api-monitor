"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { trpc } from "@/lib/trpc/client"
import { Users, Activity, AlertTriangle, CheckCircle2, Globe, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const { data: overview, isLoading: overviewLoading } = trpc.admin.getOverview.useQuery()
  const { data: recentUsers } = trpc.admin.getRecentUsers.useQuery({ limit: 10, days: 7 })
  const { data: geoStats } = trpc.admin.getGeoStats.useQuery({ days: 7 })
  const { data: systemHealth } = trpc.admin.getSystemHealth.useQuery()

  if (overviewLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          System overview and user analytics
        </p>
      </div>

      {/* System Health Alert */}
      {systemHealth && !systemHealth.healthy && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <h3 className="font-semibold text-destructive">System Health Issues</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {systemHealth.staleApis > 0 && `${systemHealth.staleApis} stale APIs (not checked in 48h). `}
                  {systemHealth.criticalAlerts > 0 && `${systemHealth.criticalAlerts} unacknowledged critical alerts.`}
                </p>
                {systemHealth.lastCronRun && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Last cron run: {new Date(systemHealth.lastCronRun).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              +{overview?.newUsersToday || 0} today, +{overview?.newUsersWeek || 0} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.activeUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              {overview && overview.totalUsers > 0
                ? `${Math.round((overview.activeUsers / overview.totalUsers) * 100)}% of total`
                : '0% of total'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total APIs</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.totalApis || 0}</div>
            <p className="text-xs text-muted-foreground">
              {overview?.totalAlerts || 0} total alerts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.payingUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              {overview?.trialUsers || 0} on trial
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users (Last 7 Days)</CardTitle>
            <CardDescription>
              New user signups with their location and plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers && recentUsers.length > 0 ? (
                recentUsers.map((user) => {
                  const activity = user.activities?.[0]
                  const location = activity?.country
                    ? `${activity.city || 'Unknown'}, ${activity.country}`
                    : 'Unknown'

                  return (
                    <div key={user.id} className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name || 'Unknown'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Globe className="h-3 w-3" />
                          <span>{location}</span>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge variant={
                          user.subscription?.plan === 'PRO' || user.subscription?.plan === 'TEAM'
                            ? 'default'
                            : 'secondary'
                        }>
                          {user.subscription?.plan || 'FREE'}
                          {user.subscription?.status === 'TRIALING' && ' (Trial)'}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {user._count.apis} APIs
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No new users in the last 7 days
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>
              User activity by country (last 7 days)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {geoStats && geoStats.length > 0 ? (
                geoStats.slice(0, 10).map((stat, index) => (
                  <div key={stat.country} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        #{index + 1}
                      </span>
                      <span className="text-sm">{stat.country}</span>
                    </div>
                    <Badge variant="outline">{stat.count}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No geographic data available
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">📧 Daily Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Automated reports sent daily at 9 AM to your admin email with:
            </p>
            <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>New user signups</li>
              <li>Geographic breakdown</li>
              <li>System statistics</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">🔐 Access Control</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Only users with ADMIN role can access this dashboard. To grant admin access:
            </p>
            <code className="mt-2 block text-xs bg-muted p-2 rounded">
              UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
            </code>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">⚙️ System Status</CardTitle>
          </CardHeader>
          <CardContent>
            {systemHealth && (
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">System Health</span>
                  <Badge variant={systemHealth.healthy ? "default" : "destructive"}>
                    {systemHealth.healthy ? "Healthy" : "Issues"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Stale APIs</span>
                  <span className="font-medium">{systemHealth.staleApis}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Critical Alerts</span>
                  <span className="font-medium">{systemHealth.criticalAlerts}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
