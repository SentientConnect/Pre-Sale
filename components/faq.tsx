'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'

const FAQS = [
  ['What does the $25 holding deposit provide?', 'It secures priority placement in the SentientOS™ AR Glasses pre-order program and access to the founding-customer offer. Final deposit terms are governed by the pre-order agreement presented at checkout.'],
  ['How much will the glasses cost?', 'The current anticipated retail price is approximately $399. Final pricing is subject to change before production and fulfillment.'],
  ['What discount do pre-order customers receive?', 'Qualified pre-order customers receive 25% off the final retail price under the final pre-order terms.'],
  ['When does the monthly subscription begin?', 'AURA Genesis™ is included for the first three months following eligible product activation. It is then $19.99 per month unless canceled under the subscription terms.'],
  ['What is MIND | BODY | SPIRIT Triangulation™?', 'It is SentientOS™’s daily accountability framework for measuring mental clarity, physical regulation, and purpose-driven alignment.'],
  ['Does AURA Genesis make decisions for me?', 'No. AURA Genesis™ identifies patterns, organizes information, and provides recommendations. The Human Layer remains responsible for final decisions.'],
  ['Are the glasses currently available?', 'The product is being offered through a pre-order reservation program. Final specifications, availability, production schedule, and fulfillment timing are subject to change.'],
  ['Is AURA Genesis a medical device or healthcare provider?', 'No. AURA Genesis™ is a personal accountability and decision-support platform. It is not a medical device and does not diagnose, treat, cure, or prevent any condition.'],
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return <section id="faq" className="py-24 md:py-32"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Questions" title="Know What You Are Reserving" description="Clear answers about the offer, the subscription, and the role of AURA Genesis™."/><div className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">{FAQS.map(([q,a],i)=><div key={q}><button type="button" onClick={()=>{setOpen(open===i?null:i);track('faq_opened',{question:q})}} className="flex w-full items-center justify-between gap-5 py-6 text-left"><span className="font-display text-lg font-semibold text-white">{q}</span><ChevronDown className={cn('h-5 w-5 shrink-0 text-[#d5ad53] transition-transform',open===i&&'rotate-180')}/></button>{open===i&&<p className="max-w-3xl pb-6 pr-10 text-sm leading-7 text-white/50">{a}</p>}</div>)}</div></div></section>
}
