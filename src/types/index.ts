export type UserRole = 'siswa' | 'guru' | 'admin'
export type JenjangSekolah = 'SD' | 'SMP' | 'SMA'
export type MataPelajaran =
  | 'Matematika'
  | 'Bahasa Indonesia'
  | 'Bahasa Inggris'
  | 'IPA'
  | 'IPS'
  | 'PKn'
  | 'Fisika'
  | 'Kimia'
  | 'Biologi'
  | 'Sejarah'
  | 'Geografi'
  | 'Ekonomi'
  | 'Sosiologi'
  | 'Lainnya'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  jenjang?: JenjangSekolah
  kelas?: number
  sekolah?: string
  avatar_url?: string
  is_premium: boolean
  premium_until?: string
  created_at: string
}

export interface Tryout {
  id: string
  title: string
  description: string
  mata_pelajaran: MataPelajaran
  jenjang: JenjangSekolah
  kelas: number[]
  durasi_menit: number
  jumlah_soal: number
  is_active: boolean
  is_free: boolean
  created_by: string
  created_at: string
  thumbnail_url?: string
  tags?: string[]
}

export interface Question {
  id: string
  tryout_id: string
  nomor: number
  soal: string
  soal_image?: string
  pilihan: {
    a: string
    b: string
    c: string
    d: string
    e?: string
  }
  jawaban_benar: 'a' | 'b' | 'c' | 'd' | 'e'
  pembahasan: string
  pembahasan_image?: string
  poin: number
}

export interface TryoutAttempt {
  id: string
  user_id: string
  tryout_id: string
  tryout?: Tryout
  started_at: string
  finished_at?: string
  durasi_detik?: number
  jawaban: Record<string, string>
  skor?: number
  skor_maksimal?: number
  persentase?: number
  status: 'in_progress' | 'completed' | 'expired'
}

export interface Package {
  id: string
  name: string
  price: number
  duration_days: number
  features: string[]
  is_popular: boolean
}

export interface TryoutResult {
  attempt: TryoutAttempt
  questions: Question[]
  benar: number
  salah: number
  kosong: number
  per_soal: Array<{
    nomor: number
    soal: string
    jawaban_siswa?: string
    jawaban_benar: string
    is_correct: boolean
    poin: number
  }>
}
