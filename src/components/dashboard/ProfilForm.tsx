'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const jenjangOptions = ['SD', 'SMP', 'SMA']
const kelasMap: Record<string, number[]> = { SD: [1,2,3,4,5,6], SMP: [7,8,9], SMA: [10,11,12] }

export default function ProfilForm({ profile, userId }: { profile: any; userId: string }) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: profile?.name || '',
    jenjang: profile?.jenjang || '',
    kelas: profile?.kelas || 0,
    sekolah: profile?.sekolah || '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setSuccess(false)
    const supabase = createClient()
    await supabase.from('profiles').update({
      name: form.name,
      jenjang: form.jenjang || null,
      kelas: form.kelas || null,
      sekolah: form.sekolah || null,
    }).eq('id', userId)
    setSuccess(true); setLoading(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
      <h3 className="font-semibold text-gray-900">Edit Profil</h3>
      {success && <div className="p-3 bg-green-50 text-green-700 rounded-xl text-sm border border-green-100">Profil berhasil disimpan!</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
        <input value={form.name} onChange={e => set('name', e.target.value)} required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Jenjang</label>
          <select value={form.jenjang} onChange={e => { set('jenjang', e.target.value); set('kelas', 0) }}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
            <option value="">Pilih</option>
            {jenjangOptions.map(j => <option key={j} value={j}>{j}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Kelas</label>
          <select value={form.kelas} onChange={e => set('kelas', Number(e.target.value))} disabled={!form.jenjang}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white disabled:opacity-50">
            <option value={0}>Pilih</option>
            {form.jenjang && kelasMap[form.jenjang]?.map(k => <option key={k} value={k}>Kelas {k}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Sekolah</label>
        <input value={form.sekolah} onChange={e => set('sekolah', e.target.value)} placeholder="Nama sekolah (opsional)"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <Button type="submit" loading={loading} className="w-full">Simpan Perubahan</Button>
    </form>
  )
}
