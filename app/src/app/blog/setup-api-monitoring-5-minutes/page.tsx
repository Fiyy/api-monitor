import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "How to Set Up API Monitoring in 5 Minutes",
  description: "A step-by-step guide to protecting your production systems from breaking API changes with minimal setup time. Start monitoring your APIs today.",
  keywords: ["API monitoring setup", "API monitoring tutorial", "quick API monitoring", "API change detection setup", "monitor APIs"],
  openGraph: {
    title: "How to Set Up API Monitoring in 5 Minutes",
    description: "Step-by-step guide to protecting your production systems from breaking API changes",
    url: "https://www.apishift.site/blog/setup-api-monitoring-5-minutes",
  },
  alternates: {
    canonical: "https://www.apishift.site/blog/setup-api-monitoring-5-minutes",
  },
}

export default function BlogPost() {
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
            <Link href="/blog" className="text-sm font-medium text-primary">
              Blog
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

      {/* Article */}
      <article className="container px-4 py-16 max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Tutorial
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            How to Set Up API Monitoring in 5 Minutes
          </h1>

          <div className="flex items-center gap-6 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              January 3, 2026
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              5 min read
            </span>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Protecting your production systems from breaking API changes doesn't have to be complicated. In this guide, you'll learn how to set up comprehensive API monitoring in just 5 minutes—no complex configuration required.
          </p>

          <h2 className="text-3xl font-bold mb-6">Why API Monitoring Matters</h2>

          <p className="mb-6">
            Before we dive into the setup, let's quickly understand why API monitoring is critical:
          </p>

          <ul className="mb-8 space-y-2">
            <li>🚨 <strong>Third-party APIs change without notice</strong> - Even well-documented APIs can introduce breaking changes</li>
            <li>💰 <strong>Downtime is expensive</strong> - Minutes of detection time can save thousands in revenue</li>
            <li>😴 <strong>Manual testing isn't enough</strong> - You can't check APIs 24/7, but automated monitoring can</li>
            <li>🔗 <strong>Dependencies are fragile</strong> - One breaking change can cascade through your entire system</li>
          </ul>

          <h2 className="text-3xl font-bold mb-6">What You'll Need</h2>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-6 mb-8">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                <span>The API endpoint URL you want to monitor</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Authentication credentials (if required)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                <span>5 minutes of your time</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6">Step-by-Step Setup Guide</h2>

          {/* Step 1 */}
          <div className="border-l-4 border-primary pl-6 my-8 bg-primary/5 p-6 rounded-r-lg">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                1
              </span>
              Create Your Free Account
            </h3>

            <p className="mb-4">
              Head to <Link href="/login" className="text-primary hover:underline">APIShift</Link> and sign up for a free account. No credit card required.
            </p>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg mb-4">
              <p className="text-sm font-mono">
                ✓ Free plan includes:<br/>
                • Up to 5 APIs<br/>
                • Hourly checks<br/>
                • Email notifications<br/>
                • 7 days data retention
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              <strong>Time:</strong> 1 minute
            </p>
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-primary pl-6 my-8 bg-primary/5 p-6 rounded-r-lg">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                2
              </span>
              Add Your First API
            </h3>

            <p className="mb-4">
              Once logged in, click "Add API" and enter your endpoint details:
            </p>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg mb-4 overflow-x-auto">
              <pre className="text-sm"><code>{`{
  "name": "Payment Gateway API",
  "url": "https://api.example.com/v1/payments",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  }
}`}</code></pre>
            </div>

            <p className="mb-4">
              <strong>Pro tip:</strong> Start with your most critical API—the one that would cause the most damage if it broke unexpectedly.
            </p>

            <p className="text-sm text-muted-foreground">
              <strong>Time:</strong> 2 minutes
            </p>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-primary pl-6 my-8 bg-primary/5 p-6 rounded-r-lg">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                3
              </span>
              Configure Monitoring Settings
            </h3>

            <p className="mb-4">
              Choose your monitoring preferences:
            </p>

            <ul className="mb-4 space-y-3">
              <li>
                <strong>Check Frequency:</strong> How often to check the API
                <ul className="ml-6 mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Free: Every hour</li>
                  <li>• Pro: Every 5 minutes</li>
                  <li>• Team: Real-time (every minute)</li>
                </ul>
              </li>
              <li>
                <strong>Alert Channels:</strong> Where to send notifications
                <ul className="ml-6 mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Email (included in all plans)</li>
                  <li>• Slack (Pro and above)</li>
                  <li>• Discord (Pro and above)</li>
                  <li>• Custom webhooks (Team plan)</li>
                </ul>
              </li>
            </ul>

            <p className="text-sm text-muted-foreground">
              <strong>Time:</strong> 1 minute
            </p>
          </div>

          {/* Step 4 */}
          <div className="border-l-4 border-primary pl-6 my-8 bg-primary/5 p-6 rounded-r-lg">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                4
              </span>
              Take Initial Snapshot
            </h3>

            <p className="mb-4">
              Click "Start Monitoring" to take the first snapshot of your API's schema. This becomes your baseline for detecting future changes.
            </p>

            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-4 mb-4">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <span>
                  <strong>What we capture:</strong> Field names, data types, required/optional status, nested structures, array types, and more.
                </span>
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              <strong>Time:</strong> 30 seconds
            </p>
          </div>

          {/* Step 5 */}
          <div className="border-l-4 border-primary pl-6 my-8 bg-primary/5 p-6 rounded-r-lg">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                5
              </span>
              You're Protected!
            </h3>

            <p className="mb-4">
              That's it! Your API is now being monitored 24/7. You'll receive instant alerts when:
            </p>

            <ul className="mb-4 space-y-2">
              <li>🔴 <strong>CRITICAL:</strong> Fields are removed or types change</li>
              <li>🟠 <strong>HIGH:</strong> Required fields are added or modified</li>
              <li>🟡 <strong>MEDIUM:</strong> Optional fields change</li>
              <li>🟢 <strong>LOW:</strong> New fields are added</li>
            </ul>

            <p className="text-sm text-muted-foreground">
              <strong>Time:</strong> 30 seconds
            </p>
          </div>

          <h2 className="text-3xl font-bold mb-6 mt-12">What Happens Next?</h2>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Continuous Monitoring</h3>
              <p className="text-muted-foreground">
                APIShift will check your API at your chosen frequency, comparing each response against the baseline schema. Any deviations trigger immediate alerts.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Instant Alerts</h3>
              <p className="text-muted-foreground">
                When a change is detected, you'll receive notifications through your configured channels with detailed information about what changed and the severity level.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Historical Tracking</h3>
              <p className="text-muted-foreground">
                View the complete history of all API changes in your dashboard. Compare snapshots side-by-side to understand exactly what changed and when.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Advanced Configuration (Optional)</h2>

          <p className="mb-6">
            Once you're comfortable with basic monitoring, you can enhance your setup with:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3">Custom Headers</h4>
              <p className="text-sm text-muted-foreground">
                Add authentication tokens, API keys, or custom headers for private APIs.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3">Multiple Environments</h4>
              <p className="text-sm text-muted-foreground">
                Monitor staging, production, and development environments separately.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3">Slack Integration</h4>
              <p className="text-sm text-muted-foreground">
                Send alerts directly to your team's Slack channels for faster response.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3">Custom Webhooks</h4>
              <p className="text-sm text-muted-foreground">
                Integrate with your existing incident management or notification systems.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Common Questions</h2>

          <div className="space-y-6 mb-8">
            <div>
              <h4 className="font-semibold text-lg mb-2">What if my API requires authentication?</h4>
              <p className="text-muted-foreground">
                No problem! You can add any custom headers including Authorization tokens, API keys, or OAuth credentials. All credentials are encrypted and stored securely.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Will monitoring affect my API performance?</h4>
              <p className="text-muted-foreground">
                No. We make standard GET requests just like any other API consumer. Our requests are lightweight and won't impact your API's performance.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">What if I get false positives?</h4>
              <p className="text-muted-foreground">
                You can configure which types of changes trigger alerts. For example, you might only want critical alerts for field removals and type changes, ignoring new field additions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Can I monitor internal/private APIs?</h4>
              <p className="text-muted-foreground">
                Yes! As long as the API is accessible from the internet, we can monitor it. For APIs behind firewalls, you can whitelist our IP addresses.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Best Practices</h2>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-6 mb-8">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Start with critical APIs:</strong> Monitor your most important dependencies first</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Set appropriate check frequencies:</strong> More critical APIs deserve more frequent checks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Configure alert channels:</strong> Make sure alerts reach the right team members</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Review changes regularly:</strong> Check your dashboard weekly to stay informed</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Document API dependencies:</strong> Keep track of which services depend on which APIs</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6">Conclusion</h2>

          <p className="mb-6">
            Setting up API monitoring doesn't have to be complicated or time-consuming. In just 5 minutes, you can protect your production systems from unexpected breaking changes and sleep better knowing you'll be alerted the moment something changes.
          </p>

          <p className="mb-8">
            Don't wait for a production disaster to happen. Start monitoring your APIs today and join thousands of developers who trust APIShift to keep their systems running smoothly.
          </p>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 text-center my-12">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Set up your first API monitor in 5 minutes. Free plan includes everything you need to get started.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/login">Start Monitoring Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/docs">Read Documentation</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Author & Share */}
        <div className="border-t pt-8 mt-12">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Written by</p>
              <p className="font-semibold">APIShift Team</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Share on Twitter</Button>
              <Button variant="outline" size="sm">Share on LinkedIn</Button>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="border-t pt-12 mt-12">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/5-real-cases-api-changes-broke-production" className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-lg mb-2">5 Real Cases Where API Changes Broke Production</h4>
              <p className="text-sm text-muted-foreground">Learn from real-world disasters and how to prevent them</p>
            </Link>
            <Link href="/blog/third-party-api-monitoring-guide" className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-lg mb-2">The Complete Guide to Monitoring Third-Party APIs</h4>
              <p className="text-sm text-muted-foreground">Why monitoring external APIs is critical for your business</p>
            </Link>
          </div>
        </div>
      </article>

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
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
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
