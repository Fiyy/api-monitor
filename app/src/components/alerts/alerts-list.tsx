"use client"

import { useState } from "react"
import { trpc } from "@/lib/trpc/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { SchemaChange } from "@/lib/schema-diff"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function AlertsList() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const { data: unacknowledgedAlerts, isLoading: loadingUnack } =
    trpc.monitor.getAlerts.useQuery({
      acknowledged: false,
      limit: 50,
    })

  const { data: acknowledgedAlerts, isLoading: loadingAck } =
    trpc.monitor.getAlerts.useQuery({
      acknowledged: true,
      limit: 50,
    })

  const utils = trpc.useUtils()
  const acknowledgeMutation = trpc.monitor.acknowledgeAlert.useMutation({
    onSuccess: () => {
      utils.monitor.getAlerts.invalidate()
    },
  })

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "HIGH":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "MEDIUM":
        return <Info className="h-5 w-5 text-yellow-500" />
      default:
        return <CheckCircle2 className="h-5 w-5 text-blue-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "destructive"
      case "HIGH":
        return "destructive"
      case "MEDIUM":
        return "secondary"
      default:
        return "outline"
    }
  }

  const renderAlertCard = (alert: any) => {
    const changes = (alert.diffs as SchemaChange[]) || []
    const changeCount = changes.length

    return (
      <Card
        key={alert.id}
        className="cursor-pointer hover:bg-accent transition-colors"
        onClick={() => setSelectedAlert(alert)}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                {getSeverityIcon(alert.severity)}
                <CardTitle className="text-lg">{alert.api.name}</CardTitle>
              </div>
              <CardDescription className="text-xs">
                {alert.api.url}
              </CardDescription>
            </div>
            <Badge variant={getSeverityColor(alert.severity) as any}>
              {alert.severity}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">
            <span className="font-medium">{changeCount}</span> change
            {changeCount !== 1 ? "s" : ""} detected
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {formatDistanceToNow(new Date(alert.notifiedAt), {
                addSuffix: true,
              })}
            </span>
            {!alert.acknowledged && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  acknowledgeMutation.mutate({ id: alert.id })
                }}
              >
                Acknowledge
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loadingUnack && loadingAck) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-muted rounded w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const hasUnacknowledged =
    unacknowledgedAlerts && unacknowledgedAlerts.length > 0
  const hasAcknowledged = acknowledgedAlerts && acknowledgedAlerts.length > 0

  if (!hasUnacknowledged && !hasAcknowledged) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-muted p-4 mb-4">
            <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No alerts yet</h3>
          <p className="text-muted-foreground text-center">
            When API schema changes are detected, they'll appear here
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Tabs defaultValue="unacknowledged">
        <TabsList>
          <TabsTrigger value="unacknowledged">
            Unacknowledged
            {hasUnacknowledged && (
              <Badge variant="destructive" className="ml-2">
                {unacknowledgedAlerts?.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="acknowledged">Acknowledged</TabsTrigger>
        </TabsList>

        <TabsContent value="unacknowledged" className="mt-6">
          {hasUnacknowledged ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {unacknowledgedAlerts?.map(renderAlertCard)}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground">
                  No unacknowledged alerts
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="acknowledged" className="mt-6">
          {hasAcknowledged ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {acknowledgedAlerts?.map(renderAlertCard)}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground">No acknowledged alerts</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedAlert && getSeverityIcon(selectedAlert.severity)}
              {selectedAlert?.api.name}
            </DialogTitle>
            <DialogDescription>{selectedAlert?.api.url}</DialogDescription>
          </DialogHeader>

          {selectedAlert && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={getSeverityColor(selectedAlert.severity) as any}>
                  {selectedAlert.severity}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(selectedAlert.notifiedAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Detected Changes</h4>
                <div className="space-y-2">
                  {(selectedAlert.diffs as SchemaChange[]).map((change, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg p-3 bg-muted/50 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <code className="text-sm font-mono">{change.path}</code>
                        <Badge variant="outline">{change.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {change.message}
                      </p>
                      {change.oldValue && (
                        <div className="text-xs">
                          <span className="text-red-600">Old: {String(change.oldValue)}</span>
                        </div>
                      )}
                      {change.newValue && (
                        <div className="text-xs">
                          <span className="text-green-600">New: {String(change.newValue)}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
