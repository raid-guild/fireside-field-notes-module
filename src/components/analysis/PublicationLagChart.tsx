'use client'

import { jumpToGuest } from '@/components/analysis/jumpToGuest'
import type { PublicationLagRow } from '@/lib/analysisCamp'

type PublicationLagChartProps = {
  rows: PublicationLagRow[]
  medianDays: number | null
}

export const PublicationLagChart = ({ rows, medianDays }: PublicationLagChartProps) => {
  const maxLag = Math.max(...rows.map((row) => row.lagDays), 1)

  return (
    <div className="rounded-2xl border border-trail-parchment/15 bg-trail-parchment/5 p-6">
      <div className="mb-6">
        <h3 className="font-display text-xl font-semibold text-trail-parchment">Publication lag</h3>
        <p className="mt-2 text-sm leading-6 text-trail-parchment/70">
          Days from fireside session to first linked field note on Portal
          {medianDays !== null ? ` — median ${medianDays} day${medianDays === 1 ? '' : 's'}` : ''}.
        </p>
      </div>

      <ul className="space-y-3">
        {rows.map((row) => {
          const width = `${Math.max((row.lagDays / maxLag) * 100, row.lagDays === 0 ? 8 : 12)}%`

          return (
            <li key={row.slug}>
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <button
                  className="text-left font-display text-sm text-trail-parchment transition-colors hover:text-trail-accent"
                  onClick={() => jumpToGuest(row.slug)}
                  type="button"
                >
                  {row.guestName.split(' ')[0]}
                </button>
                <span className="shrink-0 font-pixel text-xs text-trail-parchment/60">{row.lagLabel}</span>
              </div>
              <button
                className="group block w-full rounded-md bg-trail-parchment/10 p-0.5 text-left"
                onClick={() => jumpToGuest(row.slug)}
                type="button"
              >
                <span
                  className="block h-2.5 rounded-sm bg-trail-path/75 transition-colors group-hover:bg-trail-path"
                  style={{ width }}
                />
              </button>
              <p className="mt-1 text-xs text-trail-parchment/50">
                {row.sessionDate} → {row.publishedDate}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}