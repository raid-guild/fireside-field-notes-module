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
  const flairCount = isTrailhead ? 7 : crossCut ? 12 : 10
  const flairEvents = useMemo(
    () => buildJourneyFlair(leg, flairCount, { corridorOnly: Boolean(crossCut) }),
    [crossCut, flairCount, leg],
  )
  const usesScrollLayout = !crossCut

  const legPlaque = (
    <div className="journey-plaque px-5 py-3 text-center">
      <p className="font-pixel text-sm uppercase tracking-[0.2em] text-trail-ink/70">
        {isTrailhead ? 'Trail begins' : `Leg ${leg} of ${totalLegs}`}
      </p>
    </div>
  )

  const pathWalker = (
    <div className="opacity-80">
      <PixelSprite direction="right" label="" scale={0.55} slug="warrior" />
    </div>
  )

  const transitionPlaque = (
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
  )

  return (
    <div
      className={
        usesScrollLayout
          ? 'relative z-0 min-h-[240vh] w-full overflow-x-clip overflow-y-visible sm:min-h-[280vh]'
          : `relative w-full overflow-x-clip overflow-y-visible py-12 sm:min-h-[360vh] sm:py-0 ${
              crossCut ? 'z-20' : 'z-0'
            }`
      }
    >
      <div
        className={`journey-path-line absolute bottom-16 left-1/2 top-16 w-px -translate-x-1/2 ${
          crossCut ? 'hidden sm:block' : ''
        }`}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {flairEvents.map((event) => (
          <JourneyFlairEvent event={event} key={event.id} />
        ))}
      </div>

      {usesScrollLayout ? (
        <div className="relative z-0 flex min-h-[240vh] flex-col items-center justify-between px-4 py-[12vh] sm:min-h-[280vh] sm:py-[14vh]">
          <div className="w-full max-w-md">{transitionPlaque}</div>
          <div className="opacity-80">{pathWalker}</div>
          <div className="w-full max-w-md">{legPlaque}</div>
        </div>
      ) : (
        <div className="relative z-0 flex flex-col items-center gap-8 sm:absolute sm:inset-0 sm:block">
          <div className="relative mx-auto w-full max-w-md px-4 sm:absolute sm:left-1/2 sm:top-[12vh] sm:-translate-x-1/2 sm:px-0">
            {legPlaque}
          </div>

          <div className="relative mx-auto sm:absolute sm:left-1/2 sm:top-[48vh] sm:-translate-x-1/2">
            {pathWalker}
          </div>

          <div className="relative z-30 mx-auto w-full max-w-4xl px-4 sm:absolute sm:left-1/2 sm:top-[58vh] sm:-translate-x-1/2 sm:px-6">
            <CrossCutParchment embedded question={crossCut.question} sequence={crossCut.sequence} />
          </div>

          <div className="relative mx-auto w-full max-w-md px-4 sm:absolute sm:bottom-[18vh] sm:left-1/2 sm:-translate-x-1/2">
            {transitionPlaque}
          </div>
        </div>
      )}
    </div>
  )
}
