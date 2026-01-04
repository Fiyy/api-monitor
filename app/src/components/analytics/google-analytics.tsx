'use client'

import Script from 'next/script'

/**
 * Google Analytics component for tracking page views and events
 *
 * Setup Instructions:
 * 1. Create a Google Analytics 4 property at https://analytics.google.com
 * 2. Get your Measurement ID (format: G-XXXXXXXXXX)
 * 3. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to your .env.local file
 * 4. Deploy to production
 *
 * Example .env.local:
 * NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  // Only load Google Analytics in production and if measurement ID is set
  if (!measurementId || process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  )
}

/**
 * Track custom events
 * Usage: trackEvent('button_click', { button_name: 'signup' })
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', eventName, eventParams)
  }
}

/**
 * Track page views (useful for SPA navigation)
 * Usage: trackPageView('/dashboard')
 */
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}
