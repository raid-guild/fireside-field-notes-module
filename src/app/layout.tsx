import type { Metadata } from 'next'
import { Fraunces, VT323 } from 'next/font/google'
import Script from 'next/script'

import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Edge Report | RaidGuild Field Experience',
  description:
    'A scroll expedition through June 2026 cohort fireside interviews on how builders adapt AI in real work.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${fraunces.variable} ${vt323.variable}`} lang="en">
      <body>
        {children}
        <Script
          async
          src="https://plausible-production-78b3.up.railway.app/js/pa-KYW36-GkWGjPJD0jNcybG.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
plausible.init()`}
        </Script>
      </body>
    </html>
  )
}
