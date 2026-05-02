import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import SoalForm from '@/components/admin/SoalForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditSoalPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tryout?: string }>
}) {
  const { id } = await params
  const sp = await searchParams
  const supabase = await createServerSupabaseClient()
  const { data: soal } = await supabase.from('questions').select('*').eq('id', id).single()
  if (!soal) redirect('/admin/soal')

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href={`/admin/soal?tryout=${sp.tryout || soal.tryout_id}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Soal
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Soal #{soal.nomor}</h1>
      </div>
      <SoalForm tryoutId={soal.tryout_id} soal={soal} />
    </div>
  )
}
