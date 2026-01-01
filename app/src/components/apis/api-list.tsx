"use client"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, ExternalLink, Edit, Trash2, Power } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export function ApiList() {
  const { data: apis, isLoading } = trpc.api.list.useQuery()
  const utils = trpc.useUtils()
  const deleteMutation = trpc.api.delete.useMutation({
    onSuccess: () => {
      utils.api.list.invalidate()
    },
  })
  const updateMutation = trpc.api.update.useMutation({
    onSuccess: () => {
      utils.api.list.invalidate()
    },
  })

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-muted rounded w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!apis || apis.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-muted p-4 mb-4">
            <svg
              className="h-8 w-8 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No APIs yet</h3>
          <p className="text-muted-foreground text-center mb-4">
            Get started by adding your first API to monitor
          </p>
          <Button asChild>
            <Link href="/dashboard/apis/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First API
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {apis.map((api) => (
        <Card key={api.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1">
                <CardTitle className="text-lg">{api.name}</CardTitle>
                <CardDescription className="text-xs break-all">
                  {api.url}
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/apis/${api.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      updateMutation.mutate({
                        id: api.id,
                        enabled: !api.enabled,
                      })
                    }}
                  >
                    <Power className="mr-2 h-4 w-4" />
                    {api.enabled ? "Disable" : "Enable"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => window.open(api.url, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open URL
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this API?")) {
                        deleteMutation.mutate({ id: api.id })
                      }
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Method</span>
              <Badge variant="outline">{api.method}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <Badge variant={api.enabled ? "default" : "secondary"}>
                {api.enabled ? "Active" : "Disabled"}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Check Interval</span>
              <span className="text-xs">
                {api.checkInterval >= 1440
                  ? `${api.checkInterval / 1440}d`
                  : `${api.checkInterval}m`}
              </span>
            </div>
            {api.lastCheckedAt && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last Check</span>
                <span className="text-xs">
                  {formatDistanceToNow(new Date(api.lastCheckedAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
