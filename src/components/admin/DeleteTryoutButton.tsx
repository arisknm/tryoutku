'use client'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DeleteTryoutButton({ tryoutId, title }: { tryoutId: string; title: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`Hapus tryout "${title}"? Semua soal dan riwayat akan ikut terhapus.`)) return
    setLoading(true)
    const supabase = createClient()
    await supabase.from('questions').delete().eq('tryout_id', tryoutId)
    await supabase.from('tryout_attempts').delete().eq('tryout_id', tryoutId)
    await supabase.from('tryouts').delete().eq('id', tryoutId)
    router.refresh()
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors">
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
