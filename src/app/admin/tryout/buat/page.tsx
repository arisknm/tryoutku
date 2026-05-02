import TryoutForm from '@/components/admin/TryoutForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BuatTryoutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/admin/tryout" className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Buat Tryout Baru</h1>
        <p className="text-gray-500 text-sm mt-1">Isi detail tryout yang akan dibuat</p>
      </div>
      <TryoutForm />
    </div>
  )
}
