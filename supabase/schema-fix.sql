-- ============================================================
-- TryoutKu - Schema FIX (aman dijalankan ulang)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'siswa' CHECK (role IN ('siswa', 'guru', 'admin')),
  jenjang TEXT CHECK (jenjang IN ('SD', 'SMP', 'SMA')),
  kelas INTEGER CHECK (kelas BETWEEN 1 AND 12),
  sekolah TEXT,
  avatar_url TEXT,
  is_premium BOOLEAN NOT NULL DEFAULT FALSE,
  premium_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles viewable by authenticated" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

CREATE POLICY "Public profiles viewable by authenticated" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'name', 'Pengguna Baru'), 'siswa')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- TRYOUTS
CREATE TABLE IF NOT EXISTS tryouts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  mata_pelajaran TEXT NOT NULL,
  jenjang TEXT NOT NULL CHECK (jenjang IN ('SD', 'SMP', 'SMA')),
  kelas INTEGER[] NOT NULL DEFAULT '{}',
  durasi_menit INTEGER NOT NULL DEFAULT 60,
  jumlah_soal INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_free BOOLEAN NOT NULL DEFAULT TRUE,
  thumbnail_url TEXT,
  tags TEXT[],
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tryouts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active tryouts" ON tryouts;
DROP POLICY IF EXISTS "Admins and gurus can insert tryouts" ON tryouts;
DROP POLICY IF EXISTS "Creators can update their tryouts" ON tryouts;
DROP POLICY IF EXISTS "Admins can delete tryouts" ON tryouts;

CREATE POLICY "Anyone can view active tryouts" ON tryouts
  FOR SELECT USING (is_active = TRUE OR auth.uid() = created_by);
CREATE POLICY "Admins and gurus can insert tryouts" ON tryouts
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
  );
CREATE POLICY "Creators can update their tryouts" ON tryouts
  FOR UPDATE USING (auth.uid() = created_by OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can delete tryouts" ON tryouts
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
  );

-- QUESTIONS
CREATE TABLE IF NOT EXISTS questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tryout_id UUID NOT NULL REFERENCES tryouts(id) ON DELETE CASCADE,
  nomor INTEGER NOT NULL,
  soal TEXT NOT NULL,
  soal_image TEXT,
  pilihan JSONB NOT NULL DEFAULT '{"a":"","b":"","c":"","d":"","e":""}',
  jawaban_benar TEXT NOT NULL CHECK (jawaban_benar IN ('a','b','c','d','e')),
  pembahasan TEXT NOT NULL DEFAULT '',
  pembahasan_image TEXT,
  poin INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tryout_id, nomor)
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view questions" ON questions;
DROP POLICY IF EXISTS "Admins and gurus can manage questions" ON questions;

CREATE POLICY "Authenticated users can view questions" ON questions
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins and gurus can manage questions" ON questions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
  );

-- TRYOUT ATTEMPTS
CREATE TABLE IF NOT EXISTS tryout_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tryout_id UUID NOT NULL REFERENCES tryouts(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  durasi_detik INTEGER,
  jawaban JSONB NOT NULL DEFAULT '{}',
  skor INTEGER,
  skor_maksimal INTEGER,
  persentase INTEGER,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed','expired')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tryout_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own attempts" ON tryout_attempts;
DROP POLICY IF EXISTS "Admins can view all attempts" ON tryout_attempts;

CREATE POLICY "Users can manage their own attempts" ON tryout_attempts
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all attempts" ON tryout_attempts
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'guru'))
  );

-- PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  order_id TEXT NOT NULL UNIQUE,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','failed','refunded')),
  days INTEGER NOT NULL DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own payments" ON payments;
DROP POLICY IF EXISTS "System can insert payments" ON payments;
DROP POLICY IF EXISTS "System can update payments" ON payments;

CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert payments" ON payments
  FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "System can update payments" ON payments
  FOR UPDATE USING (TRUE);

-- SEED DATA
INSERT INTO tryouts (title, description, mata_pelajaran, jenjang, kelas, durasi_menit, jumlah_soal, is_active, is_free)
VALUES
  ('Tryout Matematika SMA Kelas 10 - Aljabar', 'Latihan soal aljabar dasar untuk kelas 10 SMA.', 'Matematika', 'SMA', '{10}', 90, 0, TRUE, TRUE),
  ('Tryout Bahasa Indonesia SMA - Teks Narasi', 'Latihan soal teks narasi dan deskripsi.', 'Bahasa Indonesia', 'SMA', '{10,11}', 60, 0, TRUE, TRUE),
  ('Tryout Fisika Kelas 11 - Mekanika', 'Soal-soal mekanika klasik: kinematika, dinamika, dan energi.', 'Fisika', 'SMA', '{11}', 90, 0, TRUE, TRUE),
  ('Tryout Matematika SMP Kelas 8', 'Latihan soal bilangan, aljabar, dan geometri kelas 8.', 'Matematika', 'SMP', '{8}', 90, 0, TRUE, TRUE),
  ('Tryout IPA SMP Kelas 7 - Makhluk Hidup', 'Soal-soal IPA tentang ciri-ciri makhluk hidup.', 'IPA', 'SMP', '{7}', 60, 0, TRUE, TRUE),
  ('Tryout Matematika SD Kelas 6 - Persiapan Ujian', 'Soal gabungan matematika SD kelas 6.', 'Matematika', 'SD', '{6}', 60, 0, TRUE, TRUE)
ON CONFLICT DO NOTHING;

SELECT 'Database TryoutKu berhasil dibuat!' as status;
