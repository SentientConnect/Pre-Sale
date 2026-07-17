'use client'

import Image from 'next/image'
import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { Check, Sparkles } from 'lucide-react'

import { GoldParticles } from '@/components/gold-particles'
import { SentientConnectLogo } from '@/components/logo'
import { ReserveButton } from '@/components/reserve-button'

const BENEFITS = [
  '3 Months of AURA Genesis™ Free',
  '25% Off Final Glasses Price',
  'Priority Pre-Order Access',
]

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 85],
  )

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pb-20 pt-32 md:pt-40"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_78%_30%,rgba(206,160,55,.16),transparent_35%),radial-gradient(circle_at_12%_70%,rgba(123,87,20,.13),transparent_35%),linear-gradient(180deg,#020202_0%,#080704_50%,#000_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-[0.1] [background-image:linear-gradient(rgba(213,173,83,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(213,173,83,.18)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
      />

      <GoldParticles className="pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SentientConnectLogo className="mb-8 lg:hidden" />

            <span className="inline-flex items-center gap-2 rounded-full border border-[#d5ad53]/30 bg-[#d5ad53]/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#e3be68]">
              <Sparkles className="h-3.5 w-3.5" />
              SentientOS™ AR Glasses
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-7 max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Build Yourself—
            <span className="block text-gold-gradient">
              One Decision at a Time.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg"
          >
            SentientOS™ AR Glasses bring AURA Genesis™ into daily life—
            measuring MIND, BODY, and SPIRIT, revealing patterns,
            strengthening accountability, and helping you make the next right
            decision while life is actually happening.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <ReserveButton
              event="hero_cta_clicked"
              className="min-h-14 px-8 text-base"
            >
              Reserve Yours for $25
            </ReserveButton>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3 backdrop-blur">
              <span className="font-display text-3xl font-semibold text-gold-gradient">
                $25
              </span>

              <span className="text-xs uppercase tracking-[0.18em] text-white/50">
                Holding
                <br />
                Deposit
              </span>
            </div>
          </motion.div>

          <p className="mt-4 text-sm text-white/45">
            Priority pre-order access · 3 months free · 25% off the final
            retail price
          </p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 grid gap-3 sm:grid-cols-3"
          >
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 text-sm leading-5 text-white/75"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d5ad53]" />
                {benefit}
              </li>
            ))}
          </motion.ul>

          <p className="mt-6 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-[#d5ad53]/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d5ad53]/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d5ad53]" />
            </span>

            Founding pre-order access is limited
          </p>
        </div>

        <div className="relative min-h-[440px] sm:min-h-[520px] lg:min-h-[650px]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-0 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d5ad53]/[0.08] blur-[110px]"
          />

          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute left-1/2 top-1/2 z-0 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d5ad53]/10"
          />

          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={{
              duration: 52,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute left-1/2 top-1/2 z-0 h-[91%] w-[91%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#d5ad53]/[0.08]"
          />

          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -12, 0],
                      rotate: [0, 0.4, 0],
                    }
              }
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-[118%] max-w-[1050px] sm:w-[112%] lg:w-[138%]"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src="/Glasses_Official.png"
                  alt="SentientOS AR glasses with the official Sentient Connect logo"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 62vw"
                  className="select-none object-contain object-center mix-blend-lighten"
                />
              </div>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-2 right-1 z-30 rounded-2xl border border-[#d5ad53]/20 bg-black/50 px-4 py-3 backdrop-blur-md sm:bottom-5 sm:right-3">
            <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#d5ad53]">
              Human Layer
            </p>

            <p className="mt-1 text-sm text-white/70">
              Always in control
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
