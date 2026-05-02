# TryoutKu - Panduan Setup & Deployment

## Struktur Bisnis

| Pengguna | Fitur |
|----------|-------|
| **Gratis** | Daftar, kerjakan tryout, lihat skor langsung, ada iklan |
| **Premium (Rp49rb/bln)** | + Pembahasan soal, download PDF, analisis detail, tanpa iklan |
| **Sekolah (Rp299rb/bln)** | + Kelola kelas, input soal sendiri, laporan guru |

---

## LANGKAH 1 — Setup Supabase (Database & Auth)

1. Buka https://supabase.com dan buat akun gratis
2. Klik **New Project** → isi nama project (misal: `tryoutku`) → buat
3. Tunggu project selesai dibuat (~2 menit)
4. Buka **SQL Editor** (menu kiri) → klik **New Query**
5. Copy-paste isi file `supabase/schema.sql` → klik **Run**
6. Buka **Project Settings → API** → copy:
   - `Project URL` → isi ke `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → isi ke `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Setup Auth Email di Supabase
- **Authentication → Providers → Email** → aktifkan "Enable Email Signup"
- **Authentication → URL Configuration**:
  - Site URL: `https://domainmu.vercel.app`
  - Redirect URLs: `https://domainmu.vercel.app/**`

---

## LANGKAH 2 — Setup Midtrans (Pembayaran)

1. Daftar di https://midtrans.com → pilih **Sandbox** untuk testing
2. Login → **Settings → Access Keys** → copy Server Key & Client Key
3. Isi di `.env.local`:
   ```
   MIDTRANS_SERVER_KEY=SB-Mid-server-xxxx
   MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxx
   MIDTRANS_ENV=sandbox
   ```
4. **Settings → Configuration → Payment Notification URL** (Webhook):
   `https://domainmu.vercel.app/api/payment/webhook`
5. Saat siap production: ganti `sandbox` → `production` dan ganti key ke production key

---

## LANGKAH 3 — Setup Google AdSense (Iklan)

1. Daftar di https://adsense.google.com
2. Tambahkan sitemu dan tunggu persetujuan (1-7 hari)
3. Setelah disetujui, copy **Publisher ID** (format: `ca-pub-xxxx`)
4. Isi di `.env.local`: `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxx`
5. Buat **Ad Units** baru → copy Slot ID untuk setiap banner
6. Update `slot` di komponen `AdBanner` sesuai slot yang dibuat

---

## LANGKAH 4 — Deploy ke Vercel (Gratis)

1. Push project ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git remote add origin https://github.com/username/tryoutku.git
   git push -u origin main
   ```
2. Buka https://vercel.com → login → **New Project**
3. Import repository dari GitHub
4. **Environment Variables** → tambahkan semua isi `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `MIDTRANS_SERVER_KEY`
   - `MIDTRANS_CLIENT_KEY`
   - `MIDTRANS_ENV`
   - `NEXT_PUBLIC_ADSENSE_CLIENT`
   - `NEXT_PUBLIC_SITE_URL` (isi dengan URL Vercel setelah deploy)
5. Klik **Deploy** → tunggu ~3 menit

---

## LANGKAH 5 — Buat Akun Admin

1. Buka web yang sudah deploy → daftar akun normal
2. Buka **Supabase → Table Editor → profiles**
3. Cari email kamu → ubah kolom `role` dari `siswa` → `admin`
4. Logout → login kembali → kamu bisa akses `/admin`

---

## MENJALANKAN DI LOKAL (Development)

```bash
# 1. Copy file environment
cp .env.local.example .env.local
# 2. Isi nilai di .env.local

# 3. Install dependencies
npm install

# 4. Jalankan dev server
npm run dev

# 5. Buka browser di
# http://localhost:3000
```

---

## STRUKTUR FOLDER

```
web-tryout/
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Landing Page
│   │   ├── login/                ← Halaman Login
│   │   ├── register/             ← Halaman Daftar
│   │   ├── dashboard/            ← Dashboard Siswa
│   │   │   ├── tryout/           ← Daftar & Kerjakan Tryout
│   │   │   ├── hasil/            ← Hasil & Pembahasan (Premium)
│   │   │   ├── premium/          ← Halaman Upgrade
│   │   │   └── profil/           ← Edit Profil
│   │   ├── admin/                ← Admin Panel
│   │   │   ├── tryout/           ← Kelola Tryout
│   │   │   ├── soal/             ← Kelola Soal
│   │   │   └── users/            ← Kelola Pengguna
│   │   └── api/
│   │       ├── auth/logout/      ← Logout endpoint
│   │       └── payment/          ← Midtrans webhook
│   ├── components/
│   │   ├── ui/                   ← Button, Badge
│   │   ├── layout/               ← Navbar, Footer, Sidebar
│   │   ├── tryout/               ← TryoutCard, TryoutEngine, Timer
│   │   ├── admin/                ← Form, Delete buttons
│   │   ├── dashboard/            ← ProfilForm
│   │   ├── ads/                  ← AdBanner (Google AdSense)
│   │   └── premium/              ← PremiumCheckoutButton
│   ├── lib/
│   │   ├── supabase.ts           ← Client-side Supabase
│   │   ├── supabase-server.ts    ← Server-side Supabase
│   │   ├── store.ts              ← Zustand state management
│   │   └── utils.ts              ← Helper functions
│   ├── types/index.ts            ← TypeScript types
│   └── middleware.ts             ← Auth route protection
├── supabase/schema.sql           ← Database schema
├── .env.local.example            ← Template environment variables
└── PANDUAN-SETUP.md              ← File ini
```

---

## MONETISASI

### Iklan (Pasif)
- Iklan otomatis muncul untuk pengguna **Gratis** di halaman dashboard, daftar tryout, dan hasil
- Tidak muncul untuk pengguna **Premium**
- Estimasi pendapatan: Rp 500–2.000 per 1.000 tayangan (tergantung niche & traffic)

### Premium (Aktif)
- Pengguna bayar untuk akses pembahasan + download PDF
- Pembayaran via Midtrans (transfer bank, QRIS, e-wallet, kartu kredit)
- Otomatis aktif setelah pembayaran sukses (webhook)

### Tips Growth
1. Buat konten soal berkualitas sesuai kurikulum terbaru
2. Bagikan tryout gratis ke grup belajar & media sosial
3. Tawarkan paket diskon saat musim ujian (PTS, PAS, UN)
4. Rekrut guru sebagai kontributor soal dengan bagi hasil

---

*Dibuat dengan Next.js 16, Supabase, Tailwind CSS, Midtrans*
