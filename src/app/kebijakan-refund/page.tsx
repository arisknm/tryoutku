import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Pengembalian Dana – TryoutKu',
  description: 'Kebijakan pengembalian dana dan produk platform TryoutKu.',
}

export default function KebijakanRefundPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kebijakan Pengembalian Dana</h1>
          <p className="text-sm text-gray-400 mb-10">Terakhir diperbarui: 1 Mei 2026</p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Umum</h2>
              <p>
                TryoutKu berkomitmen untuk memberikan layanan terbaik kepada pengguna. Kebijakan
                ini mengatur ketentuan pengembalian dana atas pembelian layanan Premium di platform
                TryoutKu (<strong>tryoutku.vercel.app</strong>).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Produk yang Dijual</h2>
              <p>
                TryoutKu menjual akses layanan berlangganan <strong>Premium</strong> dalam bentuk
                digital, yang memberikan fitur tambahan berupa:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Akses pembahasan lengkap setiap soal tryout</li>
                <li>Download soal dan pembahasan dalam format PDF</li>
                <li>Akses tidak terbatas ke seluruh paket tryout premium</li>
              </ul>
              <p className="mt-3">
                Karena produk yang dijual bersifat <strong>digital dan langsung dapat diakses</strong>
                setelah pembayaran berhasil, berlaku ketentuan pengembalian dana berikut.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Ketentuan Pengembalian Dana</h2>

              <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-4">
                <h3 className="font-bold text-green-800 mb-2">✅ Refund Dapat Diajukan Jika:</h3>
                <ul className="list-disc pl-6 space-y-1 text-green-700 text-sm">
                  <li>Pembayaran berhasil diproses tetapi akses Premium tidak aktif dalam 1×24 jam</li>
                  <li>Terjadi duplikasi pembayaran (terbayar dua kali untuk pesanan yang sama)</li>
                  <li>Terdapat kesalahan teknis yang menyebabkan layanan tidak dapat digunakan sama sekali</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <h3 className="font-bold text-red-800 mb-2">❌ Refund Tidak Dapat Diajukan Jika:</h3>
                <ul className="list-disc pl-6 space-y-1 text-red-700 text-sm">
                  <li>Pengguna sudah mengakses fitur Premium (pembahasan, download PDF, dll)</li>
                  <li>Permintaan diajukan lebih dari 1×24 jam setelah pembayaran berhasil</li>
                  <li>Pengguna berubah pikiran setelah layanan berjalan normal</li>
                  <li>Akun dinonaktifkan karena melanggar Syarat & Ketentuan</li>
                  <li>Gangguan koneksi internet dari sisi pengguna</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Cara Mengajukan Pengembalian Dana</h2>
              <p>Untuk mengajukan refund, kirimkan email ke kami dengan informasi berikut:</p>
              <div className="mt-3 p-4 bg-gray-50 rounded-xl text-sm space-y-1">
                <p><strong>Email:</strong> <a href="mailto:kharismanurmuhammad@gmail.com" className="text-indigo-600 hover:underline">kharismanurmuhammad@gmail.com</a></p>
                <p><strong>Subjek:</strong> Permintaan Refund – [Nama Akun]</p>
              </div>
              <p className="mt-3">Sertakan informasi berikut dalam email:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Nama lengkap dan email akun TryoutKu</li>
                <li>Nomor order / ID transaksi</li>
                <li>Tanggal dan jumlah pembayaran</li>
                <li>Alasan pengajuan refund</li>
                <li>Bukti pembayaran (screenshot)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Proses dan Waktu Pengembalian Dana</h2>
              <p>Setelah pengajuan diterima dan diverifikasi:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  <strong>Verifikasi:</strong> Tim kami akan memproses permintaan dalam
                  <strong> 2–3 hari kerja</strong>
                </li>
                <li>
                  <strong>Pencairan:</strong> Dana dikembalikan ke metode pembayaran asal dalam
                  <strong> 7–14 hari kerja</strong> setelah verifikasi disetujui
                </li>
                <li>
                  <strong>Notifikasi:</strong> Konfirmasi refund akan dikirimkan melalui email
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Metode Pengembalian Dana</h2>
              <p>
                Pengembalian dana dilakukan melalui metode pembayaran yang sama dengan saat
                transaksi awal dilakukan (transfer bank, QRIS, dompet digital, dll),
                sesuai kebijakan payment gateway yang digunakan.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">7. Hubungi Kami</h2>
              <p>
                Jika Anda memiliki pertanyaan mengenai kebijakan ini, jangan ragu untuk
                menghubungi kami:
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
          <Link href="/terms" className="text-indigo-600 hover:underline">Syarat & Ketentuan</Link>
          <span className="mx-2">·</span>
          <Link href="/" className="hover:text-gray-600">Kembali ke Beranda</Link>
        </div>
      </div>
    </div>
  )
}
