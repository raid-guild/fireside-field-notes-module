import { ConcernLeverageChart } from '@/components/analysis/ConcernLeverageChart'
import { ExternalContextSection } from '@/components/analysis/ExternalContextSection'
import { GuestLensChart } from '@/components/analysis/GuestLensChart'
import { OutputFunnelChart } from '@/components/analysis/OutputFunnelChart'
import { PublicationLagChart } from '@/components/analysis/PublicationLagChart'
import { StatCard } from '@/components/analysis/StatCard'
import { ThemeFrequencyChart } from '@/components/analysis/ThemeFrequencyChart'
import { ToolMentionsChart } from '@/components/analysis/ToolMentionsChart'
import { buildAnalysisCampData } from '@/lib/analysisCamp'
import { buildExternalContextData } from '@/lib/externalContext'
import type { Encounter, ThroughLine } from '@/lib/encounters'
import { EXPEDITION_SCROLL_MARGIN } from '@/lib/expeditionNav'

type AnalysisCampProps = {
  encounters: Encounter[]
  throughLines: ThroughLine[]
}

export const AnalysisCamp = ({ encounters, throughLines }: AnalysisCampProps) => {
  const analysis = buildAnalysisCampData(encounters)
  const externalContext = buildExternalContextData(encounters)

  return (
    <section
      className={`border-b border-trail-border bg-trail-ink px-4 py-16 text-trail-parchment sm:px-6 sm:py-24 ${EXPEDITION_SCROLL_MARGIN}`}
      id="analysis-camp"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-pixel text-lg uppercase tracking-[0.2em] text-trail-accent">Analysis camp</p>
        <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">What the trail adds up to</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-trail-parchment/80">
          Corpus stats and theme counts from the 13 fireside sessions — computed from curated encounter data,
          not invented aggregates. Charts link back to guests on the walk.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {analysis.statCards.map((card) => (
            <StatCard card={card} key={card.id} />
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <ThemeFrequencyChart rows={analysis.themeFrequency} sessionTotal={encounters.length} />
          <GuestLensChart rows={analysis.guestLens} sessionTotal={encounters.length} />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <ToolMentionsChart rows={analysis.toolMentions} />
          <ConcernLeverageChart rows={analysis.toneSplit} />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <OutputFunnelChart guests={analysis.outputFunnelGuests} steps={analysis.outputFunnel} />
          <PublicationLagChart medianDays={analysis.medianPublicationLagDays} rows={analysis.publicationLag} />
        </div>

        <ExternalContextSection data={externalContext} />

        <div className="mt-14">
          <h3 className="font-display text-2xl font-semibold">Through-lines across the trail</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-trail-parchment/75">
            Early synthesis from session summaries and published field notes.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {throughLines.map((line, index) => (
              <article
                className="rounded-2xl border border-trail-parchment/15 bg-trail-parchment/5 p-6"
                key={line.id}
              >
                <p className="font-pixel text-sm text-trail-accent/90">Pattern {index + 1}</p>
                <h4 className="mt-2 font-display text-xl font-semibold">{line.title}</h4>
                <p className="mt-3 text-sm leading-7 text-trail-parchment/80">{line.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}