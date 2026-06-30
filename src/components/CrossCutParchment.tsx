'use client'

import { useEffect, useRef, useState } from 'react'

import type { CrossCutQuestion } from '@/lib/crossCut'
import { EXPEDITION_SCROLL_MARGIN } from '@/lib/expeditionNav'

type CrossCutParchmentProps = {
  question: CrossCutQuestion
  sequence: number
  embedded?: boolean
}

export const CrossCutParchment = ({ question, sequence, embedded = false }: CrossCutParchmentProps) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = panelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2, rootMargin: '-10% 0px -35% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const panel = (
    <div
      className={`cross-cut-panel relative z-10 mx-auto max-w-4xl rounded-3xl border-2 border-trail-border bg-trail-parchment p-6 shadow-panel sm:p-12 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-70'
      } transition-all duration-700 motion-reduce:transition-none`}
      ref={panelRef}
    >
        <div className="mb-8 border-b border-trail-border/80 pb-6">
          <p className="font-pixel text-sm uppercase tracking-[0.22em] text-trail-accent">{question.eyebrow}</p>
          <p className="mt-3 font-pixel text-xs uppercase tracking-[0.18em] text-trail-ink/50">
            Field question {sequence} of 6
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-trail-ink sm:text-4xl">
            {question.question}
          </h2>
        </div>

        <div className="space-y-5">
          {question.body.map((paragraph) => (
            <p className="text-base leading-8 text-trail-ink/92 sm:text-lg sm:leading-9" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-trail-border bg-trail-panel/80 px-5 py-4">
          <p className="font-pixel text-xs uppercase tracking-[0.16em] text-trail-ink/55">Voices across sessions</p>
          <p className="mt-2 text-sm leading-7 text-trail-ink/80">{question.voices.join(' · ')}</p>
        </div>
      </div>
  )

  if (embedded) {
    return (
      <div className={`w-full ${EXPEDITION_SCROLL_MARGIN}`} id={`cross-cut-${question.id}`}>
        {panel}
      </div>
    )
  }

  return (
    <section
      className={`${EXPEDITION_SCROLL_MARGIN} px-4 py-10 sm:px-6 sm:py-14`}
      id={`cross-cut-${question.id}`}
    >
      {panel}
    </section>
  )
}