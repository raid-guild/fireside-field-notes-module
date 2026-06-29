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
          ? 'relative min-h-[240vh] w-full overflow-x-clip overflow-y-visible sm:min-h-[280vh]'
          : 'relative w-full overflow-x-clip overflow-y-visible py-12 sm:min-h-[360vh] sm:py-0'
      }
    >
      <div
        className={`journey-path-line absolute bottom-16 left-1/2 top-16 w-px -translate-x-1/2 ${
          crossCut ? 'hidden sm:block' : ''
        }`}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 z-[5]">
        {flairEvents.map((event) => (
          <JourneyFlairEvent event={event} key={event.id} />
        ))}
      </div>

      <div className="relative z-20">
        <div
          className={
            usesScrollLayout
              ? 'absolute left-1/2 top-[12vh] -translate-x-1/2'
              : 'relative mx-auto w-full max-w-md px-4 sm:absolute sm:left-1/2 sm:top-[12vh] sm:-translate-x-1/2 sm:px-0'
          }
        >
          {legPlaque}
        </div>

        <div
          className={
            usesScrollLayout
              ? 'absolute left-1/2 top-[48vh] -translate-x-1/2 opacity-80'
              : 'relative mx-auto mt-8 sm:absolute sm:left-1/2 sm:top-[48vh] sm:mt-0 sm:-translate-x-1/2'
          }
        >
          {pathWalker}
        </div>

        {crossCut ? (
          <div className="relative isolate z-30 mx-auto mt-10 w-full max-w-4xl px-4 sm:absolute sm:left-1/2 sm:top-[58vh] sm:mt-0 sm:-translate-x-1/2 sm:px-6">
            <CrossCutParchment embedded question={crossCut.question} sequence={crossCut.sequence} />
          </div>
        ) : null}

        <div
          className={
            usesScrollLayout
              ? 'absolute bottom-[18vh] left-1/2 w-full max-w-md -translate-x-1/2 px-4'
              : 'relative mx-auto mt-10 w-full max-w-md px-4 sm:absolute sm:bottom-[18vh] sm:left-1/2 sm:mt-0 sm:-translate-x-1/2'
          }
        >
          {transitionPlaque}
        </div>
      </div>
    </div>
  )
}