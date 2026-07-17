import { NextResponse } from 'next/server'

type ReserveRequest = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  terms?: string
}

type AuthorizeNetResponse = {
  token?: string
  messages?: {
    resultCode?: string
    message?: Array<{
      code?: string
      text?: string
    }>
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReserveRequest

    const firstName = String(body.firstName || '').trim()
    const lastName = String(body.lastName || '').trim()
    const email = String(body.email || '').trim()
    const phone = String(body.phone || '').trim()
    const terms = String(body.terms || '').trim()

    if (!firstName) {
      return NextResponse.json(
        { error: 'Missing first name' },
        { status: 400 },
      )
    }

    if (!lastName) {
      return NextResponse.json(
        { error: 'Missing last name' },
        { status: 400 },
      )
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Missing email' },
        { status: 400 },
      )
    }

    if (!phone) {
      return NextResponse.json(
        { error: 'Missing phone' },
        { status: 400 },
      )
    }

    if (terms !== 'accepted') {
      return NextResponse.json(
        { error: 'Pre-order terms must be accepted' },
        { status: 400 },
      )
    }

    const apiLoginId =
      process.env.AUTHORIZE_NET_API_LOGIN_ID

    const transactionKey =
      process.env.AUTHORIZE_NET_TRANSACTION_KEY

    const environment =
      process.env.AUTHORIZE_NET_ENVIRONMENT?.toLowerCase() ||
      'sandbox'

    if (!apiLoginId || !transactionKey) {
      console.error('Missing Authorize.net credentials')

      return NextResponse.json(
        { error: 'Payment processing is not configured' },
        { status: 500 },
      )
    }

    const production = environment === 'production'

    const apiUrl = production
      ? 'https://api.authorize.net/xml/v1/request.api'
      : 'https://apitest.authorize.net/xml/v1/request.api'

    const hostedFormUrl = production
      ? 'https://accept.authorize.net/payment/payment'
      : 'https://test.authorize.net/payment/payment'

    const siteUrl = (
      process.env.SITE_URL || new URL(request.url).origin
    ).replace(/\/$/, '')

    const timestamp = Date.now().toString()
    const referenceId = `SC${timestamp.slice(-14)}`
    const invoiceNumber = `SENT-${timestamp.slice(-12)}`

    const authorizeNetRequest = {
      getHostedPaymentPageRequest: {
        merchantAuthentication: {
          name: apiLoginId,
          transactionKey,
        },

        refId: referenceId,

        transactionRequest: {
          transactionType: 'authCaptureTransaction',
          amount: '25.00',

          order: {
            invoiceNumber,
            description:
              'SentientOS AR Glasses Founding Pre-Order Deposit',
          },

          customer: {
            email,
          },

          billTo: {
            firstName,
            lastName,
            phoneNumber: phone,
          },
        },

        hostedPaymentSettings: {
          setting: [
            {
              settingName: 'hostedPaymentReturnOptions',
              settingValue: JSON.stringify({
                showReceipt: true,
                url: siteUrl,
                urlText: 'Return to SentientOS',
                cancelUrl: siteUrl,
                cancelUrlText: 'Return to SentientOS',
              }),
            },
            {
              settingName: 'hostedPaymentButtonOptions',
              settingValue: JSON.stringify({
                text: 'Pay $25 Deposit',
              }),
            },
            {
              settingName: 'hostedPaymentStyleOptions',
              settingValue: JSON.stringify({
                bgColor: '#d5ad53',
              }),
            },
            {
              settingName: 'hostedPaymentPaymentOptions',
              settingValue: JSON.stringify({
                cardCodeRequired: true,
                showCreditCard: true,
                showBankAccount: false,
              }),
            },
            {
              settingName: 'hostedPaymentSecurityOptions',
              settingValue: JSON.stringify({
                captcha: false,
              }),
            },
            {
              settingName:
                'hostedPaymentShippingAddressOptions',
              settingValue: JSON.stringify({
                show: false,
                required: false,
              }),
            },
            {
              settingName:
                'hostedPaymentBillingAddressOptions',
              settingValue: JSON.stringify({
                show: true,
                required: false,
              }),
            },
            {
              settingName: 'hostedPaymentCustomerOptions',
              settingValue: JSON.stringify({
                showEmail: false,
                requiredEmail: false,
                addPaymentProfile: false,
              }),
            },
            {
              settingName: 'hostedPaymentOrderOptions',
              settingValue: JSON.stringify({
                show: true,
                merchantName: 'Sentient Connect',
              }),
            },
          ],
        },
      },
    }

    const authorizeNetResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authorizeNetRequest),
      cache: 'no-store',
    })

    const rawResponse =
      await authorizeNetResponse.text()

    let paymentData: AuthorizeNetResponse

    try {
      paymentData = JSON.parse(
        rawResponse.replace(/^\uFEFF/, ''),
      ) as AuthorizeNetResponse
    } catch {
      console.error(
        'Invalid Authorize.net response:',
        rawResponse,
      )

      return NextResponse.json(
        { error: 'Invalid response from payment processor' },
        { status: 502 },
      )
    }

    const paymentError =
      paymentData.messages?.message
        ?.map((item) => item.text)
        .filter(Boolean)
        .join('; ')

    if (
      !authorizeNetResponse.ok ||
      paymentData.messages?.resultCode !== 'Ok' ||
      !paymentData.token
    ) {
      console.error(
        'Authorize.net token error:',
        paymentError,
      )

      return NextResponse.json(
        {
          error:
            paymentError ||
            'Unable to create secure checkout',
        },
        { status: 502 },
      )
    }

    const webhook =
      process.env.RESERVATION_WEBHOOK_URL

    if (webhook) {
      try {
        await fetch(webhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            terms,
            referenceId,
            invoiceNumber,
            amount: 25,
            paymentStatus: 'checkout_created',
            source: 'sentientos-ar-preorder',
            createdAt: new Date().toISOString(),
          }),
        })
      } catch (error) {
        console.error(
          'Reservation webhook failed:',
          error,
        )
      }
    }

    return NextResponse.json({
      ok: true,
      token: paymentData.token,
      hostedFormUrl,
      referenceId,
    })
  } catch (error) {
    console.error('Reserve route error:', error)

    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 },
    )
  }
}
