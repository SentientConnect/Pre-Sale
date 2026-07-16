import Image from 'next/image'
import { cn } from '@/lib/utils'

export function SentientConnectLogo({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn('relative shrink-0', compact ? 'h-[52px] w-[190px] sm:h-[60px] sm:w-[220px]' : 'h-[82px] w-[300px] sm:h-[98px] sm:w-[360px]', className)}>
      <Image
        src="/sentient-connect-official-logo.svg"
        alt="Sentient Connect — Powered by SentientOS"
        fill
        priority
        unoptimized
        className="object-contain object-left"
      />
    </div>
  )
}
