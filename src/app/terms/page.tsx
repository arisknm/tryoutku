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

          <div className="space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Ketentuan Penggunaan</h2>
              <p>
                TryoutKu (<strong>tryoutku.vercel.app</strong>) ditawarkan kepada Anda dengan syarat
                penerimaan terhadap syarat, ketentuan, dan pemberitahuan yang terkandung di sini.
                Dengan mengakses dan menggunakan platform ini, Anda menyatakan telah membaca,
                memahami, dan menyetujui seluruh Syarat & Ketentuan ini beserta ketentuan tambahan
                yang berlaku pada setiap halaman situs. Jika Anda tidak menyetujui syarat ini,
                mohon segera hentikan penggunaan platform TryoutKu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Gambaran Umum Layanan</h2>
              <p>
                TryoutKu adalah platform latihan soal dan tryout online untuk siswa jenjang SD,
                SMP, dan SMA. Dengan menggunakan platform ini, Anda menyetujui seluruh syarat,
                ketentuan, dan peraturan yang berlaku tanpa pengecualian. TryoutKu menyediakan
                layanan dalam dua tingkat akses: Gratis dan Premium.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Perubahan Layanan dan Ketentuan</h2>
              <p>
                TryoutKu berhak mengubah, memperbarui, atau menghentikan syarat, ketentuan,
                konten, harga, dan fitur layanan kapan saja tanpa pemberitahuan sebelumnya.
                TryoutKu juga berhak menyesuaikan harga sewaktu-waktu dan menolak pesanan jika
                terdapat kesalahan harga. Penggunaan berkelanjutan setelah perubahan dianggap
                sebagai persetujuan atas ketentuan yang telah diperbarui.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Pemberian Lisensi</h2>
              <p>
                TryoutKu memberikan Anda hak terbatas, non-eksklusif, dan tidak dapat dipindahtangankan
                untuk mengakses dan menggunakan platform semata-mata untuk keperluan belajar pribadi
                selama masa berlangganan aktif. Anda tidak diperkenankan untuk:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Memodifikasi, mengadaptasi, atau melakukan rekayasa balik pada platform</li>
                <li>Membuat karya turunan dari konten yang ada di platform</li>
                <li>Memberikan akses kepada pihak ketiga atas akun atau lisensi Anda</li>
                <li>Menggunakan platform untuk tujuan komersial tanpa izin tertulis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Hak Kekayaan Intelektual</h2>
              <p>
                Platform ini dimiliki dan dioperasikan oleh TryoutKu. Seluruh materi di platform
                ini, termasuk soal, pembahasan, desain, merek dagang, logo, dan konten lainnya
                adalah milik TryoutKu dan dilindungi oleh hukum hak cipta Indonesia serta
                peraturan internasional yang berlaku. Tidak ada materi yang boleh disalin,
                direproduksi, diubah, diunggah, ditransmisikan, atau didistribusikan dalam
                bentuk apapun tanpa izin tertulis dari TryoutKu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Biaya dan Pembayaran</h2>
              <p>
                Sebagai imbalan atas akses layanan Premium, Anda wajib membayar biaya langganan
                sesuai paket yang tercantum di halaman harga. Ketentuan biaya:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Pembayaran dilakukan di awal sebelum akses Premium diaktifkan</li>
                <li>Langganan tidak diperpanjang secara otomatis</li>
                <li>Harga belum termasuk pajak yang mungkin berlaku</li>
                <li>TryoutKu berhak mengubah harga dengan pemberitahuan sebelumnya</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">7. Kelayakan Pengguna</h2>
              <p>
                Platform TryoutKu ditujukan untuk siswa SD, SMP, dan SMA, serta orang tua dan
                guru yang mendampingi proses belajar. Pengguna di bawah umur 13 tahun wajib
                mendapatkan persetujuan orang tua atau wali sebelum mendaftarkan akun.
                Penggunaan platform untuk tujuan evaluasi atau pengembangan (selain belajar
                pribadi) memerlukan perjanjian komersial terpisah dengan TryoutKu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">8. Pendaftaran Akun</h2>
              <p>
                Anda wajib mendaftarkan akun untuk menggunakan layanan TryoutKu. Anda bertanggung
                jawab penuh atas:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Kebenaran dan keakuratan data yang diberikan saat registrasi</li>
                <li>Kerahasiaan kata sandi akun Anda</li>
                <li>Seluruh aktivitas yang terjadi pada akun Anda</li>
              </ul>
              <p className="mt-3">
                Anda tidak diperkenankan berbagi akun, menyalahgunakan identitas, atau melakukan
                misrepresentasi afiliasi dengan pihak manapun melalui platform ini.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">9. Dukungan Pengguna</h2>
              <p>
                TryoutKu menyediakan dukungan pengguna melalui email. Untuk pertanyaan teknis,
                masalah akun, atau laporan bug, silakan hubungi kami di{' '}
                <a href="mailto:kharismanurmuhammad@gmail.com" className="text-indigo-600 hover:underline">
                  kharismanurmuhammad@gmail.com
                </a>.
                Kami berupaya merespons setiap pertanyaan dalam 1–2 hari kerja.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">10. Pemutusan Layanan</h2>
              <p>
                TryoutKu berhak menangguhkan atau menghentikan akun Anda dengan segera apabila:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Anda melanggar salah satu ketentuan dalam Syarat & Ketentuan ini</li>
                <li>Anda menggunakan platform untuk kegiatan yang merugikan pengguna lain atau pihak ketiga</li>
                <li>Anda melakukan penipuan atau penyalahgunaan sistem pembayaran</li>
                <li>Terdapat aktivitas yang mencurigakan atau membahayakan keamanan platform</li>
              </ul>
              <p className="mt-3">
                Pemutusan akun tidak memberikan hak pengembalian dana atas sisa masa langganan
                jika pemutusan disebabkan oleh pelanggaran Syarat & Ketentuan ini.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">11. Kerahasiaan</h2>
              <p>
                Informasi yang Anda berikan kepada TryoutKu akan dijaga kerahasiaannya dan tidak
                akan dibagikan kepada pihak ketiga untuk tujuan komersial tanpa persetujuan Anda,
                kecuali diwajibkan oleh hukum atau peraturan yang berlaku.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">12. Komunikasi Elektronik</h2>
              <p>
                Dengan mendaftarkan akun, Anda menyetujui bahwa TryoutKu dapat mengirimkan
                email untuk keperluan pemberitahuan perubahan layanan, informasi produk, dan
                penawaran khusus. Anda dapat berhenti berlangganan email promosi kapan saja
                melalui tautan berhenti berlangganan yang terdapat di setiap email.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">13. Keamanan</h2>
              <p>
                TryoutKu mengambil langkah-langkah yang wajar untuk mencegah pelanggaran
                keamanan pada sistem kami. Namun, Anda bertanggung jawab menjaga keamanan
                akun Anda sendiri. Segera laporkan kepada kami jika Anda mencurigai akun
                Anda telah diakses secara tidak sah.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">14. Ganti Rugi (Indemnity)</h2>
              <p>
                Anda setuju untuk membebaskan, membela, dan menanggung TryoutKu dari segala
                klaim, kewajiban, kerugian, atau biaya (termasuk biaya hukum) yang timbul
                dari akses atau penggunaan Anda atas platform ini, atau dari pelanggaran
                Anda terhadap Syarat & Ketentuan ini.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">15. Penafian dan Batasan Tanggung Jawab</h2>
              <p>
                TryoutKu menyediakan platform &ldquo;sebagaimana adanya&rdquo; tanpa jaminan
                dalam bentuk apapun. TryoutKu tidak bertanggung jawab atas keakuratan,
                kelengkapan, atau ketepatan waktu konten yang tersedia. TryoutKu tidak menjamin
                bahwa platform akan selalu tersedia tanpa gangguan, dan tidak bertanggung jawab
                atas konten yang sudah kedaluwarsa atau telah dihapus.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">16. Kebijakan Privasi</h2>
              <p>
                Informasi Anda aman bersama kami. TryoutKu memahami bahwa privasi sangat
                penting bagi pengguna. Data pribadi yang Anda berikan tidak akan disalahgunakan,
                disalahgunakan, atau dijual kepada pihak lain. Kami hanya menggunakan informasi
                pribadi Anda untuk keperluan operasional layanan.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">17. Hukum yang Berlaku</h2>
              <p>
                Syarat & Ketentuan ini diatur dan ditafsirkan berdasarkan hukum yang berlaku
                di Republik Indonesia. Segala sengketa yang timbul akan diselesaikan melalui
                jalur musyawarah, dan apabila tidak tercapai kesepakatan, akan diselesaikan
                melalui pengadilan yang berwenang di Jakarta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">18. Pertanyaan dan Masukan</h2>
              <p>
                Kami menyambut pertanyaan, komentar, dan masukan Anda mengenai privasi atau
                informasi apapun yang berkaitan dengan layanan kami. Silakan kirimkan masukan
                Anda melalui:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-xl text-sm space-y-1">
                <p><strong>TryoutKu</strong></p>
                <p>Email: <a href="mailto:kharismanurmuhammad@gmail.com" className="text-indigo-600 hover:underline">kharismanurmuhammad@gmail.com</a></p>
                <p>Website: <a href="https://tryoutku.vercel.app" className="text-indigo-600 hover:underline">tryoutku.vercel.app</a></p>
              </div>
            </section>

            <div className="border-t border-gray-100 pt-6 text-sm text-gray-400">
              <p>TryoutKu adalah platform pendidikan online.</p>
              <p>Hak Cipta &copy; 2026 TryoutKu. Seluruh hak dilindungi.</p>
            </div>

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
