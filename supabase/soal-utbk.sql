-- ============================================================
-- TryoutKu - Soal UTBK/SNBT Lengkap
-- 10 Tryout x 20 Soal = 200 Soal
-- TPS: Penalaran Umum, Pengetahuan Kuantitatif
-- TKA Saintek: Matematika, Fisika, Kimia, Biologi
-- TKA Soshum: Sejarah, Geografi, Ekonomi, Sosiologi
-- ============================================================

-- Tambah tryout UTBK
INSERT INTO tryouts (title, description, mata_pelajaran, jenjang, kelas, durasi_menit, jumlah_soal, is_active, is_free)
VALUES
  ('UTBK TPS - Penalaran Umum', 'Simulasi TPS UTBK: soal logika, analogi, silogisme, dan deret.', 'TPS', 'SMA', '{12}', 30, 0, TRUE, TRUE),
  ('UTBK TPS - Pengetahuan Kuantitatif', 'Simulasi TPS UTBK: matematika dasar, aljabar, geometri, statistika.', 'TPS', 'SMA', '{12}', 30, 0, TRUE, TRUE),
  ('UTBK TKA Saintek - Matematika', 'Simulasi TKA Saintek: kalkulus, trigonometri, statistika tingkat lanjut.', 'Matematika', 'SMA', '{12}', 45, 0, TRUE, FALSE),
  ('UTBK TKA Saintek - Fisika', 'Simulasi TKA Saintek: mekanika, listrik-magnet, gelombang, modern.', 'Fisika', 'SMA', '{12}', 45, 0, TRUE, FALSE),
  ('UTBK TKA Saintek - Kimia', 'Simulasi TKA Saintek: stoikiometri, kesetimbangan, asam-basa, organik.', 'Kimia', 'SMA', '{12}', 45, 0, TRUE, FALSE),
  ('UTBK TKA Saintek - Biologi', 'Simulasi TKA Saintek: sel, genetika, ekologi, sistem organ.', 'Biologi', 'SMA', '{12}', 45, 0, TRUE, FALSE),
  ('UTBK TKA Soshum - Sejarah', 'Simulasi TKA Soshum: sejarah Indonesia dari Hindu-Buddha hingga Reformasi.', 'Sejarah', 'SMA', '{12}', 45, 0, TRUE, FALSE),
  ('UTBK TKA Soshum - Geografi', 'Simulasi TKA Soshum: konsep geografi, dinamika bumi, kependudukan.', 'Geografi', 'SMA', '{12}', 45, 0, TRUE, FALSE),
  ('UTBK TKA Soshum - Ekonomi', 'Simulasi TKA Soshum: mikro-makro ekonomi, kebijakan fiskal-moneter.', 'Ekonomi', 'SMA', '{12}', 45, 0, TRUE, FALSE),
  ('UTBK TKA Soshum - Sosiologi', 'Simulasi TKA Soshum: interaksi sosial, stratifikasi, perubahan sosial.', 'Sosiologi', 'SMA', '{12}', 45, 0, TRUE, FALSE)
ON CONFLICT DO NOTHING;

-- ============================================================
-- 1. TPS - PENALARAN UMUM (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, 'PANAS : API :: DINGIN : ...', '{"a":"Air","b":"Angin","c":"Es","d":"Hujan","e":"Salju"}', 'c', 'Api adalah sumber panas, Es adalah sumber dingin. Analogi: sumber dari sifat tersebut.'),
(2, 'Deret angka: 2, 5, 10, 17, 26, ... Angka berikutnya adalah...', '{"a":"33","b":"35","c":"37","d":"39","e":"41"}', 'c', 'Pola beda: +3, +5, +7, +9, +11. Maka 26 + 11 = 37.'),
(3, 'Semua guru adalah sarjana. Budi adalah guru. Maka kesimpulan yang tepat adalah...', '{"a":"Budi bukan sarjana","b":"Budi adalah sarjana","c":"Semua sarjana adalah guru","d":"Budi mungkin sarjana","e":"Tidak dapat disimpulkan"}', 'b', 'Modus ponens: semua A adalah B, Budi adalah A, maka Budi adalah B (sarjana).'),
(4, 'PENULIS : NOVEL :: PELUKIS : ...', '{"a":"Kuas","b":"Kanvas","c":"Galeri","d":"Lukisan","e":"Cat"}', 'd', 'Penulis menghasilkan novel, pelukis menghasilkan lukisan. Analogi: profesi dan hasil karyanya.'),
(5, 'Deret: 1, 1, 2, 3, 5, 8, 13, ... Angka berikutnya adalah...', '{"a":"18","b":"19","c":"20","d":"21","e":"22"}', 'd', 'Barisan Fibonacci: setiap suku = jumlah dua suku sebelumnya. 8+13=21.'),
(6, 'Jika hari ini hujan, maka Ana membawa payung. Hari ini Ana tidak membawa payung. Maka...', '{"a":"Hari ini hujan","b":"Hari ini tidak hujan","c":"Ana sakit","d":"Ana lupa","e":"Tidak dapat disimpulkan"}', 'b', 'Modus tollens: jika P maka Q; tidak Q; maka tidak P. Tidak membawa payung → tidak hujan.'),
(7, 'DOKTER : STETOSKOP :: PETANI : ...', '{"a":"Sawah","b":"Padi","c":"Pupuk","d":"Cangkul","e":"Tanah"}', 'd', 'Stetoskop adalah alat kerja dokter, cangkul adalah alat kerja petani.'),
(8, 'Deret: 100, 50, 25, 12,5, ... Angka berikutnya adalah...', '{"a":"5","b":"6","c":"6,25","d":"7","e":"7,5"}', 'c', 'Setiap suku dibagi 2. 12,5 / 2 = 6,25.'),
(9, 'Beberapa mahasiswa adalah atlet. Semua atlet adalah orang sehat. Kesimpulan yang tepat...', '{"a":"Semua mahasiswa sehat","b":"Beberapa mahasiswa adalah orang sehat","c":"Semua orang sehat adalah mahasiswa","d":"Tidak ada mahasiswa yang sehat","e":"Atlet bukan mahasiswa"}', 'b', 'Beberapa A adalah B, semua B adalah C, maka beberapa A adalah C.'),
(10, 'PETA : GEOGRAFI :: KAMUS : ...', '{"a":"Kata","b":"Bahasa","c":"Buku","d":"Definisi","e":"Alfabet"}', 'b', 'Peta adalah alat/produk utama geografi, kamus adalah alat/produk utama bahasa.'),
(11, 'Deret: 7, 14, 13, 26, 25, 50, 49, ... Angka berikutnya adalah...', '{"a":"48","b":"88","c":"90","d":"96","e":"98"}', 'e', 'Pola: ×2, -1, ×2, -1, ... Maka 49 × 2 = 98.'),
(12, 'Andi lebih tinggi dari Budi. Cici lebih tinggi dari Andi. Deni lebih pendek dari Budi. Urutan dari tertinggi adalah...', '{"a":"Andi, Cici, Budi, Deni","b":"Cici, Budi, Andi, Deni","c":"Cici, Andi, Budi, Deni","d":"Andi, Budi, Cici, Deni","e":"Cici, Deni, Andi, Budi"}', 'c', 'Cici > Andi > Budi > Deni. Urutan tertinggi: Cici, Andi, Budi, Deni.'),
(13, 'PANTAI : OMBAK :: GUNUNG : ...', '{"a":"Laut","b":"Angin","c":"Pasir","d":"Salju","e":"Kabut"}', 'e', 'Ombak adalah fenomena khas pantai, kabut adalah fenomena khas gunung.'),
(14, 'Deret huruf: A, C, E, G, I, ... Huruf berikutnya adalah...', '{"a":"J","b":"K","c":"L","d":"M","e":"N"}', 'b', 'Pola: melompat satu huruf (+2). Setelah I (ke-9), berikutnya K (ke-11).'),
(15, 'Jika A maka B. Jika B maka C. A terjadi. Apa yang pasti terjadi?', '{"a":"Hanya B","b":"Hanya C","c":"B dan C saja","d":"A, B, dan C","e":"Tidak ada yang pasti"}', 'd', 'A → B → C. Jika A terjadi, maka B terjadi, dan karena B terjadi, C pasti terjadi.'),
(16, 'BUAH : POHON :: ANAK : ...', '{"a":"Sekolah","b":"Mainan","c":"Orang tua","d":"Rumah","e":"Teman"}', 'c', 'Buah dihasilkan oleh pohon, anak dilahirkan oleh orang tua.'),
(17, 'Deret: 3, 6, 12, 24, 48, ... Angka berikutnya adalah...', '{"a":"72","b":"84","c":"96","d":"108","e":"120"}', 'c', 'Setiap suku dikalikan 2. 48 × 2 = 96.'),
(18, 'Tidak ada manusia yang tidak bisa salah. Ana adalah manusia. Kesimpulan yang tepat...', '{"a":"Ana tidak pernah salah","b":"Ana pasti selalu salah","c":"Ana bisa salah","d":"Ana sempurna","e":"Tidak dapat disimpulkan"}', 'c', 'Semua manusia bisa salah (negasi dari tidak ada manusia yang tidak bisa salah), Ana adalah manusia, maka Ana bisa salah.'),
(19, 'PANAS : DINGIN :: TERANG : ...', '{"a":"Siang","b":"Lampu","c":"Gelap","d":"Matahari","e":"Warna"}', 'c', 'Panas dan dingin adalah antonim. Terang dan gelap adalah antonim.'),
(20, 'Deret: 2, 3, 5, 8, 12, 17, ... Angka berikutnya adalah...', '{"a":"21","b":"22","c":"23","d":"24","e":"25"}', 'c', 'Beda: +1, +2, +3, +4, +5, +6. Maka 17 + 6 = 23.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'UTBK TPS - Penalaran Umum'
ON CONFLICT (tryout_id, nomor) DO NOTHING;
UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'UTBK TPS - Penalaran Umum';

-- ============================================================
-- 2. TPS - PENGETAHUAN KUANTITATIF (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, 'Nilai dari 2³ + 3² - √25 = ...', '{"a":"10","b":"11","c":"12","d":"13","e":"14"}', 'c', '2³=8, 3²=9, √25=5. Maka 8+9-5 = 12.'),
(2, 'Jika 2x + 3 = 11, maka nilai 4x - 1 = ...', '{"a":"13","b":"14","c":"15","d":"16","e":"17"}', 'c', '2x=8 → x=4. Maka 4(4)-1 = 15.'),
(3, 'Kendaraan menempuh 240 km dalam 3 jam. Jarak yang ditempuh dalam 5 jam adalah...', '{"a":"320 km","b":"360 km","c":"400 km","d":"440 km","e":"480 km"}', 'c', 'v = 240/3 = 80 km/jam. Jarak = 80×5 = 400 km.'),
(4, 'Rata-rata nilai 8 siswa adalah 75. Seorang siswa baru masuk dengan nilai 83. Rata-rata baru adalah...', '{"a":"75","b":"76","c":"77","d":"78","e":"79"}', 'b', 'Total = 8×75 = 600. Total baru = 600+83 = 683. Rata-rata = 683/9 ≈ 75,9 ≈ 76.'),
(5, 'Jika p = 3 dan q = -2, maka p² - 2pq + q² = ...', '{"a":"1","b":"13","c":"17","d":"25","e":"29"}', 'd', '(p-q)² = (3-(-2))² = 5² = 25.'),
(6, 'Luas trapesium dengan sisi sejajar 10 cm dan 14 cm, tinggi 8 cm adalah...', '{"a":"72 cm²","b":"80 cm²","c":"88 cm²","d":"96 cm²","e":"104 cm²"}', 'd', 'L = ½(a+b)×t = ½(10+14)×8 = ½×24×8 = 96 cm².'),
(7, 'Sebuah toko memberi diskon 20% untuk harga Rp 150.000. Harga setelah diskon adalah...', '{"a":"Rp 100.000","b":"Rp 110.000","c":"Rp 120.000","d":"Rp 130.000","e":"Rp 140.000"}', 'c', 'Diskon = 20%×150.000 = 30.000. Harga = 150.000-30.000 = Rp 120.000.'),
(8, 'Perbandingan umur Andi dan Budi adalah 3:5. Jika umur Andi 18 tahun, umur Budi adalah...', '{"a":"24 tahun","b":"27 tahun","c":"30 tahun","d":"33 tahun","e":"36 tahun"}', 'c', 'Budi = (5/3)×18 = 30 tahun.'),
(9, 'Jumlah bilangan kelipatan 3 dari 3 sampai 48 adalah...', '{"a":"396","b":"400","c":"404","d":"408","e":"412"}', 'd', 'n=16 bilangan. S = n/2×(a+Un) = 16/2×(3+48) = 8×51 = 408.'),
(10, 'Luas lingkaran dengan jari-jari 7 cm (π = 22/7) adalah...', '{"a":"44 cm²","b":"88 cm²","c":"132 cm²","d":"154 cm²","e":"176 cm²"}', 'd', 'L = πr² = (22/7)×49 = 154 cm².'),
(11, 'Nilai x yang memenuhi (x+2)(x-3) = 0 adalah...', '{"a":"x = -2 atau x = 3","b":"x = 2 atau x = 3","c":"x = -2 atau x = -3","d":"x = 2 atau x = -3","e":"x = 1 atau x = 6"}', 'a', 'Dari (x+2)(x-3)=0 maka x=-2 atau x=3.'),
(12, '15% dari suatu bilangan adalah 45. Bilangan tersebut adalah...', '{"a":"200","b":"250","c":"300","d":"350","e":"400"}', 'c', 'n = 45 / 0,15 = 300.'),
(13, 'Kolam berbentuk persegi panjang 8m×5m, kedalaman 2m. Volume air untuk mengisinya adalah...', '{"a":"40 m³","b":"60 m³","c":"80 m³","d":"100 m³","e":"120 m³"}', 'c', 'V = 8×5×2 = 80 m³.'),
(14, 'Nilai (3x-2)² jika x = 2 adalah...', '{"a":"4","b":"8","c":"12","d":"16","e":"20"}', 'd', '(3×2-2)² = (6-2)² = 4² = 16.'),
(15, 'Barisan aritmatika dengan U₁ = 4 dan beda = 3. Nilai U₁₀ adalah...', '{"a":"25","b":"27","c":"29","d":"31","e":"33"}', 'd', 'U₁₀ = 4 + (10-1)×3 = 4+27 = 31.'),
(16, 'Jika 5 orang menyelesaikan pekerjaan dalam 6 hari, berapa hari untuk 3 orang?', '{"a":"8 hari","b":"9 hari","c":"10 hari","d":"11 hari","e":"12 hari"}', 'c', '5×6 = 30 hari-orang. 30/3 = 10 hari.'),
(17, 'Median dari data: 12, 8, 15, 10, 7, 14, 9 adalah...', '{"a":"8","b":"9","c":"10","d":"11","e":"12"}', 'c', 'Diurutkan: 7,8,9,10,12,14,15. Median = nilai ke-4 = 10.'),
(18, 'Nilai sin 30° × cos 60° + cos 30° × sin 60° = ...', '{"a":"0","b":"1/2","c":"√2/2","d":"√3/2","e":"1"}', 'e', 'Identitas: sin(A+B) = sinAcosB+cosAsinB. sin(30°+60°) = sin 90° = 1.'),
(19, 'Dalam kotak ada 5 bola merah dan 3 bola putih. Peluang mengambil bola merah adalah...', '{"a":"3/8","b":"5/8","c":"1/2","d":"1/5","e":"1/8"}', 'b', 'P(merah) = 5/(5+3) = 5/8.'),
(20, 'Nilai dari log₂ 32 adalah...', '{"a":"3","b":"4","c":"5","d":"6","e":"7"}', 'c', 'log₂ 32 = log₂ 2⁵ = 5.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'UTBK TPS - Pengetahuan Kuantitatif'
ON CONFLICT (tryout_id, nomor) DO NOTHING;
UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'UTBK TPS - Pengetahuan Kuantitatif';

-- ============================================================
-- 3. TKA SAINTEK - MATEMATIKA (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, '∫(2x + 3)dx = ...', '{"a":"x² + 3x + C","b":"x² + 3 + C","c":"2x² + C","d":"2x² + 3x + C","e":"x² - 3x + C"}', 'a', '∫2x dx = x², ∫3 dx = 3x. Maka hasilnya x² + 3x + C.'),
(2, 'Turunan dari f(x) = x³ - 4x² + 5x - 2 adalah...', '{"a":"3x² - 8x + 5","b":"3x² + 8x - 5","c":"3x³ - 4x + 5","d":"3x² - 4x + 5","e":"2x² - 8x + 5"}', 'a', 'f''(x) = 3x² - 8x + 5 (turunan tiap suku).'),
(3, 'Nilai lim(x→2) (x²-4)/(x-2) adalah...', '{"a":"0","b":"2","c":"3","d":"4","e":"tak terhingga"}', 'd', '(x²-4)/(x-2) = (x+2)(x-2)/(x-2) = x+2. Limit x→2: 2+2 = 4.'),
(4, 'Turunan dari f(x) = sin x adalah...', '{"a":"-sin x","b":"cos x","c":"-cos x","d":"tan x","e":"sec x"}', 'b', 'Turunan sin x = cos x (rumus dasar diferensial trigonometri).'),
(5, 'Solusi sin x = 1/2 untuk 0° ≤ x ≤ 360° adalah...', '{"a":"30° dan 150°","b":"45° dan 135°","c":"60° dan 120°","d":"30° dan 120°","e":"45° dan 315°"}', 'a', 'sin x = 1/2 → x = 30° atau x = 180°-30° = 150°.'),
(6, 'Nilai dari ∫₀² (x² + 1)dx = ...', '{"a":"14/3","b":"10/3","c":"16/3","d":"4","e":"5"}', 'a', '[x³/3 + x]₀² = (8/3+2) - 0 = 8/3 + 6/3 = 14/3.'),
(7, 'Jika cos x = 3/5 dan x di kuadran I, maka sin x = ...', '{"a":"3/4","b":"4/5","c":"5/4","d":"4/3","e":"5/3"}', 'b', 'sin²x = 1-(3/5)² = 1-9/25 = 16/25. sin x = 4/5.'),
(8, 'Matriks A = [[1,2],[3,4]]. Determinan A adalah...', '{"a":"-2","b":"-1","c":"0","d":"1","e":"2"}', 'a', 'det A = (1×4)-(2×3) = 4-6 = -2.'),
(9, 'Nilai ⁵P₂ (permutasi) adalah...', '{"a":"10","b":"15","c":"20","d":"25","e":"30"}', 'c', '⁵P₂ = 5!/(5-2)! = 5×4 = 20.'),
(10, 'Turunan dari f(x) = (2x+1)⁴ adalah...', '{"a":"4(2x+1)³","b":"8(2x+1)³","c":"8(2x+1)⁴","d":"4x(2x+1)³","e":"8x(2x+1)³"}', 'b', 'Chain rule: f''(x) = 4(2x+1)³ × 2 = 8(2x+1)³.'),
(11, 'Persamaan lingkaran dengan pusat (3,-2) dan jari-jari 4 adalah...', '{"a":"(x-3)² + (y+2)² = 16","b":"(x+3)² + (y-2)² = 16","c":"(x-3)² + (y-2)² = 16","d":"(x+3)² + (y+2)² = 16","e":"(x-3)² + (y+2)² = 4"}', 'a', '(x-h)²+(y-k)²=r². Pusat (3,-2), r=4 → (x-3)²+(y+2)²=16.'),
(12, 'Nilai ⁸C₃ (kombinasi) adalah...', '{"a":"48","b":"52","c":"56","d":"60","e":"64"}', 'c', '⁸C₃ = 8!/(3!5!) = (8×7×6)/(3×2×1) = 56.'),
(13, 'Sistem persamaan 2x+y=7 dan x-y=2. Nilai x dan y adalah...', '{"a":"x=2, y=3","b":"x=3, y=1","c":"x=1, y=5","d":"x=4, y=-1","e":"x=3, y=2"}', 'b', 'Jumlahkan: 3x=9 → x=3. y=7-2(3)=1.'),
(14, 'Turunan dari f(x) = ln(3x) adalah...', '{"a":"3/x","b":"1/(3x)","c":"1/x","d":"ln 3","e":"3 ln x"}', 'c', 'f''(x) = 1/(3x) × 3 = 1/x (chain rule).'),
(15, 'Jika x+y=5 dan x²+y²=17, maka nilai xy = ...', '{"a":"3","b":"4","c":"5","d":"6","e":"8"}', 'b', '(x+y)² = x²+2xy+y² → 25 = 17+2xy → xy = 4.'),
(16, 'Luas daerah y=x², y=0, x=0, x=3 adalah...', '{"a":"6","b":"7","c":"8","d":"9","e":"10"}', 'd', 'L = ∫₀³ x² dx = [x³/3]₀³ = 27/3 = 9.'),
(17, 'Periode fungsi y = 2cos(3x) adalah...', '{"a":"π/3","b":"2π/3","c":"π","d":"2π","e":"3π"}', 'b', 'T = 2π/b = 2π/3.'),
(18, 'Nilai log₃ 27 - log₂ 8 + log₅ 25 = ...', '{"a":"1","b":"2","c":"3","d":"4","e":"5"}', 'b', 'log₃ 27=3, log₂ 8=3, log₅ 25=2. Maka 3-3+2 = 2.'),
(19, 'Vektor a=(2,3) dan b=(1,-2). Nilai a·b adalah...', '{"a":"-4","b":"-1","c":"1","d":"4","e":"5"}', 'a', 'a·b = 2(1)+3(-2) = 2-6 = -4.'),
(20, 'Nilai dari 8^(2/3) adalah...', '{"a":"2","b":"4","c":"6","d":"8","e":"16"}', 'b', '8^(1/3)=2 (akar kubik 8). Maka 8^(2/3) = 2² = 4.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'UTBK TKA Saintek - Matematika'
ON CONFLICT (tryout_id, nomor) DO NOTHING;
UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'UTBK TKA Saintek - Matematika';

-- ============================================================
-- 4. TKA SAINTEK - FISIKA (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, 'Benda bermassa 2 kg bergerak 10 m/s. Momentum liniernya adalah...', '{"a":"5 kg.m/s","b":"10 kg.m/s","c":"15 kg.m/s","d":"20 kg.m/s","e":"40 kg.m/s"}', 'd', 'p = mv = 2×10 = 20 kg.m/s.'),
(2, 'Gelombang elektromagnetik dengan panjang gelombang terpendek adalah...', '{"a":"Gelombang radio","b":"Inframerah","c":"Cahaya tampak","d":"Sinar X","e":"Sinar gamma"}', 'e', 'Urutan panjang gelombang (panjang→pendek): radio, mikro, inframerah, tampak, UV, sinar X, gamma.'),
(3, 'Hukum Ohm: tegangan 12 V, hambatan 4 Ω. Arus yang mengalir adalah...', '{"a":"1 A","b":"2 A","c":"3 A","d":"4 A","e":"48 A"}', 'c', 'I = V/R = 12/4 = 3 A.'),
(4, 'Indeks bias kaca 1,5. Kecepatan cahaya di kaca jika c = 3×10⁸ m/s adalah...', '{"a":"1×10⁸ m/s","b":"1,5×10⁸ m/s","c":"2×10⁸ m/s","d":"2,5×10⁸ m/s","e":"3×10⁸ m/s"}', 'c', 'v = c/n = 3×10⁸/1,5 = 2×10⁸ m/s.'),
(5, 'Efek fotolistrik membuktikan bahwa cahaya bersifat...', '{"a":"Gelombang transversal","b":"Gelombang longitudinal","c":"Partikel (foton)","d":"Elektromagnetik murni","e":"Sinusoidal"}', 'c', 'Efek fotolistrik hanya bisa dijelaskan jika cahaya dianggap sebagai partikel (foton) — Einstein (1905).'),
(6, 'Persamaan gelombang y = A sin(kx-ωt). Kecepatan gelombang adalah...', '{"a":"v = Aω","b":"v = ω/k","c":"v = k/ω","d":"v = Ak","e":"v = A/k"}', 'b', 'v = ω/k (hubungan antara frekuensi sudut dan bilangan gelombang).'),
(7, 'Gaya sentripetal benda bergerak melingkar adalah...', '{"a":"F = mv/r","b":"F = mv²/r","c":"F = m/vr","d":"F = vr/m","e":"F = mv²r"}', 'b', 'F_sentripetal = mv²/r, selalu mengarah ke pusat lingkaran.'),
(8, 'Gas ideal dipanaskan secara isobarik. Suhu mutlak digandakan, volume menjadi...', '{"a":"V/2","b":"V","c":"1,5V","d":"2V","e":"4V"}', 'd', 'Hukum Charles: V₁/T₁ = V₂/T₂. Jika T₂=2T₁ maka V₂=2V₁.'),
(9, 'Benda diletakkan 30 cm di depan cermin cekung (f=20 cm). Jarak bayangan adalah...', '{"a":"20 cm","b":"30 cm","c":"40 cm","d":"60 cm","e":"120 cm"}', 'd', '1/f=1/s+1/s''. 1/20=1/30+1/s'' → 1/s''=1/60 → s''=60 cm.'),
(10, 'Energi foton dengan frekuensi f (h = konstanta Planck) adalah...', '{"a":"E = hf","b":"E = h/f","c":"E = f/h","d":"E = hc","e":"E = mc²"}', 'a', 'Energi foton E = hf (Planck). h = 6,63×10⁻³⁴ J.s.'),
(11, 'Peluruhan radioaktif partikel alfa terdiri dari...', '{"a":"2 proton 1 neutron","b":"2 proton 2 neutron","c":"1 proton 2 neutron","d":"4 proton","e":"2 neutron"}', 'b', 'Partikel alfa = inti Helium-4 = 2 proton + 2 neutron.'),
(12, 'Prinsip superposisi gelombang menyatakan bahwa...', '{"a":"Gelombang tidak bisa bergabung","b":"Dua gelombang saling meniadakan","c":"Perpindahan total = jumlah perpindahan masing-masing","d":"Gelombang bergerak berbeda kecepatan","e":"Amplitudo selalu konstan"}', 'c', 'Prinsip superposisi: simpangan total = jumlah aljabar simpangan tiap gelombang.'),
(13, 'Gaya Coulomb antara dua muatan q₁ dan q₂ berjarak r adalah...', '{"a":"F = kq/r","b":"F = kq²/r","c":"F = kq₁q₂/r²","d":"F = k/q₁q₂r²","e":"F = kq₁q₂r"}', 'c', 'Hukum Coulomb: F = k|q₁q₂|/r². k = 9×10⁹ Nm²/C².'),
(14, 'Reaksi nuklir: massa defek berhubungan dengan energi melalui...', '{"a":"E = mc","b":"E = mc²","c":"E = m²c","d":"E = mc³","e":"E = c/m"}', 'b', 'Persamaan Einstein E = mc². Massa defek diubah menjadi energi ikat inti.'),
(15, 'Sumber GGL 10 V, hambatan dalam 1 Ω, hambatan luar 4 Ω. Arus yang mengalir adalah...', '{"a":"1 A","b":"1,5 A","c":"2 A","d":"2,5 A","e":"10 A"}', 'c', 'I = ε/(R+r) = 10/(4+1) = 10/5 = 2 A.'),
(16, 'Resonansi pada tabung organa terbuka (nada dasar) terjadi saat panjang tabung...', '{"a":"L = λ/4","b":"L = λ/2","c":"L = 3λ/4","d":"L = λ","e":"L = 2λ"}', 'b', 'Organa terbuka nada dasar: kedua ujung simpul tekanan, L = λ/2.'),
(17, 'Transformasi Lorentz menyatakan benda yang bergerak mendekati kecepatan cahaya akan mengalami...', '{"a":"Pertambahan panjang","b":"Panjang tetap","c":"Penyusutan panjang","d":"Massa nol","e":"Waktu lebih cepat"}', 'c', 'Kontraksi panjang (length contraction): L = L₀√(1-v²/c²). Panjang berkurang.'),
(18, 'Perubahan entropi sistem yang menyerap kalor Q pada suhu T adalah...', '{"a":"ΔS = Q×T","b":"ΔS = Q/T","c":"ΔS = T/Q","d":"ΔS = Q²","e":"ΔS = Q-T"}', 'b', 'ΔS = Q/T (definisi entropi dalam termodinamika).'),
(19, 'Hukum induksi Faraday menyatakan GGL induksi...', '{"a":"Sebanding dengan arus listrik","b":"Berbanding lurus dengan laju perubahan fluks magnetik","c":"Berbanding terbalik dengan luas penampang","d":"Tergantung tegangan baterai","e":"Konstan untuk semua kondisi"}', 'b', 'GGL induksi ε = -dΦ/dt. Semakin cepat perubahan fluks, semakin besar GGL.'),
(20, 'Dua kawat lurus sejajar berarus searah akan...', '{"a":"Tolak-menolak","b":"Tarik-menarik","c":"Tidak saling mempengaruhi","d":"Berputar","e":"Tergantung jarak"}', 'b', 'Kawat sejajar berarus searah tarik-menarik; berarus berlawanan tolak-menolak.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'UTBK TKA Saintek - Fisika'
ON CONFLICT (tryout_id, nomor) DO NOTHING;
UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'UTBK TKA Saintek - Fisika';

-- ============================================================
-- 5. TKA SAINTEK - KIMIA (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, 'Reaksi: 2H₂ + O₂ → 2H₂O. Jika 4 mol H₂ bereaksi sempurna, mol H₂O yang terbentuk adalah...', '{"a":"2 mol","b":"4 mol","c":"6 mol","d":"8 mol","e":"1 mol"}', 'b', 'Perbandingan mol H₂:H₂O = 2:2 = 1:1. Maka 4 mol H₂ menghasilkan 4 mol H₂O.'),
(2, 'pH larutan HCl 0,01 M adalah...', '{"a":"1","b":"2","c":"3","d":"4","e":"12"}', 'b', 'HCl asam kuat, [H⁺] = 0,01 = 10⁻². pH = -log[H⁺] = 2.'),
(3, 'Tetapan kesetimbangan Kc untuk N₂ + 3H₂ ⇌ 2NH₃ adalah...', '{"a":"[NH₃]²/([N₂][H₂]³)","b":"[N₂][H₂]³/[NH₃]²","c":"[NH₃]/([N₂][H₂])","d":"2[NH₃]/([N₂]+3[H₂])","e":"[NH₃]²×[N₂][H₂]³"}', 'a', 'Kc = [produk]^koef / [reaktan]^koef = [NH₃]² / ([N₂][H₂]³).'),
(4, 'Laju reaksi dipengaruhi semua faktor berikut, KECUALI...', '{"a":"Suhu","b":"Konsentrasi","c":"Katalis","d":"Warna reaktan","e":"Luas permukaan"}', 'd', 'Warna reaktan tidak mempengaruhi laju reaksi kimia.'),
(5, 'Sel elektrolisis mengubah energi...', '{"a":"Kimia → listrik","b":"Listrik → kimia","c":"Panas → kimia","d":"Mekanik → kimia","e":"Kimia → panas"}', 'b', 'Elektrolisis = menggunakan energi listrik untuk menjalankan reaksi kimia (tidak spontan).'),
(6, 'Senyawa organik dengan gugus -OH adalah...', '{"a":"Aldehid","b":"Keton","c":"Alkohol","d":"Ester","e":"Amina"}', 'c', 'Alkohol memiliki gugus fungsional hidroksil (-OH). Contoh: etanol (C₂H₅OH).'),
(7, 'Proses Haber-Bosch digunakan untuk membuat...', '{"a":"H₂SO₄","b":"HNO₃","c":"NH₃","d":"NaOH","e":"Na₂CO₃"}', 'c', 'Proses Haber-Bosch: N₂ + 3H₂ → 2NH₃ (amonia), dengan katalis Fe.'),
(8, 'Bilangan oksidasi Mn dalam KMnO₄ adalah...', '{"a":"+2","b":"+4","c":"+6","d":"+7","e":"+8"}', 'd', 'K(+1) + Mn(x) + 4O(-2) = 0 → 1+x-8=0 → x = +7.'),
(9, 'Massa molekul relatif (Mr) glukosa C₆H₁₂O₆ adalah... (Ar: C=12, H=1, O=16)', '{"a":"60","b":"90","c":"120","d":"150","e":"180"}', 'e', 'Mr = 6(12)+12(1)+6(16) = 72+12+96 = 180 g/mol.'),
(10, 'Prinsip Le Chatelier: sistem kesetimbangan yang terganggu akan...', '{"a":"Runtuh total","b":"Bergerak mengurangi gangguan","c":"Selalu ke kanan","d":"Selalu ke kiri","e":"Tidak berubah"}', 'b', 'Le Chatelier: jika sistem kesetimbangan diganggu, sistem akan bergeser untuk mengurangi gangguan.'),
(11, 'Larutan penyangga (buffer) berfungsi untuk...', '{"a":"Menaikkan pH drastis","b":"Mempertahankan pH relatif konstan","c":"Menurunkan konsentrasi asam","d":"Menghilangkan basa","e":"Meningkatkan ionisasi"}', 'b', 'Buffer mempertahankan pH relatif konstan meski ditambah sedikit asam atau basa.'),
(12, 'Reaksi oksidasi pada sel volta terjadi di...', '{"a":"Katoda","b":"Anoda","c":"Jembatan garam","d":"Elektrolit","e":"Sumber arus"}', 'b', 'Anoda = oksidasi (An Ox). Katoda = reduksi (Red Cat).'),
(13, 'Isomer adalah senyawa dengan...', '{"a":"Rumus molekul sama, sifat sama","b":"Rumus molekul berbeda, sifat sama","c":"Rumus molekul sama, sifat berbeda","d":"Semua sifat identik","e":"Titik didih sama"}', 'c', 'Isomer: rumus molekul sama tetapi struktur/sifat berbeda.'),
(14, 'Pembakaran sempurna propana C₃H₈: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. Jika 1 mol C₃H₈ terbakar, mol CO₂ yang terbentuk adalah...', '{"a":"1 mol","b":"2 mol","c":"3 mol","d":"4 mol","e":"5 mol"}', 'c', 'Dari persamaan, 1 mol C₃H₈ menghasilkan 3 mol CO₂.'),
(15, 'Kenaikan titik didih larutan dibanding pelarut murni disebabkan oleh...', '{"a":"Tekanan osmotik","b":"Sifat koligatif (penambahan zat terlarut)","c":"Reaksi kimia","d":"Perubahan wujud","e":"Perbedaan massa jenis"}', 'b', 'Kenaikan titik didih adalah sifat koligatif larutan: ΔTb = Kb×m (molalitas×konstanta).'),
(16, 'Reaksi antara asam kuat HCl dan basa kuat NaOH menghasilkan...', '{"a":"Gas dan air","b":"Endapan putih","c":"Larutan asam","d":"Garam NaCl dan air","e":"Larutan basa"}', 'd', 'HCl + NaOH → NaCl + H₂O. Reaksi netralisasi menghasilkan garam dan air.'),
(17, 'Konfigurasi elektron atom Cl (Z=17) adalah...', '{"a":"2,8,8","b":"2,8,7","c":"2,7,8","d":"2,8,6","e":"2,9,6"}', 'b', 'Z=17: 2+8+7=17. Konfigurasi: 2,8,7. Cl berada di golongan VIIA.'),
(18, 'Polimer yang terbentuk dari monomer etena (CH₂=CH₂) adalah...', '{"a":"Polipropilena","b":"Polistirena","c":"Polietilena","d":"Nilon","e":"Bakelit"}', 'c', 'Polietilena (PE) terbentuk dari polimerisasi adisi etena. Digunakan untuk kantong plastik.'),
(19, 'Reaksi asam organik dengan alkohol menghasilkan...', '{"a":"Sabun","b":"Ester dan air","c":"Amida","d":"Anhidrida","e":"Aldehid"}', 'b', 'Esterifikasi: RCOOH + R''OH → RCOOR'' + H₂O.'),
(20, 'Hukum kekekalan massa (Lavoisier) menyatakan...', '{"a":"Massa bertambah setelah reaksi","b":"Massa berkurang setelah reaksi","c":"Massa sebelum dan sesudah reaksi sama","d":"Massa tergantung suhu","e":"Massa hanya berlaku untuk gas"}', 'c', 'Hukum Lavoisier: massa total reaktan = massa total produk dalam reaksi kimia tertutup.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'UTBK TKA Saintek - Kimia'
ON CONFLICT (tryout_id, nomor) DO NOTHING;
UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'UTBK TKA Saintek - Kimia';

-- ============================================================
-- 6. TKA SAINTEK - BIOLOGI (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, 'Hukum Mendel I (Segregasi) menyatakan bahwa...', '{"a":"Gen berpisah secara bebas satu sama lain","b":"Pasangan alel berpisah saat pembentukan gamet","c":"Semua anak mirip induknya","d":"Gen dominan selalu terekspresi","e":"Variasi muncul akibat mutasi"}', 'b', 'Hukum Segregasi: pasangan alel memisah saat meiosis dan setiap gamet menerima satu alel.'),
(2, 'Genotipe AaBb menghasilkan berapa macam gamet?', '{"a":"2","b":"3","c":"4","d":"8","e":"16"}', 'c', 'AaBb menghasilkan gamet: AB, Ab, aB, ab = 4 macam gamet.'),
(3, 'Enzim yang memotong DNA pada sekuen spesifik disebut...', '{"a":"DNA ligase","b":"DNA polimerase","c":"Endonuklease restriksi","d":"Helikase","e":"Primase"}', 'c', 'Enzim restriksi (restriction endonuclease) memotong DNA pada sekuen tertentu. Digunakan dalam bioteknologi.'),
(4, 'Proses fermentasi alkohol (anaerob) menghasilkan...', '{"a":"CO₂ dan etanol","b":"O₂ dan etanol","c":"CO₂ dan asam laktat","d":"ATP dan air","e":"NAD⁺ dan NADH saja"}', 'a', 'Fermentasi alkohol: glukosa → etanol + CO₂ + sedikit ATP. Dilakukan ragi/yeast.'),
(5, 'Perbedaan utama mitosis dan meiosis adalah...', '{"a":"Mitosis 4 sel, meiosis 2 sel","b":"Meiosis terjadi di semua sel somatik","c":"Mitosis mempertahankan jumlah kromosom, meiosis mengurangi setengah","d":"Keduanya menghasilkan sel identik","e":"Meiosis lebih cepat dari mitosis"}', 'c', 'Mitosis: 2n → 2n (diploid). Meiosis: 2n → n (haploid). Meiosis untuk pembentukan gamet.'),
(6, 'Sel B dalam sistem imun berfungsi...', '{"a":"Membunuh sel terinfeksi secara langsung","b":"Menghasilkan antibodi","c":"Menelan patogen (fagositosis)","d":"Menghasilkan histamin","e":"Membuang sel mati"}', 'b', 'Sel B (limfosit B) berdiferensiasi menjadi sel plasma yang menghasilkan antibodi spesifik.'),
(7, 'DNA mitokondria diwariskan dari...', '{"a":"Ayah","b":"Ibu","c":"Kedua orang tua secara acak","d":"Secara bebas","e":"Tidak diwariskan"}', 'b', 'DNA mitokondria (mtDNA) diwariskan secara maternal (dari ibu) karena mitokondria berasal dari sitoplasma oosit.'),
(8, 'Sindrom Down terjadi akibat...', '{"a":"Delesi kromosom 21","b":"Trisomi kromosom 21","c":"Monosomi kromosom 21","d":"Mutasi gen tunggal","e":"Infeksi virus saat kehamilan"}', 'b', 'Sindrom Down = trisomi 21: 3 salinan kromosom 21 (total 47 kromosom). Akibat nondisjunction.'),
(9, 'Virus HIV secara spesifik menyerang sel...', '{"a":"Sel darah merah (eritrosit)","b":"Sel otot rangka","c":"Limfosit T CD4⁺ (T-helper)","d":"Sel saraf motorik","e":"Sel hati (hepatosit)"}', 'c', 'HIV menginfeksi dan menghancurkan limfosit T CD4⁺, sehingga imunitas tubuh melemah drastis.'),
(10, 'Proses yang terjadi di matriks mitokondria adalah...', '{"a":"Glikolisis","b":"Siklus Krebs (TCA)","c":"Rantai transpor elektron","d":"Fotosintesis","e":"Transkripsi"}', 'b', 'Siklus Krebs terjadi di matriks mitokondria. Rantai transpor elektron di membran dalam mitokondria.'),
(11, 'Transpirasi pada tumbuhan terjadi terutama melalui...', '{"a":"Akar","b":"Batang","c":"Bunga","d":"Stomata pada daun","e":"Lentisel batang"}', 'd', 'Transpirasi = penguapan air dari tumbuhan, terutama melalui stomata pada daun.'),
(12, 'Nitrogen difiksasi dari atmosfer menjadi senyawa yang dapat digunakan tumbuhan oleh...', '{"a":"Fungi mikoriza","b":"Bakteri (Rhizobium, Azotobacter)","c":"Alga hijau biru","d":"Protozoa tanah","e":"Cacing tanah"}', 'b', 'Fiksasi nitrogen dilakukan bakteri seperti Rhizobium (simbiosis akar legum) dan Azotobacter (bebas).'),
(13, 'Urutan taksonomi dari tingkat tertinggi ke terendah adalah...', '{"a":"Kingdom-Filum-Kelas-Ordo-Famili-Genus-Spesies","b":"Spesies-Genus-Famili-Ordo-Kelas-Filum-Kingdom","c":"Kingdom-Ordo-Kelas-Filum-Famili-Genus-Spesies","d":"Filum-Kingdom-Kelas-Ordo-Famili-Genus-Spesies","e":"Kingdom-Kelas-Filum-Ordo-Famili-Genus-Spesies"}', 'a', 'Tingkatan taksonomi (tertinggi→terendah): Kingdom-Filum-Kelas-Ordo-Famili-Genus-Spesies.'),
(14, 'Teknik PCR (Polymerase Chain Reaction) digunakan untuk...', '{"a":"Memotong DNA","b":"Mengamplifikasi (memperbanyak) segmen DNA","c":"Mensintesis protein","d":"Menganalisis kromosom","e":"Menyambung dua fragmen DNA"}', 'b', 'PCR mengamplifikasi segmen DNA secara in vitro menggunakan primer dan DNA polimerase tahan panas.'),
(15, 'Reaksi terang fotosintesis menghasilkan...', '{"a":"Glukosa","b":"CO₂ dan air","c":"ATP, NADPH, dan O₂","d":"Hanya ATP","e":"ADP dan NADP⁺"}', 'c', 'Reaksi terang (di membran tilakoid): H₂O dipecah menghasilkan O₂, ATP, dan NADPH.'),
(16, 'Bioma tundra memiliki ciri utama...', '{"a":"Pohon sangat tinggi dan lebat","b":"Curah hujan sangat tinggi sepanjang tahun","c":"Suhu sangat dingin, vegetasi berupa lumut dan semak","d":"Tanah yang selalu kering dan tandus","e":"Hewan mamalia besar mendominasi"}', 'c', 'Tundra: suhu sangat rendah, musim tanam pendek, vegetasi utama lumut (lichen), semak rendah.'),
(17, 'Evolusi menurut teori Darwin didasarkan pada...', '{"a":"Mutasi secara langsung","b":"Seleksi alam dan variasi genetik","c":"Teori penggunaan organ","d":"Genetika Mendel saja","e":"Fosil sebagai bukti tunggal"}', 'b', 'Darwin: organisme yang memiliki variasi menguntungkan lebih bertahan (seleksi alam) dan bereproduksi.'),
(18, 'Proses transkripsi menghasilkan...', '{"a":"DNA baru","b":"Protein","c":"mRNA dari cetakan DNA","d":"Ribosom","e":"ATP"}', 'c', 'Transkripsi: DNA → mRNA. Berlangsung di nukleus, melibatkan RNA polimerase.'),
(19, 'Sistem hormon pada tumbuhan yang mengatur pemanjangan sel adalah...', '{"a":"Sitokinin","b":"Asam absisat","c":"Giberelin","d":"Etilen","e":"Auksin"}', 'e', 'Auksin (IAA) mengatur pemanjangan sel, fototropisme, dan gravitropisme pada tumbuhan.'),
(20, 'Komponen biotik dalam ekosistem meliputi...', '{"a":"Air, udara, dan tanah","b":"Suhu, cahaya, dan kelembaban","c":"Semua makhluk hidup","d":"Mineral dan bahan organik","e":"Faktor fisik dan kimia"}', 'c', 'Komponen biotik = semua makhluk hidup (produsen, konsumen, dekomposer). Abiotik = fisik/kimia.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'UTBK TKA Saintek - Biologi'
ON CONFLICT (tryout_id, nomor) DO NOTHING;
UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'UTBK TKA Saintek - Biologi';

-- ============================================================
-- 7. TKA SOSHUM - SEJARAH (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, 'Kerajaan Hindu tertua di Indonesia berdasarkan prasasti adalah...', '{"a":"Sriwijaya","b":"Kutai","c":"Majapahit","d":"Tarumanagara","e":"Mataram Kuno"}', 'b', 'Kerajaan Kutai (Kalimantan Timur, abad ke-4 M) adalah kerajaan Hindu tertua berdasarkan Prasasti Yupa.'),
(2, 'Sumpah Palapa yang diucapkan Gajah Mada berisi tekad untuk...', '{"a":"Menaklukkan Majapahit","b":"Menyatukan Nusantara di bawah Majapahit","c":"Mengusir penjajah Portugis","d":"Membangun armada laut terkuat","e":"Mendirikan kerajaan baru"}', 'b', 'Gajah Mada bersumpah tidak akan menikmati palapa sebelum Nusantara bersatu di bawah Majapahit.'),
(3, 'VOC (Vereenigde Oost-Indische Compagnie) didirikan pada tahun...', '{"a":"1511","b":"1596","c":"1602","d":"1619","e":"1799"}', 'c', 'VOC didirikan 20 Maret 1602, sebagai perusahaan dagang Belanda yang mendapat hak monopoli di Asia.'),
(4, 'Sistem Tanam Paksa (Cultuurstelsel) diterapkan oleh...', '{"a":"Daendels","b":"Raffles","c":"Van den Bosch","d":"Jan Pieterszoon Coen","e":"De Witt"}', 'c', 'Tanam Paksa diterapkan Johannes van den Bosch (1830) di bawah Raja Willem I untuk memulihkan keuangan Belanda.'),
(5, 'Organisasi pergerakan nasional pertama di Indonesia adalah...', '{"a":"Sarekat Islam","b":"Indische Partij","c":"Budi Utomo","d":"PNI","e":"Muhammadiyah"}', 'c', 'Budi Utomo didirikan 20 Mei 1908 oleh dr. Wahidin Sudirohusodo — diperingati sebagai Hari Kebangkitan Nasional.'),
(6, 'Sumpah Pemuda dideklarasikan pada tanggal...', '{"a":"28 Oktober 1927","b":"28 Oktober 1928","c":"17 Agustus 1945","d":"20 Mei 1908","e":"1 Juni 1945"}', 'b', 'Sumpah Pemuda: 28 Oktober 1928. Isinya: satu nusa, satu bangsa, satu bahasa Indonesia.'),
(7, 'Proklamasi kemerdekaan Indonesia dibacakan oleh...', '{"a":"Soekarno saja","b":"Hatta saja","c":"Soekarno dan Hatta","d":"Sayuti Melik","e":"Soekarno, Hatta, dan Sjahrir"}', 'c', 'Proklamasi 17 Agustus 1945 dibacakan Soekarno dan ditandatangani Soekarno-Hatta atas nama bangsa Indonesia.'),
(8, 'Pertempuran 10 November 1945 di Surabaya dipimpin oleh...', '{"a":"Soekarno","b":"Bung Tomo (Sutomo)","c":"Jenderal Sudirman","d":"Sri Sultan Hamengkubuwono IX","e":"A.H. Nasution"}', 'b', 'Bung Tomo membakar semangat pejuang Surabaya melalui siaran radio. 10 November diperingati sebagai Hari Pahlawan.'),
(9, 'Agresi Militer Belanda I terjadi pada...', '{"a":"1945","b":"1946","c":"1947","d":"1948","e":"1949"}', 'c', 'Agresi Militer Belanda I: 21 Juli 1947, disebut Belanda sebagai "Aksi Polisional I".'),
(10, 'Konferensi Meja Bundar (KMB) di Den Haag menghasilkan...', '{"a":"Perjanjian Renville","b":"Perjanjian Linggarjati","c":"Pengakuan kedaulatan Indonesia oleh Belanda","d":"Pembentukan RIS","e":"Pengembalian Irian Barat"}', 'c', 'KMB (23 Agustus-2 November 1949): Belanda mengakui kedaulatan RIS pada 27 Desember 1949.'),
(11, 'Dekrit Presiden 5 Juli 1959 menyatakan...', '{"a":"Pembubaran DPR","b":"Kembali ke UUD 1945","c":"Pembentukan DPR-GR","d":"Soekarno presiden seumur hidup","e":"Konfrontasi Malaysia"}', 'b', 'Dekrit 5 Juli 1959: membubarkan Konstituante, kembali ke UUD 1945, membentuk MPRS dan DPAS.'),
(12, 'G30S/PKI terjadi pada malam...', '{"a":"29 September 1965","b":"30 September – 1 Oktober 1965","c":"30 Oktober 1965","d":"11 Maret 1966","e":"1 Oktober 1966"}', 'b', 'G30S dimulai malam 30 September 1965 — penculikan dan pembunuhan 7 perwira TNI AD.'),
(13, 'Supersemar (11 Maret 1966) merupakan surat perintah dari Presiden Soekarno kepada...', '{"a":"MPR","b":"DPR","c":"Letjen Soeharto","d":"Panglima TNI","e":"Kabinet"}', 'c', 'Surat Perintah Sebelas Maret (Supersemar): Soekarno memberi wewenang kepada Soeharto untuk memulihkan keamanan.'),
(14, 'Reformasi 1998 ditandai dengan mundurnya Soeharto pada...', '{"a":"17 Mei 1998","b":"20 Mei 1998","c":"21 Mei 1998","d":"25 Mei 1998","e":"1 Juni 1998"}', 'c', 'Soeharto mengundurkan diri sebagai Presiden RI pada 21 Mei 1998 setelah 32 tahun berkuasa (Orde Baru).'),
(15, 'Konferensi Asia Afrika di Bandung diadakan pada...', '{"a":"1945","b":"1950","c":"1955","d":"1960","e":"1965"}', 'c', 'KAA: 18-24 April 1955 di Bandung. Menghasilkan Dasasila Bandung dan memperkuat Gerakan Non-Blok.'),
(16, 'Tokoh yang menentang sistem tanam paksa melalui karya Max Havelaar adalah...', '{"a":"Van den Bosch","b":"Eduard Douwes Dekker (Multatuli)","c":"van Deventer","d":"Pieter Both","e":"Jan Pieterzoon Coen"}', 'b', 'Eduard Douwes Dekker (nama pena Multatuli) menulis Max Havelaar (1860) mengkritik kekejaman tanam paksa.'),
(17, 'Politik Etis Belanda (Trias Van Deventer) meliputi...', '{"a":"Milisi, Edukasi, Emigrasi","b":"Irigasi, Emigrasi, Edukasi","c":"Irigasi, Ekonomi, Edukasi","d":"Industri, Emigrasi, Edukasi","e":"Irigasi, Milisi, Ekonomi"}', 'b', 'Politik Etis (1901) mencakup: irigasi (pengairan), emigrasi (transmigrasi), edukasi (pendidikan).'),
(18, 'Perang Diponegoro (1825-1830) meletus karena...', '{"a":"Belanda merebut Maluku","b":"Belanda memasang patok jalan melalui tanah/makam leluhur","c":"Belanda menghapus tanam paksa","d":"Belanda membubarkan keraton","e":"Belanda menaikkan pajak garam"}', 'b', 'Perang Diponegoro dipicu pemasangan patok jalan Belanda yang melewati tanah dan makam leluhur Pangeran Diponegoro.'),
(19, 'Gerakan Non-Blok (GNB) didirikan oleh lima pemimpin, yaitu...', '{"a":"Soekarno, Nehru, Nasser, Tito, Nkrumah","b":"Soekarno, Kennedy, Khrushchev, Nehru, Nasser","c":"Soekarno, Soeharto, Nehru, Gandhi, Nasser","d":"Nehru, Gandhi, Nasser, Mao, Tito","e":"Soekarno, Nehru, Tito, Mao, Nkrumah"}', 'a', 'Pendiri GNB (1961): Soekarno (Indonesia), Nehru (India), Nasser (Mesir), Tito (Yugoslavia), Nkrumah (Ghana).'),
(20, 'Proklamasi kemerdekaan Indonesia dipercepat setelah...', '{"a":"Belanda menyerah kepada Sekutu","b":"Jepang menyerah kepada Sekutu setelah bom Hiroshima-Nagasaki","c":"Pasukan Amerika masuk Jakarta","d":"Soekarno dibebaskan dari penjara","e":"Kongres Pemuda menuntut kemerdekaan"}', 'b', 'Jepang menyerah 15 Agustus 1945 setelah Hiroshima (6 Agustus) dan Nagasaki (9 Agustus) dibom atom. Proklamasi 17 Agustus 1945.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'UTBK TKA Soshum - Sejarah'
ON CONFLICT (tryout_id, nomor) DO NOTHING;
UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'UTBK TKA Soshum - Sejarah';

-- ============================================================
-- 8. TKA SOSHUM - GEOGRAFI (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, 'Letak astronomis Indonesia adalah...', '{"a":"6°LU–11°LS dan 95°BT–141°BT","b":"6°LS–11°LU dan 95°BB–141°BB","c":"0°–10°LS dan 90°BT–140°BT","d":"5°LU–10°LS dan 100°BT–140°BT","e":"6°LU–11°LS dan 95°BB–141°BB"}', 'a', 'Indonesia: 6°LU – 11°LS (lintang) dan 95°BT – 141°BT (bujur).'),
(2, 'Lapisan atmosfer yang mengandung ozon adalah...', '{"a":"Troposfer","b":"Stratosfer","c":"Mesosfer","d":"Termosfer","e":"Eksosfer"}', 'b', 'Lapisan ozon berada di stratosfer (15-50 km). Melindungi bumi dari radiasi UV berbahaya.'),
(3, 'Fenomena El Niño menyebabkan di Indonesia...', '{"a":"Musim hujan lebih panjang","b":"Banjir berkepanjangan","c":"Kekeringan yang parah","d":"Suhu turun drastis","e":"Badai tropis meningkat"}', 'c', 'El Niño: panas permukaan laut Pasifik meningkat → angin monsun melemah → kekeringan di Indonesia.'),
(4, 'Peta topografi menggunakan garis kontur untuk menunjukkan...', '{"a":"Batas negara","b":"Kedalaman laut","c":"Ketinggian dan bentuk permukaan bumi","d":"Persebaran curah hujan","e":"Kepadatan penduduk"}', 'c', 'Garis kontur = garis yang menghubungkan titik-titik dengan ketinggian yang sama.'),
(5, 'Lempeng tektonik Eurasia bertemu lempeng Indo-Australia membentuk zona subduksi di...', '{"a":"Barat dan selatan Sumatra serta selatan Jawa","b":"Kalimantan","c":"Sulawesi","d":"Papua","e":"Maluku"}', 'a', 'Subduksi lempeng Indo-Australia di bawah lempeng Eurasia terjadi di barat Sumatra dan selatan Jawa — menyebabkan gempa dan tsunami.'),
(6, 'Urbanisasi adalah proses...', '{"a":"Pertumbuhan alami penduduk perkotaan","b":"Perpindahan penduduk dari kota ke desa","c":"Perpindahan penduduk dari desa ke kota","d":"Perubahan fungsi lahan pertanian","e":"Pertumbuhan industri di kota"}', 'c', 'Urbanisasi = migrasi penduduk desa ke kota, disebabkan faktor penarik (lapangan kerja, fasilitas) dan pendorong (kemiskinan, lahan sempit).'),
(7, 'Proyeksi peta yang mempertahankan sudut dan arah disebut...', '{"a":"Proyeksi equal area","b":"Proyeksi ekuidistan","c":"Proyeksi konformal (Mercator)","d":"Proyeksi azimuth","e":"Proyeksi silinder"}', 'c', 'Proyeksi konformal (contoh: Mercator) mempertahankan bentuk/sudut. Banyak digunakan untuk navigasi laut.'),
(8, 'Erosi yang disebabkan oleh angin yang mengangkat material halus disebut...', '{"a":"Ablasi","b":"Abrasi","c":"Deflasi","d":"Korasi","e":"Denudasi"}', 'c', 'Deflasi = pengangkatan material tanah/pasir oleh angin. Korasi = erosi akibat angin membawa material abrasif.'),
(9, 'Negara dengan kepadatan penduduk tertinggi di ASEAN adalah...', '{"a":"Indonesia","b":"Thailand","c":"Singapura","d":"Malaysia","e":"Vietnam"}', 'c', 'Singapura: >8.000 jiwa/km², merupakan negara-kota dengan kepadatan tertinggi di ASEAN.'),
(10, 'Iklim Köppen tipe Af (hutan hujan tropis) dicirikan dengan...', '{"a":"Musim kering jelas","b":"Curah hujan ≥ 60 mm setiap bulan","c":"Suhu rata-rata < 18°C","d":"Curah hujan hanya musim dingin","e":"Hampir tidak ada curah hujan"}', 'b', 'Iklim Af: curah hujan merata sepanjang tahun, tiap bulan ≥ 60 mm. Tidak ada musim kering.'),
(11, 'Densitas penduduk aritmatika dihitung dengan cara...', '{"a":"Jumlah penduduk / luas lahan pertanian","b":"Jumlah penduduk / total luas wilayah","c":"Kelahiran / kematian","d":"Pertumbuhan per tahun","e":"Jumlah migrasi masuk - keluar"}', 'b', 'Kepadatan aritmatika = jumlah penduduk / luas wilayah total (km²).'),
(12, 'Sirkulasi termohalin (thermohaline circulation) berkaitan dengan...', '{"a":"Gerakan angin monsun","b":"Arus laut dalam yang dipengaruhi perbedaan suhu dan salinitas","c":"Badai tropis","d":"Proses evaporasi permukaan","e":"Tsunami"}', 'b', 'Termohalin (thermo=suhu, halin=salinitas): arus laut dalam global yang didorong perbedaan densitas air.'),
(13, 'ZEE (Zona Ekonomi Eksklusif) Indonesia adalah...', '{"a":"12 mil nautika","b":"24 mil nautika","c":"200 mil nautika","d":"350 mil nautika","e":"500 mil nautika"}', 'c', 'ZEE = 200 mil nautika dari garis pangkal pantai. Indonesia berhak atas SDA di wilayah ini.'),
(14, 'Dampak deforestasi (penggundulan hutan) terhadap siklus hidrologi adalah...', '{"a":"Bertambahnya cadangan air tanah","b":"Berkurangnya erosi permukaan","c":"Meningkatnya limpasan permukaan dan risiko banjir","d":"Stabilnya iklim lokal","e":"Meningkatnya infiltrasi air"}', 'c', 'Tanpa tutupan hutan, air hujan tidak tertahan — limpasan permukaan meningkat → banjir dan erosi.'),
(15, 'Teori Von Thunen tentang penggunaan lahan pertanian menyatakan...', '{"a":"Pertanian homogen di seluruh wilayah","b":"Penggunaan lahan dipengaruhi biaya transportasi ke pasar","c":"Semua lahan memiliki nilai ekonomi yang sama","d":"Pertanian selalu terkonsentrasi di kota","e":"Industri lebih menguntungkan dari pertanian"}', 'b', 'Model Von Thunen: semakin jauh dari pasar, semakin murah lahan tetapi biaya transportasi makin besar — membentuk zona konsentris.'),
(16, 'Formasi terumbu karang yang berbentuk cincin di tengah laut dalam disebut...', '{"a":"Fringing reef","b":"Barrier reef","c":"Atoll","d":"Platform reef","e":"Patch reef"}', 'c', 'Atoll = terumbu karang berbentuk cincin yang mengelilingi laguna di tengah samudera.'),
(17, 'Skala peta 1:50.000 berarti...', '{"a":"1 cm di peta = 50 m di lapangan","b":"1 cm di peta = 500 m di lapangan","c":"1 cm di peta = 5 km di lapangan","d":"1 cm di peta = 50 km di lapangan","e":"1 cm di peta = 0,5 km di lapangan"}', 'b', '1:50.000 = 1 cm di peta mewakili 50.000 cm = 500 m = 0,5 km di lapangan.'),
(18, 'Sistem Informasi Geografis (SIG) digunakan untuk...', '{"a":"Pengamatan bintang","b":"Merekam, menganalisis, dan menampilkan data spasial","c":"Mengukur kedalaman laut","d":"Mendeteksi gempa bumi","e":"Memantau cuaca secara manual"}', 'b', 'SIG (GIS): sistem untuk memasukkan, menyimpan, mengolah, dan menyajikan data geografis berbasis komputer.'),
(19, 'Iklim muson di Asia Tenggara dipengaruhi oleh...', '{"a":"Arus laut El Niño","b":"Perbedaan tekanan udara antara daratan Asia dan Samudra Hindia","c":"Rotasi bumi","d":"Letak astronomis garis khatulistiwa","e":"Kedalaman laut Pasifik"}', 'b', 'Angin muson bertiup karena perbedaan tekanan antara daratan Asia (dingin di musim dingin) dan Samudra Hindia (hangat).'),
(20, 'Tanah latosol/laterit banyak ditemukan di...', '{"a":"Daerah semi-arid","b":"Daerah tropis lembab dengan curah hujan tinggi","c":"Daerah kutub","d":"Pantai berpasir","e":"Daerah gurun panas"}', 'b', 'Tanah laterit terbentuk di daerah tropis lembab akibat pelapukan intensif dan pencucian unsur hara.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'UTBK TKA Soshum - Geografi'
ON CONFLICT (tryout_id, nomor) DO NOTHING;
UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'UTBK TKA Soshum - Geografi';

-- ============================================================
-- 9. TKA SOSHUM - EKONOMI (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, 'Hukum permintaan menyatakan bahwa (ceteris paribus)...', '{"a":"Harga naik, permintaan naik","b":"Harga naik, permintaan turun","c":"Harga dan permintaan tidak berhubungan","d":"Permintaan hanya dipengaruhi pendapatan","e":"Harga selalu tetap"}', 'b', 'Hukum permintaan: jika harga naik maka jumlah yang diminta turun, dan sebaliknya (ceteris paribus).'),
(2, 'Elastisitas permintaan harga (Ed) > 1 disebut...', '{"a":"Inelastis","b":"Elastis sempurna","c":"Elastis","d":"Inelastis sempurna","e":"Elastis uniter"}', 'c', 'Ed > 1 = elastis: perubahan harga 1% menyebabkan perubahan kuantitas > 1%.'),
(3, 'Inflasi tinggi dapat diatasi dengan kebijakan moneter...', '{"a":"Menurunkan suku bunga","b":"Menaikkan suku bunga","c":"Mencetak uang lebih banyak","d":"Menurunkan pajak","e":"Meningkatkan pengeluaran pemerintah"}', 'b', 'Menaikkan suku bunga = kebijakan moneter kontraktif → mengurangi uang beredar → menekan inflasi.'),
(4, 'GDP (Gross Domestic Product) mengukur...', '{"a":"Nilai total ekspor dan impor","b":"Nilai total produksi dalam suatu negara dalam satu periode","c":"Jumlah penduduk produktif","d":"Tingkat inflasi tahunan","e":"Cadangan devisa negara"}', 'b', 'GDP = nilai pasar semua barang dan jasa akhir yang diproduksi di suatu negara dalam periode tertentu.'),
(5, 'Biaya peluang (opportunity cost) adalah...', '{"a":"Biaya produksi total","b":"Nilai alternatif terbaik yang dikorbankan","c":"Biaya tetap usaha","d":"Biaya variabel per unit","e":"Keuntungan marginal"}', 'b', 'Biaya peluang = nilai pilihan terbaik yang dikorbankan saat mengambil suatu keputusan ekonomi.'),
(6, 'Teori Keunggulan Komparatif dikemukakan oleh...', '{"a":"Adam Smith","b":"Karl Marx","c":"David Ricardo","d":"John Maynard Keynes","e":"Alfred Marshall"}', 'c', 'David Ricardo (1817): setiap negara sebaiknya memproduksi dan mengekspor barang dengan biaya peluang relatif terendah.'),
(7, 'Kurva Philips menggambarkan hubungan antara...', '{"a":"Inflasi dan pertumbuhan ekonomi","b":"Inflasi dan tingkat pengangguran","c":"Konsumsi dan tabungan","d":"Ekspor dan impor","e":"Investasi dan suku bunga"}', 'b', 'Kurva Philips: hubungan terbalik antara inflasi dan pengangguran — inflasi tinggi, pengangguran rendah.'),
(8, 'Pengangguran friksional adalah...', '{"a":"Pengangguran karena PHK massal","b":"Pengangguran karena perubahan teknologi","c":"Pengangguran sementara saat berpindah pekerjaan","d":"Pengangguran musiman","e":"Pengangguran struktural jangka panjang"}', 'c', 'Pengangguran friksional: sementara, terjadi saat seseorang berpindah pekerjaan atau baru lulus mencari kerja.'),
(9, 'Instrumen kebijakan moneter Bank Indonesia meliputi...', '{"a":"Pajak penghasilan dan PPN","b":"Belanja pemerintah","c":"Operasi Pasar Terbuka, GWM, suku bunga acuan","d":"Subsidi BBM","e":"Tarif impor"}', 'c', 'Instrumen moneter: Operasi Pasar Terbuka (beli/jual SBI), Giro Wajib Minimum, suku bunga acuan (BI Rate).'),
(10, 'Surplus perdagangan terjadi ketika...', '{"a":"Impor > Ekspor","b":"Ekspor > Impor","c":"Ekspor = Impor","d":"Tidak ada perdagangan","e":"Inflasi tinggi"}', 'b', 'Surplus perdagangan = nilai ekspor > nilai impor. Neraca perdagangan positif.'),
(11, 'Multiplier effect (efek pengganda) terjadi ketika...', '{"a":"Pemerintah memotong pajak saja","b":"Investasi awal menghasilkan peningkatan pendapatan yang lebih besar","c":"Suku bunga turun drastis","d":"Uang beredar berkurang","e":"Ekspor tiba-tiba meningkat"}', 'b', 'Efek pengganda Keynes: investasi awal (G atau I) menghasilkan peningkatan pendapatan nasional berlipat ganda.'),
(12, 'Nilai tukar rupiah melemah terhadap dolar. Dampak bagi eksportir Indonesia adalah...', '{"a":"Pendapatan dalam rupiah turun","b":"Biaya produksi dalam rupiah naik","c":"Pendapatan dalam rupiah meningkat","d":"Tidak ada dampak signifikan","e":"Harga jual ekspor naik dalam dolar"}', 'c', 'Rupiah melemah → eksportir mendapat lebih banyak rupiah per dolar yang diterima → pendapatan rupiah naik.'),
(13, 'Pasar faktor produksi meliputi...', '{"a":"Pasar barang konsumsi","b":"Pasar uang dan bursa saham","c":"Pasar tenaga kerja, modal, tanah, dan kewirausahaan","d":"Bursa komoditas","e":"Pasar ekspor-impor"}', 'c', 'Faktor produksi: tenaga kerja (L), modal (K), tanah/SDA, dan kewirausahaan. Diperjualbelikan di pasar faktor.'),
(14, 'APBN yang disahkan oleh DPR berfungsi sebagai...', '{"a":"Alat kontrol eksekutif","b":"Alat distribusi, alokasi, dan stabilisasi ekonomi","c":"Alat kebijakan moneter","d":"Standar upah minimum","e":"Rencana ekspor nasional"}', 'b', 'Fungsi APBN: alokasi (menyediakan barang publik), distribusi (pemerataan), stabilisasi (menjaga perekonomian).'),
(15, 'Indeks Pembangunan Manusia (IPM/HDI) mengukur...', '{"a":"GDP per kapita saja","b":"Kekuatan militer dan ekonomi","c":"Kesehatan, pendidikan, dan standar hidup","d":"Cadangan devisa dan ekspor","e":"Tingkat korupsi"}', 'c', 'HDI (UNDP): gabungan indeks harapan hidup, pendidikan (AMH dan RLS), dan GNI per kapita.'),
(16, 'Pasar monopolistik berbeda dari persaingan sempurna karena...', '{"a":"Hanya ada satu penjual","b":"Ada banyak penjual tetapi produk terdiferensiasi","c":"Harga ditentukan pemerintah","d":"Tidak ada hambatan masuk","e":"Semua produk homogen"}', 'b', 'Pasar monopolistik: banyak penjual, produk terdiferensiasi (berbeda merek/kualitas), ada kekuatan harga sedikit.'),
(17, 'Bank Sentral Indonesia (Bank Indonesia) berfungsi sebagai...', '{"a":"Bank umum yang melayani masyarakat","b":"Bank milik pemerintah untuk BUMN","c":"Otoritas moneter dan bank sentral","d":"Lembaga kredit perumahan","e":"Bank syariah nasional"}', 'c', 'Bank Indonesia adalah bank sentral yang menetapkan dan melaksanakan kebijakan moneter, mengatur sistem pembayaran.'),
(18, 'Pertumbuhan ekonomi yang berkelanjutan memerlukan...', '{"a":"Eksploitasi SDA maksimal","b":"Investasi, inovasi, dan pemanfaatan SDA secara berkelanjutan","c":"Inflasi yang sangat tinggi","d":"Pengurangan tenaga kerja","e":"Penutupan pasar dari kompetisi global"}', 'b', 'Pertumbuhan berkelanjutan butuh investasi (modal), inovasi (teknologi), SDM berkualitas, dan tata kelola SDA baik.'),
(19, 'Konsep diminishing marginal utility menyatakan bahwa...', '{"a":"Kepuasan total selalu meningkat","b":"Kepuasan tambahan dari tiap unit tambahan cenderung menurun","c":"Harga barang selalu turun","d":"Produksi selalu meningkat","e":"Utilitas tidak dapat diukur"}', 'b', 'Diminishing marginal utility (Hukum Gossen I): tambahan kepuasan dari konsumsi unit ke-n+1 lebih kecil dari unit ke-n.'),
(20, 'Koperasi di Indonesia berlandaskan asas...', '{"a":"Kapitalisme pasar bebas","b":"Kekeluargaan dan gotong royong","c":"Persaingan bebas antar anggota","d":"Profit maksimum","e":"Investasi asing"}', 'b', 'Koperasi berlandaskan asas kekeluargaan (UU No.25/1992): dari anggota, oleh anggota, untuk anggota.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'UTBK TKA Soshum - Ekonomi'
ON CONFLICT (tryout_id, nomor) DO NOTHING;
UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'UTBK TKA Soshum - Ekonomi';

-- ============================================================
-- 10. TKA SOSHUM - SOSIOLOGI (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, 'Syarat terjadinya interaksi sosial adalah...', '{"a":"Adanya hubungan keluarga","b":"Adanya kontak sosial dan komunikasi","c":"Adanya persamaan budaya","d":"Berada di lokasi yang sama","e":"Memiliki kekuasaan yang setara"}', 'b', 'Interaksi sosial memerlukan dua syarat: kontak sosial (primer/sekunder) dan komunikasi (verbal/nonverbal).'),
(2, 'Proses akulturasi adalah...', '{"a":"Penolakan total budaya asing","b":"Perpaduan dua budaya menghasilkan budaya baru tanpa menghilangkan budaya asli","c":"Penyebaran budaya ke daerah lain","d":"Pertentangan antar kelompok budaya","e":"Pelestarian murni budaya asli"}', 'b', 'Akulturasi: kontak dua budaya yang berbeda menghasilkan unsur budaya baru, namun identitas asli masih dipertahankan.'),
(3, 'Mobilitas sosial vertikal ke atas (social climbing) contohnya...', '{"a":"Pindah dari kota ke desa","b":"Petani miskin menjadi pengusaha sukses","c":"Pensiun dari jabatan tinggi","d":"Migrasi ke luar negeri","e":"Berganti pekerjaan dengan gaji yang sama"}', 'b', 'Mobilitas vertikal ke atas = naik kelas sosial. Petani menjadi pengusaha = peningkatan status ekonomi.'),
(4, 'Teori konflik Marx berfokus pada...', '{"a":"Integrasi dan keseimbangan sosial","b":"Pertentangan kelas antara borjuis dan proletariat","c":"Perubahan sosial yang gradual","d":"Harmoni dalam masyarakat","e":"Sistem nilai yang dianut bersama"}', 'b', 'Marx: masyarakat kapitalis terbagi kelas borjuis (pemilik modal) dan proletar (pekerja) yang terus bertentangan.'),
(5, 'Kontrol sosial formal dilakukan oleh...', '{"a":"Keluarga dan tetangga","b":"Teman sebaya","c":"Lembaga resmi (polisi, pengadilan, penjara)","d":"Tokoh agama","e":"Media massa semata"}', 'c', 'Kontrol sosial formal: dilakukan lembaga resmi yang memiliki kewenangan hukum (polisi, pengadilan, lembaga pemasyarakatan).'),
(6, 'Kelompok primer (primary group) ditandai dengan...', '{"a":"Hubungan formal dan impersonal","b":"Hubungan intim, tatap muka, dan personal","c":"Jumlah anggota sangat besar","d":"Tujuan ekonomi yang jelas","e":"Aturan tertulis yang ketat"}', 'b', 'Kelompok primer (Cooley): hubungan intim, informal, personal. Contoh: keluarga, sahabat karib, kelompok bermain.'),
(7, 'Perubahan sosial yang terjadi cepat dan menyeluruh disebut...', '{"a":"Evolusi sosial","b":"Revolusi sosial","c":"Difusi budaya","d":"Akulturasi","e":"Asimilasi"}', 'b', 'Revolusi sosial: perubahan menyeluruh dalam waktu singkat, menyentuh sendi-sendi kehidupan masyarakat.'),
(8, 'Pranata sosial (social institution) berfungsi untuk...', '{"a":"Memperkaya individu secara finansial","b":"Mengatur perilaku anggota masyarakat dalam memenuhi kebutuhan pokok","c":"Menambah keberagaman budaya","d":"Menciptakan konflik antar kelompok","e":"Menghapus tradisi yang tidak relevan"}', 'b', 'Pranata sosial (keluarga, agama, ekonomi, pendidikan, politik) = sistem norma untuk memenuhi kebutuhan pokok manusia.'),
(9, 'Dampak negatif globalisasi terhadap budaya lokal adalah...', '{"a":"Kemudahan mengakses teknologi","b":"Perluasan pasar ekspor","c":"Westernisasi dan erosi identitas budaya lokal","d":"Meningkatnya kerjasama internasional","e":"Pertumbuhan ekonomi digital"}', 'c', 'Globalisasi membawa budaya Barat yang masuk melalui media → mengikis nilai, norma, dan tradisi lokal.'),
(10, 'Sosialisasi primer terjadi di...', '{"a":"Sekolah","b":"Lingkungan kerja","c":"Keluarga","d":"Media sosial","e":"Masyarakat luas"}', 'c', 'Sosialisasi primer: pertama dan terpenting, terjadi dalam keluarga saat masa kanak-kanak awal.'),
(11, 'Multikulturalisme menekankan...', '{"a":"Dominasi satu budaya mayoritas","b":"Penghapusan perbedaan budaya","c":"Pengakuan dan penghargaan atas keberagaman budaya","d":"Asimilasi paksa kelompok minoritas","e":"Segregasi antar kelompok budaya"}', 'c', 'Multikulturalisme: mengakui, menghormati, dan menghargai perbedaan budaya, ras, agama, dan etnisitas.'),
(12, 'Kemiskinan struktural disebabkan oleh...', '{"a":"Kemalasan dan kurang motivasi individu","b":"Sistem sosial yang tidak adil dan menghambat mobilitas","c":"Rendahnya pendidikan semata","d":"Faktor keturunan biologis","e":"Bencana alam"}', 'b', 'Kemiskinan struktural: disebabkan sistem/struktur sosial-ekonomi yang tidak adil, bukan semata kesalahan individu.'),
(13, 'Rasisme adalah diskriminasi berdasarkan...', '{"a":"Agama","b":"Ras atau etnisitas","c":"Jenis kelamin","d":"Usia","e":"Kelas ekonomi"}', 'b', 'Rasisme = perlakuan berbeda/tidak adil berdasarkan ras atau etnisitas seseorang.'),
(14, 'Stratifikasi sosial terbuka berarti...', '{"a":"Posisi sosial ditentukan sejak lahir","b":"Tidak ada perbedaan kelas","c":"Individu dapat berpindah kelas sosial melalui usaha","d":"Semua orang memiliki hak yang sama","e":"Kelas sosial dihapuskan"}', 'c', 'Stratifikasi terbuka (open class): memungkinkan mobilitas sosial vertikal — individu bisa naik/turun kelas berdasarkan prestasi.'),
(15, 'Pernikahan eksogami berarti menikah dengan...', '{"a":"Anggota keluarga dekat","b":"Orang dari luar kelompok/suku sendiri","c":"Lebih dari satu pasangan","d":"Orang satu agama","e":"Orang satu kelas sosial"}', 'b', 'Eksogami: aturan menikah di luar kelompok sendiri (contoh: suku, klan). Lawan: endogami (menikah dalam kelompok).'),
(16, 'Industrialisasi berdampak sosial berupa...', '{"a":"Memperkuat sistem feodal","b":"Urbanisasi dan lahirnya kelas pekerja/buruh","c":"Meningkatnya ketergantungan pada pertanian","d":"Berkurangnya jumlah penduduk","e":"Stabilnya struktur sosial tradisional"}', 'b', 'Industrialisasi → pabrik di kota → urbanisasi → lahir kelas buruh/pekerja → perubahan struktur sosial.'),
(17, 'Fungsi manifes (nyata) dari lembaga pendidikan adalah...', '{"a":"Memperluas kesenjangan sosial","b":"Transmisi pengetahuan dan persiapan tenaga kerja","c":"Menjaga status quo","d":"Mensosialisasikan nilai tersembunyi","e":"Memperkuat kelas atas"}', 'b', 'Fungsi manifes pendidikan (Merton): transmisi ilmu pengetahuan, keterampilan, dan persiapan untuk dunia kerja.'),
(18, 'Konflik sosial dapat diselesaikan melalui mediasi, yaitu...', '{"a":"Paksaan dari pihak ketiga yang berkuasa","b":"Peradilan formal di pengadilan","c":"Penyelesaian melalui pihak ketiga yang netral dan tidak memaksa","d":"Perang antar kelompok","e":"Pengabaian konflik hingga mereda sendiri"}', 'c', 'Mediasi: pihak ketiga netral (mediator) membantu pihak yang berkonflik mencapai kesepakatan damai secara sukarela.'),
(19, 'Perubahan sosial yang tidak direncanakan (unplanned change) contohnya...', '{"a":"Program transmigrasi pemerintah","b":"Kurikulum pendidikan baru","c":"Perubahan perilaku akibat pandemi COVID-19","d":"Pembangunan infrastruktur jalan","e":"Reformasi birokrasi"}', 'c', 'Perubahan tidak terencana: muncul spontan tanpa rekayasa sosial. Pandemi mengubah perilaku masyarakat secara tidak terduga.'),
(20, 'Sosiologi bersifat non-etis artinya...', '{"a":"Sosiologi tidak memiliki aturan","b":"Sosiologi tidak menilai baik/buruk, tetapi menjelaskan fakta sosial apa adanya","c":"Sosiologi bebas dari metode ilmiah","d":"Sosiologi tidak dapat dipelajari","e":"Sosiologi hanya untuk kalangan tertentu"}', 'b', 'Non-etis: sosiologi tidak memihak atau menghakimi (tidak mengatakan baik/buruk), melainkan mendeskripsikan dan menganalisis realitas sosial secara objektif.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'UTBK TKA Soshum - Sosiologi'
ON CONFLICT (tryout_id, nomor) DO NOTHING;
UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'UTBK TKA Soshum - Sosiologi';

-- Konfirmasi hasil
SELECT t.title, COUNT(q.id) as jumlah_soal
FROM tryouts t
LEFT JOIN questions q ON q.tryout_id = t.id
WHERE t.title LIKE 'UTBK%'
GROUP BY t.title
ORDER BY t.title;
