import { ModulInputData } from '../types';

export interface QuestionMCQ {
  nomor: number;
  stimulus: string;
  pertanyaan: string;
  opsi: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  kunci: 'A' | 'B' | 'C' | 'D' | string;
  pembahasan: string;
  poin: number;
}

export interface QuestionMatching {
  nomor: number;
  premis: string;
  jawaban: string;
}

export interface QuestionShortAnswer {
  nomor: number;
  pertanyaan: string;
  kunciJawaban: string;
}

export interface QuestionEssay {
  nomor: number;
  kasus: string;
  pertanyaan: string;
  rubrik: string;
  poin: number;
}

export interface LkpdPackage {
  judul: string;
  materi: string;
  faseKelas: string;
  elemen: string;
  modelPembelajaran: string;
  aktivitasMindful: {
    judul: string;
    instruksi: string;
    pertanyaan: string[];
  };
  aktivitasMeaningful: {
    judul: string;
    kasus: string;
    tantangan: string[];
  };
  aktivitasJoyful: {
    judul: string;
    proyek: string;
    langkah: string[];
  };
  soalPilihanGanda: QuestionMCQ[];
  soalMenjodohkan: QuestionMatching[];
  soalIsianSingkat: QuestionShortAnswer[];
  soalEssai: QuestionEssay[];
  markdownFull: string;
}

/**
 * Format untuk langsung ditempelkan ke Google Form
 */
export function formatForGoogleForms(pkg: LkpdPackage): string {
  let output = `=======================================================
FORMULIR EVALUASI LKPD PAI & BUDI PEKERTI
Judul Formulir: LKPD PAI - ${pkg.materi}
Deskripsi Formulir: Lembar Kerja Peserta Didik PAI & Budi Pekerti (${pkg.faseKelas}) berbasis Deep Learning dan Karakter Kasih Sayang Rahmatan lil 'Alamin. Kerjakan dengan jujur, mandiri, dan teliti!
=======================================================\n\n`;

  output += `BAGIAN 1: IDENTITAS PESERTA DIDIK
1. Nama Lengkap Siswa (Jawaban Singkat - Wajib Diisi)
2. Nomor Absen / Kelas (Jawaban Singkat - Wajib Diisi)
3. Kelompok Belajar (Jawaban Singkat - Opsional)\n\n`;

  output += `-------------------------------------------------------\n`;
  output += `BAGIAN 2: SOAL PILIHAN GANDA (PILIH JAWABAN PALING TEPAT)\n`;
  output += `-------------------------------------------------------\n\n`;

  pkg.soalPilihanGanda.forEach((q, idx) => {
    output += `[SOAL ${idx + 1} - PILIHAN GANDA] (Skor: ${q.poin || 10} Poin)\n`;
    if (q.stimulus && q.stimulus.length > 5 && q.stimulus !== q.pertanyaan) {
      output += `Stimulus / Cerita: "${q.stimulus}"\n`;
    }
    output += `Pertanyaan: ${q.pertanyaan || q.stimulus}\n`;
    output += `A. ${q.opsi.A}\n`;
    output += `B. ${q.opsi.B}\n`;
    output += `C. ${q.opsi.C}\n`;
    output += `D. ${q.opsi.D}\n`;
    output += `>> Kunci Jawaban Google Form: ${q.kunci}\n`;
    output += `>> Umpan Balik / Pembahasan: ${q.pembahasan}\n\n`;
  });

  if (pkg.soalMenjodohkan && pkg.soalMenjodohkan.length > 0) {
    output += `-------------------------------------------------------\n`;
    output += `BAGIAN 3: ASESMEN MENJODOHKAN (KISI PILIHAN GANDA)\n`;
    output += `Jenis Pertanyaan di Google Form: "Kisi Pilihan Ganda" (Multiple Choice Grid)\n`;
    output += `Petunjuk: Pasangkan pernyataan di Baris dengan konsep yang tepat di Kolom.\n`;
    output += `-------------------------------------------------------\n\n`;

    output += `[DAFTAR BARIS / PERNYATAAN]:\n`;
    pkg.soalMenjodohkan.forEach((m, idx) => {
      output += `Baris ${idx + 1}: ${m.premis}\n`;
    });

    output += `\n[DAFTAR KOLOM / PILIHAN JAWABAN]:\n`;
    pkg.soalMenjodohkan.forEach((m, idx) => {
      output += `Kolom ${String.fromCharCode(65 + idx)}: ${m.jawaban}\n`;
    });

    output += `\n>> Kunci Jawaban Pasangan:\n`;
    pkg.soalMenjodohkan.forEach((m, idx) => {
      output += `Baris ${idx + 1} ("${m.premis}") => Kolom ${String.fromCharCode(65 + idx)} ("${m.jawaban}")\n`;
    });
    output += `\n`;
  }

  if (pkg.soalIsianSingkat && pkg.soalIsianSingkat.length > 0) {
    output += `-------------------------------------------------------\n`;
    output += `BAGIAN 4: ISIAN SINGKAT / BENAR-SALAH (JAWABAN SINGKAT)\n`;
    output += `Jenis Pertanyaan di Google Form: "Jawaban Singkat"\n`;
    output += `-------------------------------------------------------\n\n`;

    pkg.soalIsianSingkat.forEach((s, idx) => {
      output += `[SOAL ${idx + 1} - ISIAN SINGKAT]\n`;
      output += `Pertanyaan: ${s.pertanyaan}\n`;
      output += `>> Kunci Jawaban Diterima: ${s.kunciJawaban}\n\n`;
    });
  }

  if (pkg.soalEssai && pkg.soalEssai.length > 0) {
    output += `-------------------------------------------------------\n`;
    output += `BAGIAN 5: SOAL URAIAN & REFLEKSI MORAL (PARAGRAF)\n`;
    output += `Jenis Pertanyaan di Google Form: "Paragraf" (Long Answer)\n`;
    output += `-------------------------------------------------------\n\n`;

    pkg.soalEssai.forEach((e, idx) => {
      output += `[SOAL ESSAI ${idx + 1}] (Skor: ${e.poin || 20} Poin)\n`;
      output += `Kasus: "${e.kasus}"\n`;
      output += `Pertanyaan: ${e.pertanyaan}\n`;
      output += `>> Rubrik Penilaian Guru: ${e.rubrik}\n\n`;
    });
  }

  return output;
}

/**
 * Format teks yang siap disalin untuk Quizizz / Wordwall / Kahoot
 */
export function formatForQuizizzText(pkg: LkpdPackage): string {
  let text = `QUIZIZZ & KAHOOT IMPORT TEMPLATE\n`;
  text += `Topik: ${pkg.materi} | Jenjang: ${pkg.faseKelas}\n`;
  text += `Total Soal: ${pkg.soalPilihanGanda.length} Butir Pilihan Ganda\n`;
  text += `=======================================================\n\n`;

  pkg.soalPilihanGanda.forEach((q, idx) => {
    const correctIndex = q.kunci === 'A' ? '1' : q.kunci === 'B' ? '2' : q.kunci === 'C' ? '3' : '4';
    text += `Soal #${idx + 1}\n`;
    text += `Pertanyaan: ${q.stimulus ? q.stimulus + ' ' : ''}${q.pertanyaan}\n`;
    text += `Opsi 1: ${q.opsi.A}\n`;
    text += `Opsi 2: ${q.opsi.B}\n`;
    text += `Opsi 3: ${q.opsi.C}\n`;
    text += `Opsi 4: ${q.opsi.D}\n`;
    text += `Jawaban Benar: Opsi ${correctIndex} (${q.kunci})\n`;
    text += `Waktu: 45 Detik\n`;
    text += `Penjelasan: ${q.pembahasan}\n`;
    text += `-------------------------------------------------------\n`;
  });

  return text;
}

/**
 * Generate string CSV standar yang kompatibel dengan fitur "Import from Spreadsheet" Quizizz
 */
export function generateQuizizzCSV(pkg: LkpdPackage): string {
  // Format Header Standar Quizizz:
  // Question Text,Question Type,Option 1,Option 2,Option 3,Option 4,Correct Answer,Time in seconds,Image Link
  const headers = ['Question Text', 'Question Type', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer', 'Time in seconds', 'Image Link'];
  
  const escapeCsv = (str: string) => {
    if (!str) return '""';
    const escaped = str.replace(/"/g, '""').replace(/\n/g, ' ');
    return `"${escaped}"`;
  };

  const rows = pkg.soalPilihanGanda.map((q) => {
    const questionText = (q.stimulus ? q.stimulus + ' ' : '') + (q.pertanyaan || '');
    let correctNum = 1;
    if (q.kunci === 'B' || q.kunci === '2') correctNum = 2;
    else if (q.kunci === 'C' || q.kunci === '3') correctNum = 3;
    else if (q.kunci === 'D' || q.kunci === '4') correctNum = 4;

    return [
      escapeCsv(questionText),
      '"Multiple Choice"',
      escapeCsv(q.opsi.A),
      escapeCsv(q.opsi.B),
      escapeCsv(q.opsi.C),
      escapeCsv(q.opsi.D),
      `"${correctNum}"`,
      '"45"',
      '""'
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

/**
 * Trigger pengunduhan file CSV Quizizz langsung di browser
 */
export function downloadQuizizzCSVFile(pkg: LkpdPackage, filename?: string) {
  const csvContent = generateQuizizzCSV(pkg);
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const cleanName = (pkg.materi || 'PAI').replace(/[^a-zA-Z0-9_-]/g, '_');
  link.setAttribute('href', url);
  link.setAttribute('download', filename || `Quizizz_PAI_${cleanName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Default generator lokal jika backend offline atau fallback
 */
export function buildClientLkpdPackage(inputData: Partial<ModulInputData>): LkpdPackage {
  const materi = inputData.materi || 'Kasih Sayang dan Akhlak Mulia';
  const faseKelas = inputData.faseKelas || 'Fase B (SD Kelas 3-4)';
  const elemen = inputData.elemen || 'Akhlak';
  const model = inputData.metodePembelajaran || 'Problem Based Learning (PBL)';

  const soalPilihanGanda: QuestionMCQ[] = [
    {
      nomor: 1,
      stimulus: `Ahmad melihat temannya terjatuh saat bermain di halaman sekolah dan buku pelajarannya berserakan.`,
      pertanyaan: `Sikap terbaik yang mencerminkan pemahaman mendalam tentang nilai ${materi} adalah...`,
      opsi: {
        A: 'Segera menolong teman berdiri dan membantu merapikan bukunya dengan ikhlas.',
        B: 'Menertawakan teman karena kurang hati-hati saat berlari di koridor.',
        C: 'Membiarkannya saja karena menganggap itu urusan pribadi masing-masing.',
        D: 'Merekam kejadian dengan ponsel untuk dibagikan kepada teman sekelas.'
      },
      kunci: 'A',
      pembahasan: 'Ajaran Islam menekankan sikap peduli, empati, dan segera menolong sesama yang sedang mengalami kesulitan tanpa pamrih.',
      poin: 10
    },
    {
      nomor: 2,
      stimulus: `Allah Swt. memerintahkan hamba-Nya untuk senantiasa bertutur kata yang santun dan menjauhi perkataan yang menyakiti hati.`,
      pertanyaan: `Contoh penerapan akhlak mulia dalam percakapan sehari-hari di kelas adalah...`,
      opsi: {
        A: 'Memanggil teman dengan panggilan julukan yang mempermalukan fisiknya.',
        B: 'Mengucapkan salam, terima kasih, dan meminta tolong secara sopan.',
        C: 'Menyela pembicaraan guru saat sedang menjelaskan materi pelajaran.',
        D: 'Berbicara dengan nada tinggi dan membentak teman yang berbeda pendapat.'
      },
      kunci: 'B',
      pembahasan: 'Perkataan yang santun dan adab lisan (mengucapkan salam, terima kasih, maaf, dan tolong) merupakan cermin iman dan kasih sayang.',
      poin: 10
    },
    {
      nomor: 3,
      stimulus: `Dalam sebuah kelompok belajar PAI, Wildan merasa pendapatnya paling benar dan menolak mendengar masukan dari anggota kelompok lain.`,
      pertanyaan: `Sikap Wildan tersebut bertentangan dengan prinsip pembelajaran Deep Learning dan ajaran Islam karena...`,
      opsi: {
        A: 'Mencerminkan sikap egois (ananiyah) dan merusak kerukunan musyawarah.',
        B: 'Membuat kelompok belajar menjadi lebih cepat selesai mengerjakan tugas.',
        C: 'Menunjukkan keberanian memimpin tanpa perlu mendengarkan orang lain.',
        D: 'Membuat guru merasa bangga karena Wildan sangat percaya diri.'
      },
      kunci: 'A',
      pembahasan: 'Musyawarah dalam Islam mengajarkan sikap rendah hati (tawadhu), saling menghargai gagasan, dan menjauhi kesombongan.',
      poin: 10
    },
    {
      nomor: 4,
      stimulus: `Rasulullah Saw. diutus ke muka bumi semata-mata untuk menyempurnakan akhlak yang mulia dan menjadi rahmat bagi semesta alam (*Rahmatan lil 'Alamin*).`,
      pertanyaan: `Perilaku berikut yang TIDAK mencerminkan prinsip Rahmatan lil 'Alamin di lingkungan sekolah adalah...`,
      opsi: {
        A: 'Menyiram tanaman di taman sekolah dan tidak merusak dedaunannya.',
        B: 'Menyayangi kucing liar yang kelaparan di sekitar kantin sekolah.',
        C: 'Membuang sampah plastik sembarangan ke dalam selokan sekolah.',
        D: 'Mengajak teman yang sedang menyendiri untuk bermain bersama.'
      },
      kunci: 'C',
      pembahasan: 'Merawat kelestarian alam dan kebersihan lingkungan adalah bagian mutlak dari rahmat Islam bagi seluruh alam.',
      poin: 10
    },
    {
      nomor: 5,
      stimulus: `Ketika ada teman yang tidak sengaja menumpahkan air minum ke atas meja belajarmu.`,
      pertanyaan: `Langkah akhlak terpuji yang sebaiknya kamu lakukan berdasarkan nilai pemaaf dalam ${materi} adalah...`,
      opsi: {
        A: 'Memaafkan dengan lapang dada dan bersama-sama membersihkan meja.',
        B: 'Membalas menumpahkan air ke mejanya agar merasa impas.',
        C: 'Memarahi teman di depan seluruh siswa agar dia merasa jera.',
        D: 'Menyimpan rasa dendam dan tidak mau mengajaknya berbicara lagi.'
      },
      kunci: 'A',
      pembahasan: 'Sifat pemaaf (al-Afwu) adalah ciri orang bertakwa yang dicintai Allah Swt. dan menjaga tali persaudaraan.',
      poin: 10
    },
    {
      nomor: 6,
      stimulus: `Perhatikan kutipan hadis: "Sebaik-baik manusia adalah yang paling bermanfaat bagi sesama manusia."`,
      pertanyaan: `Tindakan nyata seorang murid SD yang paling mencerminkan pengamalan hadis tersebut adalah...`,
      opsi: {
        A: 'Membagikan bekal makanan atau meminjamkan alat tulis kepada teman yang membutuhkan.',
        B: 'Membeli makanan mahal di kantin lalu memamerkannya di depan kawan.',
        C: 'Menyimpan ilmu pengetahuan sendiri agar selalu mendapat nilai tertinggi di kelas.',
        D: 'Hanya mau berteman dengan siswa yang kaya dan populer saja.'
      },
      kunci: 'A',
      pembahasan: 'Memberikan manfaat nyata, berbagi kebaikan, dan tolong-menolong adalah wujud ibadah sosial yang sangat mulia.',
      poin: 10
    },
    {
      nomor: 7,
      stimulus: `Di media sosial atau grup chat kelas, ada seseorang yang menyebarkan berita bohong (hoaks) tentang salah satu temanmu.`,
      pertanyaan: `Sikap bernalar kritis (*Tabayyun*) yang diajarkan dalam materi PAI adalah...`,
      opsi: {
        A: 'Meneliti kebenaran berita terlebih dahulu dan tidak ikut menyebarkannya.',
        B: 'Langsung menyebarkan pesan ke grup lain agar cepat viral.',
        C: 'Ikut mengejek dan menulis komentar negatif tentang teman tersebut.',
        D: 'Membuat cerita tambahan agar berita terasa semakin heboh.'
      },
      kunci: 'A',
      pembahasan: 'Konsep Tabayyun (klarifikasi dan verifikasi) dalam QS. Al-Hujurat ayat 6 wajib diterapkan untuk mencegah fitnah.',
      poin: 10
    },
    {
      nomor: 8,
      stimulus: `Setiap pagi sebelum pelajaran dimulai, kelas 4 selalu mengadakan pembiasaan berdoa bersama dengan khusyuk.`,
      pertanyaan: `Manfaat utama dari pembiasaan berdoa sebelum belajar (Mindful Learning) adalah...`,
      opsi: {
        A: 'Menghadirkan ketenangan jiwa dan memohon keberkahan ilmu kepada Allah Swt.',
        B: 'Sekadar formalitas agar tidak dimarahi oleh guru piket.',
        C: 'Menghabiskan waktu jam pelajaran pertama agar cepat istirahat.',
        D: 'Membuat siswa merasa mengantuk di awal pembelajaran.'
      },
      kunci: 'A',
      pembahasan: 'Doa membuka pintu taufik, menghadirkan kesadaran penuh (mindfulness), dan menanamkan tauhid dalam belajar.',
      poin: 10
    },
    {
      nomor: 9,
      stimulus: `Siti selalu merapikan tempat tidur dan membantu mencuci piring setelah makan tanpa disuruh oleh ibunya.`,
      pertanyaan: `Perilaku Siti merupakan contoh pengamalan dari nilai...`,
      opsi: {
        A: 'Berbakti kepada orang tua (*Birrul Walidain*) dan kemandirian.',
        B: 'Pamer kekayaan dan mencari pujian dari tetangga sekitar.',
        C: 'Keterpaksaan karena takut dihukum oleh orang tua.',
        D: 'Menghindari tugas belajar dan PR dari sekolah.'
      },
      kunci: 'A',
      pembahasan: 'Birrul Walidain diwujudkan melalui ketaatan sukarela, meringankan beban orang tua, dan bersikap santun.',
      poin: 10
    },
    {
      nomor: 10,
      stimulus: `Keragaman suku, bangsa, dan bahasa di Indonesia adalah tanda-tanda kebesaran Allah Swt. yang harus disyukuri.`,
      pertanyaan: `Sikap toleransi (*Tasamuh*) yang tepat di lingkungan sekolah yang majemuk adalah...`,
      opsi: {
        A: 'Menghormati teman yang berbeda suku dan tetap bekerja sama dengan rukun.',
        B: 'Hanya mau berkelompok dengan teman yang satu suku saja.',
        C: 'Mengejek dialek atau logat bicara teman yang berasal dari daerah lain.',
        D: 'Memaksa teman mengikuti adat istiadat pribadi kita.'
      },
      kunci: 'A',
      pembahasan: 'Allah Swt. menciptakan manusia bersuku-suku agar saling mengenal (*Li-Ta\'arafu*) dan saling memuliakan.',
      poin: 10
    }
  ];

  const soalMenjodohkan: QuestionMatching[] = [
    { nomor: 1, premis: 'Sikap mengendalikan lisan dari perkataan dusta, ejekan, dan adu domba', jawaban: 'Adab Berbicara Santun (Hifzhul Lisan)' },
    { nomor: 2, premis: 'Menghargai perbedaan suku dan pendapat kawan saat musyawarah kelompok', jawaban: 'Tasamuh (Toleransi & Kelapangan Hati)' },
    { nomor: 3, premis: 'Memeriksa kebenaran informasi sebelum memercayai atau membagikannya', jawaban: 'Tabayyun (Klarifikasi & Nalar Kritis)' },
    { nomor: 4, premis: 'Membantu teman yang terjatuh dan membagikan kebaikan tanpa pamrih', jawaban: 'Ta\'awun & Kasih Sayang (Rahmatan lil \'Alamin)' },
    { nomor: 5, premis: 'Berbakti, patuh, dan menyenangkan hati kedua orang tua di rumah', jawaban: 'Birrul Walidain' }
  ];

  const soalIsianSingkat: QuestionShortAnswer[] = [
    { nomor: 1, pertanyaan: 'Membaca Al-Qur\'an secara perlahan, tenang, dan sesuai dengan hukum tajwid disebut membaca secara...', kunciJawaban: 'Tartil' },
    { nomor: 2, pertanyaan: 'Nabi Muhammad Saw. diutus oleh Allah Swt. ke muka bumi sebagai rahmat bagi semesta alam yang dalam bahasa Arab disebut...', kunciJawaban: 'Rahmatan lil \'Alamin' },
    { nomor: 3, pertanyaan: 'Sikap menolong orang lain yang sedang tertimpa kesulitan dengan hati yang bersih dari rasa pamrih disebut sikap...', kunciJawaban: 'Ikhlas' },
    { nomor: 4, pertanyaan: 'Ketika mendengar teman mengajak melakukan perundungan (bullying), sikap seorang murid muslim sejati adalah tegas untuk...', kunciJawaban: 'Menolak dan Mencegahnya' },
    { nomor: 5, pertanyaan: 'Sebelum memulai belajar atau mengerjakan tugas kelompok di kelas, kita dianjurkan melafalkan kalimat...', kunciJawaban: 'Basmalah / Bismillah' }
  ];

  const soalEssai: QuestionEssay[] = [
    {
      nomor: 1,
      kasus: 'Di kelas 4, seorang murid baru pindahan dari daerah lain sering terlihat diam dan menyendiri di pojok kelas saat jam istirahat karena merasa malu dan belum memiliki kawan.',
      pertanyaan: 'Rancanglah 3 langkah nyata berlandaskan nilai kasih sayang dan kepedulian yang akan kelompokmu lakukan untuk menyambut dan merangkul murid baru tersebut!',
      rubrik: 'Skor Maksimal (20): Menjelaskan 3 langkah operasional (menyapa ramah, mengajak duduk makan bekal bersama, mengajak bergabung dalam permainan kelompok tanpa membedakan).',
      poin: 20
    },
    {
      nomor: 2,
      kasus: 'Faris mendapati teman sebangkunya berniat menyontek saat penilaian harian PAI dengan alasan takut nilainya jelek di hadapan orang tuanya.',
      pertanyaan: 'Bagaimana cara Faris mengingatkan temannya dengan cara yang santun, bijak, dan tidak mempermalukan kawan, sekaligus menanamkan rasa takut kepada Allah Swt. yang Maha Melihat (*Al-Bashir*)?',
      rubrik: 'Skor Maksimal (20): Jawaban memuat etika menasihati secara privat/rahasia, menekankan sifat kejujuran, dan menawarkan bantuan belajar bersama sepulang sekolah.',
      poin: 20
    }
  ];

  const markdownFull = `# LEMBAR KERJA PESERTA DIDIK (LKPD) PAI & BUDI PEKERTI
## TOPIK: ${materi.toUpperCase()}
**Jenjang / Fase:** ${faseKelas} | **Elemen:** ${elemen} | **Model:** ${model}

---

### IDENTITAS PESERTA DIDIK
- **Nama Anggota Kelompok:**  
  1. ..................................................... (Ketua)  
  2. ..................................................... (Juru Catat)  
  3. ..................................................... (Anggota)  
  4. ..................................................... (Anggota)
- **Kelas / Semester:** ${faseKelas} / Ganjil
- **Hari, Tanggal:** .....................................................

---

### PETUNJUK PENGERJAAN BERBASIS KASIH SAYANG:
1. Awali kegiatan dengan membaca basmalah dan doa bersama anggota kelompokmu.
2. Setiap anggota kelompok berhak menyampaikan pendapat dan wajib mendengarkan kawan secara santun.
3. Kerjakan seluruh aktivitas dan bank soal secara gotong royong dan penuh kejujuran!

---

## 🌟 AKTIVITAS 1: MINDFUL TADABBUR (PERENUNGAN HATI NURANI)
Duduklah dengan rileks, pejamkan mata sejenak, dan renungkanlah:
> *"Allah Swt. telah menganugerahkan akal pikiran, hati nurani, dan lisan yang mulia kepada kita untuk saling menyayangi, bukan untuk menyakiti sesama."*

**Pertanyaan Refleksi:**
1. Apa kebaikan terbesar yang pernah kamu terima dari orang lain minggu ini?  
   *Jawaban:* ............................................................................................................
2. Perasaan apa yang timbul di dalam hatimu saat kamu berhasil menolong teman tanpa pamrih?  
   *Jawaban:* ............................................................................................................

---

## 🔍 AKTIVITAS 2: MEANINGFUL INQUIRY (STUDI KASUS & INVESTIGASI)
**Kasus Kontekstual:**
Di serambi sekolah, terdapat sekelompok anak yang sedang menertawakan kawan yang salah melafalkan bacaan ayat. Guru yang melihat hal tersebut menghampiri dan membimbing mereka dengan senyum penuh kasih sayang.

**Tantangan Analisis:**
1. Mengapa menertawakan kesalahan kawan merupakan perbuatan yang dilarang dalam Islam?
2. Bagaimana cara terbaik membetulkan kesalahan teman agar hatinya tidak tersinggung?

---

## 📋 BAGIAN I: SOAL PILIHAN GANDA PENALARAN HOTS (10 SOAL)
Pilihlah salah satu jawaban yang paling tepat (A, B, C, atau D):

${soalPilihanGanda.map(q => `
**${q.nomor}. ${q.stimulus}**  
${q.pertanyaan}  
A. ${q.opsi.A}  
B. ${q.opsi.B}  
C. ${q.opsi.C}  
D. ${q.opsi.D}
`).join('')}

---

## 🧩 BAGIAN II: ASESMEN MENJODOHKAN (5 PASANG PREMIS)
Pasangkanlah pernyataan di **Kolom A** dengan konsep yang tepat di **Kolom B**:

| No | Kolom A (Pernyataan / Perilaku) | Pilihan | Kolom B (Konsep / Nilai PAI) |
|:--:|:---|:---:|:---|
${soalMenjodohkan.map((m, idx) => `| ${idx + 1} | ${m.premis} | [ ... ] | **${String.fromCharCode(65 + idx)}**. ${m.jawaban} |`).join('\n')}

---

## ✍️ BAGIAN III: SOAL ISIAN SINGKAT (5 BUTIR)
Jawablah dengan tepat dan ringkas:
${soalIsianSingkat.map(s => `${s.nomor}. ${s.pertanyaan}  
   *Jawaban:* ............................................................................................................`).join('\n\n')}

---

## 📝 BAGIAN IV: SOAL ESSAI STUDI KASUS & REFLEKSI (2 SOAL)
Jawablah dengan penalaran yang mendalam dan solutif:

${soalEssai.map(e => `
**Soal ${e.nomor}:**  
*Kasus:* "${e.kasus}"  
*Pertanyaan:* ${e.pertanyaan}  
*Lembar Jawaban Siswa:*  
..........................................................................................................................................  
..........................................................................................................................................
`).join('\n')}

---

## 🔑 KUNCI JAWABAN & RUBRIK SKORING GURU
### Kunci Pilihan Ganda:
${soalPilihanGanda.map(q => `${q.nomor}. **${q.kunci}** (Pembahasan: ${q.pembahasan})`).join('\n')}

### Kunci Menjodohkan:
${soalMenjodohkan.map((m, idx) => `${idx + 1} => **${String.fromCharCode(65 + idx)}** (${m.jawaban})`).join('\n')}

### Kunci Isian Singkat:
${soalIsianSingkat.map(s => `${s.nomor}. **${s.kunciJawaban}**`).join('\n')}
`;

  return {
    judul: `LKPD PAI & Budi Pekerti - ${materi}`,
    materi,
    faseKelas,
    elemen,
    modelPembelajaran: model,
    aktivitasMindful: {
      judul: 'Mindful Tadabbur & Perenungan Hati',
      instruksi: 'Duduk tenang, tadabburi karunia lisan dan akal budi dari Allah Swt.',
      pertanyaan: [
        'Apa kebaikan terbesar yang kamu rasakan minggu ini?',
        'Bagaimana perasaanmu ketika berhasil menolong teman tanpa pamrih?'
      ]
    },
    aktivitasMeaningful: {
      judul: 'Meaningful Problem Solving',
      kasus: 'Mengatasi perbedaan pendapat dan perundungan di lingkungan sekolah dengan adab santun.',
      tantangan: [
        'Mengapa mengejek kawan bertentangan dengan Al-Qur\'an?',
        'Bagaimana merumuskan kesepakatan damai di kelas?'
      ]
    },
    aktivitasJoyful: {
      judul: 'Joyful Collaborative Action',
      proyek: 'Peta Konsep Kebaikan & Kartu Apresiasi Sahabat Shalih',
      langkah: [
        'Membuat poster mini berisi pesan cinta kasih.',
        'Menuliskan ucapan terima kasih kepada teman sebangku.'
      ]
    },
    soalPilihanGanda,
    soalMenjodohkan,
    soalIsianSingkat,
    soalEssai,
    markdownFull
  };
}
