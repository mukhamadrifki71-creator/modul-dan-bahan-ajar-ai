import React, { useState, useEffect } from 'react';
import { 
  Wand2, 
  BookOpen, 
  Sparkles, 
  Layers, 
  HeartHandshake, 
  School, 
  Sliders, 
  CheckSquare, 
  RotateCcw,
  Lightbulb,
  Clock,
  Users
} from 'lucide-react';
import { 
  CURRICULUM_PRESETS, 
  DELAPAN_DIMENSI_LULUSAN_DETAIL, 
  KARAKTER_RAHMATAN_LIL_ALAMIN, 
  METODE_OPTIONS 
} from '../data/curriculumData';
import { ElemenPAI, ModulInputData } from '../types';

interface ModulFormProps {
  initialData: ModulInputData;
  onSubmit?: (data: ModulInputData) => void;
  onGenerateModul?: (data: ModulInputData) => void;
  onGenerateBahanAjar?: (data: ModulInputData) => void;
  onGenerateBoth?: (data: ModulInputData) => void;
  isLoading: boolean;
  loadingTarget?: 'rpp' | 'bahanAjar' | 'both' | null;
}

export const ModulForm: React.FC<ModulFormProps> = ({
  initialData,
  onSubmit,
  onGenerateModul,
  onGenerateBahanAjar,
  onGenerateBoth,
  isLoading,
  loadingTarget = 'both',
}) => {
  const [formData, setFormData] = useState<ModulInputData>(initialData);
  const [activeTab, setActiveTab] = useState<'kurikulum' | 'metode' | 'identitas'>('kurikulum');
  const [selectedPresetFaseIndex, setSelectedPresetFaseIndex] = useState<number>(1); // Default Fase B (SD Kelas 3-4)

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // Update CP and sample topics when Fase or Elemen changes
  const currentFasePreset = CURRICULUM_PRESETS[selectedPresetFaseIndex] || CURRICULUM_PRESETS[0];
  const currentElementPreset = currentFasePreset.elements.find(
    (e) => e.elemen === formData.elemen
  ) || currentFasePreset.elements[0];

  const handleFaseChange = (faseStr: string, idx: number) => {
    setSelectedPresetFaseIndex(idx);
    const targetFase = CURRICULUM_PRESETS[idx];
    const elemPreset = targetFase.elements.find(e => e.elemen === formData.elemen) || targetFase.elements[0];
    
    setFormData((prev) => ({
      ...prev,
      faseKelas: targetFase.fase,
      capaianPembelajaran: elemPreset.defaultCP,
      materi: elemPreset.sampleTopics[0] || prev.materi,
    }));
  };

  const handleElemenChange = (elemen: ElemenPAI) => {
    const elemPreset = currentFasePreset.elements.find(e => e.elemen === elemen) || currentFasePreset.elements[0];
    setFormData((prev) => ({
      ...prev,
      elemen,
      capaianPembelajaran: elemPreset.defaultCP,
      materi: elemPreset.sampleTopics[0] || prev.materi,
    }));
  };

  const handlePickSampleTopic = (topic: string) => {
    setFormData((prev) => ({ ...prev, materi: topic }));
  };

  const toggleDimensiPancasila = (dimensi: string) => {
    setFormData((prev) => {
      const exists = prev.dimensiProfilPancasila.includes(dimensi);
      return {
        ...prev,
        dimensiProfilPancasila: exists
          ? prev.dimensiProfilPancasila.filter((d) => d !== dimensi)
          : [...prev.dimensiProfilPancasila, dimensi],
      };
    });
  };

  const toggleKarakterRahmatan = (karakter: string) => {
    setFormData((prev) => {
      const exists = prev.karakterRahmatanLilAlamin.includes(karakter);
      return {
        ...prev,
        karakterRahmatanLilAlamin: exists
          ? prev.karakterRahmatanLilAlamin.filter((k) => k !== karakter)
          : [...prev.karakterRahmatanLilAlamin, karakter],
      };
    });
  };

  const getConsolidatedData = (): ModulInputData => {
    const consolidated = `8 Dimensi Profil Lulusan: ${formData.dimensiProfilPancasila.join(', ')}. Karakter Rahmatan lil 'Alamin: ${formData.karakterRahmatanLilAlamin.join(', ')}`;
    return {
      ...formData,
      targetDimensiLulusan: consolidated,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = getConsolidatedData();
    if (onGenerateBoth) {
      onGenerateBoth(data);
    } else if (onSubmit) {
      onSubmit(data);
    }
  };

  const handleGenerateModulClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const data = getConsolidatedData();
    if (onGenerateModul) {
      onGenerateModul(data);
    } else if (onSubmit) {
      onSubmit(data);
    }
  };

  const handleGenerateBahanAjarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const data = getConsolidatedData();
    if (onGenerateBahanAjar) {
      onGenerateBahanAjar(data);
    } else if (onSubmit) {
      onSubmit(data);
    }
  };

  const resetFormToPreset = () => {
    const defaultFase = CURRICULUM_PRESETS[1] || CURRICULUM_PRESETS[0]; // Fase B SD
    const defaultElem = defaultFase.elements[1]; // Akidah
    setFormData({
      ...initialData,
      faseKelas: defaultFase.fase,
      elemen: defaultElem.elemen,
      capaianPembelajaran: defaultElem.defaultCP,
      materi: defaultElem.sampleTopics[0],
    });
    setSelectedPresetFaseIndex(1);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-full">
      {/* Header Form - Clean & Soft for Eye Comfort */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-100 text-emerald-800">
              <Sliders className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              Parameter RPP & Bahan Ajar PAI
            </h2>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Konfigurasi materi &bull; 1 Pertemuan = 4 JP &bull; Deep Learning & Cinta
          </p>
        </div>

        <button
          type="button"
          onClick={resetFormToPreset}
          className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-white border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded-lg transition-colors shadow-2xs"
          title="Reset ke pengaturan awal standar"
        >
          <RotateCcw className="w-3 h-3 text-slate-500" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-100/60 p-1 gap-1 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('kurikulum')}
          className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'kurikulum'
              ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>1. Materi & Fase</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('metode')}
          className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'metode'
              ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>2. Metode & Karakter</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('identitas')}
          className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'identitas'
              ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <School className="w-3.5 h-3.5" />
          <span>3. Data Sekolah</span>
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between p-4 overflow-y-auto max-h-[calc(100vh-250px)]">
        {activeTab === 'kurikulum' && (
          <div className="space-y-3.5 text-xs">
            {/* Pilih Fase / Jenjang */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Fase / Tingkat Kelas (Kurikulum Merdeka)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {CURRICULUM_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.fase}
                    type="button"
                    onClick={() => handleFaseChange(preset.fase, idx)}
                    className={`text-left p-2 rounded-lg border transition-all ${
                      selectedPresetFaseIndex === idx
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-[11px] font-semibold">{preset.label}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{preset.tingkat}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pilih Elemen PAI */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Elemen Pembelajaran PAI
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(['Al-Qur\'an dan Hadis', 'Akidah', 'Akhlak', 'Fikih', 'Sejarah Peradaban Islam (SPI)'] as ElemenPAI[]).map((elem) => (
                  <button
                    key={elem}
                    type="button"
                    onClick={() => handleElemenChange(elem)}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                      formData.elemen === elem
                        ? 'bg-emerald-700 text-white border-emerald-700 font-semibold shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {elem}
                  </button>
                ))}
              </div>
            </div>

            {/* Materi / Topik Pembelajaran */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="input-materi" className="font-semibold text-slate-800">
                  Materi Pokok / Topik Pembelajaran
                </label>
                <span className="text-[10px] text-slate-400 font-normal">Wajib diisi</span>
              </div>
              <input
                id="input-materi"
                type="text"
                required
                value={formData.materi}
                onChange={(e) => setFormData({ ...formData, materi: e.target.value })}
                placeholder="Contoh: Meneladani Sifat Kasih Sayang Allah (Ar-Rahman & Ar-Rahim)..."
                className="w-full px-3 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 font-medium"
              />

              {/* Sample Topics Helper */}
              {currentElementPreset && currentElementPreset.sampleTopics.length > 0 && (
                <div className="mt-2 p-2 bg-emerald-50/70 rounded-lg border border-emerald-100">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-900 mb-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>Inspirasi Topik Sesuai {formData.elemen}:</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {currentElementPreset.sampleTopics.map((topic, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handlePickSampleTopic(topic)}
                        className="text-left text-[11px] text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100/60 px-1.5 py-0.5 rounded transition-colors"
                      >
                        &bull; {topic}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tujuan Pembelajaran (TP) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="input-tp" className="font-semibold text-slate-800 flex items-center gap-1">
                  <span>Tujuan Pembelajaran (TP)</span>
                </label>
                <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  Permendikbudristek 12/2024 & Kemenag
                </span>
              </div>
              <textarea
                id="input-tp"
                rows={3}
                value={formData.capaianPembelajaran}
                onChange={(e) => setFormData({ ...formData, capaianPembelajaran: e.target.value })}
                placeholder="Tuliskan rumusan Tujuan Pembelajaran (TP) berbasis Deep Learning..."
                className="w-full px-3 py-2 text-xs text-slate-700 bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Rumusan Tujuan Pembelajaran yang mengintegrasikan pemahaman dalil, nilai cinta, dan tindakan budi pekerti nyata.
              </p>
            </div>

            {/* Pertemuan & Alokasi Waktu (1 Pertemuan = 4 JP Standard) */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="input-pertemuan" className="block font-semibold text-slate-800 mb-1">
                  <Clock className="w-3 h-3 inline mr-1 text-slate-500" />
                  Jumlah Pertemuan
                </label>
                <select
                  id="input-pertemuan"
                  value={formData.jumlahPertemuan}
                  onChange={(e) => {
                    const val = e.target.value;
                    let defaultAlokasi = '4 JP x 40 Menit (1 Pertemuan = 4 JP)';
                    if (val.includes('2 Pertemuan')) defaultAlokasi = '2 Pertemuan (8 JP)';
                    else if (val.includes('3 Pertemuan')) defaultAlokasi = '3 Pertemuan (12 JP)';
                    else if (val.includes('4 Pertemuan')) defaultAlokasi = '4 Pertemuan (16 JP)';
                    setFormData({ ...formData, jumlahPertemuan: val, alokasiWaktu: defaultAlokasi });
                  }}
                  className="w-full px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="1 Pertemuan (4 JP)">1 Pertemuan (4 JP)</option>
                  <option value="2 Pertemuan (8 JP)">2 Pertemuan (8 JP)</option>
                  <option value="3 Pertemuan (12 JP)">3 Pertemuan (12 JP)</option>
                  <option value="4 Pertemuan (16 JP)">4 Pertemuan (16 JP)</option>
                </select>
              </div>

              <div>
                <label htmlFor="input-alokasi" className="block font-semibold text-slate-800 mb-1">
                  Alokasi Waktu (1 Sesi = 4 JP)
                </label>
                <input
                  id="input-alokasi"
                  type="text"
                  value={formData.alokasiWaktu}
                  onChange={(e) => setFormData({ ...formData, alokasiWaktu: e.target.value })}
                  placeholder="misal: 4 JP x 40-45 Menit"
                  className="w-full px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metode' && (
          <div className="space-y-3.5 text-xs">
            {/* Metode Pembelajaran */}
            <div>
              <label htmlFor="select-metode" className="block font-semibold text-slate-800 mb-1">
                Model / Metode Pembelajaran Utama
              </label>
              <select
                id="select-metode"
                value={formData.metodePembelajaran}
                onChange={(e) => setFormData({ ...formData, metodePembelajaran: e.target.value })}
                className="w-full px-3 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
              >
                {METODE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Metode terintegrasi langsung dengan 3 Pilar Deep Learning (Mindful, Meaningful, Joyful).
              </p>
            </div>

            {/* Karakter Rahmatan lil 'Alamin */}
            <div>
              <label className="block font-semibold text-slate-800 mb-0.5">
                Karakter Rahmatan lil &lsquo;Alamin (Pedagogi Kasih Sayang)
              </label>
              <p className="text-[11px] text-slate-500 mb-1.5">
                Pilih nilai kasih sayang dan moderasi beragama yang ingin diintegrasikan:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {KARAKTER_RAHMATAN_LIL_ALAMIN.map((karakter) => {
                  const isChecked = formData.karakterRahmatanLilAlamin.includes(karakter);
                  return (
                    <button
                      key={karakter}
                      type="button"
                      onClick={() => toggleKarakterRahmatan(karakter)}
                      className={`text-left p-2 rounded-lg border text-[11px] flex items-center gap-2 transition-colors ${
                        isChecked
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-950 font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                        isChecked ? 'bg-emerald-700 text-white' : 'border border-slate-300'
                      }`}>
                        {isChecked ? '✓' : ''}
                      </span>
                      <span>{karakter}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target 8 Dimensi Profil Lulusan */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-semibold text-slate-800 text-xs">
                  8 Dimensi Profil Lulusan
                </label>
                <span className="text-[10px] text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                  Permendikdasmen No. 13/2025
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {DELAPAN_DIMENSI_LULUSAN_DETAIL.map((dimensi) => {
                  const isChecked = formData.dimensiProfilPancasila.includes(dimensi.nama);
                  return (
                    <button
                      key={dimensi.nama}
                      type="button"
                      onClick={() => toggleDimensiPancasila(dimensi.nama)}
                      className={`text-left p-2 rounded-lg border text-xs transition-all ${
                        isChecked
                          ? 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-semibold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className={`w-3.5 h-3.5 mt-0.5 shrink-0 rounded flex items-center justify-center text-[10px] ${
                          isChecked ? 'bg-emerald-700 text-white font-bold' : 'border border-slate-300'
                        }`}>
                          {isChecked ? '✓' : ''}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[11px] font-semibold leading-tight">{dimensi.nama}</div>
                          <div className="text-[10px] text-slate-500 font-normal line-clamp-1 mt-0.5">{dimensi.deskripsi}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Catatan / Penyesuaian Tambahan */}
            <div>
              <label htmlFor="input-notes" className="block font-semibold text-slate-800 mb-1">
                Instruksi Khusus / Diferensiasi (Opsional)
              </label>
              <textarea
                id="input-notes"
                rows={2}
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                placeholder="Contoh: Berikan perhatian khusus pada diferensiasi gaya belajar audio-visual & kinestetik..."
                className="w-full px-3 py-2 text-xs text-slate-700 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>
        )}

        {activeTab === 'identitas' && (
          <div className="space-y-3 text-xs">
            <p className="text-[11px] text-slate-500">
              Data ini akan dicantumkan pada bagian Identitas Modul dan Lembar Pengesahan Tanda Tangan:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="input-sekolah" className="block font-semibold text-slate-800 mb-1">
                  Nama Satuan Pendidikan / Sekolah
                </label>
                <input
                  id="input-sekolah"
                  type="text"
                  value={formData.namaSekolah}
                  onChange={(e) => setFormData({ ...formData, namaSekolah: e.target.value })}
                  placeholder="misal: SMP Negeri 1 Cendekia"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label htmlFor="input-mapel" className="block font-semibold text-slate-800 mb-1">
                  Mata Pelajaran
                </label>
                <input
                  id="input-mapel"
                  type="text"
                  value={formData.mataPelajaran}
                  onChange={(e) => setFormData({ ...formData, mataPelajaran: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label htmlFor="input-guru" className="block font-semibold text-slate-800 mb-1">
                  Nama Guru PAI Penyusun
                </label>
                <input
                  id="input-guru"
                  type="text"
                  value={formData.namaGuru}
                  onChange={(e) => setFormData({ ...formData, namaGuru: e.target.value })}
                  placeholder="misal: Mukhamad Fakhrudin Rifki, S. Pd.I"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label htmlFor="input-nip-guru" className="block font-semibold text-slate-800 mb-1">
                  NIP Guru PAI
                </label>
                <input
                  id="input-nip-guru"
                  type="text"
                  value={formData.nip}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  placeholder="199201072019031003"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label htmlFor="input-kepsek" className="block font-semibold text-slate-800 mb-1">
                  Nama Kepala Sekolah
                </label>
                <input
                  id="input-kepsek"
                  type="text"
                  value={formData.namaKepalaSekolah}
                  onChange={(e) => setFormData({ ...formData, namaKepalaSekolah: e.target.value })}
                  placeholder="misal: Hadi Kustantoro, S.Pd. SD."
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label htmlFor="input-nip-kepsek" className="block font-semibold text-slate-800 mb-1">
                  NIP Kepala Sekolah
                </label>
                <input
                  id="input-nip-kepsek"
                  type="text"
                  value={formData.nipKepalaSekolah}
                  onChange={(e) => setFormData({ ...formData, nipKepalaSekolah: e.target.value })}
                  placeholder="196803141993081002"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label htmlFor="input-semester" className="block font-semibold text-slate-800 mb-1">
                  Semester
                </label>
                <select
                  id="input-semester"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Ganjil">Semester 1 (Ganjil)</option>
                  <option value="Genap">Semester 2 (Genap)</option>
                </select>
              </div>

              <div>
                <label htmlFor="input-tahun-ajaran" className="block font-semibold text-slate-800 mb-1">
                  Tahun Ajaran
                </label>
                <input
                  id="input-tahun-ajaran"
                  type="text"
                  value={formData.tahunAjaran}
                  onChange={(e) => setFormData({ ...formData, tahunAjaran: e.target.value })}
                  placeholder="2025/2026"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons: 2 Dedicated Products (RPP & Bahan Ajar) + Combined */}
        <div className="pt-3 border-t border-slate-200 mt-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="font-semibold text-slate-700">Pilih Produk yang Ingin Dihasilkan:</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
              Saling Bersambung
            </span>
          </div>

          {/* Dual Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Button 1: RPP / Modul Ajar Guru */}
            <button
              id="btn-generate-rpp"
              type="button"
              onClick={handleGenerateModulClick}
              disabled={isLoading || !formData.materi.trim()}
              className={`py-2.5 px-3 rounded-lg text-white font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all ${
                isLoading && loadingTarget === 'rpp'
                  ? 'bg-slate-500 cursor-not-allowed'
                  : 'bg-emerald-700 hover:bg-emerald-800 shadow-2xs active:scale-[0.99]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {isLoading && loadingTarget === 'rpp' ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <BookOpen className="w-3.5 h-3.5 text-emerald-200" />
                )}
                <span>1. Hasilkan RPP / Modul Ajar</span>
              </div>
              <span className="text-[10px] font-normal text-emerald-100/90">
                Lengkap & Profesional (4 JP)
              </span>
            </button>

            {/* Button 2: Bahan Ajar Siswa */}
            <button
              id="btn-generate-bahan-ajar"
              type="button"
              onClick={handleGenerateBahanAjarClick}
              disabled={isLoading || !formData.materi.trim()}
              className={`py-2.5 px-3 rounded-lg text-white font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all ${
                isLoading && loadingTarget === 'bahanAjar'
                  ? 'bg-slate-500 cursor-not-allowed'
                  : 'bg-teal-700 hover:bg-teal-800 shadow-2xs active:scale-[0.99]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {isLoading && loadingTarget === 'bahanAjar' ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-teal-200" />
                )}
                <span>2. Hasilkan Bahan Ajar</span>
              </div>
              <span className="text-[10px] font-normal text-teal-100/90">
                Kajian Mendalam (&gt;700 Kata)
              </span>
            </button>
          </div>

          {/* Button 3: Combined / Both */}
          <button
            id="btn-generate-both"
            type="submit"
            disabled={isLoading || !formData.materi.trim()}
            className={`w-full py-2 px-3 rounded-lg text-slate-800 font-semibold text-xs border border-emerald-300 bg-emerald-50 hover:bg-emerald-100/80 transition-all flex items-center justify-center gap-1.5 ${
              isLoading && loadingTarget === 'both' ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.99]'
            }`}
          >
            {isLoading && loadingTarget === 'both' ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-emerald-600/30 border-t-emerald-700 rounded-full animate-spin" />
                <span className="text-emerald-900">Menyusun RPP &amp; Bahan Ajar Bersambung...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-emerald-900 font-bold">✨ Hasilkan Keduanya Sekaligus (RPP + Bahan Ajar)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
