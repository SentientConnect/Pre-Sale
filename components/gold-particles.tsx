'use client'

import { motion, useReducedMotion } from 'motion/react'

const PARTICLES = [
  [7, 18, 5, 0], [14, 67, 3, 1.1], [23, 34, 4, 2.4], [31, 81, 2, 0.6],
  [39, 12, 3, 3.2], [48, 53, 5, 1.8], [57, 26, 2, 4.1], [66, 72, 4, 2.8],
  [74, 39, 3, 0.9], [83, 15, 4, 3.7], [91, 61, 2, 1.5], [96, 87, 3, 4.6],
]

export function GoldParticles({ className = '' }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <div className={className} aria-hidden="true">
      {PARTICLES.map(([left, top, size, delay], index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#d5ad53] shadow-[0_0_18px_rgba(213,173,83,.6)]"
          style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
          animate={reduceMotion ? undefined : { y: [0, -16, 0], opacity: [0.15, 0.8, 0.15] }}
          transition={{ duration: 4.5 + index * 0.15, delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
