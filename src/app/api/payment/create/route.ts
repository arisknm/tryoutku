import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const { userId, days, price } = await req.json()

  const supabase = await createServerSupabaseClient()
  const { data: profile } = await supabase.from('profiles').select('email, name').eq('id', userId).single()

  const orderId = `PREMIUM-${userId.slice(0, 8)}-${Date.now()}`

  const body = {
    transaction_details: { order_id: orderId, gross_amount: price },
    customer_details: { email: profile?.email, first_name: profile?.name },
    item_details: [{ id: `premium-${days}d`, name: `TryoutKu Premium ${days} Hari`, price, quantity: 1 }],
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/premium/success`,
      error: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/premium`,
    },
    custom_field1: userId,
    custom_field2: String(days),
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY!
  const auth = Buffer.from(`${serverKey}:`).toString('base64')
  const isSandbox = process.env.MIDTRANS_ENV === 'sandbox'
  const url = isSandbox
    ? 'https://app.sandbox.midtrans.com/snap/v1/transactions'
    : 'https://app.midtrans.com/snap/v1/transactions'

  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data)
}
