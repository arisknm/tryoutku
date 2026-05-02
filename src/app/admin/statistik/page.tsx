import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Users, Trophy, Star, TrendingUp } from 'lucide-react'

export default async function AdminStatistikPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [
    { count: totalUsers },
    { count: premiumUsers },
    { count: totalAttempts },
    { count: totalTryouts },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_premium', true),
    supabase.from('tryout_attempts').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
    supabase.from('tryouts').select('*', { count: 'exact', head: true }).eq('is_active', true),
  ])

  const { data: topTryouts } = await supabase
    .from('tryout_attempts')
    .select('tryout_id, tryouts(title)')
    .eq('status', 'completed')
    .limit(100)

  const countMap: Record<string, { title: string; count: number }> = {}
  for (const a of topTryouts || []) {
    if (!a.tryout_id) continue
    if (!countMap[a.tryout_id]) countMap[a.tryout_id] = { title: (a as any).tryouts?.title || '-', count: 0 }
    countMap[a.tryout_id].count++
  }
  const ranked = Object.entries(countMap).sort((a, b) => b[1].count - a[1].count).slice(0, 5)

  const { data: recentPremium } = await supabase
    .from('payments')
    .select('*, profiles(name, email)')
    .eq('status', 'paid')
    .order('created_at', { ascending: false })
    .limit(8)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Statistik Platform</h1>
        <p className="text-gray-500 text-sm mt-1">Ringkasan performa TryoutKu</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pengguna', value: totalUsers || 0, icon: Users, color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Pengguna Premium', value: premiumUsers || 0, icon: Star, color: 'bg-amber-50 text-amber-600' },
          { label: 'Tryout Dikerjakan', value: totalAttempts || 0, icon: Trophy, color: 'bg-green-50 text-green-600' },
          { label: 'Tryout Aktif', value: totalTryouts || 0, icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
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

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">Tryout Terpopuler</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {ranked.length > 0 ? ranked.map(([id, { title, count }], i) => (
              <div key={id} className="flex items-center gap-4 px-5 py-3">
                <span className="w-7 h-7 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-sm font-bold">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{title}</div>
                </div>
                <span className="text-sm font-bold text-indigo-600">{count}x</span>
              </div>
            )) : (
              <div className="py-8 text-center text-gray-400 text-sm">Belum ada data</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">Pembayaran Premium Terbaru</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentPremium && recentPremium.length > 0 ? recentPremium.map((p: any) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-sm flex-shrink-0">
                  {p.profiles?.name?.[0] || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{p.profiles?.name || '-'}</div>
                  <div className="text-xs text-gray-400">{p.days} hari · {new Date(p.created_at).toLocaleDateString('id-ID')}</div>
                </div>
                <span className="text-sm font-bold text-green-600">+Rp{(p.amount / 1000).toFixed(0)}rb</span>
              </div>
            )) : (
              <div className="py-8 text-center text-gray-400 text-sm">Belum ada pembayaran</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
