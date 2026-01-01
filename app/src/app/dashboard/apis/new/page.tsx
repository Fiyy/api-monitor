import { Metadata } from "next"
import { ApiForm } from "@/components/apis/api-form"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Add API | APIShift",
  description: "Add a new API to monitor",
}

export default function NewApiPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/apis">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Add New API</h2>
          <p className="text-muted-foreground">
            Configure a new API endpoint to monitor for structure changes
          </p>
        </div>
      </div>

      <ApiForm />
    </div>
  )
}
