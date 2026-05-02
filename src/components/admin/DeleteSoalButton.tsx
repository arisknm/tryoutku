'use client'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DeleteSoalButton({ soalId }: { soalId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Hapus soal ini?')) return
    setLoading(true)
    const supabase = createClient()
    const { data: q } = await supabase.from('questions').select('tryout_id').eq('id', soalId).single()
    await supabase.from('questions').delete().eq('id', soalId)
    if (q?.tryout_id) {
      const { count } = await supabase.from('questions').select('*', { count: 'exact', head: true }).eq('tryout_id', q.tryout_id)
      await supabase.from('tryouts').update({ jumlah_soal: count || 0 }).eq('id', q.tryout_id)
    }
    router.refresh()
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors">
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
