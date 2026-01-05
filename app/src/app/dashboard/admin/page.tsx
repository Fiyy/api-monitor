import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import AdminDashboard from "./admin-client"

export const metadata: Metadata = {
  title: "Admin Dashboard | APIShift",
  description: "Admin dashboard for monitoring system health and user activity",
}

export default async function AdminPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  })

  if (!user || user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  return <AdminDashboard />
}
