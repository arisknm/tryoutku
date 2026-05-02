import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDurasi(menit: number): string {
  if (menit < 60) return `${menit} menit`
  const jam = Math.floor(menit / 60)
  const sisaMenit = menit % 60
  return sisaMenit > 0 ? `${jam} jam ${sisaMenit} menit` : `${jam} jam`
}

export function formatDetik(detik: number): string {
  const mnt = Math.floor(detik / 60)
  const dtk = detik % 60
  return `${String(mnt).padStart(2, '0')}:${String(dtk).padStart(2, '0')}`
}

export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka)
}

export function getGradeColor(persentase: number): string {
  if (persentase >= 80) return 'text-green-600'
  if (persentase >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

export function getGradeBg(persentase: number): string {
  if (persentase >= 80) return 'bg-green-100 text-green-800'
  if (persentase >= 60) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

export function getGradeLabel(persentase: number): string {
  if (persentase >= 90) return 'Sangat Baik'
  if (persentase >= 80) return 'Baik'
  if (persentase >= 70) return 'Cukup'
  if (persentase >= 60) return 'Kurang'
  return 'Sangat Kurang'
}

export function getJenjangColor(jenjang: string): string {
  const map: Record<string, string> = {
    SD: 'bg-green-100 text-green-700',
    SMP: 'bg-blue-100 text-blue-700',
    SMA: 'bg-purple-100 text-purple-700',
  }
  return map[jenjang] || 'bg-gray-100 text-gray-700'
}
