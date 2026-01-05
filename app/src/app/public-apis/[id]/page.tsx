import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Clock, ArrowLeft, ArrowRight, ExternalLink, TrendingUp, Activity } from "lucide-react"
import { notFound } from "next/navigation"

// 模拟API详情数据
const apiDetails: { [key: string]: any } = {
  "stripe": {
    id: "stripe",
    name: "Stripe Payment API",
    provider: "Stripe",
    category: "Payment",
    endpoint: "https://api.stripe.com/v1/charges",
    documentation: "https://stripe.com/docs/api",
    status: "healthy",
    lastChecked: "2 minutes ago",
    uptime: 99.98,
    checksToday: 287,
    avgResponseTime: 245,
    logo: "💳",
    description: "Stripe's Payment API allows you to accept payments, manage subscriptions, and handle all payment-related operations for your business.",
    changeHistory: [
      {
        date: "2026-01-03",
        time: "14:32",
        type: "minor",
        severity: "LOW",
        title: "New field added",
        description: "Added new field 'payment_method_details.metadata' to charge object",
        impact: "Non-breaking change. Existing integrations not affected.",
        beforeSnapshot: `{
  "id": "ch_123",
  "amount": 2999,
  "currency": "usd",
  "payment_method_details": {
    "type": "card",
    "card": { ... }
  }
}`,
        afterSnapshot: `{
  "id": "ch_123",
  "amount": 2999,
  "currency": "usd",
  "payment_method_details": {
    "type": "card",
    "card": { ... },
    "metadata": {}
  }
}`
      },
      {
        date: "2025-12-20",
        time: "09:15",
        type: "patch",
        severity: "LOW",
        title: "Documentation update",
        description: "Clarified behavior of 'capture' parameter in charge creation",
        impact: "No API changes. Documentation only.",
        beforeSnapshot: null,
        afterSnapshot: null
      },
      {
        date: "2025-12-01",
        time: "16:45",
        severity: "MEDIUM",
        type: "minor",
        title: "Deprecated field warning",
        description: "Field 'source' now deprecated in favor of 'payment_method'",
        impact: "Breaking change scheduled for 2026-06-01. Update integrations.",
        beforeSnapshot: `{
  "source": "tok_visa"
}`,
        afterSnapshot: `{
  "payment_method": "pm_card_visa"
}`
      }
    ],
    uptimeHistory: [
      { date: "Jan 5", uptime: 100 },
      { date: "Jan 4", uptime: 99.95 },
      { date: "Jan 3", uptime: 100 },
      { date: "Jan 2", uptime: 99.98 },
      { date: "Jan 1", uptime: 100 },
      { date: "Dec 31", uptime: 99.92 },
      { date: "Dec 30", uptime: 100 },
    ]
  },
  "sendgrid": {
    id: "sendgrid",
    name: "SendGrid Email API",
    provider: "SendGrid",
    category: "Email",
    endpoint: "https://api.sendgrid.com/v3/mail/send",
    documentation: "https://docs.sendgrid.com/api-reference",
    status: "issue-detected",
    lastChecked: "30 seconds ago",
    uptime: 99.92,
    checksToday: 287,
    avgResponseTime: 312,
    logo: "📧",
    description: "SendGrid's Email API enables you to send transactional and marketing emails at scale with reliable delivery and advanced analytics.",
    changeHistory: [
      {
        date: "2026-01-05",
        time: "10:23",
        type: "breaking",
        severity: "CRITICAL",
        title: "Required field added",
        description: "Field 'personalizations[].subject' changed from optional to required",
        impact: "BREAKING: All API calls without subject in personalizations will now fail with 400 error.",
        beforeSnapshot: `{
  "personalizations": [
    {
      "to": [{"email": "user@example.com"}]
    }
  ],
  "from": {"email": "sender@example.com"},
  "subject": "Hello",
  "content": [...]
}`,
        afterSnapshot: `{
  "personalizations": [
    {
      "to": [{"email": "user@example.com"}],
      "subject": "Hello"  // Now REQUIRED
    }
  ],
  "from": {"email": "sender@example.com"},
  "content": [...]
}`
      },
      {
        date: "2025-12-28",
        time: "15:10",
        type: "minor",
        severity: "LOW",
        title: "New optional parameter",
        description: "Added 'reply_to_list' parameter for multiple reply-to addresses",
        impact: "Non-breaking. Existing code continues to work.",
        beforeSnapshot: null,
        afterSnapshot: null
      }
    ],
    uptimeHistory: [
      { date: "Jan 5", uptime: 99.8 },
      { date: "Jan 4", uptime: 100 },
      { date: "Jan 3", uptime: 99.95 },
      { date: "Jan 2", uptime: 100 },
      { date: "Jan 1", uptime: 99.9 },
      { date: "Dec 31", uptime: 100 },
      { date: "Dec 30", uptime: 99.85 },
    ]
  }
}

// 为其他API生成默认数据
const defaultApiDetails = {
  github: { name: "GitHub REST API", provider: "GitHub", logo: "🐙" },
  twilio: { name: "Twilio SMS API", provider: "Twilio", logo: "📱" },
  openai: { name: "OpenAI Chat API", provider: "OpenAI", logo: "🤖" },
  slack: { name: "Slack Web API", provider: "Slack", logo: "💬" },
  shopify: { name: "Shopify Admin API", provider: "Shopify", logo: "🛒" },
  "google-maps": { name: "Google Maps API", provider: "Google", logo: "🗺️" },
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const api = apiDetails[params.id]

  if (!api) {
    return {
      title: "API Not Found",
    }
  }

  return {
    title: `${api.name} Status & Change History | APIShift`,
    description: `Real-time monitoring of ${api.name}. Check status, uptime, recent changes, and schema evolution. Free public API monitoring.`,
    keywords: [
      `${api.provider.toLowerCase()} api status`,
      `${api.provider.toLowerCase()} api changes`,
      `${api.name.toLowerCase()} monitoring`,
      `${api.provider.toLowerCase()} api uptime`,
    ],
    openGraph: {
      title: `${api.name} - Real-time Status Monitor`,
      description: `Track ${api.name} status, changes, and uptime in real-time.`,
      type: "website",
    },
  }
}

export default function ApiDetailPage({ params }: { params: { id: string } }) {
  const api = apiDetails[params.id]

  if (!api) {
    notFound()
  }

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

      {/* Content */}
      <div className="container px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/public-apis"
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Public APIs
            </Link>
          </div>

          {/* API Header */}
          <div className="bg-card border rounded-xl p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="text-6xl">{api.logo}</div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{api.name}</h1>
                  <p className="text-muted-foreground mb-4">{api.description}</p>
                  <div className="flex items-center gap-3 text-sm">
                    <Badge variant="secondary">{api.category}</Badge>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{api.provider}</span>
                    <span className="text-muted-foreground">·</span>
                    <a
                      href={api.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Documentation
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
              {api.status === "healthy" ? (
                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 px-4 py-2 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold">Healthy</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-semibold">Issue Detected</span>
                </div>
              )}
            </div>

            {/* Endpoint */}
            <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 mb-6">
              <div className="text-xs text-muted-foreground mb-1">Monitored Endpoint</div>
              <code className="text-sm">{api.endpoint}</code>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Uptime (30 days)</div>
                <div className="text-2xl font-bold text-primary">{api.uptime}%</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Checks Today</div>
                <div className="text-2xl font-bold">{api.checksToday}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Avg Response</div>
                <div className="text-2xl font-bold">{api.avgResponseTime}ms</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Last Checked</div>
                <div className="text-2xl font-bold text-green-600">{api.lastChecked}</div>
              </div>
            </div>
          </div>

          {/* Uptime History */}
          <div className="bg-card border rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              7-Day Uptime History
            </h2>
            <div className="flex items-end justify-between gap-2 h-48">
              {api.uptimeHistory.map((day: any, index: number) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-t-lg relative group cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                    <div
                      className="bg-primary rounded-t-lg transition-all"
                      style={{ height: `${(day.uptime / 100) * 160}px` }}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                      <div className="bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {day.uptime}% uptime
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{day.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Change History */}
          <div className="bg-card border rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" />
              Change History
            </h2>

            <div className="space-y-6">
              {api.changeHistory.map((change: any, index: number) => (
                <div key={index} className="border-l-4 pl-6 pb-6 last:pb-0" style={{
                  borderColor: change.severity === "CRITICAL" ? "#ef4444" :
                               change.severity === "MEDIUM" ? "#f59e0b" : "#10b981"
                }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{change.title}</h3>
                        <Badge variant={change.severity === "CRITICAL" ? "destructive" : "secondary"}>
                          {change.severity}
                        </Badge>
                        <Badge variant="outline">{change.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Clock className="w-4 h-4" />
                        <span>{change.date} at {change.time}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{change.description}</p>

                  <div className={`rounded-lg p-4 mb-4 ${
                    change.severity === "CRITICAL" ? "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900" :
                    change.severity === "MEDIUM" ? "bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900" :
                    "bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900"
                  }`}>
                    <div className="text-sm font-semibold mb-1">Impact:</div>
                    <div className="text-sm">{change.impact}</div>
                  </div>

                  {change.beforeSnapshot && change.afterSnapshot && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-semibold mb-2 text-green-600">✓ Before</div>
                        <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-xs"><code>{change.beforeSnapshot}</code></pre>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold mb-2 text-red-600">✗ After</div>
                        <div className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-xs"><code>{change.afterSnapshot}</code></pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want This Level of Monitoring for Your APIs?
            </h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Get instant alerts when your critical APIs change. Monitor private endpoints, set custom thresholds, and integrate with your workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/login">
                  Start Monitoring Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <Link href="/features">See All Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur mt-12">
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
