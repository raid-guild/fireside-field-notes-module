'use client'

import { useEffect, useRef, useState } from 'react'

import type { Encounter } from '@/lib/encounters'
import { EXPEDITION_SCROLL_MARGIN } from '@/lib/expeditionNav'
import { EncounterParchment } from '@/components/EncounterParchment'
import { NpcDialogue } from '@/components/NpcDialogue'

type ViewMode = 'dialogue' | 'parchment'

type EncounterSectionProps = {
  encounter: Encounter
  index: number
  onVisible: (index: number) => void
}

const viewModeKey = (slug: string) => `edge-report-view:${slug}`

export const EncounterSection = ({ encounter, index, onVisible }: EncounterSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('dialogue')

  useEffect(() => {
    const stored = window.localStorage.getItem(viewModeKey(encounter.slug))
    if (stored === 'dialogue' || stored === 'parchment') {
      setViewMode(stored)
    }
  }, [encounter.slug])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          onVisible(index)
        }
      },
      { threshold: 0.2, rootMargin: '-15% 0px -55% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [index, onVisible])

  const setMode = (mode: ViewMode) => {
    setViewMode(mode)
    window.localStorage.setItem(viewModeKey(encounter.slug), mode)
  }

  return (
    <section
      className={`${EXPEDITION_SCROLL_MARGIN} px-4 py-8 sm:px-6 sm:py-10`}
      id={encounter.slug}
      ref={sectionRef}
    >
      <div
        className={`encounter-panel mx-auto max-w-5xl rounded-3xl border border-trail-border bg-trail-panel p-6 shadow-panel sm:p-10 ${
          isVisible ? 'translate-y-0' : 'translate-y-10'
        } transition-transform duration-700 motion-reduce:transition-none`}
      >
        <div className="mb-6 flex flex-wrap items-center justify-end gap-2">
          <div className="inline-flex rounded-full border border-trail-border bg-trail-parchment p-1">
            <button
              className={`rounded-full px-4 py-1.5 font-pixel text-sm transition-colors ${
                viewMode === 'dialogue'
                  ? 'bg-trail-accent text-white'
                  : 'text-trail-ink/65 hover:text-trail-ink'
              }`}
              onClick={() => setMode('dialogue')}
              type="button"
            >
              Dialogue
            </button>
            <button
              className={`rounded-full px-4 py-1.5 font-pixel text-sm transition-colors ${
                viewMode === 'parchment'
                  ? 'bg-trail-accent text-white'
                  : 'text-trail-ink/65 hover:text-trail-ink'
              }`}
              onClick={() => setMode('parchment')}
              type="button"
            >
              Parchment
            </button>
          </div>
        </div>

        {viewMode === 'dialogue' ? (
          <NpcDialogue encounter={encounter} index={index} />
        ) : (
          <EncounterParchment encounter={encounter} index={index} />
        )}
      </div>
    </section>
  )
}