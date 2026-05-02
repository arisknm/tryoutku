'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase'

const pilihanKeys = ['a', 'b', 'c', 'd', 'e'] as const

interface Props { tryoutId: string; soal?: any; nomor?: number }

export default function SoalForm({ tryoutId, soal, nomor }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    nomor: soal?.nomor || nomor || 1,
    soal: soal?.soal || '',
    pilihan: soal?.pilihan || { a: '', b: '', c: '', d: '', e: '' },
    jawaban_benar: soal?.jawaban_benar || 'a',
    pembahasan: soal?.pembahasan || '',
    poin: soal?.poin || 1,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function setPilihan(k: string, v: string) {
    setForm(f => ({ ...f, pilihan: { ...f.pilihan, [k]: v } }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.soal || !form.pilihan.a || !form.pilihan.b || !form.pilihan.c || !form.pilihan.d) {
      setError('Soal, pilihan A-D, dan jawaban wajib diisi.'); return
    }
    setLoading(true); setError('')
    const supabase = createClient()

    const payload = { ...form, tryout_id: tryoutId }
    const { error: err } = soal
      ? await supabase.from('questions').update(payload).eq('id', soal.id)
      : await supabase.from('questions').insert(payload)

    if (err) { setError(err.message); setLoading(false); return }

    // Update jumlah_soal di tryout
    const { count } = await supabase.from('questions').select('*', { count: 'exact', head: true }).eq('tryout_id', tryoutId)
    await supabase.from('tryouts').update({ jumlah_soal: count || 0 }).eq('id', tryoutId)

    router.push(`/admin/soal?tryout=${tryoutId}`)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomor Soal</label>
          <input type="number" min={1} value={form.nomor} onChange={e => setForm(f => ({ ...f, nomor: Number(e.target.value) }))}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Poin</label>
          <input type="number" min={1} value={form.poin} onChange={e => setForm(f => ({ ...f, poin: Number(e.target.value) }))}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Pertanyaan *</label>
        <textarea value={form.soal} onChange={e => setForm(f => ({ ...f, soal: e.target.value }))} required rows={4}
          placeholder="Tulis pertanyaan di sini..."
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
      </div>

      {/* Pilihan Jawaban */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Pilihan Jawaban *</label>
        <div className="space-y-2">
          {pilihanKeys.map(k => (
            <div key={k} className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="jawaban" value={k} checked={form.jawaban_benar === k}
                  onChange={() => setForm(f => ({ ...f, jawaban_benar: k }))}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold uppercase transition-colors
                  ${form.jawaban_benar === k ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>{k}</span>
              </label>
              <input value={(form.pilihan as any)[k] || ''} onChange={e => setPilihan(k, e.target.value)}
                placeholder={`Pilihan ${k.toUpperCase()}${['a','b','c','d'].includes(k) ? ' *' : ' (opsional)'}`}
                className={`flex-1 px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${form.jawaban_benar === k ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200'}`} />
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-1">Klik radio button di kiri untuk menandai jawaban yang benar.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Pembahasan <span className="text-gray-400 font-normal">(untuk pengguna Premium)</span></label>
        <textarea value={form.pembahasan} onChange={e => setForm(f => ({ ...f, pembahasan: e.target.value }))} rows={4}
          placeholder="Jelaskan kenapa jawaban tersebut benar..."
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">Batal</Button>
        <Button type="submit" loading={loading} className="flex-1">{soal ? 'Simpan' : 'Tambah Soal'}</Button>
      </div>
    </form>
  )
}
