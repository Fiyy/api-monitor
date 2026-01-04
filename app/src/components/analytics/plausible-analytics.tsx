'use client'

import Script from 'next/script'

/**
 * Plausible Analytics component - Privacy-friendly alternative to Google Analytics
 *
 * Setup Instructions:
 * 1. Create account at https://plausible.io
 * 2. Add your domain (apishift.site)
 * 3. Add NEXT_PUBLIC_PLAUSIBLE_DOMAIN to your .env.local file
 * 4. Deploy to production
 *
 * Benefits over Google Analytics:
 * - No cookies, GDPR/CCPA compliant by default
 * - Lightweight script (~1KB)
 * - Simple, easy-to-understand dashboard
 * - Owned by you, not sold to third parties
 *
 * Example .env.local:
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN=apishift.site
 */
export function PlausibleAnalytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

  // Only load Plausible in production and if domain is set
  if (!domain || process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  )
}

/**
 * Track custom events with Plausible
 * Usage: trackPlausibleEvent('Signup', { plan: 'pro' })
 */
export function trackPlausibleEvent(eventName: string, props?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).plausible) {
    ;(window as any).plausible(eventName, { props })
  }
}
