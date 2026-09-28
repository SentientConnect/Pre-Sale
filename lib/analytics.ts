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

  window.dispatchEvent(
    new CustomEvent('sentient:analytics', {
      detail: { event, props },
    }),
  )
}
