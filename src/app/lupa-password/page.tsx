'use client'
import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase'

export default function LupaPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const supabase = createClient()
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    })
    if (err) { setError('Email tidak ditemukan atau terjadi kesalahan.'); setLoading(false); return }
    setSent(true); setLoading(false)
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
          <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-1">Lupa Password</h1>
          <p className="text-gray-500 text-sm">Masukkan email untuk reset password</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="font-bold text-gray-900 mb-2">Email Terkirim!</h2>
              <p className="text-sm text-gray-500 mb-6">Cek inbox <strong>{email}</strong> dan klik link reset password.</p>
              <Link href="/login"><Button variant="outline" className="w-full">Kembali ke Login</Button></Link>
            </div>
          ) : (
            <>
              {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                  </div>
                </div>
                <Button type="submit" loading={loading} className="w-full">Kirim Link Reset</Button>
              </form>
              <div className="mt-4 text-center">
                <Link href="/login" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center justify-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Kembali ke Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
