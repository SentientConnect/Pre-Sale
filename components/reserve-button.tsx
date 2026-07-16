'use client'

import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { track, type AnalyticsEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

export function ReserveButton({ children = 'Reserve for $25', event = 'offer_cta_clicked', className = '' }: { children?: ReactNode; event?: AnalyticsEvent; className?: string }) {
  return (
    <a
      href="#preorder"
      onClick={() => track(event)}
      className={cn('group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#f2d989]/70 bg-[linear-gradient(135deg,#f1d782_0%,#c59027_54%,#7a5113_100%)] px-6 py-3 text-sm font-bold text-black shadow-[0_14px_45px_rgba(180,126,31,.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(213,173,83,.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9c766] focus-visible:ring-offset-2 focus-visible:ring-offset-black', className)}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  )
}
