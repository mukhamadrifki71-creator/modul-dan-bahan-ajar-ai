import { ModulInputData } from '../types';

interface ThematicKnowledge {
  istilahKunci: Array<{ istilah: string; definisi: string }>;
  pengantarBab: string;
  studiKasusAwal: {
    judul: string;
    narasi: string;
    pertanyaanKritis: string[];
  };
  kajianOntologis: string;
  dalilQuran: {
    surah: string;
    arab: string;
    latin: string;
    terjemah: string;
    tafsir: string;
  };
  hadisNabi: {
    rawi: string;
    arab: string;
    latin: string;
    terjemah: string;
    syarah: string;
  };
  wawasanSainsSejarah: {
    subjudul: string;
    uraian: string;
  };
  tabelKarakter: Array<{ terpuji: string; tercela: string }>;
  dialogTematik: {
    tokoh: string;
    naskah: string;
  };
  hikmahMateri: string[];
  aktivitasDeepLearning: {
    mindful: string;
    meaningful: string;
    joyful: string;
  };
  intisariPoin: string[];
  soalHots: Array<{
    nomor: number;
    stimulus: string;
    opsi: { A: string; B: string; C: string; D: string };
    kunci: string;
    pembahasan: string;
  }>;
  soalMenjodohkan: Array<{ premis: string; jawaban: string }>;
  soalEsaiReflektif: Array<{ kasus: string; pertanyaan: string; rubrik: string }>;
  misiProyek7Hari: Array<{ hari: string; misi: string }>;
  referensi: string[];
}

function resolveThematicKnowledge(materiRaw: string, elemenRaw: string): ThematicKnowledge {
  const m = (materiRaw || '').toLowerCase();
  const e = (elemenRaw || '').toLowerCase();

  // 1. Domain: Al-Qur'an, Tajwid, & Hadis
  if (m.includes('tajwid') || m.includes('nun') || m.includes('tanwin') || m.includes('mad') || m.includes('ikhfa') || m.includes('izhar') || m.includes('idgham') || m.includes('iqlab') || m.includes('surah') || m.includes('surat') || m.includes('hujurat') || m.includes('ma\'un') || m.includes('fatihah') || m.includes('kautsar') || m.includes('qur\'an') || e.includes('qur\'an')) {
    return {
      istilahKunci: [
        { istilah: 'Tartil (تَرْتِيْل)', definisi: 'Membaca Al-Qur\'an secara perlahan, tenang, sesuai makhraj huruf dan hukum tajwid yang benar.' },
        { istilah: 'Makharijul Huruf (مَخَارِجُ الْحُرُوفِ)', definisi: 'Tempat-tempat keluarnya huruf hijaiyah saat dilafalkan secara tepat dari rongga mulut atau tenggorokan.' },
        { istilah: 'Tadabbur (تَدَبُّر)', definisi: 'Proses perenungan mendalam terhadap pesan dan hikmah ayat suci Al-Qur\'an untuk diamalkan dalam kehidupan nyata.' },
        { istilah: 'Asbabun Nuzul (أَسْبَابُ النُّزُولِ)', definisi: 'Latar belakang sejarah atau peristiwa khusus yang melandasi turunnya suatu ayat Al-Qur\'an.' }
      ],
      pengantarBab: `Al-Qur'an al-Karim adalah kalamullah yang diturunkan kepada Nabi Muhammad Saw. sebagai mukjizat abadi dan petunjuk hidup (*Hudan lin-Naas*). Mempelajari ${materiRaw} bukan sekadar melafalkan untaian huruf hijaiyah, melainkan sebuah disiplin ilmu lisan dan hati yang menghubungkan batin pembacanya dengan keagungan Sang Pencipta. Setiap huruf yang dibaca dengan benar melahirkan ketenangan jiwa dan mendatangkan pahala berlipat ganda.`,
      studiKasusAwal: {
        judul: 'Keindahan Getaran Tartil di Senja Hari',
        narasi: `Di serambi masjid sekolah menjelang maghrib, Faris dan Wildan sedang menyimak bacaan Al-Qur'an satu sama lain. Faris membaca dengan terburu-buru sehingga hukum tajwid dan panjang-pendek bacaan (*mad*) menjadi tercampur. Wildan dengan santun dan ramah mengingatkan, "Faris, mari kita baca pelan-pelan dengan tartil. Rasulullah Saw. mengajarkan bahwa memperindah bacaan Al-Qur'an dengan tajwid yang benar akan membuat hati kita bergetar tenteram dan para malaikat mendengarkan dengan penuh cinta." Ketika Faris mengulangi bacaannya dengan tenang dan memperhatikan makhraj huruf, suasana di sekitarnya terasa begitu hening, damai, dan menyejukkan hati.`,
        pertanyaanKritis: [
          'Mengapa membaca Al-Qur\'an dengan tartil dan tajwid yang benar dapat menghadirkan ketenangan batin yang luar biasa?',
          'Bagaimana cara kita membiasakan diri membaca Al-Qur\'an setiap hari di tengah kesibukan sekolah dan bermain?',
          'Pernahkah kamu meresapi arti dari ayat yang kamu baca, dan bagaimana ayat tersebut membimbing perilaku sehari-harimu?'
        ]
      },
      kajianOntologis: `Secara etimologis, kata Tajwid berakar dari kata *Jawwada-Yujawwidu-Tajwiidan* (جَوَّدَ - يُجَوِّدُ - تَجْوِيدًا) yang bermakna membaguskan atau menyempurnakan. Secara terminologis, ilmu tajwid adalah disiplin ilmu yang mempelajari kaidah pelafalan setiap huruf hijaiyah dari makhraj aslinya dengan memberikan hak-hak sifat hurufnya. Membaca Al-Qur'an dengan kaidah yang tepat adalah sarana penjagaan orisinalitas wahyu Ilahi sepanjang zaman.`,
      dalilQuran: {
        surah: 'QS. Al-Muzzammil [73]: 4',
        arab: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
        latin: 'Wa Rattilil-Qur\'aana Tartiilaa',
        terjemah: '"Dan bacalah Al-Qur\'an itu dengan perlahan-lahan (tartil)." (QS. Al-Muzzammil: 4)',
        tafsir: 'Imam Ali bin Abi Thalib r.a. menjelaskan bahwa makna tartil dalam ayat ini adalah "Mentajwidkan huruf-hurufnya dan memahami tempat-tempat berhentinya (waqaf)". Membaca secara tartil memungkinkan akal pikiran mencerna makna dan hati nurani tergerak untuk tunduk mengamalkan syariat-Nya.'
      },
      hadisNabi: {
        rawi: 'HR. Bukhari No. 5027 dari Utsman bin Affan r.a.',
        arab: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
        latin: 'Khairukum Man Ta\'allamal-Qur\'aana Wa \'Allamah',
        terjemah: '"Sebaik-baik kalian adalah orang yang belajar Al-Qur\'an dan mengajarkannya."',
        syarah: 'Hadis ini menegaskan derajat kemuliaan tertinggi bagi insan yang mendedikasikan waktu dan kesungguhannya untuk mempelajari teks, tajwid, makna, serta mengamalkan Al-Qur\'an, kemudian menyebarkannya kepada sesama dengan penuh keikhlasan.'
      },
      wawasanSainsSejarah: {
        subjudul: 'Resonansi Akustik & Manfaat Membaca Al-Qur\'an bagi Gelombang Otak',
        uraian: 'Penelitian neurosains modern menunjukkan bahwa mendengarkan dan melantunkan bacaan Al-Qur\'an dengan kaidah tajwid dan irama tartil yang teratur merangsang produksi gelombang alfa (*alpha brainwaves*) pada frekuensi 8-12 Hz. Frekuensi ini memicu relaksasi mendalam, menurunkan kadar hormon kortisol (penyebab stres), meningkatkan fokus memori kognitif, serta memperkuat daya konsentrasi belajar anak secara signifikan.'
      },
      tabelKarakter: [
        { terpuji: 'Membaca Al-Qur\'an dengan wudhu, tenang, tartil, dan memperhatikan harakat.', tercela: 'Membaca terburu-buru demi mengejar cepat selesai tanpa peduli kaidah tajwid.' },
        { terpuji: 'Menghargai mushaf Al-Qur\'an, meletakkannya di tempat tinggi dan bersih.', tercela: 'Meletakkan mushaf sembarangan di lantai atau memperlakukannya tanpa adab.' },
        { terpuji: 'Tulus menyimak ketika ada guru atau teman sedang melantunkan ayat Al-Qur\'an.', tercela: 'Bercanda, mengobrol berisik, atau menertawakan teman yang sedang membaca Al-Qur\'an.' },
        { terpuji: 'Berusaha memahami terjemahan ayat dan mengamalkan pesan moralnya di sekolah.', tercela: 'Hanya menghafal lafal tanpa berniat mengamalkan ajaran kebaikan di dalamnya.' },
        { terpuji: 'Mengajarkan bacaan huruf hijaiyah kepada adik atau teman yang masih terbata-bata.', tercela: 'Mengejek atau meremehkan teman yang belum lancar membaca Al-Qur\'an.' }
      ],
      dialogTematik: {
        tokoh: 'Faris dan Wildan di perpustakaan sekolah',
        naskah: `- **Faris**: "Wildan, terima kasih sudah mengajariku cara melafalkan huruf Ikhfa dan Idgham dengan benar tadi. Suara dengungnya jadi terasa pas dan merdu."\n- **Wildan**: "Alhamdulillah Faris! Belajar Al-Qur'an itu sangat menyenangkan jika kita saling menyimak. Rasulullah Saw. bersabda bahwa orang yang terbaik adalah yang belajar Al-Qur'an dan mengajarkannya."\n- **Faris**: "Betul sekali, mulai sekarang sepulang sekolah aku ingin rutin bertadarus 15 menit bersama adikku di rumah!"`
      },
      hikmahMateri: [
        'Mendapatkan ketenangan batin (*Sakinah*) dan naungan rahmat dari para malaikat.',
        'Mencegah terjadinya perubahan makna ayat akibat kesalahan makhraj dan hukum bacaan.',
        'Menjadi syafaat (penolong) yang menerangi kehidupan di dunia hingga hari akhirat.',
        'Melatih kedisiplinan lisan, ketelitian nalar, dan kehalusan budi pekerti.',
        'Membangun generasi Qur\'ani yang cerdas secara intelektual dan berakhlak mulia.'
      ],
      aktivitasDeepLearning: {
        mindful: 'Duduk hening selama 3 menit menghadap kiblat, menyimak satu qari membaca ayat suci, lalu merenungi karunia lisan yang Allah berikan.',
        meaningful: 'Analisis kelompok: Menemukan 3 hukum tajwid pada potongan ayat di lembar kerja dan membedah maknanya secara kontekstual.',
        joyful: 'Game estafet tajwid ceria: Menyusun kartu ayat berharakat bersama tim dengan nada tartil yang indah.'
      },
      intisariPoin: [
        'Al-Qur\'an adalah kalamullah yang menjadi pedoman utama seluruh umat manusia.',
        'Membaca Al-Qur\'an wajib menggunakan kaidah tajwid agar maknanya terjaga secara sempurna.',
        'Tartil bukan hanya memperbagus suara, melainkan melibatkan pemahaman dan perenungan hati.',
        'Orang yang terbaik di sisi Allah adalah orang yang tekun belajar dan gemar mengajarkan Al-Qur\'an.',
        'Mengamalkan isi Al-Qur\'an diwujudkan melalui lisan yang jujur, santun, dan peduli kepada sesama.'
      ],
      soalHots: [
        {
          nomor: 1,
          stimulus: 'Ketika membaca QS. Al-Ma\'un, Nabila menemukan nun sukun bertemu huruf kaf (نْ كَ). Sikap yang tepat saat melafalkan bacaan tersebut berdasarkan kaidah tajwid adalah...',
          opsi: { A: 'Membaca jelas tanpa dengung', B: 'Menyamarkan bacaan dengan dengung (Ikhfa Haqiqi)', C: 'Membalikkan bunyi menjadi huruf mim', D: 'Memantulkan suara dengan kuat' },
          kunci: 'B',
          pembahasan: 'Nun sukun bertemu huruf kaf adalah hukum Ikhfa Haqiqi, dibaca samar disertai dengung (ghunnah) 2 harakat.'
        },
        {
          nomor: 2,
          stimulus: 'Perhatikan firman Allah Swt.: وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا. Pesan metodologis yang terkandung dalam ayat tersebut adalah...',
          opsi: { A: 'Membaca secepat mungkin agar target khatam cepat tercapai', B: 'Membaca secara teratur, tenang, jelas makhrajnya, dan merenungkan maknanya', C: 'Hanya membaca terjemahannya tanpa membaca teks Arabnya', D: 'Membaca Al-Qur\'an hanya pada saat ada ujian sekolah' },
          kunci: 'B',
          pembahasan: 'Tartil menuntut ketenangan, ketepatan makhraj dan tajwid, serta penghayatan makna.'
        },
        {
          nomor: 3,
          stimulus: 'Dalam sebuah perlombaan tartil, juri memberikan apresiasi tinggi pada peserta yang melafalkan ayat dengan tenang dan tidak terburu-buru. Alasan ilmiah dan spiritualnya adalah...',
          opsi: { A: 'Agar waktu lomba cepat habis', B: 'Karena tartil mencerminkan penghormatan terhadap kalamullah dan menghadirkan kekhusyukan', C: 'Supaya juri tidak perlu mendengarkan terlalu lama', D: 'Agar penonton bertepuk tangan meriah' },
          kunci: 'B',
          pembahasan: 'Membaca tenang dengan adab memuliakan wahyu Ilahi dan membuka pintu tadabbur qalbu.'
        },
        {
          nomor: 4,
          stimulus: 'Riko melihat temannya, Zaki, merasa malu karena sering salah melafalkan huruf saat tadarus. Tindakan Riko yang mencerminkan teladan hadis Nabi adalah...',
          opsi: { A: 'Menertawakan kesalahan Zaki di depan teman sekelas', B: 'Mengajak Zaki berlatih bersama secara santun dan memberikan dorongan semangat', C: 'Menyuruh Zaki berhenti membaca selamanya', D: 'Meminta guru agar tidak mengikutsertakan Zaki' },
          kunci: 'B',
          pembahasan: 'Menjadi sebaik-baik insan dilakukan dengan saling mengajarkan dan membimbing dengan kasih sayang.'
        },
        {
          nomor: 5,
          stimulus: 'Manfaat utama membaca Al-Qur\'an ditinjau dari kesehatan mental dan emosional anak adalah...',
          opsi: { A: 'Membeli barang-barang baru', B: 'Menstimulasi gelombang otak alfa yang menghadirkan ketenangan dan meredakan kecemasan', C: 'Menjadi terkenal di media sosial', D: 'Membuat suara menjadi lebih keras saat marah' },
          kunci: 'B',
          pembahasan: 'Kajian neurosains membuktikan resonansi tilawah Al-Qur\'an mengaktifkan gelombang otak relaksasi (alfa).'
        },
        {
          nomor: 6,
          stimulus: 'Hukum membaca Al-Qur\'an dengan menggunakan kaidah tajwid bagi setiap muslim adalah...',
          opsi: { A: 'Fardhu Kifayah mempelajari teorinya, Fardhu \'Ain mempraktikkannya saat membaca', B: 'Mubah dan boleh ditinggalkan', C: 'Makruh jika dilakukan setiap hari', D: 'Hanya wajib bagi para imam masjid' },
          kunci: 'A',
          pembahasan: 'Mempraktikkan tajwid saat membaca Al-Qur\'an adalah kewajiban individual (Fardhu \'Ain) agar tidak mengubah makna.'
        },
        {
          nomor: 7,
          stimulus: 'Bagaimana keterkaitan antara pemahaman ayat suci Al-Qur\'an dengan pembentukan karakter anti-bullying di sekolah?',
          opsi: { A: 'Al-Qur\'an melarang saling mengejek (QS. Al-Hujurat: 11) dan memerintahkan persaudaraan yang kokoh', B: 'Al-Qur\'an memperbolehkan mengejek jika hanya untuk bercanda', C: 'Tidak ada hubungannya sama sekali', D: 'Hanya berlaku untuk orang dewasa' },
          kunci: 'A',
          pembahasan: 'Al-Qur\'an secara tegas mengharamkan perundungan verbal, pelabelan buruk, dan mengolok-olok kekurangan sesama.'
        },
        {
          nomor: 8,
          stimulus: 'Saat menemukan tanda waqaf Lazim (مـ) di tengah ayat, tindakan pembaca yang tepat adalah...',
          opsi: { A: 'Wajib terus membaca tanpa berhenti', B: 'Harus berhenti (Waqaf Lazim)', C: 'Boleh memilih antara berhenti atau terus', D: 'Mengulang dari awal surat' },
          kunci: 'B',
          pembahasan: 'Tanda waqaf lazim mewajibkan pembaca untuk berhenti agar tidak merusak kesinambungan makna kalimat.'
        },
        {
          nomor: 9,
          stimulus: 'Salah satu wujud nyata menerapkan pesan Al-Qur\'an di lingkungan keluarga adalah...',
          opsi: { A: 'Berbicara dengan nada tinggi kepada orang tua', B: 'Menghormati orang tua dengan tutur kata santun (Qawlan Karima) dan membantu pekerjaan rumah', C: 'Menolak berbagi makanan dengan adik kandung', D: 'Menonton televisi seharian tanpa salat' },
          kunci: 'B',
          pembahasan: 'Ajaran Al-Qur\'an memerintahkan Birrul Walidain dan berucap dengan kemuliaan adab kepada orang tua.'
        },
        {
          nomor: 10,
          stimulus: 'Tujuan akhir dari mempelajari Al-Qur\'an dan Hadis dalam Kurikulum Merdeka adalah...',
          opsi: { A: 'Sekadar mendapatkan nilai angka 100 di rapor', B: 'Terbentuknya profil insan beriman, bernalar kritis, berakhlak mulia, dan menjadi rahmat bagi semesta', C: 'Agar dipuji oleh banyak orang', D: 'Untuk berdebat dengan teman lain' },
          kunci: 'B',
          pembahasan: 'Pendidikan Islam bermuara pada transformasi kepribadian yang komprehensif (kognitif, afektif, dan psikomotorik berlandaskan tauhid).'
        }
      ],
      soalMenjodohkan: [
        { premis: 'Membaca Al-Qur\'an dengan tartil dan tenang', jawaban: 'Perintah QS. Al-Muzzammil ayat 4' },
        { premis: 'Sebaik-baik manusia di sisi Allah', jawaban: 'Orang yang belajar Al-Qur\'an dan mengajarkannya' },
        { premis: 'Nun mati bertemu huruf Kaf', jawaban: 'Ikhfa Haqiqi (samar berdengung)' },
        { premis: 'Makharijul Huruf', jawaban: 'Tempat keluarnya huruf hijaiyah' },
        { premis: 'Tadabbur Al-Qur\'an', jawaban: 'Merenungkan pesan Ilahi untuk diamalkan' }
      ],
      soalEsaiReflektif: [
        {
          kasus: 'Di kelas, kamu melihat temanmu malu membaca Al-Qur\'an karena suaranya terbata-bata dan takut ditertawakan.',
          pertanyaan: 'Berdasarkan nilai kasih sayang dalam Al-Qur\'an, apa yang akan kamu katakan dan lakukan untuk membantunya?',
          rubrik: 'Jawaban memuat: (1) Kata-kata empati yang menenangkan, (2) Ajakan belajar bersama secara privat tanpa mencela, (3) Menjelaskan bahwa orang yang terbata-bata tetap mendapat dua pahala dari Allah.'
        },
        {
          kasus: 'Banyak anak yang hafal surah pendek tetapi perilakunya masih suka mengejek teman di media sosial atau di kelas.',
          pertanyaan: 'Analisis mengapa hal tersebut bisa terjadi dan solusi apa yang harus dilakukan agar hafalan Al-Qur\'an tercermin dalam perilaku sehari-hari?',
          rubrik: 'Jawaban memuat analisis ketimpangan antara hafalan lisan dengan tadabbur makna, serta solusi pembiasaan refleksi harian (mindful assessment).'
        }
      ],
      misiProyek7Hari: [
        { hari: 'Senin', misi: 'Tadarus 5-10 ayat dengan tartil dan membaca terjemahannya bersama keluarga.' },
        { hari: 'Selasa', misi: 'Mencari 3 hukum tajwid pada surah favorit di buku catatan PAI.' },
        { hari: 'Rabu', misi: 'Membimbing adik/teman melafalkan huruf hijaiyah dengan sabar.' },
        { hari: 'Kamis', misi: 'Menjaga lisan dari kata-kata kasar atau ejekan sepanjang hari sebagai wujud adab Qur\'ani.' },
        { hari: 'Jumat', misi: 'Membaca surah pilihan (seperti Al-Kahfi/Al-Ikhlas) dengan penuh kekhusyukan.' },
        { hari: 'Sabtu', misi: 'Menulis satu ayat motivasi kebaikan dan menempelkannya di meja belajar.' },
        { hari: 'Ahad', misi: 'Menceritakan satu kisah teladan dari Al-Qur\'an kepada orang tua atau sahabat.' }
      ],
      referensi: [
        'Kementerian Agama RI. (2022). Mushaf Al-Qur\'an Standar Indonesia dan Terjemahnya. Jakarta: Lajnah Pentashihan Mushaf Al-Qur\'an.',
        'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. (2024). Buku Teks Utama Pendidikan Agama Islam dan Budi Pekerti SD. Jakarta: Pusat Perbukuan.',
        'Al-Jazari, Ibn. (2018). Matn Al-Jazariyyah fi \'Ilm At-Tajwid. Beirut: Dar Al-Kutub Al-\'Ilmiyyah.',
        'Shihab, M. Quraish. (2020). Tafsir Al-Mishbah: Pesan, Kesan dan Keserasian Al-Qur\'an. Jakarta: Lentera Hati.'
      ]
    };
  }

  // 2. Domain: Akidah & Asmaul Husna
  if (m.includes('akidah') || m.includes('aqidah') || m.includes('asmaul') || m.includes('husna') || m.includes('iman') || m.includes('allah') || m.includes('malaikat') || m.includes('rasul') || m.includes('kitab') || m.includes('kiamat') || m.includes('akhir') || m.includes('qada') || m.includes('qadar') || m.includes('tauhid') || e.includes('akidah')) {
    return {
      istilahKunci: [
        { istilah: 'Tauhid (تَوْحِيد)', definisi: 'Mengesakan Allah Swt. dalam Dzat, Sifat, Nama (Asmaul Husna), dan Perbuatan-Nya tanpa menyekutukan-Nya dengan apa pun.' },
        { istilah: 'Asmaul Husna (الأَسْمَاءُ الْحُسْنَى)', definisi: 'Nama-nama Allah Swt. yang maha indah, sempurna, dan agung yang mencerminkan sifat kemuliaan-Nya.' },
        { istilah: 'Muraqabatullah (مُرَاقَبَةُ الله)', definisi: 'Kesadaran batin yang mendalam bahwa Allah Swt. senantiasa mengawasi setiap gerak-gerik, ucapan, dan bisikan hati manusia.' },
        { istilah: 'Tawakal (تَوَكُّل)', definisi: 'Berserah diri sepenuhnya kepada ketetapan Allah Swt. setelah berikhtiar sungguh-sungguh dengan cara yang benar.' }
      ],
      pengantarBab: `Mengenal Allah Swt. melalui pemahaman ${materiRaw} adalah pilar fondasi kehidupan seorang muslim. Akidah Islam bukan sekadar dogma teologis teoretis, melainkan kompas spiritual yang memandu akal budi, membersihkan hati nurani, dan membebaskan jiwa dari ketakutan serta ketergantungan semu pada makhluk. Menyelami keagungan sifat Allah menumbuhkan rasa cinta (*Mahabbah*), harapan (*Raja'*), dan pengawasan diri (*Muraqabah*) dalam setiap hembusan nafas.`,
      studiKasusAwal: {
        judul: 'Kamera Tersembunyi di Alam Semesta dan Bisikan Hati Nurani',
        narasi: `Siang itu di kantin kejujuran sekolah, Rayyan hendak membeli sebotol jus buah. Kotak pembayaran diletakkan di samping etalase tanpa ada penjaga yang mengawasi. Saat Rayyan membuka dompetnya, uang logamnya kurang lima ratus rupiah. Teman di sampingnya berbisik, "Sudah, ambil saja Rayyan, tidak ada guru atau kamera CCTV yang melihat!" Rayyan terdiam sejenak. Ia teringat pelajaran Akidah tentang sifat Allah Yang Maha Mengetahui (*Al-\'Alim*) dan Maha Teliti (*Al-Khabir*). Rayyan tersenyum tenang dan meletakkan kembali jus tersebut, "Meskipun manusia tidak melihat, Allah Maha Mengawasi setiap niat dan langkah kita. Kejujuran adalah bukti cintaku kepada Allah." Sikap Rayyan membuat temannya terpana dan menyadari betapa indahnya rasa takut dan cinta kepada Sang Maha Pengawas.`,
        pertanyaanKritis: [
          'Mengapa keyakinan bahwa Allah Maha Mengetahui mampu membentengi seseorang dari perbuatan curang meskipun saat sendirian?',
          'Bagaimana cara meneladani sifat-sifat mulia Allah (Asmaul Husna) dalam pergaulan sehari-hari di sekolah?',
          'Pernahkah kamu merasakan pertolongan Allah yang hadir tepat pada saat kamu membutuhkannya?'
        ]
      },
      kajianOntologis: `Secara ontologis, Akidah berakar dari kata *'Aqada-Ya'qidu-'Aqdan* (عَقَدَ - يَعْقِدُ - عَقْدًا) yang bermakna ikatan kokoh yang mengikat hati nurani manusia dengan Sang Khalik. Dalam tradisi teologi Ahlus Sunnah wal Jama'ah, mengenal nama dan sifat Allah adalah kewajiban primordial akal (*Ma'rifatullah*). Asmaul Husna bukan sekadar nama sebutan, melainkan sumber inspirasi etika tertinggi bagi manusia untuk memantulkan nilai-nilai keadilan, kasih sayang, kejujuran, dan kemurahan hati dalam realitas kehidupan sosial.`,
      dalilQuran: {
        surah: 'QS. Al-A\'raf [7]: 180',
        arab: 'وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا',
        latin: 'Wa Lillaahil-Asmaa\'ul-Husnaa Fad\'uuhu Bihaa',
        terjemah: '"Dan Allah memiliki Asmaul Husna (nama-nama yang terbaik), maka bermohonlah kepada-Nya dengan menyebut Asmaul Husna itu..." (QS. Al-A\'raf: 180)',
        tafsir: 'Ayat ini memerintahkan umat manusia untuk berzikir, berdoa, dan menyelami nama-nama terindah Allah. Menyebut nama-Nya bukan hanya secara lisan, melainkan mentransformasikan makna keluhuran sifat tersebut ke dalam kepribadian sehari-hari (Takhalluq bi Akhlaaqillah).'
      },
      hadisNabi: {
        rawi: 'HR. Bukhari No. 2736 & Muslim No. 2677 dari Abu Hurairah r.a.',
        arab: 'إِنَّ لِلَّهِ تِسْعَةً وَتِسْعِينَ اسْمًا، مِائَةً إِلَّا وَاحِدًا، مَنْ أَحْصَاهَا دَخَلَ الْجَنَّةَ',
        latin: 'Inna Lillaahi Tis\'atan Wa Tis\'iina Isman, Mi\'atan Illaa Waahidan, Man Ahshaahaa Dakhalal-Jannah',
        terjemah: '"Sesungguhnya Allah memiliki 99 nama, seratus kurang satu. Barangsiapa yang menghitungnya (menghafal, memahami, dan mengamalkan maknanya), niscaya ia masuk surga."',
        syarah: 'Imam An-Nawawi menjelaskan kata "Ahshaahaa" mencakup tiga tingkatan: menghafal lafalnya, memahami makna teologisnya, dan menyelaraskan perilaku diri dengan nilai keluhuran nama-nama tersebut.'
      },
      wawasanSainsSejarah: {
        subjudul: 'Keteraturan Kosmologi Alam & Bukti Keagungan Sang Maha Pencipta',
        uraian: 'Fisika astrofisika modern menemukan prinsip keteraturan halus (*Fine-Tuning Universe*), di mana konstanta gravitasi, gaya elektromagnetik, dan rotasi planet bergerak dengan presisi matematis sempurna. Jika gaya gravitasi bumi bergeser 0,000001% saja, kehidupan di bumi akan musnah seketika. Keteraturan nan agung ini menjadi bukti empiris yang tak terbantahkan atas sifat Allah Yang Maha Berilmu (*Al-\'Alim*), Maha Bijaksana (*Al-Hakim*), dan Maha Pemelihara (*Al-Qayyum*).'
      },
      tabelKarakter: [
        { terpuji: 'Selalu bersikap jujur saat ujian karena sadar Allah Maha Melihat (*Al-Bashir*).', tercela: 'Menyontek atau berbuat curang saat guru tidak melihat di kelas.' },
        { terpuji: 'Berbagi rezeki dan menolong teman sebagai pantulan sifat Maha Pemberi (*Al-Wahhab*).', tercela: 'Kikir, pelit, dan merasa bahwa harta adalah hasil usaha sendiri semata.' },
        { terpuji: 'Rendah hati dan tidak menyombongkan kepintaran karena ilmu adalah titipan Allah.', tercela: 'Sombong, meremehkan teman yang kurang pintar, dan pamer prestasi.' },
        { terpuji: 'Berikhtiar giat lalu bertawakal dengan penuh kedamaian batin.', tercela: 'Putus asa, menyalahkan keadaan, atau mengeluh saat mengalami kegagalan.' },
        { terpuji: 'Menjaga alam dan makhluk hidup sebagai bentuk takzim kepada Sang Khalik.', tercela: 'Merusak fasilitas umum, menyiksa hewan, dan mengotori lingkungan.' }
      ],
      dialogTematik: {
        tokoh: 'Rayyan dan Dimas saat mempersiapkan ulangan',
        naskah: `- **Dimas**: "Rayyan, bagaimana caramu tetap tenang saat menghadapi ujian yang sulit?"\n- **Rayyan**: "Aku berusaha belajar sungguh-sungguh, lalu berdoa kepada Allah Al-\'Alim dan bertawakal. Aku yakin Allah Maha Mengetahui setiap ikhtiar kita dan memberikan hasil yang paling berkah."\n- **Dimas**: "Benar sekali ya, hati jadi jauh lebih damai dan tidak tergoda untuk berbuat curang!"`
      },
      hikmahMateri: [
        'Menanamkan integritas moral yang kokoh (*Muraqabah*) di setiap waktu dan tempat.',
        'Membersihkan hati dari rasa sombong, dengki, dan keputusasaan.',
        'Melahirkan optimisme tinggi dan ketenteraman batin dalam menghadapi dinamika hidup.',
        'Membangun empati sosial tinggi sebagai manifestasi rahmat Allah di muka bumi.',
        'Meraih ridha, keselamatan, dan kebahagiaan sejati di dunia dan akhirat.'
      ],
      aktivitasDeepLearning: {
        mindful: 'Duduk tafakur di luar kelas mengamati langit dan dedaunan, merenungkan betapa telitinya Allah memelihara alam semesta.',
        meaningful: 'Studi kasus kantin kejujuran: Menganalisis bagaimana keyakinan terhadap Asmaul Husna dapat memecahkan krisis kejujuran.',
        joyful: 'Pohon Asmaul Husna: Menuliskan komitmen akhlak mulia pada daun kertas warna-warni dan menempelkannya di pohon kebaikan kelas.'
      },
      intisariPoin: [
        'Akidah adalah landasan pokok keimanan yang menyatukan hati manusia dengan Allah Swt.',
        'Asmaul Husna mencerminkan kesempurnaan sifat-sifat Allah yang wajib kita teladani maknanya.',
        'Muraqabatullah menumbuhkan kejujuran sejati dari dalam lubuk hati nurani.',
        'Keteraturan alam semesta adalah bukti ilmiah nyata atas keesaan dan keluasan ilmu Allah.',
        'Seorang muslim sejati senantiasa berikhtiar maksimal dan bertawakal penuh kepada Allah.'
      ],
      soalHots: [
        {
          nomor: 1,
          stimulus: 'Ketika menemukan uang tercecer di lorong sekolah tanpa pemilik, Arman segera menyerahkannya kepada guru piket. Sikap Arman didorong oleh keyakinan pada sifat Allah...',
          opsi: { A: 'Al-Khabir dan Al-Bashir (Maha Mengetahui dan Maha Melihat)', B: 'Al-Mumit (Maha Mematikan)', C: 'Al-Qahhar (Maha Menaklukkan)', D: 'Al-Kabir (Maha Besar)' },
          kunci: 'A',
          pembahasan: 'Keyakinan bahwa Allah Maha Melihat dan Maha Mengetahui melahirkan kejujuran moral tanpa perlu pengawasan manusia.'
        },
        {
          nomor: 2,
          stimulus: 'Keteraturan peredaran bumi mengelilingi matahari tanpa pernah bertabrakan menunjukkan bukti nyata bahwa Allah bersifat...',
          opsi: { A: 'Al-Khaliq dan Al-Hakim (Maha Pencipta dan Maha Bijaksana)', B: 'Ghafur (Maha Pengampun)', C: 'Tawwab (Maha Penerima Taubat)', D: 'Halim (Maha Penyantun)' },
          kunci: 'A',
          pembahasan: 'Presisi hukum kosmologi adalah bukti keilmuan dan kebijaksanaan Sang Pencipta dalam merancang alam semesta.'
        },
        {
          nomor: 3,
          stimulus: 'Bagaimana cara seorang murid meneladani sifat Allah "Al-Wahhab" (Maha Pemberi Karunia) di lingkungan pertemanan?',
          opsi: { A: 'Menghabiskan bekal makanan sendiri di tempat tersembunyi', B: 'Rela meminjamkan alat tulis dan membantu teman yang kesulitan tanpa mengharap balasan', C: 'Hanya mau menolong teman yang kaya', D: 'Menuntut imbalan setiap kali menolong teman' },
          kunci: 'B',
          pembahasan: 'Al-Wahhab diteladani dengan kedermawanan, kerelaan memberi, dan keikhlasan tolong-menolong.'
        },
        {
          nomor: 4,
          stimulus: 'Makna paling mendalam dari sabda Nabi Saw. "Man Ahshaahaa Dakhalal-Jannah" terkait Asmaul Husna adalah...',
          opsi: { A: 'Hanya menghafal lafalnya tanpa memahami maknanya', B: 'Menghafal, memahami maknanya, serta menginternalisasikannya dalam perilaku sehari-hari', C: 'Menulisnya di secarik kertas untuk jimat', D: 'Membacanya hanya saat sedang tertimpa musibah' },
          kunci: 'B',
          pembahasan: 'Ihsan Asmaul Husna menuntut kognisi (hafalan/pemahaman) dan aplikasi afektif-psikomotorik nyata.'
        },
        {
          nomor: 5,
          stimulus: 'Dampak psikologis yang dirasakan oleh seorang anak yang memiliki ketauhidan yang murni adalah...',
          opsi: { A: 'Selalu cemas dan takut berlebihan', B: 'Memiliki ketenangan jiwa (*thuma\'ninah*), keberanian membela kebenaran, dan tidak mudah putus asa', C: 'Merasa lebih unggul daripada orang lain', D: 'Menjadi malas berusaha karena merasa semuanya sudah diatur' },
          kunci: 'B',
          pembahasan: 'Tauhid membebaskan jiwa dari ketakutan duniawi dan menumbuhkan rasa aman batin yang mendalam.'
        },
        {
          nomor: 6,
          stimulus: 'Ketika mendapatkan nilai ulangan yang belum memuaskan padahal sudah belajar giat, sikap akidah yang tepat adalah...',
          opsi: { A: 'Menyalahkan guru dan teman', B: 'Bersabar, berprasangka baik (*Husnuzan*) kepada Allah, dan mengevaluasi cara belajar dengan semangat baru', C: 'Berhenti belajar dan putus asa', D: 'Merobek lembar jawaban ujian' },
          kunci: 'B',
          pembahasan: 'Keimanan kepada takdir Allah menuntut introspeksi, optimisme, dan ikhtiar yang berkelanjutan.'
        },
        {
          nomor: 7,
          stimulus: 'Perbedaan mendasar antara ilmu manusia dengan ilmu Allah Swt. (*Al-\'Alim*) adalah...',
          opsi: { A: 'Ilmu manusia tidak terbatas, sedangkan ilmu Allah terbatas', B: 'Ilmu Allah meliputi yang ghaib dan nyata tanpa batas, sedangkan ilmu manusia sangat terbatas dan merupakan anugerah Allah', C: 'Manusia mengetahui masa depan secara pasti', D: 'Tidak ada perbedaan sama sekali' },
          kunci: 'B',
          pembahasan: 'Keluasan ilmu Allah mencakup masa lalu, kini, masa depan, dan alam ghaib secara mutlak.'
        },
        {
          nomor: 8,
          stimulus: 'Perilaku seorang siswa yang mengamalkan keyakinan kepada Malaikat Raqib dan Atid di media sosial adalah...',
          opsi: { A: 'Menyebarkan kabar bohong (*hoaks*) yang belum terbukti kebenarannya', B: 'Menulis komentar positif, menyebarkan ilmu yang bermanfaat, dan menghindari ujaran kebencian', C: 'Menggunakan akun palsu untuk mengejek orang lain', D: 'Memamerkan kemewahan secara berlebihan' },
          kunci: 'B',
          pembahasan: 'Keyakinan pada malaikat pencatat amal mendisiplinkan jemari dan lisan dalam era digital.'
        },
        {
          nomor: 9,
          stimulus: 'Mengapa menyekutukan Allah (*Syirik*) dikategorikan sebagai kezaliman terbesar dalam Al-Qur\'an (QS. Luqman: 13)?',
          opsi: { A: 'Karena syirik menempatkan sesuatu tidak pada tempatnya dan mengingkari Sang Pencipta sejati', B: 'Karena membuat tubuh menjadi lelah', C: 'Karena dilarang oleh peraturan sekolah', D: 'Karena membutuhkan banyak biaya' },
          kunci: 'A',
          pembahasan: 'Syirik menodai fitrah penciptaan dan mengingkari nikmat mutlak dari Sang Khalik.'
        },
        {
          nomor: 10,
          stimulus: 'Bagaimana keterkaitan pemahaman Asmaul Husna dengan pencegahan perundungan (*bullying*) di lingkungan sekolah?',
          opsi: { A: 'Menyadari bahwa setiap manusia adalah ciptaan Allah yang mulia dan menzalimi sesama akan dimintai pertanggungjawaban di hadapan Allah', B: 'Tidak memiliki kaitan sama sekali', C: 'Hanya perlu menghafal nama-nama malaikat', D: 'Membuat siswa saling menjauhi satu sama lain' },
          kunci: 'A',
          pembahasan: 'Kesadaran teologis melahirkan penghormatan mutlak terhadap martabat setiap insan ciptaan Allah.'
        }
      ],
      soalMenjodohkan: [
        { premis: 'Al-\'Alim', jawaban: 'Allah Maha Mengetahui segala sesuatu' },
        { premis: 'Al-Khabir', jawaban: 'Allah Maha Teliti dan Waspada' },
        { premis: 'Al-Bashir', jawaban: 'Allah Maha Melihat segala perbuatan' },
        { premis: 'Muraqabatullah', jawaban: 'Merasa selalu diawasi oleh Allah' },
        { premis: 'Tawakal', jawaban: 'Berserah diri setelah berikhtiar maksimal' }
      ],
      soalEsaiReflektif: [
        {
          kasus: 'Di kelas tidak ada guru, dan ada kesempatan bagi seorang siswa untuk menyontek kunci jawaban ujian yang tertinggal di meja.',
          pertanyaan: 'Jelaskan bagaimana konsep Asmaul Husna Al-Bashir dan Al-Khabir dapat menuntun keputusan moral siswa tersebut!',
          rubrik: 'Jawaban menguraikan pemahaman bahwa pandangan Allah tidak terhalang ruang/waktu, serta keutamaan integritas batin di atas nilai semu.'
        },
        {
          kasus: 'Banyak orang merasa cemas berlebihan dan putus asa ketika cita-citanya belum tercapai.',
          pertanyaan: 'Bagaimana akidah tauhid dan konsep tawakal memberikan ketahanan mental (*resilience*) bagi seorang muslim?',
          rubrik: 'Jawaban memuat penjelasan tentang hikmah takdir, optimisme ikhtiar, serta keyakinan bahwa rencana Allah selalu yang terbaik.'
        }
      ],
      misiProyek7Hari: [
        { hari: 'Senin', misi: 'Menghafalkan 3 Asmaul Husna beserta artinya dan menuliskannya dengan kaligrafi indah.' },
        { hari: 'Selasa', misi: 'Mempraktikkan sifat Al-Wahhab dengan berbagi bekal kepada sahabat cilik.' },
        { hari: 'Rabu', misi: 'Menahan diri dari berbohong atau berbuat curang sepanjang hari (Misi Kejujuran Al-Bashir).' },
        { hari: 'Kamis', misi: 'Melakukan tadabbur ciptaan Allah di halaman rumah dan mencatat keajaiban ciptaan-Nya.' },
        { hari: 'Jumat', misi: 'Memperbanyak doa dengan melafalkan Asmaul Husna yang sesuai dengan hajat kebaikan.' },
        { hari: 'Sabtu', misi: 'Membantu orang tua dengan ikhlas tanpa mengeluh sebagai wujud syukur kepada Sang Pemberi.' },
        { hari: 'Ahad', misi: 'Mendoakan kebaikan bagi guru, orang tua, dan seluruh kaum muslimin.' }
      ],
      referensi: [
        'Kementerian Agama RI. (2023). Akidah Akhlak Madrasah Ibtidaiyah. Jakarta: Ditjen Pendis Kemenag.',
        'Al-Ghazali, Imam. (2019). Al-Maqshad Al-Asna fi Syarh Asma\' Allah Al-Husna. Kairo: Dar As-Salam.',
        'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. (2024). Capaian Pembelajaran PAI SD. Jakarta: BSKAP.',
        'Ibnu Katsir. (2017). Tafsir Al-Qur\'an Al-\'Azhim. Riyadh: Dar Thayyibah.'
      ]
    };
  }

  // 3. Domain: Fikih & Ibadah (Wudhu, Salat, Zakat, Puasa, Thaharah)
  if (m.includes('fikih') || m.includes('fiqih') || m.includes('wudhu') || m.includes('wudu') || m.includes('salat') || m.includes('shalat') || m.includes('sholat') || m.includes('thaharah') || m.includes('bersuci') || m.includes('tayamum') || m.includes('tayammum') || m.includes('zakat') || m.includes('puasa') || m.includes('haji') || m.includes('halal') || m.includes('haram') || m.includes('adzan') || m.includes('azan') || m.includes('iqamah') || e.includes('fikih')) {
    return {
      istilahKunci: [
        { istilah: 'Thaharah (طَهَارَة)', definisi: 'Mensucikan diri dari hadas kecil, hadas besar, serta najis dengan air mutlak atau debu suci sesuai syariat.' },
        { istilah: 'Rukun Ibadah (أَرْكَانُ الْعِبَادَةِ)', definisi: 'Rangkaian amalan pokok yang wajib ada dan dilakukan secara berurutan (*tertib*) agar suatu ibadah sah.' },
        { istilah: 'Khusyuk (خُشُوع)', definisi: 'Hadirnya hati, ketenangan anggota badan, serta kesadaran penuh saat menghadap Allah Swt. dalam ibadah.' },
        { istilah: 'Hikmatut Tasyri\' (حِكْمَةُ التَّشْرِيعِ)', definisi: 'Maksud luhur, rahasia spiritual, serta kemaslahatan medis/sosial di balik pensyariatan suatu hukum fikih.' }
      ],
      pengantarBab: `Ibadah dalam Islam melalui pembahasan ${materiRaw} adalah jembatan penghambaan hamba kepada Sang Khalik. Fikih bukan sekadar tata aturan ritual yang kaku, melainkan seni disiplin diri, pembersihan raga dan jiwa, serta perwujudan solidaritas sosial. Setiap tetesan air wudhu, setiap sujud dalam salat, dan setiap infak yang disalurkan memancarkan energi kebaikan yang menyucikan batin dan mendamaikan tatanan peradaban manusia.`,
      studiKasusAwal: {
        judul: 'Pancaran Kejernihan di Balik Gemericik Air Wudhu',
        narasi: `Bel istirahat berbunyi nyaring dan waktu salat zuhur berjamaah telah tiba. Di tempat wudhu musala sekolah, tampak antrean murid yang berbaris rapi. Malik memperhatikan temannya, Dani, yang membuka keran air terlalu besar hingga air memercik ke mana-mana dan terbuang sia-sia. Dengan senyuman hangat, Malik menyapa Dani dan mengecilkan aliran keran, "Dani, Rasulullah Saw. mengajarkan agar kita berhemat air saat berwudhu meskipun berada di tepi sungai yang mengalir deras. Wudhu yang sempurna adalah wudhu yang tertib, tenang, dan tidak berlebih-lebihan." Dani tersenyum malu dan berterima kasih. Ketika seluruh anggota wudhu dibasuh dengan rapi dan tertib, wajah kedua sahabat itu tampak segar, berseri-seri, dan siap menghadap Allah Swt. dengan khusyuk.`,
        pertanyaanKritis: [
          'Mengapa Islam sangat menekankan kebersihan fisik (*thaharah*) sebagai syarat mutlak sahnya ibadah salat?',
          'Bagaimana cara menjaga kekhusyukan salat di tengah banyaknya gangguan pikiran dan kebisingan?',
          'Apa dampak ibadah salat dan wudhu yang benar terhadap perilaku sopan santun seorang siswa di sekolah?'
        ]
      },
      kajianOntologis: `Secara etimologis, Fikih berakar dari kata *Faqiha-Yafqahu-Fiqhan* (فَقِهَ - يَفْقَهُ - فِقْهًا) yang bermakna pemahaman yang mendalam. Secara terminologis menurut Imam Syafi'i, fikih adalah ilmu tentang hukum-hukum syariat amaliyah yang digali dari dalil-dalil tafshili (Al-Qur'an dan Sunnah). Pensyariatan fikih ibadah senantiasa memadukan dimensi kebersihan jasmani (*Nazhafah*), kesucian rohani (*Thaharah Qalbiyyah*), dan kemaslahatan umat (*Mashlahah \'Ammah*).`,
      dalilQuran: {
        surah: 'QS. Al-Baqarah [2]: 222 & QS. Al-Ma\'idah [5]: 6',
        arab: 'إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ',
        latin: 'Innallaaha Yuhibbut-Tawwaabiina Wa Yuhibbul-Mutathahhiriin',
        terjemah: '"Sesungguhnya Allah menyukai orang-orang yang bertaubat dan menyukai orang-orang yang mensucikan diri." (QS. Al-Baqarah: 222)',
        tafsir: 'Ayat ini menegaskan kecintaan Allah yang berlipat ganda kepada hamba yang memadukan antara kesucian batin (taubat dari dosa) dan kesucian lahiriah (bersuci dari hadas dan najis).'
      },
      hadisNabi: {
        rawi: 'HR. Muslim No. 223 dari Abu Malik Al-Asy\'ari r.a.',
        arab: 'الطُّهُورُ شَطْرُ الْإِيمَانِ',
        latin: 'Ath-Thuhuuru Syathrul-Iimaan',
        terjemah: '"Bersuci (kebersihan) itu adalah separuh dari keimanan."',
        syarah: 'Imam An-Nawawi menjelaskan bahwa iman menghapus kotoran batin kemusyrikan, sedangkan bersuci menghapus kotoran lahiriah. Kesempurnaan iman hanya terwujud jika kebersihan lahir dan batin berpadu harmonis.'
      },
      wawasanSainsSejarah: {
        subjudul: 'Fakta Medis Hidroterapi Wudhu & Stimulasi Titik Akupresur Tubuh',
        uraian: 'Riset kedokteran neurologi modern membuktikan bahwa membasuh wajah, tangan hingga siku, mengusap kepala, membasuh telinga, dan mencuci kaki dengan air mengalir merangsang ratusan ujung saraf akupresur perifer. Basuhan air dingin menstabilkan denyut jantung, meredakan ketegangan otot leher, melancarkan sirkulasi darah ke otak, serta secara higienis membersihkan mikrobioma patogen dan bakteri di area hidung dan mulut.'
      },
      tabelKarakter: [
        { terpuji: 'Tertib membasuh rukun wudhu secara sempurna dan hemat menggunakan air.', tercela: 'Membuka keran air sangat deras dan bermain-main air di tempat wudhu.' },
        { terpuji: 'Menjaga kerapian saf salat berjamaah, merapatkan barisan tanpa dorong-mendorong.', tercela: 'Bercanda, menyenggol teman, atau berbicara saat iktidal dan sujud.' },
        { terpuji: 'Menjaga kebersihan pakaian dan musala sekolah dari kotoran dan najis.', tercela: 'Masuk musala dengan kaos kaki kotor atau meninggalkan sampah di tempat salat.' },
        { terpuji: 'Melaksanakan salat tepat waktu dengan penuh kerinduan kepada Allah.', tercela: 'Menunda-nunda salat hingga hampir habis waktunya karena asyik bermain game.' },
        { terpuji: 'Memberikan infak sedekah secara diam-diam demi membantu teman yang kesusahan.', tercela: 'Pamer (*Riya\'*) saat memasukkan uang ke kotak amal agar dipuji orang lain.' }
      ],
      dialogTematik: {
        tokoh: 'Dani dan Malik saat mengantre wudhu di musala',
        naskah: `- **Dani**: "Malik, kenapa kamu selalu berwudhu dengan tenang dan tidak terburu-buru?"\n- **Malik**: "Karena wudhu adalah kunci pembuka salat kita, Dani. Rasulullah Saw. bersabda bahwa ketika kita membasuh anggota wudhu, dosa-dosa kecil kita berguguran bersama tetesan airnya."\n- **Dani**: "Masya Allah, indah sekali ya! Mulai sekarang aku akan berwudhu dengan tertib dan khusyuk."`
      },
      hikmahMateri: [
        'Menjaga kesehatan fisik dan menghindarkan tubuh dari berbagai kuman penyakit.',
        'Membiasakan hidup disiplin, tepat waktu, dan menghargai tata tertib.',
        'Melahirkan ketenteraman jiwa dan memancarkan cahaya kebaikan (*Nurul Ibadah*).',
        'Mencegah perbuatan keji dan mungkar (*Tanhaa \'anil Fahsyaa-i wal Munkar*).',
        'Menumbuhkan rasa persaudaraan dan kesetaraan derajat manusia dalam salat berjamaah.'
      ],
      aktivitasDeepLearning: {
        mindful: 'Latihan hening sebelum takbiratul ihram: Menghadirkan kesadaran bahwa kita sedang berdiri langsung di hadapan Allah Yang Maha Agung.',
        meaningful: 'Praktik demonstrasi berpasangan: Mengoreksi gerakan wudhu dan bacaan salat teman secara santun berbasis checklist fikih.',
        joyful: 'Simulasi azan dan saf salat berjamaah yang rapi di musala sekolah dengan apresiasi duta kedisiplinan.'
      },
      intisariPoin: [
        'Fikih ibadah adalah pedoman praktis untuk menyempurnakan penghambaan kepada Allah.',
        'Thaharah (bersuci) adalah syarat mutlak diterimanya salat dan separuh dari keimanan.',
        'Salat yang khusyuk mencegah pelakunya dari perbuatan keji, mungkar, dan kata-kata kotor.',
        'Hemat air dalam berwudhu merupakan sunnah Nabi dan bentuk kepedulian pada kelestarian alam.',
        'Ibadah berjamaah menanamkan nilai kerukunan, kesetaraan, dan persaudaraan tanpa sekat.'
      ],
      soalHots: [
        {
          nomor: 1,
          stimulus: 'Ketika berwudhu di sekolah, Zaid membasuh wajah, tangan, kaki, namun lupa tidak mengusap sebagian kepala. Hukum wudhu Zaid adalah...',
          opsi: { A: 'Sah karena yang penting sudah membasuh wajah', B: 'Tidak sah karena mengusap kepala termasuk rukun wudhu yang wajib dipenuhi', C: 'Makruh tetapi salatnya tetap sah', D: 'Cukup diganti dengan membaca istighfar' },
          kunci: 'B',
          pembahasan: 'Mengusap kepala adalah salah satu rukun wudhu wajib (QS. Al-Ma\'idah: 6). Meninggalkan rukun membatalkan keabsahan wudhu.'
        },
        {
          nomor: 2,
          stimulus: 'Rasulullah Saw. menegur sahabat yang membuka keran air terlalu besar saat wudhu. Pesan ekologis yang terkandung di dalamnya adalah...',
          opsi: { A: 'Larangan bersikap boros (*Israf*) dan kewajiban menjaga kelestarian sumber daya alam', B: 'Air wudhu harus selalu air hangat', C: 'Wudhu tidak perlu menggunakan air', D: 'Boleh boros jika airnya gratis' },
          kunci: 'A',
          pembahasan: 'Islam melarang pemborosan (*tabdzir/israf*) dalam segala hal termasuk air wudhu.'
        },
        {
          nomor: 3,
          stimulus: 'Perhatikan firman Allah: إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ. Kriteria keberhasilan salat seorang siswa tercermin pada...',
          opsi: { A: 'Pakaian salatnya yang selalu paling mahal', B: 'Perilakunya yang santun, tidak berbohong, dan menolak perundungan di sekolah', C: 'Kecepatan dalam menyelesaikan rakaat salat', D: 'Berapa kali dia dipuji oleh orang lain' },
          kunci: 'B',
          pembahasan: 'Indikator salat yang mabrur adalah terbentuknya benteng moral dari kemungkaran dan perilaku tercela.'
        },
        {
          nomor: 4,
          stimulus: 'Dalam salat berjamaah, posisi saf makmum laki-laki yang benar adalah...',
          opsi: { A: 'Berdiri renggang dan berjauhan', B: 'Rapat dan lurus mengikuti aba-aba imam', C: 'Bebas berdiri di mana saja sesuka hati', D: 'Duduk santai di belakang makmum lain' },
          kunci: 'B',
          pembahasan: 'Merapatkan dan meluruskan saf adalah kesempurnaan salat berjamaah dan simbol persatuan umat.'
        },
        {
          nomor: 5,
          stimulus: 'Manfaat wudhu ditinjau dari ilmu kesehatan dan kedokteran adalah...',
          opsi: { A: 'Menghilangkan rasa kantuk dan membersihkan bakteri patogen di saluran pernapasan dan kulit', B: 'Membuat pakaian menjadi basah', C: 'Mengurangi berat badan seketika', D: 'Hanya mendinginkan tubuh saat kepanasan' },
          kunci: 'A',
          pembahasan: 'Secara medis berkumur dan istinsyaq terbukti membersihkan mikrobioma berbahaya di nasofaring.'
        },
        {
          nomor: 6,
          stimulus: 'Hal yang membatalkan wudhu di bawah ini adalah...',
          opsi: { A: 'Berbicara kata-kata santun', B: 'Keluarnya sesuatu dari qubul atau dubur (seperti buang angin)', C: 'Meminum air putih yang bersih', D: 'Membaca buku pelajaran' },
          kunci: 'B',
          pembahasan: 'Keluarnya hadas dari dua jalan (qubul/dubur) secara ijma\' ulama membatalkan thaharah wudhu.'
        },
        {
          nomor: 7,
          stimulus: 'Sikap yang tepat saat muazin mengumandangkan azan di musala sekolah adalah...',
          opsi: { A: 'Tetap asyik berteriak dan bermain bola', B: 'Menghentikan aktivitas sejenak, mendengarkan dengan khusyuk, dan menjawab lafal azan', C: 'Menirukan suara azan dengan nada mengejek', D: 'Menutup telinga rapat-rapat' },
          kunci: 'B',
          pembahasan: 'Adab menyimak dan menjawab panggilan azan adalah sunnah muakkadah yang mendatangkan syafaat Nabi.'
        },
        {
          nomor: 8,
          stimulus: 'Tujuan utama dari pensyariatan Zakat Fitrah pada bulan Ramadhan adalah...',
          opsi: { A: 'Pamer kekayaan di depan warga desa', B: 'Mensucikan jiwa orang yang berpuasa dan menggembirakan fakir miskin di hari raya', C: 'Mendapatkan imbalan hadiah dari pemerintah', D: 'Menghabiskan persediaan beras di rumah' },
          kunci: 'B',
          pembahasan: 'Zakat fitrah berfungsi ganda: membersihkan noda puasa (*thuhrah li sh-shaa-im*) dan santunan sosial (*thu\'mah lil masaakiin*).'
        },
        {
          nomor: 9,
          stimulus: 'Tata cara tayammum yang benar sebagai pengganti wudhu saat tidak ada air adalah...',
          opsi: { A: 'Mengusap seluruh tubuh dengan pasir', B: 'Menepuk debu suci lalu mengusap wajah dan kedua tangan hingga siku', C: 'Membasuh kaki dengan tanah basah', D: 'Cukup mencuci muka dengan kain' },
          kunci: 'B',
          pembahasan: 'Rukun tayammum adalah niat, mengusap wajah, dan mengusap kedua tangan hingga siku dengan debu suci.'
        },
        {
          nomor: 10,
          stimulus: 'Hubungan antara tertib dalam rukun wudhu dengan pembentukan karakter disiplin siswa adalah...',
          opsi: { A: 'Melatih anak untuk selalu patuh pada aturan dan tata urutan yang sistematis dalam hidup', B: 'Tidak ada korelasi perilaku', C: 'Membuat anak menjadi lambat dalam bekerja', D: 'Hanya formalitas ibadah di musala' },
          kunci: 'A',
          pembahasan: 'Kepatuhan pada urutan rukun (*tartib*) menanamkan pola pikir terstruktur dan disiplin sistemik.'
        }
      ],
      soalMenjodohkan: [
        { premis: 'Syarat Sah Salat', jawaban: 'Suci dari hadas kecil dan hadas besar' },
        { premis: 'Rukun Wudhu', jawaban: 'Membasuh wajah dan mengusap sebagian kepala' },
        { premis: 'Hikmah Salat', jawaban: 'Mencegah perbuatan keji dan mungkar' },
        { premis: 'Sunnah Wudhu', jawaban: 'Membaca basmalah dan berkumur-kumur' },
        { premis: 'Tayammum', jawaban: 'Bersuci menggunakan debu yang suci saat darurat' }
      ],
      soalEsaiReflektif: [
        {
          kasus: 'Seorang siswa sering terburu-buru saat salat zuhur di sekolah hingga bacaan rukuk dan sujudnya tidak terdengar jelas demi cepat bermain game.',
          pertanyaan: 'Analisis dampak dari salat yang tidak thuma\'ninah terhadap ketenangan batin dan berikan solusi perbaikannya!',
          rubrik: 'Jawaban menguraikan syarat thuma\'ninah sebagai rukun salat, bahaya terburu-buru, dan langkah menghadirkan khusyuk (mindful prayer).'
        },
        {
          kasus: 'Tempat wudhu sekolah sering basah becek dan keran air dibiarkan mengucur oleh anak-anak.',
          pertanyaan: 'Rancanglah 3 langkah aksi nyata peduli musala sekolah yang bisa kamu lakukan bersama teman kelas!',
          rubrik: 'Jawaban memuat: (1) Kampanye hemat air wudhu, (2) Jadwal piket kebersihan musala, (3) Pemasangan poster adab wudhu ramah anak.'
        }
      ],
      misiProyek7Hari: [
        { hari: 'Senin', misi: 'Mempraktikkan wudhu sempurna (sempurna rukun dan sunnah) dengan hemat air.' },
        { hari: 'Selasa', misi: 'Melaksanakan salat fardhu tepat waktu di awal waktu.' },
        { hari: 'Rabu', misi: 'Menjawab azan dengan khusyuk dan melafalkan doa sesudah azan.' },
        { hari: 'Kamis', misi: 'Menjaga kesucian seragam sekolah dari najis dan kotoran.' },
        { hari: 'Jumat', misi: 'Menyisihkan uang jajan untuk infak kotak amal masjid/musala sekolah.' },
        { hari: 'Sabtu', misi: 'Merapikan tempat salat dan sajadah di rumah bersama keluarga.' },
        { hari: 'Ahad', misi: 'Membaca buku tuntunan salat khusyuk bersama orang tua.' }
      ],
      referensi: [
        'Kementerian Agama RI. (2022). Buku Fikih Ibadah Madrasah Ibtidaiyah. Jakarta: Ditjen Pendis.',
        'Al-Jaziri, Abdurrahman. (2018). Kitab Al-Fiqh \'Ala Al-Madzahib Al-Arba\'ah. Kairo: Dar Al-Hadith.',
        'Sabiq, Sayyid. (2021). Fiqih Sunnah. Jakarta: Cakrawala Publishing.',
        'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. (2024). Modul Ajar Fikih PAI SD. Jakarta: BSKAP.'
      ]
    };
  }

  // 4. Domain: Sejarah Kebudayaan Islam (SKI) & Sirah Nabawiyah
  if (m.includes('sejarah') || m.includes('ski') || m.includes('sirah') || m.includes('nabi') || m.includes('rasul') || m.includes('muhammad') || m.includes('ibrahim') || m.includes('ismail') || m.includes('musa') || m.includes('isa') || m.includes('adam') || m.includes('hijrah') || m.includes('madinah') || m.includes('makkah') || m.includes('piagam') || m.includes('khulafaur') || m.includes('abu bakar') || m.includes('umar') || m.includes('utsman') || m.includes('ali') || e.includes('sejarah')) {
    return {
      istilahKunci: [
        { istilah: 'Uswatun Hasanah (أُسْوَةٌ حَسَنَةٌ)', definisi: 'Suri teladan yang terbaik dan mulia dalam seluruh ucapan, perbuatan, dan ketetapan para Nabi/Rasul.' },
        { istilah: 'Hijrah (هِجْرَة)', definisi: 'Perpindahan fisik dan transformasi spiritual dari kondisi kezaliman menuju keadilan, persaudaraan, dan ketaatan.' },
        { istilah: 'Piagam Madinah (مِيثَاقُ الْمَدِينَةِ)', definisi: 'Konstitusi tertulis pertama di dunia yang menjamin hak asasi manusia, kebebasan beragama, dan persatuan masyarakat majemuk.' },
        { istilah: 'Fathanah & Amanah (فَطَانَة وَأَمَانَة)', definisi: 'Kecerdasan intelektual-spiritual dan integritas kejujuran yang menjadi sifat wajib para Rasul Allah.' }
      ],
      pengantarBab: `Mempelajari sejarah peradaban Islam melalui materi ${materiRaw} bukan sekadar membaca catatan peristiwa masa lalu, melainkan menelusuri jejak perjuangan para kekasih Allah (*Anbiya wal Mursalin*). Sejarah Islam adalah cermin peradaban yang memancarkan nilai ketabahan, kepemimpinan berkeadilan, diplomasi damai, dan kasih sayang universal. Dari kisah-kisah agung ini, kita menimba inspirasi keteladanan (*Ibrah*) untuk membangun masa depan bangsa yang harmonis dan bermartabat.`,
      studiKasusAwal: {
        judul: 'Pohon Kurma dan Piagam Perdamaian di Kota Cahaya',
        narasi: `Ketika Nabi Muhammad Saw. dan kaum Muhajirin tiba di kota Madinah setelah menempuh perjalanan hijrah yang penuh marabahaya, kota tersebut dihuni oleh berbagai suku dan agama yang berbeda (kaum Muslimin, suku Aus, suku Khazraj, serta kaum Yahudi). Alih-alih memaksakan kehendak atau membalas dendam kepada pihak yang memusuhi, Rasulullah Saw. justru mempersaudarakan kaum Muhajirin dan Anshar, serta merumuskan Piagam Madinah. Seluruh warga disatukan dalam ikatan persaudaraan yang setara, saling melindungi, dan hidup rukun berdampingan. Peristiwa bersejarah ini membuktikan bahwa Islam sejak awal meletakkan dasar toleransi, keadilan sosial, dan anti-kekerasan sebagai tiang peradaban.`,
        pertanyaanKritis: [
          'Bagaimana keteladanan Nabi Muhammad Saw. dalam menyatukan masyarakat yang berbeda suku dan agama di Madinah?',
          'Sifat kepemimpinan apa yang paling kamu kagumi dari kisah para Nabi dan sahabat ciliknya?',
          'Bagaimana kita menerapkan semangat hijrah (berubah menjadi lebih baik) di sekolah dan di rumah?'
        ]
      },
      kajianOntologis: `Secara ontologis, sejarah peradaban Islam (Tarikh Islam) berakar dari pengamatan empiris terhadap hukum sebab-akibat peradaban (*Sunnatullah fil Ijtima'*). Al-Qur'an memerintahkan umat manusia untuk menjelajahi bumi dan mengambil pelajaran (*Fa\'tabiruu Yaa Ulil Abshaar*). Keteladanan para Nabi bukanlah mitologi khayalan, melainkan fakta historis otentik yang menggariskan standar etika tertinggi kepemimpinan, kesabaran, dan keteguhan iman dalam menghadapi ujian peradaban.`,
      dalilQuran: {
        surah: 'QS. Al-Ahzab [33]: 21',
        arab: 'لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ لِمَنْ كَانَ يَرْجُو اللَّهَ وَالْيَوْمَ الْآخِرَ',
        latin: 'Laqad Kaana Lakum Fii Rasuulillaahi Uswatun Hasanatun Liman Kaana Yarjullaaha Wal-Yawmal-Aakhira',
        terjemah: '"Sungguh, telah ada pada (diri) Rasulullah itu suri teladan yang baik bagimu (yaitu) bagi orang yang mengharap (rahmat) Allah dan (kedatangan) hari kiamat..." (QS. Al-Ahzab: 21)',
        tafsir: 'Ayat ini menetapkan pribadi Rasulullah Saw. sebagai role model paripurna dalam segala dimensi: sebagai pribadi yang jujur, pendidik yang penyayang, pemimpin yang adil, serta sahabat yang setia membela kebenaran.'
      },
      hadisNabi: {
        rawi: 'HR. Ahmad No. 8952 & Al-Bukhari dalam Al-Adab Al-Mufrad dari Abu Hurairah r.a.',
        arab: 'إِنَّمَا بُعِثْتُ لِأُتَمِّمَ صَالِحَ الْأَخْلَاقِ',
        latin: 'Innamaa Bu\'itstu Li-Utammima Shaalihal-Akhlaaq',
        terjemah: '"Sesungguhnya aku diutus hanyalah untuk menyempurnakan akhlak yang mulia."',
        syarah: 'Misi peradaban Islam yang diemban Rasulullah Saw. bertumpu pada pembangunan karakter luhur (integritas, welas asih, keadilan, dan kehormatan kemanusiaan) sebagai fondasi utama kejayaan suatu bangsa.'
      },
      wawasanSainsSejarah: {
        subjudul: 'Piagam Madinah 622 M: Tonggak Piagam Hak Asasi Manusia Modern',
        uraian: 'Para sejarawan dan pakar hukum internasional modern mengakui naskah Piagam Madinah (*Shahifatul Madinah*) tahun 622 Masehi sebagai konstitusi tertulis pertama dalam sejarah peradaban manusia. Piagam ini memuat 47 pasal yang mendahului Magna Charta (1215 M), menjamin kebebasan beribadah bagi seluruh komunitas agama, menegakkan supremasi hukum yang setara tanpa diskriminasi, serta meletakkan dasar pertahanan bersama secara inklusif.'
      },
      tabelKarakter: [
        { terpuji: 'Meneladani sifat As-Siddiq (jujur) dan Al-Amanah (dapat dipercaya) dalam mengemban tugas kelas.', tercela: 'Berkhianat, mengingkari janji, atau menyebarkan rahasia teman.' },
        { terpuji: 'Menghargai teman yang berbeda suku, ras, atau agama sebagaimana Piagam Madinah.', tercela: 'Membuat kelompok eksklusif dan mendiskriminasi teman minoritas di sekolah.' },
        { terpuji: 'Sabar dan tabah menghadapi kesulitan belajar sebagaimana ketabahan para Nabi.', tercela: 'Gampang mengeluh, marah-marah, dan menyerah saat menghadapi tantangan.' },
        { terpuji: 'Pemaaf dan mengutamakan perdamaian saat terjadi kesalahpahaman antarteman.', tercela: 'Menyimpan dendam dan membalas keburukan dengan kekerasan fisik/verbal.' },
        { terpuji: 'Berani membela teman yang dizalimi atau diperlakukan tidak adil.', tercela: 'Mendiamkan kezaliman (*bystander*) atau ikut serta menertawakan korban perundungan.' }
      ],
      dialogTematik: {
        tokoh: 'Salim dan Anas membaca buku sejarah Islam di perpustakaan',
        naskah: `- **Salim**: "Anas, aku kagum sekali membaca kisah Nabi Muhammad Saw. saat Fathu Makkah. Beliau memaafkan semua orang yang dulu pernah memusuhi dan menyakitinya."\n- **Anas**: "Benar sekali Salim! Rasulullah Saw. mengajarkan bahwa memaafkan adalah tanda kemuliaan jiwa ksatria. Beliau tidak pernah membalas kejahatan dengan kejahatan, melainkan dengan kebaikan dan doa hidayah."\n- **Salim**: "Pelajaran luar biasa! Jika kita berselisih dengan teman di kelas, kita harus segera saling memaafkan ya!"`
      },
      hikmahMateri: [
        'Meneladani karakter luhur para Nabi dan Khulafaur Rasyidin dalam kehidupan nyata.',
        'Memahami pentingnya persatuan, toleransi, dan kerukunan di tengah masyarakat majemuk.',
        'Membangun daya juang tinggi (*grit*), ketabahan, dan optimisme dalam meraih cita-cita.',
        'Menguatkan kecintaan (*Mahabbah*) kepada Rasulullah Saw. dan para sahabat mulia.',
        'Menumbuhkan kebanggaan pada peradaban Islam yang menjunjung tinggi ilmu dan kemanusiaan.'
      ],
      aktivitasDeepLearning: {
        mindful: 'Duduk hening membayangkan perjuangan para Nabi yang penuh ketabahan, lalu mendoakan kebaikan bagi para pahlawan dan pejuang kebaikan.',
        meaningful: 'Analisis Piagam Madinah: Menyusun "Piagam Kesepakatan Damai Kelas" bersama seluruh teman untuk mencegah perundungan.',
        joyful: 'Pentas drama mini sejarah Islam: Menampilkan adegan keteladanan sahabat cilik yang jujur dan setia kawan.'
      },
      intisariPoin: [
        'Kisah para Nabi dan Rasul adalah sumber inspirasi moral dan keteladanan tertinggi (*Uswatun Hasanah*).',
        'Nabi Muhammad Saw. diutus untuk menyempurnakan akhlak mulia bagi seluruh semesta alam.',
        'Peristiwa Hijrah mengajarkan semangat transformasi diri menuju kebaikan yang berkelanjutan.',
        'Piagam Madinah membuktikan bahwa Islam adalah pelopor kerukunan dan hak asasi manusia.',
        'Memaafkan kesalahan sesama adalah tanda kekuatan jiwa dan akhlak seorang kesatria muslim.'
      ],
      soalHots: [
        {
          nomor: 1,
          stimulus: 'Gelar "Al-Amin" yang diberikan oleh penduduk Makkah kepada Nabi Muhammad Saw. sejak masa muda membuktikan bahwa beliau memiliki karakter...',
          opsi: { A: 'Sangat kaya raya', B: 'Sangat jujur, adil, dan terpercaya dalam memegang amanah', C: 'Pandai berperang', D: 'Memiliki banyak pengikut' },
          kunci: 'B',
          pembahasan: 'Al-Amin bermakna insan yang terpercaya, disematkan karena integritas kejujuran beliau yang tanpa cela.'
        },
        {
          nomor: 2,
          stimulus: 'Langkah strategis pertama yang dilakukan Rasulullah Saw. setibanya di Madinah adalah membangun Masjid Nabawi dan mempersaudarakan kaum Muhajirin dengan Anshar. Nilai luhur yang dipelajari adalah...',
          opsi: { A: 'Mementingkan keuntungan materi', B: 'Membangun persatuan berlandaskan iman dan memperkokoh solidaritas sosial', C: 'Menguasai perdagangan pasar secara sepihak', D: 'Menghindari pergaulan dengan penduduk lokal' },
          kunci: 'B',
          pembahasan: 'Persaudaraan Muhajirin-Anshar adalah fondasi integrasi sosial berbasis ukhuwah islamiyyah.'
        },
        {
          nomor: 3,
          stimulus: 'Ketika peristiwa pembebasan kota Makkah (Fathu Makkah), Rasulullah Saw. tidak membalas dendam kepada kaum Quraisy melainkan memaafkan mereka secara terbuka. Teladan ini mengajarkan kita untuk...',
          opsi: { A: 'Menjadi pribadi yang pemaaf, berlapang dada, dan mengedepankan perdamaian', B: 'Menyerang musuh saat mereka lengah', C: 'Menuntut ganti rugi yang besar', D: 'Menyimpan rasa benci selamanya' },
          kunci: 'A',
          pembahasan: 'Fathu Makkah adalah puncak teladan kasih sayang dan pengampunan agung (*Al-\'Afwul \'Aam*).'
        },
        {
          nomor: 4,
          stimulus: 'Bagaimana cara siswa SD menerapkan prinsip Piagam Madinah di dalam lingkungan kelas yang majemuk?',
          opsi: { A: 'Hanya mau berteman dengan teman yang satu suku saja', B: 'Menghargai keragaman latar belakang teman, bekerjasama dengan rukun, dan saling menjaga kenyamanan belajar', C: 'Mengejek logat bahasa teman yang berasal dari daerah lain', D: 'Membuat aturan kelas yang menguntungkan kelompok sendiri' },
          kunci: 'B',
          pembahasan: 'Nilai Piagam Madinah diterjemahkan dalam toleransi aktif, inklusivitas, dan anti-diskriminasi.'
        },
        {
          nomor: 5,
          stimulus: 'Keteladanan Nabi Ibrahim a.s. dalam mencari kebenaran Tuhan melalui pengamatan bintang, bulan, dan matahari mengajarkan kita untuk...',
          opsi: { A: 'Menggunakan akal kritis dan observasi ilmiah yang dipandu wahyu keimanan', B: 'Menyembah benda-benda langit', C: 'Mengabaikan ilmu pengetahuan alam', D: 'Percaya pada takhayul' },
          kunci: 'A',
          pembahasan: 'Nabi Ibrahim a.s. memadukan penalaran logis kritis dengan ketundukan tauhid yang murni.'
        },
        {
          nomor: 6,
          stimulus: 'Sifat tabligh yang dimiliki oleh para Rasul Allah bermakna...',
          opsi: { A: 'Menyembunyikan kebenaran', B: 'Menyampaikan seluruh risalah kebenaran dari Allah tanpa rasa takut kepada makhluk', C: 'Berbicara sesuka hati', D: 'Hanya menyampaikan pesan yang disukai raja' },
          kunci: 'B',
          pembahasan: 'Tabligh adalah sifat wajib Rasul dalam mendakwahkan syariat secara amanah dan transparan.'
        },
        {
          nomor: 7,
          stimulus: 'Sikap Khalifah Abu Bakar Ash-Shiddiq r.a. yang langsung membenarkan peristiwa Isra Mi\'raj menunjukkan karakter...',
          opsi: { A: 'Keimanan yang kokoh dan loyalitas mutlak pada kebenaran wahyu', B: 'Keraguan dalam berpikir', C: 'Sikap ikut-ikutan tanpa pemahaman', D: 'Mencari popularitas' },
          kunci: 'A',
          pembahasan: 'Gelar Ash-Shiddiq dianugerahkan karena keteguhan iman Abu Bakar yang membenarkan kebenaran kenabian.'
        },
        {
          nomor: 8,
          stimulus: 'Keteladanan Khalifah Umar bin Khattab r.a. yang berkeliling malam memikul karung gandum untuk rakyatnya yang kelaparan mencerminkan sifat...',
          opsi: { A: 'Pemimpin yang bertanggung jawab, sederhana, dan berempati tinggi pada rakyat kecil', B: 'Pemimpin yang suka dipuji', C: 'Sekadar pencitraan di hadapan masyarakat', D: 'Menghindari tugas kenegaraan' },
          kunci: 'A',
          pembahasan: 'Kepemimpinan Umar bin Khattab r.a. adalah teladan integritas, keadilan distributif, dan empati sosial.'
        },
        {
          nomor: 9,
          stimulus: 'Makna hijrah yang paling relevan bagi seorang pelajar di era modern adalah...',
          opsi: { A: 'Pindah ke luar negeri', B: 'Transformasi diri dari kebiasaan malas, suka menunda tugas, dan berkata kasar menjadi anak yang rajin, disiplin, dan berakhlak santun', C: 'Mengganti seragam sekolah setiap hari', D: 'Membeli gawai baru yang canggih' },
          kunci: 'B',
          pembahasan: 'Hijrah maknawiyah adalah berpindah dari maksiat/keburukan menuju ketaatan dan integritas prestasi.'
        },
        {
          nomor: 10,
          stimulus: 'Tujuan utama mempelajari Sejarah Kebudayaan Islam dalam Kurikulum Merdeka adalah...',
          opsi: { A: 'Menghafal tahun dan tanggal peristiwa saja', B: 'Mengambil ibrah keteladanan para tokoh Islam untuk membangun karakter mulia dan peradaban yang berkemajuan', C: 'Untuk membanding-bandingkan kelemahan bangsa lain', D: 'Sekadar syarat lulus ujian sekolah' },
          kunci: 'B',
          pembahasan: 'Sejarah dipelajari sebagai sumber hikmah (*Ibrah*) untuk menumbuhkan kesadaran peradaban dan moralitas.'
        }
      ],
      soalMenjodohkan: [
        { premis: 'Al-Amin', jawaban: 'Gelar kejujuran Nabi Muhammad Saw.' },
        { premis: 'Uswatun Hasanah', jawaban: 'Suri teladan yang terbaik dan mulia' },
        { premis: 'Piagam Madinah', jawaban: 'Konstitusi persatuan masyarakat majemuk' },
        { premis: 'Kaum Anshar', jawaban: 'Penduduk Madinah penolong kaum Muhajirin' },
        { premis: 'Fathu Makkah', jawaban: 'Pembebasan kota Makkah dengan damai dan pemaafan' }
      ],
      soalEsaiReflektif: [
        {
          kasus: 'Di kelas terdapat murid baru pindahan dari daerah terpencil yang logat bicaranya berbeda dan sering ditertawakan oleh beberapa teman.',
          pertanyaan: 'Berdasarkan keteladanan Nabi Muhammad Saw. dalam Piagam Madinah, bagaimana sikap yang seharusnya kamu ambil?',
          rubrik: 'Jawaban memuat: (1) Menghentikan ejekan teman, (2) Merangkul murid baru dan mengajaknya bermain bersama, (3) Menghargai keragaman budaya sebagai anugerah Allah.'
        },
        {
          kasus: 'Banyak remaja mudah putus asa dan menyerah saat menghadapi kesulitan belajar atau kegagalan dalam lomba.',
          pertanyaan: 'Bagaimana kisah ketabahan Nabi Muhammad Saw. saat berdakwah di Thaif dapat memotivasi kita untuk tidak mudah menyerah?',
          rubrik: 'Jawaban memuat ulasan peristiwa Thaif, doa kebaikan Nabi bagi kaumnya, serta pelajaran ketabahan dan optimisme tanpa dendam.'
        }
      ],
      misiProyek7Hari: [
        { hari: 'Senin', misi: 'Membaca 1 kisah keteladanan Nabi Muhammad Saw. dan menceritakannya kepada teman sekelas.' },
        { hari: 'Selasa', misi: 'Mempraktikkan sifat Al-Amin dengan menjaga titipan barang teman dengan rapi.' },
        { hari: 'Rabu', misi: 'Memaafkan teman yang pernah berbuat salah kepadamu dengan senyuman ikhlas.' },
        { hari: 'Kamis', misi: 'Menolong teman yang membutuhkan bantuan belajar (Misi Kaum Anshar).' },
        { hari: 'Jumat', misi: 'Membaca shalawat Nabi sebanyak 33 kali dengan penuh rasa rindu dan cinta.' },
        { hari: 'Sabtu', misi: 'Membantu pekerjaan orang tua di rumah tanpa diminta sebagai wujud birrul walidain.' },
        { hari: 'Ahad', misi: 'Menulis resume satu halaman tentang sifat kepemimpinan Khulafaur Rasyidin.' }
      ],
      referensi: [
        'Kementerian Agama RI. (2022). Sejarah Kebudayaan Islam SD/MI. Jakarta: Ditjen Pendis.',
        'Al-Mubarakfuri, Safiyyu ar-Rahman. (2020). Ar-Rahiq Al-Makhtum (Sirah Nabawiyah). Riyadh: Darussalam.',
        'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. (2024). Buku Teks PAI & Budi Pekerti SD. Jakarta: Pusat Kurikulum.',
        'Haekal, Muhammad Husain. (2018). Sejarah Hidup Muhammad. Jakarta: Litera AntarNusa.'
      ]
    };
  }

  // 5. Default / Akhlak & Budi Pekerti Umum (Adab, Birrul Walidain, Sopan Santun, Kejujuran, Toleransi)
  return {
    istilahKunci: [
      { istilah: 'Akhlaqul Karimah (أَخْلَاقُ الْكَرِيمَةِ)', definisi: 'Perilaku budi pekerti luhur yang terpancar spontan dari kebersihan jiwa dan ketundukan iman kepada Allah.' },
      { istilah: 'Birrul Walidain (بِرُّ الْوَالِدَيْنِ)', definisi: 'Bakti, penghormatan, ketaatan, dan kasih sayang tulus seorang anak kepada kedua orang tua.' },
      { istilah: 'Qawlan Layyina (قَوْلًا لَيِّنًا)', definisi: 'Tutur kata yang lemah lembut, santun, tidak membentak, serta menyejukkan hati pendengarnya.' },
      { istilah: 'At-Tasamuh (التَّسَامُحُ)', definisi: 'Sikap toleransi, tenggang rasa, dan saling menghargai perbedaan latar belakang antar sesama manusia.' }
    ],
    pengantarBab: `Akhlak mulia dalam materi ${materiRaw} adalah buah ranum dari pohon keimanan yang kokoh. Dalam ajaran Islam, budi pekerti luhur bukan sekadar etika sosial formalitas, melainkan barometer utama kesempurnaan iman seseorang. Setiap tutur kata yang santun, senyuman tulus kepada sesama, penolakan tegas terhadap ejekan (*bullying*), serta bakti kepada orang tua dan guru adalah ibadah nyata yang memancarkan nilai *Rahmatan lil 'Alamin* di tengah kehidupan modern.`,
    studiKasusAwal: {
      judul: 'Tiga Kata Ajaib di Sudut Lorong Kelas',
      narasi: `Pagi itu, suasana koridor sekolah tampak ramai oleh siswa yang berjalan menuju kelas masing-masing. Ketika Aisyah sedang membawa tumpukan buku modul PAI, ia tidak sengaja tersenggol oleh Bima yang sedang berlari tergesa-gesa hingga beberapa buku terjatuh. Bima yang menyadari kesalahannya tidak melarikan diri, melainkan langsung berlutut membantu Aisyah merapikan buku seraya berucap dengan tulus, "Aisyah, maafkan aku ya, aku tadi terburu-buru sehingga kurang berhati-hati. Apakah ada bukumu yang rusak?" Aisyah tersenyum ramah dan menjawab, "Tidak apa-apa Bima, terima kasih banyak sudah membantuku merapikannya kembali." Dialog singkat yang dipenuhi kata 'Maaf' dan 'Terima kasih' itu seketika mengubah situasi yang berpotensi menjadi pertengkaran menjadi momen kehangatan persahabatan yang menyejukkan.`,
      pertanyaanKritis: [
        'Mengapa membiasakan 3 kata ajaib ("Tolong", "Maaf", "Terima kasih") dapat meredam konflik dan mempererat persaudaraan?',
        'Bagaimana cara menunjukkan bakti nyata kepada orang tua dan guru saat kita berada di rumah dan sekolah?',
        'Apa yang harus kita lakukan jika melihat seorang teman diejek atau dikucilkan oleh teman lainnya di kelas?'
      ]
    },
    kajianOntologis: `Secara etimologis, kata Akhlak merupakan jamak dari kata *Khuluq* (خُلُق) yang bermakna tabi'at, perangai, atau watak dasar yang berakar seakar dengan kata *Khalq* (ciptaan) dan *Khaliq* (Pencipta). Secara terminologis menurut Imam Al-Ghazali, akhlak adalah keadaan jiwa yang tertanam kuat yang melahirkan perbuatan-perbuatan secara spontan, mudah, tanpa memerlukan pemikiran panjang yang dipaksakan. Akhlak mulia adalah pantulan fitrah kesucian manusia yang senantiasa terhubung dengan bimbingan wahyu Ilahi.`,
    dalilQuran: {
      surah: 'QS. Al-Isra [17]: 23-24 & QS. Luqman [31]: 14',
      arab: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا',
      latin: 'Wa Qadhaa Rabbuka Allaa Ta\'buduu Illaa Iyyaahu Wa Bil-Waalidayni Ihsaanaa',
      terjemah: '"Dan Tuhanmu telah memerintahkan agar kamu jangan menyembah selain Dia dan hendaklah berbuat baik kepada ibu bapakmu dengan sebaik-baiknya..." (QS. Al-Isra: 23)',
      tafsir: 'Ayat ini menggandengkan perintah tauhid kepada Allah dengan perintah berbakti kepada orang tua (*Birrul Walidain*). Ini membuktikan bahwa memuliakan, menyayangi, dan bertutur kata santun kepada orang tua menempati kedudukan tertinggi dalam hierarki moralitas Islam.'
    },
    hadisNabi: {
      rawi: 'HR. Bukhari No. 6035 & Muslim No. 2548 dari Abu Hurairah r.a.',
      arab: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
      latin: 'Man Kaana Yu\'minu Billaahi Wal-Yawmil-Aakhiri Fal-Yaqul Khayran Aw Li-Yashmut',
      terjemah: '"Barangsiapa yang beriman kepada Allah dan hari akhir, hendaklah ia berkata yang baik atau diam."',
      syarah: 'Hadis ini menetapkan keselamatan lisan sebagai cermin keimanan. Menjaga lisan dari perkataan kotor, gibah, fitnah, dan ejekan adalah bukti nyata integritas seorang muslim yang beriman.'
    },
    wawasanSainsSejarah: {
      subjudul: 'Kajian Psikologi Positif: Efek Menular Kebaikan & Kebahagiaan Otak',
      uraian: 'Riset neuropsikologi dari Harvard University menemukan fenomena *Moral Elevation* dan *Ripple Effect* kebaikan. Ketika seorang anak melakukan atau menyaksikan tindakan kasih sayang, empati, dan kesantunan, otak melepaskan hormon dopamin dan oksitosin. Hormon ini meningkatkan rasa percaya diri, menurunkan tingkat agresivitas sosial, mencegah stres belajar, serta menginspirasi anak-anak lain di sekitarnya untuk ikut melakukan tindakan kebaikan serupa secara berantai.'
    },
    tabelKarakter: [
      { terpuji: 'Berkata lemah lembut, membiasakan kata "Tolong", "Maaf", dan "Terima kasih".', tercela: 'Membentak, berbicara kasar, atau memanggil teman dengan julukan hewan.' },
      { terpuji: 'Mencium tangan orang tua, menyimak nasihat guru, dan merapikan kamar sendiri.', tercela: 'Membantah perintah orang tua dengan nada kesal dan malas belajar.' },
      { terpuji: 'Menolak segala bentuk ejekan (*anti-bullying*) dan menemani kawan yang menyendiri.', tercela: 'Ikut menertawakan teman yang berbuat salah atau mengucilkan kawan di kelas.' },
      { terpuji: 'Berani jujur mengakui kekeliruan diri sendiri dan segera meminta maaf.', tercela: 'Melempar kesalahan kepada orang lain (*kambing hitam*) dan berbohong.' },
      { terpuji: 'Merawat tanaman sekolah, membuang sampah pada tempatnya, dan menyayangi hewan.', tercela: 'Membuang sampah sembarangan di laci meja dan merusak fasilitas sekolah.' }
    ],
    dialogTematik: {
      tokoh: 'Aisyah dan Bima di koridor sekolah',
      naskah: `- **Bima**: "Aisyah, terima kasih ya sudah memaafkanku dan membantuku merapikan buku tadi."\n- **Aisyah**: "Sama-sama Bima! Kita semua adalah sahabat di sekolah ini. Rasulullah Saw. mengajarkan bahwa orang yang paling mulia adalah orang yang menjaga lisannya dan gemar memaafkan."\n- **Bima**: "Alhamdulillah, aku berjanji akan lebih berhati-hati dan selalu menjaga sikap santun kepada siapa saja!"`
    },
    hikmahMateri: [
      'Meraih cinta, rahmat, dan keberkahan hidup dari Allah Swt.',
      'Membangun hubungan keluarga yang harmonis, penuh kasih sayang, dan saling mendoakan.',
      'Menciptakan lingkungan sekolah yang aman, nyaman, kondusif, dan bebas perundungan (*bullying*).',
      'Membentuk kepribadian yang tangguh, berintegritas tinggi, dan disenangi banyak sahabat.',
      'Menjadi duta teladan (*Uswatun Hasanah*) bagi agama, nusa, dan bangsa.'
    ],
    aktivitasDeepLearning: {
      mindful: 'Menulis surat terima kasih dan permohonan maaf yang tulus kepada Ayah dan Ibu di rumah.',
      meaningful: 'Studi kasus dilema moral pertemanan: Merumuskan solusi empati saat melihat sahabat melakukan kekeliruan.',
      joyful: 'Pohon Kebaikan Kelas: Menempelkan kartu apresiasi kepada teman sekelas yang telah berbuat kebaikan.'
    },
    intisariPoin: [
      'Akhlak mulia adalah cerminan utama dari kesempurnaan iman seorang muslim.',
      'Berbakti kepada orang tua (*Birrul Walidain*) adalah perintah pokok yang mendatangkan ridha Allah.',
      'Lisan yang santun dan pemaaf adalah kunci terwujudnya kedamaian di lingkungan sekolah.',
      'Islam melarang keras segala bentuk ejekan, perundungan, dan diskriminasi antarteman.',
      'Kebaikan kecil yang dilakukan secara ikhlas mendatangkan kebahagiaan batin dan pahala berlipat ganda.'
    ],
    soalHots: [
      {
        nomor: 1,
        stimulus: 'Ketika pulang sekolah, Nabila melihat ibunya sedang sibuk mencuci piring sambil menggendong adiknya yang menangis. Tindakan akhlak mulia yang paling tepat dilakukan Nabila adalah...',
        opsi: { A: 'Langsung masuk kamar dan bermain game di ponsel', B: 'Segera mencium tangan ibu, meletakkan tas di tempatnya, dan menawarkan bantuan menjaga adik atau membilas piring', C: 'Menuntut ibu untuk segera menyiapkan makanan siang', D: 'Pergi ke luar rumah untuk bermain bersama teman' },
        kunci: 'B',
        pembahasan: 'Birrul walidain diwujudkan dengan inisiatif empati membantu meringankan beban orang tua tanpa disuruh.'
      },
      {
        nomor: 2,
        stimulus: 'Perhatikan sabda Nabi Saw.: "Man Kaana Yu\'minu Billaahi Wal-Yawmil-Aakhiri Fal-Yaqul Khayran Aw Li-Yashmut". Penerapan hadis ini dalam penggunaan media sosial adalah...',
        opsi: { A: 'Menulis komentar ejekan pada foto teman yang lucu', B: 'Berpikir mendalam sebelum membagikan postingan dan hanya menyebarkan kata-kata kebaikan yang bermanfaat', C: 'Menyebarkan rahasia teman di grup obrolan', D: 'Mengunggah status keluhan setiap waktu' },
        kunci: 'B',
        pembahasan: 'Menjaga lisan di era digital mencakup literasi etika bermedia sosial dengan menyaring konten secara bijak.'
      },
      {
        nomor: 3,
        stimulus: 'Alasan utama mengapa perundungan (*bullying*) diharamkan secara mutlak dalam ajaran Islam adalah...',
        opsi: { A: 'Dapat melukai kehormatan martabat manusia, memicu trauma psikologis, dan merusak persaudaraan', B: 'Hanya karena melanggar tata tertib sekolah', C: 'Karena membuat suasana kelas menjadi sunyi', D: 'Hanya berlaku jika pelakunya adalah orang dewasa' },
        kunci: 'A',
        pembahasan: 'Islam menjunjung tinggi kehormatan jiwa dan martabat insan (Hifzhun Nafs & Karamatul Insan).'
      },
      {
        nomor: 4,
        stimulus: 'Sikap pemaaf (*Al-\'Afw*) ketika barang kita tidak sengaja dirusakkan oleh teman sebangku ditunjukkan dengan cara...',
        opsi: { A: 'Membalas merusak barang milik teman tersebut', B: 'Memaafkan dengan lapang dada, menenangkan perasaannya, dan mencari solusi bersama secara bijak', C: 'Mendiamkannya selama satu semester', D: 'Mengejeknya di depan seluruh teman kelas' },
        kunci: 'B',
        pembahasan: 'Pemaaf sejati memaafkan tanpa rasa dendam dan mengubah konflik menjadi jembatan ukhuwah.'
      },
      {
        nomor: 5,
        stimulus: 'Bagaimana keterkaitan antara ridha orang tua dengan ridha Allah Swt. berdasarkan hadis Nabi Saw.?',
        opsi: { A: 'Ridha Allah bergantung pada ridha kedua orang tua, dan murka Allah bergantung pada murka kedua orang tua', B: 'Tidak ada keterkaitan sama sekali', C: 'Hanya berlaku jika orang tua membelikan mainan mahal', D: 'Ridha Allah hanya dicapai dengan salat tanpa perlu berbakti' },
        kunci: 'A',
        pembahasan: 'Hadis riwayat At-Tirmidzi menegaskan: "Ridhar-Rabbi fii ridhal-waalidayni wa sakhatullah fii sakhatil-waalidayn".'
      },
      {
        nomor: 6,
        stimulus: 'Sikap rendah hati (*Tawaduk*) ketika meraih juara kelas dalam lomba cerdas cermat PAI adalah...',
        opsi: { A: 'Menganggap teman-teman yang lain tidak mau belajar', B: 'Bersyukur kepada Allah, tidak menyombongkan diri, dan bersedia belajar bersama teman lain', C: 'Menuntut hadiah berlebihan dari guru', D: 'Memamerkan piala kemenangan di media sosial dengan nada meremehkan' },
        kunci: 'B',
        pembahasan: 'Tawaduk menempatkan prestasi sebagai titipan karunia Allah dan sarana memperluas kemanfaatan ilmu.'
      },
      {
        nomor: 7,
        stimulus: 'Salah satu wujud adab yang baik saat berbicara dengan guru di sekolah adalah...',
        opsi: { A: 'Memotong pembicaraan guru saat sedang menerangkan', B: 'Menatap dengan sopan, mendengarkan dengan khusyuk, dan menggunakan tutur kata santun', C: 'Memanggil nama guru tanpa sebutan kehormatan Bapak/Ibu', D: 'Bermain gawai saat guru sedang memberi nasihat' },
        kunci: 'B',
        pembahasan: 'Menghormati guru adalah kunci keberkahan ilmu dan syarat utama kemanfaatan ilmu dalam kehidupan.'
      },
      {
        nomor: 8,
        stimulus: 'Tindakan kasih sayang kepada makhluk ciptaan Allah di lingkungan sekolah tercermin dari...',
        opsi: { A: 'Melempari sarang burung di pohon dengan batu', B: 'Rutin menyiram tanaman penghijauan kelas dan memberi makan kucing liar di sekitar musala', C: 'Memetik bunga taman sekolah untuk diinjak-injak', D: 'Mencoret-coret batang pohon dengan spidol' },
        kunci: 'B',
        pembahasan: 'Rahmatan lil \'alamin menuntut welas asih universal kepada flora dan fauna ciptaan Allah.'
      },
      {
        nomor: 9,
        stimulus: 'Sikap ksatria seorang muslim ketika secara tidak sengaja memecahkan pot bunga di koridor sekolah adalah...',
        opsi: { A: 'Berlari cepat agar tidak ada yang melihat', B: 'Menuduh teman lain yang sedang lewat', C: 'Segera berterus terang kepada guru piket, meminta maaf, dan membantu membersihkan pecahannya', D: 'Menyembunyikan pecahan pot di dalam tong sampah' },
        kunci: 'C',
        pembahasan: 'Integritas kejujuran (*Ash-Shiddiq*) berani bertanggung jawab atas konsekuensi perbuatan diri sendiri.'
      },
      {
        nomor: 10,
        stimulus: 'Tujuan puncak dari pembiasaan akhlak mulia dalam pembelajaran PAI Kurikulum Merdeka adalah...',
        opsi: { A: 'Terwujudnya profil pelajar beriman, beradab luhur, dan menebarkan kedamaian bagi semesta (*Rahmatan lil \'Alamin*)', B: 'Sekadar menghindari hukuman dari guru piket', C: 'Mendapatkan pujian dari orang tua', D: 'Menjadi anak yang paling ditakuti di sekolah' },
        kunci: 'A',
        pembahasan: 'Output pendidikan akhlak adalah internalisasi karakter paripurna menuju insan kamil berintegritas.'
      }
    ],
    soalMenjodohkan: [
      { premis: 'Birrul Walidain', jawaban: 'Berbakti dan memuliakan kedua orang tua' },
      { premis: 'Qawlan Layyina', jawaban: 'Tutur kata yang lemah lembut dan santun' },
      { premis: 'Al-\'Afw', jawaban: 'Sikap pemaaf dan berlapang dada' },
      { premis: 'Tawaduk', jawaban: 'Rendah hati dan tidak sombong' },
      { premis: 'At-Ta\'awun', jawaban: 'Tolong-menolong dalam kebaikan' }
    ],
    soalEsaiReflektif: [
      {
        kasus: 'Di kelas, kamu melihat seorang teman baru yang pendiam sering diejek mengenai bentuk giginya oleh dua anak lain saat jam istirahat.',
        pertanyaan: 'Berdasarkan nilai kasih sayang dan pencegahan perundungan, bagaimana tindakan konkret yang harus kamu lakukan untuk melindungi teman tersebut?',
        rubrik: 'Jawaban memuat: (1) Menegur teman yang mengejek dengan santun dan tegas, (2) Mendampingi teman yang diejek dan menenangkan perasaannya, (3) Melaporkan kepada wali kelas secara bijak jika ejekan berulang.'
      },
      {
        kasus: 'Terkadang kita merasa lelah dan tidak sengaja menjawab perkataan ibu di rumah dengan nada tinggi ketika diminta membantu menjaga adik.',
        pertanyaan: 'Sebagai anak yang memahami materi akhlak dan Birrul Walidain, apa langkah introspeksi dan perbaikan diri yang harus segera kamu lakukan?',
        rubrik: 'Jawaban memuat: (1) Mengakui kekhilafan dan beristighfar, (2) Segera mencium tangan ibu dan memohon maaf dengan tulus, (3) Membiasakan mengatur emosi dan mengganti jawaban dengan nada yang santun.'
      }
    ],
    misiProyek7Hari: [
      { hari: 'Senin', misi: 'Mencium tangan kedua orang tua saat berangkat dan pulang sekolah seraya mendoakannya.' },
      { hari: 'Selasa', misi: 'Membiasakan mengucapkan kata "Tolong", "Maaf", dan "Terima kasih" dalam setiap interaksi.' },
      { hari: 'Rabu', misi: 'Membantu teman yang kesulitan memahami pelajaran tanpa merasa sombong.' },
      { hari: 'Kamis', misi: 'Menolak ikut serta dalam obrolan yang membicarakan keburukan orang lain (Stop Gibah).' },
      { hari: 'Jumat', misi: 'Membersihkan musala atau menyiram tanaman di lingkungan sekolah dengan riang gembira.' },
      { hari: 'Sabtu', misi: 'Membantu pekerjaan domestik di rumah (mencuci piring sendiri atau merapikan kamar).' },
      { hari: 'Ahad', misi: 'Menulis surat ungkapan cinta dan terima kasih yang indah untuk Ayah dan Ibu tercinta.' }
    ],
    referensi: [
      'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. (2024). Buku Panduan Guru Pendidikan Agama Islam dan Budi Pekerti SD. Jakarta: Pusat Kurikulum dan Perbukuan.',
      'Al-Ghazali, Imam. (2018). Ihya\' \'Ulumiddin: Kitab Riyadhah An-Nafs wa Tahdzib Al-Akhlaq. Kairo: Darul Hadits.',
      'Kementerian Agama RI. (2023). Modul Karakter Moderasi Beragama dan Profil Pelajar Rahmatan lil \'Alamin. Jakarta: Ditjen Pendis.',
      'Nawawi, Imam. (2020). Riyadhus Shalihin min Kalami Sayyidil Mursalin. Beirut: Darul Fikr.'
    ]
  };
}

export function generateClientModulAjar(data: Partial<ModulInputData>): string {
  const sekolah = data.namaSekolah || 'Satuan Pendidikan / SD Negeri';
  const guru = data.namaGuru || 'Mukhamad Fakhrudin Rifki, S. Pd.I';
  const nipGuru = data.nip ? `(NIP. ${data.nip})` : '(NIP. 199201072019031003)';
  const kepsek = data.namaKepalaSekolah || 'Hadi Kustantoro, S.Pd. SD.';
  const nipKepsek = data.nipKepalaSekolah ? `(NIP. ${data.nipKepalaSekolah})` : '(NIP. 196803141993081002)';
  const faseKelas = data.faseKelas || 'Fase B (SD Kelas 3-4)';
  const elemen = data.elemen || 'Akidah';
  const materi = data.materi || 'Mengenal Asmaul Husna: Al-Alim dan Al-Khabir';
  const semester = data.semester || 'Ganjil';
  const tahun = data.tahunAjaran || '2025/2026';
  const alokasi = data.alokasiWaktu || '4 JP x 35 Menit (1 Pertemuan = 4 JP)';
  const pertemuan = data.jumlahPertemuan || '1 Pertemuan (4 JP)';
  const metode = data.metodePembelajaran || 'Problem Based Learning (PBL)';
  const tp = data.capaianPembelajaran || 'Mendalami ajaran Islam secara bermakna, menumbuhkan kasih sayang kepada Allah dan sesama, serta membiasakan akhlak mulia dalam kehidupan sehari-hari.';
  const catatan = data.additionalNotes ? `\n> **Catatan Khusus Pengajar:** ${data.additionalNotes}\n` : '';

  const tk = resolveThematicKnowledge(materi, elemen);

  return `# MODUL AJAR PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI
## BERBASIS DEEP LEARNING & PEDAGOGI KASIH SAYANG (RAHMATAN LIL 'ALAMIN)
**Standar Kepatuhan: Permendikbudristek No. 12 Tahun 2024 & BSKAP 032/H/KR/2024**

---

## 1. INFORMASI UMUM

### A. Identitas Modul
- **Satuan Pendidikan**: ${sekolah}
- **Penyusun**: ${guru} ${nipGuru}
- **Mata Pelajaran**: Pendidikan Agama Islam dan Budi Pekerti
- **Fase / Kelas / Jenjang**: ${faseKelas}
- **Semester / Tahun Pelajaran**: ${semester} / ${tahun}
- **Elemen / Topik Utama**: **${elemen}** &mdash; *${materi}*
- **Alokasi Waktu**: ${pertemuan} (${alokasi})
- **Model Pembelajaran**: ${metode} (Deep Learning: Mindful, Meaningful, Joyful)

### B. Kompetensi Awal
1. Peserta didik telah mengenal konsep dasar dalam elemen **${elemen}** serta memiliki rasa ingin tahu spiritual yang tinggi.
2. Peserta didik memiliki kebiasaan dasar dalam menunjukkan kepedulian sosial, bertutur kata sopan, dan bekerjasama dalam kelompok belajar.

### C. 8 Dimensi Profil Lulusan & Karakter Rahmatan lil 'Alamin (Permendikdasmen No. 13/2025)
- **Keimanan dan Ketakwaan terhadap Tuhan YME**: Menginternalisasi nilai luhur materi melalui kepatuhan ibadah, integritas batin, dan adab mulia (*Qawlan Layyina*).
- **Kewargaan**: Memupuk rasa cinta tanah air, taat norma sosial, dan menjunjung tinggi harmoni persaudaraan kebangsaan (*Ukhuwah Wathaniyah*).
- **Penalaran Kritis**: Mampu membedah sebab-akibat fenomena moral serta menemukan hikmah ilmiah di balik syariat Islam.
- **Kreativitas**: Menghasilkan ide orisinal dan karya solusi kebaikan yang bermakna bagi lingkungan sekitar.
- **Kolaborasi**: Mengembangkan semangat gotong royong, tolong-menolong (*Ta'awun*), dan empati tanpa diskriminasi.
- **Kemandirian**: Memiliki kesadaran diri, regulasi emosi, inisiatif belajar, dan tanggung jawab akhlak pribadi.
- **Kesehatan**: Menjaga kebersihan lahir batin, kebugaran jasmani, dan kesejahteraan mental spiritual (*Thaharah*).
- **Komunikasi**: Mampu menyampaikan gagasan secara santun (*Bayan*), mendengarkan secara aktif, dan membangun pemahaman bersama.
- **Nilai Rahmatan lil 'Alamin**:
  - *Mahabbah* (Menebarkan cinta kasih kepada seluruh ciptaan Allah).
  - *Rifq* (Kelembutan sikap, anti-kekerasan, dan anti-bullying).
  - *Tasamuh* (Toleransi aktif dan menghargai keragaman latar belakang).
  - *Qudwah Hasanah* (Menjadi teladan kebaikan di lingkungan sekolah dan rumah).

### D. Sarana dan Prasarana
- **Media**: LCD Proyektor/Smart TV, Lembar Kerja Peserta Didik (LKPD) Deep Learning, Mushaf Al-Qur'an dan Terjemah Kemenag RI, Kartu Kasus Empati.
- **Sumber Belajar**: Buku Teks PAI Kemendikbudristek & Kemenag RI, video tadabbur alam, lingkungan sekolah sebagai laboratorium sosial.

### E. Target Peserta Didik & Model Pembelajaran
- **Target**: Peserta didik reguler/tipikal, dengan diferensiasi proses (*scaffolding*) bagi murid yang butuh pendampingan serta diferensiasi produk (*enrichment*) bagi murid bertalenta cepat.
- **Pendekatan**: **Deep Learning (Mindful, Meaningful, Joyful Learning)** dipadukan dengan **${metode}**.
${catatan}
---

## 2. KOMPONEN INTI

### A. Tujuan Pembelajaran (TP)
- **TP Utama**: ${tp}
- **Indikator Ketercapaian TP (3 Dimensi Deep Learning)**:
  1. *Dimensi Kesadaran Spiritual (Mindful)*: Melalui hening reflektif dan tadabbur ayat, peserta didik mampu menghayati hakikat materi **${materi}** sebagai wujud cinta kepada Allah Swt.
  2. *Dimensi Penalaran Kontekstual (Meaningful)*: Melalui diskusi telaah kasus, peserta didik mampu menganalisis keterkaitan konsep **${materi}** dengan pemecahan masalah etika sosial secara kritis.
  3. *Dimensi Aksi Nyata (Joyful Action)*: Melalui kreasi proyek kebaikan, peserta didik mampu mendemonstrasikan perilaku mulia dan aksi kasih sayang di sekolah dan keluarga.

### B. Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)
- [x] Mampu menguraikan konsep pokok dan dalil naqli terkait *${materi}* secara mandiri.
- [x] Mampu mengidentifikasi 3 contoh fenomena kehidupan nyata yang mencerminkan penerapan *${materi}*.
- [x] Mampu bekerjasama dalam kelompok tanpa membeda-bedakan kawan serta saling memberikan apresiasi positif (*peer-appreciation*).
- [x] Menghasilkan 1 karya komitmen kebaikan (portofolio akhlak mulia) sebagai wujud pengamalan materi.

### C. Pemahaman Bermakna (Meaningful Insight)
> *Ajaran Islam mengenai "${materi}" bukanlah sekadar materi hafalan kaku, melainkan fondasi peradaban berbasis cinta yang membebaskan manusia dari egoisme, menumbuhkan integritas batin, dan menghadirkan kedamaian bagi seluruh alam semesta (Rahmatan lil 'Alamin).*

### D. Pertanyaan Pemantik Berbasis Empati & Nalar Kritis
1. ${tk.studiKasusAwal.pertanyaanKritis[0]}
2. ${tk.studiKasusAwal.pertanyaanKritis[1]}
3. ${tk.studiKasusAwal.pertanyaanKritis[2]}

---

## 3. KEGIATAN PEMBELAJARAN LENGKAP (SINTAKS 3 PILAR DEEP LEARNING)
### STANDAR WAKTU: 1 PERTEMUAN = 4 JP (4 x 35-40 MENIT / TOTAL 140-160 MENIT)

---

### A. Kegiatan Pendahuluan: Mindful Greeting & Joyful Ice Breaking (20 Menit)
1. **Orientasi Penuh Kehangatan (Mindful Greeting) (7 Menit)**: Guru menyapa peserta didik dengan senyum tulus, salam kehangatan, dan menanyakan kondisi emosional murid (*"Bagaimana suasana hati anak-anak hebat hari ini? Mari kita hadirkan hati seutuhnya di kelas ini"*). Presensi dengan sapaan empati.
2. **Kesadaran Spiritual (5 Menit)**: Berdoa bersama dipimpin ketua kelas dan membaca ayat suci pilihan (${tk.dalilQuran.surah}) dengan tartil dan penghayatan makna.
3. **ICE BREAKING KASIH SAYANG: "Lingkaran Apresiasi Bintang Kebaikan" (5 Menit)**:
   - *Aturan*: Peserta didik berpasangan saling bertukar senyum, lalu menyebutkan satu kebaikan kecil yang pernah dilihat dari pasangannya disertai ucapan terima kasih tulus (*"Terima kasih sudah menjadi sahabat yang baik"*).
   - *Hikmah*: Menghilangkan kecanggungan, menumbuhkan rasa aman psikologis (*psychological safety*), dan membuka resonansi hati sebelum belajar.
4. **Apersepsi & Motivasi Bermakna (3 Menit)**: Guru mengaitkan topik *${materi}* dengan fenomena keseharian siswa dan menyampaikan tujuan pembelajaran serta alur 3 pilar Deep Learning.

---

### B. Kegiatan Inti: Sintaks Deep Learning + ${metode} (100-110 Menit)

#### 1. Mindful Learning (25-30 Menit) &mdash; *Kesadaran, Observasi, & Silent Tadabbur*
- **Observasi Narasi Kasus (${tk.studiKasusAwal.judul}) (10 Menit)**: Guru membacakan studi kasus tematik atau menayangkan ilustrasi bergambar tentang realitas materi *${materi}*.
- **Silent Reflection (Hening Reflektif) (10 Menit)**: Selama 5-10 menit, seluruh kelas hening. Peserta didik memejamkan mata sejenak, meresapi kasus dan menghubungkannya dengan bisikan nurani masing-masing.
- **Formulasi Pertanyaan Kritis dari Hati (10 Menit)**: Peserta didik menuliskan satu pertanyaan paling menggugah dari lubuk hati pada kartu refleksi (*"Reflective Question Card"*).

#### 2. Meaningful Learning (50-55 Menit) &mdash; *Inquiry Dalil, Diskusi Heterogen, & Rekonstruksi Makna*
- **Pembentukan Kelompok Kasih Sayang (5 Menit)**: Peserta didik dibagi ke dalam kelompok kecil heterogen (4-5 orang) dengan menunjuk satu fasilitator dan satu juru catat empati.
- **Investigasi Dalil & Pemecahan Masalah (35 Menit)**: Kelompok membedah LKPD, menganalisis dalil Al-Qur'an (${tk.dalilQuran.surah}) dan Hadis (${tk.hadisNabi.rawi}), menggali hikmah sains/sejarah (${tk.wawasanSainsSejarah.subjudul}), serta merumuskan solusi atas masalah moral kontekstual.
- **Coaching & Bimbingan Lembut Guru (15 Menit)**: Guru berkeliling melakukan *coaching* lembut (*Rifq*), membimbing kelompok yang memerlukan *scaffolding*, serta memastikan tidak ada dominasi suara atau perundungan verbal dalam kelompok.

#### 3. Joyful & Reflective Experience (25-30 Menit) &mdash; *Kreasi Solusi & Peer-Appreciation*
- **Kreasi Produk Kebaikan (15 Menit)**: Setiap kelompok menyusun gagasan solusi, infografis, atau peta konsep kreatif tentang implementasi *${materi}* dalam kehidupan nyata.
- **Gallery Walk Penuh Apresiasi (15 Menit)**: Perwakilan kelompok berkeliling melihat karya kelompok lain dan menempelkan *sticky note* berisi apresiasi kebaikan (*"Gagasannya sangat menyentuh dan solutif!"*).

---

### C. Kegiatan Penutup: Refleksi Nurani & Komitmen Aksi (15-20 Menit)
1. **Metacognitive Reflection (10 Menit)**: Peserta didik melengkapi kalimat reflektif: *"Hari ini saya menyadari bahwa ${materi} mengajarkan saya untuk..."*
2. **Penguatan Guru (5 Menit)**: Guru memberikan konfirmasi materi dengan narasi yang menyejukkan hati dan menanamkan nilai Rahmatan lil 'Alamin.
3. **Doa & Salam (5 Menit)**: Menutup pembelajaran dengan doa kafaratul majlis dan salam hangat.

---

## 4. ASESMEN PEMBELAJARAN KOMPREHENSIF
- **Asesmen Diagnostik / Awal**: Pemetaan pemahaman prasyarat dan kesiapan belajar murid.
- **Asesmen Formatif**: Rubrik observasi akhlak mulia, lembar ceklist diskusi kelompok, dan penilaian antarteman.
- **Asesmen Sumatif**: 10 Soal Pilihan Ganda HOTS dan soal analisis penalaran (tersedia lengkap pada Bahan Ajar Siswa).

## 5. PENGAYAAN & REMEDIAL
- **Remedial Berbasis Empati**: Bimbingan privat tutor sebaya (*peer-tutoring*) dengan metode membaca terbimbing.
- **Pengayaan Karakter**: Proyek duta kebaikan cilik (*Kindness Ambassador Project*) untuk memimpin aksi sosial di sekolah.

## 6. LAMPIRAN
- Lembar Kerja Peserta Didik (LKPD) Format Siap Pakai
- Glosarium & Daftar Pustaka Lengkap

---

*Disahkan di: ${sekolah}*  
*Pada Tanggal: .......................................*

| Mengetahui,<br/>**Kepala Sekolah** | Disusun Oleh,<br/>**Guru Pendidikan Agama Islam** |
| :---: | :---: |
| <br/><br/><br/>**${kepsek}**<br/>NIP. ${data.nipKepalaSekolah || '196803141993081002'} | <br/><br/><br/>**${guru}**<br/>NIP. ${data.nip || '199201072019031003'} |`;
}

export function generateClientBahanAjar(data: Partial<ModulInputData>): string {
  const materi = data.materi || 'Mengenal Asmaul Husna: Al-Alim dan Al-Khabir';
  const faseKelas = data.faseKelas || 'Fase B (SD Kelas 3-4)';
  const elemen = data.elemen || 'Akidah';
  const jumlahPertemuan = data.jumlahPertemuan || '1 Pertemuan (4 JP)';

  const tk = resolveThematicKnowledge(materi, elemen);

  return `# BUKU TEKS PELAJARAN PENDIDIKAN AGAMA ISLAM & BUDI PEKERTI
## BAB: ${materi.toUpperCase()}
**Mata Pelajaran:** Pendidikan Agama Islam dan Budi Pekerti | **Fase / Jenjang:** ${faseKelas} | **Elemen:** ${elemen} | **Alokasi:** ${jumlahPertemuan}

---

## 1. PENGANTAR AKADEMIK & PETA KONSEP BAB

### A. Prawacana Pembuka Bab
${tk.pengantarBab}

### B. Glosarium & Istilah Kunci
${tk.istilahKunci.map(item => `- **${item.istilah}**: ${item.definisi}`).join('\n')}

### C. Tujuan Pembelajaran Khusus (3 Pilar Deep Learning)
1. **Pemahaman Kognitif Mendalam (Meaningful Insight)**: Menguasai landasan ontologis, dalil naqli Al-Qur'an dan Hadis sahih, serta hikmah ilmiah dari materi **${materi}**.
2. **Penghayatan Spiritual (Mindful Awareness)**: Merasakan kehadiran Allah Swt. dalam hati nurani, melatih kepekaan rasa, serta membentengi diri dari perbuatan tercela.
3. **Pembiasaan Aksi Nyata (Joyful Action)**: Mempraktikkan akhlak terpuji (santun, jujur, pemaaf, anti-bullying, dan peduli sesama) secara antusias dalam keseharian.

---

## 2. KAJIAN PEMANTIK & REFLEKSI AWAL (MINDFUL EXPLORATION)

### 📖 Studi Kasus Naratif: "${tk.studiKasusAwal.judul}"
${tk.studiKasusAwal.narasi}

### 🌿 Hening Reflektif & Tadabbur Nurani (3 Menit)
1. Duduklah dengan tegak dan tenang, letakkan kedua telapak tangan di atas paha dengan rileks.
2. Pejamkan mata perlahan, tarik nafas panjang seraya berbisik dalam hati: *"Alhamdulillah Ya Allah..."*
3. Hembuskan nafas perlahan seraya melepaskan segala kepenatan dan memohon bimbingan ilmu yang bermanfaat.

### ❓ Pertanyaan Pemantik Penyelaman Nalar Kritis
${tk.studiKasusAwal.pertanyaanKritis.map((q, idx) => `${idx + 1}. ${q}`).join('\n')}

---

## 3. KAJIAN MATERI TEMATIK MENDALAM (SUBSTANSI UTAMA BUKU TEKS)

### A. Landasan Ontologis & Makna Hakiki ${materi}
${tk.kajianOntologis}

Ajaran Islam meletakkan materi **${materi}** sebagai landasan pembentukan manusia yang beradab dan berintegritas. Memahami nilai ini membebaskan manusia dari kesempitan hawa nafsu menuju kelapangan iman yang memancarkan kedamaian bagi seluruh semesta alam (*Rahmatan lil 'Alamin*).

---

### B. Eksplorasi Dalil Naqli: Al-Qur'an dan Hadis Sahih

#### 1. Firman Allah Swt. dalam Al-Qur'an:
> **${tk.dalilQuran.arab}**
> 
> **Transliterasi Latin:** *${tk.dalilQuran.latin}*
> 
> **Terjemahan Resmi Kemenag RI:**  
> ${tk.dalilQuran.terjemah} (${tk.dalilQuran.surah})
> 
> **Kajian Tafsir Tematik:**  
> ${tk.dalilQuran.tafsir}

#### 2. Hadis Rasulullah Saw. tentang Keutamaan Akhlak:
> **${tk.hadisNabi.arab}**
> 
> **Transliterasi Latin:** *${tk.hadisNabi.latin}*
> 
> **Terjemahan Resmi:**  
> ${tk.hadisNabi.terjemah} (${tk.hadisNabi.rawi})
> 
> **Kajian Syarah Hadis:**  
> ${tk.hadisNabi.syarah}

---

### C. Wawasan Sains, Sejarah, & Khazanah Peradaban: "${tk.wawasanSainsSejarah.subjudul}"
${tk.wawasanSainsSejarah.uraian}

---

### D. Analisis Perilaku & Kontekstualisasi dalam Kehidupan Nyata

#### 1. Tabel Analisis Komparatif Karakter
| No | Karakter Terpuji (*Mahmudah*) &mdash; SANGAT DISUKAI ALLAH | Karakter Tercela (*Mazmumah*) &mdash; HARUS DIJAUHI |
|:--:|:---|:---|
${tk.tabelKarakter.map((row, idx) => `| ${idx + 1} | **${row.terpuji.split(':')[0]}**: ${row.terpuji.split(':')[1] || row.terpuji} | **${row.tercela.split(':')[0]}**: ${row.tercela.split(':')[1] || row.tercela} |`).join('\n')}

#### 2. Naskah Percakapan Kontekstual: "${tk.dialogTematik.tokoh}"
${tk.dialogTematik.naskah}

#### 3. Panduan Aksi Nyata di Lingkungan Siswa:
- **Di Sekolah**: Menghormati guru, tertib dalam belajar, menolong teman tanpa pamrih, dan menolak tegas segala bentuk ejekan (*anti-bullying*).
- **Di Rumah**: Berbakti kepada orang tua (*Birrul Walidain*), menyayangi saudara kandung, merapikan kamar sendiri, dan disiplin beribadah.
- **Di Masyarakat**: Santun kepada tetangga, merawat tanaman, menyayangi hewan, dan membuang sampah selalu pada tempatnya.

---

### E. Hikmah Filosofis & Manfaat Agung Mempelajari ${materi}
${tk.hikmahMateri.map((h, idx) => `${idx + 1}. **${h.split(' ')[0]} ${h.split(' ')[1] || ''}**: ${h}`).join('\n')}

---

## 4. AKTIVITAS EKSPLORASI 3 PILAR DEEP LEARNING

### 🧘 Aktivitas 1 (Mindful Reflection): "Doa & Perenungan Hati Nurani"
${tk.aktivitasDeepLearning.mindful}

### 🔍 Aktivitas 2 (Meaningful Problem Solving): "Ayo Pecahkan Masalah Bersama"
${tk.aktivitasDeepLearning.meaningful}

### 🎵 Aktivitas 3 (Joyful Collaborative Project): "Kreasi Kebaikan PAI Ceria"
${tk.aktivitasDeepLearning.joyful}

---

## 5. RANGKUMAN INTISARI BAB (MUTIARA ILMU)
${tk.intisariPoin.map((p, idx) => `${idx + 1}. ${p}`).join('\n')}

---

## 6. EVALUASI UJI KOMPETENSI KOMPREHENSIF (ASESMEN HOTS)

### Bagian I: Pilihan Ganda Penalaran Tingkat Tinggi (10 Soal HOTS Lengkap)
${tk.soalHots.map(s => `
**${s.nomor}. ${s.stimulus}**  
A. ${s.opsi.A}  
B. ${s.opsi.B}  
C. ${s.opsi.C}  
D. ${s.opsi.D}
`).join('')}

---

#### 🔑 KUNCI JAWABAN & PEMBAHASAN ILMIAH GURU (10 SOAL):
${tk.soalHots.map(s => `${s.nomor}. **Kunci: ${s.kunci}** | *Pembahasan Ilmiah:* ${s.pembahasan}`).join('\n')}

---

### Bagian II: Asesmen Menjodohkan Konsep (5 Soal)
Pasangkanlah pernyataan pada **Kolom A** dengan jawaban yang tepat pada **Kolom B**:
| Kolom A (Pernyataan / Premis) | Kolom B (Konsep / Jawaban) |
|:---|:---|
${tk.soalMenjodohkan.map((m, idx) => `| ${idx + 1}. ${m.premis} | ${String.fromCharCode(65 + idx)}. ${m.jawaban} |`).join('\n')}

---

### Bagian III: Soal Cerita & Refleksi Penalaran Analitis
${tk.soalEsaiReflektif.map((e, idx) => `
**Kasus ${idx + 1}:**  
*${e.kasus}*  
- **Pertanyaan Analisis:** ${e.pertanyaan}  
- **Rubrik Solutif:** ${e.rubrik}
`).join('\n')}

---

### Bagian IV: Lembar Portofolio Jurnal Bintang Kebaikan 7 Hari
Warnailah 3 bintang (⭐⭐⭐) setiap hari setelah berhasil menyelesaikan misi kebaikan di bawah ini:
| Hari | Misi Aksi Kebaikan | Catatan Perasaanku | Bintang Amal | Paraf Ortu/Guru |
|:---:|:---|:---|:---:|:---:|
${tk.misiProyek7Hari.map(p => `| **${p.hari}** | ${p.misi} | ................................................ | ⭐ ⭐ ⭐ | ( ............... ) |`).join('\n')}

---

## 7. REFERENSI & DAFTAR RUJUKAN ILMIAH
${tk.referensi.map(r => `- ${r}`).join('\n')}`;
}
