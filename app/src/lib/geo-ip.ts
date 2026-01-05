/**
 * GeoIP Service
 *
 * Free IP geolocation using ip-api.com
 * No API key required, 45 requests/minute limit
 */

export interface GeoLocation {
  country: string
  countryCode: string
  city: string
  region: string
  regionName: string
  lat: number
  lon: number
  timezone: string
  isp: string
}

// Cache to avoid repeated API calls for the same IP
const geoCache = new Map<string, GeoLocation>()
const CACHE_TTL = 1000 * 60 * 60 * 24 // 24 hours

/**
 * Get geolocation data from IP address
 */
export async function getGeoLocation(ip: string): Promise<GeoLocation | null> {
  // Skip for localhost/private IPs
  if (!ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return {
      country: 'Local',
      countryCode: 'XX',
      city: 'Localhost',
      region: '',
      regionName: '',
      lat: 0,
      lon: 0,
      timezone: '',
      isp: 'Local Network',
    }
  }

  // Check cache
  if (geoCache.has(ip)) {
    return geoCache.get(ip)!
  }

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone,isp`, {
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })

    if (!response.ok) {
      console.error(`GeoIP API error: ${response.statusText}`)
      return null
    }

    const data = await response.json()

    if (data.status === 'fail') {
      console.error(`GeoIP lookup failed: ${data.message}`)
      return null
    }

    const geoData: GeoLocation = {
      country: data.country || 'Unknown',
      countryCode: data.countryCode || 'XX',
      city: data.city || 'Unknown',
      region: data.region || '',
      regionName: data.regionName || '',
      lat: data.lat || 0,
      lon: data.lon || 0,
      timezone: data.timezone || '',
      isp: data.isp || 'Unknown',
    }

    // Cache the result
    geoCache.set(ip, geoData)

    // Auto-clear cache after TTL
    setTimeout(() => {
      geoCache.delete(ip)
    }, CACHE_TTL)

    return geoData
  } catch (error) {
    console.error(`GeoIP lookup error for ${ip}:`, error)
    return null
  }
}

/**
 * Extract IP address from Next.js request headers
 */
export function getClientIp(headers: Headers): string {
  // Try various headers in order of preference
  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim()
  }

  const realIp = headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  const cfConnectingIp = headers.get('cf-connecting-ip') // Cloudflare
  if (cfConnectingIp) {
    return cfConnectingIp
  }

  // Fallback to localhost
  return '127.0.0.1'
}
