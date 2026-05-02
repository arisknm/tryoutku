import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { order_id, status_code, gross_amount, signature_key, transaction_status, custom_field1: userId, custom_field2: days } = body

  const serverKey = process.env.MIDTRANS_SERVER_KEY!
  const expectedSig = crypto.createHash('sha512').update(`${order_id}${status_code}${gross_amount}${serverKey}`).digest('hex')

  if (signature_key !== expectedSig) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (transaction_status === 'settlement' || transaction_status === 'capture') {
    const supabase = await createServerSupabaseClient()
    const { data: profile } = await supabase.from('profiles').select('premium_until').eq('id', userId).single()

    const now = new Date()
    const base = profile?.premium_until && new Date(profile.premium_until) > now ? new Date(profile.premium_until) : now
    const newExpiry = new Date(base.getTime() + Number(days) * 24 * 60 * 60 * 1000)

    await supabase.from('profiles').update({ is_premium: true, premium_until: newExpiry.toISOString() }).eq('id', userId)
    await supabase.from('payments').insert({ user_id: userId, order_id, amount: gross_amount, status: 'paid', days: Number(days) })
  }

  return NextResponse.json({ ok: true })
}
