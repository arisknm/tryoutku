import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Clock, BookOpen, ArrowLeft, Star, CheckCircle, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import StartTryoutButton from '@/components/tryout/StartTryoutButton'

export default async function TryoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: tryout } = await supabase.from('tryouts').select('*').eq('id', id).single()
  if (!tryout) redirect('/dashboard/tryout')

  const { data: profile } = await supabase.from('profiles').select('is_premium').eq('id', user.id).single()

  const { data: attempts } = await supabase
    .from('tryout_attempts')
    .select('id, skor, persentase, finished_at')
    .eq('user_id', user.id)
    .eq('tryout_id', id)
    .eq('status', 'completed')
    .order('finished_at', { ascending: false })

  const bestScore = attempts && attempts.length > 0 ? Math.max(...attempts.map((a: any) => a.persentase || 0)) : null

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/dashboard/tryout" className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Tryout
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20">{tryout.jenjang}</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20">{tryout.mata_pelajaran}</span>
          </div>
          <h1 className="text-2xl font-bold mt-4 mb-1">{tryout.title}</h1>
          <p className="text-indigo-200 text-sm">{tryout.description}</p>
        </div>

        <div className="p-6">
          {/* Info */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: Clock, label: 'Durasi', value: `${tryout.durasi_menit} menit` },
              { icon: BookOpen, label: 'Jumlah Soal', value: `${tryout.jumlah_soal} soal` },
              { icon: Star, label: 'Percobaan', value: `${attempts?.length || 0}x` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center p-3 bg-gray-50 rounded-xl">
                <Icon className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                <div className="text-sm font-bold text-gray-900">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>

          {/* Best Score */}
          {bestScore !== null && (
            <div className={`flex items-center gap-3 p-4 rounded-xl mb-6 ${bestScore >= 80 ? 'bg-green-50 border border-green-100' : bestScore >= 60 ? 'bg-yellow-50 border border-yellow-100' : 'bg-red-50 border border-red-100'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${bestScore >= 80 ? 'bg-green-100 text-green-700' : bestScore >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {bestScore}%
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Skor terbaik kamu</div>
                <div className="text-xs text-gray-500">{bestScore >= 80 ? 'Luar biasa!' : bestScore >= 60 ? 'Cukup baik, terus berlatih!' : 'Ayo latih lagi!'}</div>
              </div>
            </div>
          )}

          {/* Aturan */}
          <div className="space-y-2 mb-6">
            <h3 className="font-semibold text-gray-900 text-sm">Peraturan Tryout</h3>
            {[
              'Waktu berjalan mundur, tidak bisa di-pause',
              'Jawaban bisa diubah selama waktu masih ada',
              'Tryout otomatis dikumpulkan saat waktu habis',
              'Hasil skor langsung tersedia setelah selesai',
              profile?.is_premium ? 'Pembahasan lengkap tersedia (Premium)' : 'Pembahasan tersedia untuk akun Premium',
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                {rule}
              </div>
            ))}
          </div>

          {!profile?.is_premium && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl mb-6">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-amber-800">Akun Gratis</div>
                <div className="text-xs text-amber-700 mt-0.5">
                  Kamu bisa mengerjakan tryout ini secara gratis. Untuk melihat pembahasan dan download soal,{' '}
                  <Link href="/dashboard/premium" className="underline font-semibold">upgrade ke Premium</Link>.
                </div>
              </div>
            </div>
          )}

          <StartTryoutButton tryoutId={id} userId={user.id} />
        </div>
      </div>
    </div>
  )
}
