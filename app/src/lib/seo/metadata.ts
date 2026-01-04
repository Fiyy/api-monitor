import { Metadata } from 'next'

const SITE_URL = 'https://www.apishift.site'
const SITE_NAME = 'APIShift'
const SITE_TITLE = 'APIShift - Real-time API Schema Monitoring & Change Detection'
const SITE_DESCRIPTION =
  'Automatically detect API schema changes and breaking changes before they affect production. Monitor REST APIs, track field changes, and get instant alerts via Email, Slack, or Discord.'

export interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
  keywords?: string[]
}

/**
 * Generate consistent metadata for pages
 */
export function generateMetadata({
  title,
  description = SITE_DESCRIPTION,
  image = '/og-image.png',
  url = '',
  noIndex = false,
  keywords = [],
}: SEOProps = {}): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE
  const pageUrl = `${SITE_URL}${url}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return {
    title: title || SITE_TITLE,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: pageUrl,
      siteName: SITE_NAME,
      title: pageTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [imageUrl],
      creator: '@apishift',
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Common SEO keywords for the application
 */
export const commonKeywords = [
  'API monitoring',
  'API change detection',
  'API schema monitoring',
  'REST API monitoring',
  'API diff tool',
  'API version control',
  'breaking change detection',
  'API schema validator',
  'API testing',
  'API alerts',
  'webhook monitoring',
  'OpenAPI monitoring',
  'JSON API monitoring',
  'API regression testing',
  'API observability',
]

/**
 * Get structured breadcrumb data for a page
 */
export function getBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

/**
 * Generate article structured data
 */
export function getArticleStructuredData({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName = SITE_NAME,
}: {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  authorName?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon-512.png`,
      },
    },
  }
}
