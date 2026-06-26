import type { GuestLensRow } from '@/lib/analysisCamp'

type GuestLensChartProps = {
  rows: GuestLensRow[]
  sessionTotal: number
}

const barTones = [
  'bg-trail-accent/90',
  'bg-trail-accent/75',
  'bg-trail-accent/60',
  'bg-trail-moss/80',
  'bg-trail-moss/65',
  'bg-trail-path/80',
  'bg-trail-path/65',
]

export const GuestLensChart = ({ rows, sessionTotal }: GuestLensChartProps) => {
  const maxCount = Math.max(...rows.map((row) => row.sessionCount), 1)

  return (
    <div className="rounded-2xl border border-trail-parchment/15 bg-trail-parchment/5 p-6">
      <div className="mb-6">
        <h3 className="font-display text-xl font-semibold text-trail-parchment">Guest lens</h3>
        <p className="mt-2 text-sm leading-6 text-trail-parchment/70">
          How the cohort skews by builder background — editorial buckets, not job titles.
        </p>
      </div>

      <ul className="space-y-4">
        {rows.map((row, index) => {
          const width = `${(row.sessionCount / maxCount) * 100}%`

          return (
            <li key={row.lens}>
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <span className="font-display text-sm font-medium text-trail-parchment">{row.label}</span>
                <span className="shrink-0 font-pixel text-xs text-trail-parchment/60">
                  {row.sessionCount} of {sessionTotal}
                </span>
              </div>
              <div className="rounded-md bg-trail-parchment/10 p-0.5">
                <span
                  className={`block h-3 rounded-sm ${barTones[index % barTones.length]}`}
                  style={{ width }}
                />
              </div>
              <p className="mt-1 text-xs text-trail-parchment/55">{row.guests.join(' · ')}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}