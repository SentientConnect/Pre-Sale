'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { SentientConnectLogo } from '@/components/logo'
import { ReserveButton } from '@/components/reserve-button'

const LINKS = [
  ['How It Works', '#how-it-works'],
  ['MIND | BODY | SPIRIT', '#triangulation'],
  ['AURA Genesis', '#aura-genesis'],
  ['Results', '#results'],
  ['FAQ', '#faq'],
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="shrink-0"><SentientConnectLogo compact /></a>
        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map(([label, href]) => <a key={href} href={href} className="text-sm text-white/60 transition hover:text-[#e0b95d]">{label}</a>)}
        </nav>
        <div className="hidden lg:block"><ReserveButton className="min-h-10 px-5 py-2 text-xs" /></div>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation" className="rounded-full border border-white/10 p-2 text-white lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-black px-4 pb-6 pt-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm text-white/75 hover:bg-white/5">{label}</a>)}
          </nav>
          <ReserveButton className="mt-3 w-full" />
        </div>
      )}
    </header>
  )
}
