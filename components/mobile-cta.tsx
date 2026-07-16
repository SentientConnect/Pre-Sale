'use client'

import { ReserveButton } from '@/components/reserve-button'

export function MobileCTA() {
  return <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d5ad53]/15 bg-black/90 p-3 backdrop-blur-xl lg:hidden"><ReserveButton className="w-full">Reserve for $25 · 3 Months Free</ReserveButton></div>
}
