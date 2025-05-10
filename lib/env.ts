// Environment variable utility functions

// Get environment variable with fallback
export function getEnv(key: string, fallback = ""): string {
  if (typeof process !== "undefined" && process.env) {
    return process.env[key] || fallback
  }
  return fallback
}

// Get site URL (for meta tags, etc.)
export function getSiteUrl(): string {
  // First try NEXT_PUBLIC_SITE_URL
  const siteUrl = getEnv("NEXT_PUBLIC_SITE_URL", "")
  if (siteUrl) return siteUrl

  // Then try VERCEL_URL (automatically set in Vercel deployments)
  const vercelUrl = getEnv("VERCEL_URL", "")
  if (vercelUrl) return `https://${vercelUrl}`

  // Fallback to a default
  return "https://cagedbird.vercel.app"
}

// Check if we're in development mode
export function isDevelopment(): boolean {
  return getEnv("NODE_ENV") === "development"
}

// Check if we're in production mode
export function isProduction(): boolean {
  return getEnv("NODE_ENV") === "production"
}
