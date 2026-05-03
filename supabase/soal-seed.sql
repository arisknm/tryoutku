-- ============================================================
-- TryoutKu - Seed Soal Lengkap
-- 20 soal per tryout x 6 tryout = 120 soal
-- ============================================================

-- ============================================================
-- 1. MATEMATIKA SMA KELAS 10 - ALJABAR (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, 'Nilai x yang memenuhi persamaan 2x + 6 = 14 adalah...', '{"a":"3","b":"4","c":"5","d":"6","e":""}', 'b', 'Dari 2x + 6 = 14, maka 2x = 14 - 6 = 8, sehingga x = 8/2 = 4.'),
(2, 'Hasil dari (3x + 2)(x - 5) adalah...', '{"a":"3x² - 13x - 10","b":"3x² - 13x + 10","c":"3x² + 13x - 10","d":"3x² - 17x - 10","e":""}', 'a', '(3x+2)(x-5) = 3x²-15x+2x-10 = 3x²-13x-10.'),
(3, 'Akar-akar dari persamaan x² - 5x + 6 = 0 adalah...', '{"a":"x=1 dan x=6","b":"x=2 dan x=3","c":"x=-2 dan x=-3","d":"x=2 dan x=-3","e":""}', 'b', 'x²-5x+6=0 → (x-2)(x-3)=0 → x=2 atau x=3.'),
(4, 'Jika f(x) = 3x - 7, maka f(4) = ...', '{"a":"3","b":"4","c":"5","d":"6","e":""}', 'c', 'f(4) = 3(4) - 7 = 12 - 7 = 5.'),
(5, 'Himpunan penyelesaian dari 2x - 3 > 7 adalah...', '{"a":"x > 2","b":"x > 5","c":"x > 3","d":"x > 4","e":""}', 'b', '2x - 3 > 7 → 2x > 10 → x > 5.'),
(6, 'Bentuk sederhana dari (x² - 9)/(x - 3) adalah...', '{"a":"x - 3","b":"x + 3","c":"x² + 3","d":"x - 9","e":""}', 'b', '(x²-9)/(x-3) = (x+3)(x-3)/(x-3) = x+3.'),
(7, 'Nilai diskriminan dari persamaan 2x² - 4x + 1 = 0 adalah...', '{"a":"4","b":"8","c":"16","d":"2","e":""}', 'b', 'D = b²-4ac = (-4)²-4(2)(1) = 16-8 = 8.'),
(8, 'Jika g(x) = x² + 2x - 3, maka g(-1) = ...', '{"a":"-4","b":"-2","c":"0","d":"2","e":""}', 'a', 'g(-1) = (-1)²+2(-1)-3 = 1-2-3 = -4.'),
(9, 'Sistem persamaan: x + y = 7 dan x - y = 3. Nilai x adalah...', '{"a":"2","b":"3","c":"4","d":"5","e":""}', 'd', 'Dari eliminasi: 2x = 10, x = 5.'),
(10, 'Bentuk faktorisasi dari x² + 7x + 12 adalah...', '{"a":"(x+3)(x+4)","b":"(x+2)(x+6)","c":"(x+1)(x+12)","d":"(x+3)(x-4)","e":""}', 'a', 'x²+7x+12 = (x+3)(x+4) karena 3×4=12 dan 3+4=7.'),
(11, 'Jika 3x + 2y = 12 dan x = 2, maka y = ...', '{"a":"2","b":"3","c":"4","d":"5","e":""}', 'b', '3(2)+2y=12 → 6+2y=12 → 2y=6 → y=3.'),
(12, 'Hasil dari (2x - 3)² adalah...', '{"a":"4x² - 9","b":"4x² + 12x - 9","c":"4x² - 12x + 9","d":"4x² + 9","e":""}', 'c', '(2x-3)² = 4x² - 2(2x)(3) + 9 = 4x² - 12x + 9.'),
(13, 'Nilai x yang memenuhi |2x - 4| = 6 adalah...', '{"a":"x=5 atau x=-1","b":"x=5 atau x=1","c":"x=-5 atau x=1","d":"x=4 atau x=-2","e":""}', 'a', '2x-4=6 → x=5, atau 2x-4=-6 → x=-1.'),
(14, 'Domain dari f(x) = √(x - 2) adalah...', '{"a":"x ≥ 0","b":"x ≥ 1","c":"x ≥ 2","d":"x > 2","e":""}', 'c', 'Agar akar terdefinisi, x-2 ≥ 0, sehingga x ≥ 2.'),
(15, 'Persamaan garis melalui titik (2, 3) dengan gradien 2 adalah...', '{"a":"y = 2x + 1","b":"y = 2x - 1","c":"y = 2x + 3","d":"y = x + 1","e":""}', 'b', 'y-3 = 2(x-2) → y = 2x-4+3 = 2x-1.'),
(16, 'Hasil penjumlahan akar-akar dari x² - 6x + 8 = 0 adalah...', '{"a":"4","b":"6","c":"8","d":"-6","e":""}', 'b', 'Jumlah akar = -b/a = -(-6)/1 = 6.'),
(17, 'Jika f(x) = 2x + 1 dan g(x) = x - 3, maka (f∘g)(x) = ...', '{"a":"2x - 5","b":"2x + 5","c":"2x - 1","d":"2x - 3","e":""}', 'a', '(f∘g)(x) = f(g(x)) = f(x-3) = 2(x-3)+1 = 2x-6+1 = 2x-5.'),
(18, 'Nilai minimum dari f(x) = x² - 4x + 7 adalah...', '{"a":"1","b":"2","c":"3","d":"4","e":""}', 'c', 'x min = -b/2a = 4/2 = 2, f(2) = 4-8+7 = 3.'),
(19, 'Himpunan penyelesaian dari x² - x - 6 < 0 adalah...', '{"a":"-2 < x < 3","b":"x < -2 atau x > 3","c":"-3 < x < 2","d":"x < -3 atau x > 2","e":""}', 'a', 'x²-x-6 = (x-3)(x+2) < 0, sehingga -2 < x < 3.'),
(20, 'Gradien garis 3x - 2y + 6 = 0 adalah...', '{"a":"3","b":"-3","c":"3/2","d":"2/3","e":""}', 'c', 'Dari 3x-2y+6=0 → y = 3x/2+3, gradien = 3/2.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'Tryout Matematika SMA Kelas 10 - Aljabar'
ON CONFLICT (tryout_id, nomor) DO NOTHING;

-- Update jumlah soal
UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'Tryout Matematika SMA Kelas 10 - Aljabar';

-- ============================================================
-- 2. BAHASA INDONESIA SMA - TEKS NARASI (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, 'Teks narasi adalah teks yang bertujuan untuk...', '{"a":"Menjelaskan cara membuat sesuatu","b":"Menceritakan suatu peristiwa secara kronologis","c":"Meyakinkan pembaca tentang suatu pendapat","d":"Menggambarkan suatu objek secara detail","e":""}', 'b', 'Teks narasi bertujuan menceritakan peristiwa secara runtut/kronologis untuk menghibur atau menginformasikan pembaca.'),
(2, 'Struktur teks narasi yang benar adalah...', '{"a":"Tesis - Argumentasi - Penegasan","b":"Orientasi - Komplikasi - Resolusi","c":"Pernyataan umum - Deskripsi - Penutup","d":"Pembuka - Isi - Penutup","e":""}', 'b', 'Struktur teks narasi terdiri dari: Orientasi (pengenalan), Komplikasi (masalah), dan Resolusi (penyelesaian).'),
(3, 'Kata hubung yang digunakan dalam teks narasi untuk menunjukkan urutan waktu adalah...', '{"a":"Tetapi, namun, akan tetapi","b":"Oleh karena itu, sehingga, akibatnya","c":"Kemudian, lalu, setelah itu, akhirnya","d":"Meskipun, walaupun, biarpun","e":""}', 'c', 'Konjungsi temporal seperti kemudian, lalu, setelah itu, akhirnya digunakan untuk menunjukkan urutan waktu dalam narasi.'),
(4, 'Sudut pandang orang pertama dalam narasi menggunakan kata ganti...', '{"a":"Ia, dia, mereka","b":"Aku, saya, kami","c":"Kamu, Anda, kalian","d":"Beliau, mereka","e":""}', 'b', 'Sudut pandang orang pertama menggunakan kata ganti aku, saya, kami, atau kita.'),
(5, 'Bacalah kalimat berikut: "Tiba-tiba langit menjadi gelap dan angin bertiup kencang." Kalimat ini termasuk bagian...', '{"a":"Orientasi","b":"Resolusi","c":"Komplikasi","d":"Koda","e":""}', 'c', 'Kalimat yang menggambarkan munculnya masalah atau konflik termasuk bagian komplikasi.'),
(6, 'Fungsi bagian orientasi dalam teks narasi adalah...', '{"a":"Menyelesaikan konflik cerita","b":"Memperkenalkan tokoh, latar, dan situasi awal","c":"Menjelaskan akibat dari peristiwa","d":"Memberikan pesan moral cerita","e":""}', 'b', 'Orientasi berfungsi untuk memperkenalkan tokoh, latar tempat, waktu, dan situasi awal cerita.'),
(7, 'Ciri kebahasaan teks narasi adalah...', '{"a":"Menggunakan kalimat perintah dan larangan","b":"Menggunakan kata kerja tindakan dan kata keterangan waktu","c":"Menggunakan istilah-istilah ilmiah","d":"Menggunakan data dan fakta statistik","e":""}', 'b', 'Teks narasi menggunakan kata kerja tindakan (berlari, berteriak) dan keterangan waktu (kemarin, pagi hari).'),
(8, 'Perbedaan narasi fiksi dan nonfiksi adalah...', '{"a":"Narasi fiksi menggunakan tokoh nyata, nonfiksi rekaan","b":"Narasi fiksi bersumber dari imajinasi, nonfiksi dari fakta nyata","c":"Narasi fiksi lebih panjang dari nonfiksi","d":"Narasi nonfiksi tidak memiliki alur cerita","e":""}', 'b', 'Narasi fiksi bersumber dari imajinasi pengarang, sedangkan nonfiksi berdasarkan kejadian/fakta nyata.'),
(9, 'Alur maju dalam teks narasi berarti cerita...', '{"a":"Diceritakan dari akhir ke awal","b":"Berpindah-pindah antara masa lalu dan masa kini","c":"Diceritakan dari awal ke akhir secara kronologis","d":"Menggunakan dua sudut pandang berbeda","e":""}', 'c', 'Alur maju (progresif) adalah alur yang menceritakan peristiwa dari awal hingga akhir secara berurutan.'),
(10, 'Tokoh protagonis dalam cerita narasi adalah tokoh yang bersifat...', '{"a":"Jahat dan antagonis","b":"Baik dan menjadi tokoh utama yang diceritakan","c":"Tidak memiliki peran penting","d":"Selalu kalah dari tokoh lain","e":""}', 'b', 'Protagonis adalah tokoh utama yang umumnya berkarakter baik dan menjadi pusat cerita.'),
(11, 'Penggunaan majas dalam narasi bertujuan untuk...', '{"a":"Mempersulit pemahaman pembaca","b":"Membuat cerita lebih hidup dan menarik","c":"Menambah jumlah halaman cerita","d":"Mengganti fakta dengan opini","e":""}', 'b', 'Majas digunakan untuk memperindah bahasa dan membuat cerita lebih hidup, menarik, dan berkesan.'),
(12, 'Majas personifikasi adalah...', '{"a":"Membandingkan dua hal yang berbeda dengan kata seperti/bagai","b":"Memberikan sifat manusia pada benda mati","c":"Melebih-lebihkan suatu keadaan","d":"Menyebutkan sebagian untuk mewakili keseluruhan","e":""}', 'b', 'Personifikasi adalah majas yang memberikan sifat atau perilaku manusia kepada benda mati atau makhluk bukan manusia.'),
(13, 'Kalimat yang mengandung majas hiperbola adalah...', '{"a":"Bulan tersenyum di balik awan","b":"Suaranya seperti guntur membelah langit","c":"Tangisannya membanjiri seluruh ruangan","d":"Kucing itu berlari dengan cepat","e":""}', 'c', 'Hiperbola adalah majas yang melebih-lebihkan. "Tangisannya membanjiri seluruh ruangan" adalah bentuk berlebihan.'),
(14, 'Tema dalam cerita narasi adalah...', '{"a":"Nama-nama tokoh dalam cerita","b":"Latar tempat berlangsungnya cerita","c":"Pokok pikiran atau gagasan utama cerita","d":"Urutan peristiwa dalam cerita","e":""}', 'c', 'Tema adalah pokok pikiran, gagasan utama, atau inti permasalahan yang mendasari sebuah cerita.'),
(15, 'Amanat dalam teks narasi adalah...', '{"a":"Penggambaran watak tokoh","b":"Pesan moral yang ingin disampaikan pengarang","c":"Latar belakang pengarang","d":"Ringkasan cerita","e":""}', 'b', 'Amanat adalah pesan moral atau nilai kehidupan yang ingin disampaikan pengarang melalui ceritanya.'),
(16, 'Latar suasana dalam cerita narasi menggambarkan...', '{"a":"Tempat terjadinya peristiwa","b":"Waktu terjadinya peristiwa","c":"Kondisi atau keadaan emosional saat peristiwa terjadi","d":"Tokoh-tokoh yang terlibat","e":""}', 'c', 'Latar suasana menggambarkan kondisi atau keadaan emosional (sedih, gembira, mencekam) saat peristiwa berlangsung.'),
(17, 'Teknik penokohan secara analitik artinya...', '{"a":"Karakter tokoh ditunjukkan melalui dialog","b":"Karakter tokoh diceritakan langsung oleh pengarang","c":"Karakter tokoh ditunjukkan melalui tindakannya","d":"Karakter tokoh digambarkan melalui tokoh lain","e":""}', 'b', 'Penokohan analitik/langsung adalah saat pengarang secara langsung mendeskripsikan sifat dan karakter tokoh.'),
(18, 'Klimaks dalam alur cerita adalah...', '{"a":"Pengenalan tokoh dan latar","b":"Awal mula munculnya masalah","c":"Puncak ketegangan atau konflik tertinggi","d":"Penyelesaian akhir cerita","e":""}', 'c', 'Klimaks adalah puncak ketegangan atau titik konflik tertinggi dalam sebuah cerita narasi.'),
(19, 'Cerita yang menggunakan alur sorot balik (flashback) berarti...', '{"a":"Menceritakan masa depan tokoh","b":"Menyisipkan peristiwa masa lalu di tengah cerita","c":"Menceritakan dua peristiwa secara bersamaan","d":"Mengakhiri cerita tanpa penyelesaian","e":""}', 'b', 'Flashback atau sorot balik adalah teknik menyisipkan cerita masa lalu di tengah alur cerita yang sedang berlangsung.'),
(20, 'Perbedaan antara cerpen dan novel adalah...', '{"a":"Cerpen menggunakan bahasa baku, novel tidak","b":"Cerpen memiliki lebih banyak tokoh dari novel","c":"Cerpen lebih pendek dengan satu konflik utama, novel lebih panjang dan kompleks","d":"Novel selalu berakhir bahagia, cerpen tidak","e":""}', 'c', 'Cerpen (cerita pendek) lebih singkat dengan satu konflik utama, sedangkan novel lebih panjang dengan konflik yang lebih kompleks.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'Tryout Bahasa Indonesia SMA - Teks Narasi'
ON CONFLICT (tryout_id, nomor) DO NOTHING;

UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'Tryout Bahasa Indonesia SMA - Teks Narasi';

-- ============================================================
-- 3. FISIKA KELAS 11 - MEKANIKA (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, 'Sebuah benda bergerak dengan kecepatan awal 10 m/s dan percepatan 2 m/s². Kecepatan benda setelah 5 sekon adalah...', '{"a":"15 m/s","b":"20 m/s","c":"25 m/s","d":"30 m/s","e":""}', 'b', 'v = v₀ + at = 10 + (2)(5) = 10 + 10 = 20 m/s.'),
(2, 'Hukum I Newton menyatakan bahwa...', '{"a":"F = ma","b":"Setiap aksi memiliki reaksi yang sama besar dan berlawanan arah","c":"Benda yang diam akan tetap diam jika tidak ada gaya luar","d":"Gaya gravitasi berbanding terbalik dengan jarak kuadrat","e":""}', 'c', 'Hukum I Newton (kelembaman): benda diam tetap diam dan benda bergerak tetap bergerak lurus beraturan jika tidak ada gaya luar.'),
(3, 'Sebuah benda bermassa 5 kg diberi gaya 20 N. Percepatannya adalah...', '{"a":"2 m/s²","b":"4 m/s²","c":"10 m/s²","d":"100 m/s²","e":""}', 'b', 'Dari F = ma → a = F/m = 20/5 = 4 m/s².'),
(4, 'Berat benda bermassa 10 kg di bumi (g = 10 m/s²) adalah...', '{"a":"1 N","b":"10 N","c":"100 N","d":"1000 N","e":""}', 'c', 'W = mg = 10 × 10 = 100 N.'),
(5, 'Sebuah mobil bergerak 100 m dalam 10 sekon. Kecepatan rata-ratanya adalah...', '{"a":"5 m/s","b":"10 m/s","c":"15 m/s","d":"20 m/s","e":""}', 'b', 'v = s/t = 100/10 = 10 m/s.'),
(6, 'Energi kinetik benda bermassa 2 kg yang bergerak dengan kecepatan 10 m/s adalah...', '{"a":"20 J","b":"50 J","c":"100 J","d":"200 J","e":""}', 'c', 'Ek = ½mv² = ½(2)(10²) = ½(2)(100) = 100 J.'),
(7, 'Usaha yang dilakukan gaya 50 N untuk memindahkan benda sejauh 4 m adalah...', '{"a":"12,5 J","b":"46 J","c":"54 J","d":"200 J","e":""}', 'd', 'W = F × s = 50 × 4 = 200 J.'),
(8, 'Hukum III Newton menyatakan bahwa...', '{"a":"F = ma","b":"Gaya aksi dan reaksi selalu sama besar dan berlawanan arah","c":"Benda diam tidak mengalami gaya","d":"Kecepatan berbanding lurus dengan gaya","e":""}', 'b', 'Hukum III Newton: setiap gaya aksi menimbulkan gaya reaksi yang sama besar namun berlawanan arah.'),
(9, 'Momentum benda bermassa 4 kg yang bergerak 5 m/s adalah...', '{"a":"0,8 kg.m/s","b":"9 kg.m/s","c":"20 kg.m/s","d":"40 kg.m/s","e":""}', 'c', 'p = mv = 4 × 5 = 20 kg.m/s.'),
(10, 'Energi potensial gravitasi benda 2 kg pada ketinggian 5 m (g=10 m/s²) adalah...', '{"a":"10 J","b":"25 J","c":"100 J","d":"250 J","e":""}', 'c', 'Ep = mgh = 2 × 10 × 5 = 100 J.'),
(11, 'Gerak lurus beraturan (GLB) terjadi ketika...', '{"a":"Kecepatan bertambah secara teratur","b":"Percepatan konstan dan tidak nol","c":"Kecepatan konstan dan percepatan nol","d":"Gaya total tidak sama dengan nol","e":""}', 'c', 'GLB terjadi saat kecepatan konstan (tidak berubah) sehingga percepatannya = 0.'),
(12, 'Benda jatuh bebas dari ketinggian 80 m (g=10 m/s²). Waktu untuk sampai tanah adalah...', '{"a":"2 s","b":"4 s","c":"6 s","d":"8 s","e":""}', 'b', 'h = ½gt² → 80 = ½(10)t² → t² = 16 → t = 4 s.'),
(13, 'Gaya gesekan kinetik antara dua benda...', '{"a":"Lebih besar dari gaya gesekan statis maksimum","b":"Sama dengan gaya gesekan statis","c":"Lebih kecil dari gaya gesekan statis maksimum","d":"Tidak bergantung pada permukaan","e":""}', 'c', 'Gaya gesekan kinetik selalu lebih kecil dari gaya gesekan statis maksimum.'),
(14, 'Sebuah benda dilempar vertikal ke atas dengan kecepatan 20 m/s. Tinggi maksimumnya (g=10) adalah...', '{"a":"10 m","b":"20 m","c":"30 m","d":"40 m","e":""}', 'b', 'h = v₀²/2g = (20)²/(2×10) = 400/20 = 20 m.'),
(15, 'Impuls gaya 10 N yang bekerja selama 3 sekon adalah...', '{"a":"3,3 N.s","b":"13 N.s","c":"30 N.s","d":"300 N.s","e":""}', 'c', 'I = F × t = 10 × 3 = 30 N.s.'),
(16, 'Dua benda bertumbukan dan setelah tumbukan bergerak bersama. Tumbukan ini disebut...', '{"a":"Tumbukan lenting sempurna","b":"Tumbukan lenting sebagian","c":"Tumbukan tidak lenting sama sekali","d":"Tumbukan elastis","e":""}', 'c', 'Tumbukan tidak lenting sama sekali adalah ketika dua benda setelah bertumbukan bergerak bersama-sama.'),
(17, 'Hukum kekekalan energi mekanik berlaku jika...', '{"a":"Ada gaya gesekan","b":"Benda bergerak vertikal ke atas","c":"Tidak ada gaya non-konservatif","d":"Massa benda sangat besar","e":""}', 'c', 'Energi mekanik kekal jika tidak ada gaya non-konservatif (seperti gesekan) yang bekerja.'),
(18, 'Tekanan didefinisikan sebagai...', '{"a":"Gaya dibagi massa","b":"Gaya dibagi luas bidang","c":"Massa dibagi volume","d":"Energi dibagi waktu","e":""}', 'b', 'Tekanan P = F/A (gaya per satuan luas).'),
(19, 'Sebuah benda bermassa 3 kg bergerak dengan kecepatan 4 m/s. Energi kinetiknya adalah...', '{"a":"12 J","b":"24 J","c":"36 J","d":"48 J","e":""}', 'b', 'Ek = ½mv² = ½(3)(16) = 24 J.'),
(20, 'Daya yang dihasilkan mesin yang melakukan usaha 600 J dalam 30 sekon adalah...', '{"a":"10 W","b":"20 W","c":"30 W","d":"60 W","e":""}', 'b', 'P = W/t = 600/30 = 20 W.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'Tryout Fisika Kelas 11 - Mekanika'
ON CONFLICT (tryout_id, nomor) DO NOTHING;

UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'Tryout Fisika Kelas 11 - Mekanika';

-- ============================================================
-- 4. MATEMATIKA SMP KELAS 8 (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, 'Nilai x yang memenuhi 4x - 8 = 12 adalah...', '{"a":"3","b":"4","c":"5","d":"6","e":""}', 'c', '4x = 12 + 8 = 20, x = 20/4 = 5.'),
(2, 'Hasil dari (-3) × (-5) + 2 adalah...', '{"a":"13","b":"17","c":"15","d":"8","e":""}', 'b', '(-3)×(-5) = 15, kemudian 15+2 = 17.'),
(3, 'Luas persegi panjang dengan panjang 12 cm dan lebar 7 cm adalah...', '{"a":"38 cm²","b":"84 cm²","c":"76 cm²","d":"19 cm²","e":""}', 'b', 'L = p × l = 12 × 7 = 84 cm².'),
(4, 'Keliling lingkaran dengan jari-jari 7 cm (π = 22/7) adalah...', '{"a":"22 cm","b":"44 cm","c":"154 cm","d":"88 cm","e":""}', 'b', 'K = 2πr = 2 × (22/7) × 7 = 44 cm.'),
(5, 'Bentuk sederhana dari 6x + 3y - 2x + y adalah...', '{"a":"4x + 4y","b":"4x + 2y","c":"8x + 2y","d":"8x + 4y","e":""}', 'a', '(6x-2x) + (3y+y) = 4x + 4y.'),
(6, 'Nilai dari 2³ × 2² adalah...', '{"a":"2⁴","b":"2⁵","c":"2⁶","d":"2⁷","e":""}', 'b', '2³ × 2² = 2^(3+2) = 2⁵.'),
(7, 'Jika 3x + 6 = 21, maka x = ...', '{"a":"3","b":"4","c":"5","d":"9","e":""}', 'c', '3x = 21 - 6 = 15, x = 5.'),
(8, 'Volume kubus dengan sisi 5 cm adalah...', '{"a":"25 cm³","b":"75 cm³","c":"125 cm³","d":"150 cm³","e":""}', 'c', 'V = s³ = 5³ = 125 cm³.'),
(9, 'Luas lingkaran dengan diameter 14 cm (π = 22/7) adalah...', '{"a":"44 cm²","b":"88 cm²","c":"154 cm²","d":"196 cm²","e":""}', 'c', 'r = 7 cm, L = πr² = (22/7)(49) = 154 cm².'),
(10, 'Mean dari data: 6, 8, 7, 9, 5 adalah...', '{"a":"6","b":"7","c":"8","d":"9","e":""}', 'b', 'Mean = (6+8+7+9+5)/5 = 35/5 = 7.'),
(11, 'Hasil dari 3/4 + 1/2 adalah...', '{"a":"4/6","b":"5/4","c":"4/4","d":"1/4","e":""}', 'b', '3/4 + 2/4 = 5/4.'),
(12, 'Modus dari data: 3, 5, 3, 7, 5, 3, 8 adalah...', '{"a":"3","b":"5","c":"7","d":"8","e":""}', 'a', 'Modus adalah nilai yang paling sering muncul. Angka 3 muncul 3 kali (terbanyak).'),
(13, 'Perbandingan 15 : 25 dalam bentuk paling sederhana adalah...', '{"a":"1 : 2","b":"2 : 3","c":"3 : 5","d":"5 : 3","e":""}', 'c', '15:25 = 3:5 (dibagi 5).'),
(14, 'Sebuah peta berskala 1:500.000. Jika jarak di peta 3 cm, jarak sebenarnya adalah...', '{"a":"1,5 km","b":"15 km","c":"150 km","d":"1.500 km","e":""}', 'b', 'Jarak = 3 × 500.000 = 1.500.000 cm = 15 km.'),
(15, 'Nilai dari √144 adalah...', '{"a":"11","b":"12","c":"13","d":"14","e":""}', 'b', '√144 = 12 karena 12 × 12 = 144.'),
(16, 'Sudut dalam segitiga ABC adalah 60°, 70°, dan...', '{"a":"40°","b":"50°","c":"60°","d":"70°","e":""}', 'b', 'Jumlah sudut segitiga = 180°, maka sudut ketiga = 180-60-70 = 50°.'),
(17, 'Hasil dari 25% × 80 adalah...', '{"a":"15","b":"20","c":"25","d":"30","e":""}', 'b', '25% × 80 = 0,25 × 80 = 20.'),
(18, 'Jika harga beli Rp 80.000 dan harga jual Rp 100.000, maka persentase keuntungan adalah...', '{"a":"15%","b":"20%","c":"25%","d":"30%","e":""}', 'c', 'Untung = 20.000, % untung = (20.000/80.000)×100% = 25%.'),
(19, 'Nilai dari 4² + 3² adalah...', '{"a":"25","b":"49","c":"7","d":"14","e":""}', 'a', '4² + 3² = 16 + 9 = 25.'),
(20, 'Bentuk pangkat dari 32 adalah...', '{"a":"2³","b":"2⁴","c":"2⁵","d":"2⁶","e":""}', 'c', '2⁵ = 32.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'Tryout Matematika SMP Kelas 8'
ON CONFLICT (tryout_id, nomor) DO NOTHING;

UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'Tryout Matematika SMP Kelas 8';

-- ============================================================
-- 5. IPA SMP KELAS 7 - MAKHLUK HIDUP (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, 'Ciri-ciri makhluk hidup yang membedakannya dari benda mati adalah...', '{"a":"Memiliki warna dan bentuk","b":"Bernapas, tumbuh, dan berkembang biak","c":"Dapat bergerak jika didorong","d":"Memiliki massa dan volume","e":""}', 'b', 'Makhluk hidup memiliki ciri khas: bernapas, makan, tumbuh, berkembang biak, peka terhadap rangsang, mengeluarkan zat sisa, dan bergerak.'),
(2, 'Proses masuknya udara ke dalam paru-paru disebut...', '{"a":"Ekspirasi","b":"Respirasi","c":"Inspirasi","d":"Transpirasi","e":""}', 'c', 'Inspirasi adalah proses masuknya udara (oksigen) ke dalam paru-paru saat bernapas.'),
(3, 'Satuan dasar kehidupan adalah...', '{"a":"Jaringan","b":"Organ","c":"Sel","d":"Sistem organ","e":""}', 'c', 'Sel adalah unit struktural dan fungsional terkecil dari makhluk hidup.'),
(4, 'Fotosintesis pada tumbuhan menghasilkan...', '{"a":"CO₂ dan air","b":"Glukosa dan oksigen","c":"Nitrogen dan air","d":"Protein dan lemak","e":""}', 'b', 'Fotosintesis: CO₂ + H₂O + cahaya → glukosa (C₆H₁₂O₆) + O₂.'),
(5, 'Kingdom Animalia berbeda dari Kingdom Plantae karena...', '{"a":"Animalia memiliki sel","b":"Animalia dapat bergerak aktif dan heterotrof","c":"Animalia tidak memerlukan air","d":"Animalia dapat berfotosintesis","e":""}', 'b', 'Animalia (hewan) bergerak aktif dan heterotrof (tidak bisa membuat makanan sendiri), berbeda dari tumbuhan.'),
(6, 'Organisme yang dapat membuat makanan sendiri disebut...', '{"a":"Heterotrof","b":"Karnivora","c":"Autotrof","d":"Dekomposer","e":""}', 'c', 'Autotrof adalah organisme yang dapat membuat makanan sendiri, seperti tumbuhan melalui fotosintesis.'),
(7, 'Cacing termasuk dalam kelompok...', '{"a":"Vertebrata","b":"Avertebrata","c":"Mamalia","d":"Reptilia","e":""}', 'b', 'Cacing termasuk avertebrata (tidak bertulang belakang).'),
(8, 'Bagian sel yang mengatur seluruh kegiatan sel adalah...', '{"a":"Mitokondria","b":"Ribosom","c":"Nukleus (inti sel)","d":"Membran sel","e":""}', 'c', 'Nukleus (inti sel) berfungsi sebagai pusat pengendali seluruh kegiatan sel.'),
(9, 'Hewan berdarah panas adalah...', '{"a":"Ikan dan katak","b":"Ular dan buaya","c":"Burung dan mamalia","d":"Serangga dan cacing","e":""}', 'c', 'Hewan berdarah panas (homoioterm) adalah burung (aves) dan mamalia yang suhu tubuhnya tetap.'),
(10, 'Tumbuhan berbiji tertutup disebut...', '{"a":"Gymnospermae","b":"Angiospermae","c":"Bryophyta","d":"Pteridophyta","e":""}', 'b', 'Angiospermae adalah tumbuhan berbiji tertutup (biji terbungkus buah), contoh: mangga, padi.'),
(11, 'Proses perpindahan air dari tanah ke daun melalui batang disebut...', '{"a":"Osmosis","b":"Difusi","c":"Transpirasi","d":"Transportasi","e":""}', 'd', 'Air diserap akar dan diangkut melalui xilem ke seluruh bagian tumbuhan, proses ini disebut transportasi.'),
(12, 'Jamur (fungi) mendapatkan makanan dengan cara...', '{"a":"Fotosintesis","b":"Menyerap zat organik dari benda mati/hidup","c":"Memburu mangsa","d":"Menyaring air","e":""}', 'b', 'Jamur bersifat heterotrof, mendapatkan nutrisi dengan menyerap zat organik dari lingkungannya (saprofit/parasit).'),
(13, 'Contoh hewan yang berkembang biak dengan cara bertelur adalah...', '{"a":"Kelelawar","b":"Paus","c":"Ayam","d":"Kucing","e":""}', 'c', 'Ayam berkembang biak dengan bertelur (ovipar).'),
(14, 'Bagian tumbuhan yang berfungsi untuk fotosintesis adalah...', '{"a":"Akar","b":"Batang","c":"Daun","d":"Bunga","e":""}', 'c', 'Daun adalah organ utama fotosintesis karena mengandung klorofil dan memiliki stomata.'),
(15, 'Virus disebut bukan makhluk hidup karena...', '{"a":"Tidak memiliki DNA","b":"Tidak dapat bereproduksi","c":"Hanya dapat berkembang biak di dalam sel hidup","d":"Tidak memiliki membran","e":""}', 'c', 'Virus hanya dapat bereproduksi di dalam sel inang yang hidup, sehingga dianggap di antara makhluk hidup dan benda mati.'),
(16, 'Ekosistem adalah...', '{"a":"Kumpulan individu sejenis di suatu tempat","b":"Hubungan timbal balik antara makhluk hidup dengan lingkungannya","c":"Seluruh makhluk hidup di bumi","d":"Kumpulan beberapa populasi","e":""}', 'b', 'Ekosistem adalah sistem yang terdiri dari komunitas makhluk hidup yang berinteraksi dengan lingkungan abiotiknya.'),
(17, 'Rantai makanan yang benar adalah...', '{"a":"Elang → ular → tikus → padi","b":"Padi → tikus → ular → elang","c":"Tikus → padi → ular → elang","d":"Padi → elang → ular → tikus","e":""}', 'b', 'Rantai makanan selalu dimulai dari produsen (padi) → konsumen I (tikus) → konsumen II (ular) → konsumen III (elang).'),
(18, 'Hewan yang memiliki notokorda pada fase embrio disebut...', '{"a":"Avertebrata","b":"Chordata","c":"Mollusca","d":"Arthropoda","e":""}', 'b', 'Chordata adalah filum hewan yang memiliki notokorda (sumbu tubuh) pada tahap embrio.'),
(19, 'Proses pengeluaran keringat pada manusia berfungsi untuk...', '{"a":"Menjaga keseimbangan cairan dan mengatur suhu tubuh","b":"Mencerna makanan","c":"Menghasilkan energi","d":"Menyerap nutrisi","e":""}', 'a', 'Keringat berfungsi mengatur suhu tubuh dan membantu pengeluaran zat sisa metabolisme.'),
(20, 'Lumut (Bryophyta) berbeda dari paku (Pteridophyta) karena...', '{"a":"Lumut memiliki pembuluh angkut, paku tidak","b":"Lumut tidak memiliki pembuluh angkut, paku memiliki","c":"Lumut berkembang biak dengan biji","d":"Lumut hidup di air, paku di darat","e":""}', 'b', 'Lumut tidak memiliki jaringan pembuluh (xilem dan floem), sedangkan tumbuhan paku sudah memilikinya.')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'Tryout IPA SMP Kelas 7 - Makhluk Hidup'
ON CONFLICT (tryout_id, nomor) DO NOTHING;

UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'Tryout IPA SMP Kelas 7 - Makhluk Hidup';

-- ============================================================
-- 6. MATEMATIKA SD KELAS 6 (20 soal)
-- ============================================================
INSERT INTO questions (tryout_id, nomor, soal, pilihan, jawaban_benar, pembahasan, poin)
SELECT t.id, q.nomor, q.soal, q.pilihan::jsonb, q.jawaban_benar, q.pembahasan, 1
FROM tryouts t, (VALUES
(1, '1.250 + 375 - 125 = ...', '{"a":"1.400","b":"1.500","c":"1.600","d":"1.750","e":""}', 'b', '1.250 + 375 = 1.625, kemudian 1.625 - 125 = 1.500.'),
(2, 'Hasil dari 24 × 15 adalah...', '{"a":"350","b":"360","c":"370","d":"380","e":""}', 'b', '24 × 15 = 24 × 10 + 24 × 5 = 240 + 120 = 360.'),
(3, 'FPB dari 36 dan 48 adalah...', '{"a":"6","b":"8","c":"12","d":"18","e":""}', 'c', 'Faktor 36: 1,2,3,4,6,9,12,18,36. Faktor 48: 1,2,3,4,6,8,12,16,24,48. FPB = 12.'),
(4, 'KPK dari 4 dan 6 adalah...', '{"a":"8","b":"12","c":"16","d":"24","e":""}', 'b', 'KPK dari 4 dan 6 = 12 (kelipatan persekutuan terkecil).'),
(5, 'Nilai dari 3/4 × 8 adalah...', '{"a":"2","b":"4","c":"6","d":"8","e":""}', 'c', '3/4 × 8 = 24/4 = 6.'),
(6, 'Luas persegi dengan sisi 9 cm adalah...', '{"a":"18 cm²","b":"36 cm²","c":"72 cm²","d":"81 cm²","e":""}', 'd', 'Luas persegi = s × s = 9 × 9 = 81 cm².'),
(7, '75% dari 200 adalah...', '{"a":"100","b":"125","c":"150","d":"175","e":""}', 'c', '75% × 200 = 75/100 × 200 = 150.'),
(8, 'Sebuah kotak berbentuk kubus dengan sisi 6 cm. Volumenya adalah...', '{"a":"36 cm³","b":"72 cm³","c":"180 cm³","d":"216 cm³","e":""}', 'd', 'Volume kubus = s³ = 6³ = 216 cm³.'),
(9, 'Hasil dari 2,5 + 1,75 adalah...', '{"a":"3,25","b":"4,00","c":"4,25","d":"4,50","e":""}', 'c', '2,5 + 1,75 = 4,25.'),
(10, 'Jarak kota A ke kota B adalah 240 km. Jika ditempuh dengan kecepatan 60 km/jam, waktu yang dibutuhkan adalah...', '{"a":"3 jam","b":"4 jam","c":"5 jam","d":"6 jam","e":""}', 'b', 'Waktu = Jarak/Kecepatan = 240/60 = 4 jam.'),
(11, 'Pecahan 3/5 jika diubah ke persen menjadi...', '{"a":"35%","b":"53%","c":"60%","d":"65","e":""}', 'c', '3/5 = 0,6 = 60%.'),
(12, 'Nilai dari 7² - 3² adalah...', '{"a":"16","b":"25","c":"40","d":"49","e":""}', 'c', '7² - 3² = 49 - 9 = 40.'),
(13, 'Rata-rata nilai ulangan 5 siswa: 70, 80, 65, 90, 95 adalah...', '{"a":"78","b":"80","c":"82","d":"85","e":""}', 'b', '(70+80+65+90+95)/5 = 400/5 = 80.'),
(14, 'Keliling persegi dengan sisi 13 cm adalah...', '{"a":"26 cm","b":"39 cm","c":"52 cm","d":"65 cm","e":""}', 'c', 'Keliling = 4 × s = 4 × 13 = 52 cm.'),
(15, 'Diketahui data: 4, 6, 8, 6, 10, 6, 4. Modusnya adalah...', '{"a":"4","b":"6","c":"8","d":"10","e":""}', 'b', 'Modus = nilai yang paling sering muncul = 6 (muncul 3 kali).'),
(16, 'Sebuah toko membeli baju seharga Rp 80.000 dan dijual Rp 100.000. Untungnya adalah...', '{"a":"Rp 10.000","b":"Rp 15.000","c":"Rp 20.000","d":"Rp 25.000","e":""}', 'c', 'Untung = harga jual - harga beli = 100.000 - 80.000 = Rp 20.000.'),
(17, '1 km = ... m', '{"a":"10","b":"100","c":"1.000","d":"10.000","e":""}', 'c', '1 kilometer = 1.000 meter.'),
(18, 'Hasil dari 1/2 + 1/3 adalah...', '{"a":"2/5","b":"2/6","c":"5/6","d":"3/5","e":""}', 'c', '1/2 + 1/3 = 3/6 + 2/6 = 5/6.'),
(19, 'Sebuah lapangan berbentuk persegi panjang dengan panjang 50 m dan lebar 30 m. Luasnya adalah...', '{"a":"80 m²","b":"160 m²","c":"1.500 m²","d":"3.000 m²","e":""}', 'c', 'Luas = p × l = 50 × 30 = 1.500 m².'),
(20, 'Bilangan prima antara 10 dan 20 adalah...', '{"a":"11, 13, 17, 19","b":"11, 12, 13, 17","c":"13, 15, 17, 19","d":"11, 13, 15, 19","e":""}', 'a', 'Bilangan prima antara 10 dan 20: 11, 13, 17, 19 (hanya habis dibagi 1 dan dirinya sendiri).')
) AS q(nomor, soal, pilihan, jawaban_benar, pembahasan)
WHERE t.title = 'Tryout Matematika SD Kelas 6 - Persiapan Ujian'
ON CONFLICT (tryout_id, nomor) DO NOTHING;

UPDATE tryouts SET jumlah_soal = 20 WHERE title = 'Tryout Matematika SD Kelas 6 - Persiapan Ujian';

-- Konfirmasi
SELECT t.title, COUNT(q.id) as jumlah_soal
FROM tryouts t
LEFT JOIN questions q ON q.tryout_id = t.id
GROUP BY t.title
ORDER BY t.title;
