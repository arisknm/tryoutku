import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import {
  BookOpen, Trophy, Clock, Star, CheckCircle,
  ArrowRight, Zap, BarChart3, Download, Users,
  FileText, Target, ChevronRight, Play, Flame
} from 'lucide-react'
import Button from '@/components/ui/Button'

const stats = [
  { value: '50.000+', label: 'Pengguna Aktif' },
  { value: '10.000+', label: 'Soal Tersedia' },
  { value: '200+', label: 'Tryout Tersedia' },
  { value: '4.9/5', label: 'Rating Pengguna' },
]

const partners = [
  { name: 'UI', full: 'Univ. Indonesia' },
  { name: 'UGM', full: 'Univ. Gadjah Mada' },
  { name: 'ITB', full: 'Institut Teknologi' },
  { name: 'UNPAD', full: 'Univ. Padjadjaran' },
  { name: 'ITS', full: 'Institut Teknologi' },
]

const tryoutCategories = [
  {
    label: 'UTBK / SNBT',
    icon: '🎯',
    desc: 'Simulasi penuh UTBK/SNBT: TPS + TKA Saintek/Soshum sesuai format resmi.',
    color: 'bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-600',
    tags: ['TPS Penalaran', 'TKA Saintek', 'TKA Soshum', '160 Soal'],
    href: '/dashboard',
    free: true,
  },
  {
    label: 'Tryout SMA',
    icon: '📚',
    desc: 'Latihan soal SMA kelas 10–12: Matematika, Fisika, Kimia, Biologi, B. Indonesia.',
    color: 'bg-purple-50 border-purple-200',
    badgeColor: 'bg-purple-600',
    tags: ['Kelas 10', 'Kelas 11', 'Kelas 12', 'Semua Mapel'],
    href: '/dashboard',
    free: true,
  },
  {
    label: 'Tryout SMP',
    icon: '✏️',
    desc: 'Soal latihan SMP kelas 7–9: Matematika, IPA, IPS, Bahasa Inggris, PPKn.',
    color: 'bg-green-50 border-green-200',
    badgeColor: 'bg-green-600',
    tags: ['Kelas 7', 'Kelas 8', 'Kelas 9', 'Semua Mapel'],
    href: '/dashboard',
    free: true,
  },
  {
    label: 'Tryout SD',
    icon: '🌟',
    desc: 'Latihan soal SD kelas 1–6: Matematika, Bahasa Indonesia, IPA, IPS, PKn.',
    color: 'bg-amber-50 border-amber-200',
    badgeColor: 'bg-amber-600',
    tags: ['Kelas 4', 'Kelas 5', 'Kelas 6', 'Persiapan Ujian'],
    href: '/dashboard',
    free: true,
  },
]

const featuredTryouts = [
  { title: 'UTBK TPS - Penalaran Umum', mapel: 'TPS', soal: 20, durasi: 30, status: 'GRATIS', hot: false },
  { title: 'UTBK TKA Saintek - Matematika', mapel: 'Matematika', soal: 20, durasi: 45, status: 'GRATIS', hot: true },
  { title: 'UTBK TKA Saintek - Fisika', mapel: 'Fisika', soal: 20, durasi: 45, status: 'GRATIS', hot: false },
  { title: 'UTBK TKA Soshum - Sejarah', mapel: 'Sejarah', soal: 20, durasi: 45, status: 'GRATIS', hot: true },
  { title: 'Tryout Matematika SMA Kelas 10', mapel: 'Matematika', soal: 20, durasi: 90, status: 'GRATIS', hot: false },
  { title: 'Tryout Fisika Kelas 11 - Mekanika', mapel: 'Fisika', soal: 20, durasi: 90, status: 'GRATIS', hot: false },
]

const steps = [
  { num: '01', title: 'Daftar Akun', desc: 'Buat akun gratis dalam 30 detik. Pilih jenjang dan kelas kamu.' },
  { num: '02', title: 'Pilih Tryout', desc: 'Pilih tryout sesuai kebutuhan — UTBK, ujian sekolah, atau latihan harian.' },
  { num: '03', title: 'Kerjakan & Evaluasi', desc: 'Kerjakan dengan timer nyata, lalu lihat hasil dan pembahasan lengkap.' },
]

const features = [
  { icon: FileText, title: 'Soal Sesuai Kurikulum', desc: 'Bank soal dikurasi sesuai Kurikulum Merdeka dan format UTBK/SNBT terbaru.', color: 'bg-blue-50 text-blue-600' },
  { icon: Clock, title: 'Timer Ujian Nyata', desc: 'Simulasi waktu persis seperti ujian asli untuk membangun mental dan manajemen waktu.', color: 'bg-cyan-50 text-cyan-600' },
  { icon: BarChart3, title: 'Analisis Hasil Detail', desc: 'Lihat skor, nilai per sub-bab, dan analisis kelemahan untuk perbaikan terarah.', color: 'bg-violet-50 text-violet-600' },
  { icon: BookOpen, title: 'Pembahasan Lengkap', desc: 'Setiap soal dilengkapi pembahasan detail dan cara cepat mengerjakan.', color: 'bg-green-50 text-green-600' },
  { icon: Download, title: 'Download PDF', desc: 'Unduh soal dan pembahasan dalam format PDF untuk belajar offline.', color: 'bg-amber-50 text-amber-600' },
  { icon: Trophy, title: 'Ranking & Leaderboard', desc: 'Bandingkan skormu dengan siswa lain se-Indonesia untuk motivasi lebih.', color: 'bg-rose-50 text-rose-600' },
]

const packages = [
  {
    name: 'Gratis', price: 0,
    desc: 'Untuk memulai perjalanan belajar',
    features: ['Semua tryout tersedia', 'Skor langsung setelah ujian', 'Riwayat 5 tryout terakhir', 'Ada iklan Google'],
    cta: 'Mulai Gratis', href: '/register', popular: false,
  },
  {
    name: 'Premium', price: 49000,
    desc: 'Untuk belajar lebih maksimal',
    features: ['Semua fitur Gratis', 'Pembahasan soal lengkap', 'Download soal PDF', 'Analisis hasil mendalam', 'Ranking & perbandingan', 'Tanpa iklan', 'Prioritas soal baru'],
    cta: 'Coba 7 Hari Gratis', href: '/register?plan=premium', popular: true,
  },
  {
    name: 'Sekolah', price: 299000,
    desc: 'Untuk kelas atau sekolah',
    features: ['Semua fitur Premium', 'Hingga 50 siswa', 'Buat soal sendiri', 'Dashboard guru', 'Laporan kelas', 'Dukungan prioritas'],
    cta: 'Hubungi Kami', href: 'mailto:hello@tryoutku.id', popular: false,
  },
]

const testimonials = [
  {
    handle: '@rinaputri_12',
    text: 'Serius kaget soal UTBK di TryoutKu mirip banget sama soal asli. Alhamdulillah keterima di UI jurusan Hukum 🎉',
    name: 'Rina Putri',
    label: 'Mahasiswa UI 2024',
    avatar: 'R',
  },
  {
    handle: '@budisantoso_id',
    text: 'Yang paling suka itu pembahasan tiap soal sangat jelas. Bukan cuma jawaban, tapi konsepnya dijelasin. Worth banget upgrade Premium!',
    name: 'Budi Santoso',
    label: 'Siswa SMAN 3 Surabaya',
    avatar: 'B',
  },
  {
    handle: '@dewiayunn',
    text: 'Tryout UTBK-nya lengkap ada TPS + TKA semua. Latihan 30 hari sebelum ujian, naik 200 poin dari TO pertama 💪',
    name: 'Dewi Ayu',
    label: 'Mahasiswa ITB 2024',
    avatar: 'D',
  },
  {
    handle: '@agungprakasa',
    text: 'Anakku kelas 9 jadi rajin belajar sendiri karena soal IPA SMP di sini bagus dan ada penjelasannya. Terima kasih TryoutKu!',
    name: 'Agung Prakarsa',
    label: 'Orang tua siswa',
    avatar: 'A',
  },
  {
    handle: '@siti_rahmawati',
    text: 'Mulai dari gratis dulu, setelah ngerasain manfaatnya langsung upgrade. Pembahasannya bikin ngerti bukan cuma hafal.',
    name: 'Siti Rahmawati',
    label: 'Siswa SMAN 2 Bandung',
    avatar: 'S',
  },
  {
    handle: '@farizfirmansyah',
    text: 'Soal Kimia dan Biologi-nya susah tapi realistis. Setelah latihan rutin di sini, Kimia yang tadinya nilai 40 jadi 78.',
    name: 'Fariz Firmansyah',
    label: 'Mahasiswa Farmasi UNPAD',
    avatar: 'F',
  },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.3)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              Platform Tryout UTBK &amp; Sekolah #1 Indonesia
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-5">
              Persiapkan{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                UTBK &amp; Ujian
              </span>{' '}
              Lebih Cerdas
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
              Ribuan soal UTBK/SNBT, Ujian Nasional, dan latihan harian SD–SMA.
              Pembahasan detail, analisis hasil, dan simulasi waktu nyata — semuanya gratis.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/register">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-semibold">
                  Mulai Gratis Sekarang <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="ghost" className="text-white border border-white/20 hover:bg-white/10">
                  <Play className="w-4 h-4" /> Lihat Tryout
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-5 mt-8 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Gratis selamanya</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Tanpa kartu kredit</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Soal sesuai UTBK 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-0.5">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER LOGOS */}
      <section className="bg-gray-50 border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray-400 font-medium uppercase tracking-widest mb-5">
            Dipercaya siswa dari berbagai universitas terbaik
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {partners.map(({ name, full }) => (
              <div key={name} className="flex flex-col items-center opacity-50 hover:opacity-80 transition-opacity">
                <div className="text-lg font-extrabold text-gray-700">{name}</div>
                <div className="text-[10px] text-gray-400">{full}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KATEGORI TRYOUT */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Siap Hadapi Ujian?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Pilih kategori tryout sesuai kebutuhanmu. Semua soal dikurasi oleh tutor berpengalaman.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tryoutCategories.map((cat) => (
              <Link key={cat.label} href={cat.href}
                className={`relative rounded-2xl p-5 border-2 ${cat.color} hover:shadow-md transition-all group`}>
                {cat.free && (
                  <span className="absolute top-3 right-3 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    GRATIS
                  </span>
                )}
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-1.5">{cat.label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{cat.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cat.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-white/70 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">{tag}</span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                  Mulai Latihan <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TRYOUTS */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Tryout Terbaru</h2>
              <p className="text-gray-500 text-sm mt-1">Langsung latihan — gratis, tanpa daftar lebih dulu</p>
            </div>
            <Link href="/dashboard" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTryouts.map((t, i) => (
              <Link key={i} href="/dashboard"
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-blue-200 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">{t.mapel}</span>
                    {t.hot && (
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg flex items-center gap-1">
                        <Flame className="w-3 h-3" /> HOT
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">{t.status}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                  {t.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {t.soal} Soal</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {t.durasi} Menit</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Cara Kerjanya Mudah</h2>
            <p className="text-gray-500 max-w-lg mx-auto">3 langkah saja untuk memulai perjalanan belajarmu.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="relative text-center">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold mx-auto mb-4 shadow-lg shadow-blue-200">
                  {num}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FITUR */}
      <section id="fitur" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Fitur Lengkap untuk Belajar Lebih Efektif</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Semua yang kamu butuhkan untuk persiapan ujian yang matang.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all">
                <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="harga" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">Harga</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-3 mb-3">Mulai dari Rp0</h2>
            <p className="text-gray-500 max-w-md mx-auto">Gratis selamanya dengan fitur lengkap. Upgrade kapan saja untuk akses penuh.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`relative bg-white rounded-2xl p-6 border-2 transition-all
                ${pkg.popular ? 'border-blue-500 shadow-xl shadow-blue-100' : 'border-gray-100 shadow-sm'}`}>
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Terpopuler
                    </span>
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{pkg.desc}</p>
                  <div className="mt-4">
                    {pkg.price === 0
                      ? <span className="text-4xl font-extrabold text-gray-900">Gratis</span>
                      : <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-extrabold text-gray-900">Rp{(pkg.price / 1000).toFixed(0)}rb</span>
                          <span className="text-gray-400 text-sm">/bulan</span>
                        </div>
                    }
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href={pkg.href}>
                  <Button
                    className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}
                    variant={pkg.popular ? 'primary' : 'outline'}
                  >
                    {pkg.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Kata Pengguna TryoutKu</h2>
            <p className="text-gray-500">Lebih dari 50.000 siswa sudah merasakan manfaatnya.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map(({ handle, text, name, label, avatar }) => (
              <div key={handle} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">
                      {avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{name}</div>
                      <div className="text-xs text-gray-400">{label}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-300 font-medium">{handle}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                <div className="flex items-center gap-0.5 mt-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-3">Siap Lolos UTBK &amp; Raih PTN Impian?</h2>
          <p className="text-blue-200 mb-8 text-base">Bergabung dengan 50.000+ siswa yang sudah latihan lebih cerdas bersama TryoutKu.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-lg">
                Daftar Gratis Sekarang <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
                Sudah Punya Akun
              </Button>
            </Link>
          </div>
          <p className="text-blue-300 text-xs mt-6 flex items-center justify-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" /> Gratis selamanya · Tanpa kartu kredit · Akses instan
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
