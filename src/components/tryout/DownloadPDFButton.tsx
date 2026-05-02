'use client'
import { useState } from 'react'
import { Download } from 'lucide-react'
import Button from '@/components/ui/Button'
import { createClient } from '@/lib/supabase'

export default function DownloadPDFButton({ attemptId, tryoutTitle }: { attemptId: string; tryoutTitle: string }) {
  const [loading, setLoading] = useState(false)

  async function handleDownload() {
    setLoading(true)
    const supabase = createClient()
    const { data: attempt } = await supabase.from('tryout_attempts').select('*, tryouts(*)').eq('id', attemptId).single()
    const { data: questions } = await supabase.from('questions').select('*').eq('tryout_id', attempt.tryout_id).order('nomor')

    const { jsPDF } = await import('jspdf')
    const autoTable = (await import('jspdf-autotable')).default

    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text(tryoutTitle, 14, 18)
    doc.setFontSize(10)
    doc.text(`Skor: ${attempt.skor}/${attempt.skor_maksimal} (${attempt.persentase}%)`, 14, 26)
    doc.text(`Tanggal: ${new Date(attempt.finished_at).toLocaleDateString('id-ID')}`, 14, 32)

    let y = 42
    for (const q of questions || []) {
      if (y > 260) { doc.addPage(); y = 14 }
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(`${q.nomor}. ${q.soal}`, 14, y, { maxWidth: 180 })
      y += 8
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      for (const [k, v] of Object.entries(q.pilihan as Record<string, string>)) {
        if (!v) continue
        const isKunci = k === q.jawaban_benar
        doc.text(`  ${k.toUpperCase()}. ${v}${isKunci ? ' ✓' : ''}`, 14, y, { maxWidth: 180 })
        y += 6
      }
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 200)
      doc.text(`Pembahasan: ${q.pembahasan}`, 14, y, { maxWidth: 180 })
      doc.setTextColor(0)
      y += 12
    }

    doc.save(`${tryoutTitle.replace(/ /g, '_')}_pembahasan.pdf`)
    setLoading(false)
  }

  return (
    <Button size="sm" onClick={handleDownload} loading={loading} variant="outline">
      <Download className="w-4 h-4" /> Download PDF
    </Button>
  )
}
