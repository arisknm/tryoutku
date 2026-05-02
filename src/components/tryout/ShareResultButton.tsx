'use client'

import { useState } from 'react'
import { Share2, MessageCircle, Twitter, Copy, Check, Download, ImageIcon, Loader2 } from 'lucide-react'
import { generateResultCard } from '@/lib/generateResultCard'

interface ShareResultButtonProps {
  tryoutTitle: string
  persentase: number
  gradeLabel: string
  benar: number
  salah: number
  kosong: number
}

function getEmoji(persentase: number) {
  if (persentase >= 90) return '🏆'
  if (persentase >= 80) return '🎉'
  if (persentase >= 70) return '😊'
  if (persentase >= 60) return '💪'
  return '📚'
}

export default function ShareResultButton(props: ShareResultButtonProps) {
  const { tryoutTitle, persentase, gradeLabel, benar, salah, kosong } = props
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  const [loadingCard, setLoadingCard] = useState(false)

  const emoji = getEmoji(persentase)
  const shareText =
    `${emoji} Aku baru selesai tryout "${tryoutTitle}" di TryoutKu!\n\n` +
    `📊 Skor: ${persentase}%\n` +
    `🏅 Nilai: ${gradeLabel}\n` +
    `✅ Benar: ${benar}  ❌ Salah: ${salah}  ⬜ Kosong: ${kosong}\n\n` +
    `Coba juga tryout online gratis di TryoutKu! 👉 https://tryoutku.vercel.app`

  const encoded = encodeURIComponent(shareText)

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encoded}`, '_blank')
    setOpen(false)
  }

  function shareTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank')
    setOpen(false)
  }

  async function copyText() {
    await navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function downloadCard() {
    setLoadingCard(true)
    setOpen(false)
    try {
      const blob = await generateResultCard(props)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `tryout-${tryoutTitle.replace(/\s+/g, '-').toLowerCase()}.png`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setLoadingCard(false)
    }
  }

  async function shareCard() {
    setLoadingCard(true)
    setOpen(false)
    try {
      const blob = await generateResultCard(props)
      const file = new File([blob], 'hasil-tryout.png', { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Hasil Tryout – ${tryoutTitle}`,
          text: shareText,
        })
      } else {
        // Fallback ke download jika share file tidak didukung
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'hasil-tryout.png'
        a.click()
        URL.revokeObjectURL(url)
      }
    } finally {
      setLoadingCard(false)
    }
  }

  async function shareNative() {
    if (navigator.share) {
      await navigator.share({ text: shareText, title: `Hasil Tryout – ${tryoutTitle}` })
    } else {
      setOpen(true)
    }
  }

  return (
    <div className="relative inline-flex flex-col items-center gap-3">
      {/* Tombol utama: Share Gambar */}
      <button
        onClick={shareCard}
        disabled={loadingCard}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/25 border-2 border-white/60 hover:bg-white/35 hover:border-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loadingCard
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Membuat kartu…</>
          : <><ImageIcon className="w-4 h-4" /> Bagikan sebagai Gambar</>
        }
      </button>

      {/* Tombol sekunder: Share teks */}
      <button
        onClick={shareNative}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white border border-white/30 hover:border-white/60 transition-all"
      >
        <Share2 className="w-3.5 h-3.5" />
        Bagikan sebagai Teks
      </button>

      {/* Dropdown platform teks */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 w-64 space-y-1.5">
            <p className="text-xs text-gray-400 font-medium pb-1">Bagikan teks ke</p>

            <button
              onClick={shareWhatsApp}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors text-left"
            >
              <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </span>
              <span className="text-sm font-medium text-gray-700">WhatsApp</span>
            </button>

            <button
              onClick={shareTwitter}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
            >
              <span className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <Twitter className="w-4 h-4 text-white" />
              </span>
              <span className="text-sm font-medium text-gray-700">X / Twitter</span>
            </button>

            <button
              onClick={copyText}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors text-left"
            >
              <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                {copied ? <Check className="w-4 h-4 text-indigo-600" /> : <Copy className="w-4 h-4 text-indigo-600" />}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {copied ? 'Tersalin!' : 'Salin Teks'}
              </span>
            </button>

            <div className="border-t border-gray-100 pt-1.5 mt-1.5">
              <button
                onClick={downloadCard}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-violet-50 transition-colors text-left"
              >
                <span className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-violet-600" />
                </span>
                <span className="text-sm font-medium text-gray-700">Download Kartu PNG</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
