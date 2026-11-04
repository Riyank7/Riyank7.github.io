export type AnalyticsConsent = {
  analytics: boolean
  demographics: boolean
}

export const CONSENT_KEY = 'portfolio-consent-v1'
const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

// Google consumes an arguments object for gtag commands, not a plain array.
function gtag(..._args: unknown[]) {
  window.dataLayer.push(arguments)
}

export function readConsent(): AnalyticsConsent | null {
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null')
    if (
      saved && typeof saved.analytics === 'boolean' &&
      typeof saved.demographics === 'boolean' &&
      typeof saved.expires === 'number' && saved.expires > Date.now()
    ) {
      return { analytics: saved.analytics, demographics: saved.analytics && saved.demographics }
    }
  } catch {
    // Consent still works for this visit when storage is unavailable.
  }
  return null
}

export function saveConsent(consent: AnalyticsConsent) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      ...consent, expires: Date.now() + CONSENT_LIFETIME,
    }))
  } catch {
    // Do not make storage access a prerequisite for making a choice.
  }
}

export function initializeConsent() {
  window.dataLayer = window.dataLayer || []
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

export function applyConsent(consent: AnalyticsConsent, containerId: string) {
  const advertising = consent.analytics && consent.demographics ? 'granted' : 'denied'
  gtag('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: advertising,
    ad_user_data: advertising,
    ad_personalization: advertising,
  })

  // Basic consent mode: no Google scripts or cookieless pings before opt-in.
  if (!consent.analytics || document.getElementById('portfolio-gtm')) return
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const script = document.createElement('script')
  script.id = 'portfolio-gtm'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`
  document.head.appendChild(script)
}

export function clearAnalyticsCookies() {
  // GA cookies may be host-only or set on a parent domain.
  const parts = location.hostname.split('.')
  const domains = ['', ...parts.map((_, index) => `; domain=${parts.slice(index).join('.')}`)]
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim()
    if (!/^(_ga(?:_|$)|_gid$|_gat(?:_|$)|_gcl_)/.test(name)) continue
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`
    }
  }
}
