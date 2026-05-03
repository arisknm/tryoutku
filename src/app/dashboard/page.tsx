import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Trophy, BookOpen, Clock, Star, ArrowRight, Target, Flame, FileText, TrendingUp } from 'lucide-react'
import AdBanner from '@/components/ads/AdBanner'

function StatusBadge({ isFree, isNew }: { isFree: boolean; isNew?: boolean }) {
  if (isNew) return (
    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1">
      <Flame className="w-3 h-3 text-orange-500" /> BARU
    </span>
  )
  if (isFree) return (
    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">GRATIS</span>
  )
  return (
    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
      <Star className="w-3 h-3 fill-current" /> PREMIUM
    </span>
  )
}

function MapelBadge({ mapel }: { mapel: string }) {
  const colors: Record<string, string> = {
    'Matematika': 'bg-blue-50 text-blue-700',
    'Fisika': 'bg-cyan-50 text-cyan-700',
    'Kimia': 'bg-green-50 text-green-700',
    'Biologi': 'bg-emerald-50 text-emerald-700',
    'Bahasa Indonesia': 'bg-violet-50 text-violet-700',
    'Bahasa Inggris': 'bg-indigo-50 text-indigo-700',
    'Sejarah': 'bg-amber-50 text-amber-700',
    'Geografi': 'bg-teal-50 text-teal-700',
    'Ekonomi': 'bg-orange-50 text-orange-700',
    'Sosiologi': 'bg-pink-50 text-pink-700',
    'IPA': 'bg-sky-50 text-sky-700',
    'IPS': 'bg-rose-50 text-rose-700',
    'PPKn': 'bg-red-50 text-red-700',
    'TPS': 'bg-purple-50 text-purple-700',
  }
  const cls = colors[mapel] || 'bg-gray-100 text-gray-600'
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${cls}`}>{mapel}</span>
}

const TABS = [
  { key: 'semua', label: 'Semua' },
  { key: 'UTBK', label: 'UTBK/SNBT' },
  { key: 'SMA', label: 'SMA' },
  { key: 'SMP', label: 'SMP' },
  { key: 'SD', label: 'SD' },
]

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const params = await searchParams
  const activeTab = params?.tab || 'semua'

  const { data: recentAttempts } = await supabase
    .from('tryout_attempts')
    .select('*, tryouts(title, mata_pelajaran, jenjang)')
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .order('finished_at', { ascending: false })
    .limit(5)

  // Query tryouts based on tab
  let tryoutQuery = supabase.from('tryouts').select('*').eq('is_active', true)

  if (activeTab === 'UTBK') {
    tryoutQuery = tryoutQuery.ilike('title', '%UTBK%')
  } else if (activeTab === 'SMA') {
    tryoutQuery = tryoutQuery.eq('jenjang', 'SMA').not('title', 'ilike', '%UTBK%')
  } else if (activeTab === 'SMP') {
    tryoutQuery = tryoutQuery.eq('jenjang', 'SMP')
  } else if (activeTab === 'SD') {
    tryoutQuery = tryoutQuery.eq('jenjang', 'SD')
  }

  const { data: tryouts } = await tryoutQuery.order('created_at', { ascending: false }).limit(12)

  const totalAttempts = recentAttempts?.length || 0
  const avgScore = recentAttempts && recentAttempts.length > 0
    ? Math.round(recentAttempts.reduce((sum, a) => sum + (a.persentase || 0), 0) / recentAttempts.length)
    : 0

  const isPremium = profile?.is_premium

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Halo, {profile?.name?.split(' ')[0] || 'Siswa'}! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {profile?.jenjang
              ? `${profile.jenjang} · Kelas ${profile.kelas} — Selamat belajar hari ini`
              : 'Selamat belajar hari ini'}
          </p>
        </div>
        {!isPremium && (
          <Link href="/dashboard/premium"
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-sm">
            <Star className="w-3.5 h-3.5 fill-current" /> Upgrade Premium
          </Link>
        )}
      </div>

      {/* Iklan hanya non-premium */}
      {!isPremium && (
        <AdBanner slot="1234567890" format="horizontal" className="w-full" />
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Tryout Selesai', value: totalAttempts, icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
          { label: 'Rata-rata Skor', value: `${avgScore}%`, icon: Target, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Peringkat', value: '#—', icon: Trophy, color: 'bg-amber-50 text-amber-600' },
          { label: 'Streak Belajar', value: '0 hari', icon: TrendingUp, color: 'bg-violet-50 text-violet-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center mb-2.5`}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <div className="text-xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Tryout Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Tryout Tersedia</h2>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-hide">
          {TABS.map(tab => (
            <Link
              key={tab.key}
              href={tab.key === 'semua' ? '/dashboard' : `/dashboard?tab=${tab.key}`}
              className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full border transition-all
                ${activeTab === tab.key
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Tryout Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tryouts && tryouts.length > 0 ? (
            tryouts.map((tryout: any, idx: number) => (
              <Link key={tryout.id} href={`/dashboard/tryout/${tryout.id}`}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <MapelBadge mapel={tryout.mata_pelajaran} />
                  <StatusBadge isFree={tryout.is_free} isNew={idx < 3} />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {tryout.title}
                </h3>
                {tryout.description && (
                  <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">{tryout.description}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-gray-50">
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {tryout.jumlah_soal} Soal</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {tryout.durasi_menit} Menit</span>
                  <span className="ml-auto text-blue-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    Mulai <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-16 text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">Belum ada tryout di kategori ini.</p>
              <p className="text-xs mt-1">Coba pilih kategori lain atau lihat semua tryout.</p>
            </div>
          )}
        </div>
      </div>

      {/* Riwayat */}
      {recentAttempts && recentAttempts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Riwayat Terakhir</h2>
            <Link href="/dashboard/hasil" className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {recentAttempts.map((attempt: any, i: number) => {
              const pct = attempt.persentase || 0
              const scoreColor = pct >= 80 ? 'bg-emerald-100 text-emerald-700' : pct >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
              return (
                <div key={attempt.id} className={`flex items-center gap-4 p-4 ${i < recentAttempts.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${scoreColor}`}>
                    {pct}%
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">{attempt.tryouts?.title || 'Tryout'}</div>
                    <div className="text-xs text-gray-400">{attempt.tryouts?.mata_pelajaran} · {new Date(attempt.finished_at).toLocaleDateString('id-ID')}</div>
                  </div>
                  {isPremium ? (
                    <Link href={`/dashboard/hasil/${attempt.id}`} className="text-xs text-blue-600 font-semibold hover:text-blue-700">
                      Detail
                    </Link>
                  ) : (
                    <Link href="/dashboard/premium" className="text-xs text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Lihat Detail
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Upgrade Banner untuk non-premium */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-bold text-lg mb-1">Buka Pembahasan Lengkap</div>
            <p className="text-blue-200 text-sm">Upgrade Premium untuk akses pembahasan detail, download PDF, dan tanpa iklan.</p>
          </div>
          <Link href="/dashboard/premium"
            className="flex-shrink-0 bg-white text-blue-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow-sm">
            Upgrade Sekarang
          </Link>
        </div>
      )}
    </div>
  )
}
