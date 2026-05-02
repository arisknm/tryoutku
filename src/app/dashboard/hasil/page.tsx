import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Trophy, Star, Lock, CheckCircle, XCircle } from 'lucide-react'
import { getGradeBg, getGradeLabel } from '@/lib/utils'

export default async function HasilListPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('is_premium').eq('id', user.id).single()
  const { data: attempts } = await supabase
    .from('tryout_attempts')
    .select('*, tryouts(title, mata_pelajaran, jenjang)')
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .order('finished_at', { ascending: false })

  const isPremium = profile?.is_premium

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Riwayat Hasil</h1>
        <p className="text-gray-500 text-sm mt-1">Semua hasil tryout yang pernah kamu kerjakan</p>
      </div>

      {!attempts || attempts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Trophy className="w-14 h-14 mx-auto mb-3 opacity-30" />
          <p className="font-medium">Belum ada hasil tryout.</p>
          <Link href="/dashboard/tryout" className="mt-3 inline-block text-sm text-indigo-600 font-semibold hover:text-indigo-700">Mulai Tryout →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {attempts.map((a: any) => (
            <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 font-bold
                ${(a.persentase || 0) >= 80 ? 'bg-green-100 text-green-700' : (a.persentase || 0) >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                <span className="text-lg">{a.persentase || 0}%</span>
                <span className="text-xs font-normal opacity-70">{getGradeLabel(a.persentase || 0).split(' ')[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-sm truncate">{a.tryouts?.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {a.tryouts?.mata_pelajaran} · {a.tryouts?.jenjang} · {new Date(a.finished_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="text-xs text-gray-400 mt-1">{a.skor}/{a.skor_maksimal} poin</div>
              </div>
              {isPremium ? (
                <Link href={`/dashboard/hasil/${a.id}`} className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap">
                  Lihat Detail
                </Link>
              ) : (
                <Link href="/dashboard/premium" className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-3 py-1.5 rounded-xl font-semibold hover:bg-amber-100 transition-colors whitespace-nowrap flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Detail
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
