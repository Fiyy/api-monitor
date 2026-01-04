import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "The Complete Guide to Monitoring Third-Party APIs",
  description: "Why monitoring external APIs is critical for your business and how to protect your application from unexpected changes by third-party providers.",
  keywords: ["third-party API monitoring", "external API monitoring", "API dependency management", "vendor API changes", "API reliability"],
  openGraph: {
    title: "The Complete Guide to Monitoring Third-Party APIs",
    description: "Protect your application from unexpected third-party API changes",
    url: "https://www.apishift.site/blog/third-party-api-monitoring-guide",
  },
  alternates: {
    canonical: "https://www.apishift.site/blog/third-party-api-monitoring-guide",
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
              Guide
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            The Complete Guide to Monitoring Third-Party APIs
          </h1>

          <div className="flex items-center gap-6 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              January 1, 2026
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              12 min read
            </span>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Your application is only as reliable as the third-party APIs it depends on. When Stripe, Twilio, or SendGrid change their APIs without notice, your production system breaks—and you're the last to know. Here's how to protect yourself.
          </p>

          <h2 className="text-3xl font-bold mb-6">Why Third-Party API Monitoring is Critical</h2>

          <p className="mb-6">
            Modern applications rely heavily on external services. Payment processing, authentication, email delivery, SMS, maps, analytics—these are all powered by third-party APIs. But here's the uncomfortable truth:
          </p>

          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-6 mb-8">
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
              <div className="space-y-3">
                <p className="font-semibold text-lg">You have zero control over third-party APIs</p>
                <ul className="space-y-2 text-sm">
                  <li>❌ They can change without notice</li>
                  <li>❌ They can deprecate features you depend on</li>
                  <li>❌ They can go down and take your app with them</li>
                  <li>❌ They can change pricing or rate limits</li>
                  <li>❌ You're entirely at their mercy</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">The Real Cost of Third-Party API Failures</h2>

          <p className="mb-6">
            Let's look at what happens when you don't monitor third-party APIs:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-950/20 p-4 rounded-r-lg">
              <h4 className="font-semibold mb-2">💸 Direct Revenue Loss</h4>
              <p className="text-sm text-muted-foreground">
                Payment API breaks → checkouts fail → customers abandon carts → revenue drops instantly
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-950/20 p-4 rounded-r-lg">
              <h4 className="font-semibold mb-2">😡 Customer Frustration</h4>
              <p className="text-sm text-muted-foreground">
                Auth API changes → users can't log in → support tickets flood in → reputation damage
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-950/20 p-4 rounded-r-lg">
              <h4 className="font-semibold mb-2">🚨 Emergency Fire Drills</h4>
              <p className="text-sm text-muted-foreground">
                API breaks on Friday evening → entire team scrambles → weekend ruined → burnout increases
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-950/20 p-4 rounded-r-lg">
              <h4 className="font-semibold mb-2">⏰ Delayed Detection</h4>
              <p className="text-sm text-muted-foreground">
                Hours pass before customers complain → damage already done → recovery takes days
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Common Third-Party API Risks</h2>

          <h3 className="text-2xl font-bold mb-4">1. Silent Breaking Changes</h3>
          <p className="mb-6">
            The most dangerous type. APIs change their response schema without announcement:
          </p>

          <div className="bg-slate-900 text-slate-100 p-4 rounded-lg mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`// Stripe API suddenly changes
// Before
{
  "amount": 2000,  // Integer (cents)
  "currency": "usd"
}

// After (breaking change)
{
  "amount": {
    "value": 2000,
    "currency": "usd",
    "display": "$20.00"
  }
}

// Your code breaks:
const total = response.amount // Now an object, not a number!`}</code></pre>
          </div>

          <h3 className="text-2xl font-bold mb-4">2. Deprecation Without Adequate Notice</h3>
          <p className="mb-4">
            APIs deprecate endpoints or fields faster than you can migrate:
          </p>
          <ul className="mb-6 space-y-2">
            <li>📧 Deprecation email gets buried in spam</li>
            <li>⏰ 30-day notice isn't enough for enterprise release cycles</li>
            <li>📝 Documentation updates missed by your team</li>
            <li>💥 Sudden shutdown breaks production</li>
          </ul>

          <h3 className="text-2xl font-bold mb-4">3. Undocumented Changes</h3>
          <p className="mb-6">
            Providers make "minor" changes they don't consider breaking, but they are for you:
          </p>

          <div className="bg-slate-900 text-slate-100 p-4 rounded-lg mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`// SendGrid adds rate limiting (undocumented)
{
  "headers": {
    "X-RateLimit-Remaining": "0",  // New field
    "X-RateLimit-Reset": "1640000000"
  }
}

// Your bulk email sender hits limit
// No warning, just starts failing`}</code></pre>
          </div>

          <h3 className="text-2xl font-bold mb-4">4. Performance Degradation</h3>
          <p className="mb-6">
            Third-party APIs slow down, but you don't notice until customers complain:
          </p>
          <ul className="mb-6 space-y-2">
            <li>🐌 Response times increase from 100ms to 3s</li>
            <li>⏱️ Your app's UX becomes sluggish</li>
            <li>😤 Users blame YOU, not the third-party</li>
            <li>📊 No visibility into the root cause</li>
          </ul>

          <h2 className="text-3xl font-bold mb-6">What to Monitor in Third-Party APIs</h2>

          <div className="space-y-6 mb-8">
            <div className="border rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                1. Schema Changes
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Monitor the structure of API responses to detect any changes:
              </p>
              <ul className="text-sm space-y-1 ml-6">
                <li>• Field additions or removals</li>
                <li>• Data type changes (string → object)</li>
                <li>• Required vs optional field changes</li>
                <li>• Nested structure modifications</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                2. Response Time
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Track API performance to catch degradation early:
              </p>
              <ul className="text-sm space-y-1 ml-6">
                <li>• Average response time</li>
                <li>• P95 and P99 latencies</li>
                <li>• Sudden spikes or slowdowns</li>
                <li>• Geographic performance differences</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                3. Error Rates
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Monitor failure patterns before they impact users:
              </p>
              <ul className="text-sm space-y-1 ml-6">
                <li>• HTTP status code changes</li>
                <li>• New error types appearing</li>
                <li>• Rate limiting errors</li>
                <li>• Authentication failures</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                4. API Headers
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Headers often contain important signals:
              </p>
              <ul className="text-sm space-y-1 ml-6">
                <li>• Deprecation warnings</li>
                <li>• Rate limit information</li>
                <li>• API version headers</li>
                <li>• Sunset dates</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">How to Monitor Third-Party APIs Effectively</h2>

          <div className="border-l-4 border-primary pl-6 my-8 bg-primary/5 p-6 rounded-r-lg">
            <h3 className="text-2xl font-bold mb-4">Step 1: Identify Critical Dependencies</h3>
            <p className="mb-4">
              Not all third-party APIs are equally important. Prioritize based on impact:
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="border rounded p-3">
                <p className="font-semibold text-sm mb-2">🔴 Critical</p>
                <ul className="text-xs space-y-1">
                  <li>• Payment processing</li>
                  <li>• Authentication</li>
                  <li>• Core business logic</li>
                </ul>
              </div>
              <div className="border rounded p-3">
                <p className="font-semibold text-sm mb-2">🟡 Important</p>
                <ul className="text-xs space-y-1">
                  <li>• Email delivery</li>
                  <li>• SMS notifications</li>
                  <li>• Search functionality</li>
                </ul>
              </div>
              <div className="border rounded p-3">
                <p className="font-semibold text-sm mb-2">🟢 Nice-to-Have</p>
                <ul className="text-xs space-y-1">
                  <li>• Analytics</li>
                  <li>• Social media</li>
                  <li>• Enhancement features</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              <strong>Rule of thumb:</strong> If the API going down means your core business stops, it's critical.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6 my-8 bg-primary/5 p-6 rounded-r-lg">
            <h3 className="text-2xl font-bold mb-4">Step 2: Set Up Automated Monitoring</h3>
            <p className="mb-4">
              Manual testing is insufficient. You need automated, continuous monitoring:
            </p>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg mb-4 overflow-x-auto">
              <pre className="text-sm"><code>{`# Example monitoring setup
Critical APIs:
  - Stripe Payments: Check every 5 minutes
  - Auth0 Authentication: Check every 5 minutes

Important APIs:
  - SendGrid Email: Check every 15 minutes
  - Twilio SMS: Check every 15 minutes

Nice-to-Have APIs:
  - Google Analytics: Check hourly
  - Twitter API: Check hourly`}</code></pre>
            </div>
          </div>

          <div className="border-l-4 border-primary pl-6 my-8 bg-primary/5 p-6 rounded-r-lg">
            <h3 className="text-2xl font-bold mb-4">Step 3: Configure Smart Alerts</h3>
            <p className="mb-4">
              Not all changes require immediate action. Set alert severity levels:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded">CRITICAL</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Immediate PagerDuty Alert</p>
                  <p className="text-sm text-muted-foreground">Field removals, type changes, complete API down</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="px-2 py-1 bg-orange-600 text-white text-xs font-semibold rounded">HIGH</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Slack Channel + Email</p>
                  <p className="text-sm text-muted-foreground">New required fields, error rate spike, deprecation warnings</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="px-2 py-1 bg-yellow-600 text-white text-xs font-semibold rounded">MEDIUM</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Email Notification</p>
                  <p className="text-sm text-muted-foreground">Optional field changes, minor performance degradation</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">LOW</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Dashboard Only</p>
                  <p className="text-sm text-muted-foreground">New field additions, minor header changes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-primary pl-6 my-8 bg-primary/5 p-6 rounded-r-lg">
            <h3 className="text-2xl font-bold mb-4">Step 4: Implement Fallback Strategies</h3>
            <p className="mb-4">
              Monitoring alerts you to problems, but you also need resilience:
            </p>

            <ul className="space-y-3 mb-4">
              <li>
                <strong>Circuit Breakers:</strong> Stop calling failing APIs to prevent cascading failures
              </li>
              <li>
                <strong>Caching:</strong> Serve stale data when APIs are down (better than nothing)
              </li>
              <li>
                <strong>Graceful Degradation:</strong> Disable non-critical features when their APIs fail
              </li>
              <li>
                <strong>Retry Logic:</strong> Smart retries with exponential backoff
              </li>
              <li>
                <strong>Alternative Providers:</strong> Have backup APIs ready (e.g., SendGrid → Amazon SES)
              </li>
            </ul>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm"><code>{`// Example circuit breaker pattern
const paymentCircuit = new CircuitBreaker(stripeAPI, {
  timeout: 3000,
  errorThreshold: 50,
  resetTimeout: 30000
})

try {
  const result = await paymentCircuit.call(chargeData)
} catch (error) {
  if (error.message === 'Circuit breaker open') {
    // Alert team: Stripe API is failing
    // Fall back to manual payment processing
  }
}`}</code></pre>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Real-World Example: E-commerce Platform</h2>

          <div className="bg-slate-50 dark:bg-slate-900 border rounded-lg p-6 mb-8">
            <h4 className="font-semibold mb-4">Scenario: Online store depends on multiple third-party APIs</h4>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold mb-2">🔴 Critical APIs (5-minute checks)</p>
                <ul className="ml-6 space-y-1">
                  <li>• Stripe for payment processing</li>
                  <li>• Auth0 for user authentication</li>
                  <li>• Shopify for inventory management</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">🟡 Important APIs (15-minute checks)</p>
                <ul className="ml-6 space-y-1">
                  <li>• SendGrid for order confirmations</li>
                  <li>• Twilio for SMS notifications</li>
                  <li>• ShipStation for shipping labels</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Monitoring Results:</p>
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded p-4 mt-2">
                  <p className="font-semibold mb-2">✓ Caught breaking change before customers</p>
                  <p className="text-muted-foreground">
                    Stripe changed payment intent response structure. Monitoring detected it within 5 minutes. Team deployed fix before any failed checkouts. Saved estimated $50K in lost sales.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Best Practices Checklist</h2>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-6 mb-8">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Monitor production API calls</strong> - Use real credentials and endpoints, not sandboxes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Track historical changes</strong> - Keep snapshots to compare and understand trends</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Subscribe to provider updates</strong> - But don't rely on them exclusively</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Test integration regularly</strong> - Run automated integration tests daily</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Document dependencies</strong> - Maintain a service catalog of all third-party APIs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Review vendor SLAs</strong> - Know what uptime and support you're guaranteed</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Have incident response plans</strong> - Know who to call and what to do when APIs fail</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6">Conclusion</h2>

          <p className="mb-6">
            Third-party APIs are convenient but risky. You're building your business on infrastructure you don't control. The only way to mitigate this risk is through vigilant monitoring and defensive engineering.
          </p>

          <p className="mb-6">
            Don't wait for a production disaster to start monitoring your dependencies. By the time customers complain, significant damage has already been done.
          </p>

          <p className="mb-8">
            <strong>Remember:</strong> Every third-party API is a potential point of failure. Monitor them all.
          </p>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 text-center my-12">
            <h3 className="text-2xl font-bold mb-4">Start Monitoring Your Third-Party APIs</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Protect your business from unexpected API changes. Get instant alerts when your dependencies change.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/login">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">See Pricing</Link>
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
              <p className="text-sm text-muted-foreground">Learn from real-world disasters caused by API changes</p>
            </Link>
            <Link href="/blog/setup-api-monitoring-5-minutes" className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-lg mb-2">How to Set Up API Monitoring in 5 Minutes</h4>
              <p className="text-sm text-muted-foreground">Quick start guide to protecting your systems</p>
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
