import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, CheckCircle2, XCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "API Change Management Best Practices for Microservices",
  description: "Essential strategies for managing API changes across distributed microservices architectures without breaking dependencies. Learn contract testing, versioning, and more.",
  keywords: ["microservices API management", "API change management", "microservices best practices", "API versioning", "contract testing", "service mesh"],
  openGraph: {
    title: "API Change Management Best Practices for Microservices",
    description: "Essential strategies for managing API changes in microservices architectures",
    url: "https://www.apishift.site/blog/microservices-api-change-management",
  },
  alternates: {
    canonical: "https://www.apishift.site/blog/microservices-api-change-management",
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
            API Change Management Best Practices for Microservices
          </h1>

          <div className="flex items-center gap-6 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              January 2, 2026
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              10 min read
            </span>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            In a microservices architecture, APIs are the glue that holds everything together. A single breaking change can cascade through dozens of services, causing system-wide failures. Here's how to manage API changes safely in distributed systems.
          </p>

          <h2 className="text-3xl font-bold mb-6">The Microservices API Challenge</h2>

          <p className="mb-6">
            Microservices architectures introduce unique challenges for API management:
          </p>

          <ul className="mb-8 space-y-2">
            <li>🔗 <strong>Complex dependencies</strong> - Services depend on multiple other services</li>
            <li>🚀 <strong>Independent deployments</strong> - Teams deploy at different cadences</li>
            <li>👥 <strong>Distributed ownership</strong> - Different teams own different services</li>
            <li>⚡ <strong>Cascading failures</strong> - One breaking change affects multiple consumers</li>
          </ul>

          <h2 className="text-3xl font-bold mb-6">1. Implement Contract Testing</h2>

          <p className="mb-6">
            Contract testing ensures that service providers and consumers agree on API contracts before deployment.
          </p>

          <div className="border-l-4 border-green-500 pl-6 my-8 bg-green-50 dark:bg-green-950/20 p-6 rounded-r-lg">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              Best Practice: Consumer-Driven Contracts
            </h3>

            <p className="mb-4">
              Consumers define their expectations of the provider's API. The provider must satisfy all consumer contracts before deploying.
            </p>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg mb-4 overflow-x-auto">
              <pre className="text-sm"><code>{`// Consumer contract (Order Service expects from Payment Service)
{
  "request": {
    "method": "POST",
    "path": "/api/payments",
    "body": {
      "amount": 99.99,
      "currency": "USD",
      "order_id": "ORD-123"
    }
  },
  "response": {
    "status": 200,
    "body": {
      "transaction_id": "string",
      "status": "completed|pending|failed",
      "timestamp": "ISO8601 date"
    }
  }
}`}</code></pre>
            </div>

            <p className="mb-4">
              <strong>Tools:</strong> Pact, Spring Cloud Contract, Postman Contract Testing
            </p>

            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
              <p className="font-semibold mb-2">Benefits:</p>
              <ul className="space-y-1 text-sm">
                <li>✓ Catch breaking changes before deployment</li>
                <li>✓ Enable independent team workflows</li>
                <li>✓ Provide living documentation</li>
                <li>✓ Reduce integration testing time</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">2. Use API Versioning Strategies</h2>

          <p className="mb-6">
            Versioning allows you to make changes without breaking existing consumers. Choose the right strategy for your needs:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                URL Versioning
              </h4>
              <div className="bg-slate-900 text-slate-100 p-3 rounded text-sm mb-3">
                <code>/api/v1/users</code><br/>
                <code>/api/v2/users</code>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Pros:</strong> Simple, explicit, easy to route
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Cons:</strong> Multiple codebases to maintain
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Header Versioning
              </h4>
              <div className="bg-slate-900 text-slate-100 p-3 rounded text-sm mb-3">
                <code>Accept: application/vnd.api.v1+json</code><br/>
                <code>API-Version: 2</code>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Pros:</strong> Clean URLs, flexible
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Cons:</strong> Less visible, harder to test
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-6 mb-8">
            <h4 className="font-semibold text-lg mb-3">Recommended: URL Versioning for Microservices</h4>
            <p className="text-sm mb-4">
              In microservices, URL versioning is often the best choice because:
            </p>
            <ul className="text-sm space-y-2">
              <li>✓ Service meshes can route based on URL paths</li>
              <li>✓ Load balancers can distribute traffic by version</li>
              <li>✓ Monitoring tools can track metrics per version</li>
              <li>✓ Teams can deprecate old versions independently</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6">3. Follow the Expand-Contract Pattern</h2>

          <p className="mb-6">
            The expand-contract pattern enables zero-downtime migrations for breaking changes:
          </p>

          <div className="space-y-6 mb-8">
            <div className="border-l-4 border-primary pl-6">
              <h4 className="font-semibold text-lg mb-2">Phase 1: Expand</h4>
              <p className="text-muted-foreground mb-3">
                Add new fields/endpoints alongside old ones. Support both old and new contracts simultaneously.
              </p>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>{`// Old field still works
{
  "user_email": "user@example.com",  // Legacy
  "email_addresses": [{              // New
    "email": "user@example.com",
    "primary": true
  }]
}`}</code></pre>
              </div>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h4 className="font-semibold text-lg mb-2">Phase 2: Migrate</h4>
              <p className="text-muted-foreground mb-3">
                Update all consumers to use the new contract. Monitor usage of old fields.
              </p>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>{`// Update consumer code
- const email = response.user_email
+ const email = response.email_addresses[0].email`}</code></pre>
              </div>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h4 className="font-semibold text-lg mb-2">Phase 3: Contract</h4>
              <p className="text-muted-foreground mb-3">
                Once all consumers migrate, remove old fields/endpoints after deprecation period.
              </p>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>{`// Remove legacy field after 90 days
{
  "email_addresses": [{
    "email": "user@example.com",
    "primary": true
  }]
}`}</code></pre>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">4. Establish API Governance</h2>

          <p className="mb-6">
            In microservices, governance ensures consistency and prevents breaking changes from slipping through:
          </p>

          <div className="grid gap-6 mb-8">
            <div className="border rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3">API Design Reviews</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Require peer review for API changes. Use automated linting to enforce standards.
              </p>
              <div className="bg-slate-900 text-slate-100 p-3 rounded text-sm">
                <code># .spectral.yaml - OpenAPI linting rules</code><br/>
                <code>rules:</code><br/>
                <code>&nbsp;&nbsp;no-breaking-changes: error</code><br/>
                <code>&nbsp;&nbsp;require-version-header: warn</code>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3">Change Approval Process</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Breaking changes require explicit approval from consumer teams.
              </p>
              <ul className="text-sm space-y-2">
                <li>1. Propose change with migration guide</li>
                <li>2. Get approval from all consumer teams</li>
                <li>3. Set deprecation timeline (min 90 days)</li>
                <li>4. Deploy with monitoring</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3">API Registry/Catalog</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Maintain a central registry of all APIs, their versions, and consumers.
              </p>
              <p className="text-sm">
                <strong>Tools:</strong> Backstage, SwaggerHub, Postman API Platform
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">5. Monitor API Usage and Health</h2>

          <p className="mb-6">
            Real-time monitoring helps you understand the impact of changes and catch issues early:
          </p>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
            <h4 className="font-semibold text-lg mb-4">Essential Metrics to Track</h4>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold mb-2">Traffic Metrics</h5>
                <ul className="text-sm space-y-1">
                  <li>• Requests per version</li>
                  <li>• Consumer breakdown</li>
                  <li>• Deprecated endpoint usage</li>
                  <li>• Migration progress</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Health Metrics</h5>
                <ul className="text-sm space-y-1">
                  <li>• Error rates by endpoint</li>
                  <li>• Response time changes</li>
                  <li>• Contract violations</li>
                  <li>• Schema drift detection</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">6. Implement Backward Compatibility Rules</h2>

          <p className="mb-6">
            Follow these rules to ensure backward compatibility:
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold mb-1">✓ Safe Changes</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Adding optional fields</li>
                  <li>• Adding new endpoints</li>
                  <li>• Making required fields optional</li>
                  <li>• Widening input validation</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold mb-1">✗ Breaking Changes (Require New Version)</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Removing fields or endpoints</li>
                  <li>• Changing field types</li>
                  <li>• Making optional fields required</li>
                  <li>• Renaming fields</li>
                  <li>• Changing response structures</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">7. Automate Breaking Change Detection</h2>

          <p className="mb-6">
            Don't rely on manual reviews to catch breaking changes. Automate detection in your CI/CD pipeline:
          </p>

          <div className="bg-slate-900 text-slate-100 p-4 rounded-lg mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`# CI/CD Pipeline Step
- name: Check for breaking changes
  run: |
    # Compare OpenAPI specs
    openapi-diff previous.yaml current.yaml \\
      --fail-on-incompatible

    # Run contract tests
    pact-broker can-i-deploy \\
      --pacticipant payment-service \\
      --version \${VERSION}

    # Monitor schema changes
    apishift monitor --compare-baseline`}</code></pre>
          </div>

          <p className="mb-8">
            This catches breaking changes before they reach production, not after.
          </p>

          <h2 className="text-3xl font-bold mb-6">8. Communication and Documentation</h2>

          <p className="mb-6">
            Technical solutions alone aren't enough. Clear communication is critical:
          </p>

          <div className="grid gap-6 mb-8">
            <div className="border-l-4 border-blue-500 pl-6 bg-blue-50 dark:bg-blue-950/20 p-4 rounded-r-lg">
              <h4 className="font-semibold mb-2">Changelog Discipline</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Maintain detailed changelogs with clear categorization:
              </p>
              <div className="bg-slate-900 text-slate-100 p-3 rounded text-sm">
                <code>## v2.1.0 - 2026-01-02</code><br/>
                <code>### BREAKING CHANGES</code><br/>
                <code>- Removed deprecated `user_email` field</code><br/>
                <code>### Added</code><br/>
                <code>- New `email_addresses` array field</code>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 bg-blue-50 dark:bg-blue-950/20 p-4 rounded-r-lg">
              <h4 className="font-semibold mb-2">Migration Guides</h4>
              <p className="text-sm text-muted-foreground">
                Provide step-by-step migration guides for breaking changes, including code examples and timelines.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 bg-blue-50 dark:bg-blue-950/20 p-4 rounded-r-lg">
              <h4 className="font-semibold mb-2">Deprecation Notices</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Announce deprecations well in advance:
              </p>
              <ul className="text-sm space-y-1">
                <li>• Minimum 90 days notice</li>
                <li>• Include sunset date</li>
                <li>• Provide migration path</li>
                <li>• Send warnings in API responses</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Real-World Example: Payment Service Migration</h2>

          <div className="bg-slate-50 dark:bg-slate-900 border rounded-lg p-6 mb-8">
            <p className="mb-4 font-semibold">Scenario: Payment service needs to change transaction status from string to object</p>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2">Week 1-2: Expand</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Add new `transaction_status_v2` object field</li>
                  <li>• Keep old `transaction_status` string field</li>
                  <li>• Update OpenAPI spec with deprecation notice</li>
                  <li>• Deploy to production</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Week 3-8: Migrate</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Notify consumer teams (Order, Billing, Analytics)</li>
                  <li>• Provide migration guide with code examples</li>
                  <li>• Teams update their services</li>
                  <li>• Monitor usage metrics - track old field usage</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Week 9-12: Contract</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Verify 100% of traffic uses new field</li>
                  <li>• Send final deprecation warning</li>
                  <li>• Remove old `transaction_status` field</li>
                  <li>• Rename `transaction_status_v2` to `transaction_status`</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Key Takeaways</h2>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-6 mb-8">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Contract testing is non-negotiable</strong> - It's the only way to ensure compatibility across independent teams</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Use versioning strategically</strong> - Not every change needs a new version, but breaking changes always do</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Expand-contract enables zero-downtime</strong> - Never force consumers to update immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Automate breaking change detection</strong> - Catch issues in CI/CD, not production</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span><strong>Communication is critical</strong> - Technical solutions must be paired with clear documentation</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6">Conclusion</h2>

          <p className="mb-6">
            Managing API changes in microservices requires discipline, automation, and clear communication. By implementing contract testing, using versioning strategically, following the expand-contract pattern, and automating breaking change detection, you can evolve your APIs safely without breaking your distributed system.
          </p>

          <p className="mb-8">
            Remember: in microservices, every API is a contract with multiple stakeholders. Treat changes with the care they deserve.
          </p>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 text-center my-12">
            <h3 className="text-2xl font-bold mb-4">Monitor Your Microservices APIs</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Detect breaking changes across all your services automatically. Get instant alerts when contracts change.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/login">Start Monitoring Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/features">See Features</Link>
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
            <Link href="/blog/api-versioning-deprecation-strategies" className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-lg mb-2">API Versioning and Deprecation Strategies</h4>
              <p className="text-sm text-muted-foreground">Learn how to version APIs and communicate deprecations effectively</p>
            </Link>
            <Link href="/blog/5-real-cases-api-changes-broke-production" className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h4 className="font-semibold text-lg mb-2">5 Cases Where API Changes Broke Production</h4>
              <p className="text-sm text-muted-foreground">Real-world disasters caused by poor API change management</p>
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
