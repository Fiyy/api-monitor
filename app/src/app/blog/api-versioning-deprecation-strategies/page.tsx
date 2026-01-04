import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, CheckCircle2, XCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "API Versioning and Deprecation: A Practical Guide",
  description: "Learn how to version your APIs properly and communicate deprecations effectively to minimize breaking changes for consumers. Best practices for API lifecycle management.",
  keywords: ["API versioning", "API deprecation", "API lifecycle", "semantic versioning", "API sunset", "breaking changes"],
  openGraph: {
    title: "API Versioning and Deprecation: A Practical Guide",
    description: "Best practices for API versioning and deprecation strategies",
    url: "https://www.apishift.site/blog/api-versioning-deprecation-strategies",
  },
  alternates: {
    canonical: "https://www.apishift.site/blog/api-versioning-deprecation-strategies",
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
              Best Practices
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            API Versioning and Deprecation: A Practical Guide
          </h1>

          <div className="flex items-center gap-6 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              December 30, 2025
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              9 min read
            </span>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            APIs evolve. Features change. Requirements shift. But your consumers expect stability. Here's how to balance innovation with compatibility through smart versioning and graceful deprecation.
          </p>

          <h2 className="text-3xl font-bold mb-6">Why API Versioning Matters</h2>

          <p className="mb-6">
            Without proper versioning, you face an impossible choice:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-950/20 p-4 rounded-r-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                Option 1: Never Change
              </h4>
              <p className="text-sm text-muted-foreground">
                Keep the API frozen forever. Technical debt accumulates. Can't fix design mistakes. Can't add new features. Product stagnates.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-950/20 p-4 rounded-r-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                Option 2: Break Everything
              </h4>
              <p className="text-sm text-muted-foreground">
                Make changes freely. Consumers break constantly. Trust erodes. Developers avoid your API. Integration costs skyrocket.
              </p>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-6 mb-8">
            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              The Solution: Strategic Versioning
            </h4>
            <p className="mb-3">
              Versioning lets you evolve your API while maintaining stability for existing consumers. It's the only sustainable path forward.
            </p>
            <ul className="space-y-2 text-sm">
              <li>✓ Consumers choose when to migrate</li>
              <li>✓ You can innovate without breaking integrations</li>
              <li>✓ Both old and new versions coexist temporarily</li>
              <li>✓ Migration happens gradually, not all at once</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6">Versioning Strategies Compared</h2>

          <div className="space-y-6 mb-8">
            <div className="border rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">1. URL Path Versioning (Recommended)</h3>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg mb-4">
                <code className="text-sm">https://api.example.com/v1/users</code><br/>
                <code className="text-sm">https://api.example.com/v2/users</code>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="font-semibold text-green-600 mb-2">✓ Pros</p>
                  <ul className="text-sm space-y-1">
                    <li>• Extremely visible and explicit</li>
                    <li>• Easy to route in load balancers</li>
                    <li>• Simple to test and debug</li>
                    <li>• Works with all HTTP clients</li>
                    <li>• Can cache by version</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-red-600 mb-2">✗ Cons</p>
                  <ul className="text-sm space-y-1">
                    <li>• URL changes break bookmarks</li>
                    <li>• Multiple codebases to maintain</li>
                    <li>• Can't version individual endpoints</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded p-4">
                <p className="text-sm font-semibold mb-2">Best for:</p>
                <p className="text-sm">Public APIs, REST APIs, when you have significant breaking changes affecting most endpoints</p>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">2. Header Versioning</h3>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg mb-4">
                <code className="text-sm">GET /users</code><br/>
                <code className="text-sm">Accept: application/vnd.api.v2+json</code><br/>
                <code className="text-sm"># or</code><br/>
                <code className="text-sm">API-Version: 2</code>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="font-semibold text-green-600 mb-2">✓ Pros</p>
                  <ul className="text-sm space-y-1">
                    <li>• Clean, stable URLs</li>
                    <li>• RESTful and follows HTTP standards</li>
                    <li>• More flexible content negotiation</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-red-600 mb-2">✗ Cons</p>
                  <ul className="text-sm space-y-1">
                    <li>• Less visible - easy to miss</li>
                    <li>• Harder to test in browsers</li>
                    <li>• Some tools don't support custom headers</li>
                    <li>• Caching becomes complex</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded p-4">
                <p className="text-sm font-semibold mb-2">Best for:</p>
                <p className="text-sm">Internal APIs, when you want stable URLs, GraphQL APIs</p>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">3. Query Parameter Versioning</h3>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg mb-4">
                <code className="text-sm">https://api.example.com/users?version=2</code><br/>
                <code className="text-sm"># or</code><br/>
                <code className="text-sm">https://api.example.com/users?api_version=2.0</code>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="font-semibold text-green-600 mb-2">✓ Pros</p>
                  <ul className="text-sm space-y-1">
                    <li>• Easy to add to existing APIs</li>
                    <li>• Visible in logs</li>
                    <li>• Works with all clients</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-red-600 mb-2">✗ Cons</p>
                  <ul className="text-sm space-y-1">
                    <li>• Mixes versioning with query params</li>
                    <li>• Can be accidentally omitted</li>
                    <li>• Not RESTful</li>
                    <li>• Complicates routing logic</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded p-4">
                <p className="text-sm font-semibold mb-2">Best for:</p>
                <p className="text-sm">Quick fixes, testing, temporary versioning during migration</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Semantic Versioning for APIs</h2>

          <p className="mb-6">
            Follow semantic versioning (semver) principles adapted for APIs:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900 border rounded-lg p-6 mb-8">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl font-bold text-red-600">MAJOR</span>
                  <span className="text-2xl text-muted-foreground">v1 → v2</span>
                </div>
                <p className="mb-2 font-semibold">Breaking changes that require consumer updates:</p>
                <ul className="text-sm space-y-1 ml-6">
                  <li>• Removing fields or endpoints</li>
                  <li>• Changing field types or formats</li>
                  <li>• Modifying authentication methods</li>
                  <li>• Restructuring response schemas</li>
                  <li>• Making optional fields required</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl font-bold text-yellow-600">MINOR</span>
                  <span className="text-2xl text-muted-foreground">v1.0 → v1.1</span>
                </div>
                <p className="mb-2 font-semibold">Backward-compatible new features:</p>
                <ul className="text-sm space-y-1 ml-6">
                  <li>• Adding new optional fields</li>
                  <li>• Adding new endpoints</li>
                  <li>• Adding new query parameters</li>
                  <li>• Making required fields optional</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl font-bold text-green-600">PATCH</span>
                  <span className="text-2xl text-muted-foreground">v1.1.0 → v1.1.1</span>
                </div>
                <p className="mb-2 font-semibold">Backward-compatible bug fixes:</p>
                <ul className="text-sm space-y-1 ml-6">
                  <li>• Fixing incorrect data</li>
                  <li>• Performance improvements</li>
                  <li>• Security patches</li>
                  <li>• Documentation corrections</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">The API Deprecation Process</h2>

          <p className="mb-6">
            Deprecation is the art of sunsetting old API versions without angering your users. Follow this timeline:
          </p>

          <div className="space-y-6 mb-8">
            <div className="border-l-4 border-blue-500 pl-6 bg-blue-50 dark:bg-blue-950/20 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3">Phase 1: Announcement (T-90 days)</h4>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="font-semibold mb-2">📧 Multi-Channel Communication</p>
                  <ul className="text-sm space-y-1 ml-6">
                    <li>• Email all registered API consumers</li>
                    <li>• Post on developer blog/changelog</li>
                    <li>• Update API documentation</li>
                    <li>• Social media announcements</li>
                    <li>• In-dashboard notifications</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">Include in announcement:</p>
                  <ul className="text-sm space-y-1 ml-6">
                    <li>• Exact sunset date</li>
                    <li>• Reason for deprecation</li>
                    <li>• Migration guide with code examples</li>
                    <li>• Support contact information</li>
                    <li>• Timeline for each phase</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
                <pre className="text-sm"><code>{`# Example deprecation notice
POST /api/v1/users
Response Headers:
  Deprecation: true
  Sunset: Sat, 31 Mar 2026 23:59:59 GMT
  Link: <https://api.example.com/v2/users>; rel="successor-version"
  Warning: "299 - API v1 will be sunset on March 31, 2026.
           Migrate to v2: https://docs.example.com/migration"`}</code></pre>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6 bg-yellow-50 dark:bg-yellow-950/20 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3">Phase 2: Soft Deprecation (T-60 days)</h4>

              <ul className="space-y-2 text-sm">
                <li>• Add deprecation warnings to API responses</li>
                <li>• Send reminder emails to active users</li>
                <li>• Provide migration assistance/office hours</li>
                <li>• Track which consumers haven't migrated</li>
                <li>• Reach out personally to high-value clients</li>
              </ul>

              <div className="mt-4 bg-slate-900 text-slate-100 p-3 rounded text-sm">
                <code># Monitor migration progress</code><br/>
                <code>v1_usage: 10,000 requests/day (60% of traffic)</code><br/>
                <code>v2_usage: 6,500 requests/day (40% of traffic)</code>
              </div>
            </div>

            <div className="border-l-4 border-orange-500 pl-6 bg-orange-50 dark:bg-orange-950/20 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3">Phase 3: Hard Deprecation (T-30 days)</h4>

              <ul className="space-y-2 text-sm">
                <li>• Final warning emails</li>
                <li>• Consider rate limiting old version (gradual throttling)</li>
                <li>• Offer paid support for stragglers</li>
                <li>• Prepare customer support for complaints</li>
                <li>• Test shutdown in staging environment</li>
              </ul>
            </div>

            <div className="border-l-4 border-red-500 pl-6 bg-red-50 dark:bg-red-950/20 p-6 rounded-r-lg">
              <h4 className="font-semibold text-lg mb-3">Phase 4: Sunset (T-0)</h4>

              <ul className="space-y-2 text-sm mb-4">
                <li>• Return 410 Gone status code</li>
                <li>• Provide helpful error message with migration link</li>
                <li>• Monitor support tickets closely</li>
                <li>• Have rollback plan ready (just in case)</li>
              </ul>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
                <pre className="text-sm"><code>{`# Response after sunset
HTTP/1.1 410 Gone
Content-Type: application/json

{
  "error": "api_version_sunset",
  "message": "API v1 was sunset on March 31, 2026",
  "migration_guide": "https://docs.example.com/v1-to-v2",
  "current_version": "https://api.example.com/v2/users",
  "support": "api-support@example.com"
}`}</code></pre>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Deprecation Best Practices</h2>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-6 mb-8">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Minimum 90 days notice</strong> - Enterprises need time for approval, development, testing, and deployment</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Provide migration tools</strong> - Code generators, diff tools, automated migration scripts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Support parallel running</strong> - Both versions should work simultaneously during migration period</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Track usage metrics</strong> - Know who's still using deprecated versions so you can reach out</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Offer paid extended support</strong> - For clients who genuinely can't migrate in time</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Document everything</strong> - What changed, why, how to migrate, exact timeline</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6">Real-World Example: Stripe's Approach</h2>

          <div className="bg-slate-50 dark:bg-slate-900 border rounded-lg p-6 mb-8">
            <p className="mb-4 font-semibold">Stripe is known for excellent API versioning. Here's what they do right:</p>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold mb-2">1. Dated Versions</p>
                <p className="text-muted-foreground">
                  Versions are dated (e.g., 2023-10-16) not numbered. This makes it clear when changes were made.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">2. Account-Level Versioning</p>
                <p className="text-muted-foreground">
                  Each account has a default version. You can override per-request with headers. No forced upgrades.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">3. Extensive Migration Guides</p>
                <p className="text-muted-foreground">
                  Every version change has detailed changelog with code examples showing before/after.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">4. Long Deprecation Windows</p>
                <p className="text-muted-foreground">
                  Stripe supports old versions for years, giving developers ample time to migrate.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">5. Automatic Upgrades (Optional)</p>
                <p className="text-muted-foreground">
                  They offer automated migration for simple changes, but it's opt-in only.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Key Takeaways</h2>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold text-sm">
                1
              </div>
              <p><strong>URL path versioning is the safest choice</strong> for most public REST APIs due to its visibility and simplicity</p>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold text-sm">
                2
              </div>
              <p><strong>Version only on breaking changes</strong> - Not every change requires a new version number</p>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold text-sm">
                3
              </div>
              <p><strong>Communicate deprecations early and often</strong> - 90 days minimum, multiple channels, clear migration guides</p>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold text-sm">
                4
              </div>
              <p><strong>Support parallel versions</strong> - Both old and new should work simultaneously during migration</p>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold text-sm">
                5
              </div>
              <p><strong>Track usage and reach out proactively</strong> - Don't let stragglers get surprised</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Conclusion</h2>

          <p className="mb-6">
            API versioning and deprecation are not technical problems—they're communication problems. The best versioning strategy is one that respects your consumers' time and trust.
          </p>

          <p className="mb-6">
            Version strategically. Deprecate gracefully. Communicate clearly. Your developers will thank you.
          </p>

          <p className="mb-8">
            And remember: the goal isn't to avoid breaking changes forever—it's to make them painless when they inevitably happen.
          </p>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 text-center my-12">
            <h3 className="text-2xl font-bold mb-4">Track API Version Changes Automatically</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Monitor all your API versions in one place. Get alerts when schemas change. Track deprecation usage.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/login">Start Monitoring Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/features">See How It Works</Link>
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
            <Link href="/blog/microservices-api-change-management" className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-lg mb-2">API Change Management for Microservices</h4>
              <p className="text-sm text-muted-foreground">Best practices for managing APIs in distributed systems</p>
            </Link>
            <Link href="/blog/5-real-cases-api-changes-broke-production" className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-lg mb-2">5 Cases Where API Changes Broke Production</h4>
              <p className="text-sm text-muted-foreground">Learn from real-world versioning disasters</p>
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
