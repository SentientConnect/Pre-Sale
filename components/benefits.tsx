import { CalendarCheck, Compass, Eye, Goal, Shield, Waves } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

const ITEMS = [
  { icon: Compass, title: 'Start with intention', copy: 'Know the first right action before the day pulls you in every direction.' },
  { icon: Eye, title: 'Recognize patterns', copy: 'Connect emotions, energy, decisions, and outcomes in one understandable view.' },
  { icon: Shield, title: 'Strengthen accountability', copy: 'Build guardrails that protect what matters when pressure is high.' },
  { icon: Goal, title: 'Track goals simply', copy: 'Keep the next action visible without creating another overwhelming system.' },
  { icon: Waves, title: 'Prepare for hard decisions', copy: 'Slow reactive urgency and review context before choosing.' },
  { icon: CalendarCheck, title: 'Build daily alignment', copy: 'Create consistency across MIND, BODY, and SPIRIT over time.' },
]

export function Benefits() {
  return (
    <section className="py-24 md:py-32"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Built Around You" title="AURA Genesis™ Helps Turn Awareness Into Action" description="Designed for ordinary moments, difficult decisions, ambitious goals, and the daily work of becoming more intentional." /><div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{ITEMS.map((item,i)=><Reveal key={item.title} delay={i*.04}><article className="h-full rounded-3xl border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,.035),rgba(255,255,255,.012))] p-6"><item.icon className="h-6 w-6 text-[#d5ad53]"/><h3 className="mt-5 font-display text-xl font-semibold text-white">{item.title}</h3><p className="mt-3 text-sm leading-6 text-white/45">{item.copy}</p></article></Reveal>)}</div><p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-6 text-white/35">AURA Genesis™ is a personal accountability and decision-support platform. It is not a medical device and does not diagnose, treat, cure, or prevent any condition.</p></div></section>
  )
}
