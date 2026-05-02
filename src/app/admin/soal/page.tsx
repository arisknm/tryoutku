import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import DeleteSoalButton from '@/components/admin/DeleteSoalButton'

export default async function AdminSoalPage({
  searchParams,
}: {
  searchParams: Promise<{ tryout?: string }>
}) {
  const params = await searchParams
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: tryouts } = await supabase.from('tryouts').select('id, title').order('created_at', { ascending: false })

  const selectedTryoutId = params.tryout || tryouts?.[0]?.id

  const { data: questions } = selectedTryoutId
    ? await supabase.from('questions').select('*').eq('tryout_id', selectedTryoutId).order('nomor')
    : { data: [] }

  const selectedTryout = tryouts?.find(t => t.id === selectedTryoutId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Soal</h1>
          <p className="text-gray-500 text-sm mt-1">{questions?.length || 0} soal</p>
        </div>
        {selectedTryoutId && (
          <Link href={`/admin/soal/tambah?tryout=${selectedTryoutId}`}>
            <Button><Plus className="w-4 h-4" /> Tambah Soal</Button>
          </Link>
        )}
      </div>

      {/* Pilih Tryout */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Tryout</label>
        <select
          defaultValue={selectedTryoutId || ''}
          onChange={e => window.location.href = `/admin/soal?tryout=${e.target.value}`}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
          {tryouts?.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>

      {/* Daftar Soal */}
      {selectedTryoutId && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {questions && questions.length > 0 ? (
              questions.map((q: any) => (
                <div key={q.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0">{q.nomor}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 line-clamp-2 font-medium">{q.soal}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400">Jawaban: <span className="font-semibold text-indigo-600 uppercase">{q.jawaban_benar}</span></span>
                      <span className="text-xs text-gray-400">{q.poin} poin</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link href={`/admin/soal/${q.id}/edit?tryout=${selectedTryoutId}`} className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-500 transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <DeleteSoalButton soalId={q.id} />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-gray-400">
                <p className="text-sm">Belum ada soal. Tambahkan soal pertama!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
