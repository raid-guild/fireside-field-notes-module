'use client'

import { useCallback, useEffect, useState, type RefObject } from 'react'

import { getHeaderHeight } from '@/lib/expeditionScroll'

export type JourneyFootprintStop = {
  id: string
  label: string
}

type JourneyFootprintsNavProps = {
  headerRef: RefObject<HTMLDivElement | null>
  stops: JourneyFootprintStop[]
}

const FootprintIcon = ({ direction }: { direction: 'back' | 'next' }) => (
  <span aria-hidden="true" className={`footprint-icon footprint-icon-${direction}`}>
    <span />
    <span />
    <span />
  </span>
)

export const JourneyFootprintsNav = ({ headerRef, stops }: JourneyFootprintsNavProps) => {
  const [activeStopIndex, setActiveStopIndex] = useState(-1)

  const updateActiveStop = useCallback(() => {
    const headerHeight = getHeaderHeight(headerRef.current)
    const marker = window.scrollY + headerHeight + (window.innerHeight - headerHeight) * 0.35
    let activeIndex = -1

    stops.forEach((stop, index) => {
      const node = document.getElementById(stop.id)
      if (!node) return

      const top = node.getBoundingClientRect().top + window.scrollY
      if (top <= marker) activeIndex = index
    })

    setActiveStopIndex(activeIndex)
  }, [headerRef, stops])

  useEffect(() => {
    updateActiveStop()
    window.addEventListener('scroll', updateActiveStop, { passive: true })
    window.addEventListener('resize', updateActiveStop)

    return () => {
      window.removeEventListener('scroll', updateActiveStop)
      window.removeEventListener('resize', updateActiveStop)
    }
  }, [updateActiveStop])

  const scrollToStop = (index: number) => {
    const stop = stops[index]
    if (!stop) return

    document.getElementById(stop.id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const previousStop = activeStopIndex > -1 ? stops[activeStopIndex - 1] : undefined
  const nextStop = stops[activeStopIndex + 1]

  return (
    <div
      aria-label="Journey step controls"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-trail-border/80 bg-trail-parchment/95 p-1.5 shadow-panel backdrop-blur-sm sm:bottom-6 sm:right-6"
      role="navigation"
    >
      <button
        aria-label={previousStop ? `Back to ${previousStop.label}` : 'No previous journey stop'}
        className="journey-footprint-button"
        disabled={!previousStop}
        onClick={() => scrollToStop(activeStopIndex - 1)}
        title={previousStop ? `Back to ${previousStop.label}` : undefined}
        type="button"
      >
        <FootprintIcon direction="back" />
      </button>
      <button
        aria-label={nextStop ? `Next: ${nextStop.label}` : 'No next journey stop'}
        className="journey-footprint-button"
        disabled={!nextStop}
        onClick={() => scrollToStop(activeStopIndex + 1)}
        title={nextStop ? `Next: ${nextStop.label}` : undefined}
        type="button"
      >
        <FootprintIcon direction="next" />
      </button>
    </div>
  )
}
