import { jumpToGuest } from '@/components/analysis/jumpToGuest'
import { industrySourceLabels } from '@/lib/industrySignals'
import type { EnrichedContrastPair } from '@/lib/externalContext'

type CohortIndustryContrastProps = {
  pairs: EnrichedContrastPair[]
}

const maxBarPercent = (metrics: EnrichedContrastPair['barMetrics']) =>
  Math.max(...metrics.map((metric) => metric.percent), 1)

export const CohortIndustryContrast = ({ pairs }: CohortIndustryContrastProps) => {
  if (pairs.length === 0) return null

  return (
    <div className="space-y-5">
      {pairs.map((pair) => {
        const barMax = maxBarPercent(pair.barMetrics)

        return (
          <article
            className="rounded-2xl border border-trail-parchment/15 bg-trail-parchment/5 p-6"
            key={pair.industry.id}
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-trail-moss/30 bg-trail-moss/10 p-5">
                <p className="font-pixel text-xs uppercase tracking-[0.16em] text-trail-moss">Cohort voice</p>
                <p className="mt-3 text-sm leading-7 text-trail-parchment/90">&ldquo;{pair.cohortClaim}&rdquo;</p>
                {pair.cohortEncounterSlug ? (
                  <button
                    className="mt-4 font-pixel text-xs text-trail-moss transition-colors hover:text-trail-parchment"
                    onClick={() => jumpToGuest(pair.cohortEncounterSlug!)}
                    type="button"
                  >
                    → {pair.cohortVoice} on the trail
                  </button>
                ) : (
                  <p className="mt-4 font-pixel text-xs text-trail-parchment/60">{pair.cohortVoice}</p>
                )}
              </div>

              <div className="rounded-xl border border-trail-path/30 bg-trail-path/10 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-pixel text-xs uppercase tracking-[0.16em] text-trail-path">Industry signal</p>
                  <span className="rounded-full border border-trail-path/40 px-2 py-0.5 font-pixel text-[10px] uppercase tracking-wide text-trail-path/90">
                    {industrySourceLabels[pair.industry.sourceType]}
                  </span>
                </div>
                <p className="mt-3 font-display text-base font-semibold text-trail-parchment">
                  {pair.industry.headline}
                </p>
                <p className="mt-2 text-xs text-trail-parchment/60">
                  {pair.industry.speaker} · {pair.industry.publishedAt}
                </p>
              </div>
            </div>

            {pair.barMetrics.length > 0 ? (
              <ul className="mt-6 space-y-3">
                {pair.barMetrics.map((metric) => (
                  <li key={metric.label}>
                    <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                      <span className="text-trail-parchment/80">{metric.label}</span>
                      <span className="font-pixel text-xs text-trail-accent">{metric.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-md bg-trail-parchment/10">
                      <span
                        className="block h-full rounded-md bg-trail-path/80"
                        style={{ width: `${Math.round((metric.percent / barMax) * 100)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-5 text-sm leading-7 text-trail-parchment/75">{pair.contrastNote}</p>

            <a
              className="mt-4 inline-block font-pixel text-xs text-trail-accent transition-colors hover:text-trail-parchment"
              href={pair.industry.primaryUrl}
              rel="noreferrer"
              target="_blank"
            >
              Source: {pair.industry.organization} ↗
            </a>
          </article>
        )
      })}
    </div>
  )
}