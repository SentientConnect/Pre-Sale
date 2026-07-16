import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { Triangulation } from '@/components/triangulation'
import { DailyCheckin } from '@/components/daily-checkin'
import { HumanLayer } from '@/components/human-layer'
import { Progress } from '@/components/progress'
import { Benefits } from '@/components/benefits'
import { Preorder } from '@/components/preorder'
import { FAQ } from '@/components/faq'
import { FinalCTA } from '@/components/final-cta'
import { Footer } from '@/components/footer'
import { MobileCTA } from '@/components/mobile-cta'
import { ScrollTracker } from '@/components/scroll-tracker'

export default function Page() {
  return <><Navbar/><main><Hero/><HowItWorks/><Triangulation/><DailyCheckin/><HumanLayer/><Progress/><Benefits/><Preorder/><FAQ/><FinalCTA/></main><Footer/><MobileCTA/><ScrollTracker/></>
}
