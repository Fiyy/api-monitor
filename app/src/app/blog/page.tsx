import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog",
  description: "Learn about API monitoring best practices, case studies, and industry insights. Stay updated with the latest in API change detection and schema monitoring.",
  keywords: ["API monitoring blog", "API best practices", "API change detection", "schema monitoring", "API case studies", "microservices monitoring"],
  openGraph: {
    title: "APIShift Blog - API Monitoring Insights & Best Practices",
    description: "Expert insights on API monitoring, change detection, and microservices architecture",
    url: "https://www.apishift.site/blog",
  },
  alternates: {
    canonical: "https://www.apishift.site/blog",
  },
}

// 博客文章数据
const blogPosts = [
  {
    slug: "5-real-cases-api-changes-broke-production",
    title: "5 Real Cases Where API Changes Broke Production Systems",
    excerpt: "Learn from these real-world disasters where unexpected API changes caused millions in losses and how they could have been prevented.",
    category: "Case Studies",
    date: "2026-01-04",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "setup-api-monitoring-5-minutes",
    title: "How to Set Up API Monitoring in 5 Minutes",
    excerpt: "A step-by-step guide to protecting your production systems from breaking API changes with minimal setup time.",
    category: "Tutorial",
    date: "2026-01-03",
    readTime: "5 min read",
    featured: true,
  },
  {
    slug: "microservices-api-change-management",
    title: "API Change Management Best Practices for Microservices",
    excerpt: "Essential strategies for managing API changes across distributed microservices architectures without breaking dependencies.",
    category: "Best Practices",
    date: "2026-01-02",
    readTime: "10 min read",
    featured: false,
  },
  {
    slug: "third-party-api-monitoring-guide",
    title: "The Complete Guide to Monitoring Third-Party APIs",
    excerpt: "Why monitoring external APIs is critical and how to protect your application from unexpected changes by third-party providers.",
    category: "Guide",
    date: "2026-01-01",
    readTime: "12 min read",
    featured: false,
  },
  {
    slug: "api-versioning-deprecation-strategies",
    title: "API Versioning and Deprecation: A Practical Guide",
    excerpt: "Learn how to version your APIs properly and communicate deprecations effectively to minimize breaking changes for consumers.",
    category: "Best Practices",
    date: "2025-12-30",
    readTime: "9 min read",
    featured: false,
  },
]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

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

      {/* Hero Section */}
      <section className="container px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            API Monitoring Insights
          </h1>
          <p className="text-xl text-muted-foreground">
            Best practices, case studies, and expert insights on API monitoring and change detection
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.slug} className="hover:shadow-lg transition-shadow border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="default">{post.category}</Badge>
                      <Badge variant="outline">Featured</Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-base">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="text-primary hover:underline flex items-center gap-1">
                        Read more <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-8">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-3">{post.category}</Badge>
                  <CardTitle className="text-xl mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="text-primary hover:underline flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-24 max-w-3xl mx-auto">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Stay Updated</h3>
                <p className="text-muted-foreground">
                  Get the latest articles on API monitoring, best practices, and industry insights delivered to your inbox.
                </p>
                <div className="flex gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button>Subscribe</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </CardContent>
          </Card>
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
