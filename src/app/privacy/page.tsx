import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy notice | Riyank Mukhopadhyay',
  alternates: { canonical: 'https://riyank7.github.io/privacy/' },
}

export default function PrivacyPage() {
  return (
    <main className="container-custom max-w-3xl py-20 space-y-6">
      <Link href="/" className="underline">Back to portfolio</Link>
      <h1 className="heading-lg">Privacy notice</h1>
      <p>Updated November 4, 2026</p>
      <p>This portfolio is operated by Riyank Mukhopadhyay and hosted on GitHub Pages. GitHub processes technical request information to serve and protect the website. External links and embedded resources have their own privacy practices.</p>
      <h2 className="heading-sm">Optional analytics</h2>
      <p>If you choose to allow analytics, this site loads Google Tag Manager and Google Analytics 4 to measure page visits, engagement, referring sites, browser and device information, language and approximate location. Google processes network information, including IP addresses, to provide the service. This site does not intentionally send names, email addresses or contact-message content to Analytics.</p>
      <h2 className="heading-sm">Optional demographic reporting</h2>
      <p>If you also allow demographics, Google Signals may enrich reports with aggregated age, gender and interests for eligible users who are signed into Google and have enabled Ads Personalization. This allows advertising-related storage and data processing by Google. Reports do not identify individual visitors, and Google may withhold small groups. No demographic reporting is promised for every visitor.</p>
      <h2 className="heading-sm">Your choices and storage</h2>
      <p>Google measurement tags load only after you opt in. Rejecting optional analytics keeps those tags blocked. Your preference is saved in this browser for up to 180 days. Analytics may set cookies such as <code>_ga</code> to distinguish browsers and sessions. Use Privacy settings at the bottom left to change your choice. Withdrawing consent stops collection on this site and removes accessible first-party Google Analytics cookies; it does not erase information already processed by Google or cookies on Google domains. Clearing browser storage resets your choice.</p>
      <p>Learn more in <a href="https://policies.google.com/privacy" className="underline">Google’s privacy policy</a>, <a href="https://policies.google.com/technologies/partner-sites" className="underline">how Google uses information from partner sites</a>, and <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" className="underline">GitHub’s privacy statement</a>.</p>
      <p>Questions: <a href="mailto:riyank.deep@gmail.com" className="underline">riyank.deep@gmail.com</a></p>
    </main>
  )
}
