'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { Star } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'

interface Props {
  userId: string
  days: number
  price: number
  label: string
}

export default function PremiumCheckoutButton({ userId, days, price, label }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, days, price }),
      })
      const data = await res.json()
      if (data.redirect_url) {
        window.location.href = data.redirect_url
      } else {
        alert('Gagal membuat pembayaran. Coba lagi.')
      }
    } catch {
      alert('Terjadi kesalahan. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleCheckout} loading={loading} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
      <Star className="w-4 h-4 fill-current" /> Beli {label} — {formatRupiah(price)}
    </Button>
  )
}
