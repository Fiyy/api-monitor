import React from 'react'

interface OrganizationSchema {
  '@context': string
  '@type': string
  name: string
  url: string
  logo: string
  description: string
  sameAs: string[]
}

interface SoftwareApplicationSchema {
  '@context': string
  '@type': string
  name: string
  applicationCategory: string
  operatingSystem: string
  offers: {
    '@type': string
    price: string
    priceCurrency: string
    priceValidUntil?: string
  }
  aggregateRating?: {
    '@type': string
    ratingValue: string
    reviewCount: string
  }
  description: string
  url: string
  screenshot?: string
  softwareVersion?: string
  releaseNotes?: string
}

interface WebSiteSchema {
  '@context': string
  '@type': string
  name: string
  url: string
  potentialAction: {
    '@type': string
    target: {
      '@type': string
      urlTemplate: string
    }
    'query-input': string
  }
}

interface FAQSchema {
  '@context': string
  '@type': string
  mainEntity: Array<{
    '@type': string
    name: string
    acceptedAnswer: {
      '@type': string
      text: string
    }
  }>
}

export function OrganizationStructuredData() {
  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'APIShift',
    url: 'https://www.apishift.site',
    logo: 'https://www.apishift.site/icon-512.png',
    description: 'Real-time API schema monitoring and change detection platform',
    sameAs: [
      // Add social media profiles when available
      // 'https://twitter.com/apishift',
      // 'https://github.com/apishift',
      // 'https://linkedin.com/company/apishift',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function SoftwareApplicationStructuredData() {
  const schema: SoftwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'APIShift',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Automatically detect API schema changes and breaking changes before they affect production. Monitor REST APIs, track field changes, and get instant alerts.',
    url: 'https://www.apishift.site',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteStructuredData() {
  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'APIShift',
    url: 'https://www.apishift.site',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.apishift.site/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQStructuredData() {
  const schema: FAQSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is API schema monitoring?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'API schema monitoring is the process of automatically tracking changes in your API structure, including field additions, removals, type changes, and other modifications that could impact your application.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does APIShift detect API changes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'APIShift makes scheduled requests to your APIs, extracts the JSON schema, and compares it with previous versions to identify any structural changes. It then categorizes these changes by severity and sends alerts through your preferred channels.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of changes does APIShift detect?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'APIShift detects field additions, field removals, data type changes, required field changes, nullable field changes, and nested object modifications. Each change is assigned a severity level (LOW, MEDIUM, HIGH, CRITICAL) based on its potential impact.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often are APIs checked?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Check frequency depends on your plan: Free plan offers hourly checks, Pro plan provides checks every 5 minutes, and Team plan includes real-time monitoring.',
        },
      },
      {
        '@type': 'Question',
        name: 'What notification channels are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'APIShift supports multiple notification channels including Email (all plans), Slack webhooks (Pro and Team), Discord webhooks (Pro and Team), and custom webhooks (Team plan only).',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free plan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, APIShift offers a free plan that includes monitoring up to 5 APIs, hourly checks, basic schema detection, 7 days data retention, and email notifications.',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Combined structured data component for the homepage
export function HomePageStructuredData() {
  return (
    <>
      <OrganizationStructuredData />
      <SoftwareApplicationStructuredData />
      <WebSiteStructuredData />
      <FAQStructuredData />
    </>
  )
}
