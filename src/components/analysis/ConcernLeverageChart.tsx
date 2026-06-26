import type { ToneSplit } from '@/lib/analysisCamp'

type ConcernLeverageChartProps = {
  rows: ToneSplit[]
}

const toneColors: Record<ToneSplit['tone'], string> = {
  leverage: 'bg-trail-moss/85',
  friction: 'bg-trail-accent/85',
  open: 'bg-trail-path/80',
}

export const ConcernLeverageChart = ({ rows }: ConcernLeverageChartProps) => {
  const total = rows.reduce((sum, row) => sum + row.count, 0)

  return (
    <div className="rounded-2xl border border-trail-parchment/15 bg-trail-parchment/5 p-6">
      <div className="mb-6">
        <h3 className="font-display text-xl font-semibold text-trail-parchment">Concern vs leverage</h3>
        <p className="mt-2 text-sm leading-6 text-trail-parchment/70">
          Editorial tone pass on {total} curated highlights — friction, useful patterns, and open questions.
        </p>
      </div>

      <div className="flex h-4 overflow-hidden rounded-md bg-trail-parchment/10">
        {rows.map((row) =>
          row.count > 0 ? (
            <span
              className={`${toneColors[row.tone]} h-full`}
              key={row.tone}
              style={{ width: `${row.percent}%` }}
              title={`${row.label}: ${row.count}`}
            />
          ) : null,
        )}
      </div>

      <ul className="mt-6 space-y-3">
        {rows.map((row) => (
          <li className="flex items-center justify-between gap-4" key={row.tone}>
            <div className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-sm ${toneColors[row.tone]}`} />
              <span className="font-display text-sm text-trail-parchment">{row.label}</span>
            </div>
            <span className="font-pixel text-xs text-trail-parchment/65">
              {row.count} · {row.percent}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}