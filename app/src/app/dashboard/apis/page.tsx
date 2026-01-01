import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ApiList } from "@/components/apis/api-list"

export const metadata: Metadata = {
  title: "APIs | APIShift",
  description: "Manage your monitored APIs",
}

export default function ApisPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">APIs</h2>
          <p className="text-muted-foreground">
            Monitor and manage your API endpoints
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/apis/new">
            <Plus className="mr-2 h-4 w-4" />
            Add API
          </Link>
        </Button>
      </div>

      <ApiList />
    </div>
  )
}
