/*
========================================
APLIKASI KUIS INTERAKTIF - SCRIPT UTAMA
========================================

Deskripsi: Aplikasi kuis interaktif dengan berbagai topik
Fitur:
- Pemilihan topik (Pengetahuan Umum, Matematika, Sains, Sejarah, Budaya)
- Pertanyaan acak dengan 5 pilihan ganda
- Sistem penilaian dan feedback
- Navigasi antar layar
- Validasi input pengguna

Struktur Data:
- dataKuis: Object berisi semua pertanyaan per topik
- Variabel global: Status kuis, skor, dan navigasi
*/

// Konfirmasi bahwa file JavaScript berhasil dimuat
console.log('js berhasil');

// ================================
// VARIABEL GLOBAL - STATUS APLIKASI
// ================================

// Menyimpan nama pengguna yang diinput (String)
let namaPengguna = '';

// Menyimpan topik kuis yang dipilih (String)
let topikSaatIni = '';

// Index pertanyaan yang sedang aktif, dimulai dari 0 (Number)
let indeksPertanyaanSaatIni = 0;

// Skor total pengguna (Number)
let skor = 0;

// Menyimpan jawaban yang dipilih pengguna (String: A, B, C, D, atau E)
let jawabanTerpilih = '';

// Array berisi daftar pertanyaan untuk topik yang dipilih (Array of Objects)
let daftarPertanyaan = [];

// Flag untuk mencegah pengguna mengubah jawaban setelah memilih (Boolean)
let jawabanSudahDipilih = false;

// ================================
// DATABASE KUIS - STRUKTUR DATA
// ================================

/*
Struktur dataKuis:
- Object dengan key berupa nama topik (String)
- Value berupa Array of Objects, setiap object berisi:
  * pertanyaan: String - Teks pertanyaan
  * pilihan: Array of String - 5 pilihan jawaban (A-E)
  * jawaban: String - Jawaban benar (A, B, C, D, atau E)
  * penjelasan: String - Penjelasan jawaban untuk feedback
*/
const dataKuis = {
    'Pengetahuan Umum': [
        { pertanyaan: 'Siapa penemu Teori Relativitas Umum?', pilihan: ['A. Isaac Newton', 'B. Albert Einstein', 'C. Stephen Hawking', 'D. Nikola Tesla', 'E. Galileo Galilei'], jawaban: 'B', penjelasan: 'Albert Einstein mengembangkan Teori Relativitas Umum pada tahun 1915, yang menjelaskan gravitasi sebagai kurva ruang-waktu.' },
        { pertanyaan: 'Berapa jumlah negara anggota PBB saat ini (2024)?', pilihan: ['A. 193', 'B. 195', 'C. 197', 'D. 200', 'E. 202'], jawaban: 'A', penjelasan: 'Hingga tahun 2024, Perserikatan Bangsa-Bangsa (PBB) memiliki 193 negara anggota.' },
        { pertanyaan: 'Apa nama ibu kota Kanada?', pilihan: ['A. Toronto', 'B. Vancouver', 'C. Montreal', 'D. Ottawa', 'E. Calgary'], jawaban: 'D', penjelasan: 'Ottawa adalah ibu kota Kanada, meskipun Toronto dan Montreal adalah kota terbesarnya.' },
        { pertanyaan: 'Organisasi internasional apakah yang berpusat di Jenewa, Swiss, dan bertujuan menjaga perdamaian serta mencegah konflik bersenjata?', pilihan: ['A. NATO', 'B. PBB', 'C. Palang Merah Internasional', 'D. World Bank', 'E. IMF'], jawaban: 'C', penjelasan: 'Komite Internasional Palang Merah (ICRC) berpusat di Jenewa dan berperan penting dalam hukum humaniter internasional.' },
        { pertanyaan: 'Berapa samudra yang secara resmi diakui di dunia?', pilihan: ['A. 3', 'B. 4', 'C. 5', 'D. 6', 'E. 7'], jawaban: 'C', penjelasan: 'Secara tradisional ada 4 samudra, tetapi kini Samudra Selatan (Antartika) juga diakui, menjadikannya 5: Atlantik, Pasifik, Hindia, Arktik, dan Selatan.' },
        { pertanyaan: 'Apa nama gurun terbesar di dunia (bukan kutub)?', pilihan: ['A. Gurun Sahara', 'B. Gurun Arab', 'C. Gurun Gobi', 'D. Gurun Kalahari', 'E. Gurun Victoria Besar'], jawaban: 'A', penjelasan: 'Gurun Sahara adalah gurun panas terbesar di dunia, meliputi sebagian besar Afrika Utara.' },
        { pertanyaan: 'Siapa penemu mesin uap modern yang efisien?', pilihan: ['A. Thomas Newcomen', 'B. James Watt', 'C. George Stephenson', 'D. Robert Fulton', 'E. Rudolf Diesel'], jawaban: 'B', penjelasan: 'James Watt meningkatkan mesin uap Newcomen secara signifikan pada akhir abad ke-18, menjadikannya lebih efisien dan memicu Revolusi Industri.' },
        { pertanyaan: 'Apa nama mata uang Kroasia sebelum Euro?', pilihan: ['A. Kuna', 'B. Forint', 'C. Leu', 'D. Zloty', 'E. Koruna'], jawaban: 'A', penjelasan: 'Sebelum mengadopsi Euro pada 1 Januari 2023, mata uang Kroasia adalah Kuna (HRK).' },
        { pertanyaan: 'Negara manakah yang dikenal sebagai "Land of a Thousand Lakes"?', pilihan: ['A. Norwegia', 'B. Swedia', 'C. Finlandia', 'D. Kanada', 'E. Rusia'], jawaban: 'C', penjelasan: 'Finlandia memiliki lebih dari 187.000 danau, menjadikannya "Land of a Thousand Lakes".' },
        { pertanyaan: 'Siapa penulis karya filosofis "Thus Spoke Zarathustra"?', pilihan: ['A. Immanuel Kant', 'B. Friedrich Nietzsche', 'C. Arthur Schopenhauer', 'D. Georg Hegel', 'E. Søren Kierkegaard'], jawaban: 'B', penjelasan: 'Friedrich Nietzsche adalah filsuf Jerman yang terkenal dengan karya "Also sprach Zarathustra" (Thus Spoke Zarathustra).' }
    ],
    'Matematika': [
        { pertanyaan: 'Jika $f(x) = 2x^2 - 3x + 1$, berapakah nilai $f(-2)$?', pilihan: ['A. 15', 'B. 3', 'C. -1', 'D. -13', 'E. 9'], jawaban: 'A', penjelasan: 'Substitusi $x = -2$: $2(-2)^2 - 3(-2) + 1 = 2(4) + 6 + 1 = 8 + 6 + 1 = 15$.' },
        { pertanyaan: 'Berapakah nilai dari $\\log_{2}(32)$?', pilihan: ['A. 4', 'B. 5', 'C. 6', 'D. 8', 'E. 16'], jawaban: 'B', penjelasan: '$\\log_{2}(32)$ artinya $2$ pangkat berapa yang hasilnya $32$. $2^5 = 32$, jadi jawabannya adalah $5$.' },
        { pertanyaan: 'Jika sebuah deret geometri tak hingga memiliki suku pertama $a=8$ dan rasio $r=1/2$, berapakah jumlah deret tersebut?', pilihan: ['A. 12', 'B. 16', 'C. 20', 'D. 24', 'E. 32'], jawaban: 'B', penjelasan: 'Rumus jumlah deret geometri tak hingga adalah $S = a / (1-r)$. Jadi, $S = 8 / (1 / 2) = 16$.' },
        { pertanyaan: 'Berapakah turunan pertama dari $y = x^3 - 4x + 5$ terhadap $x$?', pilihan: ['A. $3x^2 - 4$', 'B. $x^2 - 4$', 'C. $3x^2 - 4x$', 'D. $3x^2 + 5$', 'E. $2x - 4$'], jawaban: 'A', penjelasan: 'Menggunakan aturan turunan pangkat ($d/dx (x^n) = nx^{n-1}$) dan turunan konstanta ($d/dx (c) = 0$). Jadi $d/dx (x^3) = 3x^2$ dan $d/dx (-4x) = -4$, $d/dx (5) = 0$.' },
        { pertanyaan: 'Jika $2x + y = 7$ dan $x - y = 2$, berapakah nilai $x$?', pilihan: ['A. 2', 'B. 3', 'C. 4', 'D. 5', 'E. 6'], jawaban: 'B', penjelasan: 'Dengan metode eliminasi, tambahkan kedua persamaan: $(2x + y) + (x - y) = 7 + 2 \\Rightarrow 3x = 9 \\Rightarrow x = 3$.' },
        { pertanyaan: 'Berapakah integral tak tentu dari $4x^3$ terhadap $x$?', pilihan: ['A. $x^4 + C$', 'B. $4x^4 + C$', 'C. $12x^2 + C$', 'D. $x^3 + C$', 'E. $x^5/5 + C$'], jawaban: 'A', penjelasan: 'Menggunakan aturan integral pangkat: $\\int x^n dx = (x^{n+1})/(n+1) + C$. Jadi $\\int 4x^3 dx = 4(x^{3+1})/(3+1) + C = 4x^4/4 + C = x^4 + C$.' },
        { pertanyaan: 'Berapakah jumlah sudut internal dari sebuah oktagon (segi delapan)?', pilihan: ['A. 720°', 'B. 900°', 'C. 1080°', 'D. 1260°', 'E. 1440°'], jawaban: 'C', penjelasan: 'Rumus jumlah sudut internal poligon dengan $n$ sisi adalah $(n-2) \\times 180°$. Untuk oktagon ($n=8$), $(8-2) \\times 180° = 6 \\times 180° = 1080°$.' },
        { pertanyaan: 'Jika probabilitas suatu kejadian adalah $0.4$, berapakah probabilitas kejadian tersebut TIDAK terjadi?', pilihan: ['A. 0.1', 'B. 0.2', 'C. 0.3', 'D. 0.5', 'E. 0.6'], jawaban: 'E', penjelasan: 'Probabilitas suatu kejadian tidak terjadi adalah $1$ dikurangi probabilitas kejadian itu terjadi. Jadi $1 - 0.4 = 0.6$.' },
        { pertanyaan: 'Berapakah nilai dari $\\cos(30°)$?', pilihan: ['A. $1/2$', 'B. $\\sqrt{2}/2$', 'C. $\\sqrt{3}/2$', 'D. 1', 'E. 0'], jawaban: 'C', penjelasan: 'Nilai $\\cos(30°)$ dalam trigonometri adalah $\\sqrt{3}/2$.' },
        { pertanyaan: 'Jika $A = \\begin{pmatrix} 2 & 1 \\\\ 3 & 4 \\end{pmatrix}$, berapakah determinan matriks $A$?', pilihan: ['A. 5', 'B. 6', 'C. 7', 'D. 8', 'E. 9'], jawaban: 'A', penjelasan: 'Determinan matriks $2 \\times 2$ $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ adalah $ad - bc$. Jadi $det(A) = (2)(4) - (1)(3) = 8 - 3 = 5$.' }
    ],
    'Sains': [
        { pertanyaan: 'Apa nama partikel subatomik yang memiliki muatan positif?', pilihan: ['A. Elektron', 'B. Neutron', 'C. Proton', 'D. Foton', 'E. Positron'], jawaban: 'C', penjelasan: 'Proton adalah partikel subatomik yang ditemukan di dalam inti atom dan memiliki muatan listrik positif.' },
        { pertanyaan: 'Berapa kecepatan cahaya di ruang hampa (dalam $m/s$)?', pilihan: ['A. $3 \\times 10^5$', 'B. $3 \\times 10^6$', 'C. $3 \\times 10^7$', 'D. $3 \\times 10^8$', 'E. $3 \\times 10^9$'], jawaban: 'D', penjelasan: 'Kecepatan cahaya di ruang hampa adalah konstanta fisik universal, sekitar $299.792.458$ meter per detik, yang sering dibulatkan menjadi $3 \\times 10^8$ $m/s$.' },
        { pertanyaan: 'Apa nama proses di mana tumbuhan mengubah energi cahaya menjadi energi kimia?', pilihan: ['A. Respirasi', 'B. Transpirasi', 'C. Fotosintesis', 'D. Kemosintesis', 'E. Fermentasi'], jawaban: 'C', penjelasan: 'Fotosintesis adalah proses biokimia di mana tumbuhan hijau, alga, dan beberapa bakteri mengubah energi cahaya menjadi energi kimia, menghasilkan glukosa dan oksigen.' },
        { pertanyaan: 'Apa unsur kimia dengan nomor atom 79?', pilihan: ['A. Perak (Ag)', 'B. Emas (Au)', 'C. Tembaga (Cu)', 'D. Besi (Fe)', 'E. Timah (Sn)'], jawaban: 'B', penjelasan: 'Unsur dengan nomor atom 79 adalah Emas, dengan simbol kimia Au (Aurum).' },
        { pertanyaan: 'Apa nama unit dasar hereditas yang terbuat dari DNA?', pilihan: ['A. Kromosom', 'B. Protein', 'C. Gen', 'D. Alel', 'E. Mitokondria'], jawaban: 'C', penjelasan: 'Gen adalah unit dasar hereditas biologis, segmen DNA yang mengkode informasi genetik tertentu.' },
        { pertanyaan: 'Apa nama lapisan atmosfer bumi yang paling rendah dan tempat sebagian besar fenomena cuaca terjadi?', pilihan: ['A. Stratosfer', 'B. Mesosfer', 'C. Termosfer', 'D. Troposfer', 'E. Eksosfer'], jawaban: 'D', penjelasan: 'Troposfer adalah lapisan terendah atmosfer bumi, tempat terjadinya sebagian besar fenomena cuaca dan tempat manusia hidup.' },
        { pertanyaan: 'Apa nama gaya yang menahan planet-planet di orbit mengelilingi matahari?', pilihan: ['A. Gaya sentrifugal', 'B. Gaya sentripetal', 'C. Gaya elektromagnetik', 'D. Gaya gravitasi', 'E. Gaya nuklir lemah'], jawaban: 'D', penjelasan: 'Gaya gravitasi adalah gaya fundamental yang menarik benda-benda dengan massa, termasuk planet dan bintang, dan menjaga mereka tetap di orbit.' },
        { pertanyaan: 'Apa organ utama yang bertanggung jawab untuk menyaring darah dan memproduksi urin pada manusia?', pilihan: ['A. Hati', 'B. Paru-paru', 'C. Ginjal', 'D. Limpa', 'E. Pankreas'], jawaban: 'C', penjelasan: 'Ginjal adalah organ utama sistem urinaria yang berfungsi menyaring produk limbah dari darah dan mengeluarkannya sebagai urin.' },
        { pertanyaan: 'Apa nama bahan bakar yang terbentuk dari sisa-sisa organisme hidup purba dan merupakan sumber energi non-terbarukan utama?', pilihan: ['A. Hidrogen', 'B. Etanol', 'C. Biomassa', 'D. Bahan bakar fosil', 'E. Tenaga surya'], jawaban: 'D', penjelasan: 'Bahan bakar fosil (seperti batu bara, minyak bumi, dan gas alam) terbentuk dari dekomposisi anaerobik organisme mati selama jutaan tahun.' },
        { pertanyaan: 'Apa nama fenomena di mana cahaya membengkok saat melewati dari satu medium ke medium lain?', pilihan: ['A. Refleksi', 'B. Difraksi', 'C. Interferensi', 'D. Refraksi', 'E. Polarisasi'], jawaban: 'D', penjelasan: 'Refraksi adalah pembelokan gelombang (seperti cahaya) saat melewati batas antara dua medium yang berbeda indeks biasnya.' }
    ],
    'Sejarah': [
        { pertanyaan: 'Kaisar Romawi manakah yang memindahkan ibu kota Kekaisaran Romawi ke Byzantium (kemudian Konstantinopel) pada tahun 330 M?', pilihan: ['A. Augustus', 'B. Nero', 'C. Constantine the Great', 'D. Diocletian', 'E. Trajan'], jawaban: 'C', penjelasan: 'Kaisar Konstantinus Agung memindahkan ibu kota ke Byzantium, yang kemudian dinamai Konstantinopel, pada tahun 330 M.' },
        { pertanyaan: 'Siapa penjelajah Portugis pertama yang berhasil berlayar mengelilingi Tanjung Harapan dan mencapai India?', pilihan: ['A. Ferdinand Magellan', 'B. Christopher Columbus', 'C. Vasco da Gama', 'D. Bartolomeu Dias', 'E. Pedro Álvares Cabral'], jawaban: 'C', penjelasan: 'Vasco da Gama adalah navigator Portugis yang menjadi orang Eropa pertama yang mencapai India melalui laut, mengelilingi Tanjung Harapan pada 1498.' },
        { pertanyaan: 'Peristiwa apakah yang memicu dimulainya Perang Dunia I?', pilihan: ['A. Penyerangan Pearl Harbor', 'B. Pembunuhan Archduke Franz Ferdinand', 'C. Invasi Polandia', 'D. Krisis Rudal Kuba', 'E. Jatuhnya Tembok Berlin'], jawaban: 'B', penjelasan: 'Pembunuhan Archduke Franz Ferdinand dari Austria-Hongaria di Sarajevo pada Juni 1914 adalah percikan yang menyulut Perang Dunia I.' },
        { pertanyaan: 'Siapa pemimpin Revolusi Kuba yang berhasil menggulingkan kediktatoran Fulgencio Batista pada tahun 1959?', pilihan: ['A. Che Guevara', 'B. Raúl Castro', 'C. Fidel Castro', 'D. Anastasio Somoza', 'E. Hugo Chávez'], jawaban: 'C', penjelasan: 'Fidel Castro adalah tokoh sentral Revolusi Kuba, memimpin gerakan yang berhasil menggulingkan Batista dan menjadi pemimpin Kuba.' },
        { pertanyaan: 'Dinasti manakah yang memerintah Tiongkok dari tahun 1368 hingga 1644, dan terkenal karena Tembok Besar?', pilihan: ['A. Dinasti Qin', 'B. Dinasti Han', 'C. Dinasti Tang', 'D. Dinasti Ming', 'E. Dinasti Qing'], jawaban: 'D', penjelasan: 'Dinasti Ming (1368-1644) adalah dinasti yang sangat berpengaruh dalam sejarah Tiongkok, dan pembangunan serta restorasi Tembok Besar banyak terjadi pada masa ini.' },
        { pertanyaan: 'Apa nama deklarasi yang dikeluarkan oleh Presiden Abraham Lincoln pada tahun 1863 untuk membebaskan budak di negara-negara bagian Konfederasi selama Perang Saudara Amerika?', pilihan: ['A. Bill of Rights', 'B. Emancipation Proclamation', 'C. Gettysburg Address', 'D. Declaration of Independence', 'E. Articles of Confederation'], jawaban: 'B', penjelasan: 'Emancipation Proclamation, yang dikeluarkan oleh Abraham Lincoln, menyatakan semua budak di negara-negara bagian Konfederasi yang memisahkan diri adalah bebas.' },
        { pertanyaan: 'Kapan Revolusi Rusia (Revolusi Oktober) terjadi, yang mengakhiri Kekaisaran Rusia dan membawa Bolshevik ke kekuasaan?', pilihan: ['A. 1905', 'B. 1917', 'C. 1922', 'D. 1929', 'E. 1933'], jawaban: 'B', penjelasan: 'Revolusi Oktober adalah fase kedua Revolusi Rusia tahun 1917, di mana Partai Bolshevik di bawah pimpinan Vladimir Lenin merebut kekuasaan.' },
        { pertanyaan: 'Siapa filsuf Yunani kuno yang menjadi guru dari Alexander Agung?', pilihan: ['A. Socrates', 'B. Plato', 'C. Aristotle', 'D. Pythagoras', 'E. Thales'], jawaban: 'C', penjelasan: 'Aristotle adalah salah satu filsuf terbesar dalam sejarah Barat, dan ia adalah guru dari Alexander Agung.' },
        { pertanyaan: 'Apa nama perjanjian yang secara resmi mengakhiri Perang Dunia I?', pilihan: ['A. Perjanjian Sykes-Picot', 'B. Perjanjian Versailles', 'C. Perjanjian Lausanne', 'D. Perjanjian Trianon', 'E. Perjanjian Saint-Germain-en-Laye'], jawaban: 'B', penjelasan: 'Perjanjian Versailles, ditandatangani pada 28 Juni 1919, secara resmi mengakhiri Perang Dunia I antara Sekutu dan Jerman.' },
        { pertanyaan: 'Peradaban kuno manakah yang membangun piramida besar sebagai makam untuk firaun mereka?', pilihan: ['A. Mesopotamia', 'B. Indus Valley', 'C. Mesir', 'D. Aztec', 'E. Inca'], jawaban: 'C', penjelasan: 'Peradaban Mesir kuno terkenal dengan pembangunan piramida monumental sebagai makam dan monumen untuk firaun mereka.' }
    ],
    'Budaya': [
        { pertanyaan: 'Apa nama gaya arsitektur yang dominan di Eropa antara abad ke-12 dan ke-16, ditandai oleh lengkungan runcing, kubah berusuk, dan penopang terbang?', pilihan: ['A. Romanesque', 'B. Barok', 'C. Gotik', 'D. Renaisans', 'E. Neoklasik'], jawaban: 'C', penjelasan: 'Arsitektur Gotik adalah gaya dominan di Eropa dari pertengahan abad ke-12 hingga abad ke-16, terkenal dengan ciri-ciri tersebut.' },
        { pertanyaan: 'Siapa penulis epos kuno "The Odyssey" dan "The Iliad"?', pilihan: ['A. Plato', 'B. Socrates', 'C. Homer', 'D. Virgil', 'E. Ovid'], jawaban: 'C', penjelasan: 'Homer adalah penyair Yunani kuno legendaris yang dikreditkan sebagai penulis dua epos besar sastra Barat, "The Iliad" dan "The Odyssey".' },
        { pertanyaan: 'Festival cahaya Hindu manakah yang dirayakan selama lima hari, melambangkan kemenangan terang atas kegelapan?', pilihan: ['A. Holi', 'B. Diwali', 'C. Navratri', 'D. Durga Puja', 'E. Eid al-Fitr'], jawaban: 'B', penjelasan: 'Diwali adalah festival Hindu yang paling penting, dirayakan secara luas dan melambangkan kemenangan cahaya atas kegelapan, kebaikan atas kejahatan.' },
        { pertanyaan: 'Apa nama gerakan seni abad ke-20 yang menekankan subjek bawah sadar, impian, dan citra irasional?', pilihan: ['A. Kubisme', 'B. Impresionisme', 'C. Surealisme', 'D. Futurisme', 'E. Dadaisme'], jawaban: 'C', penjelasan: 'Surealisme adalah gerakan budaya yang dimulai pada awal 1920-an, paling dikenal karena karya visual dan tulisan yang menggabungkan elemen mimpi dan irasional.' },
        { pertanyaan: 'Alat musik tradisional apakah yang berasal dari Australia dan dibuat dari batang pohon yang dilubangi oleh rayap?', pilihan: ['A. Djembe', 'B. Didgeridoo', 'C. Pan Flute', 'D. Sitar', 'E. Koto'], jawaban: 'B', penjelasan: 'Didgeridoo adalah alat musik tiup yang berasal dari Aborigin Australia Utara, dibuat dari batang pohon yang dilubangi secara alami oleh rayap.' },
        { pertanyaan: 'Apa nama tarian flamenco yang paling otentik dan tradisional dari Spanyol selatan?', pilihan: ['A. Salsa', 'B. Tango', 'C. Sevillanas', 'D. Bulerías', 'E. Rumba'], jawaban: 'D', penjelasan: 'Bulerías adalah salah satu bentuk (palo) flamenco yang paling cepat dan ceria, seringkali menjadi bentuk penutup di banyak pertunjukan flamenco.' },
        { pertanyaan: 'Siapa dramawan Inggris yang terkenal dengan tragedi seperti "Hamlet", "Othello", dan "Macbeth"?', pilihan: ['A. Christopher Marlowe', 'B. Ben Jonson', 'C. William Shakespeare', 'D. George Bernard Shaw', 'E. Oscar Wilde'], jawaban: 'C', penjelasan: 'William Shakespeare adalah seorang dramawan dan penyair Inggris yang secara luas dianggap sebagai penulis terbesar dalam bahasa Inggris.' },
        { pertanyaan: 'Karya seni ikonik "Mona Lisa" dilukis oleh seniman Renaisans mana?', pilihan: ['A. Michelangelo', 'B. Raphael', 'C. Leonardo da Vinci', 'D. Donatello', 'E. Sandro Botticelli'], jawaban: 'C', penjelasan: 'Mona Lisa adalah lukisan potret abad ke-16 karya Leonardo da Vinci, yang dianggap sebagai salah satu lukisan paling terkenal di dunia.' },
        { pertanyaan: 'Apa nama tarian tradisional Jepang yang biasanya dilakukan selama festival Bon untuk menghormati arwah leluhur?', pilihan: ['A. Kabuki', 'B. Noh', 'C. Odori', 'D. Bon Odori', 'E. Butoh'], jawaban: 'D', penjelasan: 'Bon Odori adalah tarian tradisional Jepang yang dilakukan selama festival Obon untuk menyambut dan menghibur arwah leluhur.' },
        { pertanyaan: 'Instrumen musik klasik India mana yang terkenal dengan suara resonansinya dan sering digunakan dalam musik klasik Hindustani?', pilihan: ['A. Tabla', 'B. Sitar', 'C. Flute Bansuri', 'D. Harmonium', 'E. Tanpura'], jawaban: 'B', penjelasan: 'Sitar adalah alat musik dawai yang dipetik, berasal dari India, yang dikenal karena suaranya yang kaya dan bergema.' }
    ]
};

// ================================
// FUNGSI UTAMA - NAVIGASI KUIS
// ================================

/*
Fungsi mulaiKuis()
- Dipanggil saat pengguna menekan tombol "Mulai Kuis"
- Memvalidasi input nama pengguna
- Berpindah dari layar welcome ke layar pemilihan topik
- Menggunakan DOM manipulation untuk mengubah visibility layar
*/
function mulaiKuis() {
    console.log('Fungsi mulaiKuis() dipanggil');
    
    // Mengambil elemen input nama dari DOM
    const inputNama = document.getElementById('user-name');
    
    // Validasi: pastikan nama tidak kosong
    if (inputNama.value === '') {
        console.log('Nama pengguna kosong, menampilkan alert');
        alert('Silakan masukkan nama Anda terlebih dahulu!');
        return; // Keluar dari fungsi jika validasi gagal
    }
    
    // Simpan nama pengguna ke variabel global
    namaPengguna = inputNama.value;
    console.log(`Nama pengguna diset: ${namaPengguna}`);
    
    // Navigasi layar: sembunyikan welcome screen dan tampilkan topic selection
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('topic-selection').classList.remove('hidden');
    console.log('Tampilan berganti ke layar pemilihan topik');
}

/*
Fungsi pilihTopik(topik)
- Dipanggil saat pengguna memilih salah satu kartu topik
- Parameter: topik (String) - nama topik yang dipilih
- Menginisialisasi kuis dengan pertanyaan acak
- Berpindah ke layar kuis utama
*/
function pilihTopik(topik) {
    console.log(`Fungsi pilihTopik() dipanggil dengan topik: ${topik}`);
    
    // Simpan topik yang dipilih
    topikSaatIni = topik;
    
    // Ambil pertanyaan dari database dan acak urutannya
    // Menggunakan spread operator (...) untuk membuat copy array
    daftarPertanyaan = acakArray([...dataKuis[topik]]);
    
    // Reset variabel kuis
    indeksPertanyaanSaatIni = 0;
    skor = 0;
    
    console.log(`Pertanyaan diacak, total: ${daftarPertanyaan.length} pertanyaan`);
    
    // Navigasi layar: sembunyikan topic selection dan tampilkan quiz screen
    document.getElementById('topic-selection').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    console.log('Tampilan berganti ke layar kuis');
    
    // Tampilkan pertanyaan pertama
    tampilkanPertanyaan();
}

// ================================
// FUNGSI UTAMA - LOGIKA PERMAINAN
// ================================

/*
Fungsi tampilkanPertanyaan()
- Menampilkan pertanyaan dan pilihan jawaban ke layar
- Mengatur ulang status jawaban sebelumnya
- Mengaktifkan pilihan bagi pengguna
- Mengisi konten HTML secara dinamis
*/
function tampilkanPertanyaan() {
    console.log(`Fungsi tampilkanPertanyaan() dipanggil - Pertanyaan ke-${indeksPertanyaanSaatIni + 1}`);
    
    // Reset status jawaban untuk pertanyaan baru
    jawabanSudahDipilih = false;
    
    // Mengaktifkan semua opsi pilihan (enable pointer events)
    document.querySelectorAll('.option').forEach(opsi => opsi.style.pointerEvents = 'auto');
    
    // Mengambil data pertanyaan saat ini dari array
    const pertanyaan = daftarPertanyaan[indeksPertanyaanSaatIni];
    console.log(`Menampilkan pertanyaan: "${pertanyaan.pertanyaan}"`);
    
    // Menampilkan nomor pertanyaan (1-based indexing untuk user)
    document.getElementById('question-number').textContent = `Pertanyaan ${indeksPertanyaanSaatIni + 1} dari ${daftarPertanyaan.length}`;
    
    // Menampilkan teks pertanyaan
    document.getElementById('question-text').textContent = pertanyaan.pertanyaan;
    
    // Mengambil container untuk pilihan jawaban
    const wadahPilihan = document.getElementById('options-container');
    
    // Mengosongkan pilihan dari pertanyaan sebelumnya
    wadahPilihan.innerHTML = '';
    console.log('Opsi pilihan dikosongkan, membuat opsi baru');
    
    // Membuat elemen pilihan untuk setiap jawaban
    pertanyaan.pilihan.forEach((teksPilihan, indeks) => {
        // Mengambil huruf pilihan (A, B, C, D, E) dari karakter pertama
        const hurufPilihan = teksPilihan.charAt(0);
        
        // Membuat elemen div untuk pilihan
        const divPilihan = document.createElement('div');
        divPilihan.className = 'option';
        divPilihan.textContent = teksPilihan;
        
        // Menambahkan event handler untuk klik pilihan
        divPilihan.onclick = () => pilihOpsi(hurufPilihan, divPilihan);
        
        // Menambahkan pilihan ke container
        wadahPilihan.appendChild(divPilihan);
    });
    
    // Reset variabel jawaban dan UI
    jawabanTerpilih = '';
    document.getElementById('next-btn').disabled = true; // Disable tombol Next
    document.getElementById('feedback-message').classList.add('hidden'); // Sembunyikan feedback
    
    console.log('Pertanyaan berhasil ditampilkan');
}

/*
Fungsi pilihOpsi(hurufJawaban, elemen)
- Dipanggil saat pengguna memilih salah satu opsi jawaban
- Parameter: hurufJawaban (String) - huruf jawaban yang dipilih (A-E)
- Parameter: elemen (HTMLElement) - elemen DOM yang diklik
- Memproses dan mengevaluasi jawaban pengguna
- Menampilkan feedback dan mengatur skor
*/
function pilihOpsi(hurufJawaban, elemen) {
    console.log(`Fungsi pilihOpsi() dipanggil dengan jawaban: ${hurufJawaban}`);
    
    // Prevent multiple selections - cegah pengguna memilih lagi
    if (jawabanSudahDipilih) return;
    jawabanSudahDipilih = true;
    
    // Nonaktifkan semua opsi pilihan setelah memilih
    document.querySelectorAll('.option').forEach(opsi => opsi.style.pointerEvents = 'none');
    console.log('Jawaban dipilih, semua opsi dinonaktifkan');
    document.querySelectorAll('.option').forEach(opsi => {
        opsi.classList.remove('selected', 'correct', 'incorrect');
    });
    elemen.classList.add('selected');
    jawabanTerpilih = hurufJawaban;
    const pesanUmpanBalik = document.getElementById('feedback-message');
    const pertanyaanSaatIni = daftarPertanyaan[indeksPertanyaanSaatIni];
    if (jawabanTerpilih === pertanyaanSaatIni.jawaban) {
        // JAWABAN BENAR
        console.log('Jawaban BENAR!');
        elemen.classList.add('correct'); // Styling hijau
        skor++; // Tambah skor
        console.log(`Skor bertambah menjadi: ${skor}`);
        
        // Tampilkan penjelasan dengan styling positif
        pesanUmpanBalik.innerHTML = `✅ <strong>Benar!</strong><br>${pertanyaanSaatIni.penjelasan}`;
        pesanUmpanBalik.className = 'feedback-message correct';
    } else {
        // JAWABAN SALAH
        console.log(`Jawaban SALAH! Jawaban benar: ${pertanyaanSaatIni.jawaban}`);
        elemen.classList.add('incorrect'); // Styling merah
        
        // Tampilkan jawaban benar dan penjelasan
        pesanUmpanBalik.innerHTML = `❌ <strong>Salah!</strong> Jawaban benar: <strong>${pertanyaanSaatIni.jawaban}</strong><br>${pertanyaanSaatIni.penjelasan}`;
        pesanUmpanBalik.className = 'feedback-message incorrect';
        
        // Tampilkan jawaban benar dengan warna hijau
        const jawabanBenar = document.querySelector(`.option:nth-child(${pertanyaanSaatIni.jawaban.charCodeAt(0) - 64})`);
        if (jawabanBenar) {
            jawabanBenar.classList.add('correct');
        }
    }
    
    // Tampilkan feedback dan aktifkan tombol Next
    pesanUmpanBalik.classList.remove('hidden');
    document.getElementById('next-btn').disabled = false;
    console.log('Feedback ditampilkan, tombol Next diaktifkan');
}

/*
Fungsi pertanyaanSelanjutnya()
- Dipanggil saat pengguna menekan tombol "Selanjutnya"
- Mengatur navigasi ke pertanyaan berikutnya
- Menentukan apakah kuis berlanjut atau selesai
*/
function pertanyaanSelanjutnya() {
    console.log(`Fungsi pertanyaanSelanjutnya() dipanggil - Indeks saat ini: ${indeksPertanyaanSaatIni}`);
    
    // Pindah ke pertanyaan berikutnya
    indeksPertanyaanSaatIni++;
    
    // Cek apakah masih ada pertanyaan
    if (indeksPertanyaanSaatIni < daftarPertanyaan.length) {
        console.log(`Masih ada pertanyaan, pindah ke pertanyaan ke-${indeksPertanyaanSaatIni + 1}`);
        tampilkanPertanyaan(); // Tampilkan pertanyaan berikutnya
    } else {
        console.log('Semua pertanyaan selesai, menampilkan hasil');
        tampilkanHasil(); // Tampilkan hasil akhir
    }
}

/*
Fungsi tampilkanHasil()
- Menampilkan layar hasil akhir kuis
- Menghitung persentase skor
- Memberikan feedback berdasarkan pencapaian pengguna
- Navigasi ke layar hasil
*/
function tampilkanHasil() {
    console.log(`Fungsi tampilkanHasil() dipanggil - Skor akhir: ${skor}/${daftarPertanyaan.length}`);
    
    // Hitung persentase skor
    const persentase = Math.round((skor / daftarPertanyaan.length) * 100);
    console.log(`Persentase skor: ${persentase}%`);
    
    // Tampilkan skor dalam format yang menarik
    const elemenSkor = document.getElementById('final-score');
    elemenSkor.textContent = `${skor}/${daftarPertanyaan.length}`;
    
    // Tampilkan pesan hasil berdasarkan persentase skor
    const teksHasil = document.getElementById('result-message');
    
    // Sistem penilaian berdasarkan persentase
    if (persentase >= 90) {
        teksHasil.innerHTML = `Luar biasa sekali, ${namaPengguna}! 🎉<br>Kamu adalah mastermind sejati! Hampir semua jawabanmu benar!`;
    } else if (persentase >= 80) {
        teksHasil.innerHTML = `Keren banget, ${namaPengguna}! 🌟<br>Kamu punya pengetahuan yang sangat baik! Terus pertahankan!`;
    } else if (persentase >= 70) {
        teksHasil.innerHTML = `Bagus sekali, ${namaPengguna}! 👍<br>Pengetahuanmu sudah cukup solid. Sedikit lagi bisa sempurna!`;
    } else if (persentase >= 60) {
        teksHasil.innerHTML = `Tidak buruk, ${namaPengguna}! 😊<br>Kamu sudah di jalur yang benar. Tetap semangat belajar!`;
    } else if (persentase >= 50) {
        teksHasil.innerHTML = `Cukup lumayan, ${namaPengguna}! 🙂<br>Masih ada ruang untuk berkembang. Jangan menyerah!`;
    } else if (persentase >= 30) {
        teksHasil.innerHTML = `Hmm, ${namaPengguna}! 🤔<br>Sepertinya perlu belajar lebih banyak nih. Semangat!`;
    } else {
        teksHasil.innerHTML = `Aduh, ${namaPengguna}! 😅<br>Semua jawabanmu belum on point nih. Gapapa, tetep belajar dan coba lagi!💡`;
    }
    console.log('Pesan hasil ditampilkan');
}

// ================================
// FUNGSI UTILITAS - RESET & NAVIGASI
// ================================

/*
Fungsi ulangKuis()
- Dipanggil saat pengguna menekan tombol "Mulai Ulang"
- Mereset semua variabel kuis ke nilai awal
- Mengembalikan pengguna ke layar pemilihan topik
*/
function ulangKuis() {
    console.log('Fungsi ulangKuis() dipanggil');
    
    // Reset semua variabel kuis
    indeksPertanyaanSaatIni = 0;
    skor = 0;
    jawabanTerpilih = '';
    
    console.log('Variabel kuis direset');
    
    // Navigasi layar: kembali ke topic selection
    document.getElementById('results-screen').classList.add('hidden');
    document.getElementById('topic-selection').classList.remove('hidden');
    console.log('Tampilan berganti ke layar pemilihan topik');
}

/*
Fungsi konfirmasiKeluarKuis()
- Menampilkan dialog konfirmasi saat pengguna ingin meninggalkan kuis
- Menggunakan confirm() untuk mendapatkan konfirmasi pengguna
*/
function konfirmasiKeluarKuis() {
    console.log('Fungsi konfirmasiKeluarKuis() dipanggil');
    
    // Tampilkan dialog konfirmasi
    if (confirm('Apakah Anda yakin ingin meninggalkan kuis?')) {
        console.log('User mengkonfirmasi keluar dari kuis');
        keluarKuis(false); // Keluar dari kuis
    } else {
        console.log('User membatalkan keluar dari kuis');
    }
}

/*
Fungsi keluarKuis(dariLayarHasil)
- Mengatur ulang semua variabel kuis dan UI
- Mengembalikan pengguna ke layar selamat datang
- Parameter: dariLayarHasil (Boolean) - menentukan layar asal pemanggilan
*/
function keluarKuis(dariLayarHasil) {
    console.log(`Fungsi keluarKuis() dipanggil - dari layar hasil: ${dariLayarHasil}`);
    
    // Reset semua variabel kuis ke nilai awal
    namaPengguna = '';
    topikSaatIni = '';
    indeksPertanyaanSaatIni = 0;
    skor = 0;
    jawabanTerpilih = '';
    daftarPertanyaan = [];
    jawabanSudahDipilih = false;
    
    console.log('Semua variabel kuis direset');
    
    // Navigasi layar: kembali ke welcome screen
    if (dariLayarHasil) {
        document.getElementById('results-screen').classList.add('hidden');
    } else {
        document.getElementById('quiz-screen').classList.add('hidden');
    }
    
    // Tampilkan layar welcome dan kosongkan input nama
    document.getElementById('welcome-screen').classList.remove('hidden');
    document.getElementById('user-name').value = '';
    
    console.log('Tampilan berganti ke layar selamat datang');
}

// ================================
// FUNGSI UTILITAS - ALGORITMA
// ================================

/*
Fungsi acakArray(array)
- Mengacak urutan elemen dalam array menggunakan algoritma Fisher-Yates shuffle
- Parameter: array (Array) - array yang akan diacak
- Return: Array yang sudah diacak
- Algoritma Fisher-Yates:
  1. Iterasi dari elemen terakhir ke elemen kedua
  2. Pilih indeks acak dari 0 hingga i (inklusif)
  3. Tukar elemen pada indeks i dengan elemen pada indeks acak
*/
function acakArray(array) {
    console.log('Fungsi acakArray() dipanggil untuk mengacak pertanyaan');
    
    // Implementasi Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        // Pilih indeks acak dari 0 hingga i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Tukar elemen menggunakan destructuring assignment
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    console.log('Array berhasil diacak');
    return array;
}

// ================================
// EVENT LISTENERS - INTERAKSI PENGGUNA
// ================================

/*
Event listener untuk input nama pengguna
- Mendeteksi penekanan tombol Enter pada input field
- Memulai kuis secara otomatis tanpa perlu klik tombol
- Memberikan alternatif cara untuk memulai kuis
*/
document.getElementById('user-name').addEventListener('keypress', function(e) {
    // Cek apakah tombol yang ditekan adalah Enter
    if (e.key === 'Enter') {
        console.log('Tombol Enter ditekan pada input nama');
        mulaiKuis(); // Panggil fungsi mulai kuis
    }
});

/*
========================================
RINGKASAN STRUKTUR APLIKASI
========================================

1. VARIABEL GLOBAL:
   - namaPengguna: Menyimpan nama pengguna (String)
   - topikSaatIni: Menyimpan topik yang dipilih (String)
   - indeksPertanyaanSaatIni: Index pertanyaan aktif (Number)
   - skor: Skor pengguna (Number)
   - jawabanTerpilih: Jawaban yang dipilih (String)
   - daftarPertanyaan: Array pertanyaan yang diacak (Array)
   - jawabanSudahDipilih: Flag status pemilihan (Boolean)

2. DATA STRUCTURE:
   - dataKuis: Object berisi semua pertanyaan per topik
   - Setiap pertanyaan memiliki: pertanyaan, pilihan, jawaban, penjelasan

3. ALUR APLIKASI:
   Welcome Screen → Topic Selection → Quiz Screen → Results Screen

4. FUNGSI UTAMA:
   - mulaiKuis(): Validasi nama dan navigasi ke topic selection
   - pilihTopik(): Inisialisasi kuis dan acak pertanyaan
   - tampilkanPertanyaan(): Menampilkan pertanyaan dan pilihan
   - pilihOpsi(): Evaluasi jawaban dan tampilkan feedback
   - pertanyaanSelanjutnya(): Navigasi ke pertanyaan berikutnya
   - tampilkanHasil(): Kalkulasi skor dan tampilkan hasil
   - ulangKuis(): Reset kuis dan kembali ke topic selection
   - keluarKuis(): Reset semua dan kembali ke welcome screen

5. FITUR TAMBAHAN:
   - Validasi input nama
   - Sistem scoring dan feedback
   - Algoritma Fisher-Yates untuk acak pertanyaan
   - Keyboard navigation (Enter untuk mulai)
   - UI feedback (styling pilihan benar/salah)
   - Konfirmasi keluar kuis
*/
