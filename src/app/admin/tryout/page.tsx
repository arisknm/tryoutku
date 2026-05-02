import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import DeleteTryoutButton from '@/components/admin/DeleteTryoutButton'
import ToggleActiveButton from '@/components/admin/ToggleActiveButton'

export default async function AdminTryoutPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: tryouts } = await supabase.from('tryouts').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Tryout</h1>
          <p className="text-gray-500 text-sm mt-1">{tryouts?.length || 0} tryout tersedia</p>
        </div>
        <Link href="/admin/tryout/buat">
          <Button><Plus className="w-4 h-4" /> Buat Tryout</Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Judul</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Jenjang</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Mapel</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Soal</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tryouts && tryouts.length > 0 ? (
                tryouts.map((t: any) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 max-w-xs truncate">{t.title}</div>
                      <div className="text-xs text-gray-400">{t.durasi_menit} menit</div>
                    </td>
                    <td className="px-4 py-3"><Badge variant="info">{t.jenjang}</Badge></td>
                    <td className="px-4 py-3 text-gray-600">{t.mata_pelajaran}</td>
                    <td className="px-4 py-3 text-gray-600">{t.jumlah_soal}</td>
                    <td className="px-4 py-3">
                      <Badge variant={t.is_active ? 'success' : 'default'}>{t.is_active ? 'Aktif' : 'Nonaktif'}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/tryout/${t.id}/edit`} className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/soal?tryout=${t.id}`} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <ToggleActiveButton tryoutId={t.id} isActive={t.is_active} />
                        <DeleteTryoutButton tryoutId={t.id} title={t.title} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="py-12 text-center text-gray-400">Belum ada tryout. Buat yang pertama!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
