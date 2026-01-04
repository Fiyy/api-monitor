import { Metadata } from "next"
import { auth } from "@/lib/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Zap, AlertCircle, Clock } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Billing | APIShift",
  description: "Manage your subscription and billing",
}

export default async function BillingPage() {
  const session = await auth()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
        <p className="text-muted-foreground">
          Manage your subscription and view billing history
        </p>
      </div>

      {/* Coming Soon Notice */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                Payment System Coming Soon
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                We're currently integrating Stripe payment processing to enable Pro and Team plan upgrades.
                For now, you can enjoy all Free plan features. Interested in upgrading early?{" "}
                <a href="mailto:sales@apishift.site" className="underline font-medium hover:text-blue-900 dark:hover:text-blue-50">
                  Contact our sales team
                </a>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Free Plan */}
        <Card className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Free</CardTitle>
              <Badge variant="secondary">Current Plan</Badge>
            </div>
            <CardDescription>Perfect for getting started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold">$0</div>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>

            <ul className="space-y-2">
              {[
                "Up to 5 APIs",
                "Hourly checks",
                "Basic schema detection",
                "7 days data retention",
                "Email notifications",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full" disabled>
              Current Plan
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="border-primary relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-primary">Popular</Badge>
          </div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pro</CardTitle>
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>For growing teams</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold">$29</div>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>

            <ul className="space-y-2">
              {[
                "Up to 50 APIs",
                "Every 5 minutes checks",
                "Advanced diff algorithm",
                "90 days data retention",
                "Priority email support",
                "Slack/Discord webhooks",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full" disabled>
              <Clock className="h-4 w-4 mr-2" />
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        {/* Team Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Team</CardTitle>
            <CardDescription>For large organizations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold">$99</div>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>

            <ul className="space-y-2">
              {[
                "Unlimited APIs",
                "Real-time monitoring",
                "Custom diff rules",
                "Unlimited data retention",
                "24/7 support",
                "Custom integrations",
                "Team collaboration",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full" variant="outline" asChild>
              <a href="mailto:sales@apishift.site">
                Contact Sales
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>
              Manage your payment information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-dashed p-8 text-center">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <CreditCard className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">Payment System in Development</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Stripe integration is currently being set up. You'll be able to add payment methods soon.
                </p>
                <Button className="mt-4" disabled>
                  <Clock className="h-4 w-4 mr-2" />
                  Coming Soon
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Usage</CardTitle>
            <CardDescription>
              Your plan limits and usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">APIs</span>
                  <span className="font-medium">0 / 5</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "0%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Check Frequency</span>
                  <span className="font-medium">Hourly</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Data Retention</span>
                  <span className="font-medium">7 days</span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/pricing">View All Plans</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View and download your invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed p-8 text-center">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <p className="text-sm text-muted-foreground">
                No billing history yet. Your invoices will appear here once you upgrade.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
