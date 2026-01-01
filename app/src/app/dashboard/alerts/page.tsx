import { Metadata } from "next"
import { AlertsList } from "@/components/alerts/alerts-list"

export const metadata: Metadata = {
  title: "Alerts | APIShift",
  description: "View all API change alerts",
}

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Alerts</h2>
        <p className="text-muted-foreground">
          All detected API schema changes and notifications
        </p>
      </div>

      <AlertsList />
    </div>
  )
}
