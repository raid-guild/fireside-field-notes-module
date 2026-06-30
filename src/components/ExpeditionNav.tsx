import type { Encounter } from '@/lib/encounters'
import { crossCutNavLabel, crossCutNavQuestions } from '@/lib/expeditionNav'

type ExpeditionNavProps = {
  encounters: Encounter[]
  activeIndex: number | null
  activeJourneyStopId: string | null
}

export const ExpeditionNav = ({
  encounters,
  activeIndex,
  activeJourneyStopId,
}: ExpeditionNavProps) => {
  const activeEncounter = encounters.find((encounter) => encounter.slug === activeJourneyStopId)
  const activeHeroSlug = activeIndex === null ? activeEncounter?.slug : encounters[activeIndex]?.slug

  return (
    <nav className="border-b border-trail-border/60 bg-trail-parchment/95 backdrop-blur-sm">
      <div className="border-b border-trail-border/40">
        <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-2.5 sm:px-6">
          <span className="shrink-0 self-center font-pixel text-xs uppercase tracking-[0.18em] text-trail-ink/45">
            Heroes
          </span>
          {encounters.map((encounter, index) => (
            <a
              className={`shrink-0 rounded-full border px-3 py-1 font-pixel text-sm transition-colors ${
                activeHeroSlug === encounter.slug
                  ? 'border-trail-accent bg-trail-accent/10 text-trail-accent'
                  : 'border-trail-border text-trail-ink/65 hover:border-trail-ink/30'
              }`}
              href={`#${encounter.slug}`}
              key={encounter.slug}
            >
              {encounter.guestName.split(' ')[0]}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6">
        <span className="shrink-0 font-pixel text-xs uppercase tracking-[0.18em] text-trail-ink/45">
          Synthesis
        </span>
        {crossCutNavQuestions.map((question, index) => (
          <a
            className={`shrink-0 rounded-full border px-3 py-1 font-pixel text-sm transition-colors ${
              activeJourneyStopId === `cross-cut-${question.id}`
                ? 'border-trail-accent bg-trail-accent/10 text-trail-accent'
                : 'border-trail-border text-trail-ink/70 hover:border-trail-accent/50 hover:text-trail-accent'
            }`}
            href={`#cross-cut-${question.id}`}
            key={question.id}
            title={question.question}
          >
            {crossCutNavLabel(question, index + 1)}
          </a>
        ))}
        <span className="shrink-0 text-trail-border/80">|</span>
        <a
          className={`shrink-0 rounded-full border px-3 py-1 font-pixel text-sm transition-colors ${
            activeJourneyStopId === 'analysis-camp'
              ? 'border-trail-accent bg-trail-accent/15 text-trail-accent'
              : 'border-trail-accent/40 bg-trail-accent/10 text-trail-accent hover:border-trail-accent hover:bg-trail-accent/15'
          }`}
          href="#analysis-camp"
        >
          Analysis camp
        </a>
      </div>
    </nav>
  )
}
