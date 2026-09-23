import { ElemenPAI } from '../types';

export interface FasePreset {
  fase: string;
  label: string;
  tingkat: string;
  elements: {
    elemen: ElemenPAI;
    defaultCP: string;
    sampleTopics: string[];
  }[];
}

export const CURRICULUM_PRESETS: FasePreset[] = [
  {
    fase: 'Fase A (SD Kelas 1-2)',
    label: 'Fase A (Kelas 1 - 2 SD)',
    tingkat: 'Sekolah Dasar',
    elements: [
      {
        elemen: 'Al-Qur\'an dan Hadis',
        defaultCP: 'Peserta didik mampu mengenal huruf hijaiyah berharakat, membaca surah-surah pendek (Al-Fatihah, Al-Ikhlas, An-Nas, Al-Falaq) dengan tartil dan penuh kecintaan kepada firman Allah Swt.',
        sampleTopics: [
          'Mengenal Huruf Hijaiyah dengan Riang & Kasih Sayang',
          'Tadabbur Surah Al-Fatihah: Menemukan Pesan Kasih Sayang Allah',
          'Membaca dan Menghafal Surah Al-Ikhlas dengan Cinta'
        ]
      },
      {
        elemen: 'Akidah',
        defaultCP: 'Peserta didik mampu mengenal rukun iman, nama-nama Allah yang agung (Asmaul Husna: Ar-Rahman, Ar-Rahim, Al-Malik, Al-Quddus) serta merasakan kebesaran dan kasih sayang Allah dalam kehidupan sehari-hari.',
        sampleTopics: [
          'Mengenal Allah Yang Maha Pengasih (Ar-Rahman) dan Maha Penyayang (Ar-Rahim)',
          'Rukun Iman: Menumbuhkan Cinta kepada Allah dan Rasul-Nya',
          'Mengenal Dua Kalimat Syahadat sebagai Ikrar Kasih'
        ]
      },
      {
        elemen: 'Akhlak',
        defaultCP: 'Peserta didik mampu membiasakan sikap kasih sayang kepada sesama, berbakti kepada orang tua dan guru, bersikap santun, berkata baik, dan menjaga kebersihan lingkungan sebagai bentuk syukur.',
        sampleTopics: [
          'Indahnya Berkata Santun dan Menebar Senyum kepada Teman',
          'Berbakti dan Berkasih Sayang kepada Ayah dan Ibu di Rumah',
          'Menjaga Kebersihan Diri dan Lingkungan sebagai Wujud Cinta Ciptaan Allah'
        ]
      },
      {
        elemen: 'Fikih',
        defaultCP: 'Peserta didik mampu mengenal rukun Islam, melafalkan doa sebelum dan sesudah wudu serta bersuci, dan menirukan tata cara salat dengan tertib dan bahagia.',
        sampleTopics: [
          'Wudu Sempurna: Bersuci dengan Ceria dan Tertib',
          'Belajar Salat Lima Waktu dengan Penuh Rasa Syukur',
          'Mengenal Rukun Islam sebagai Pondasi Kebaikan Hidup'
        ]
      },
      {
        elemen: 'Sejarah Peradaban Islam (SPI)',
        defaultCP: 'Peserta didik mampu menceritakan kisah keteladanan Nabi Muhammad Saw. pada masa kanak-kanak dan remaja yang jujur, penuh kasih sayang (Al-Amin), dan suka menolong sesama.',
        sampleTopics: [
          'Kisah Teladan Masa Kecil Nabi Muhammad Saw. yang Penuh Kejujuran (Al-Amin)',
          'Keteladanan Kasih Sayang Nabi Muhammad Saw. kepada Anak Yatim dan Hewan'
        ]
      }
    ]
  },
  {
    fase: 'Fase B (SD Kelas 3-4)',
    label: 'Fase B (Kelas 3 - 4 SD)',
    tingkat: 'Sekolah Dasar',
    elements: [
      {
        elemen: 'Al-Qur\'an dan Hadis',
        defaultCP: 'Peserta didik mampu membaca, menghafal, dan memahami pesan pokok surah-surah pendek (seperti Q.S. An-Nasr, Al-Kafirun, Al-Kautsar) serta hadis tentang persaudaraan dan silaturahmi dengan baik dan penuh penghayatan.',
        sampleTopics: [
          'Menghayati Pesan Toleransi dan Kerukunan dalam Surah Al-Kafirun',
          'Surah Al-Kautsar: Mensyukuri Nikmat dan Berbagi dengan Qurban',
          'Hadis tentang Indahnya Menjalin Persaudaraan dan Saling Memaafkan'
        ]
      },
      {
        elemen: 'Akidah',
        defaultCP: 'Peserta didik mampu memahami sifat-sifat Allah, mengenal malaikat-malaikat Allah dan tugasnya, serta meyakini bahwa Allah senantiasa mengawasi amal perbuatan manusia dengan penuh hikmah.',
        sampleTopics: [
          'Mengenal Malaikat Allah dan Meneladani Ketaatan serta Kejujuran',
          'Asmaul Husna: Al-Wahhab (Maha Pemberi) dan Al-Alim (Maha Mengetahui)'
        ]
      },
      {
        elemen: 'Akhlak',
        defaultCP: 'Peserta didik mampu membiasakan akhlak terpuji seperti tolong-menolong, menghormati teman yang berbeda, tidak mengejek, rendah hati (tawaduk), dan memohon maaf jika bersalah.',
        sampleTopics: [
          'Tolong-Menolong (Ta\'awun) Tanpa Membeda-bedakan Teman',
          'Sikap Tawaduk dan Menghindari Sifat Sombong dalam Pergaulan',
          'Membiasakan Meminta Maaf dan Memaafkan Kesalahan Teman'
        ]
      },
      {
        elemen: 'Fikih',
        defaultCP: 'Peserta didik mampu memahami ketentuan salat berjamaah, salat Jumat, salat duha, dan berpuasa Ramadan sebagai sarana mendekatkan diri kepada Allah dan memupuk empati kepada sesama.',
        sampleTopics: [
          'Indahnya Kebersamaan dalam Salat Berjamaah di Masjid/Musala',
          'Puasa Ramadan: Melatih Kesabaran dan Merasakan Empati kepada Kaum Duafa',
          'Salat Sunah Duha sebagai Wujud Syukur dan Permohonan Rezeki Halal'
        ]
      },
      {
        elemen: 'Sejarah Peradaban Islam (SPI)',
        defaultCP: 'Peserta didik mampu menceritakan kisah peristiwa kerasulan Nabi Muhammad Saw., hijrah ke Madinah, dan piagam Madinah yang menjunjung tinggi toleransi dan perdamaian antargolongan.',
        sampleTopics: [
          'Peristiwa Hijrah ke Madinah: Membangun Persaudaraan Muhajirin dan Ansar',
          'Piagam Madinah: Teladan Rasulullah dalam Menjaga Kerukunan Antarumat Beragama'
        ]
      }
    ]
  },
  {
    fase: 'Fase C (SD Kelas 5-6)',
    label: 'Fase C (Kelas 5 - 6 SD)',
    tingkat: 'Sekolah Dasar',
    elements: [
      {
        elemen: 'Al-Qur\'an dan Hadis',
        defaultCP: 'Peserta didik mampu membaca dengan tartil, menghafal, dan menganalisis kandungan surah-surah pilihan (Q.S. Al-Hujurat/49:13, Q.S. Al-Ma\'un/107) tentang keragaman manusia dan kepedulian terhadap fakir miskin.',
        sampleTopics: [
          'Kajian Q.S. Al-Hujurat: 13 tentang Menghargai Keragaman Suku, Bangsa, dan Budaya',
          'Membedah Pesan Sosial Surah Al-Ma\'un: Membela Anak Yatim dan Menolak Kepalsuan Ibadah',
          'Hadis tentang Menyayangi Anak Yatim dan Kaum Lemah'
        ]
      },
      {
        elemen: 'Akidah',
        defaultCP: 'Peserta didik mampu meyakini adanya hari akhir (kiamat) serta qada dan qadar, yang melahirkan sikap mawas diri, optimis, ikhtiar yang sungguh-sungguh, tawakal, dan ridha atas ketetapan Allah.',
        sampleTopics: [
          'Hikmah Beriman kepada Hari Akhir: Memperbanyak Bekal Amal Kebaikan',
          'Memahami Qada dan Qadar: Menjaga Optimisme dan Sikap Pantang Menyerah'
        ]
      },
      {
        elemen: 'Akhlak',
        defaultCP: 'Peserta didik mampu menginternalisasi akhlak mulia seperti adab bertetangga, toleransi (tasamuh), menjauhi sifat iri dengki, serta peduli terhadap kelestarian alam lingkungan sekitar.',
        sampleTopics: [
          'Adab Bertetangga dan Bergaul dalam Masyarakat Majemuk',
          'Menjaga Lingkungan Hidup (Tahfif al-Bi\'ah) sebagai Manifestasi Ibadah dan Cinta Bumi',
          'Mengikis Penyakit Hati: Hasad, Riya, dan Ujub dengan Dzikir dan Syukur'
        ]
      },
      {
        elemen: 'Fikih',
        defaultCP: 'Peserta didik mampu memahami konsep zakat, infak, sedekah, dan hadiah serta mempraktikkannya sebagai wujud solidaritas sosial dan pembersih harta.',
        sampleTopics: [
          'Zakat Fitrah dan Zakat Mal: Menumbuhkan Keadilan Sosial dan Mengikis Kesenjangan',
          'Kekuatan Infak dan Sedekah: Berbagi Senyuman dan Berkah Rezeki',
          'Makanan dan Minuman Halal Lagi Baik (Halalan Thayyiban) untuk Kesehatan Jiwa dan Raga'
        ]
      },
      {
        elemen: 'Sejarah Peradaban Islam (SPI)',
        defaultCP: 'Peserta didik mampu meneladani kepemimpinan Khulafaur Rasyidin yang adil, bijaksana, rendah hati, dan mengutamakan musyawarah untuk kemaslahatan umat.',
        sampleTopics: [
          'Kepemimpinan Khulafaur Rasyidin: Keadilan Umar bin Khattab dan Kebijaksanaan Abu Bakar',
          'Kedermawanan Usman bin Affan dan Keteguhan Ilmu Ali bin Abi Thalib'
        ]
      }
    ]
  }
];

export interface DimensiLulusanDetail {
  nama: string;
  deskripsi: string;
}

export const DELAPAN_DIMENSI_LULUSAN_DETAIL: DimensiLulusanDetail[] = [
  {
    nama: 'Keimanan dan Ketakwaan terhadap Tuhan YME',
    deskripsi: 'Penghayatan spiritual mendalam, integritas moral, dan adab akhlak mulia'
  },
  {
    nama: 'Kewargaan',
    deskripsi: 'Cinta tanah air, kepedulian sosial, ketaatan norma, dan harmoni keberagaman'
  },
  {
    nama: 'Penalaran Kritis',
    deskripsi: 'Berpikir logis, analitis, reflektif, literasi, numerasi & pemecahan masalah'
  },
  {
    nama: 'Kreativitas',
    deskripsi: 'Inovasi, gagasan orisinal, fleksibilitas berpikir, dan produk solusi bermakna'
  },
  {
    nama: 'Kolaborasi',
    deskripsi: 'Kerja sama gotong royong, pembagian peran aktif, empati, dan berbagi kemanfaatan'
  },
  {
    nama: 'Kemandirian',
    deskripsi: 'Tanggung jawab proses & hasil belajar, inisiatif, regulasi diri, dan adaptif'
  },
  {
    nama: 'Kesehatan',
    deskripsi: 'Pola hidup bersih dan sehat, kebugaran jasmani, dan kesejahteraan mental spiritual'
  },
  {
    nama: 'Komunikasi',
    deskripsi: 'Interaksi positif, bertutur santun (qawlan layyina), dan membangun kesepahaman'
  }
];

export const DELAPAN_DIMENSI_LULUSAN = DELAPAN_DIMENSI_LULUSAN_DETAIL.map((d) => d.nama);
export const DIMENSI_PROFIL_LULUSAN = DELAPAN_DIMENSI_LULUSAN;
export const DIMENSI_PROFIL_PANCASILA = DELAPAN_DIMENSI_LULUSAN;

export const KARAKTER_RAHMATAN_LIL_ALAMIN = [
  'Tawassuth (Mengambil Jalan Tengah / Moderat)',
  'Tasamuh (Toleransi & Menghargai Perbedaan)',
  'Tawazun (Keseimbangan Lahiriah & Batiniah)',
  'Rifq (Kelembutan Hati & Anti-Kekerasan)',
  'Mahabbah (Cinta Kasih kepada Sesama Ciptaan)',
  'Syura (Musyawarah & Demokratis)',
  'I\'tidal (Lurus & Menegakkan Keadilan)',
  'Qudwah (Keteladanan Akhlak)'
];

export const METODE_OPTIONS = [
  'Problem Based Learning (PBL)',
  'Small Group Discussion',
  'Project Based Learning (PjBL)',
  'Inquiry & Discovery Learning',
  'Role Playing & Sosiodrama Empati',
  'Think-Pair-Share & Mindful Reflection',
  'Contextual Teaching and Learning (CTL)',
  'Diferensiasi Konten, Proses & Produk'
];
