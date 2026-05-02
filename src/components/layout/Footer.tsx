import Link from 'next/link'
import { BookOpen, Instagram, Youtube, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TryoutKu</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Platform latihan soal dan tryout online terlengkap untuk siswa SD, SMP, dan SMA.
              Raih nilai terbaik dengan latihan yang terstruktur dan pembahasan detail.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-500 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="mailto:hello@tryoutku.id" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Jenjang</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tryout?jenjang=SD" className="hover:text-white transition-colors">Sekolah Dasar (SD)</Link></li>
              <li><Link href="/tryout?jenjang=SMP" className="hover:text-white transition-colors">SMP / MTs</Link></li>
              <li><Link href="/tryout?jenjang=SMA" className="hover:text-white transition-colors">SMA / SMK / MA</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Perusahaan</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#tentang" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/#harga" className="hover:text-white transition-colors">Harga</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="/kebijakan-refund" className="hover:text-white transition-colors">Kebijakan Refund</Link></li>
              <li><a href="mailto:hello@tryoutku.id" className="hover:text-white transition-colors">Hubungi Kami</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>&copy; 2026 TryoutKu. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
