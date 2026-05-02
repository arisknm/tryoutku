'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Timer from './Timer'
import { createClient } from '@/lib/supabase'
import { ChevronLeft, ChevronRight, Send, Grid3X3 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface Props {
  tryout: any
  questions: any[]
  attempt: any
  userId: string
}

export default function TryoutEngine({ tryout, questions, attempt, userId }: Props) {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>(attempt.jawaban || {})
  const [showNav, setShowNav] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const supabase = createClient()

  const q = questions[current]
  const totalDetik = tryout.durasi_menit * 60

  const saveAnswer = useCallback(async (questionId: string, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)
    await supabase.from('tryout_attempts').update({ jawaban: newAnswers }).eq('id', attempt.id)
  }, [answers, attempt.id])

  const handleSubmit = useCallback(async () => {
    if (submitting) return
    setSubmitting(true)

    const { data: qs } = await supabase.from('questions')
      .select('id, jawaban_benar, poin').eq('tryout_id', tryout.id)

    let skor = 0, skor_maks = 0
    for (const q of qs || []) {
      skor_maks += q.poin
      if (answers[q.id] === q.jawaban_benar) skor += q.poin
    }

    const persentase = skor_maks > 0 ? Math.round((skor / skor_maks) * 100) : 0

    await supabase.from('tryout_attempts').update({
      status: 'completed',
      finished_at: new Date().toISOString(),
      jawaban: answers,
      skor,
      skor_maksimal: skor_maks,
      persentase,
    }).eq('id', attempt.id)

    router.push(`/dashboard/hasil/${attempt.id}`)
  }, [submitting, answers, attempt.id, tryout.id, router])

  const answeredCount = Object.keys(answers).length

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-gray-900 truncate">{tryout.title}</div>
          <div className="text-xs text-gray-500">{answeredCount}/{questions.length} terjawab</div>
        </div>
        <Timer totalDetik={totalDetik} onTimeUp={handleSubmit} />
        <button onClick={() => setShowNav(!showNav)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-600">
          <Grid3X3 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Question */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
            {/* Nomor & progress */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">{current + 1}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
              </div>
              <span className="text-xs text-gray-400">{current + 1}/{questions.length}</span>
            </div>

            {/* Soal */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-gray-900 leading-relaxed font-medium">{q.soal}</p>
              {q.soal_image && <img src={q.soal_image} alt="soal" className="mt-3 rounded-xl max-w-full" />}
            </div>

            {/* Pilihan */}
            <div className="space-y-3">
              {Object.entries(q.pilihan as Record<string, string>).filter(([, v]) => v).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => saveAnswer(q.id, key)}
                  className={cn(
                    'w-full flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all',
                    answers[q.id] === key
                      ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                      : 'border-gray-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/30'
                  )}
                >
                  <span className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 uppercase',
                    answers[q.id] === key ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'
                  )}>
                    {key}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed pt-0.5">{value}</span>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 pb-6">
              <Button variant="outline" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} className="flex-1">
                <ChevronLeft className="w-4 h-4" /> Sebelumnya
              </Button>
              {current < questions.length - 1 ? (
                <Button onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))} className="flex-1">
                  Selanjutnya <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="secondary" onClick={handleSubmit} loading={submitting} className="flex-1">
                  <Send className="w-4 h-4" /> Kumpulkan
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Soal Navigator (right panel) */}
        {showNav && (
          <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            <div className="text-sm font-semibold text-gray-700 mb-3">Navigasi Soal</div>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => (
                <button key={i} onClick={() => { setCurrent(i); setShowNav(false) }}
                  className={cn(
                    'w-9 h-9 rounded-xl text-xs font-bold transition-all',
                    i === current ? 'bg-indigo-600 text-white' :
                    answers[q.id] ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  )}>
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2"><span className="w-4 h-4 bg-green-100 rounded" /> Terjawab</div>
              <div className="flex items-center gap-2"><span className="w-4 h-4 bg-gray-100 rounded" /> Belum dijawab</div>
              <div className="flex items-center gap-2"><span className="w-4 h-4 bg-indigo-600 rounded" /> Soal aktif</div>
            </div>
            <Button variant="danger" size="sm" className="w-full mt-4" onClick={handleSubmit} loading={submitting}>
              <Send className="w-4 h-4" /> Kumpulkan
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
