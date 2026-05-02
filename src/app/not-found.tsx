import Link from 'next/link'
import { BookOpen, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-10 h-10 text-indigo-400" />
        </div>
        <h1 className="text-6xl font-extrabold text-indigo-600 mb-3">404</h1>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-500 text-sm mb-8">Halaman yang kamu cari tidak ada atau sudah dipindahkan.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/"><Button variant="outline"><ArrowLeft className="w-4 h-4" /> Beranda</Button></Link>
          <Link href="/dashboard"><Button>Dashboard</Button></Link>
        </div>
      </div>
    </div>
  )
}
