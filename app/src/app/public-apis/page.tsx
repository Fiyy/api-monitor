import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Clock, TrendingUp, ExternalLink, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Public API Status Monitor - Real-time Monitoring of Popular APIs | APIShift",
  description: "Free real-time monitoring of popular APIs including Stripe, GitHub, Twilio, SendGrid, and more. Check API status, recent changes, and uptime history.",
  keywords: [
    "stripe api status",
    "github api status",
    "twilio api status",
    "sendgrid api status",
    "api status page",
    "api monitoring",
    "api uptime",
    "api changes",
    "rest api monitoring",
    "public api status"
  ],
  openGraph: {
    title: "Public API Status Monitor - Track Popular APIs in Real-time",
    description: "Monitor Stripe, GitHub, Twilio, SendGrid and other popular APIs for free. Get instant updates on schema changes and downtime.",
    type: "website",
    url: "https://www.apishift.site/public-apis",
  },
  twitter: {
    card: "summary_large_image",
    title: "Public API Status Monitor",
    description: "Free real-time monitoring of popular APIs. Check status and recent changes.",
  },
  alternates: {
    canonical: "https://www.apishift.site/public-apis",
  },
}

// 模拟数据 - 实际应用中应从数据库获取
const publicApis = [
  {
    id: "stripe",
    name: "Stripe Payment API",
    provider: "Stripe",
    category: "Payment",
    endpoint: "https://api.stripe.com/v1/charges",
    status: "healthy",
    lastChecked: "2 minutes ago",
    uptime: 99.98,
    checksToday: 287,
    lastChange: {
      date: "2026-01-03",
      type: "minor",
      description: "Added new field 'payment_method_details.metadata'",
      severity: "LOW"
    },
    totalChanges: 3,
    logo: "💳"
  },
  {
    id: "github",
    name: "GitHub REST API",
    provider: "GitHub",
    category: "Developer Tools",
    endpoint: "https://api.github.com/repos/octocat/hello-world",
    status: "healthy",
    lastChecked: "1 minute ago",
    uptime: 99.99,
    checksToday: 287,
    lastChange: {
      date: "2025-12-28",
      type: "minor",
      description: "New field 'visibility' added to repository response",
      severity: "LOW"
    },
    totalChanges: 2,
    logo: "🐙"
  },
  {
    id: "twilio",
    name: "Twilio SMS API",
    provider: "Twilio",
    category: "Communication",
    endpoint: "https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages",
    status: "healthy",
    lastChecked: "3 minutes ago",
    uptime: 99.95,
    checksToday: 287,
    lastChange: {
      date: "2025-12-15",
      type: "patch",
      description: "Updated error response format",
      severity: "MEDIUM"
    },
    totalChanges: 5,
    logo: "📱"
  },
  {
    id: "sendgrid",
    name: "SendGrid Email API",
    provider: "SendGrid",
    category: "Email",
    endpoint: "https://api.sendgrid.com/v3/mail/send",
    status: "issue-detected",
    lastChecked: "30 seconds ago",
    uptime: 99.92,
    checksToday: 287,
    lastChange: {
      date: "2026-01-05",
      type: "breaking",
      description: "Field 'personalizations[].subject' changed from optional to required",
      severity: "CRITICAL"
    },
    totalChanges: 4,
    logo: "📧"
  },
  {
    id: "openai",
    name: "OpenAI Chat API",
    provider: "OpenAI",
    category: "AI/ML",
    endpoint: "https://api.openai.com/v1/chat/completions",
    status: "healthy",
    lastChecked: "1 minute ago",
    uptime: 99.89,
    checksToday: 287,
    lastChange: {
      date: "2026-01-02",
      type: "minor",
      description: "New model 'gpt-4-turbo' added to available models",
      severity: "LOW"
    },
    totalChanges: 8,
    logo: "🤖"
  },
  {
    id: "slack",
    name: "Slack Web API",
    provider: "Slack",
    category: "Communication",
    endpoint: "https://slack.com/api/chat.postMessage",
    status: "healthy",
    lastChecked: "2 minutes ago",
    uptime: 99.97,
    checksToday: 287,
    lastChange: {
      date: "2025-12-20",
      type: "minor",
      description: "New optional field 'metadata' for message attachments",
      severity: "LOW"
    },
    totalChanges: 6,
    logo: "💬"
  },
  {
    id: "shopify",
    name: "Shopify Admin API",
    provider: "Shopify",
    category: "E-commerce",
    endpoint: "https://your-shop.myshopify.com/admin/api/2024-01/products.json",
    status: "healthy",
    lastChecked: "4 minutes ago",
    uptime: 99.94,
    checksToday: 287,
    lastChange: {
      date: "2026-01-01",
      type: "minor",
      description: "New field 'product.sustainability_info' added",
      severity: "LOW"
    },
    totalChanges: 7,
    logo: "🛒"
  },
  {
    id: "google-maps",
    name: "Google Maps API",
    provider: "Google",
    category: "Maps/Location",
    endpoint: "https://maps.googleapis.com/maps/api/geocode/json",
    status: "healthy",
    lastChecked: "1 minute ago",
    uptime: 99.99,
    checksToday: 287,
    lastChange: {
      date: "2025-12-10",
      type: "patch",
      description: "Improved accuracy of address components",
      severity: "LOW"
    },
    totalChanges: 2,
    logo: "🗺️"
  },
]

const categories = ["All", "Payment", "Communication", "Developer Tools", "Email", "AI/ML", "E-commerce", "Maps/Location"]

export default function PublicApisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-xl">APIShift</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/public-apis" className="text-sm font-medium text-primary">
              Public APIs
            </Link>
            <Button asChild size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <TrendingUp className="w-4 h-4 mr-2 inline" />
              Updated every 5 minutes
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Public API Status Monitor
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Free real-time monitoring of popular APIs. Check status, recent changes, and uptime history for Stripe, GitHub, Twilio, and more.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{publicApis.length}</div>
                <div className="text-sm text-muted-foreground">APIs Monitored</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">287</div>
                <div className="text-sm text-muted-foreground">Checks Today</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">99.95%</div>
                <div className="text-sm text-muted-foreground">Avg Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">37</div>
                <div className="text-sm text-muted-foreground">Changes This Month</div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* API Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {publicApis.map((api) => (
              <div key={api.id} className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="text-4xl">{api.logo}</div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{api.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {api.category}
                        </Badge>
                        <span>·</span>
                        <span>{api.provider}</span>
                      </div>
                    </div>
                  </div>
                  {api.status === "healthy" ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
                  )}
                </div>

                {/* Status Info */}
                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Status</div>
                    <div className="text-sm font-semibold">
                      {api.status === "healthy" ? (
                        <span className="text-green-600">Healthy</span>
                      ) : (
                        <span className="text-red-600">Issue</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Uptime</div>
                    <div className="text-sm font-semibold">{api.uptime}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Checks</div>
                    <div className="text-sm font-semibold">{api.checksToday}</div>
                  </div>
                </div>

                {/* Last Change */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Clock className="w-3 h-3" />
                    <span>Last change: {api.lastChange.date}</span>
                    <Badge
                      variant={api.lastChange.severity === "CRITICAL" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {api.lastChange.severity}
                    </Badge>
                  </div>
                  <p className="text-sm">{api.lastChange.description}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-xs text-muted-foreground">
                    Last checked: {api.lastChecked}
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/public-apis/${api.id}`}>
                      View Details
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Monitor Your Own APIs
            </h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Don't wait for public status pages. Monitor your critical APIs in real-time with custom alerts and detailed change tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/login">
                  Start Monitoring Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
            <div className="flex justify-center gap-6 mt-6 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>3 APIs free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur">
        <div className="container px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-bold text-xl">APIShift</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Real-time API schema monitoring and change detection.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/public-apis" className="hover:text-primary transition-colors">Public APIs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} APIShift. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
