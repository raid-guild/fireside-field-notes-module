export const DEFAULT_HEADER_HEIGHT_PX = 184

export const getHeaderHeight = (header: HTMLElement | null) =>
  header?.offsetHeight ?? DEFAULT_HEADER_HEIGHT_PX

/** IntersectionObserver only accepts px/percent rootMargin — not calc() or CSS vars */
export const readHeaderHeightPx = () => {
  if (typeof window === 'undefined') return DEFAULT_HEADER_HEIGHT_PX

  const raw = getComputedStyle(document.documentElement).getPropertyValue('--expedition-header-h').trim()
  if (raw.endsWith('px')) {
    const parsed = Number.parseFloat(raw)
    if (Number.isFinite(parsed) && parsed > 0) return Math.round(parsed)
  }

  return DEFAULT_HEADER_HEIGHT_PX
}

export const encounterRevealRootMargin = () => {
  const top = readHeaderHeightPx()
  return `-${top}px 0px -35% 0px`
}

/** Vertical marker in the viewport where the active hero is chosen */
export const getReadingMarker = (viewportHeight: number, headerHeight: number) =>
  headerHeight + (viewportHeight - headerHeight) * 0.38

export const resolveActiveEncounterIndex = (
  sections: HTMLElement[],
  viewportHeight: number,
  headerHeight: number,
) => {
  const marker = getReadingMarker(viewportHeight, headerHeight)
  let activeIndex: number | null = null
  let bestDistance = Number.POSITIVE_INFINITY

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect()
    if (rect.bottom <= headerHeight || rect.top >= viewportHeight) return

    const center = rect.top + rect.height / 2
    const distance = Math.abs(center - marker)
    if (distance < bestDistance) {
      bestDistance = distance
      activeIndex = index
    }
  })

  return activeIndex
}
