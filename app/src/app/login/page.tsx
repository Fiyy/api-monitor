import { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your APIShift account to monitor your APIs, track schema changes, and manage alerts.",
  openGraph: {
    title: "Login to APIShift",
    description: "Access your API monitoring dashboard",
    url: "https://www.apishift.site/login",
  },
  alternates: {
    canonical: "https://www.apishift.site/login",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default async function LoginPage() {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <LoginForm />
    </div>
  )
}
