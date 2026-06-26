'use client'

import { jumpToGuest } from '@/components/analysis/jumpToGuest'
import type { ToolMentionRow } from '@/lib/analysisCamp'

type ToolMentionsChartProps = {
  rows: ToolMentionRow[]
}

export const ToolMentionsChart = ({ rows }: ToolMentionsChartProps) => {
  const maxCount = Math.max(...rows.map((row) => row.sessionCount), 1)

  return (
    <div className="rounded-2xl border border-trail-parchment/15 bg-trail-parchment/5 p-6">
      <div className="mb-6">
        <h3 className="font-display text-xl font-semibold text-trail-parchment">Tool & workflow mentions</h3>
        <p className="mt-2 text-sm leading-6 text-trail-parchment/70">
          Curated from session summaries — bounded tools and repeatable processes guests actually named.
        </p>
      </div>

      <ul className="space-y-4">
        {rows.map((row) => {
          const width = `${(row.sessionCount / maxCount) * 100}%`
          const guestLabel = row.guests.map((guest) => guest.guestName.split(' ')[0]).join(', ')

          return (
            <li key={row.id}>
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <button
                  className="text-left font-display text-sm font-medium text-trail-parchment transition-colors hover:text-trail-accent"
                  onClick={() => jumpToGuest(row.guests[0]?.slug ?? '')}
                  type="button"
                >
                  {row.label}
                </button>
                <span className="shrink-0 font-pixel text-xs uppercase tracking-wide text-trail-parchment/55">
                  {row.kind}
                </span>
              </div>
              <button
                aria-label={`${row.label}: ${row.sessionCount} sessions`}
                className="group block w-full rounded-md bg-trail-parchment/10 p-0.5 text-left"
                onClick={() => jumpToGuest(row.guests[0]?.slug ?? '')}
                type="button"
              >
                <span
                  className="block h-3 rounded-sm bg-trail-moss/80 transition-colors group-hover:bg-trail-moss"
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