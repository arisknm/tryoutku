'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BookOpen, Eye, EyeOff, Mail, Lock, User, School } from 'lucide-react'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase'
import { JenjangSekolah } from '@/types'

const jenjangOptions: JenjangSekolah[] = ['SD', 'SMP', 'SMA']
const kelasMap: Record<JenjangSekolah, number[]> = {
  SD: [1, 2, 3, 4, 5, 6],
  SMP: [7, 8, 9],
  SMA: [10, 11, 12],
}

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    jenjang: '' as JenjangSekolah | '',
    kelas: 0,
    sekolah: '',
    role: 'siswa' as 'siswa' | 'guru',
  })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }))

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) { setError('Password tidak cocok!'); return }
    if (form.password.length < 6) { setError('Password minimal 6 karakter.'); return }
    setLoading(true); setError('')
    try {
      const supabase = createClient()
      const { data, error: authErr } = await supabase.auth.signUp({ email: form.email, password: form.password })
      if (authErr) throw authErr

      await supabase.from('profiles').insert({
        id: data.user!.id,
        email: form.email,
        name: form.name,
        role: form.role,
        jenjang: form.jenjang || null,
        kelas: form.kelas || null,
        sekolah: form.sekolah || null,
        is_premium: false,
      })

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Gagal mendaftar. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-indigo-600">TryoutKu</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-1">Buat Akun Gratis</h1>
          <p className="text-gray-500 text-sm">Bergabung dan mulai berlatih sekarang</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${step >= s ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>{s}</div>
                <div className={`text-xs font-medium ${step >= s ? 'text-indigo-600' : 'text-gray-400'}`}>
                  {s === 1 ? 'Akun' : 'Data Diri'}
                </div>
                {s < 2 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-indigo-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" required value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="Nama kamu" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                    placeholder="nama@email.com" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPw ? 'text' : 'password'} required value={form.password} onChange={e => set('password', e.target.value)}
                    placeholder="Minimal 6 karakter" className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="password" required value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)}
                    placeholder="Ulangi password" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
              </div>
              <Button type="button" className="w-full" onClick={() => {
                if (!form.name || !form.email || !form.password || !form.confirmPassword) { setError('Semua field wajib diisi.'); return }
                if (form.password !== form.confirmPassword) { setError('Password tidak cocok!'); return }
                setError(''); setStep(2)
              }}>Lanjut</Button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Saya adalah</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['siswa', 'guru'] as const).map(r => (
                    <button key={r} type="button" onClick={() => set('role', r)}
                      className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-colors capitalize ${form.role === r ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                      {r === 'siswa' ? 'Siswa' : 'Guru'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Jenjang</label>
                <select value={form.jenjang} onChange={e => { set('jenjang', e.target.value); set('kelas', 0) }}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                  <option value="">Pilih jenjang</option>
                  {jenjangOptions.map(j => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>
              {form.jenjang && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Kelas</label>
                  <select value={form.kelas} onChange={e => set('kelas', Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                    <option value={0}>Pilih kelas</option>
                    {kelasMap[form.jenjang].map(k => <option key={k} value={k}>Kelas {k}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Sekolah <span className="text-gray-400">(opsional)</span></label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={form.sekolah} onChange={e => set('sekolah', e.target.value)}
                    placeholder="Nama sekolahmu" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">Kembali</Button>
                <Button type="submit" loading={loading} className="flex-1">Daftar Sekarang</Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">Masuk</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
