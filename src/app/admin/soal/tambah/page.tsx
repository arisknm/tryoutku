import SoalForm from '@/components/admin/SoalForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function TambahSoalPage({ searchParams }: { searchParams: Promise<{ tryout?: string }> }) {
  const params = await searchParams
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href={`/admin/soal?tryout=${params.tryout}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Soal
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tambah Soal Baru</h1>
        <p className="text-gray-500 text-sm mt-1">Isi soal, pilihan jawaban, dan pembahasan</p>
      </div>
      <SoalForm tryoutId={params.tryout || ''} />
    </div>
  )
}
