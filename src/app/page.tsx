import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import {
  BookOpen, Trophy, Clock, Star, CheckCircle,
  ArrowRight, Zap, Shield, BarChart3, Download, ChevronRight
} from 'lucide-react'
import Button from '@/components/ui/Button'

const features = [
  { icon: BookOpen, title: 'Ribuan Soal Berkualitas', desc: 'Bank soal SD, SMP, SMA lengkap sesuai kurikulum Merdeka dan UTBK.', color: 'bg-indigo-100 text-indigo-600' },
  { icon: Clock, title: 'Simulasi Waktu Nyata', desc: 'Latihan dengan timer persis seperti ujian asli untuk membangun mental juara.', color: 'bg-cyan-100 text-cyan-600' },
  { icon: BarChart3, title: 'Analisis Hasil Detail', desc: 'Lihat skor, peringkat, dan analisis kelemahan per topik.', color: 'bg-purple-100 text-purple-600' },
  { icon: BookOpen, title: 'Pembahasan Lengkap', desc: 'Setiap soal dilengkapi pembahasan detail dari guru berpengalaman.', color: 'bg-green-100 text-green-600' },
  { icon: Download, title: 'Download Soal PDF', desc: 'Unduh soal dan pembahasan untuk belajar offline kapan saja.', color: 'bg-amber-100 text-amber-600' },
  { icon: Shield, title: 'Aman & Terpercaya', desc: 'Data siswa terlindungi dengan enkripsi tingkat tinggi.', color: 'bg-rose-100 text-rose-600' },
]

const subjects = [
  { label: 'SD', color: 'bg-green-500', full: 'Sekolah Dasar', subs: ['Matematika', 'Bahasa Indonesia', 'IPA', 'IPS', 'PKn'] },
  { label: 'SMP', color: 'bg-blue-500', full: 'SMP / MTs', subs: ['Matematika', 'Bahasa Indonesia', 'IPA', 'IPS', 'Bahasa Inggris'] },
  { label: 'SMA', color: 'bg-purple-500', full: 'SMA / SMK / MA', subs: ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Bahasa Indonesia', 'UTBK'] },
]

const packages = [
  {
    name: 'Gratis', price: 0, desc: 'Untuk memulai perjalanan belajar',
    features: ['Akses semua tryout', 'Skor langsung setelah ujian', 'Riwayat 5 tryout terakhir', 'Terdapat iklan'],
    cta: 'Mulai Gratis', href: '/register', popular: false, variant: 'outline' as const,
  },
  {
    name: 'Premium', price: 49000, desc: 'Untuk belajar lebih maksimal',
    features: ['Semua fitur Gratis', 'Pembahasan soal lengkap', 'Download soal PDF', 'Analisis hasil mendalam', 'Ranking & perbandingan', 'Tanpa iklan', 'Prioritas soal baru'],
    cta: 'Coba 7 Hari Gratis', href: '/register?plan=premium', popular: true, variant: 'primary' as const,
  },
  {
    name: 'Sekolah', price: 299000, desc: 'Untuk kelas atau sekolah',
    features: ['Semua fitur Premium', 'Hingga 50 siswa', 'Buat soal sendiri', 'Dashboard guru', 'Laporan kelas', 'Dukungan prioritas'],
    cta: 'Hubungi Kami', href: 'mailto:hello@tryoutku.id', popular: false, variant: 'outline' as const,
  },
]

const stats = [
  { value: '50.000+', label: 'Siswa Aktif' },
  { value: '10.000+', label: 'Soal Tersedia' },
  { value: '500+', label: 'Tryout Tersedia' },
  { value: '4.8/5', label: 'Rating Pengguna' },
]

const testimonials = [
  { name: 'Rina Kartika', school: 'SMAN 1 Jakarta', text: 'Berkat TryoutKu, nilai UTBK saya naik 150 poin! Pembahasannya sangat detail dan mudah dipahami.', avatar: 'R', grade: 'Kelas 12' },
  { name: 'Budi Santoso', school: 'SMPN 3 Surabaya', text: 'Soalnya lengkap banget dan mirip dengan ujian asli. Sekarang saya lebih PD menghadapi ujian.', avatar: 'B', grade: 'Kelas 9' },
  { name: 'Dewi Lestari', school: 'SDN 5 Bandung', text: 'Anakku jadi semangat belajar karena tampilan TryoutKu menarik dan mudah digunakan.', avatar: 'D', grade: 'Kelas 6' },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/20">
              <Zap className="w-4 h-4 text-amber-400" />
              Platform Tryout #1 untuk pelajar Indonesia
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Latihan Soal Online
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">
                SD, SMP &amp; SMA
              </span>
            </h1>
            <p className="text-lg text-indigo-200 mb-8 leading-relaxed">
              Ribuan soal berkualitas, pembahasan detail, dan analisis hasil belajar.
              Raih nilai terbaik dengan latihan yang terstruktur dan menyenangkan.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="shadow-lg">
                  Daftar Gratis Sekarang <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
                  Sudah Punya Akun
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-10 text-sm text-indigo-300">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Gratis selamanya</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Tanpa kartu kredit</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Akses instan</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-extrabold text-indigo-600 mb-1">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JENJANG */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Untuk Semua Jenjang</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Dari kelas 1 SD hingga kelas 12 SMA, semua mata pelajaran tersedia.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {subjects.map(({ label, color, full, subs }) => (
              <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${color} rounded-xl text-white font-bold text-lg mb-4`}>{label}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{full}</h3>
                <ul className="space-y-2">
                  {subs.map(s => (
                    <li key={s} className="flex items-center gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-indigo-400" /> {s}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-4 flex items-center gap-1 text-indigo-600 text-sm font-semibold hover:text-indigo-700">
                  Mulai Latihan <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FITUR */}
      <section id="fitur" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Fitur Unggulan</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Semua yang kamu butuhkan untuk belajar lebih efektif dan terarah.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all card-hover">
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="harga" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Pilih Paket</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Mulai gratis, upgrade kapan saja. Tidak ada biaya tersembunyi.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`relative bg-white rounded-2xl p-6 border-2 ${pkg.popular ? 'border-indigo-500 shadow-xl' : 'border-gray-100 shadow-sm'}`}>
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Terpopuler
                    </span>
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{pkg.desc}</p>
                  <div className="mt-4">
                    {pkg.price === 0
                      ? <span className="text-4xl font-extrabold text-gray-900">Gratis</span>
                      : <div><span className="text-4xl font-extrabold text-gray-900">Rp{(pkg.price / 1000).toFixed(0)}rb</span><span className="text-gray-500 text-sm">/bulan</span></div>
                    }
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href={pkg.href}><Button variant={pkg.variant} className="w-full">{pkg.cta}</Button></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Kata Mereka</h2>
            <p className="text-gray-500">Ribuan siswa sudah merasakan manfaatnya.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, school, text, avatar, grade }) => (
              <div key={name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">{avatar}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{name}</div>
                    <div className="text-xs text-gray-500">{grade} · {school}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="tentang" className="gradient-bg py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Siap Raih Nilai Terbaik?</h2>
          <p className="text-indigo-200 mb-8">Bergabung dengan 50.000+ siswa yang sudah belajar lebih cerdas bersama TryoutKu.</p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Daftar Gratis Sekarang <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
