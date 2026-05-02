import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Star, Lock, CheckCircle, XCircle, MinusCircle, Download, Trophy } from 'lucide-react'
import Button from '@/components/ui/Button'
import { getGradeBg, getGradeLabel } from '@/lib/utils'
import AdBanner from '@/components/ads/AdBanner'
import DownloadPDFButton from '@/components/tryout/DownloadPDFButton'
import ShareResultButton from '@/components/tryout/ShareResultButton'

export default async function HasilPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: attempt } = await supabase
    .from('tryout_attempts')
    .select('*, tryouts(*)')
    .eq('id', attemptId)
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .single()

  if (!attempt) redirect('/dashboard')

  const { data: profile } = await supabase.from('profiles').select('is_premium').eq('id', user.id).single()
  const isPremium = profile?.is_premium

  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .eq('tryout_id', attempt.tryout_id)
    .order('nomor')

  const persentase = attempt.persentase || 0
  const jawaban = attempt.jawaban || {}

  let benar = 0, salah = 0, kosong = 0
  for (const q of questions || []) {
    const ans = jawaban[q.id]
    if (!ans) kosong++
    else if (ans === q.jawaban_benar) benar++
    else salah++
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
      </Link>

      {/* Skor Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center">
        <div className="text-sm font-medium text-indigo-200 mb-2">Hasil Tryout</div>
        <h1 className="text-xl font-bold mb-4">{attempt.tryouts?.title}</h1>
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-3">
          <span className="text-3xl font-extrabold">{persentase}</span>
          <span className="text-lg font-bold ml-0.5">%</span>
        </div>
        <div className="text-lg font-bold">{getGradeLabel(persentase)}</div>
        <div className="text-indigo-200 text-sm mt-1">{attempt.skor} / {attempt.skor_maksimal} poin</div>
        <div className="mt-4">
          <ShareResultButton
            tryoutTitle={attempt.tryouts?.title ?? ''}
            persentase={persentase}
            gradeLabel={getGradeLabel(persentase)}
            benar={benar}
            salah={salah}
            kosong={kosong}
          />
        </div>
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Benar', value: benar, icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-100' },
          { label: 'Salah', value: salah, icon: XCircle, color: 'text-red-500 bg-red-50 border-red-100' },
          { label: 'Kosong', value: kosong, icon: MinusCircle, color: 'text-gray-500 bg-gray-50 border-gray-100' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={`bg-white rounded-2xl p-4 border text-center ${color.split(' ').slice(1).join(' ')}`}>
            <Icon className={`w-6 h-6 mx-auto mb-1 ${color.split(' ')[0]}`} />
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Premium CTA atau Download */}
      {isPremium ? (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900 text-sm">Download Soal & Pembahasan</div>
            <div className="text-xs text-gray-500">Simpan untuk belajar offline</div>
          </div>
          <DownloadPDFButton attemptId={attemptId} tryoutTitle={attempt.tryouts?.title} />
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Lock className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-amber-900">Lihat Pembahasan & Download PDF</div>
            <div className="text-sm text-amber-700 mt-1">Upgrade ke Premium untuk melihat pembahasan detail setiap soal dan download PDF.</div>
            <Link href="/dashboard/premium">
              <Button size="sm" className="mt-3 bg-amber-500 hover:bg-amber-600 text-white">
                <Star className="w-4 h-4 fill-current" /> Upgrade Sekarang
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Iklan non-premium */}
      {!isPremium && <AdBanner slot="1122334455" format="rectangle" />}

      {/* Daftar Soal & Pembahasan */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {isPremium ? 'Pembahasan Lengkap' : 'Review Jawaban'}
        </h2>
        <div className="space-y-4">
          {(questions || []).map((q: any, i: number) => {
            const myAnswer = jawaban[q.id]
            const isCorrect = myAnswer === q.jawaban_benar
            const isBlank = !myAnswer

            return (
              <div key={q.id} className={`bg-white rounded-2xl border-2 overflow-hidden ${isCorrect ? 'border-green-100' : isBlank ? 'border-gray-100' : 'border-red-100'}`}>
                {/* Status Bar */}
                <div className={`px-4 py-2 flex items-center gap-2 text-xs font-semibold ${isCorrect ? 'bg-green-50 text-green-700' : isBlank ? 'bg-gray-50 text-gray-500' : 'bg-red-50 text-red-600'}`}>
                  {isCorrect ? <CheckCircle className="w-4 h-4" /> : isBlank ? <MinusCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  Soal {i + 1} — {isCorrect ? 'Benar' : isBlank ? 'Tidak dijawab' : 'Salah'}
                </div>

                <div className="p-4">
                  <p className="text-sm text-gray-900 font-medium mb-3">{q.soal}</p>
                  {q.soal_image && <img src={q.soal_image} alt="" className="mb-3 rounded-xl max-w-full" />}

                  <div className="space-y-2">
                    {Object.entries(q.pilihan as Record<string, string>).filter(([, v]) => v).map(([key, val]) => {
                      const isJawaban = key === q.jawaban_benar
                      const isJawabanku = key === myAnswer
                      return (
                        <div key={key} className={`flex items-start gap-2 p-3 rounded-xl text-sm
                          ${isJawaban ? 'bg-green-50 border border-green-200' : isJawabanku && !isCorrect ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 uppercase
                            ${isJawaban ? 'bg-green-500 text-white' : isJawabanku && !isCorrect ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            {key}
                          </span>
                          <span className={isJawaban ? 'text-green-800 font-medium' : isJawabanku && !isCorrect ? 'text-red-700 line-through' : 'text-gray-600'}>{val}</span>
                          {isJawabanku && !isCorrect && <span className="text-xs text-red-500 ml-auto flex-shrink-0">Jawabanmu</span>}
                          {isJawaban && <span className="text-xs text-green-600 ml-auto flex-shrink-0 font-semibold">Kunci</span>}
                        </div>
                      )
                    })}
                  </div>

                  {/* Pembahasan - hanya premium */}
                  {isPremium ? (
                    <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
                      <div className="text-xs font-semibold text-indigo-700 mb-1 flex items-center gap-1"><Trophy className="w-3.5 h-3.5" /> Pembahasan</div>
                      <p className="text-sm text-indigo-900">{q.pembahasan}</p>
                      {q.pembahasan_image && <img src={q.pembahasan_image} alt="" className="mt-2 rounded-lg max-w-full" />}
                    </div>
                  ) : (
                    <div className="mt-4 p-3 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center gap-2">
                      <Lock className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      <p className="text-xs text-gray-400">Pembahasan tersedia untuk pengguna Premium.</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Ulangi Tryout */}
      <div className="flex gap-3 pb-8">
        <Link href={`/dashboard/tryout/${attempt.tryout_id}`} className="flex-1">
          <Button variant="outline" className="w-full">Ulangi Tryout</Button>
        </Link>
        <Link href="/dashboard" className="flex-1">
          <Button className="w-full">Kembali ke Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
