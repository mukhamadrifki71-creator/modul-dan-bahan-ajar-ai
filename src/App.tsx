import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ModulForm } from './components/ModulForm';
import { ModulViewer } from './components/ModulViewer';
import { DeepLearningGuideModal } from './components/DeepLearningGuideModal';
import { SavedModulDrawer } from './components/SavedModulDrawer';
import { IceBreakingModal } from './components/IceBreakingModal';
import { LkpdModal } from './components/LkpdModal';
import { AssessmentModal } from './components/AssessmentModal';
import { PrintPreviewModal } from './components/PrintPreviewModal';
import { BahanAjarModal } from './components/BahanAjarModal';
import { ShareOnlineModal } from './components/ShareOnlineModal';
import { ModulInputData, SavedModul } from './types';
import { generateClientModulAjar, generateClientBahanAjar } from './utils/fallbackGenerator';
import confetti from 'canvas-confetti';
import { Heart, Brain, BookOpen, Layers } from 'lucide-react';

const STORAGE_KEY = 'MODUL_AJAR_PAI_DEEP_LEARNING_ITEMS';

const defaultInputData: ModulInputData = {
  namaSekolah: 'SD Negeri Teladan Kasih Sayang',
  namaGuru: 'Mukhamad Fakhrudin Rifki, S. Pd.I',
  nip: '199201072019031003',
  namaKepalaSekolah: 'Hadi Kustantoro, S.Pd. SD.',
  nipKepalaSekolah: '196803141993081002',
  semester: 'Ganjil',
  tahunAjaran: '2025/2026',
  mataPelajaran: 'Pendidikan Agama Islam dan Budi Pekerti',
  faseKelas: 'Fase B (SD Kelas 3-4)',
  elemen: 'Akidah',
  materi: 'Mengenal Asmaul Husna: Al-Wahhab (Maha Pemberi) dan Al-Alim (Maha Mengetahui) dengan Kasih Sayang',
  capaianPembelajaran: 'Peserta didik mampu memahami sifat-sifat Allah Swt. terutama Al-Wahhab dan Al-Alim, merasakan kehadiran dan kasih sayang Allah dalam kehidupan sehari-hari, serta meneladaninya dengan gemar berbagi dan jujur dalam perkataan maupun perbuatan.',
  jumlahPertemuan: '1 Pertemuan (4 JP)',
  alokasiWaktu: '4 JP x 35-40 Menit (1 Pertemuan = 4 JP)',
  metodePembelajaran: 'Problem Based Learning (PBL)',
  targetDimensiLulusan: 'Keimanan dan Ketakwaan terhadap Tuhan YME, Penalaran Kritis, Kolaborasi, Komunikasi, serta Karakter Kasih Sayang (Rahmatan lil \'Alamin)',
  karakterRahmatanLilAlamin: [
    'Tasamuh (Toleransi)',
    'Qudwah (Keteladanan)',
    'Rifq (Kelembutan Hati)',
    'Tawassuth (Moderat)',
    'Mahabbah (Cinta Kasih)'
  ],
  dimensiProfilPancasila: [
    'Keimanan dan Ketakwaan terhadap Tuhan YME',
    'Penalaran Kritis',
    'Kolaborasi',
    'Komunikasi'
  ],
  additionalNotes: 'Sajikan materi ajar yang sangat komprehensif, kaya cerita bergambar anak SD, tadabbur ayat/hadis, percakapan teladan ramah anak, serta lembar latihan dan jurnal bintang kebaikan.'
};

export default function App() {
  const [inputData, setInputData] = useState<ModulInputData>(defaultInputData);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [bahanAjarContent, setBahanAjarContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [currentModulId, setCurrentModulId] = useState<string>('current-preview');
  
  // Modals and Drawers
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isBahanAjarOpen, setIsBahanAjarOpen] = useState(false);
  const [isIceBreakingOpen, setIsIceBreakingOpen] = useState(false);
  const [isLkpdOpen, setIsLkpdOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  const [isShareOnlineOpen, setIsShareOnlineOpen] = useState(false);

  // Saved archive list
  const [savedList, setSavedList] = useState<SavedModul[]>([]);

  // Generation step progression feedback and target
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [loadingTarget, setLoadingTarget] = useState<'rpp' | 'bahanAjar' | 'both' | null>(null);
  const [activeViewerTab, setActiveViewerTab] = useState<'rpp' | 'bahanAjar'>('rpp');

  useEffect(() => {
    // Load saved moduls from local storage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSavedList(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading saved items', e);
    }
  }, []);

  // Initial instant generator or template render
  useEffect(() => {
    if (!generatedContent) {
      handleGenerateBoth(defaultInputData);
    }
  }, []);

  // 1. Generate RPP / Modul Ajar Guru Only
  const handleGenerateModulOnly = async (data: ModulInputData) => {
    try {
      setIsLoading(true);
      setLoadingTarget('rpp');
      setInputData(data);
      setLoadingStep('Menyusun RPP / Modul Ajar Deep Learning (4 JP) Standar Permendikbudristek 12/2024...');

      const res = await fetch('/api/generate-modul', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let modulText = '';
      if (res.ok) {
        const resData = await res.json();
        if (resData.modulAjar && resData.modulAjar.trim().length > 50) {
          modulText = resData.modulAjar;
        }
      }

      if (!modulText) {
        modulText = generateClientModulAjar(data);
      }

      // Ensure Bahan Ajar is also populated if not yet present
      if (!bahanAjarContent) {
        setBahanAjarContent(generateClientBahanAjar(data));
      }

      setGeneratedContent(modulText);
      setActiveViewerTab('rpp');
      setCurrentModulId(`modul-${Date.now()}`);

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.warn('Fallback to client RPP engine:', err);
      const clientContent = generateClientModulAjar(data);
      setGeneratedContent(clientContent);
      if (!bahanAjarContent) {
        setBahanAjarContent(generateClientBahanAjar(data));
      }
      setActiveViewerTab('rpp');
      setCurrentModulId(`modul-${Date.now()}`);
    } finally {
      setIsLoading(false);
      setLoadingTarget(null);
      setLoadingStep('');
    }
  };

  // 2. Generate Bahan Ajar Siswa Only (Kajian Mendalam >700 Kata)
  const handleGenerateBahanAjarOnly = async (data: ModulInputData) => {
    try {
      setIsLoading(true);
      setLoadingTarget('bahanAjar');
      setInputData(data);
      setLoadingStep('Menyusun Naskah Bahan Ajar Tematik Komprehensif (Kajian Mendalam >700 Kata)...');

      const res = await fetch('/api/generate-bahan-ajar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let bahanText = '';
      if (res.ok) {
        const resData = await res.json();
        if (resData.bahanAjar && resData.bahanAjar.trim().length > 50) {
          bahanText = resData.bahanAjar;
        }
      }

      if (!bahanText) {
        bahanText = generateClientBahanAjar(data);
      }

      // Ensure RPP is also populated if not yet present
      if (!generatedContent) {
        setGeneratedContent(generateClientModulAjar(data));
      }

      setBahanAjarContent(bahanText);
      setActiveViewerTab('bahanAjar');
      setCurrentModulId(`modul-${Date.now()}`);

      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.warn('Fallback to client Bahan Ajar engine:', err);
      const clientBahan = generateClientBahanAjar(data);
      setBahanAjarContent(clientBahan);
      if (!generatedContent) {
        setGeneratedContent(generateClientModulAjar(data));
      }
      setActiveViewerTab('bahanAjar');
      setCurrentModulId(`modul-${Date.now()}`);
    } finally {
      setIsLoading(false);
      setLoadingTarget(null);
      setLoadingStep('');
    }
  };

  // 3. Generate Both in Parallel (Bersambung & Terintegrasi)
  const handleGenerateBoth = async (data: ModulInputData) => {
    try {
      setIsLoading(true);
      setLoadingTarget('both');
      setInputData(data);
      setLoadingStep('1. Mengintegrasikan RPP & Bahan Ajar Saling Bersambung...');

      const stepTimer1 = setTimeout(() => {
        setLoadingStep('2. Menyusun Kajian Materi Tematik Komprehensif (>700 kata)...');
      }, 1200);

      const stepTimer2 = setTimeout(() => {
        setLoadingStep('3. Merumuskan Sintaks Mindful, Meaningful, & Joyful Learning...');
      }, 2600);

      // Generate Modul Ajar (RPP) & Bahan Ajar in parallel
      const [modulRes, bahanRes] = await Promise.allSettled([
        fetch('/api/generate-modul', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
        fetch('/api/generate-bahan-ajar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      ]);

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      let modulText = '';
      let bahanText = '';

      if (modulRes.status === 'fulfilled' && modulRes.value.ok) {
        const resData = await modulRes.value.json();
        if (resData.modulAjar && resData.modulAjar.trim().length > 50) {
          modulText = resData.modulAjar;
        }
      }

      if (bahanRes.status === 'fulfilled' && bahanRes.value.ok) {
        const bData = await bahanRes.value.json();
        if (bData.bahanAjar && bData.bahanAjar.trim().length > 50) {
          bahanText = bData.bahanAjar;
        }
      }

      if (!modulText) {
        modulText = generateClientModulAjar(data);
      }
      if (!bahanText) {
        bahanText = generateClientBahanAjar(data);
      }

      setGeneratedContent(modulText);
      setBahanAjarContent(bahanText);
      setCurrentModulId(`modul-${Date.now()}`);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.warn('Network or API issue, generating with client curriculum engine:', err);
      const clientContent = generateClientModulAjar(data);
      const clientBahan = generateClientBahanAjar(data);
      setGeneratedContent(clientContent);
      setBahanAjarContent(clientBahan);
      setCurrentModulId(`modul-${Date.now()}`);
    } finally {
      setIsLoading(false);
      setLoadingTarget(null);
      setLoadingStep('');
    }
  };

  const handleRefineContent = async (instruction: string) => {
    if (!generatedContent) return;
    try {
      setIsRefining(true);
      const isTargetBahanAjar = instruction.toLowerCase().includes('bahan ajar');
      const currentTarget = isTargetBahanAjar ? (bahanAjarContent || generatedContent) : generatedContent;

      const res = await fetch('/api/refine-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentContent: currentTarget,
          instruction,
        }),
      });

      if (!res.ok) throw new Error('Refine failed');
      const data = await res.json();
      if (data.updatedContent) {
        if (isTargetBahanAjar) {
          setBahanAjarContent(data.updatedContent);
        } else {
          setGeneratedContent(data.updatedContent);
        }
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.7 },
        });
      }
    } catch (err) {
      console.error(err);
      alert('Gagal memperbarui bagian dokumen.');
    } finally {
      setIsRefining(false);
    }
  };

  const handleSaveModul = () => {
    if (!generatedContent) return;
    const isAlreadySaved = savedList.some((item) => item.id === currentModulId);
    let updated: SavedModul[];

    if (isAlreadySaved) {
      updated = savedList.map((item) =>
        item.id === currentModulId
          ? { ...item, content: generatedContent, bahanAjarContent, inputData }
          : item
      );
    } else {
      const newEntry: SavedModul = {
        id: currentModulId,
        title: inputData.materi || 'Modul Ajar PAI',
        materi: inputData.materi,
        faseKelas: inputData.faseKelas,
        elemen: inputData.elemen,
        createdAt: new Date().toISOString(),
        content: generatedContent,
        bahanAjarContent,
        inputData,
      };
      updated = [newEntry, ...savedList];
    }

    setSavedList(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    confetti({ particleCount: 25, spread: 40, origin: { y: 0.8 } });
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedList.filter((item) => item.id !== id);
    setSavedList(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSelectSaved = (modul: SavedModul) => {
    setInputData(modul.inputData || defaultInputData);
    setGeneratedContent(modul.content);
    setBahanAjarContent(modul.bahanAjarContent || generateClientBahanAjar(modul.inputData || defaultInputData));
    setCurrentModulId(modul.id);
  };

  const isCurrentSaved = savedList.some((item) => item.id === currentModulId);

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Header */}
      <Header
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        savedCount={savedList.length}
        onOpenBahanAjar={() => setIsBahanAjarOpen(true)}
        onOpenIceBreaking={() => setIsIceBreakingOpen(true)}
        onOpenLKPD={() => setIsLkpdOpen(true)}
        onOpenAssessment={() => setIsAssessmentOpen(true)}
        onOpenShareOnline={() => setIsShareOnlineOpen(true)}
      />

      {/* Main Studio Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-6 flex flex-col gap-4">
        {/* Soft, Eye-Friendly Header Strip */}
        <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-900">
                  Pembelajaran Mendalam (Deep Learning) & Pedagogi Cinta PAI
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.2 rounded-full border border-emerald-200">
                  1 Pertemuan = 4 JP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Pilar: <strong>Mindful</strong> (Tadabbur), <strong>Meaningful</strong> (Makna Kontekstual), <strong>Joyful</strong> (Aktivitas Bermakna) &bull; Rahmatan lil &lsquo;Alamin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsBahanAjarOpen(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Modal Bahan Ajar Siswa</span>
            </button>
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200"
            >
              Panduan
            </button>
          </div>
        </div>

        {/* Studio Grid (Form on Left, Live Document on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start flex-1 min-h-[640px]">
          {/* Left Column: Config Form (5 cols) */}
          <div className="lg:col-span-5 h-full">
            <ModulForm
              initialData={inputData}
              onGenerateModul={handleGenerateModulOnly}
              onGenerateBahanAjar={handleGenerateBahanAjarOnly}
              onGenerateBoth={handleGenerateBoth}
              isLoading={isLoading}
              loadingTarget={loadingTarget}
            />
          </div>

          {/* Right Column: Viewer & Exporter (7 cols) */}
          <div className="lg:col-span-7 h-full relative">
            {isLoading ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 h-full min-h-[500px] flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-emerald-700">
                    <Heart className="w-6 h-6 fill-emerald-600 text-emerald-600 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-800 font-serif">
                    {loadingTarget === 'rpp'
                      ? 'AI Sedang Menyusun RPP / Modul Ajar...'
                      : loadingTarget === 'bahanAjar'
                      ? 'AI Sedang Menyusun Bahan Ajar Siswa (>700 Kata)...'
                      : 'AI Sedang Menyusun RPP & Bahan Ajar Bersambung...'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm">
                    {loadingTarget === 'rpp'
                      ? 'Menyusun langkah pembelajaran Deep Learning, rubrik asesmen, dan alokasi 4 JP sesuai Permendikbudristek No. 12/2024.'
                      : loadingTarget === 'bahanAjar'
                      ? 'Mengembangkan kajian materi tematik komprehensif, telaah dalil Al-Qur\'an & Hadis, wawasan sains-sejarah, dan bank evaluasi HOTS.'
                      : 'Menyusun RPP dan Bahan Ajar Siswa komprehensif yang saling terintegrasi dan bersambung secara harmonis.'}
                  </p>
                </div>
                {loadingStep && (
                  <div className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200 animate-pulse">
                    {loadingStep}
                  </div>
                )}
              </div>
            ) : generatedContent ? (
              <ModulViewer
                content={generatedContent}
                bahanAjarContent={bahanAjarContent}
                inputData={inputData}
                activeTab={activeViewerTab}
                onTabChange={setActiveViewerTab}
                onSave={handleSaveModul}
                isSaved={isCurrentSaved}
                onPrintPreview={() => setIsPrintPreviewOpen(true)}
                onRefine={handleRefineContent}
                isRefining={isRefining}
                onOpenIceBreaking={() => setIsIceBreakingOpen(true)}
                onOpenLKPD={() => setIsLkpdOpen(true)}
                onOpenAssessment={() => setIsAssessmentOpen(true)}
                onOpenBahanAjar={() => setIsBahanAjarOpen(true)}
              />
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center h-full min-h-[450px] shadow-sm text-slate-400">
                <BookOpen className="w-12 h-12 mb-3 text-slate-300" />
                <h3 className="font-bold text-slate-700 text-sm">Belum Ada Modul yang Dihasilkan</h3>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Pilih konfigurasi di panel sebelah kiri lalu klik tombol &ldquo;Hasilkan Modul Ajar Lengkap&rdquo;.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>Modul Ajar & Bahan Ajar PAI Deep Learning</strong> &bull; Sesuai Permendikbudristek No. 12 Tahun 2024
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Pedagogi Kasih Sayang</span>
            <span>&bull;</span>
            <span>Rahmatan lil &lsquo;Alamin</span>
            <span>&bull;</span>
            <span>Mindful, Meaningful, Joyful</span>
          </div>
        </div>
      </footer>

      {/* Supporting Modals & Drawers */}
      <BahanAjarModal
        isOpen={isBahanAjarOpen}
        onClose={() => setIsBahanAjarOpen(false)}
        inputData={inputData}
        initialContent={bahanAjarContent}
        onUpdateContent={(updated) => setBahanAjarContent(updated)}
      />

      <DeepLearningGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <SavedModulDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedList={savedList}
        onSelect={handleSelectSaved}
        onDelete={handleDeleteSaved}
      />

      <IceBreakingModal
        isOpen={isIceBreakingOpen}
        onClose={() => setIsIceBreakingOpen(false)}
        materi={inputData.materi}
        faseKelas={inputData.faseKelas}
      />

      <LkpdModal
        isOpen={isLkpdOpen}
        onClose={() => setIsLkpdOpen(false)}
        inputData={inputData}
      />

      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        inputData={inputData}
      />

      <PrintPreviewModal
        isOpen={isPrintPreviewOpen}
        onClose={() => setIsPrintPreviewOpen(false)}
        content={generatedContent}
        inputData={inputData}
      />

      <ShareOnlineModal
        isOpen={isShareOnlineOpen}
        onClose={() => setIsShareOnlineOpen(false)}
      />
    </div>
  );
}
