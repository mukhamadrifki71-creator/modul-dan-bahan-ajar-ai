import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Bookmark, 
  Sparkles, 
  Send, 
  FileText, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Heart, 
  Award,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { ModulInputData } from '../types';
import { exportModulToWord, exportBahanAjarToWord } from '../utils/docxExport';
import confetti from 'canvas-confetti';

interface ModulViewerProps {
  content: string;
  bahanAjarContent?: string;
  inputData: Partial<ModulInputData>;
  activeTab?: 'rpp' | 'bahanAjar';
  onTabChange?: (tab: 'rpp' | 'bahanAjar') => void;
  onSave: () => void;
  isSaved: boolean;
  onPrintPreview: () => void;
  onRefine: (instruction: string) => Promise<void>;
  isRefining: boolean;
  onOpenIceBreaking: () => void;
  onOpenLKPD: () => void;
  onOpenAssessment: () => void;
  onOpenBahanAjar?: () => void;
}

export const ModulViewer: React.FC<ModulViewerProps> = ({
  content,
  bahanAjarContent = '',
  inputData,
  activeTab: controlledActiveTab,
  onTabChange,
  onSave,
  isSaved,
  onPrintPreview,
  onRefine,
  isRefining,
  onOpenIceBreaking,
  onOpenLKPD,
  onOpenAssessment,
  onOpenBahanAjar,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<'rpp' | 'bahanAjar'>('rpp');
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const setActiveTab = (tab: 'rpp' | 'bahanAjar') => {
    if (onTabChange) {
      onTabChange(tab);
    }
    setInternalActiveTab(tab);
  };

  const [copied, setCopied] = useState(false);
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [customRefinePrompt, setCustomRefinePrompt] = useState('');
  const [showRefineBox, setShowRefineBox] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeContent = activeTab === 'rpp' ? content : (bahanAjarContent || content);

  // Calculate word count
  const wordCount = React.useMemo(() => {
    if (!activeContent) return 0;
    return activeContent.trim().split(/\s+/).filter(Boolean).length;
  }, [activeContent]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleExportWord = async () => {
    try {
      setIsExportingWord(true);
      if (activeTab === 'rpp') {
        await exportModulToWord(
          `Modul_Ajar_PAI_SD_${inputData.materi || 'DeepLearning'}`,
          content,
          inputData
        );
      } else {
        await exportBahanAjarToWord(
          `Materi_Ajar_PAI_SD_${inputData.materi || 'DeepLearning'}`,
          bahanAjarContent || content,
          inputData
        );
      }
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (err) {
      console.error('Failed to export Word', err);
    } finally {
      setIsExportingWord(false);
    }
  };

  const handleQuickRefineSubmit = async (instruction: string) => {
    if (!instruction.trim() || isRefining) return;
    const targetLabel = activeTab === 'rpp' ? 'modul ajar/RPP' : 'materi ajar SD';
    await onRefine(`[Target: ${targetLabel}] ${instruction}`);
    setCustomRefinePrompt('');
  };

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-4 z-50 shadow-2xl overflow-hidden'
          : 'h-full overflow-hidden'
      }`}
    >
      {/* Top Main Toolbar - Eye-Friendly Soft Light Style */}
      <div className="p-3 bg-slate-50 text-slate-800 flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            {activeTab === 'rpp' ? <FileText className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 font-serif line-clamp-1">
                {inputData.materi || 'Materi & Pembelajaran PAI SD'}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.2 rounded-full border border-emerald-200">
                <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
                SD &bull; 1 Sesi = 4 JP
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {inputData.faseKelas || 'Fase B (SD Kelas 3-4)'} &bull; {inputData.elemen || 'Akidah'} &bull; {inputData.jumlahPertemuan || '1 Pertemuan (4 JP)'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-1.5 text-xs">
          {/* Save to Local Archive */}
          <button
            id="btn-save-modul"
            type="button"
            onClick={onSave}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all ${
              isSaved
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isSaved ? 'Tersimpan' : 'Simpan'}</span>
          </button>

          {/* Copy */}
          <button
            id="btn-copy-modul"
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Salin</span>
              </>
            )}
          </button>

          {/* Export to Word */}
          <button
            id="btn-export-word"
            type="button"
            onClick={handleExportWord}
            disabled={isExportingWord}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExportingWord ? 'Mengunduh...' : 'Unduh .DOCX'}</span>
          </button>

          {/* Print / PDF Preview */}
          <button
            id="btn-print-preview"
            type="button"
            onClick={onPrintPreview}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Cetak</span>
          </button>

          {/* Refine Trigger */}
          <button
            id="btn-toggle-refine"
            type="button"
            onClick={() => setShowRefineBox(!showRefineBox)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
              showRefineBox
                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">AI Refine</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            id="btn-toggle-fullscreen"
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Dual Document View Switcher Tab - Soft Light Styling */}
      <div className="bg-slate-100/90 px-3 py-2 flex flex-wrap items-center justify-between border-b border-slate-200 gap-2">
        <div className="flex items-center gap-1.5">
          {/* Tab 1: RPP / Modul Ajar */}
          <button
            id="tab-view-rpp"
            type="button"
            onClick={() => setActiveTab('rpp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'rpp'
                ? 'bg-white text-emerald-900 border border-emerald-300 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
            <span>1. RPP / Modul Ajar Guru</span>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] px-1.5 py-0.2 rounded-full font-semibold">
              4 JP &bull; Resmi
            </span>
          </button>

          {/* Tab 2: Bahan Ajar / Materi Siswa */}
          <button
            id="tab-view-bahan-ajar"
            type="button"
            onClick={() => setActiveTab('bahanAjar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'bahanAjar'
                ? 'bg-white text-teal-900 border border-teal-300 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-700" />
            <span>2. Bahan Ajar Siswa</span>
            <span className="bg-teal-50 text-teal-800 border border-teal-200 text-[9px] px-1.5 py-0.2 rounded-full font-semibold">
              Kajian &gt;700 Kata
            </span>
          </button>
        </div>

        {/* Word count & Connection Status Indicator */}
        <div className="flex items-center gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700 font-medium">
            <span>Panjang Dokumen:</span>
            <strong className="text-slate-900">{wordCount.toLocaleString('id-ID')} kata</strong>
            {activeTab === 'bahanAjar' && wordCount >= 700 && (
              <span className="text-emerald-700 font-bold ml-0.5" title="Memenuhi kriteria mendalam >700 kata">
                ✓
              </span>
            )}
          </span>
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-medium hidden lg:inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            RPP &amp; Bahan Ajar Bersambung
          </span>
        </div>
      </div>

      {/* AI Refine Quick Bar - Soft Light Theme */}
      {showRefineBox && (
        <div className="p-3 bg-purple-50/90 border-b border-purple-200 text-purple-950 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Instruksi Penyesuaian AI ({activeTab === 'rpp' ? 'RPP Guru' : 'Bahan Ajar Siswa'})</span>
            </div>
            <span className="text-[10px] text-purple-700">
              Perbaiki atau tambahkan rincian dokumen
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customRefinePrompt}
              onChange={(e) => setCustomRefinePrompt(e.target.value)}
              placeholder={activeTab === 'rpp' 
                ? "Contoh: Perdalam bagian Mindful Tadabbur dengan kisah inspiratif..."
                : "Contoh: Tambahkan cerita menyentuh hati di pendahuluan bahan ajar..."}
              className="flex-1 px-3 py-1.5 rounded-lg text-xs bg-white border border-purple-300 text-purple-950 placeholder-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-600"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleQuickRefineSubmit(customRefinePrompt);
              }}
            />
            <button
              id="btn-submit-refine"
              type="button"
              onClick={() => handleQuickRefineSubmit(customRefinePrompt)}
              disabled={isRefining || !customRefinePrompt.trim()}
              className="px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 transition-colors shrink-0 shadow-2xs"
            >
              {isRefining ? (
                <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>Proses</span>
            </button>
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
            <span className="text-purple-700 font-medium">Preset:</span>
            {[
              'Perkuat Ice Breaking Kasih Sayang',
              'Perdalam Kisah Inspiratif Menyapa Hati',
              'Tambahkan Soal HOTS Studi Kasus',
              'Sertakan Dalil Hadis Tambahan',
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleQuickRefineSubmit(preset)}
                className="px-2 py-0.5 rounded bg-white hover:bg-purple-100 text-purple-800 border border-purple-200 transition-colors"
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Document Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/60">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-8 font-sans text-slate-800 leading-relaxed">
          {/* Official Document Header Badge */}
          <div className="border-b border-slate-200 pb-3 mb-5 text-center">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1.5">
              {activeTab === 'rpp' 
                ? 'KURIKULUM MERDEKA • PERMENDIKBUDRISTEK NO. 12 TAHUN 2024'
                : 'BAHAN AJAR & BUKU BACAAN PESERTA DIDIK PAI'}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
              {activeTab === 'rpp' 
                ? 'MODUL AJAR / RENCANA PELAKSANAAN PEMBELAJARAN'
                : 'BAHAN AJAR SISWA: MENJELAJAHI HIKMAH DENGAN HATI'}
            </h2>
            <p className="text-xs font-semibold text-emerald-800 mt-0.5">
              PENDEKATAN DEEP LEARNING (MINDFUL, MEANINGFUL, JOYFUL) & PEDAGOGI KASIH SAYANG
            </p>
          </div>

          {/* Render Markdown Content */}
          <div className="markdown-body prose prose-slate max-w-none text-xs sm:text-sm">
            <Markdown>{activeContent}</Markdown>
          </div>

          {/* Quick Helper Floating Footer */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4 rounded-b-xl">
            <div className="text-xs text-slate-500">
              Komponen Pembelajaran Terintegrasi:
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {onOpenBahanAjar && (
                <button
                  type="button"
                  onClick={onOpenBahanAjar}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50 transition-colors shadow-2xs"
                >
                  📖 Modal Bahan Ajar
                </button>
              )}
              <button
                type="button"
                onClick={onOpenIceBreaking}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-rose-800 border border-rose-200 hover:bg-rose-50 transition-colors shadow-2xs"
              >
                + Ice Breaking Cinta
              </button>
              <button
                type="button"
                onClick={onOpenLKPD}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-teal-800 border border-teal-200 hover:bg-teal-50 transition-colors shadow-2xs"
              >
                + Format LKPD
              </button>
              <button
                type="button"
                onClick={onOpenAssessment}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-indigo-800 border border-indigo-200 hover:bg-indigo-50 transition-colors shadow-2xs"
              >
                + Asesmen HOTS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
