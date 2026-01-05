import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { HomePageStructuredData } from "@/lib/seo/structured-data"
import { CheckCircle2, Zap, Shield, GitCompare, Bell, ArrowRight, Star, Users } from "lucide-react"

export default async function Home() {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <>
      <HomePageStructuredData />
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
        <section className="container px-4 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            {/* Social Proof Badge */}
            <div className="flex justify-center mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Users className="w-4 h-4 mr-2 inline" />
                Trusted by 1,000+ developers worldwide
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Catch Breaking API Changes
                <br />
                <span className="text-primary">Before They Break Production</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Real-time monitoring for your APIs. Get instant alerts when schemas change.
                Prevent disasters before they happen.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>Setup in 5 minutes</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                <Button asChild size="lg" className="text-lg px-8 h-14">
                  <Link href="/login">
                    Start Monitoring Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 h-14">
                  <Link href="/blog/5-real-cases-api-changes-broke-production">
                    See Real Disaster Stories
                  </Link>
                </Button>
              </div>

              {/* Pro Trial Badge */}
              <div className="flex justify-center mb-12">
                <Link href="/pricing" className="group">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950 border border-green-200 dark:border-green-900 hover:shadow-md transition-all">
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      🎉 Try Pro free for 14 days
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 text-green-700 dark:text-green-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

              {/* Social Proof Numbers */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">5K+</div>
                  <div className="text-sm text-muted-foreground">APIs Monitored</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">50K+</div>
                  <div className="text-sm text-muted-foreground">Checks Daily</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">1,200+</div>
                  <div className="text-sm text-muted-foreground">Changes Detected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo/Screenshot Section */}
        <section className="container px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-slate-400 text-sm ml-4">API Change Detected - Critical Alert</span>
                </div>
              </div>

              <div className="bg-slate-950 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <div className="text-red-400 mb-4">🔴 CRITICAL: Breaking change detected in Payment API</div>

                <div className="text-slate-300 mb-2">Endpoint: POST /api/v1/payments</div>
                <div className="text-slate-300 mb-4">Detected: 2 minutes ago</div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-green-400 mb-2">✓ Before (v1.2.0)</div>
                    <pre className="text-slate-300 text-xs leading-relaxed"><code>{`{
  "transaction_id": "tx_123",
  "amount": 2999,
  "currency": "usd",
  "status": "completed"
}`}</code></pre>
                  </div>

                  <div>
                    <div className="text-red-400 mb-2">✗ After (v1.2.1)</div>
                    <pre className="text-slate-300 text-xs leading-relaxed"><code>{`{
  "transaction_id": "tx_123",
  "payment_details": {
    "amount": 2999,
    "currency": "usd"
  },
  "status": "completed"
}`}</code></pre>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-red-950/50 border border-red-900 rounded">
                  <div className="text-red-300 text-xs">
                    <strong>Breaking Change:</strong> Field "amount" moved to nested object "payment_details.amount"<br/>
                    <strong>Impact:</strong> All consumers parsing response.amount will fail<br/>
                    <strong>Severity:</strong> CRITICAL - Immediate action required
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <span className="px-3 py-1 bg-blue-900 text-blue-200 text-xs rounded">Slack notified</span>
                  <span className="px-3 py-1 bg-purple-900 text-purple-200 text-xs rounded">Email sent</span>
                  <span className="px-3 py-1 bg-orange-900 text-orange-200 text-xs rounded">PagerDuty alerted</span>
                </div>
              </div>
            </div>

            <p className="text-center text-muted-foreground mt-6">
              Real-time schema diff detection catches breaking changes within minutes
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container px-4 py-20" id="features">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything You Need to Protect Your APIs
              </h2>
              <p className="text-xl text-muted-foreground">
                Comprehensive monitoring that actually works
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="border bg-card p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Real-time Detection</h3>
                <p className="text-muted-foreground mb-4">
                  Monitor APIs every hour (Free) to every minute (Team). Catch changes before customers complain.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Configurable check frequency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Global monitoring locations</span>
                  </li>
                </ul>
              </div>

              <div className="border bg-card p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
                  <GitCompare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Schema Diffing</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced algorithms detect every type of change - field additions, removals, type changes, and more.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Nested object tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Array structure detection</span>
                  </li>
                </ul>
              </div>

              <div className="border bg-card p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
                  <Bell className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Multi-channel Alerts</h3>
                <p className="text-muted-foreground mb-4">
                  Get notified instantly through your preferred channels. Never miss a critical change.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Email, Slack, Discord</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Custom webhooks</span>
                  </li>
                </ul>
              </div>

              <div className="border bg-card p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Severity Classification</h3>
                <p className="text-muted-foreground mb-4">
                  Automatic categorization by impact level helps you prioritize what matters most.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-semibold">CRITICAL:</span>
                    <span className="text-sm">Breaking changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-semibold">LOW:</span>
                    <span className="text-sm">Field additions</span>
                  </li>
                </ul>
              </div>

              <div className="border bg-card p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Historical Tracking</h3>
                <p className="text-muted-foreground mb-4">
                  Complete history of all changes with snapshot comparisons and timeline visualization.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>7-90 days retention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Export capabilities</span>
                  </li>
                </ul>
              </div>

              <div className="border bg-card p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
                <p className="text-muted-foreground mb-4">
                  Bank-level encryption and security. Your API credentials are safe with us.
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>Encrypted credentials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>SOC 2 compliant</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container px-4 py-20 bg-slate-100 dark:bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Loved by Developers</h2>
              <p className="text-xl text-muted-foreground">See what our users are saying</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card border rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "APIShift saved us from a disaster. Stripe changed their payment API and we caught it in 5 minutes instead of discovering it from angry customers."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    JD
                  </div>
                  <div>
                    <div className="font-semibold">John Doe</div>
                    <div className="text-sm text-muted-foreground">CTO, TechStartup Inc</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Setup took literally 5 minutes. Now we monitor all our third-party APIs and sleep better at night knowing we'll be alerted immediately."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    SM
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Miller</div>
                    <div className="text-sm text-muted-foreground">Lead Developer, E-commerce Co</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The schema diff visualization is incredible. We can see exactly what changed at a glance. Worth every penny of the Pro plan."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    MC
                  </div>
                  <div>
                    <div className="font-semibold">Mike Chen</div>
                    <div className="text-sm text-muted-foreground">DevOps Engineer, FinTech</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center text-primary-foreground shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Stop Breaking Changes From Breaking Your App
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join 1,000+ developers who trust APIShift to monitor their APIs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button asChild size="lg" variant="secondary" className="text-lg px-8 h-14">
                  <Link href="/login">
                    Start Free Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 h-14 bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Cancel anytime</span>
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
    </>
  )
}
