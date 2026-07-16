export type AnalyticsEvent =
  | 'hero_cta_clicked'
  | 'offer_cta_clicked'
  | 'checkout_started'
  | 'checkout_completed'
  | 'faq_opened'
  | 'scroll_depth_reached'

type Props = Record<string, string | number | boolean | undefined>

export function track(event: AnalyticsEvent, props?: Props) {
  if (typeof window === 'undefined') return

  const w = window as unknown as {
    va?: (action: string, event: string, props?: Props) => void
  }

  try {
    w.va?.('event', event, props)
  } catch {
    // Analytics must never interrupt conversion flow.
  }
}
