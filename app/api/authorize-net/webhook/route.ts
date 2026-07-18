import {
  createHmac,
  timingSafeEqual,
} from 'node:crypto'

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EXPECTED_EVENT =
  'net.authorize.payment.authcapture.created'

const PAID_TAG =
  'SentientOS Preorder | $25 Paid'

type AuthorizeWebhook = {
  notificationId?: string
  eventType?: string
  eventDate?: string
  webhookId?: string
  payload?: {
    responseCode?: number | string
    merchantReferenceId?: string
    authAmount?: number | string
    entityName?: string
    id?: string
  }
}

type AuthorizeTransaction = {
  transId?: string
  transactionStatus?: string
  responseCode?: number | string
  authAmount?: number | string
  settleAmount?: number | string
  submitTimeUTC?: string

  order?: {
    invoiceNumber?: string
    description?: string
  }

  customer?: {
    email?: string
  }

  billTo?: {
    firstName?: string
    lastName?: string
    phoneNumber?: string
    address?: string
    city?: string
    state?: string
    zip?: string
    country?: string
  }
}

type AuthorizeTransactionResponse = {
  transaction?: AuthorizeTransaction

  messages?: {
    resultCode?: string
    message?: Array<{
      code?: string
      text?: string
    }>
  }
}

type GhlCustomField = {
  id?: string
  name?: string
  fieldKey?: string
  key?: string
  objectKey?: string
}

type GhlCustomFieldsResponse = {
  customFields?: GhlCustomField[]
  fields?: GhlCustomField[]
}

type GhlContact = {
  id?: string
  tags?: string[]
}

type GhlUpsertResponse = {
  new?: boolean
  contact?: GhlContact
  id?: string
}

function parseJson<T>(raw: string): T {
  return JSON.parse(
    raw.replace(/^\uFEFF/, ''),
  ) as T
}

function verifyAuthorizeSignature(
  rawBody: string,
  signatureHeader: string,
  signatureKey: string,
): boolean {
  const cleanKey = signatureKey
    .trim()
    .replace(/^0x/i, '')

  const receivedHex = signatureHeader
    .trim()
    .replace(/^sha512=/i, '')
    .toLowerCase()

  if (
    !/^[0-9a-f]+$/i.test(cleanKey) ||
    !/^[0-9a-f]+$/i.test(receivedHex)
  ) {
    return false
  }

  const expectedHex = createHmac(
    'sha512',
    Buffer.from(cleanKey, 'hex'),
  )
    .update(rawBody, 'utf8')
    .digest('hex')

  const expectedBuffer =
    Buffer.from(expectedHex, 'hex')

  const receivedBuffer =
    Buffer.from(receivedHex, 'hex')

  if (
    expectedBuffer.length !==
    receivedBuffer.length
  ) {
    return false
  }

  return timingSafeEqual(
    expectedBuffer,
    receivedBuffer,
  )
}

function normalizeFieldName(
  value: string,
): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

function findCustomField(
  fields: GhlCustomField[],
  requestedName: string,
): GhlCustomField | undefined {
  const target =
    normalizeFieldName(requestedName)

  return fields.find((field) => {
    const possibleNames = [
      field.name,
      field.fieldKey,
      field.key,
      field.objectKey,
    ].filter(
      (value): value is string =>
        typeof value === 'string',
    )

    return possibleNames.some((value) => {
      const normalized =
        normalizeFieldName(value)

      return (
        normalized === target ||
        normalized.endsWith(target)
      )
    })
  })
}

function ghlHeaders(
  token: string,
): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Version: 'v3',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
}

async function getAuthorizeTransaction(
  transactionId: string,
  apiLoginId: string,
  transactionKey: string,
  production: boolean,
): Promise<AuthorizeTransaction> {
  const apiUrl = production
    ? 'https://api.authorize.net/xml/v1/request.api'
    : 'https://apitest.authorize.net/xml/v1/request.api'

  const response = await fetch(apiUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },

    body: JSON.stringify({
      getTransactionDetailsRequest: {
        merchantAuthentication: {
          name: apiLoginId,
          transactionKey,
        },

        transId: transactionId,
      },
    }),

    cache: 'no-store',
  })

  const rawResponse =
    await response.text()

  let data: AuthorizeTransactionResponse

  try {
    data =
      parseJson<AuthorizeTransactionResponse>(
        rawResponse,
      )
  } catch {
    console.error(
      'Authorize.net returned invalid transaction JSON',
    )

    throw new Error(
      'Invalid Authorize.net transaction response',
    )
  }

  const processorError =
    data.messages?.message
      ?.map((message) => message.text)
      .filter(Boolean)
      .join('; ')

  if (
    !response.ok ||
    data.messages?.resultCode !== 'Ok' ||
    !data.transaction
  ) {
    throw new Error(
      processorError ||
        'Unable to retrieve Authorize.net transaction',
    )
  }

  return data.transaction
}

async function getGhlCustomFields(
  token: string,
  locationId: string,
): Promise<GhlCustomField[]> {
  const url =
    `https://services.leadconnectorhq.com/locations/` +
    `${encodeURIComponent(locationId)}/customFields?model=contact`

  const response = await fetch(url, {
    method: 'GET',
    headers: ghlHeaders(token),
    cache: 'no-store',
  })

  const rawResponse =
    await response.text()

  if (!response.ok) {
    throw new Error(
      `Unable to retrieve GHL custom fields: ${rawResponse}`,
    )
  }

  const data =
    parseJson<GhlCustomFieldsResponse>(
      rawResponse,
    )

  if (Array.isArray(data.customFields)) {
    return data.customFields
  }

  if (Array.isArray(data.fields)) {
    return data.fields
  }

  return []
}

function buildCustomFieldValues(
  fields: GhlCustomField[],
  values: Array<{
    name: string
    value: string | number
  }>,
): Array<{
  id: string
  fieldValue: string | number
}> {
  return values.flatMap(
    ({ name, value }) => {
      const field =
        findCustomField(fields, name)

      if (!field?.id) {
        console.warn(
          `GHL custom field not found: ${name}`,
        )

        return []
      }

      return [
        {
          id: field.id,
          fieldValue: value,
        },
      ]
    },
  )
}

async function upsertGhlContact(args: {
  token: string
  locationId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  customFields: Array<{
    id: string
    fieldValue: string | number
  }>
}): Promise<GhlUpsertResponse> {
  const response = await fetch(
    'https://services.leadconnectorhq.com/contacts/upsert',
    {
      method: 'POST',

      headers: ghlHeaders(args.token),

      body: JSON.stringify({
        locationId: args.locationId,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        phone: args.phone || undefined,
        source: 'presale.sentientconnect.io',
        customFields: args.customFields,
      }),

      cache: 'no-store',
    },
  )

  const rawResponse =
    await response.text()

  let data: GhlUpsertResponse

  try {
    data =
      parseJson<GhlUpsertResponse>(
        rawResponse,
      )
  } catch {
    throw new Error(
      `GHL returned invalid contact JSON: ${rawResponse}`,
    )
  }

  if (!response.ok) {
    throw new Error(
      `GHL contact upsert failed: ${rawResponse}`,
    )
  }

  return data
}

async function addPaidTag(
  token: string,
  contactId: string,
): Promise<void> {
  const response = await fetch(
    `https://services.leadconnectorhq.com/contacts/${encodeURIComponent(
      contactId,
    )}/tags`,
    {
      method: 'POST',

      headers: ghlHeaders(token),

      body: JSON.stringify({
        tags: [PAID_TAG],
      }),

      cache: 'no-store',
    },
  )

  const rawResponse =
    await response.text()

  if (!response.ok) {
    throw new Error(
      `Unable to add GHL paid tag: ${rawResponse}`,
    )
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'authorize-net-webhook',
  })
}

export async function POST(
  request: Request,
) {
  const rawBody =
    await request.text()

  const signatureHeader =
    request.headers.get(
      'x-anet-signature',
    )

  const apiLoginId =
    process.env
      .AUTHORIZE_NET_API_LOGIN_ID

  const transactionKey =
    process.env
      .AUTHORIZE_NET_TRANSACTION_KEY

  const signatureKey =
    process.env
      .AUTHORIZE_NET_SIGNATURE_KEY

  const environment =
    process.env
      .AUTHORIZE_NET_ENVIRONMENT
      ?.toLowerCase() || 'sandbox'

  const ghlToken =
    process.env
      .GHL_PRIVATE_INTEGRATION_TOKEN

  const ghlLocationId =
    process.env.GHL_LOCATION_ID

  if (
    !apiLoginId ||
    !transactionKey ||
    !signatureKey ||
    !ghlToken ||
    !ghlLocationId
  ) {
    console.error(
      'Webhook environment variables are incomplete',
    )

    return NextResponse.json(
      {
        error:
          'Webhook is not configured',
      },
      {
        status: 500,
      },
    )
  }

  if (!signatureHeader) {
    return NextResponse.json(
      {
        error:
          'Missing Authorize.net signature',
      },
      {
        status: 401,
      },
    )
  }

  const signatureIsValid =
    verifyAuthorizeSignature(
      rawBody,
      signatureHeader,
      signatureKey,
    )

  if (!signatureIsValid) {
    console.error(
      'Authorize.net webhook signature verification failed',
    )

    return NextResponse.json(
      {
        error:
          'Invalid webhook signature',
      },
      {
        status: 401,
      },
    )
  }

  let webhook: AuthorizeWebhook

  try {
    webhook =
      parseJson<AuthorizeWebhook>(
        rawBody,
      )
  } catch {
    return NextResponse.json(
      {
        error:
          'Invalid webhook body',
      },
      {
        status: 400,
      },
    )
  }

  if (
    webhook.eventType !==
    EXPECTED_EVENT
  ) {
    return NextResponse.json({
      ok: true,
      ignored: true,
      reason:
        'Unsupported event type',
    })
  }

  if (
    webhook.payload?.entityName !==
      'transaction' ||
    !webhook.payload.id
  ) {
    return NextResponse.json(
      {
        error:
          'Missing transaction ID',
      },
      {
        status: 400,
      },
    )
  }

  try {
    const production =
      environment === 'production'

    const transaction =
      await getAuthorizeTransaction(
        webhook.payload.id,
        apiLoginId,
        transactionKey,
        production,
      )

    const transactionId = String(
      transaction.transId ||
        webhook.payload.id,
    ).trim()

    const transactionStatus = String(
      transaction.transactionStatus ||
        '',
    ).trim()

    const responseCode = String(
      transaction.responseCode ??
        webhook.payload.responseCode ??
        '',
    ).trim()

    const amount = Number(
      transaction.authAmount ??
        webhook.payload.authAmount ??
        transaction.settleAmount ??
        0,
    )

    const invoiceNumber = String(
      transaction.order
        ?.invoiceNumber || '',
    ).trim()

    const successfulStatuses =
      new Set([
        'capturedPendingSettlement',
        'settledSuccessfully',
      ])

    const validPayment =
      responseCode === '1' &&
      successfulStatuses.has(
        transactionStatus,
      ) &&
      Math.abs(amount - 25) <=
        0.001 &&
      invoiceNumber.startsWith(
        'SENT-',
      )

    if (!validPayment) {
      console.warn(
        'Authorize.net transaction ignored',
        {
          transactionId,
          transactionStatus,
          responseCode,
          amount,
          invoiceNumber,
        },
      )

      return NextResponse.json({
        ok: true,
        ignored: true,
        reason:
          'Transaction did not meet preorder requirements',
      })
    }

    const email = String(
      transaction.customer?.email ||
        '',
    )
      .trim()
      .toLowerCase()

    if (!email) {
      throw new Error(
        'Successful transaction did not include an email address',
      )
    }

    const firstName = String(
      transaction.billTo
        ?.firstName || '',
    ).trim()

    const lastName = String(
      transaction.billTo
        ?.lastName || '',
    ).trim()

    const phone = String(
      transaction.billTo
        ?.phoneNumber || '',
    ).trim()

    const paymentDate =
      transaction.submitTimeUTC ||
      webhook.eventDate ||
      new Date().toISOString()

    let ghlFields:
      GhlCustomField[] = []

    try {
      ghlFields =
        await getGhlCustomFields(
          ghlToken,
          ghlLocationId,
        )
    } catch (error) {
      console.error(
        'Unable to map GHL custom fields:',
        error,
      )
    }

    const customFields =
      buildCustomFieldValues(
        ghlFields,
        [
          {
            name:
              'Preorder Product',
            value:
              'SentientOS™ AR Glasses',
          },
          {
            name:
              'Preorder Deposit Amount',
            value: 25,
          },
          {
            name:
              'Preorder Payment Status',
            value: 'Paid',
          },
          {
            name:
              'Preorder Payment Provider',
            value: 'Authorize.net',
          },
          {
            name:
              'Preorder Payment Date',
            value: paymentDate,
          },
          {
            name:
              'Preorder Transaction ID',
            value: transactionId,
          },
          {
            name:
              'Preorder Reference ID',
            value:
              webhook.payload
                .merchantReferenceId ||
              invoiceNumber,
          },
          {
            name:
              'Preorder Source',
            value:
              'presale.sentientconnect.io',
          },
        ],
      )

    const contactResult =
      await upsertGhlContact({
        token: ghlToken,
        locationId: ghlLocationId,
        firstName,
        lastName,
        email,
        phone,
        customFields,
      })

    const contactId =
      contactResult.contact?.id ||
      contactResult.id

    if (!contactId) {
      throw new Error(
        'GHL did not return a contact ID',
      )
    }

    const existingTags =
      contactResult.contact?.tags ||
      []

    const alreadyPaid =
      existingTags.some(
        (tag) =>
          tag.toLowerCase() ===
          PAID_TAG.toLowerCase(),
      )

    if (!alreadyPaid) {
      await addPaidTag(
        ghlToken,
        contactId,
      )
    }

    console.log(
      'SentientOS preorder payment processed',
      {
        transactionId,
        invoiceNumber,
        contactId,
        duplicate: alreadyPaid,
      },
    )

    return NextResponse.json({
      ok: true,
      processed: true,
      duplicate: alreadyPaid,
    })
  } catch (error) {
    console.error(
      'Authorize.net webhook processing failed:',
      error,
    )

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Webhook processing failed',
      },
      {
        status: 500,
      },
    )
  }
}
