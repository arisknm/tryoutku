import Link from 'next/link'
import { Clock, BookOpen, Users, Lock, CheckCircle } from 'lucide-react'
import { Tryout } from '@/types'
import { getJenjangColor } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

interface TryoutCardProps {
  tryout: Tryout
  attemptCount?: number
  lastScore?: number
}

export default function TryoutCard({ tryout, attemptCount = 0, lastScore }: TryoutCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 relative">
        <div className="flex items-start justify-between">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm`}>
            {tryout.jenjang}
          </span>
          {!tryout.is_free && (
            <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-amber-400 text-amber-900">
              <Lock className="w-3 h-3" /> Premium
            </span>
          )}
        </div>
        <div className="mt-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-2">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">{tryout.title}</h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{tryout.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant="info">{tryout.mata_pelajaran}</Badge>
          <Badge>Kelas {tryout.kelas.join(', ')}</Badge>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {tryout.durasi_menit} menit
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> {tryout.jumlah_soal} soal
          </span>
        </div>

        {lastScore !== undefined && (
          <div className="mb-3 p-2 bg-green-50 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-green-700 font-medium">Skor terakhir: {lastScore}%</span>
          </div>
        )}

        <Link
          href={`/dashboard/tryout/${tryout.id}`}
          className="block w-full text-center text-sm font-semibold py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          {attemptCount > 0 ? 'Ulangi Tryout' : 'Mulai Tryout'}
        </Link>
      </div>
    </div>
  )
}
