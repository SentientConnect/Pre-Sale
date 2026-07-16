'use client'

import { useEffect } from 'react'
import { track } from '@/lib/analytics'

export function ScrollTracker() {
  useEffect(() => {
    const sent = new Set<number>()
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total <= 0) return
      const percent = Math.round((window.scrollY / total) * 100)
      ;[25, 50, 75, 90].forEach(mark => {
        if (percent >= mark && !sent.has(mark)) {
          sent.add(mark)
          track('scroll_depth_reached', { percent: mark })
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return null
}
