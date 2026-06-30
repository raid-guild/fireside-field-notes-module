'use client'

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { ExpeditionData } from '@/lib/encounters'
import { crossCutByInsertIndex } from '@/lib/crossCut'
import { AnalysisCamp } from '@/components/AnalysisCamp'
import { EncounterSection } from '@/components/EncounterSection'
import { ExpeditionNav } from '@/components/ExpeditionNav'
import { JourneySpacer } from '@/components/JourneySpacer'
import { JourneyFootprintsNav, type JourneyFootprintStop } from '@/components/JourneyFootprintsNav'
import { ParallaxDungeon } from '@/components/ParallaxDungeon'
import { RaiderPath } from '@/components/RaiderPath'
import { ExpeditionFooter } from '@/components/ExpeditionFooter'
import { Trailhead } from '@/components/Trailhead'
import {
  crossCutNavLabel,
  crossCutNavQuestions,
  EXPEDITION_HEADER_OFFSET_CLASS,
  EXPEDITION_HEADER_OFFSET_VAR,
} from '@/lib/expeditionNav'
import { getHeaderHeight, resolveActiveEncounterIndex } from '@/lib/expeditionScroll'

type ExpeditionClientProps = {
  data: ExpeditionData
}

export const ExpeditionClient = ({ data }: ExpeditionClientProps) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const walkRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [journeyScrollY, setJourneyScrollY] = useState(0)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeJourneyStopIndex, setActiveJourneyStopIndex] = useState(-1)

  const journeyStops = useMemo<JourneyFootprintStop[]>(() => {
    const stops: JourneyFootprintStop[] = []

    data.encounters.forEach((encounter, index) => {
      stops.push({
        id: encounter.slug,
        label: encounter.guestName,
      })

      crossCutNavQuestions
        .filter((question) => question.insertAfterEncounterIndex === index)
        .forEach((question) => {
          const sequence = crossCutNavQuestions.findIndex((item) => item.id === question.id) + 1

          stops.push({
            id: `cross-cut-${question.id}`,
            label: crossCutNavLabel(question, sequence),
          })
        })
    })

    stops.push({ id: 'analysis-camp', label: 'Analysis camp' })

    return stops
  }, [data.encounters])

  const activeJourneyStopId = journeyStops[activeJourneyStopIndex]?.id ?? null

  const updateProgress = useCallback(() => {
    const walk = walkRef.current
    const header = headerRef.current
    const viewport = window.innerHeight
    const pageScrollY = window.scrollY

    if (!walk) return

    const headerHeight = getHeaderHeight(header)
    const rect = walk.getBoundingClientRect()
    const walkTop = pageScrollY + rect.top
    const walkHeight = walk.offsetHeight
    const scrolled = pageScrollY - walkTop + headerHeight + (viewport - headerHeight) * 0.35
    const progress = scrolled / Math.max(walkHeight, 1)

    setScrollProgress(Math.min(1, Math.max(0, progress)))
    setJourneyScrollY(Math.max(0, pageScrollY - walkTop + viewport * 0.2))

    const encounterSections = Array.from(
      walk.querySelectorAll<HTMLElement>('section[id]'),
    )
    setActiveIndex(resolveActiveEncounterIndex(encounterSections, viewport, headerHeight))

    const journeyMarker = pageScrollY + headerHeight + (viewport - headerHeight) * 0.35
    let journeyStopIndex = -1

    journeyStops.forEach((stop, index) => {
      const node = document.getElementById(stop.id)
      if (!node) return

      const top = node.getBoundingClientRect().top + pageScrollY
      if (top <= journeyMarker) journeyStopIndex = index
    })

    setActiveJourneyStopIndex(journeyStopIndex)
  }, [journeyStops])

  useEffect(() => {
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [updateProgress])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const syncHeaderOffset = () => {
      document.documentElement.style.setProperty(EXPEDITION_HEADER_OFFSET_VAR, `${header.offsetHeight}px`)
      updateProgress()
    }

    syncHeaderOffset()
    const observer = new ResizeObserver(syncHeaderOffset)
    observer.observe(header)
    window.addEventListener('resize', syncHeaderOffset)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncHeaderOffset)
      document.documentElement.style.removeProperty(EXPEDITION_HEADER_OFFSET_VAR)
    }
  }, [updateProgress])

  let crossCutSequence = 0

  return (
    <main className="min-h-screen w-full max-w-[100vw]">
      <div className="fixed inset-x-0 top-0 z-40" ref={headerRef}>
        <RaiderPath
          activeIndex={activeIndex}
          progress={scrollProgress}
          totalStops={data.encounters.length}
        />
        <ExpeditionNav
          activeIndex={activeIndex}
          activeJourneyStopId={activeJourneyStopId}
          encounters={data.encounters}
        />
      </div>

      <JourneyFootprintsNav activeStopIndex={activeJourneyStopIndex} stops={journeyStops} />

      <div className={EXPEDITION_HEADER_OFFSET_CLASS}>
        <Trailhead meta={data.meta} />

        <div className="relative w-full overflow-x-hidden" ref={walkRef}>
          <ParallaxDungeon scrollY={journeyScrollY} />

          <div className="relative z-10">
            <JourneySpacer leg={0} totalLegs={data.encounters.length - 1} />
            {data.encounters.map((encounter, index) => {
              const crossCut = crossCutByInsertIndex[index]
              const crossCutOrder = crossCut ? ++crossCutSequence : null

              return (
                <Fragment key={encounter.slug}>
                  <EncounterSection encounter={encounter} index={index} />
                  {index < data.encounters.length - 1 ? (
                    <JourneySpacer
                      crossCut={
                        crossCut && crossCutOrder
                          ? { question: crossCut, sequence: crossCutOrder }
                          : undefined
                      }
                      leg={index + 1}
                      totalLegs={data.encounters.length - 1}
                    />
                  ) : null}
                </Fragment>
              )
            })}
          </div>
        </div>

        <AnalysisCamp encounters={data.encounters} throughLines={data.throughLines} />

        <ExpeditionFooter threadURL={data.meta.threadURL} />
      </div>
    </main>
  )
}
