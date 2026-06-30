'use client'

export type JourneyFootprintStop = {
  id: string
  label: string
}

type JourneyFootprintsNavProps = {
  activeStopIndex: number
  stops: JourneyFootprintStop[]
}

const StepArrowIcon = ({ direction }: { direction: 'back' | 'next' }) => (
  <span aria-hidden="true" className="journey-step-arrow">
    {direction === 'back' ? '←' : '→'}
  </span>
)

export const JourneyFootprintsNav = ({ activeStopIndex, stops }: JourneyFootprintsNavProps) => {
  const scrollToStop = (index: number) => {
    const stop = stops[index]
    if (!stop) return

    document.getElementById(stop.id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const previousStop = activeStopIndex > -1 ? stops[activeStopIndex - 1] : undefined
  const nextStop = stops[activeStopIndex + 1]

  return (
    <div
      aria-label="Journey step controls"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-trail-border/80 bg-trail-parchment/95 p-1.5 shadow-panel backdrop-blur-sm sm:bottom-6 sm:right-6"
      role="navigation"
    >
      <button
        aria-label={previousStop ? `Back to ${previousStop.label}` : 'No previous journey stop'}
        className="journey-step-button"
        disabled={!previousStop}
        onClick={() => scrollToStop(activeStopIndex - 1)}
        title={previousStop ? `Back to ${previousStop.label}` : undefined}
        type="button"
      >
        <StepArrowIcon direction="back" />
      </button>
      <button
        aria-label={nextStop ? `Next: ${nextStop.label}` : 'No next journey stop'}
        className="journey-step-button"
        disabled={!nextStop}
        onClick={() => scrollToStop(activeStopIndex + 1)}
        title={nextStop ? `Next: ${nextStop.label}` : undefined}
        type="button"
      >
        <StepArrowIcon direction="next" />
      </button>
    </div>
  )
}
