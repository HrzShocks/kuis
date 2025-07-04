console.log('js berhasil');
let namaPengguna = '';
let topikSaatIni = '';
let indeksPertanyaanSaatIni = 0;
let skor = 0;
let jawabanTerpilih = '';
let daftarPertanyaan = [];
let jawabanSudahDipilih = false;

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

function mulaiKuis() {
    console.log('Fungsi mulaiKuis() dipanggil');
    const inputNama = document.getElementById('user-name');
    if (inputNama.value.trim() === '') {
        console.log('Nama pengguna kosong, menampilkan alert');
        alert('Silakan masukkan nama Anda terlebih dahulu!');
        return;
    }
    namaPengguna = inputNama.value;
    console.log(`Nama pengguna diset: ${namaPengguna}`);
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('topic-selection').classList.remove('hidden');
    console.log('Tampilan berganti ke layar pemilihan topik');
}

function pilihTopik(topik) {
    console.log(`Fungsi pilihTopik() dipanggil dengan topik: ${topik}`);
    topikSaatIni = topik;
    daftarPertanyaan = acakArray([...dataKuis[topik]]);
    indeksPertanyaanSaatIni = 0;
    skor = 0;
    console.log(`Pertanyaan diacak, total: ${daftarPertanyaan.length} pertanyaan`);
    document.getElementById('topic-selection').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    console.log('Tampilan berganti ke layar kuis');
    tampilkanPertanyaan();
}

function tampilkanPertanyaan() {
    console.log(`Fungsi tampilkanPertanyaan() dipanggil - Pertanyaan ke-${indeksPertanyaanSaatIni + 1}`);
    jawabanSudahDipilih = false;
    document.querySelectorAll('.option').forEach(opsi => opsi.style.pointerEvents = 'auto');
    const pertanyaan = daftarPertanyaan[indeksPertanyaanSaatIni];
    console.log(`Menampilkan pertanyaan: "${pertanyaan.pertanyaan}"`);
    document.getElementById('question-number').textContent = `Pertanyaan ${indeksPertanyaanSaatIni + 1} dari ${daftarPertanyaan.length}`;
    document.getElementById('question-text').textContent = pertanyaan.pertanyaan;
    const wadahPilihan = document.getElementById('options-container');
    wadahPilihan.innerHTML = '';
    console.log('Opsi pilihan dikosongkan, membuat opsi baru');
    pertanyaan.pilihan.forEach((teksPilihan, indeks) => {
        const hurufPilihan = teksPilihan.charAt(0);
        const divPilihan = document.createElement('div');
        divPilihan.className = 'option';
        divPilihan.textContent = teksPilihan;
        divPilihan.onclick = () => pilihOpsi(hurufPilihan, divPilihan);
        wadahPilihan.appendChild(divPilihan);
    });
    jawabanTerpilih = '';
    document.getElementById('next-btn').disabled = true;
    document.getElementById('feedback-message').classList.add('hidden');
    document.getElementById('feedback-message').textContent = '';
    console.log('Pertanyaan berhasil ditampilkan');
}

function pilihOpsi(hurufJawaban, elemen) {
    console.log(`Fungsi pilihOpsi() dipanggil dengan jawaban: ${hurufJawaban}`);
    if (jawabanSudahDipilih) return;
    jawabanSudahDipilih = true;
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
        console.log('Jawaban BENAR!');
        elemen.classList.add('correct');
        skor++;
        console.log(`Skor bertambah menjadi: ${skor}`);
        pesanUmpanBalik.innerHTML = `${pertanyaanSaatIni.penjelasan}`;
        pesanUmpanBalik.className = 'feedback-message correct';
    } else {
        console.log(`Jawaban SALAH! Jawaban benar: ${pertanyaanSaatIni.jawaban}`);
        elemen.classList.add('incorrect');
        pesanUmpanBalik.innerHTML = `${pertanyaanSaatIni.penjelasan}`;
        pesanUmpanBalik.className = 'feedback-message incorrect';
        const semuaPilihan = document.querySelectorAll('.option');
        semuaPilihan.forEach(opsi => {
            if (opsi.textContent.charAt(0) === pertanyaanSaatIni.jawaban) {
                opsi.classList.add('correct');
            }
        });
    }
    pesanUmpanBalik.classList.remove('hidden');
    document.getElementById('next-btn').disabled = false;
    console.log('Feedback ditampilkan, tombol Next diaktifkan');
}

function pertanyaanSelanjutnya() {
    console.log(`Fungsi pertanyaanSelanjutnya() dipanggil - Indeks saat ini: ${indeksPertanyaanSaatIni}`);
    indeksPertanyaanSaatIni++;
    if (indeksPertanyaanSaatIni < daftarPertanyaan.length) {
        console.log(`Masih ada pertanyaan, pindah ke pertanyaan ke-${indeksPertanyaanSaatIni + 1}`);
        tampilkanPertanyaan();
    } else {
        console.log('Semua pertanyaan selesai, menampilkan hasil');
        tampilkanHasil();
    }
}

function tampilkanHasil() {
    console.log(`Fungsi tampilkanHasil() dipanggil - Skor akhir: ${skor}/${daftarPertanyaan.length}`);
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('results-screen').classList.remove('hidden');
    document.getElementById('final-score').textContent = `${skor}/${daftarPertanyaan.length}`;
    console.log('Skor akhir ditampilkan');
    const teksHasil = document.getElementById('result-message');
    if (skor === daftarPertanyaan.length) {
        console.log('Skor sempurna!');
        teksHasil.innerHTML = `Gokil abis, ${namaPengguna}! 🎉<br>Semua pertanyaan kamu libas habis! Auto GG nih! ✨`;
    } else if (skor >= 8) {
        console.log('Skor sangat baik');
        teksHasil.innerHTML = `Keren, ${namaPengguna}! 🔥<br>Kamu bener ${skor} dari ${daftarPertanyaan.length} pertanyaan. Dikit lagi sempurna, gaspol! ✨`;
    } else if (skor >= 5) {
        console.log('Skor lumayan');
        teksHasil.innerHTML = `Lumayan juga, ${namaPengguna}! 👍<br>Kamu bener ${skor} dari ${daftarPertanyaan.length} pertanyaan. Keep it up! 📚`;
    } else if (skor > 0) {
        console.log('Skor rendah tapi masih ada yang benar');
        teksHasil.innerHTML = `Semangat terus, ${namaPengguna}! 😉<br>Kamu bener ${skor} dari ${daftarPertanyaan.length} pertanyaan.<br>Jangan nyerah, tiap usaha kecil itu progress, kok. Pasti bisa next time! 🚀`;
    } else {
        console.log('Skor 0');
        teksHasil.innerHTML = `Aduh, ${namaPengguna}! 😅<br>Semua jawabanmu belum on point nih. Gapapa, tetep belajar dan coba lagi!💡`;
    }
    console.log('Pesan hasil ditampilkan');
}

function ulangKuis() {
    console.log('Fungsi ulangKuis() dipanggil');
    indeksPertanyaanSaatIni = 0;
    skor = 0;
    jawabanTerpilih = '';
    console.log('Variabel kuis direset');
    document.getElementById('results-screen').classList.add('hidden');
    document.getElementById('topic-selection').classList.remove('hidden');
    console.log('Tampilan berganti ke layar pemilihan topik');
}

function konfirmasiKeluarKuis() {
    console.log('Fungsi konfirmasiKeluarKuis() dipanggil');
    if (confirm('Apakah Anda yakin ingin meninggalkan kuis?')) {
        console.log('User mengkonfirmasi keluar dari kuis');
        keluarKuis(false);
    } else {
        console.log('User membatalkan keluar dari kuis');
    }
}

function keluarKuis(dariLayarHasil) {
    console.log(`Fungsi keluarKuis() dipanggil - dariLayarHasil: ${dariLayarHasil}`);
    indeksPertanyaanSaatIni = 0;
    skor = 0;
    jawabanTerpilih = '';
    namaPengguna = '';
    console.log('Semua variabel direset');
    if (dariLayarHasil) {
        console.log('Keluar dari layar hasil');
        document.getElementById('results-screen').classList.add('hidden');
    } else {
        console.log('Keluar dari layar kuis');
        document.getElementById('quiz-screen').classList.add('hidden');
    }
    document.getElementById('welcome-screen').classList.remove('hidden');
    document.getElementById('user-name').value = '';
    console.log('Kembali ke layar selamat datang');
}

function acakArray(array) {
    console.log('Fungsi acakArray() dipanggil untuk mengacak pertanyaan');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    console.log('Array berhasil diacak');
    return array;
}

document.getElementById('user-name').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        console.log('Tombol Enter ditekan pada input nama');
        mulaiKuis();
    }
});
