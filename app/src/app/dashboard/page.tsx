import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentAlerts } from "@/components/dashboard/recent-alerts"
import { QuickActions } from "@/components/dashboard/quick-actions"

export const metadata: Metadata = {
  title: "Dashboard | APIShift",
  description: "Monitor your API structure changes",
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name || "there"}!
        </h2>
        <p className="text-muted-foreground">
          Here's what's happening with your APIs today.
        </p>
      </div>

      <StatsCards />

      <div className="grid gap-6 md:grid-cols-2">
        <QuickActions />
        <RecentAlerts />
      </div>
    </div>
  )
}
