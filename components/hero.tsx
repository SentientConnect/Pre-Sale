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

import { ReserveButton } from '@/components/reserve-button'
import { GoldParticles } from '@/components/gold-particles'
import { SentientConnectLogo } from '@/components/logo'

const BENEFITS = [
  '3 Months of AURA Genesis™ Free',
  '25% Off Final Glasses Price',
  'Priority Pre-Order Access',
]

export function Hero() {
  const ref = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 110],
  )

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen overflow-hidden pb-20 pt-32 md:pt-40"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_78%_30%,rgba(206,160,55,.16),transparent_35%),radial-gradient(circle_at_12%_70%,rgba(123,87,20,.13),transparent_35%),linear-gradient(180deg,#020202_0%,#080704_50%,#000_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-[0.12] [background-image:linear-gradient(rgba(213,173,83,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(213,173,83,.2)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
      />

      <GoldParticles className="pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div>
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
            SentientOS™ AR Glasses bring AURA Genesis™ into daily
            life—measuring MIND, BODY, and SPIRIT, revealing patterns,
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
            Priority pre-order access · 3 months free · 25% off the final retail
            price
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

        <div className="relative min-h-[430px] lg:min-h-[620px]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-0 h-[70%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bb7d1d]/12 blur-[130px]"
          />

          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{
              duration: 34,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute left-1/2 top-1/2 z-0 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d5ad53]/15"
          />

          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={{
              duration: 46,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute left-1/2 top-1/2 z-0 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#d5ad53]/10"
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
                    }
              }
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-[125%] max-w-[980px] lg:w-[138%]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    WebkitMaskImage:
                      'radial-gradient(ellipse 72% 66% at 56% 53%, black 42%, rgba(0,0,0,.98) 57%, rgba(0,0,0,.84) 67%, rgba(0,0,0,.45) 79%, transparent 100%)',
                    maskImage:
                      'radial-gradient(ellipse 72% 66% at 56% 53%, black 42%, rgba(0,0,0,.98) 57%, rgba(0,0,0,.84) 67%, rgba(0,0,0,.45) 79%, transparent 100%)',
                  }}
                >
                  <Image
                    src="/Glasses_edit.png"
                    alt="SentientOS AR glasses with the official phoenix logo"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="select-none object-cover object-center scale-[1.22] brightness-[0.9] contrast-[1.08]"
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10"
                  style={{
                    background:
                      'linear-gradient(to right, #020202 0%, rgba(2,2,2,.98) 6%, rgba(2,2,2,.85) 11%, rgba(2,2,2,.45) 18%, transparent 28%, transparent 72%, rgba(2,2,2,.45) 82%, rgba(2,2,2,.85) 89%, rgba(2,2,2,.98) 94%, #020202 100%), linear-gradient(to bottom, #020202 0%, rgba(2,2,2,.96) 7%, rgba(2,2,2,.7) 14%, rgba(2,2,2,.28) 22%, transparent 32%, transparent 72%, rgba(2,2,2,.32) 82%, rgba(2,2,2,.72) 89%, rgba(2,2,2,.96) 95%, #020202 100%)',
                  }}
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 54%, transparent 0%, transparent 42%, rgba(2,2,2,.12) 58%, rgba(2,2,2,.45) 76%, rgba(2,2,2,.82) 92%, #020202 100%)',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-4 right-2 z-30 rounded-2xl border border-[#d5ad53]/20 bg-black/55 px-4 py-3 backdrop-blur-md">
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
