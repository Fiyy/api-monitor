import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Github, Twitter, Linkedin } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about APIShift's mission to help developers catch breaking API changes before they impact users. Built by developers, for developers.",
  keywords: ["about APIShift", "API monitoring company", "developer tools", "API change detection team"],
  openGraph: {
    title: "About APIShift - Protecting APIs for Developers",
    description: "Built by developers who experienced the pain of unexpected API changes firsthand",
    url: "https://www.apishift.site/about",
  },
  alternates: {
    canonical: "https://www.apishift.site/about",
  },
}

export default function AboutPage() {
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
            Building Better Developer Tools
          </h1>
          <p className="text-xl text-muted-foreground">
            We experienced the pain of unexpected API changes firsthand. APIShift was born from that frustration.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="border bg-card p-8 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Every developer has been there: you wake up to alerts that your production app is broken. After hours of debugging,
                you discover a third-party API silently changed their response structure. No warning. No notification. Just broken code and angry users.
              </p>
              <p>
                This happened to us one too many times. We realized that while there are countless tools for monitoring uptime and performance,
                there was nothing specifically designed to detect API schema changes in real-time.
              </p>
              <p>
                So we built APIShift. A tool that does one thing exceptionally well: monitor your API endpoints and alert you the moment
                something changes. No more surprises. No more midnight debugging sessions. Just peace of mind.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border bg-card p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower developers with proactive API monitoring tools that catch breaking changes before they impact end users.
                We believe in building software that just works, letting you focus on what matters most.
              </p>
            </div>
            <div className="border bg-card p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">✓</span>
                  <span><strong>Developer-First:</strong> Built by developers, for developers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">✓</span>
                  <span><strong>Transparency:</strong> Simple pricing, no hidden fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">✓</span>
                  <span><strong>Reliability:</strong> Your monitoring should never go down</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary shrink-0 mt-0.5">✓</span>
                  <span><strong>Privacy:</strong> Your API data stays secure</span>
                </li>
              </ul>
            </div>
          </div>

          {/* What We Do */}
          <div className="border bg-card p-8 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">What We Do</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">Monitor</h4>
                <p className="text-muted-foreground text-sm">
                  Continuously check your API endpoints at intervals you choose, from hourly to real-time.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Detect</h4>
                <p className="text-muted-foreground text-sm">
                  Advanced algorithms identify schema changes including field additions, removals, and type modifications.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Alert</h4>
                <p className="text-muted-foreground text-sm">
                  Get instant notifications through email, Slack, Discord, or custom webhooks when changes occur.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="border bg-card p-8 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">Built With Modern Technology</h2>
            <p className="text-muted-foreground mb-6">
              APIShift is built using cutting-edge technologies to ensure reliability, performance, and scalability.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                <span className="font-semibold">Next.js 16</span>
                <span className="text-muted-foreground text-xs">Framework</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                <span className="font-semibold">TypeScript</span>
                <span className="text-muted-foreground text-xs">Language</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                <span className="font-semibold">PostgreSQL</span>
                <span className="text-muted-foreground text-xs">Database</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                <span className="font-semibold">Vercel Edge</span>
                <span className="text-muted-foreground text-xs">Infrastructure</span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border bg-card p-8 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions, feedback, or just want to chat? We'd love to hear from you.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">General Inquiries</h4>
                <a
                  href="mailto:contact@apishift.site"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  contact@apishift.site
                </a>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Sales & Enterprise</h4>
                <a
                  href="mailto:sales@apishift.site"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  sales@apishift.site
                </a>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Support</h4>
                <a
                  href="mailto:support@apishift.site"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  support@apishift.site
                </a>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center border bg-card p-12 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Join thousands of developers</h2>
            <p className="text-muted-foreground mb-8">
              Start monitoring your APIs today. Free plan available, no credit card required.
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
