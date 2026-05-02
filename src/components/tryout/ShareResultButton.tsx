'use client'

import { useState } from 'react'
import { Share2, MessageCircle, Twitter, Copy, Check } from 'lucide-react'

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

export default function ShareResultButton({
  tryoutTitle,
  persentase,
  gradeLabel,
  benar,
  salah,
  kosong,
}: ShareResultButtonProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

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
  }

  function shareTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank')
  }

  async function copyText() {
    await navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function shareNative() {
    if (navigator.share) {
      await navigator.share({ text: shareText, title: `Hasil Tryout – ${tryoutTitle}` })
    } else {
      setOpen(true)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={shareNative}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-white/20 border-2 border-white/50 hover:bg-white/30 hover:border-white transition-all"
      >
        <Share2 className="w-4 h-4" />
        Bagikan Hasil
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 z-50 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 w-64 space-y-2">
            <p className="text-xs text-gray-400 font-medium mb-3">Bagikan ke</p>

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
          </div>
        </>
      )}
    </div>
  )
}
