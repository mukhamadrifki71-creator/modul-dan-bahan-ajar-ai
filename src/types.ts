export type FaseType = 'Fase A (SD Kelas 1-2)' | 'Fase B (SD Kelas 3-4)' | 'Fase C (SD Kelas 5-6)';

export type ElemenPAI = 'Al-Qur\'an dan Hadis' | 'Akidah' | 'Akhlak' | 'Fikih' | 'Sejarah Peradaban Islam (SPI)';

export type MetodePembelajaran = 
  | 'Problem Based Learning (PBL)'
  | 'Project Based Learning (PjBL)'
  | 'Small Group Discussion'
  | 'Inquiry / Discovery Learning'
  | 'Role Playing / Sosiodrama'
  | 'Think-Pair-Share & Mindful Reflection'
  | 'Contextual Teaching and Learning (CTL)';

export interface ModulInputData {
  namaSekolah: string;
  namaGuru: string;
  nip: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  semester: string;
  tahunAjaran: string;
  mataPelajaran: string;
  faseKelas: string;
  elemen: ElemenPAI;
  materi: string;
  capaianPembelajaran: string;
  jumlahPertemuan: string;
  alokasiWaktu: string;
  metodePembelajaran: string;
  targetDimensiLulusan: string;
  karakterRahmatanLilAlamin: string[];
  dimensiProfilPancasila: string[];
  additionalNotes: string;
}

export interface SavedModul {
  id: string;
  title: string;
  materi: string;
  faseKelas: string;
  elemen: string;
  createdAt: string;
  content: string;
  bahanAjarContent?: string;
  inputData: ModulInputData;
}
