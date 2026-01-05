import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import BillingPageClient from "./billing-client"

export const metadata: Metadata = {
  title: "Billing | APIShift",
  description: "Manage your subscription and billing",
}

export default async function BillingPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return <BillingPageClient />
}
