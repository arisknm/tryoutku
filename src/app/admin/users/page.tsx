import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Users, Star } from 'lucide-react'
import Badge from '@/components/ui/Badge'

export default async function AdminUsersPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: users } = await supabase
    .from('profiles')
    .select('*, tryout_attempts(count)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengguna</h1>
        <p className="text-gray-500 text-sm mt-1">{users?.length || 0} pengguna terdaftar</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Nama</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Jenjang</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Sekolah</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Bergabung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users && users.length > 0 ? (
                users.map((u: any) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm flex-shrink-0">
                          {u.name?.[0] || '?'}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{u.name}</div>
                          <div className="text-xs text-gray-400">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {u.jenjang ? <Badge variant="info">{u.jenjang} · Kelas {u.kelas}</Badge> : <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{u.sekolah || '—'}</td>
                    <td className="px-4 py-3">
                      {u.is_premium
                        ? <Badge variant="warning"><Star className="w-3 h-3 mr-1 fill-current inline" />Premium</Badge>
                        : <Badge>Gratis</Badge>}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(u.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="py-12 text-center text-gray-400">Belum ada pengguna.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
