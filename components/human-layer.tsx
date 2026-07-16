import { CheckCircle2, LockKeyhole, ScanSearch, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const STEPS = ['Observe', 'Measure', 'Recognize', 'Recommend', 'Human Approval', 'Act', 'Learn']
const CARDS = [
  { icon: ShieldCheck, title: 'Human approval', copy: 'Meaningful actions stay under your authority.' },
  { icon: LockKeyhole, title: 'Personal guardrails', copy: 'Boundaries are based on your stated goals and rules.' },
  { icon: ScanSearch, title: 'Transparent tracking', copy: 'See the signals and patterns behind every recommendation.' },
  { icon: CheckCircle2, title: 'Values-first guidance', copy: 'Recommendations support the person you are working to become.' },
]

export function HumanLayer() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="The Human Layer" title="Artificial Intelligence With Human Accountability" description="AURA Genesis™ can organize information and recommend actions, but you remain the final authority. The system is built to strengthen human judgment—not replace it." />
        <Reveal className="mt-14"><div className="overflow-x-auto pb-2"><div className="flex min-w-[850px] items-center justify-between rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5">{STEPS.map((step, i) => <div key={step} className="flex items-center"><div className="rounded-full border border-[#d5ad53]/25 bg-[#d5ad53]/10 px-4 py-2 text-xs font-semibold text-white/75">{step}</div>{i < STEPS.length - 1 && <span className="mx-3 h-px w-7 bg-[linear-gradient(90deg,#d5ad53,transparent)]" />}</div>)}</div></div></Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{CARDS.map((card, i) => <Reveal key={card.title} delay={i * .06}><div className="h-full rounded-3xl border border-white/[0.08] bg-black p-6"><card.icon className="h-6 w-6 text-[#d5ad53]" /><h3 className="mt-5 font-display text-xl font-semibold text-white">{card.title}</h3><p className="mt-3 text-sm leading-6 text-white/45">{card.copy}</p></div></Reveal>)}</div>
      </div>
    </section>
  )
}
