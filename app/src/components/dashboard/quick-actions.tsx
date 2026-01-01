"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Settings } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button asChild className="w-full justify-start">
          <Link href="/dashboard/apis/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New API
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/dashboard/alerts">
            <FileText className="mr-2 h-4 w-4" />
            View All Alerts
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" />
            Configure Notifications
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
