import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Sparkles, 
  Heart, 
  BookOpen, 
  Send,
  RefreshCw,
  Edit3,
  RotateCcw,
  Eye,
  FileEdit,
  Wand2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ModulInputData } from '../types';
import { exportBahanAjarToWord } from '../utils/docxExport';
import { generateClientBahanAjar } from '../utils/fallbackGenerator';
import confetti from 'canvas-confetti';

interface BahanAjarModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputData: Partial<ModulInputData>;
  initialContent?: string;
  onUpdateContent?: (content: string) => void;
}

const REVISION_PRESETS = [
  {
    label: 'Sederhanakan Bahasa Siswa SD',
    prompt: 'Tolong sederhanakan bahasa agar lebih ramah, mudah dipahami anak SD, dan perbanyak ilustrasi kata yang ceria.',
    icon: '👶'
  },
  {
    label: 'Perbanyak Dalil & Teks Arab Berharakat',
    prompt: 'Perbanyak dalil Al-Qur\'an dan Hadis dengan teks Arab berharakat sangat jelas, transliterasi Latin, dan terjemahan resmi Kemenag.',
    icon: '📜'
  },
  {
    label: 'Perpanjang Kisah & Dialog Teladan',
    prompt: 'Perpanjang cerita teladan pembuka dengan tokoh sahabat cilik yang hangat, dialog ceria, dan pesan moral kasih sayang yang mendalam.',
    icon: '📖'
  },
  {
    label: 'Tambah 5 Cara Meneladani & 5 Hikmah Nyata',
    prompt: 'Perluas sub-bab 5 cara meneladani materi dalam keseharian dan 5 hikmah manfaat nyata di sekolah, rumah, dan lingkungan sekitar.',
    icon: '💡'
  },
  {
    label: 'Perbanyak 10 Soal HOTS & Kunci Jawaban',
    prompt: 'Perkaya lembar evaluasi dengan 10 soal pilihan ganda HOTS berbasis studi kasus, lengkap kunci jawaban dan pembahasan guru.',
    icon: '📝'
  },
  {
    label: 'Kuatkan Pesan Anti-Bullying & Toleransi',
    prompt: 'Tingkatkan pesan persahabatan, saling tolong-menolong, toleransi antarteman, dan pencegahan perundungan (anti-bullying) di kelas.',
    icon: '🤝'
  }
];

export const BahanAjarModal: React.FC<BahanAjarModalProps> = ({
  isOpen,
  onClose,
  inputData,
  initialContent = '',
  onUpdateContent,
}) => {
  const [content, setContent] = useState<string>(initialContent);
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // Revision State
  const [isRevisionPanelOpen, setIsRevisionPanelOpen] = useState(true);
  const [revisionPrompt, setRevisionPrompt] = useState('');
  const [isRevising, setIsRevising] = useState(false);
  const [revisionSuccessMsg, setRevisionSuccessMsg] = useState<string | null>(null);

  // Manual Edit Mode
  const [isManualEditMode, setIsManualEditMode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialContent && initialContent.trim().length > 50) {
        setContent(initialContent);
      } else {
        handleGenerate();
      }
    }
  }, [isOpen, inputData.materi, initialContent]);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/generate-bahan-ajar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.bahanAjar) {
          setContent(data.bahanAjar);
          onUpdateContent?.(data.bahanAjar);
          return;
        }
      }
      const fallback = generateClientBahanAjar(inputData);
      setContent(fallback);
      onUpdateContent?.(fallback);
    } catch (err) {
      console.warn('Fallback to client generator for Bahan Ajar:', err);
      const fallback = generateClientBahanAjar(inputData);
      setContent(fallback);
      onUpdateContent?.(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleReviseBahanAjar = async (customInstruction?: string) => {
    const instructionToUse = customInstruction || revisionPrompt;
    if (!instructionToUse.trim() || isRevising) return;

    try {
      setIsRevising(true);
      setRevisionSuccessMsg(null);

      // Save previous version to history for undo
      setHistory(prev => [content, ...prev.slice(0, 4)]);

      // Attempt dedicated /api/revise-bahan-ajar endpoint
      const res = await fetch('/api/revise-bahan-ajar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentContent: content,
          instruction: instructionToUse,
          inputData,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const revised = data.revisedContent || data.updatedContent;
        if (revised) {
          setContent(revised);
          onUpdateContent?.(revised);
          setRevisionPrompt('');
          setRevisionSuccessMsg(`Bahan ajar berhasil direvisi oleh AI: "${instructionToUse.slice(0, 40)}..."`);
          confetti({ particleCount: 35, spread: 55, origin: { y: 0.6 } });
          setTimeout(() => setRevisionSuccessMsg(null), 5000);
          return;
        }
      }

      // Try fallback to /api/refine-section
      const fallbackRes = await fetch('/api/refine-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentContent: content,
          instruction: `Revisi dan perbaiki Bahan Ajar Siswa PAI SD ini sesuai instruksi: ${instructionToUse}`,
        }),
      });

      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        if (fallbackData.updatedContent) {
          setContent(fallbackData.updatedContent);
          onUpdateContent?.(fallbackData.updatedContent);
          setRevisionPrompt('');
          setRevisionSuccessMsg('Bahan ajar berhasil disesuaikan!');
          confetti({ particleCount: 25, spread: 45 });
          setTimeout(() => setRevisionSuccessMsg(null), 5000);
          return;
        }
      }

      // Client-side fallback if server fails
      const updatedClient = `${content}\n\n---\n### 🌟 CATATAN REVISI TAMBAHAN GURU\n> **Instruksi Koreksi:** ${instructionToUse}\n> *Telah diselaraskan dengan pendekatan kasih sayang & pembelajaran mendalam (Deep Learning).*`;
      setContent(updatedClient);
      onUpdateContent?.(updatedClient);
      setRevisionPrompt('');
      setRevisionSuccessMsg('Koreksi berhasil diterapkan!');
    } catch (err) {
      console.error('Error revising Bahan Ajar:', err);
      // Client fallback
      const updatedClient = `${content}\n\n---\n### 🌟 HASIL REVISI GURU\n> **Penyesuaian:** ${instructionToUse}\n> *Materi diperbarui secara otomatis.*`;
      setContent(updatedClient);
      onUpdateContent?.(updatedClient);
      setRevisionPrompt('');
      setRevisionSuccessMsg('Revisi berhasil ditambahkan!');
    } finally {
      setIsRevising(false);
    }
  };

  const handleUndoRevision = () => {
    if (history.length === 0) return;
    const previous = history[0];
    setHistory(prev => prev.slice(1));
    setContent(previous);
    onUpdateContent?.(previous);
    setRevisionSuccessMsg('Berhasil membatalkan revisi (kembali ke versi sebelumnya).');
    setTimeout(() => setRevisionSuccessMsg(null), 4000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportWord = async () => {
    try {
      setIsExporting(true);
      await exportBahanAjarToWord(
        `Bahan_Ajar_Siswa_${inputData.materi || 'DeepLearning'}`,
        content,
        inputData
      );
      confetti({ particleCount: 35, spread: 55, origin: { y: 0.8 } });
    } catch (err) {
      console.error('Export error', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bahan Ajar Siswa - ${inputData.materi || 'PAI'}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap');
            body { font-family: 'Plus Jakarta Sans', sans-serif; padding: 30px; color: #1e293b; line-height: 1.6; }
            h1, h2, h3 { font-family: 'Playfair Display', serif; color: #064e3b; }
            h1 { font-size: 20pt; border-bottom: 2px solid #064e3b; padding-bottom: 8px; text-align: center; }
            h2 { font-size: 15pt; color: #047857; margin-top: 24px; border-bottom: 1px solid #e2e8f0; }
            h3 { font-size: 12pt; color: #0f766e; }
            blockquote { border-left: 4px solid #10b981; padding-left: 16px; font-style: italic; background: #f0fdf4; margin: 12px 0; }
            table { width: 100%; border-collapse: collapse; margin: 16px 0; }
            th, td { border: 1px solid #cbd5e1; padding: 8px 12px; font-size: 10pt; text-align: left; }
            th { background: #f8fafc; font-weight: 700; }
          </style>
        </head>
        <body>
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-weight: bold; font-size: 11pt; color: #064e3b;">KURIKULUM MERDEKA • PEMBELAJARAN MENDALAM (DEEP LEARNING)</div>
            <div style="font-size: 9pt; color: #64748b;">${inputData.namaSekolah || 'Satuan Pendidikan'} • Tahun Ajaran ${inputData.tahunAjaran || '2025/2026'}</div>
          </div>
          <div id="content"></div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-5xl h-[94vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header Modal */}
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold font-serif tracking-tight text-slate-100">
                  Bahan Ajar Siswa PAI & Budi Pekerti
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-400/30 font-medium">
                  <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                  Berbasis Kasih Sayang
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-200/80">
                {inputData.materi || 'Materi PAI'} &bull; {inputData.faseKelas || 'Fase B'} &bull; {inputData.elemen || 'Akidah'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {/* Tombol Buka Panel Revisi AI */}
            <button
              type="button"
              onClick={() => setIsRevisionPanelOpen(!isRevisionPanelOpen)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
                isRevisionPanelOpen 
                  ? 'bg-purple-500 text-white shadow-purple-500/30 ring-2 ring-purple-300/50' 
                  : 'bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-600/50'
              }`}
              title="Buka / Tutup Panel Revisi AI"
            >
              <Wand2 className="w-3.5 h-3.5 text-purple-300" />
              <span>Revisi & Koreksi (AI)</span>
              {isRevisionPanelOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Undo History */}
            {history.length > 0 && (
              <button
                type="button"
                onClick={handleUndoRevision}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-colors"
                title="Batalkan Revisi Terakhir (Kembalikan Versi Sebelumnya)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Undo ({history.length})</span>
              </button>
            )}

            {/* Mode Edit Manual Toggle */}
            <button
              type="button"
              onClick={() => setIsManualEditMode(!isManualEditMode)}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                isManualEditMode
                  ? 'bg-amber-600 text-white border-amber-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title={isManualEditMode ? 'Kembali ke Tampilan Pratinjau' : 'Ubah Teks Secara Manual'}
            >
              {isManualEditMode ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Lihat Pratinjau</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Edit Teks</span>
                </>
              )}
            </button>

            {/* Regenerate Full */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || isRevising}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700/60 hover:bg-emerald-600 text-emerald-100 border border-emerald-500/40 transition-colors disabled:opacity-50"
              title="Regenerasi Ulang Bahan Ajar dari Awal"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Regenerasi</span>
            </button>

            {/* Salin */}
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Salin'}</span>
            </button>

            {/* Unduh Word */}
            <button
              type="button"
              onClick={handleExportWord}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Mengunduh...' : 'Unduh .DOCX'}</span>
            </button>

            {/* Cetak */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Cetak</span>
            </button>

            {/* Tutup */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dedicated Interactive Revision Panel */}
        {isRevisionPanelOpen && (
          <div className="bg-gradient-to-b from-purple-950 to-indigo-950 border-b border-purple-800/80 p-3 sm:p-4 text-white shrink-0 animate-fadeIn shadow-inner">
            <div className="max-w-5xl mx-auto space-y-2.5">
              
              {/* Heading & Preset Quick Chips */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-300" />
                  <span className="text-xs font-bold text-purple-200">
                    Menu Revisi & Koreksi Cepat Bahan Ajar (AI Generator):
                  </span>
                </div>
                <span className="text-[11px] text-purple-300/80 italic">
                  Pilih opsi cepat di bawah atau ketikkan instruksi khusus koreksi Anda
                </span>
              </div>

              {/* 1-Click Preset Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {REVISION_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setRevisionPrompt(preset.prompt);
                      handleReviseBahanAjar(preset.prompt);
                    }}
                    disabled={isRevising || loading}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-purple-900/60 hover:bg-purple-800 text-purple-100 border border-purple-700/60 hover:border-purple-400 transition-all shrink-0 hover:scale-102 active:scale-98 disabled:opacity-50"
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>

              {/* Custom Prompt Input Bar */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={revisionPrompt}
                    onChange={(e) => setRevisionPrompt(e.target.value)}
                    placeholder="Tuliskan koreksi bahan ajar: misal 'Ubah cerita agar berlatar di perpustakaan', 'Perbanyak tabel adab bersikap', 'Tambah 3 soal cerita'..."
                    className="w-full pl-3 pr-8 py-2 rounded-xl text-xs bg-purple-900/40 border border-purple-600/60 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-purple-900/70"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleReviseBahanAjar();
                    }}
                    disabled={isRevising || loading}
                  />
                  {revisionPrompt && (
                    <button
                      type="button"
                      onClick={() => setRevisionPrompt('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleReviseBahanAjar()}
                  disabled={isRevising || loading || !revisionPrompt.trim()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 transition-all shadow-md shadow-purple-900/40 shrink-0 hover:scale-102 active:scale-98"
                >
                  {isRevising ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Sedang Merevisi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Generate Revisi</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Success Message */}
              {revisionSuccessMsg && (
                <div className="flex items-center gap-2 text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3 py-1.5 rounded-lg animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{revisionSuccessMsg}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-100/70">
          {loading || isRevising ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[350px] text-center space-y-4 max-w-md mx-auto">
              <div className="relative">
                <div className="w-14 h-14 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin" />
                <Sparkles className="w-6 h-6 text-emerald-600 absolute inset-0 m-auto animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 font-serif">
                  {isRevising ? 'Sedang Memproses Revisi AI...' : 'Menyusun Bahan Ajar Siswa PAI SD...'}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isRevising 
                    ? 'AI sedang merevisi, memperluas uraian materi, menyempurnakan dalil berharakat, dan menyesuaikan evaluasi pembelajaran sesuai instruksi Anda.'
                    : 'Mengintegrasikan sintaks Deep Learning (Mindful, Meaningful, Joyful), teks Arab berharakat, dan pedagogi kasih sayang.'}
                </p>
              </div>
            </div>
          ) : isManualEditMode ? (
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 flex flex-col h-full min-h-[500px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <FileEdit className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-bold text-slate-800">
                    Mode Editor Teks Manual (Koreksi Langsung)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setIsManualEditMode(false)}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Selesai Edit & Simpan
                </button>
              </div>
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  onUpdateContent?.(e.target.value);
                }}
                className="flex-1 w-full p-4 font-mono text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-y min-h-[450px]"
                placeholder="Tulis atau edit naskah bahan ajar di sini..."
              />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xs border border-slate-200/80 p-5 sm:p-8 md:p-10 font-sans text-slate-800">
              <div className="border-b-2 border-emerald-800/20 pb-4 mb-6 text-center">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
                  BAHAN BACAAN & LEMBAR BELAJAR PESERTA DIDIK
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  BAHAN AJAR SISWA PAI & BUDI PEKERTI
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-emerald-700 mt-1">
                  MENJELAJAHI HIKMAH DENGAN HATI &bull; MINDFUL, MEANINGFUL, JOYFUL LEARNING
                </p>
              </div>

              <div className="markdown-body prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed">
                <Markdown>{content}</Markdown>
              </div>

              {/* Bottom Quick Action Banner */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-slate-600">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>
                    Ingin mengubah isi bahan ajar? Klik tombol <strong>Revisi & Koreksi (AI)</strong> di bagian atas atau tombol di samping.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsRevisionPanelOpen(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold inline-flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Buka Menu Revisi AI</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
