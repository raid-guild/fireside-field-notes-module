import { CohortIndustryContrast } from '@/components/analysis/CohortIndustryContrast'
import { FieldVoicePosts } from '@/components/analysis/FieldVoicePosts'
import { WikiFurtherReading } from '@/components/analysis/WikiFurtherReading'
import type { ExternalContextData } from '@/lib/externalContext'

type ExternalContextSectionProps = {
  data: ExternalContextData
}

export const ExternalContextSection = ({ data }: ExternalContextSectionProps) => {
  return (
    <div className="mt-14 space-y-14">
      <section id="analysis-camp-contrast">
        <h3 className="font-display text-2xl font-semibold">Cohort vs industry</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-trail-parchment/75">
          Four paired claims from the fireside trail against cited surveys, RCTs, and executive reports.
          Industry numbers are never presented as cohort voice.
        </p>
        <div className="mt-8">
          <CohortIndustryContrast pairs={data.contrastPairs} />
        </div>
      </section>

      <section id="analysis-camp-field-voice">
        <h3 className="font-display text-2xl font-semibold">Field voice on X</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-trail-parchment/75">
          Curated posts from RaidGuild, cohort guests, and adjacent builders — link cards, not embedded
          widgets, so the camp stays fast and readable.
        </p>
        <div className="mt-8">
          <FieldVoicePosts posts={data.fieldVoicePosts} />
        </div>
      </section>

      <section id="analysis-camp-wiki">
        <h3 className="font-display text-2xl font-semibold">Portal wiki further reading</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-trail-parchment/75">
          Topic pages that extend each through-line — hand-curated companions until Prism ingest ships in
          slice 3.
        </p>
        <div className="mt-8">
          <WikiFurtherReading companions={data.wikiCompanions} />
        </div>
      </section>
    </div>
  )
}
