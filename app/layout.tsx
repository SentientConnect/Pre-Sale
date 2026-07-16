import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'SentientOS™ AR Glasses | Reserve for $25',
  description: 'Reserve priority access to SentientOS™ AR Glasses and experience daily MIND | BODY | SPIRIT accountability powered by AURA Genesis™.',
  metadataBase: new URL('https://sentientconnect.io'),
  openGraph: {
    title: 'SentientOS™ AR Glasses | Reserve for $25',
    description: 'AI accountability meets the Human Layer. Reserve priority access for $25.',
    images: ['/sentientos-glasses.png'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="scroll-smooth"><body>{children}<Analytics /></body></html>
}
