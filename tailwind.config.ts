import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        trail: {
          ink: '#1a2233',
          parchment: '#f4efe4',
          panel: '#fff9f0',
          border: '#d8cfc0',
          accent: '#c45c2a',
          moss: '#4a6741',
          path: '#8b7355',
        },
        dungeon: {
          deep: '#121a28',
          mist: '#9eb0c7',
          torch: '#ffb054',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        pixel: ['var(--font-vt323)', 'monospace'],
      },
      boxShadow: {
        panel: '0 18px 48px -28px rgba(26, 34, 51, 0.45)',
      },
    },
  },
  plugins: [],
}

export default config