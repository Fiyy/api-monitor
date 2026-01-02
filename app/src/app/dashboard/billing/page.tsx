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
import { Check, CreditCard, Zap } from "lucide-react"

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

            <Button className="w-full">
              Upgrade to Pro
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

            <Button className="w-full" variant="outline">
              Contact Sales
            </Button>
          </CardContent>
        </Card>
      </div>

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
              <h3 className="text-lg font-semibold">No Payment Method</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Add a payment method to upgrade your plan and unlock more features.
              </p>
              <Button className="mt-4" disabled>
                Add Payment Method
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
