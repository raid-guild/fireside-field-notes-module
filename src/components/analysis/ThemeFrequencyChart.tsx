'use client'

import { jumpToGuest } from '@/components/analysis/jumpToGuest'
import type { ThemeFrequencyRow } from '@/lib/analysisCamp'

type ThemeFrequencyChartProps = {
  rows: ThemeFrequencyRow[]
  sessionTotal: number
}

export const ThemeFrequencyChart = ({ rows, sessionTotal }: ThemeFrequencyChartProps) => {
  const maxCount = Math.max(...rows.map((row) => row.sessionCount), 1)

  return (
    <div className="rounded-2xl border border-trail-parchment/15 bg-trail-parchment/5 p-6">
      <div className="mb-6">
        <h3 className="font-display text-xl font-semibold text-trail-parchment">Theme frequency</h3>
        <p className="mt-2 text-sm leading-6 text-trail-parchment/70">
          Top tags across {sessionTotal} sessions. Click a bar to jump to a guest on the trail.
        </p>
      </div>

      <ul className="space-y-4">
        {rows.map((row) => {
          const width = `${(row.sessionCount / maxCount) * 100}%`
          const guestLabel = row.guests.map((guest) => guest.guestName.split(' ')[0]).join(', ')

          return (
            <li key={row.tag}>
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <button
                  className="text-left font-display text-sm font-medium text-trail-parchment transition-colors hover:text-trail-accent"
                  onClick={() => jumpToGuest(row.guests[0]?.slug ?? '')}
                  title={`${row.label} — ${guestLabel}`}
                  type="button"
                >
                  {row.label}
                </button>
                <span className="shrink-0 font-pixel text-xs text-trail-parchment/60">
                  {row.sessionCount} session{row.sessionCount === 1 ? '' : 's'}
                </span>
              </div>
              <button
                aria-label={`${row.label}: ${row.sessionCount} sessions — ${guestLabel}`}
                className="group block w-full rounded-md bg-trail-parchment/10 p-0.5 text-left"
                onClick={() => jumpToGuest(row.guests[0]?.slug ?? '')}
                type="button"
              >
                <span
                  className="block h-3 rounded-sm bg-trail-accent/85 transition-colors group-hover:bg-trail-accent"
                  style={{ width }}
                />
              </button>
              <p className="mt-1 text-xs text-trail-parchment/55">{guestLabel}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}