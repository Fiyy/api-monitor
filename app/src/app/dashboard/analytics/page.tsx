import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AnalyticsPageClient from "./analytics-client"

export const metadata: Metadata = {
  title: "Analytics | APIShift",
  description: "View your API monitoring analytics and performance metrics",
}

export default async function AnalyticsPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return <AnalyticsPageClient />
}
