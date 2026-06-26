'use client'

import { Fragment, useCallback, useEffect, useRef, useState } from 'react'

import type { ExpeditionData } from '@/lib/encounters'
import { crossCutByInsertIndex } from '@/lib/crossCut'
import { AnalysisCamp } from '@/components/AnalysisCamp'
import { EncounterSection } from '@/components/EncounterSection'
import { ExpeditionNav } from '@/components/ExpeditionNav'
import { JourneySpacer } from '@/components/JourneySpacer'
import { ParallaxDungeon } from '@/components/ParallaxDungeon'
import { RaiderPath } from '@/components/RaiderPath'
import { ExpeditionFooter } from '@/components/ExpeditionFooter'
import { Trailhead } from '@/components/Trailhead'

type ExpeditionClientProps = {
  data: ExpeditionData
}

export const ExpeditionClient = ({ data }: ExpeditionClientProps) => {
  const walkRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [journeyScrollY, setJourneyScrollY] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const updateProgress = useCallback(() => {
    const walk = walkRef.current
    const viewport = window.innerHeight
    const pageScrollY = window.scrollY

    if (!walk) return

    const rect = walk.getBoundingClientRect()
    const walkTop = pageScrollY + rect.top
    const walkHeight = walk.offsetHeight
    const scrolled = pageScrollY - walkTop + viewport * 0.35
    const progress = scrolled / Math.max(walkHeight, 1)

    setScrollProgress(Math.min(1, Math.max(0, progress)))
    setJourneyScrollY(Math.max(0, pageScrollY - walkTop + viewport * 0.2))
  }, [])

  useEffect(() => {
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [updateProgress])

  const handleVisible = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  let crossCutSequence = 0

  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden">
      <RaiderPath
        activeIndex={activeIndex}
        progress={scrollProgress}
        totalStops={data.encounters.length}
      />

      <Trailhead meta={data.meta} />

      <ExpeditionNav activeIndex={activeIndex} encounters={data.encounters} />

      <div className="relative w-full overflow-x-hidden" ref={walkRef}>
        <ParallaxDungeon scrollY={journeyScrollY} />

        <div className="relative z-10">
          <JourneySpacer leg={0} totalLegs={data.encounters.length - 1} />
          {data.encounters.map((encounter, index) => {
            const crossCut = crossCutByInsertIndex[index]
            const crossCutOrder = crossCut ? ++crossCutSequence : null

            return (
              <Fragment key={encounter.slug}>
                <EncounterSection encounter={encounter} index={index} onVisible={handleVisible} />
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
    </main>
  )
}