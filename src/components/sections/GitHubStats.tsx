'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Icon from '../Icon'
import GradientMesh from '../GradientMesh'
import { useTheme } from '../ThemeProvider'

const githubAccounts = [
  { username: 'Riyank7', label: 'Personal account' },
  { username: 'rmukhop3', label: 'Original account' },
]

function ContributionCalendar({ username }: { username: string }) {
  const { theme } = useTheme()
  const [unavailable, setUnavailable] = useState(false)

  if (unavailable) {
    return (
      <p className="rounded-xl bg-[var(--bg-tertiary)] p-6 text-center text-sm text-[var(--text-secondary)]" role="status">
        The contribution calendar is unavailable right now.{' '}
        <a
          href={`https://github.com/${username}?tab=overview`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4"
        >
          View @{username} on GitHub
        </a>
        .
      </p>
    )
  }

  return (
    <div
      role="region"
      aria-label={`Contribution calendar for @${username}`}
      tabIndex={0}
      className="overflow-x-auto rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
    >
      <Image
        src={`https://ghchart.rshah.org/8b5cf6/${username}`}
        alt={`GitHub contribution calendar for @${username} over the past year`}
        width={663}
        height={104}
        unoptimized
        className="block w-full min-w-[600px]"
        style={theme === 'dark' ? { filter: 'invert(1) hue-rotate(180deg) saturate(1.5) brightness(0.9)' } : undefined}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setUnavailable(true)}
      />
    </div>
  )
}

export default function GitHubStats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const reducedMotion = useReducedMotion()
  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="github" aria-labelledby="github-heading" className="section relative overflow-hidden">
      <div className="absolute inset-0 section-bg-secondary" />
      <GradientMesh variant="skills" />
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.15 } },
        }}
        className="container-custom relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 id="github-heading" className="heading-lg mb-4">GitHub Activity</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Contributions across both of my GitHub accounts over the past year
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {githubAccounts.map(({ username, label }) => (
            <motion.article
              key={username}
              variants={itemVariants}
              transition={{ duration: reducedMotion ? 0 : 0.4 }}
              aria-labelledby={`github-${username}`}
              className="glass rounded-2xl p-5 sm:p-8"
            >
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-6 flex items-center justify-between gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon name="github" className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 id={`github-${username}`} className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] group-hover:text-accent transition-colors">
                      @{username}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">{label}</p>
                  </div>
                </div>
                <span className="flex items-center gap-2 text-sm text-accent shrink-0">
                  <span className="hidden sm:inline">View profile</span>
                  <Icon name="external" className="w-5 h-5" />
                </span>
              </a>

              <ContributionCalendar username={username} />
            </motion.article>
          ))}
          <p className="text-center text-xs leading-relaxed text-[var(--text-tertiary)]">
            Each square represents a day. Calendars reflect the activity visible on each GitHub profile.
            <span className="block sm:hidden mt-1">Scroll each calendar horizontally to see the full year.</span>
          </p>
        </div>
      </motion.div>
    </section>
  )
}
