import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { TRPCProvider } from "@/lib/trpc/client"
import { Toaster } from "@/components/ui/sonner"
import { GoogleAnalytics } from "@/components/analytics"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.apishift.site'),
  title: {
    default: "APIShift - Real-time API Schema Monitoring & Change Detection",
    template: "%s | APIShift",
  },
  description: "Automatically detect API schema changes and breaking changes before they affect production. Monitor REST APIs, track field changes, and get instant alerts via Email, Slack, or Discord. Free plan available.",
  keywords: [
    "API monitoring",
    "API change detection",
    "API schema monitoring",
    "REST API monitoring",
    "API diff tool",
    "API version control",
    "breaking change detection",
    "API schema validator",
    "API testing",
    "API alerts",
    "webhook monitoring",
    "OpenAPI monitoring",
    "JSON API monitoring",
    "API regression testing",
    "API observability",
  ],
  authors: [{ name: "APIShift" }],
  creator: "APIShift",
  publisher: "APIShift",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.apishift.site",
    siteName: "APIShift",
    title: "APIShift - Real-time API Schema Monitoring & Change Detection",
    description: "Automatically detect API schema changes and breaking changes before they affect production. Monitor REST APIs, track field changes, and get instant alerts.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "APIShift - API Monitoring Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "APIShift - Real-time API Schema Monitoring",
    description: "Automatically detect API schema changes and breaking changes before they affect production. Free plan available.",
    images: ["/og-image.png"],
    creator: "@apishift",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'lny3JD9gXYxd_5jWgE_vqC7JVplLsCqhsfAcDrXg7ZA',
  },
  alternates: {
    canonical: 'https://www.apishift.site',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <TRPCProvider>
          {children}
          <Toaster />
        </TRPCProvider>
      </body>
    </html>
  )
}
