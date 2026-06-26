import { industrySourceLabels, type IndustrySignal } from '@/lib/industrySignals'

type IndustrySignalsGridProps = {
  signals: IndustrySignal[]
}

export const IndustrySignalsGrid = ({ signals }: IndustrySignalsGridProps) => {
  if (signals.length === 0) return null

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {signals.map((signal) => (
        <article
          className="rounded-2xl border border-trail-path/25 bg-trail-parchment/5 p-5"
          key={signal.id}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-trail-path/40 px-2 py-0.5 font-pixel text-[10px] uppercase tracking-wide text-trail-path">
              {industrySourceLabels[signal.sourceType]}
            </span>
            <span className="font-pixel text-[10px] text-trail-parchment/50">{signal.publishedAt}</span>
          </div>

          <h4 className="mt-3 font-display text-lg font-semibold text-trail-parchment">{signal.headline}</h4>
          <p className="mt-1 text-xs text-trail-parchment/60">
            {signal.speaker}
            {signal.organization ? ` · ${signal.organization}` : ''}
          </p>

          {signal.metrics.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {signal.metrics.slice(0, 3).map((metric) => (
                <li className="flex items-baseline justify-between gap-3 text-sm" key={metric.label}>
                  <span className="text-trail-parchment/75">{metric.label}</span>
                  <span className="shrink-0 font-pixel text-sm text-trail-accent">{metric.value}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {signal.quote ? (
            <p className="mt-4 border-l-2 border-trail-path/40 pl-3 text-sm italic leading-6 text-trail-parchment/80">
              &ldquo;{signal.quote}&rdquo;
            </p>
          ) : null}

          <p className="mt-3 text-sm leading-6 text-trail-parchment/70">{signal.opinion}</p>

          <a
            className="mt-4 inline-block font-pixel text-xs text-trail-accent transition-colors hover:text-trail-parchment"
            href={signal.primaryUrl}
            rel="noreferrer"
            target="_blank"
          >
            Read source ↗
          </a>
        </article>
      ))}
    </div>
  )
}