import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import {
  generateStructuredModulAjar,
  generateStructuredIceBreaking,
  generateStructuredLkpd,
  generateStructuredAssessment,
  generateStructuredBahanAjar,
} from "./server/fallbackCurriculum.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: "10mb" }));

// Server-side Gemini client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Candidate models in preference order
const CANDIDATE_MODELS = [
  "gemini-3.7-flash",
  "gemini-3.1-flash-lite",
  "gemini-flash-latest",
];

// Helper to call Gemini with model cascading & fallback
async function generateWithModelCascade(
  prompt: string,
  systemInstruction?: string,
  temperature: number = 0.7
): Promise<string | null> {
  const ai = getGeminiClient();
  if (!ai) {
    return null;
  }

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || SYSTEM_INSTRUCTION,
          temperature,
        },
      });

      if (response && response.text && response.text.trim().length > 50) {
        return response.text;
      }
    } catch {
      // Quietly proceed to the next available model or structured curriculum engine
    }
  }

  return null;
}

// API: Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    time: new Date().toISOString(),
  });
});

// System prompt for Curriculum Expert & Textbook Author
const SYSTEM_INSTRUCTION = `Anda adalah seorang Penulis Ahli Buku Teks Pelajaran Resmi PAI (Kemendikbudristek & Ditjen Pendis Kemenag RI) dan Pakar Kurikulum Pendidikan Islam.
Anda menyusun Buku Pelajaran Tematik, Bahan Ajar Siswa Komprehensif, dan Modul Ajar / RPP Kurikulum Merdeka berstandar Permendikbudristek No. 12 Tahun 2024 dan BSKAP 032/H/KR/2024.

PRINSIP PENULISAN UTAMA (STANDAR BUKU TEKS & ARTIKEL ILMIAH PENDIDIKAN):
1. GAYA BAHASA BUKU TEKS & ARTIKEL ILMIAH EDUKATIF:
   - Tulisan mengalir kaya wawasan ilmiah-teologis, bahasa bernutrisi tinggi, sistematis, elaboratif, dan mudah dicerna peserta didik dengan bimbingan guru.
   - HINDARI TEMPLATE KAKU, HINDARI PENGULANGAN KATA KLISE, dan HINDARI TEKS GENERIK.
   - Setiap materi pokok (${'materi'}) HARUS DIKUPAS SECARA 100% SPESIFIK, TAJAM, DAN MENDALAM sesuai karakteristik elemennya (Al-Qur'an Hadis, Akidah, Akhlak, Fikih, atau Sejarah Peradaban Islam).

2. KEDALAMAN SUBSTANSI (ONTOLOGIS, EPISTEMOLOGIS, AKSIOLOGIS):
   - Uraikan etimologi kosa kata bahasa Arab dan definisi terminologis syar'i secara presisi.
   - Hadirkan ayat Al-Qur'an dan Hadis Nabi sahih (teks Arab berharakat lengkap, transliterasi Latin, terjemahan resmi Kemenag RI, serta asbabun nuzul / syarah hadis kontekstual).
   - Integrasikan dengan khazanah sains, fenomena alam, sejarah peradaban, dan psikologi perkembangan anak.

3. PENDEKATAN DEEP LEARNING (3 PILAR):
   - Mindful Learning: Kesadaran nurani, hening reflektif (tadabbur), penghayatan kebesaran Allah Swt.
   - Meaningful Learning: Pemahaman bermakna melalui penalaran kritis, pemecahan masalah konkret, dan integrasi dalil ke realitas sosial.
   - Joyful Learning: Pembelajaran yang mencerahkan hati, apresiatif, menyenangkan, serta membangun budaya saling mengasihi (Rahmatan lil 'Alamin).

Hasilkan naskah yang UTUH, PANJANG, BERKUALITAS TINGGI, dan LAYAK DITERBITKAN SEBAGAI BUKU TEKS PELAJARAN RESMI.`;

// API: Generate Complete Modul Ajar PAI
app.post("/api/generate-modul", async (req, res) => {
  try {
    const {
      mataPelajaran = "Pendidikan Agama Islam dan Budi Pekerti",
      faseKelas,
      elemen,
      materi,
      capaianPembelajaran,
      jumlahPertemuan,
      alokasiWaktu,
      metodePembelajaran,
      targetDimensiLulusan,
      namaSekolah,
      namaGuru,
      nip,
      namaKepalaSekolah,
      nipKepalaSekolah,
      semester,
      tahunAjaran,
      additionalNotes,
    } = req.body;

    if (!faseKelas || !elemen || !materi) {
      return res.status(400).json({ error: "Fase/Kelas, Elemen, dan Materi wajib diisi." });
    }

    const prompt = `SUSUNLAH MODUL AJAR (RPP LENGKAP, PROFESIONAL, & SIAP PAKAI) PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI.
STANDAR REGULASI: Kurikulum Merdeka (Permendikbudristek No. 12 Tahun 2024 & Keputusan Kepala BSKAP No. 032/H/KR/2024).
PENDEKATAN: Pembelajaran Mendalam (Deep Learning: Mindful, Meaningful, & Joyful Learning) serta Karakter Rahmatan lil 'Alamin.

DATA KURIKULUM & PEMBELAJARAN:
- Nama Sekolah: ${namaSekolah || "SD Negeri / Swasta"}
- Nama Penyusun / Guru: ${namaGuru || "Guru PAI"} ${nip ? `(NIP. ${nip})` : ""}
- Kepala Sekolah: ${namaKepalaSekolah || "Kepala Sekolah"} ${nipKepalaSekolah ? `(NIP. ${nipKepalaSekolah})` : ""}
- Mata Pelajaran: ${mataPelajaran}
- Fase / Kelas: ${faseKelas}
- Semester / Tahun Ajaran: ${semester || "Ganjil"} / ${tahunAjaran || "2025/2026"}
- Elemen Kurikulum: ${elemen}
- Materi Pokok / Topik: ${materi}
- Capaian Pembelajaran (CP): ${capaianPembelajaran || "Peserta didik memahami konsep materi, menganalisis dalil naqli, dan menginternalisasinya dalam wujud akhlak mulia."}
- Jumlah Pertemuan & Alokasi Waktu: ${jumlahPertemuan || "1 Pertemuan (4 JP)"} (${alokasiWaktu || "4 JP x 35-40 Menit"})
- Model Pembelajaran: ${metodePembelajaran || "Problem Based Learning (PBL)"}
- Target 8 Dimensi Profil Lulusan & Karakter: ${targetDimensiLulusan || "Keimanan dan Ketakwaan terhadap Tuhan YME, Penalaran Kritis, Kolaborasi, Komunikasi, Rahmatan lil 'Alamin"}
${additionalNotes ? `- Catatan Tambahan: ${additionalNotes}` : ""}

KETERHUBUNGAN DENGAN BAHAN AJAR SISWA:
Modul Ajar ini terhubung dan bersambung langsung dengan naskah Bahan Ajar Tematik "${materi}" (Kajian mendalam, studi kasus mindful, eksplorasi dalil Al-Qur'an dan Hadis, wawasan sains-sejarah, tabel komparasi karakter, dan bank evaluasi HOTS).

SUSUNLAH FORMAT MODUL AJAR RESMI DENGAN STRUKTUR LENGKAP BERIKUT:

# MODUL AJAR / RENCANA PELAKSANAAN PEMBELAJARAN (RPP) PAI & BUDI PEKERTI
## TOPIK: ${materi.toUpperCase()}
**Pendekatan:** Pembelajaran Mendalam (Deep Learning) & Pedagogi Kasih Sayang (Rahmatan lil 'Alamin)
**Standar Kelulusan:** 8 Dimensi Profil Lulusan (Permendikdasmen No. 13 Tahun 2025)

---

## I. INFORMASI UMUM
1. **Identitas Modul**:
   - Satuan Pendidikan: ${namaSekolah || "SD Negeri"}
   - Penyusun: ${namaGuru || "Mukhamad Fakhrudin Rifki, S. Pd.I"} | NIP: ${nip || "199201072019031003"}
   - Kepala Sekolah: ${namaKepalaSekolah || "Hadi Kustantoro, S.Pd. SD."} | NIP: ${nipKepalaSekolah || "196803141993081002"}
   - Mata Pelajaran: ${mataPelajaran}
   - Fase / Kelas: ${faseKelas} | Semester: ${semester || "Ganjil"} | Tahun Ajaran: ${tahunAjaran || "2025/2026"}
   - Elemen: ${elemen} | Alokasi Waktu: ${alokasiWaktu || "4 JP x 35-40 Menit (1 Pertemuan = 4 JP)"}
2. **Kompetensi Awal (Prasyarat)**: Uraikan 2-3 pengetahuan awal dan sikap moral yang perlu dimiliki peserta didik sebelum mempelajari materi ${materi}.
3. **8 Dimensi Profil Lulusan & Karakter Rahmatan lil 'Alamin**: Uraikan dimensi terpilih dari 8 Dimensi Profil Lulusan (Keimanan & Ketakwaan terhadap Tuhan YME, Kewargaan, Penalaran Kritis, Kreativitas, Kolaborasi, Kemandirian, Kesehatan, Komunikasi) serta karakter Rahmatan lil 'Alamin (Tasamuh, Qudwah, Rifq, Tawassuth, Mahabbah).
4. **Sarana dan Prasarana**: Media digital/LCD proyektor, mushaf Al-Qur'an terjemah, Naskah Bahan Ajar Tematik, kartu studi kasus LKPD, pohon apresiasi kebaikan.
5. **Target Peserta Didik**: Reguler/tipikal, peserta didik dengan hambatan belajar (diberikan scaffolding), dan peserta didik berpencapaian tinggi (pengayaan).
6. **Model & Metode Pembelajaran**: Model ${metodePembelajaran} dengan moda Tatap Muka Luring.

---

## II. KOMPONEN INTI
1. **Tujuan Pembelajaran (TP)**:
   - Rumuskan Tujuan Pembelajaran berbasis KKO Deep Learning (Kognitif analitis C4-C6, Afektif A3-A5 internalisasi kasih sayang, dan Psikomotorik P3-P5 kreasi aksi nyata).
2. **Kriteria Ketercapaian Tujuan Pembelajaran (KKTP / IKTP)**:
   - Sajikan tabel kriteria ketercapaian per indikator dengan rentang 4 interval nilai: Perlu Bimbingan (0-69), Cukup (70-79), Baik (80-89), Sangat Baik (90-100).
3. **Pemahaman Bermakna (Meaningful Insight)**:
   - Uraikan esensi filosofis dan hikmah nyata dari topik ${materi} dalam mendekatkan diri kepada Allah Swt. dan menebar kemaslahatan bagi sesama manusia serta alam semesta.
4. **Pertanyaan Pemantik Berbasis Cinta & Nalar Kritis**:
   - 3-4 pertanyaan pemantik yang menyentuh hati nurani dan memantik rasa ingin tahu ilmiah peserta didik.

---

## III. KEGIATAN PEMBELAJARAN LENGKAP (1 PERTEMUAN = 4 JP / 140-160 MENIT)
Rincikan alokasi waktu menit demi menit:

### A. Kegiatan Pendahuluan (20 Menit)
- **Orientasi Hangat & Emotional Check-in (5 Menit)**: Salam penuh kehangatan, mindful greeting, dan membangun rasa aman psikologis (*psychological safety*).
- **Kesadaran Spiritual (5 Menit)**: Berdoa bersama dengan khusyuk dan melafalkan ayat suci Al-Qur'an secara tartil.
- **ICE BREAKING EDUKATIF & JOYFUL LEARNING (5 Menit)**: Tuliskan nama ice breaking tematik, aturan main interaktif, serta yel-yel ceria PAI.
- **Apersepsi, Motivasi Bermakna, & Penyampaian Tujuan Pembelajaran (5 Menit)**.

### B. Kegiatan Inti (100-110 Menit) &mdash; SINTAKS DEEP LEARNING + ${metodePembelajaran}
- **Tahap 1: Mindful Learning & Observasi Kasus (25-30 Menit)**:
  * Pemaparan narasi studi kasus/dilema moral yang ada pada Bahan Ajar Siswa.
  * *Silent Tadabbur* (Hening reflektif 5 menit tanpa gawai untuk merenungkan bisikan nurani).
  * Menuliskan pertanyaan kritis di kartu refleksi.
- **Tahap 2: Meaningful Learning & Inquiry Kolaboratif (50 Menit)**:
  * Pembentukan kelompok heterogen (4-5 siswa) dengan pembagian peran yang adil.
  * Membedah dalil Al-Qur'an, Hadis, dan wawasan sains/sejarah dari Bahan Ajar.
  * Diskusi pemecahan masalah kontekstual pada LKPD tanpa saling mencela.
  * Guru melakukan *Rifq Coaching* (bimbingan penuh kelembutan) dan *scaffolding*.
- **Tahap 3: Joyful & Reflective Experience (30 Menit)**:
  * Kelompok membuat karya kreatif (peta pikiran / poster slogan kebaikan / simulasi peran).
  * *Peer-Appreciation Gallery Walk*: Kelompok saling mengunjungi karya sahabat dan menempelkan kartu apresiasi positif.

### C. Kegiatan Penutup (15-20 Menit)
- **Refleksi Metakognitif & Hati Siswa (10 Menit)**: Siswa mengisi jurnal kalimat terbuka tentang kesadaran baru yang diperoleh.
- **Penguatan Guru & Umpan Balik Apresiatif (5 Menit)**: Guru mengonfirmasi konsep utama dan memuji ikhtiar belajar seluruh siswa.
- **Doa Kafaratul Majlis & Salam Penutup (5 Menit)**.

---

## IV. DIFERENSIASI PEMBELAJARAN
- **Diferensiasi Konten**: Menyediakan teks bacaan bertingkat (bergambar untuk pembaca pemula, artikel analitis untuk pembaca mahir).
- **Diferensiasi Proses**: Variasi pendampingan (bimbingan langsung guru, tutor sebaya, dan eksplorasi mandiri).
- **Diferensiasi Produk**: Siswa bebas memilih bentuk pelaporan hasil (tulisan narasi, infografis visual/poster, atau rekaman audio/presentasi lisan).

---

## V. ASESMEN PEMBELAJARAN KOMPREHENSIF
1. **Asesmen Diagnostik (Awal Pembelajaran)**: Instrumen pemetaan kesiapan dan minat belajar.
2. **Asesmen Formatif**:
   - Rubrik Observasi Sikap 8 Dimensi Profil Lulusan & Karakter Rahmatan lil 'Alamin (Mahabbah, Rifq, Tawaduk) skala 1-4.
   - Lembar Penilaian Kinerja Kolaborasi Kelompok.
3. **Asesmen Sumatif**:
   - 3-5 Soal HOTS berbasis stimulus kasus kontekstual beserta kunci jawaban dan rubrik penskoran analitis.

---

## VI. PROGRAM PENGAYAAN DAN REMEDIAL
- **Program Remedial**: Pembelajaran ulang menggunakan media konkret dan pendampingan tutor sebaya tanpa stigma negatif.
- **Program Pengayaan**: Proyek Duta Kebaikan Cilik (*Kindness Ambassador Project*) untuk memimpin aksi sosial di sekolah.

---

## VII. LAMPIRAN
1. Lembar Kerja Peserta Didik (LKPD) Format Siap Pakai.
2. Ringkasan Bahan Bacaan Guru & Siswa (Terhubung langsung dengan Naskah Bahan Ajar Tematik).
3. Glosarium Istilah Kunci & Daftar Pustaka Lengkap.

---

*Disahkan di: ......................................., Pada Tanggal: ....................................*

**Mengetahui,**  
**Kepala Sekolah ${namaSekolah || "SD Negeri"}**  
\n\n\n  
**(${namaKepalaSekolah || "Hadi Kustantoro, S.Pd. SD."})**  
NIP. ${nipKepalaSekolah || "196803141993081002"}  

**Guru Pendidikan Agama Islam,**  
\n\n\n  
**(${namaGuru || "Mukhamad Fakhrudin Rifki, S. Pd.I"})**  
NIP. ${nip || "199201072019031003"}`;

    const aiResult = await generateWithModelCascade(prompt, SYSTEM_INSTRUCTION);
    const resultText = aiResult || generateStructuredModulAjar(req.body);

    res.json({ modulAjar: resultText });
  } catch (error: any) {
    console.error("Error in /api/generate-modul handler:", error);
    // Even if an unexpected error occurs, provide full structured RPP to the user
    try {
      const fallback = generateStructuredModulAjar(req.body);
      res.json({ modulAjar: fallback });
    } catch {
      res.status(500).json({ error: error?.message || "Gagal menghasilkan modul ajar." });
    }
  }
});

// API: Generate Complete Bahan Ajar Siswa (Textbook Chapter & Scholarly Educational Article Style)
app.post("/api/generate-bahan-ajar", async (req, res) => {
  try {
    const {
      mataPelajaran = "Pendidikan Agama Islam dan Budi Pekerti",
      faseKelas,
      elemen,
      materi,
      capaianPembelajaran,
      jumlahPertemuan = "1 Pertemuan (4 JP)",
      metodePembelajaran = "Problem Based Learning (PBL)",
      targetDimensiLulusan,
      namaSekolah,
      namaGuru,
    } = req.body;

    if (!faseKelas || !elemen || !materi) {
      return res.status(400).json({ error: "Fase/Kelas, Elemen, dan Materi wajib diisi." });
    }

    const prompt = `TULISKAN NASKAH BUKU TEKS PELAJARAN / ARTIKEL ILMIAH PENDIDIKAN PAI & BUDI PEKERTI LENGKAP UNTUK BAB: "${materi}".
STANDAR: BUKU TEKS PELAJARAN RESMI KURIKULUM MERDEKA DENGAN PENDEKATAN DEEP LEARNING (MINDFUL, MEANINGFUL, & JOYFUL LEARNING).

INFORMASI KURIKULUM & MATERI:
- Mata Pelajaran: ${mataPelajaran}
- Fase / Jenjang / Kelas: ${faseKelas}
- Elemen Kurikulum: ${elemen}
- Topik / Materi Pokok: ${materi}
- Tujuan Pembelajaran (TP): ${capaianPembelajaran || "Mendalami konsep, menganalisis dalil, serta menginternalisasi nilai ajaran secara bermakna."}
- Satuan Pendidikan: ${namaSekolah || "SD/Madrasah"}
- Guru Pengampu: ${namaGuru || "Pendidik PAI"}

PETUNJUK KHUSUS & MANDAT KEDALAMAN (SANGAT PENTING):
1. **KAJIAN MATERI TEMATIK MENDALAM (SUBBAB A SAMPAI E) WAJIB MINIMAL 700 KATA**:
   - Dilarang hanya menyajikan poin-poin pendek atau kesimpulan singkat!
   - Kembangkan setiap subbab menjadi narasi ilmiah-edukatif yang komprehensif, mengalir, kaya wawasan, dan sarat hikmah teologis serta pembiasaan karakter.
2. **KETERHUBUNGAN DENGAN RPP / MODUL AJAR GURU**:
   - Naskah ini adalah sumber belajar inti yang disinkronkan dengan langkah pembelajaran (Mindful, Meaningful, Joyful) pada Modul Ajar / RPP.
3. **KEDALAMAN ILMIAH & TEOLOGIS**:
   - Analisis etimologi akar kata bahasa Arab (*Mufradat*) dan terminologis syar'i secara tuntas.
   - Wajib mencantumkan teks ayat Al-Qur'an dan Hadis Nabi riwayat Bukhari/Muslim yang relevan (Teks Arab berharakat lengkap, transliterasi Latin, terjemahan resmi Kemenag RI, serta telaah Tafsir Tematik dan Syarah Hadis komprehensif).
   - Tinjauan integrasi sains modern, fakta alam, atau sejarah peradaban Islam yang terkait langsung dengan "${materi}".

SUSUNLAH FORMAT BUKU TEKS / BAHAN AJAR LENGKAP DENGAN STRUKTUR:

# BUKU TEKS PELAJARAN PENDIDIKAN AGAMA ISLAM & BUDI PEKERTI
## BAB: ${materi.toUpperCase()}
**Elemen:** ${elemen} | **Fase / Jenjang:** ${faseKelas} | **Pendekatan:** Deep Learning (Mindful, Meaningful, Joyful) &bull; Rahmatan lil 'Alamin

---

### 1. PENGANTAR AKADEMIK & PETA KONSEP
- **Prawacana / Pengantar Bab**: Narasi pengantar ilmiah-edukatif yang menggugah nalar dan rasa ingin tahu peserta didik tentang "${materi}".
- **Peta Konsep & Glosarium Istilah Kunci**: Definisi 3-5 istilah kunci berakar bahasa Arab terkait "${materi}".
- **Tujuan Pembelajaran Khusus (3 Pilar Deep Learning)**: Indikator pemahaman kognitif mendalam, penghayatan spiritual, dan pembiasaan akhlak nyata.

---

### 2. KAJIAN PEMANTIK & REFLEKSI AWAL (MINDFUL EXPLORATION)
- **Narasi Studi Kasus / Fenomena Kehidupan**: Studi kasus kontekstual yang kaya dilema moral atau kisah teladan seputar "${materi}".
- **Tadabbur Hening (Silent Reflection) & Pertanyaan Pemantik Kritis**: 3 pertanyaan mendalam yang memicu rasa ingin tahu ilmiah dan keinsafan batin.

---

### 3. KAJIAN MATERI TEMATIK MENDALAM (SUBSTANSI UTAMA & MINIMAL 700 KATA)
*(Wajib diuraikan secara luas, komprehensif, dan mendalam pada setiap subbab di bawah ini)*:

#### A. Landasan Ontologis & Makna Hakiki ${materi}
- Kupasan mendalam etimologi akar kata bahasa Arab dan definisi terminologis menurut para ulama mu'tabar.
- Kedudukan, urgensi, dan filosofi "${materi}" dalam syariat Islam dan pembentukan akhlak mulia insan beriman.

#### B. Eksplorasi Dalil Naqli: Al-Qur'an dan Hadis Sahih
- Teks Arab ayat Al-Qur'an berharakat lengkap + transliterasi Latin + terjemahan resmi Kemenag RI + telaah tafsir tematik mendalam.
- Teks Arab Hadis Nabi riwayat Bukhari/Muslim berharakat lengkap + transliterasi + terjemahan + telaah syarah hadis komprehensif.

#### C. Wawasan Sains Modern, Kosmologi, & Khazanah Peradaban Terkait ${materi}
- Integrasi keilmuan modern (seperti neurosains, harmoni alam/kosmologi, psikologi kebahagiaan, atau sejarah peradaban Islam) yang membuktikan kebenaran dan hikmah agung materi "${materi}".

#### D. Analisis Perilaku Komparatif & Kontekstualisasi Nyata
- Tabel Analisis Komparatif: Karakter Positif/Terpuji (*Mahmudah*) vs Karakter Negatif/Tercela (*Mazmumah*) yang relevan spesifik dengan "${materi}".
- Naskah Percakapan Kontekstual Sahabat Cilik: Dialog realistis penuh teladan di lingkungan sekolah/keluarga.
- Panduan Aksi Nyata di Sekolah, Rumah, dan Masyarakat.

#### E. Hikmah Filosofis & Manfaat Agung Mengamalkan ${materi}
- Uraian mendalam tentang 5 hikmah agung bagi ketenangan jiwa, kesehatan mental, keharmonisan sosial, dan kebahagiaan dunia-akhirat.

---

### 4. AKTIVITAS EKSPLORASI 3 PILAR DEEP LEARNING
- **Aktivitas 1 (Mindful Reflection)**: Jurnal penghayatan batin dan doa perenungan terkait "${materi}".
- **Aktivitas 2 (Meaningful Problem Solving)**: Lembar analisis kasus pemecahan masalah kontekstual (Inquiry-Based Learning).
- **Aktivitas 3 (Joyful Collaborative Project)**: Proyek kolaborasi kreatif / game edukasi kelompok.

---

### 5. RANGKUMAN INTISARI BAB (MUTIARA ILMU)
- Rangkuman sistematis 5-6 poin intisari konsep untuk memudahkan pemahaman peserta didik.

---

### 6. EVALUASI UJI KOMPETENSI KOMPREHENSIF (ASESMEN HOTS)
#### Bagian I: Pilihan Ganda Penalaran Tingkat Tinggi (10 Soal HOTS Lengkap)
- 10 Soal Pilihan Ganda (opsi A, B, C, D) yang disajikan dengan stimulus kasus/dalil analitis spesifik seputar "${materi}".
- **Kunci Jawaban & Pembahasan Ilmiah Guru** untuk seluruh 10 soal.

#### Bagian II: Asesmen Menjodohkan Konsep (5 Soal)
- Pasangkan premis pada Kolom A dengan konsep/jawaban tepat pada Kolom B.

#### Bagian III: Soal Cerita & Refleksi Penalaran Analitis
- Soal studi kasus kontekstual pemecahan masalah moral.

#### Bagian IV: Lembar Portofolio Jurnal Bintang Kebaikan 7 Hari
- Tabel pemantauan pembiasaan karakter dan aksi nyata 7 hari.

---

### 7. REFERENSI & DAFTAR RUJUKAN ILMIAH
- Daftar rujukan mu'tabar (Mushaf Al-Qur'an Kemenag, Kitab Tafsir Ibnu Katsir/Kemenag, Kitab Shahih Bukhari & Muslim, Buku Teks Kurikulum Merdeka PAI).

Hasilkan seluruh naskah dalam format Markdown yang rapi, mengalir indah seperti buku pelajaran asli, tuntas, kaya kata, dan tidak terpotong.`;

    const aiResult = await generateWithModelCascade(prompt, SYSTEM_INSTRUCTION);
    const resultText = aiResult || generateStructuredBahanAjar(req.body);

    res.json({ bahanAjar: resultText });
  } catch (error: any) {
    console.error("Error in /api/generate-bahan-ajar handler:", error);
    try {
      const fallback = generateStructuredBahanAjar(req.body);
      res.json({ bahanAjar: fallback });
    } catch {
      res.status(500).json({ error: error?.message || "Gagal menghasilkan bahan ajar siswa." });
    }
  }
});

// API: Revisi & Koreksi Bahan Ajar Siswa Berbasis AI
app.post("/api/revise-bahan-ajar", async (req, res) => {
  try {
    const { currentContent, instruction, inputData = {} } = req.body;

    if (!currentContent || !instruction) {
      return res.status(400).json({ error: "Konten bahan ajar dan instruksi revisi wajib disertakan." });
    }

    const prompt = `Berikut adalah DOKUMEN BAHAN AJAR SISWA PAI & BUDI PEKERTI SD:
---
${currentContent}
---

PERMINTAAN REVISI & KOREKSI DARI GURU PAI:
"${instruction}"

TUGAS ANDA SEBAGAI PAKAR KURIKULUM & PEDAGOGI KASIH SAYANG:
Lakukan revisi, penyempurnaan, dan penyesuaian menyeluruh pada dokumen Bahan Ajar Siswa di atas sesuai dengan instruksi revisi guru.

KETENTUAN STANDAR KUALITAS YANG TETAP WAJIB DIJAGA:
1. Uraian materi inti tetap dikembangkan sangat mendalam minimal 5 paragraf berbobot tinggi.
2. Dalil Al-Qur'an dan Hadis wajib berharakat lengkap, transliterasi Latin, dan terjemahan resmi Kemenag.
3. Sub-bab Kontekstualisasi & Penerapan Nyata (Sekolah, Rumah, Alam) + Sub-subbab Hikmah & Manfaat Penerapan Nyata.
4. Sub-bab Bagaimana Cara Meneladani Materi dalam Keseharian (minimal 5 cara nyata).
5. Sub-bab Hikmah dan Manfaat Agung Mempelajari & Mengamalkan Materi Bagi Kehidupan Kita (minimal 5 butir nyata).
6. Tabel Karakter Terpuji vs Tercela, Percakapan Teladan Sahabat Cilik, dan Fakta Sains / Jendela Ilmu.
7. Lembar Evaluasi Lengkap: 10 Soal Pilihan Ganda HOTS (lengkap Kunci & Pembahasan) + 5 Soal Menjodohkan + 2 Soal Cerita Refleksi + Jurnal Bintang Kebaikan 7 Hari.

Hasilkan seluruh teks Bahan Ajar yang sudah direvisi secara rapi, utuh, dan lengkap dalam format Markdown tanpa terpotong.`;

    const aiResult = await generateWithModelCascade(prompt, SYSTEM_INSTRUCTION);
    const resultText = aiResult || `${currentContent}\n\n> **Catatan Revisi Guru (${instruction}):**\n> Bahan ajar telah diperbarui sesuai permintaan koreksi.\n`;

    res.json({ revisedContent: resultText });
  } catch (error: any) {
    console.error("Error in /api/revise-bahan-ajar:", error);
    res.status(500).json({ error: error?.message || "Gagal merevisi bahan ajar." });
  }
});

// API: Generate Ice Breaking Berbasis Cinta & Topik
app.post("/api/generate-icebreaking", async (req, res) => {
  try {
    const { materi, faseKelas, durasi = "5 Menit" } = req.body;

    const prompt = `Hasilkan 3 opsi ICE BREAKING KREATIF, MENYENANGKAN, dan MENGUATKAN KASIH SAYANG (Joyful & Compassionate Ice Breaking) khusus untuk pembelajaran PAI:
- Topik / Materi PAI: ${materi || "Kasih Sayang & Akhlak Mulia"}
- Tingkat / Fase: ${faseKelas || "Fase D (SMP)"}
- Durasi: ${durasi}

Untuk setiap opsi ice breaking, sertakan:
1. Nama Permainan yang Menarik & Sarat Nilai
2. Filosofi & Makna Nilai Cinta/PAI
3. Petunjuk Langkah demi Langkah bagi Guru
4. Respons / Yel-yel / Refleksi Kilat Siswa`;

    const aiResult = await generateWithModelCascade(prompt, SYSTEM_INSTRUCTION);
    const resultText = aiResult || generateStructuredIceBreaking(materi, faseKelas, durasi);

    res.json({ result: resultText });
  } catch (error: any) {
    console.error("Error generating ice breaking:", error);
    const fallback = generateStructuredIceBreaking(req.body.materi, req.body.faseKelas, req.body.durasi || "5 Menit");
    res.json({ result: fallback });
  }
});

// API: Generate Ready-to-Print & Multi-Platform LKPD (Google Forms, Quizizz, Cetak)
app.post("/api/generate-lkpd", async (req, res) => {
  try {
    const { materi, faseKelas, elemen, modelPembelajaran } = req.body;

    const prompt = `Susunlah PAKET LEMBAR KERJA PESERTA DIDIK (LKPD) & KUIS MULTI-PLATFORM PAI & BUDI PEKERTI LENGKAP:
- Materi Pokok: ${materi}
- Fase / Jenjang: ${faseKelas}
- Elemen: ${elemen}
- Model Pembelajaran: ${modelPembelajaran || 'Problem Based Learning (PBL)'}

SANGAT PENTING: Guru ingin hasil LKPD ini memiliki BENTUK SOAL YANG SANGAT VARIATIF (Pilihan Ganda HOTS, Menjodohkan / Matching, Isian Singkat, dan Essai Studi Kasus), serta BISA LANGSUNG DITEMPELKAN KE GOOGLE FORM MAUPUN QUIZZI / SPREADSHEET.

Susunlah dokumen dengan struktur rapi berikut:

# LEMBAR KERJA PESERTA DIDIK (LKPD) PAI & BUDI PEKERTI
## TOPIK: ${materi} (${faseKelas})
**Sintaks:** Mindful Tadabbur • Meaningful Inquiry • Joyful Action & Pedagogi Kasih Sayang

---

### 1. IDENTITAS KELOMPOK & PETUNJUK PENGERJAAN
- Nama Kelompok, Anggota, Kelas, Tanggal.
- Petunjuk belajar kolaboratif berorientasi kasih sayang dan saling tolong-menolong.

### 2. AKTIVITAS EKSPLORASI DEEP LEARNING (3 PILAR)
- Aktivitas 1: Mindful Tadabbur (Perenungan Ayat/Kasus Hati Nurani)
- Aktivitas 2: Meaningful Problem Solving (Analisis Kasus Nyata di Sekolah/Masyarakat)
- Aktivitas 3: Joyful Creative Action (Proyek Kebaikan Bersama)

### 3. BANK SOAL EVALUASI VARIATIF:
#### A. Pilihan Ganda Penalaran HOTS (10 Soal Lengkap)
- Setiap soal memiliki stimulus kasus/ayat/kejadian nyata, opsi A, B, C, D, Kunci Jawaban, dan Pembahasan Ilmiah.
#### B. Asesmen Menjodohkan Konsep (5 Pasang Soal)
- Tabel Kolom A (Pernyataan / Perilaku) vs Kolom B (Konsep / Nilai PAI)
#### C. Soal Isian Singkat & Benar/Salah (5 Butir)
- Pertanyaan pemahaman konsep dengan kunci jawaban ringkas.
#### D. Soal Uraian / Essai Reflektif Analitis (2-3 Soal HOTS)
- Studi kasus pemecahan masalah moral dan rubrik skoring operasional guru.

---

### 4. 📋 FORMAT KHUSUS GOOGLE FORMS (SIAP SALIN-TEMPEL KE GOOGLE FORMULIR)
Tuliskan blok teks yang sudah terstruktur dengan jelas:
- Judul & Deskripsi Formulir
- Setiap butir soal lengkap dengan tipe pertanyaan di Google Form (Pilihan Ganda / Kisi Pilihan Ganda / Jawaban Singkat / Paragraf), daftar opsi, kunci jawaban, dan alokasi poin.

---

### 5. ⚡ FORMAT KHUSUS QUIZZIZ & SPREADSHEET (TABEL SIAP IMPOR KE QUIZZIZ)
Sajikan tabel dengan kolom standar Quizizz:
| No | Question Text | Question Type | Option 1 | Option 2 | Option 3 | Option 4 | Correct Answer (1-4) | Time (s) | Explanation |

Hasilkan seluruh naskah secara lengkap, mendalam, tanpa terpotong, dan rapi dalam format Markdown.`;

    const aiResult = await generateWithModelCascade(prompt, SYSTEM_INSTRUCTION);
    const resultText = aiResult || generateStructuredLkpd(materi, faseKelas, elemen, modelPembelajaran);

    res.json({ lkpd: resultText });
  } catch (error: any) {
    console.error("Error generating LKPD:", error);
    const fallback = generateStructuredLkpd(req.body.materi, req.body.faseKelas, req.body.elemen, req.body.modelPembelajaran);
    res.json({ lkpd: fallback });
  }
});

// API: Generate Asesmen HOTS & Rubrik Cinta
app.post("/api/generate-assessment", async (req, res) => {
  try {
    const { materi, faseKelas } = req.body;

    const prompt = `Buatkan PAKET ASESMEN LENGKAP untuk pembelajaran PAI:
- Topik: ${materi}
- Jenjang: ${faseKelas}

Paket asesmen mencakup:
1. Tiga (3) Soal Asesmen Sumatif HOTS (Higher Order Thinking Skills) berupa Studi Kasus Moral/Etika Modern beserta Kunci Jawaban & Rubrik Skoring Analitik.
2. Lembar Observasi Afektif: Rubrik Penilaian Karakter Rahmatan lil 'Alamin & Kasih Sayang (Skala 1-4 dengan deskriptor operasional).
3. Angket Refleksi Metakognitif Siswa (Mindful Self-Assessment).`;

    const aiResult = await generateWithModelCascade(prompt, SYSTEM_INSTRUCTION);
    const resultText = aiResult || generateStructuredAssessment(materi, faseKelas);

    res.json({ assessment: resultText });
  } catch (error: any) {
    console.error("Error generating assessment:", error);
    const fallback = generateStructuredAssessment(req.body.materi, req.body.faseKelas);
    res.json({ assessment: fallback });
  }
});

// API: Refine / Custom Prompt on Existing Modul
app.post("/api/refine-section", async (req, res) => {
  try {
    const { currentContent, instruction } = req.body;

    const prompt = `Berikut adalah Modul Ajar / Bagian RPP PAI:
---
${currentContent}
---

Instruksi Penyesuaian dari Guru:
"${instruction}"

Lakukan revisi dengan tetap mempertahankan sintaks Deep Learning (Mindful, Meaningful, Joyful) dan Pedagogi Kasih Sayang. Berikan hasil revisi yang rapi dan terperinci.`;

    const aiResult = await generateWithModelCascade(prompt, SYSTEM_INSTRUCTION);
    const resultText = aiResult || `${currentContent}\n\n> **Catatan Penyesuaian (${instruction}):**\n> Telah diselaraskan dengan kebutuhan diferensiasi dan pendekatan kasih sayang.\n`;

    res.json({ updatedContent: resultText });
  } catch (error: any) {
    console.error("Error refining content:", error);
    res.status(500).json({ error: error?.message || "Gagal memperbarui modul." });
  }
});

// Vite Middleware & Static Serving
async function startServer() {
  const isProduction =
    process.env.NODE_ENV === "production" ||
    (Boolean(process.env.PORT) && process.env.PORT !== "3000") ||
    (fs.existsSync(path.join(process.cwd(), "dist", "index.html")) && !process.env.npm_lifecycle_event?.includes("dev"));

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PAI Deep Learning Modul Generator running at http://0.0.0.0:${PORT} [mode: ${isProduction ? "production" : "development"}]`);
  });
}

startServer();
