'use client'

import { jumpToGuest } from '@/components/analysis/jumpToGuest'
import type { OutputFunnelGuest, OutputFunnelStep } from '@/lib/analysisCamp'

type OutputFunnelChartProps = {
  steps: OutputFunnelStep[]
  guests: OutputFunnelGuest[]
}

const stepTone = ['bg-trail-accent/90', 'bg-trail-accent/75', 'bg-trail-accent/60', 'bg-trail-accent/45']

export const OutputFunnelChart = ({ steps, guests }: OutputFunnelChartProps) => {
  const maxCount = steps[0]?.count ?? 1

  return (
    <div className="rounded-2xl border border-trail-parchment/15 bg-trail-parchment/5 p-6">
      <div className="mb-6">
        <h3 className="font-display text-xl font-semibold text-trail-parchment">Output funnel</h3>
        <p className="mt-2 text-sm leading-6 text-trail-parchment/70">
          How session conversations became durable guild artifacts — field notes, recaps, and full interviews.
        </p>
      </div>

      <ul className="space-y-3">
        {steps.map((step, index) => {
          const width = `${(step.count / maxCount) * 100}%`

          return (
            <li key={step.id}>
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <span className="font-display text-sm text-trail-parchment">{step.label}</span>
                <span className="font-pixel text-xs text-trail-parchment/60">
                  {step.count} · {step.percent}%
                </span>
              </div>
              <div className="rounded-md bg-trail-parchment/10 p-0.5">
                <span className={`block h-3 rounded-sm ${stepTone[index] ?? 'bg-trail-accent/45'}`} style={{ width }} />
              </div>
            </li>
          )
        })}
      </ul>

      <div className="mt-8 border-t border-trail-parchment/10 pt-6">
        <p className="font-pixel text-xs uppercase tracking-wide text-trail-parchment/55">Per guest</p>
        <ul className="mt-3 max-h-52 space-y-2 overflow-y-auto pr-1">
          {guests.map((guest) => (
            <li key={guest.slug}>
              <button
                className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-trail-parchment/10"
                onClick={() => jumpToGuest(guest.slug)}
                type="button"
              >
                <span className="font-display text-sm text-trail-parchment/90">
                  {guest.guestName.split(' ')[0]}
                </span>
                <span className="font-pixel text-[11px] tracking-wide text-trail-parchment/55">
                  {guest.hasFieldNote ? 'note' : '—'} · {guest.hasRecap ? 'recap' : '—'} ·{' '}
                  {guest.hasFullInterview ? 'full' : '—'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}