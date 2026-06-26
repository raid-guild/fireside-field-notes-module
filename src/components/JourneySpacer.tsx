'use client'

import { useMemo } from 'react'

import type { CrossCutQuestion } from '@/lib/crossCut'
import { CrossCutParchment } from '@/components/CrossCutParchment'
import { buildJourneyFlair } from '@/lib/journeyFlair'
import { JourneyFlairEvent } from '@/components/JourneyFlairEvent'
import { PixelSprite } from '@/components/PixelSprite'

const FLAVOR_LINES = [
  'Torches flicker. Footsteps echo.',
  'The corridor bends. Voices carry from far ahead.',
  'Stone gives way to silence between camps.',
  'Somewhere ahead, another builder waits at the fire.',
  'You pass carved marks left by earlier raiders.',
]

type JourneySpacerProps = {
  leg: number
  totalLegs: number
  crossCut?: {
    question: CrossCutQuestion
    sequence: number
  }
}

export const JourneySpacer = ({ leg, totalLegs, crossCut }: JourneySpacerProps) => {
  const isTrailhead = leg === 0
  const flavor = isTrailhead
    ? 'Thirteen camps line the corridor. Each holds a fireside voice from the edge.'
    : FLAVOR_LINES[(leg - 1) % FLAVOR_LINES.length]
  const flairEvents = useMemo(() => buildJourneyFlair(leg, isTrailhead ? 3 : 5), [isTrailhead, leg])

  return (
    <div className="relative min-h-[240vh] sm:min-h-[280vh]">
      <div className="journey-path-line absolute bottom-16 left-1/2 top-16 w-px -translate-x-1/2" />

      {flairEvents.map((event) => (
        <JourneyFlairEvent event={event} key={event.id} />
      ))}

      <div className="absolute left-1/2 top-[12vh] z-10 -translate-x-1/2">
        <div className="journey-plaque px-5 py-3 text-center">
          <p className="font-pixel text-sm uppercase tracking-[0.2em] text-trail-ink/70">
            {isTrailhead ? 'Trail begins' : `Leg ${leg} of ${totalLegs}`}
          </p>
        </div>
      </div>

      <div className="absolute left-1/2 top-[48vh] z-10 -translate-x-1/2 opacity-80">
        <PixelSprite direction="right" label="" scale={0.55} slug="warrior" />
      </div>

      {crossCut ? (
        <div className="absolute left-1/2 top-[92vh] z-10 w-full max-w-4xl -translate-x-1/2">
          <CrossCutParchment embedded question={crossCut.question} sequence={crossCut.sequence} />
        </div>
      ) : null}

      <div className="absolute bottom-[18vh] left-1/2 z-10 w-full max-w-md -translate-x-1/2 px-4">
        <div className="journey-plaque flex flex-col items-center gap-4 px-6 py-8 text-center">
          <div className="flex items-center gap-3">
            <PixelSprite direction="right" label="" scale={0.7} slug="warrior" />
            <span className="font-pixel text-2xl text-trail-accent/80">···</span>
            <PixelSprite direction="left" label="" scale={0.7} slug="ranger" />
          </div>
          <p className="font-display text-lg leading-8 text-trail-ink">{flavor}</p>
          <p className="font-pixel text-sm uppercase tracking-wide text-trail-ink/55">
            {isTrailhead
              ? 'Scroll to reach the first camp.'
              : crossCut
                ? 'Read the field notes — another camp lies ahead.'
                : 'Keep walking — the next voice is close.'}
          </p>
        </div>
      </div>
    </div>
  )
}