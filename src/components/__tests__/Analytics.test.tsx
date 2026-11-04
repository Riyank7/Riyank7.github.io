import { fireEvent, render, screen } from '@testing-library/react'
import Analytics from '../Analytics'
import { CONSENT_KEY } from '@/lib/analytics'

describe('analytics consent', () => {
  beforeEach(() => {
    localStorage.clear()
    window.dataLayer = []
    document.getElementById('portfolio-gtm')?.remove()
  })

  it('does not load Google Tag Manager before opt-in or after rejection', () => {
    render(<Analytics containerId="GTM-TEST123" />)
    expect(document.getElementById('portfolio-gtm')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Reject optional' }))
    expect(document.getElementById('portfolio-gtm')).toBeNull()
    expect(JSON.parse(localStorage.getItem(CONSENT_KEY)!)).toMatchObject({ analytics: false, demographics: false })
  })

  it('loads one container with advertising consent denied for analytics-only visitors', () => {
    render(<Analytics containerId="GTM-TEST123" />)
    fireEvent.click(screen.getByRole('button', { name: 'Analytics only' }))
    expect(document.getElementById('portfolio-gtm')).toHaveAttribute('src', 'https://www.googletagmanager.com/gtm.js?id=GTM-TEST123')
    const commands = window.dataLayer.filter(item => typeof (item as IArguments)[0] === 'string').map(item => Array.from(item as IArguments))
    expect(commands[0]).toEqual(['consent', 'default', expect.objectContaining({ analytics_storage: 'denied', ad_user_data: 'denied' })])
    expect(commands[1]).toEqual(['consent', 'update', expect.objectContaining({ analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })])
    fireEvent.click(screen.getByRole('button', { name: 'Privacy settings' }))
    fireEvent.click(screen.getByRole('button', { name: 'Analytics only' }))
    expect(document.querySelectorAll('#portfolio-gtm')).toHaveLength(1)
  })

  it('restores a rejected choice without loading GTM', () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: false, demographics: false, expires: Date.now() + 10000 }))
    render(<Analytics containerId="GTM-TEST123" />)
    expect(screen.queryByRole('button', { name: 'Reject optional' })).not.toBeInTheDocument()
    expect(document.getElementById('portfolio-gtm')).toBeNull()
    expect(screen.getByRole('button', { name: 'Privacy settings' })).toBeInTheDocument()
  })

  it('asks again when consent has expired', () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: true, demographics: true, expires: Date.now() - 1000 }))
    render(<Analytics containerId="GTM-TEST123" />)
    expect(screen.getByRole('button', { name: 'Reject optional' })).toBeInTheDocument()
    expect(document.getElementById('portfolio-gtm')).toBeNull()
  })

  it('enables demographic processing only after explicit opt-in', () => {
    render(<Analytics containerId="GTM-TEST123" />)
    fireEvent.click(screen.getByRole('button', { name: 'Allow analytics and demographics' }))
    expect(Array.from(window.dataLayer[1] as IArguments)).toEqual(['consent', 'update', {
      analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted',
    }])
  })

  it('stays disabled without a valid container ID', () => {
    const { container } = render(<Analytics />)
    expect(container).toBeEmptyDOMElement()
    expect(window.dataLayer).toHaveLength(0)
    expect(document.getElementById('portfolio-gtm')).toBeNull()
  })
})
