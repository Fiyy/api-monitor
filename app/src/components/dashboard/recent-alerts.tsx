"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { trpc } from "@/lib/trpc/client"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SchemaChange } from "@/lib/schema-diff"

export function RecentAlerts() {
  const { data: alerts, isLoading } = trpc.monitor.getAlerts.useQuery({
    acknowledged: false,
    limit: 5,
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
      case "HIGH":
        return "destructive"
      case "MEDIUM":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Alerts</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/alerts">
            View all
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {!alerts || alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted p-3 mb-3">
              <svg
                className="h-6 w-6 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              No alerts yet. All your APIs are stable!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => {
              const changes = Array.isArray(alert.diffs) ? (alert.diffs as unknown as SchemaChange[]) : []
              const changeCount = changes.length

              return (
                <div
                  key={alert.id}
                  className="flex items-start justify-between border-b pb-3 last:border-0"
                >
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">{alert.api.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {changeCount} change{changeCount !== 1 ? "s" : ""} detected •{" "}
                      {formatDistanceToNow(new Date(alert.notifiedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <Badge variant={getSeverityColor(alert.severity) as any}>
                    {alert.severity}
                  </Badge>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
