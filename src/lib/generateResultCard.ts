interface CardData {
  tryoutTitle: string
  persentase: number
  gradeLabel: string
  benar: number
  salah: number
  kosong: number
}

function getEmoji(p: number) {
  if (p >= 90) return '🏆'
  if (p >= 80) return '🎉'
  if (p >= 70) return '😊'
  if (p >= 60) return '💪'
  return '📚'
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

export function generateResultCard(data: CardData): Promise<Blob> {
  const { tryoutTitle, persentase, gradeLabel, benar, salah, kosong } = data

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const W = 1080
    const H = 1080
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')
    if (!ctx) { reject(new Error('Canvas tidak didukung')); return }

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, W, H)
    bg.addColorStop(0, '#3730a3')
    bg.addColorStop(0.55, '#4f46e5')
    bg.addColorStop(1, '#7c3aed')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // Dekorasi blob kanan atas
    ctx.save()
    ctx.globalAlpha = 0.08
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(W + 20, -60, 320, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(-20, H + 60, 260, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // Nama app
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 60px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText('TryoutKu', 84, 72)

    // Label "Hasil Tryout"
    ctx.fillStyle = 'rgba(199,210,254,0.85)'
    ctx.font = '34px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillText('Hasil Tryout', 84, 148)

    // === Lingkaran skor ===
    const cx = W / 2
    const cy = 450
    const R = 215
    const ringW = 18

    // Lingkaran background
    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0,0,0,0.18)'
    ctx.fill()
    ctx.restore()

    // Track cincin
    ctx.save()
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'
    ctx.lineWidth = ringW
    ctx.beginPath()
    ctx.arc(cx, cy, R - ringW / 2, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()

    // Progress cincin
    if (persentase > 0) {
      const start = -Math.PI / 2
      const end = start + (Math.PI * 2 * persentase / 100)
      ctx.save()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = ringW
      ctx.lineCap = 'round'
      ctx.shadowColor = 'rgba(255,255,255,0.45)'
      ctx.shadowBlur = 14
      ctx.beginPath()
      ctx.arc(cx, cy, R - ringW / 2, start, end)
      ctx.stroke()
      ctx.restore()
    }

    // Emoji atas angka
    ctx.font = '60px serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(getEmoji(persentase), cx, cy - 110)

    // Persentase
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 126px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${persentase}%`, cx, cy + 6)

    // Grade label
    ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillStyle = 'rgba(199,210,254,0.92)'
    ctx.fillText(gradeLabel, cx, cy + 96)

    // === Kotak statistik ===
    const stats = [
      { label: 'Benar', value: benar, bg: 'rgba(134,239,172,0.2)', accent: '#86efac' },
      { label: 'Salah', value: salah, bg: 'rgba(252,165,165,0.2)', accent: '#fca5a5' },
      { label: 'Kosong', value: kosong, bg: 'rgba(209,213,219,0.15)', accent: '#d1d5db' },
    ]

    const boxW = 285
    const boxH = 126
    const gap = 24
    const totalW = boxW * 3 + gap * 2
    const bx0 = (W - totalW) / 2
    const by = 720

    stats.forEach(({ label, value, bg: boxBg, accent }, i) => {
      const bx = bx0 + i * (boxW + gap)

      ctx.save()
      roundRect(ctx, bx, by, boxW, boxH, 22)
      ctx.fillStyle = boxBg
      ctx.fill()
      ctx.restore()

      ctx.fillStyle = '#fff'
      ctx.font = 'bold 56px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(String(value), bx + boxW / 2, by + boxH / 2 - 12)

      ctx.font = '28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      ctx.fillStyle = accent
      ctx.fillText(label, bx + boxW / 2, by + boxH / 2 + 34)
    })

    // === Judul tryout ===
    ctx.fillStyle = 'rgba(255,255,255,0.92)'
    ctx.font = 'bold 38px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const maxLen = 42
    const title = tryoutTitle.length > maxLen ? tryoutTitle.slice(0, maxLen - 1) + '…' : tryoutTitle
    ctx.fillText(title, W / 2, 900)

    // === Footer ===
    ctx.save()
    ctx.strokeStyle = 'rgba(255,255,255,0.13)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(84, 960)
    ctx.lineTo(W - 84, 960)
    ctx.stroke()
    ctx.restore()

    ctx.fillStyle = 'rgba(199,210,254,0.65)'
    ctx.font = '30px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('tryoutku.vercel.app', W / 2, 1000)

    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Gagal membuat gambar'))
      },
      'image/png'
    )
  })
}
