import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Users, BookOpen, FileText, Trophy, TrendingUp } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [
    { count: totalUsers },
    { count: totalTryouts },
    { count: totalAttempts },
    { count: premiumUsers },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('tryouts').select('*', { count: 'exact', head: true }),
    supabase.from('tryout_attempts').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_premium', true),
  ])

  const { data: recentAttempts } = await supabase
    .from('tryout_attempts')
    .select('*, profiles(name), tryouts(title)')
    .eq('status', 'completed')
    .order('finished_at', { ascending: false })
    .limit(8)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-500 text-sm mt-1">Ringkasan aktivitas platform TryoutKu</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pengguna', value: totalUsers || 0, icon: Users, color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Total Tryout', value: totalTryouts || 0, icon: FileText, color: 'bg-cyan-50 text-cyan-600' },
          { label: 'Pengerjaan Selesai', value: totalAttempts || 0, icon: Trophy, color: 'bg-green-50 text-green-600' },
          { label: 'Pengguna Premium', value: premiumUsers || 0, icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{value.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Aktivitas Terbaru */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900">Aktivitas Tryout Terbaru</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {recentAttempts && recentAttempts.length > 0 ? (
            recentAttempts.map((a: any) => (
              <div key={a.id} className="flex items-center gap-4 px-5 py-3">
                <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm flex-shrink-0">
                  {a.profiles?.name?.[0] || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{a.profiles?.name || 'Anonim'}</div>
                  <div className="text-xs text-gray-400 truncate">{a.tryouts?.title}</div>
                </div>
                <div className={`text-sm font-bold px-2 py-0.5 rounded-lg flex-shrink-0
                  ${(a.persentase || 0) >= 80 ? 'bg-green-100 text-green-700' : (a.persentase || 0) >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                  {a.persentase || 0}%
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-gray-400 text-sm">Belum ada aktivitas</div>
          )}
        </div>
      </div>
    </div>
  )
}
