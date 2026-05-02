import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TryoutKu - Platform Latihan Soal SD, SMP & SMA',
  description:
    'Platform tryout online terbaik untuk siswa SD, SMP, dan SMA. Latihan soal lengkap, pembahasan detail, dan analisis hasil belajar.',
  keywords: 'tryout online, latihan soal, ujian nasional, UTBK, SD, SMP, SMA',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  )
}
