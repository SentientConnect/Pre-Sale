'use client'

import { motion, useReducedMotion } from 'motion/react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

const groups = [
  { title: 'MIND', position: 'top-0 left-1/2 -translate-x-1/2', items: ['Clarity', 'Focus', 'Anxiety', 'Decision readiness', 'Truthfulness', 'Emotional awareness'] },
  { title: 'BODY', position: 'bottom-0 left-0', items: ['Sleep', 'Energy', 'Hydration', 'Movement', 'Cravings', 'Physical regulation'] },
  { title: 'SPIRIT', position: 'bottom-0 right-0', items: ['Purpose', 'Integrity', 'Peace', 'Service', 'Forgiveness', 'Alignment'] },
]

export function Triangulation() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="triangulation" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="MIND | BODY | SPIRIT Triangulation™" title="Measure the Whole Person—not Just the Task" description="Daily signals become a clear alignment score, giving AURA Genesis™ context to support the person behind every decision." />
        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-[590px]">
              <svg viewBox="0 0 600 540" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                <defs><linearGradient id="goldLine" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f0d884" /><stop offset=".52" stopColor="#bf8423" /><stop offset="1" stopColor="#65400f" /></linearGradient></defs>
                <motion.path d="M300 50 L78 462 L522 462 Z" fill="rgba(213,173,83,.025)" stroke="url(#goldLine)" strokeWidth="2" strokeDasharray="9 12" initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }} whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
                <circle cx="300" cy="330" r="92" fill="rgba(7,7,7,.94)" stroke="rgba(213,173,83,.35)" />
                <circle cx="300" cy="330" r="75" fill="none" stroke="rgba(213,173,83,.12)" strokeDasharray="4 8" />
              </svg>
              <div className="absolute left-1/2 top-[61%] -translate-x-1/2 -translate-y-1/2 text-center"><p className="text-[.65rem] font-semibold uppercase tracking-[.24em] text-[#d5ad53]/70">Daily Alignment</p><motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: .5 }} className="mt-2 font-display text-5xl font-semibold text-gold-gradient">91</motion.p><p className="mt-1 text-xs text-white/35">78 → 84 → 91</p></div>
              {groups.map((group) => <div key={group.title} className={`absolute ${group.position} w-44 rounded-2xl border border-[#d5ad53]/20 bg-black/75 p-4 text-center backdrop-blur`}><h3 className="font-display text-lg font-semibold text-[#e1bb61]">{group.title}</h3><p className="mt-2 text-[.68rem] leading-5 text-white/45">{group.items.join(' · ')}</p></div>)}
            </div>
          </Reveal>
          <Reveal delay={.1}>
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[.25em] text-[#d5ad53]">The accountability loop</p>
              <h3 className="mt-4 font-display text-3xl font-semibold text-white">A difficult day becomes information—not identity.</h3>
              <p className="mt-5 leading-8 text-white/60">AURA Genesis™ helps you recognize patterns, measure progress, and strengthen alignment over time. Every check-in creates context. Every context-aware recommendation creates a chance to choose differently.</p>
              <div className="mt-8 space-y-4">
                {[['Observe', 'Capture what is true right now.'], ['Connect', 'See how mind, body, and spirit affect one another.'], ['Strengthen', 'Repeat what works and guard against what does not.']].map(([title, copy], i) => <div key={title} className="flex gap-4 rounded-2xl border border-white/[0.07] bg-black/40 p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d5ad53]/15 text-sm font-bold text-[#d5ad53]">{i + 1}</span><div><h4 className="font-semibold text-white">{title}</h4><p className="mt-1 text-sm text-white/45">{copy}</p></div></div>)}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
