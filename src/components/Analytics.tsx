'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  AnalyticsConsent, applyConsent, clearAnalyticsCookies,
  initializeConsent, readConsent, saveConsent,
} from '@/lib/analytics'

export default function Analytics({ containerId }: { containerId?: string }) {
  const [open, setOpen] = useState(false)
  const [hasChoice, setHasChoice] = useState(false)
  const consent = useRef<AnalyticsConsent | null>(null)
  const initialized = useRef(false)
  const validId = !!containerId && /^GTM-[A-Z0-9]+$/.test(containerId)

  useEffect(() => {
    if (!validId || initialized.current) return
    initialized.current = true
    initializeConsent()
    consent.current = readConsent()
    if (consent.current) {
      applyConsent(consent.current, containerId!)
      setHasChoice(true)
    } else {
      clearAnalyticsCookies()
      setOpen(true)
    }
  }, [containerId, validId])

  function choose(next: AnalyticsConsent) {
    const previous = consent.current
    saveConsent(next)
    applyConsent(next, containerId!)
    consent.current = next
    setHasChoice(true)
    setOpen(false)
    if (!next.analytics || (previous?.demographics && !next.demographics)) {
      clearAnalyticsCookies()
      // Unload already-running tags after withdrawal; denied visitors never load GTM.
      if (document.getElementById('portfolio-gtm')) window.location.reload()
    }
  }

  if (!validId) return null

  return (
    <>
      {open && (
        <section
          aria-labelledby="analytics-consent-title"
          className="fixed bottom-4 left-4 right-4 z-[10000] mx-auto max-w-3xl rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 shadow-2xl no-print"
        >
          <h2 id="analytics-consent-title" className="text-lg font-semibold mb-2">Your privacy choices</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            With your permission, Google Analytics helps me understand visits to this portfolio.
            Analytics only measures visits, approximate location and device information.
            Allowing demographics also enables Google Signals and advertising-related cookies
            to provide aggregated age, gender and interest reports for eligible Google users.
            You can change your choice at any time.{' '}
            <Link href="/privacy/" className="underline">Privacy notice</Link>
          </p>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="btn-secondary !px-4 !py-2 text-sm" onClick={() => choose({ analytics: false, demographics: false })}>Reject optional</button>
            <button type="button" className="btn-secondary !px-4 !py-2 text-sm" onClick={() => choose({ analytics: true, demographics: false })}>Analytics only</button>
            <button type="button" className="btn-secondary !px-4 !py-2 text-sm" onClick={() => choose({ analytics: true, demographics: true })}>Allow analytics and demographics</button>
            {hasChoice && <button type="button" className="text-sm underline px-2" onClick={() => setOpen(false)}>Close</button>}
          </div>
        </section>
      )}
      {!open && (
        <button type="button" onClick={() => setOpen(true)} className="fixed bottom-4 left-4 z-[10000] rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-2 text-xs shadow-lg no-print">
          Privacy settings
        </button>
      )}
    </>
  )
}
