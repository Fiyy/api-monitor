import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Code, Zap, Settings, Bell, Shield, ExternalLink, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Documentation",
  description: "Complete APIShift documentation. Learn how to set up API monitoring, configure alerts, integrate webhooks, and get the most out of your monitoring setup.",
  keywords: ["API monitoring documentation", "APIShift docs", "API monitoring guide", "schema monitoring tutorial", "API change detection setup"],
  openGraph: {
    title: "APIShift Documentation - Complete Guide",
    description: "Everything you need to know about monitoring your APIs with APIShift",
    url: "https://www.apishift.site/docs",
  },
  alternates: {
    canonical: "https://www.apishift.site/docs",
  },
}

const quickStartSteps = [
  {
    title: "1. Create Your Account",
    description: "Sign up for free - no credit card required. Get access to our Free plan with up to 5 APIs.",
  },
  {
    title: "2. Add Your First API",
    description: "Enter your API endpoint URL and optional authentication headers. We'll take an initial snapshot.",
  },
  {
    title: "3. Configure Monitoring",
    description: "Set your check frequency and notification preferences. Start receiving alerts for any changes.",
  },
]

const documentationSections = [
  {
    icon: Zap,
    title: "Getting Started",
    description: "Quick start guide to set up your first API monitor in minutes",
    topics: [
      "Creating your account",
      "Adding your first API",
      "Understanding the dashboard",
      "Setting up notifications",
    ],
    href: "#getting-started",
  },
  {
    icon: Code,
    title: "API Configuration",
    description: "Learn how to configure and optimize your API monitoring",
    topics: [
      "Adding authentication headers",
      "Custom request configuration",
      "Managing multiple environments",
      "Response filtering",
    ],
    href: "#api-configuration",
  },
  {
    icon: Bell,
    title: "Alerts & Notifications",
    description: "Configure multi-channel alerts to stay informed",
    topics: [
      "Email notifications",
      "Slack integration",
      "Discord webhooks",
      "Custom webhook endpoints",
    ],
    href: "#alerts",
  },
  {
    icon: Settings,
    title: "Advanced Features",
    description: "Unlock powerful monitoring capabilities",
    topics: [
      "Schema diff algorithms",
      "Historical comparisons",
      "Custom monitoring rules",
      "API health scores",
    ],
    href: "#advanced",
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Understanding how we protect your data",
    topics: [
      "Data encryption",
      "Authentication security",
      "GDPR compliance",
      "Data retention policies",
    ],
    href: "#security",
  },
  {
    icon: BookOpen,
    title: "Best Practices",
    description: "Tips and strategies for effective API monitoring",
    topics: [
      "Choosing check frequencies",
      "Managing alert fatigue",
      "Monitoring third-party APIs",
      "Team collaboration workflows",
    ],
    href: "#best-practices",
  },
]

const faqs = [
  {
    question: "How does APIShift detect schema changes?",
    answer: "We use advanced diffing algorithms to compare the structure of API responses. This includes detecting field additions, removals, type changes, required/optional modifications, and nested object changes.",
  },
  {
    question: "What happens when a change is detected?",
    answer: "When we detect a change, we immediately send notifications through your configured channels (email, Slack, Discord, webhooks). The change is categorized by severity (CRITICAL, HIGH, MEDIUM, LOW) and you can view detailed diffs in your dashboard.",
  },
  {
    question: "Can I monitor APIs that require authentication?",
    answer: "Yes! You can add custom headers including Authorization tokens, API keys, or any other authentication method your API requires. All credentials are encrypted and stored securely.",
  },
  {
    question: "How often are APIs checked?",
    answer: "Check frequency depends on your plan: Free plan offers hourly checks, Pro plan every 5 minutes, and Team plan offers real-time monitoring (every minute).",
  },
  {
    question: "What if my API has sensitive data?",
    answer: "We only store the schema structure, not the actual data values. You can also use response filtering to exclude sensitive fields from monitoring.",
  },
  {
    question: "Can I test the monitoring before going live?",
    answer: "Yes! Our Free plan is perfect for testing. You can add up to 5 APIs and see exactly how our monitoring works before upgrading.",
  },
]

export default function DocsPage() {
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
            <Link href="/docs" className="text-sm font-medium text-primary">
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
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Everything you need to know about monitoring your APIs with APIShift
          </p>

          {/* Search Bar (Placeholder) */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Quick Start */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Start</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickStartSteps.map((step, index) => (
              <div key={index} className="border bg-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link href="/login">Get Started Now</Link>
            </Button>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="max-w-6xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Documentation</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {documentationSections.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.title} className="border bg-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{section.description}</p>
                  <ul className="space-y-2 mb-4">
                    {section.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-sm">
                        <span className="text-primary shrink-0 mt-0.5">→</span>
                        <span className="text-muted-foreground">{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={section.href}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    Learn more <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* API Reference */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="border bg-card p-8 rounded-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <Code className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">API Reference</h2>
                <p className="text-muted-foreground">
                  Complete reference for integrating APIShift programmatically. Access monitoring data, manage APIs, and configure alerts via our REST API.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Authentication</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Use API keys for secure authentication
                </p>
                <code className="text-xs bg-muted p-2 rounded block">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Endpoints</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• GET /api/monitors</li>
                  <li>• POST /api/monitors</li>
                  <li>• GET /api/changes</li>
                  <li>• POST /api/webhooks</li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <Button asChild variant="outline">
                <Link href="#api-reference">View Full API Reference</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border bg-card p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Guides */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Integrations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border bg-card p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get instant email notifications for all API changes
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="#email-setup">Setup Guide</Link>
              </Button>
            </div>
            <div className="border bg-card p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-semibold mb-2">Slack</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send alerts directly to your Slack channels
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="#slack-integration">Setup Guide</Link>
              </Button>
            </div>
            <div className="border bg-card p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="font-semibold mb-2">Discord</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Post notifications to Discord via webhooks
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="#discord-webhooks">Setup Guide</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Support CTA */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="border bg-card p-12 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <a href="mailto:support@apishift.site">Contact Support</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">About Us</Link>
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
