import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const required = ['firstName', 'lastName', 'email', 'phone', 'terms']
    for (const field of required) {
      if (!body[field]) return NextResponse.json({ error: `Missing ${field}` }, { status: 400 })
    }

    const webhook = process.env.RESERVATION_WEBHOOK_URL
    if (webhook) {
      try {
        await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...body, source: 'sentientos-ar-preorder', createdAt: new Date().toISOString() }),
        })
      } catch {
        // Do not block checkout if the optional lead webhook is unavailable.
      }
    }

    const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || ''
    return NextResponse.json({ ok: true, checkoutUrl })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
