const GREETING_OPENERS = [
  'Greetings, traveler.',
  'Welcome, traveler.',
  'Good journey to you.',
  'Hail, raider.',
  'Well met on the trail.',
  'Ah — you made it this far.',
  'Greetings from the edge.',
  'Welcome to the fireside.',
  'Good to see another walker.',
  'The corridor welcomes you.',
] as const

/** Stable opener per encounter — safe for SSR hydration */
export const greetingForEncounter = (slug: string, guestName: string) => {
  let hash = 0
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % GREETING_OPENERS.length
  }
  const opener = GREETING_OPENERS[Math.abs(hash) % GREETING_OPENERS.length]
  return `${opener} I'm ${guestName}.`
}

/** Client-only variety (e.g. Talk again) */
export const pickRandomGreeting = (guestName: string) => {
  const opener = GREETING_OPENERS[Math.floor(Math.random() * GREETING_OPENERS.length)]
  return `${opener} I'm ${guestName}.`
}