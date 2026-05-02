'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { PlayCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase'

export default function StartTryoutButton({ tryoutId, userId }: { tryoutId: string; userId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleStart() {
    setLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('tryout_attempts')
      .insert({
        user_id: userId,
        tryout_id: tryoutId,
        started_at: new Date().toISOString(),
        status: 'in_progress',
        jawaban: {},
      })
      .select('id')
      .single()

    if (error || !data) {
      setLoading(false)
      alert('Gagal memulai tryout. Coba lagi.')
      return
    }

    router.push(`/dashboard/tryout/${tryoutId}/kerjakan/${data.id}`)
  }

  return (
    <Button onClick={handleStart} loading={loading} size="lg" className="w-full gap-2">
      <PlayCircle className="w-5 h-5" />
      Mulai Tryout Sekarang
    </Button>
  )
}
