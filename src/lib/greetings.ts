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

export const pickRandomGreeting = (guestName: string) => {
  const opener = GREETING_OPENERS[Math.floor(Math.random() * GREETING_OPENERS.length)]
  return `${opener} I'm ${guestName}.`
}