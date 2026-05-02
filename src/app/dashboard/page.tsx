import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Trophy, BookOpen, Clock, Star, ArrowRight, TrendingUp, Target } from 'lucide-react'
import AdBanner from '@/components/ads/AdBanner'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: recentAttempts } = await supabase
    .from('tryout_attempts')
    .select('*, tryouts(title, mata_pelajaran, jenjang)')
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .order('finished_at', { ascending: false })
    .limit(5)

  const { data: availableTryouts } = await supabase
    .from('tryouts')
    .select('*')
    .eq('is_active', true)
    .eq('jenjang', profile?.jenjang || 'SMA')
    .limit(6)

  const totalAttempts = recentAttempts?.length || 0
  const avgScore = recentAttempts && recentAttempts.length > 0
    ? Math.round(recentAttempts.reduce((sum, a) => sum + (a.persentase || 0), 0) / recentAttempts.length)
    : 0

  const isPremium = profile?.is_premium

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Halo, {profile?.name?.split(' ')[0] || 'Siswa'}! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {profile?.jenjang ? `${profile.jenjang} · Kelas ${profile.kelas}` : 'Selamat belajar hari ini'}
          </p>
        </div>
        {!isPremium && (
          <Link href="/dashboard/premium"
            className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-amber-100 transition-colors">
            <Star className="w-4 h-4 fill-current" /> Upgrade Premium
          </Link>
        )}
      </div>

      {/* Iklan (hanya untuk non-premium) */}
      {!isPremium && (
        <AdBanner slot="1234567890" format="horizontal" className="w-full" />
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Tryout Selesai', value: totalAttempts, icon: BookOpen, color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Rata-rata Skor', value: `${avgScore}%`, icon: Target, color: 'bg-green-50 text-green-600' },
          { label: 'Peringkat', value: '#—', icon: Trophy, color: 'bg-amber-50 text-amber-600' },
          { label: 'Waktu Belajar', value: '0 jam', icon: Clock, color: 'bg-purple-50 text-purple-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Tryout Tersedia */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Tryout untuk Kamu</h2>
          <Link href="/dashboard/tryout" className="text-sm text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-700">
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableTryouts && availableTryouts.length > 0 ? (
            availableTryouts.map((tryout: any) => (
              <Link key={tryout.id} href={`/dashboard/tryout/${tryout.id}`}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg">{tryout.mata_pelajaran}</span>
                  <span className="text-xs text-gray-400">{tryout.durasi_menit} menit</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2">{tryout.title}</h3>
                <p className="text-xs text-gray-400">{tryout.jumlah_soal} soal · {tryout.jenjang}</p>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Belum ada tryout tersedia untuk jenjangmu.</p>
            </div>
          )}
        </div>
      </div>

      {/* Riwayat */}
      {recentAttempts && recentAttempts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Riwayat Terakhir</h2>
            <Link href="/dashboard/hasil" className="text-sm text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-700">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {recentAttempts.map((attempt: any, i: number) => (
              <div key={attempt.id} className={`flex items-center gap-4 p-4 ${i < recentAttempts.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0
                  ${(attempt.persentase || 0) >= 80 ? 'bg-green-100 text-green-700' : (attempt.persentase || 0) >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                  {attempt.persentase || 0}%
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{attempt.tryouts?.title || 'Tryout'}</div>
                  <div className="text-xs text-gray-400">{attempt.tryouts?.mata_pelajaran} · {new Date(attempt.finished_at).toLocaleDateString('id-ID')}</div>
                </div>
                {isPremium ? (
                  <Link href={`/dashboard/hasil/${attempt.id}`} className="text-xs text-indigo-600 font-medium hover:text-indigo-700">Detail</Link>
                ) : (
                  <Link href="/dashboard/premium" className="text-xs text-amber-600 font-medium hover:text-amber-700 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Lihat Detail
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
