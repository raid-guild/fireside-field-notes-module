'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import type { Encounter } from '@/lib/encounters'
import { formatSessionDate } from '@/lib/encounters'
import { buildDialogSteps } from '@/lib/dialogSteps'
import { greetingForEncounter, pickRandomGreeting } from '@/lib/greetings'
import { EncounterLinks } from '@/components/EncounterParchment'
import { PixelSprite } from '@/components/PixelSprite'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'

type HeroDialogueProps = {
  encounter: Encounter
  index: number
}

export const HeroDialogue = ({ encounter, index }: HeroDialogueProps) => {
  const [greetingLine, setGreetingLine] = useState(() =>
    greetingForEncounter(encounter.slug, encounter.guestName),
  )
  const steps = useMemo(() => buildDialogSteps(encounter, greetingLine), [encounter, greetingLine])
  const [stepIndex, setStepIndex] = useState(0)
  const [bubbleKey, setBubbleKey] = useState(0)
  const step = steps[stepIndex]
  const isRecapStep = step?.kind === 'recap'
  const canAdvanceByClick =
    step && (step.kind === 'greeting' || step.kind === 'highlight' || step.kind === 'recap-missing')
  const canAdvance = canAdvanceByClick || isRecapStep

  const advance = useCallback(() => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((current) => current + 1)
      setBubbleKey((current) => current + 1)
    }
  }, [stepIndex, steps.length])

  const restart = useCallback(() => {
    setGreetingLine(pickRandomGreeting(encounter.guestName))
    setStepIndex(0)
    setBubbleKey((current) => current + 1)
  }, [encounter.guestName])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      const target = event.target as HTMLElement | null
      if (target?.closest('a, button, iframe, input, textarea')) return
      if (!canAdvance) return
      event.preventDefault()
      advance()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [advance, canAdvance])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-pixel text-sm uppercase tracking-[0.15em] text-trail-ink/65">
            Stop {index + 1} · {formatSessionDate(encounter.startsAt)}
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-trail-ink sm:text-3xl">
            {encounter.guestName}
          </h2>
        </div>
        <p className="font-pixel text-sm text-trail-ink/55">
          {stepIndex + 1} / {steps.length}
        </p>
      </div>

      <div className="flex items-end gap-4 sm:gap-6">
        <div className="flex shrink-0 flex-col items-center gap-2">
          <div
            className={`rounded-2xl border border-trail-border bg-trail-parchment p-3 transition-transform duration-300 ${
              canAdvance ? 'scale-100' : 'scale-95'
            }`}
          >
            <PixelSprite
              direction={index % 2 === 0 ? 'right' : 'left'}
              label={encounter.guestName}
              scale={1.15}
              slug={encounter.spriteSlug}
            />
          </div>
          <p className="font-pixel text-xs uppercase tracking-wide text-trail-moss">{encounter.heroArchetype}</p>
        </div>

        <div className="min-w-0 flex-1">
          <div
            className={`rpg-bubble w-full text-left transition-opacity ${
              canAdvanceByClick ? 'cursor-pointer hover:border-trail-accent/50' : ''
            }`}
            onClick={canAdvanceByClick ? advance : undefined}
            onKeyDown={
              canAdvanceByClick
                ? (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      advance()
                    }
                  }
                : undefined
            }
            role={canAdvanceByClick ? 'button' : undefined}
            tabIndex={canAdvanceByClick ? 0 : undefined}
          >
            <div className="rpg-bubble-inner animate-bubble-in px-5 py-5 sm:px-6 sm:py-6" key={bubbleKey}>
              {step?.kind === 'greeting' ? (
                <div className="space-y-3">
                  <p className="font-display text-xl font-semibold text-trail-ink">{step.greeting}</p>
                  <p className="text-base leading-7 text-trail-ink/90">{step.bio}</p>
                </div>
              ) : null}

              {step?.kind === 'highlight' ? (
                <div className="space-y-2">
                  <p className="font-pixel text-xs uppercase tracking-[0.2em] text-trail-accent">
                    Highlight {step.number} of {step.total}
                  </p>
                  <p className="text-base leading-7 text-trail-ink sm:text-lg">{step.text}</p>
                </div>
              ) : null}

              {step?.kind === 'recap' ? (
                <div className="space-y-3">
                  <p className="font-pixel text-xs uppercase tracking-[0.2em] text-trail-accent">
                    Fireside recap
                  </p>
                  <p className="text-sm text-trail-ink/75">Here&apos;s a short clip from our conversation.</p>
                  <YouTubeEmbed title={`${encounter.guestName} fireside recap`} videoId={step.videoId} />
                  <button
                    className="mt-2 rounded-full border border-trail-border bg-trail-panel px-4 py-2 font-pixel text-sm text-trail-ink transition-colors hover:border-trail-accent hover:text-trail-accent"
                    onClick={advance}
                    type="button"
                  >
                    Continue →
                  </button>
                </div>
              ) : null}

              {step?.kind === 'recap-missing' ? (
                <p className="text-base leading-7 text-trail-ink/80">
                  No recap clip is linked yet — the session page may have updates soon.
                </p>
              ) : null}

              {step?.kind === 'links' ? (
                <div className="space-y-4">
                  <p className="font-display text-lg font-semibold text-trail-ink">
                    Read more from this fireside
                  </p>
                  <p className="text-sm leading-6 text-trail-ink/75">
                    Field notes, the full interview, and session artifacts live on Portal.
                  </p>
                  <EncounterLinks encounter={encounter} />
                </div>
              ) : null}
            </div>
          </div>

          {canAdvanceByClick ? (
            <p className="mt-3 font-pixel text-sm text-trail-ink/50">Click bubble or press Space to continue</p>
          ) : isRecapStep ? (
            <p className="mt-3 font-pixel text-sm text-trail-ink/50">Watch the recap, then continue</p>
          ) : (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <p className="font-pixel text-sm text-trail-moss">Conversation complete</p>
              <button
                className="rounded-full border border-trail-border px-4 py-1.5 font-pixel text-sm text-trail-ink/75 transition-colors hover:border-trail-accent hover:text-trail-accent"
                onClick={restart}
                type="button"
              >
                Talk again
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-1.5">
        {steps.map((dialogStep, dotIndex) => (
          <span
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              dotIndex <= stepIndex ? 'bg-trail-accent' : 'bg-trail-border'
            }`}
            key={dialogStep.id}
          />
        ))}
      </div>

    </div>
  )
}