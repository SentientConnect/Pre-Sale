import { Activity, BrainCircuit, Route } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const ITEMS = [
  { icon: Activity, title: 'Measure', copy: 'Complete simple daily MIND | BODY | SPIRIT check-ins through voice, touch, or connected devices.' },
  { icon: BrainCircuit, title: 'Understand', copy: 'AURA Genesis™ identifies patterns across your choices, energy, emotions, routines, and outcomes.' },
  { icon: Route, title: 'Act', copy: 'Receive a clear next-step recommendation while keeping the human in control of every meaningful decision.' },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative border-y border-white/[0.06] bg-white/[0.018] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="More Than Smart Glasses" title="Technology That Helps You Become More Human" description="Most technology competes for your attention. SentientOS™ is designed to help you understand it—turning awareness into intentional action through a symbiotic relationship between AI and the Human Layer." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ITEMS.map((item, i) => <Reveal key={item.title} delay={i * .08}><article className="group h-full rounded-3xl border border-white/[0.08] bg-[linear-gradient(150deg,rgba(255,255,255,.045),rgba(255,255,255,.015))] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#d5ad53]/30"><div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d5ad53]/25 bg-[#d5ad53]/10 text-[#d5ad53]"><item.icon className="h-6 w-6" /></div><p className="mt-8 text-xs font-bold uppercase tracking-[.25em] text-[#d5ad53]/80">0{i + 1}</p><h3 className="mt-3 font-display text-2xl font-semibold text-white">{item.title}</h3><p className="mt-4 leading-7 text-white/55">{item.copy}</p></article></Reveal>)}
        </div>
      </div>
    </section>
  )
}
