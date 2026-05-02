'use client'
import { useState } from 'react'
import { ToggleLeft, ToggleRight } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ToggleActiveButton({ tryoutId, isActive }: { tryoutId: string; isActive: boolean }) {
  const [active, setActive] = useState(isActive)
  const router = useRouter()

  async function toggle() {
    const supabase = createClient()
    await supabase.from('tryouts').update({ is_active: !active }).eq('id', tryoutId)
    setActive(!active)
    router.refresh()
  }

  return (
    <button onClick={toggle} className={`p-1.5 rounded-lg transition-colors ${active ? 'text-green-500 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}>
      {active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
    </button>
  )
}
