import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, Zap, Shield, BarChart3, Clock, GitCompare, Webhook, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Features",
  description: "Discover all the powerful features of APIShift. Real-time monitoring, smart alerts, schema tracking, and more to keep your APIs running smoothly.",
  keywords: ["API monitoring features", "schema detection", "API change tracking", "breaking change alerts", "API diff"],
  openGraph: {
    title: "APIShift Features - Powerful API Monitoring Tools",
    description: "Real-time monitoring, smart alerts, schema tracking, and more",
    url: "https://www.apishift.site/features",
  },
  alternates: {
    canonical: "https://www.apishift.site/features",
  },
}

const features = [
  {
    icon: Zap,
    title: "Real-time Monitoring",
    description: "Monitor your APIs at custom intervals from every hour to real-time. Get instant notifications when changes are detected.",
    details: [
      "Flexible check frequency (hourly to 1-minute intervals)",
      "Instant change detection",
      "Low latency monitoring",
      "Global monitoring locations (coming soon)",
    ],
  },
  {
    icon: GitCompare,
    title: "Smart Schema Diffing",
    description: "Advanced algorithm detects every type of change in your API structure, from field additions to type modifications.",
    details: [
      "Field additions and removals",
      "Data type changes",
      "Required/optional field changes",
      "Nested object modifications",
      "Array structure changes",
    ],
  },
  {
    icon: Bell,
    title: "Multi-channel Alerts",
    description: "Get notified instantly through your preferred channels. Never miss a critical API change.",
    details: [
      "Email notifications (all plans)",
      "Slack integration",
      "Discord webhooks",
      "Custom webhook support",
      "Configurable alert severity levels",
    ],
  },
  {
    icon: Shield,
    title: "Severity Classification",
    description: "Automatic categorization of changes by impact level helps you prioritize what matters most.",
    details: [
      "CRITICAL: Breaking changes (removals, type changes)",
      "HIGH: Required field changes",
      "MEDIUM: Optional field changes",
      "LOW: Field additions",
      "Smart prioritization",
    ],
  },
  {
    icon: Clock,
    title: "Historical Tracking",
    description: "Complete history of all API changes with snapshot comparisons. Track your API evolution over time.",
    details: [
      "7-90 days retention (plan dependent)",
      "Snapshot comparison",
      "Timeline visualization",
      "Export capabilities",
      "Audit trail",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Understand your API stability with detailed analytics and performance metrics.",
    details: [
      "Response time tracking",
      "Success/failure rates",
      "Change frequency analysis",
      "API health scores",
      "Custom dashboards (coming soon)",
    ],
  },
  {
    icon: Webhook,
    title: "Custom Integrations",
    description: "Integrate with your existing workflow using our flexible webhook system.",
    details: [
      "Custom webhook endpoints",
      "Flexible payload formats",
      "Retry mechanisms",
      "Authentication support",
      "Rate limiting",
    ],
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together with your team to manage and monitor your API ecosystem.",
    details: [
      "Team workspaces (Team plan)",
      "Role-based access (coming soon)",
      "Shared dashboards",
      "Collaborative alerting",
      "Activity logs",
    ],
  },
]

export default function FeaturesPage() {
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
            <Link href="/features" className="text-sm font-medium text-primary">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors">
              Docs
            </Link>
            <Button asChild size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Everything You Need to Monitor Your APIs
          </h1>
          <p className="text-xl text-muted-foreground">
            Powerful features designed to catch breaking changes before they impact your users
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm">
                          <span className="text-primary shrink-0 mt-0.5">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* How It Works Section */}
        <div className="max-w-4xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">Add Your APIs</h3>
              <p className="text-muted-foreground">
                Simply provide your API endpoints with optional headers for authentication
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">We Monitor 24/7</h3>
              <p className="text-muted-foreground">
                Our system continuously checks your APIs and tracks schema changes
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Get Instant Alerts</h3>
              <p className="text-muted-foreground">
                Receive notifications immediately when changes are detected
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="max-w-4xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Third-Party API Integration</h3>
              <p className="text-muted-foreground">
                Monitor external APIs you depend on and get notified before breaking changes affect your application.
              </p>
            </div>
            <div className="border bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Microservices Architecture</h3>
              <p className="text-muted-foreground">
                Track changes across your microservices ecosystem and ensure contract compatibility.
              </p>
            </div>
            <div className="border bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">API Versioning</h3>
              <p className="text-muted-foreground">
                Monitor multiple versions of your APIs simultaneously and track deprecations.
              </p>
            </div>
            <div className="border bg-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Compliance & Audit</h3>
              <p className="text-muted-foreground">
                Maintain a complete audit trail of all API changes for compliance requirements.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-24 max-w-3xl mx-auto">
          <div className="border bg-card p-12 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to protect your APIs?</h2>
            <p className="text-muted-foreground mb-8">
              Start monitoring for free. No credit card required.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/login">Get Started Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur mt-24">
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
                <li><a href="mailto:contact@apishift.site" className="hover:text-primary transition-colors">Contact</a></li>
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
