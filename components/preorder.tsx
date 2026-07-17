'use client'

import { FormEvent, useState } from 'react'
import { Check, LockKeyhole } from 'lucide-react'
import { track } from '@/lib/analytics'

type CheckoutResponse = {
  ok?: boolean
  token?: string
  hostedFormUrl?: string
  referenceId?: string
  error?: string
}

export function Preorder() {
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'redirecting' | 'error'
  >('idle')

  const [message, setMessage] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setStatus('submitting')
    setMessage('')
    track('checkout_started')

    const formData = new FormData(event.currentTarget)

    const payload = {
      firstName: String(formData.get('firstName') || '').trim(),
      lastName: String(formData.get('lastName') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      terms: String(formData.get('terms') || '').trim(),
    }

    try {
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = (await response.json()) as CheckoutResponse

      if (!response.ok) {
        throw new Error(
          data.error || 'Unable to prepare secure checkout.',
        )
      }

      if (!data.token) {
        throw new Error(
          'Authorize.net did not return a payment token.',
        )
      }

      if (!data.hostedFormUrl) {
        throw new Error(
          'Authorize.net checkout URL was not returned.',
        )
      }

      setStatus('redirecting')
      setMessage('Opening Authorize.net secure checkout…')

      const authorizeForm = document.createElement('form')

      authorizeForm.method = 'POST'
      authorizeForm.action = data.hostedFormUrl
      authorizeForm.target = '_self'
      authorizeForm.style.display = 'none'

      const tokenField = document.createElement('input')

      tokenField.type = 'hidden'
      tokenField.name = 'token'
      tokenField.value = data.token

      authorizeForm.appendChild(tokenField)
      document.body.appendChild(authorizeForm)
      authorizeForm.submit()
    } catch (error) {
      setStatus('error')

      setMessage(
        error instanceof Error
          ? error.message
          : 'Unable to continue. Please try again.',
      )
    }
  }

  const isLoading =
    status === 'submitting' || status === 'redirecting'

  return (
    <section
      id="preorder"
      className="relative overflow-hidden border-y border-[#d5ad53]/15 py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(213,173,83,.13),transparent_50%),#030302]"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-[#d5ad53]/25 bg-black/80 shadow-[0_40px_120px_rgba(0,0,0,.7)] lg:grid-cols-[.9fr_1.1fr]">
          <div className="border-b border-white/[0.08] p-7 sm:p-10 lg:border-b-0 lg:border-r">
            <p className="text-xs font-semibold uppercase tracking-[.26em] text-[#d5ad53]">
              Founding Pre-Order Access
            </p>

            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Become a Founding SentientOS™ User
            </h2>

            <div className="mt-8 flex items-end gap-3">
              <span className="font-display text-7xl font-semibold text-gold-gradient">
                $25
              </span>

              <span className="pb-2 text-sm uppercase tracking-[.18em] text-white/40">
                today
              </span>
            </div>

            <ul className="mt-8 space-y-4">
              {[
                'Reserve priority pre-order access',
                '3 months of AURA Genesis™ free after activation',
                '$19.99/month after the free period',
                '25% off the final retail price',
                'Product development and launch updates',
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm text-white/65"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d5ad53]" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 text-xs leading-6 text-white/40">
              The anticipated retail price is approximately $399 and
              is subject to change. The $25 payment is governed by the
              final pre-order terms shown at checkout.
            </div>
          </div>

          <form onSubmit={submit} className="p-7 sm:p-10">
            <div className="flex items-center gap-2 text-sm text-white/55">
              <LockKeyhole className="h-4 w-4 text-[#d5ad53]" />
              Secure Authorize.net checkout
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="text-sm text-white/55">
                First name

                <input
                  required
                  name="firstName"
                  autoComplete="given-name"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none transition focus:border-[#d5ad53]/60"
                />
              </label>

              <label className="text-sm text-white/55">
                Last name

                <input
                  required
                  name="lastName"
                  autoComplete="family-name"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none transition focus:border-[#d5ad53]/60"
                />
              </label>

              <label className="text-sm text-white/55 sm:col-span-2">
                Email

                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none transition focus:border-[#d5ad53]/60"
                />
              </label>

              <label className="text-sm text-white/55 sm:col-span-2">
                Mobile phone

                <input
                  required
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none transition focus:border-[#d5ad53]/60"
                />
              </label>
            </div>

            <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-white/40">
              <input
                required
                type="checkbox"
                name="terms"
                value="accepted"
                className="mt-1 accent-[#d5ad53]"
              />

              <span>
                I agree to the pre-order terms and consent to receive
                reservation and product-launch updates.
              </span>
            </label>

            <button
              disabled={isLoading}
              type="submit"
              className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-full border border-[#f1d785]/70 bg-[linear-gradient(135deg,#efd27b,#b87a1c)] px-6 font-bold text-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? 'Opening Secure Checkout…'
                : 'Reserve My Glasses for $25'}
            </button>

            <p className="mt-4 text-center text-xs text-white/35">
              One-time holding deposit · Subscription begins after the
              included free period and eligible product activation
            </p>

            {message && (
              <div
                className={`mt-5 rounded-xl border p-4 text-sm leading-6 ${
                  status === 'error'
                    ? 'border-red-400/20 bg-red-400/5 text-red-200'
                    : 'border-[#d5ad53]/20 bg-[#d5ad53]/5 text-white/60'
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
