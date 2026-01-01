import { Metadata } from "next"
import { ApiEditForm } from "@/components/apis/api-edit-form"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Edit API | APIShift",
  description: "Edit API configuration",
}

export default function EditApiPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/apis">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Edit API</h2>
          <p className="text-muted-foreground">
            Update API endpoint configuration
          </p>
        </div>
      </div>

      <ApiEditForm params={params} />
    </div>
  )
}
