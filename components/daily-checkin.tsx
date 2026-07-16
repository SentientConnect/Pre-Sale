'use client'

import { useState } from 'react'
import { Glasses, Mic, Smartphone } from 'lucide-react'
import { motion } from 'motion/react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

const SCORES = [{ label: 'MIND', value: 7.2, pct: 72 }, { label: 'BODY', value: 6.4, pct: 64 }, { label: 'SPIRIT', value: 8.1, pct: 81 }]
const MODES = [{ id: 'voice', label: 'Voice', icon: Mic }, { id: 'glasses', label: 'Glasses', icon: Glasses }, { id: 'mobile', label: 'Mobile', icon: Smartphone }] as const

export function DailyCheckin() {
  const [mode, setMode] = useState<(typeof MODES)[number]['id']>('voice')
  return (
    <section id="aura-genesis" className="relative border-y border-white/[0.06] bg-[radial-gradient(circle_at_50%_0%,rgba(213,173,83,.08),transparent_45%)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="AURA Genesis™" title="Experience a Daily Check-In" description="A living conversation with AURA Genesis™—available through your voice, your glasses, or your phone." />
        <div className="mx-auto mt-14 max-w-4xl"><Reveal><div className="relative overflow-hidden rounded-[2rem] border border-[#d5ad53]/18 bg-[linear-gradient(160deg,rgba(20,18,12,.94),rgba(4,4,4,.96))] p-6 shadow-[0_30px_100px_rgba(0,0,0,.65)] sm:p-9"><div aria-hidden="true" className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d5ad53]/10 blur-3xl" />
          <div className="flex flex-wrap items-center gap-2">{MODES.map((m) => <button key={m.id} type="button" onClick={() => setMode(m.id)} className={cn('inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition', mode === m.id ? 'border-[#d5ad53]/50 bg-[#d5ad53]/15 text-[#e4be66]' : 'border-white/10 bg-white/[0.03] text-white/45 hover:text-white')} aria-pressed={mode === m.id}><m.icon className="h-4 w-4" />{m.label}</button>)}</div>
          <div className="mt-7 space-y-4"><div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-[#d5ad53]/20 bg-[#d5ad53]/10 px-5 py-4"><p className="text-[.65rem] uppercase tracking-[.22em] text-[#d5ad53]">AURA</p><p className="mt-2 text-sm leading-7 text-white/85">How clear does your mind feel today?</p></div><div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm border border-white/10 bg-white/[0.045] px-5 py-4"><p className="text-[.65rem] uppercase tracking-[.22em] text-white/35">You</p><p className="mt-2 text-sm leading-7 text-white/85">7 out of 10. I know what needs to happen, but I feel overwhelmed.</p></div><div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-[#d5ad53]/20 bg-[#d5ad53]/10 px-5 py-4"><p className="text-[.65rem] uppercase tracking-[.22em] text-[#d5ad53]">AURA</p><p className="mt-2 text-sm leading-7 text-white/85">Your clarity is stable, but urgency is elevated. Before taking on anything new, choose one mission-critical action and complete it fully.</p></div></div>
          <div className="mt-9 rounded-2xl border border-white/10 bg-black/45 p-5 sm:p-6"><div className="grid gap-5 sm:grid-cols-3">{SCORES.map((s, i) => <div key={s.label}><div className="flex items-baseline justify-between"><span className="text-xs uppercase tracking-[.18em] text-white/40">{s.label}</span><span className="font-display text-sm font-semibold text-white">{s.value}</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-[linear-gradient(90deg,#845814,#e5c568)]" initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: .2 + i * .15 }} /></div></div>)}</div><div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between"><div><span className="text-xs uppercase tracking-[.18em] text-white/40">Overall Alignment</span><span className="ml-3 font-display text-xl font-semibold text-gold-gradient">72%</span></div><p className="text-xs leading-6 text-white/45 sm:max-w-sm sm:text-right"><span className="text-[#d5ad53]">Recommended next action:</span> Complete one priority before adding another.</p></div></div>
        </div></Reveal></div>
      </div>
    </section>
  )
}
