import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import TryoutForm from '@/components/admin/TryoutForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditTryoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: tryout } = await supabase.from('tryouts').select('*').eq('id', id).single()
  if (!tryout) redirect('/admin/tryout')

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/admin/tryout" className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Tryout</h1>
        <p className="text-gray-500 text-sm mt-1 truncate">{tryout.title}</p>
      </div>
      <TryoutForm tryout={tryout} />
    </div>
  )
}
