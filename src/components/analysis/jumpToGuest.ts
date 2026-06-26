export const jumpToGuest = (slug: string) => {
  if (!slug) return
  const target = document.getElementById(slug)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  window.location.hash = slug
}