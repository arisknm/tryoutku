import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan – TryoutKu',
  description: 'Syarat dan ketentuan penggunaan platform TryoutKu.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">TryoutKu</span>
          </Link>
        </div>
      </div>

      {/* Konten */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Syarat & Ketentuan</h1>
          <p className="text-sm text-gray-400 mb-10">Terakhir diperbarui: 1 Mei 2026</p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Penerimaan Syarat</h2>
              <p>
                Dengan mengakses dan menggunakan platform TryoutKu (<strong>tryoutku.vercel.app</strong>),
                Anda menyatakan telah membaca, memahami, dan menyetujui Syarat & Ketentuan ini.
                Jika Anda tidak menyetujui syarat ini, mohon untuk tidak menggunakan layanan kami.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Deskripsi Layanan</h2>
              <p>
                TryoutKu adalah platform latihan soal dan tryout online yang ditujukan untuk siswa
                jenjang SD, SMP, dan SMA. Layanan kami meliputi:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Akses soal latihan dan tryout online</li>
                <li>Pembahasan soal (untuk pengguna Premium)</li>
                <li>Analisis hasil dan statistik belajar</li>
                <li>Fitur download soal dalam format PDF (untuk pengguna Premium)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Akun Pengguna</h2>
              <p>
                Untuk menggunakan layanan TryoutKu, Anda wajib mendaftarkan akun dengan informasi
                yang benar dan akurat. Anda bertanggung jawab penuh atas:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Kerahasiaan kata sandi akun Anda</li>
                <li>Seluruh aktivitas yang terjadi pada akun Anda</li>
                <li>Memastikan data yang diberikan adalah benar dan terkini</li>
              </ul>
              <p className="mt-3">
                TryoutKu berhak menonaktifkan akun yang melanggar syarat ini tanpa pemberitahuan
                sebelumnya.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Layanan Premium</h2>
              <p>
                TryoutKu menawarkan layanan berlangganan Premium yang memberikan akses ke fitur
                tambahan. Dengan berlangganan Premium, Anda menyetujui:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Pembayaran dilakukan di awal sesuai paket yang dipilih</li>
                <li>Langganan tidak diperpanjang secara otomatis</li>
                <li>Harga dapat berubah sewaktu-waktu dengan pemberitahuan sebelumnya</li>
                <li>Akses Premium berlaku sesuai durasi paket yang dibeli</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Hak Kekayaan Intelektual</h2>
              <p>
                Seluruh konten di platform TryoutKu, termasuk namun tidak terbatas pada soal,
                pembahasan, desain, logo, dan teks, adalah milik TryoutKu dan dilindungi oleh
                hukum hak cipta yang berlaku di Indonesia. Pengguna dilarang:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Menyalin, mendistribusikan, atau menjual konten platform tanpa izin tertulis</li>
                <li>Melakukan scraping atau pengambilan data secara massal</li>
                <li>Menggunakan konten untuk kepentingan komersial tanpa persetujuan</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Larangan Penggunaan</h2>
              <p>Pengguna dilarang menggunakan platform TryoutKu untuk:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Kegiatan yang melanggar hukum yang berlaku di Indonesia</li>
                <li>Menyebarkan konten yang bersifat SARA, pornografi, atau merugikan pihak lain</li>
                <li>Mencoba meretas atau mengganggu sistem keamanan platform</li>
                <li>Berbagi akun Premium kepada pihak lain</li>
                <li>Menggunakan bot atau alat otomatis untuk mengakses layanan</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">7. Penafian (Disclaimer)</h2>
              <p>
                TryoutKu menyediakan layanan &ldquo;sebagaimana adanya&rdquo; tanpa jaminan
                dalam bentuk apapun. Kami tidak menjamin bahwa layanan akan selalu tersedia
                tanpa gangguan atau bebas dari kesalahan. TryoutKu tidak bertanggung jawab
                atas kegagalan belajar atau hasil ujian pengguna.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">8. Batasan Tanggung Jawab</h2>
              <p>
                Dalam batas yang diizinkan oleh hukum, TryoutKu tidak bertanggung jawab atas
                kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari
                penggunaan atau ketidakmampuan menggunakan layanan kami.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">9. Perubahan Layanan</h2>
              <p>
                TryoutKu berhak mengubah, menambah, atau menghentikan fitur layanan kapan saja.
                Perubahan pada Syarat & Ketentuan ini akan diberitahukan melalui email atau
                notifikasi di platform. Penggunaan berkelanjutan setelah perubahan dianggap
                sebagai persetujuan atas syarat yang baru.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">10. Hukum yang Berlaku</h2>
              <p>
                Syarat & Ketentuan ini diatur dan ditafsirkan berdasarkan hukum yang berlaku
                di Republik Indonesia. Segala sengketa yang timbul akan diselesaikan melalui
                jalur musyawarah, dan apabila tidak tercapai kesepakatan, akan diselesaikan
                melalui pengadilan yang berwenang di Jakarta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">11. Hubungi Kami</h2>
              <p>
                Jika Anda memiliki pertanyaan mengenai Syarat & Ketentuan ini, silakan hubungi kami:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-xl text-sm space-y-1">
                <p><strong>TryoutKu</strong></p>
                <p>Email: <a href="mailto:kharismanurmuhammad@gmail.com" className="text-indigo-600 hover:underline">kharismanurmuhammad@gmail.com</a></p>
                <p>Website: <a href="https://tryoutku.vercel.app" className="text-indigo-600 hover:underline">tryoutku.vercel.app</a></p>
              </div>
            </section>

          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          <Link href="/kebijakan-refund" className="text-indigo-600 hover:underline">Kebijakan Pengembalian Dana</Link>
          <span className="mx-2">·</span>
          <Link href="/" className="hover:text-gray-600">Kembali ke Beranda</Link>
        </div>
      </div>
    </div>
  )
}
