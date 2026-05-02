import Link from 'next/link'
import { CheckCircle, Star, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h1>
        <p className="text-gray-500 mb-6">
          Selamat! Akun kamu sudah diupgrade ke <span className="font-semibold text-amber-600 inline-flex items-center gap-1"><Star className="w-4 h-4 fill-current" />Premium</span>.
          Nikmati semua fitur tanpa batas.
        </p>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm font-semibold text-amber-800 mb-2">Yang kamu dapatkan sekarang:</p>
          <ul className="space-y-1.5 text-sm text-amber-700">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0" /> Pembahasan lengkap semua soal</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0" /> Download soal & pembahasan PDF</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0" /> Analisis hasil mendalam</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0" /> Belajar tanpa iklan</li>
          </ul>
        </div>
        <Link href="/dashboard">
          <Button className="w-full">
            Mulai Belajar <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
