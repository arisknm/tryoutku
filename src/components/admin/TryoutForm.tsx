'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase'
import { JenjangSekolah, MataPelajaran } from '@/types'

const mapels: MataPelajaran[] = ['Matematika','Bahasa Indonesia','Bahasa Inggris','IPA','IPS','PKn','Fisika','Kimia','Biologi','Sejarah','Geografi','Ekonomi','Sosiologi','Lainnya']
const kelasOptions: Record<JenjangSekolah, number[]> = { SD: [1,2,3,4,5,6], SMP: [7,8,9], SMA: [10,11,12] }

interface Props { tryout?: any }

export default function TryoutForm({ tryout }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: tryout?.title || '',
    description: tryout?.description || '',
    mata_pelajaran: tryout?.mata_pelajaran || 'Matematika',
    jenjang: (tryout?.jenjang || 'SMA') as JenjangSekolah,
    kelas: tryout?.kelas || [] as number[],
    durasi_menit: tryout?.durasi_menit || 60,
    jumlah_soal: tryout?.jumlah_soal || 40,
    is_active: tryout?.is_active ?? true,
    is_free: tryout?.is_free ?? true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  function toggleKelas(k: number) {
    setForm(f => ({
      ...f,
      kelas: f.kelas.includes(k) ? f.kelas.filter((x: number) => x !== k) : [...f.kelas, k]
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || form.kelas.length === 0) { setError('Judul dan kelas wajib diisi.'); return }
    setLoading(true); setError('')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const payload = { ...form, created_by: user?.id }
    const { error: err } = tryout
      ? await supabase.from('tryouts').update(payload).eq('id', tryout.id)
      : await supabase.from('tryouts').insert(payload)

    if (err) { setError(err.message); setLoading(false); return }
    router.push('/admin/tryout')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Tryout *</label>
        <input value={form.title} onChange={e => set('title', e.target.value)} required placeholder="cth: Tryout Matematika Kelas 10 - Semester 1"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Deskripsi singkat tryout ini..."
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Jenjang *</label>
          <select value={form.jenjang} onChange={e => { set('jenjang', e.target.value); set('kelas', []) }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
            {(['SD','SMP','SMA'] as JenjangSekolah[]).map(j => <option key={j} value={j}>{j}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Mata Pelajaran *</label>
          <select value={form.mata_pelajaran} onChange={e => set('mata_pelajaran', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
            {mapels.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Kelas * <span className="text-gray-400 font-normal">(pilih satu atau lebih)</span></label>
        <div className="flex flex-wrap gap-2">
          {kelasOptions[form.jenjang].map(k => (
            <button key={k} type="button" onClick={() => toggleKelas(k)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors
                ${form.kelas.includes(k) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'}`}>
              Kelas {k}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Durasi (menit) *</label>
          <input type="number" min={5} max={240} value={form.durasi_menit} onChange={e => set('durasi_menit', Number(e.target.value))}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Jumlah Soal</label>
          <input type="number" min={1} max={200} value={form.jumlah_soal} onChange={e => set('jumlah_soal', Number(e.target.value))}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <div className="flex gap-6">
        {[
          { key: 'is_active', label: 'Aktifkan tryout' },
          { key: 'is_free', label: 'Gratis untuk semua' },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={(form as any)[key]} onChange={e => set(key, e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" />
            <span className="text-sm text-gray-700">{label}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">Batal</Button>
        <Button type="submit" loading={loading} className="flex-1">{tryout ? 'Simpan Perubahan' : 'Buat Tryout'}</Button>
      </div>
    </form>
  )
}
