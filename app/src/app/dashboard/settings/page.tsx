import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import SettingsPageClient from "./settings-client"

export const metadata: Metadata = {
  title: "Settings | APIShift",
  description: "Manage your account settings and notification preferences",
}

export default async function SettingsPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return <SettingsPageClient user={session.user} />
}
