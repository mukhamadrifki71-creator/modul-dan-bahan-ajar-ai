import React, { useState, useEffect, useMemo } from 'react';
import Markdown from 'react-markdown';
import confetti from 'canvas-confetti';
import {
  X,
  FileText,
  Copy,
  Check,
  Printer,
  Sparkles,
  Download,
  HelpCircle,
  Layers,
  FileSpreadsheet,
  CheckSquare,
  ArrowRight,
  ListOrdered,
  Shuffle,
  AlignLeft,
  BookOpen,
  Send
} from 'lucide-react';
import { ModulInputData } from '../types';
import {
  LkpdPackage,
  buildClientLkpdPackage,
  formatForGoogleForms,
  formatForQuizizzText,
  generateQuizizzCSV,
  downloadQuizizzCSVFile,
  QuestionMCQ,
  QuestionMatching,
  QuestionShortAnswer,
  QuestionEssay
} from '../utils/lkpdGenerator';

interface LkpdModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputData: Partial<ModulInputData>;
}

type TabType = 'google-form' | 'quizizz' | 'bank-soal' | 'cetak-lkpd';
type QuestionFilter = 'all' | 'mcq' | 'matching' | 'short' | 'essay';

export const LkpdModal: React.FC<LkpdModalProps> = ({
  isOpen,
  onClose,
  inputData,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('google-form');
  const [questionFilter, setQuestionFilter] = useState<QuestionFilter>('all');
  const [lkpdPackage, setLkpdPackage] = useState<LkpdPackage | null>(null);
  const [rawMarkdown, setRawMarkdown] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // Initialize or generate on open if empty
  useEffect(() => {
    if (isOpen && !lkpdPackage) {
      const initialPkg = buildClientLkpdPackage(inputData);
      setLkpdPackage(initialPkg);
      setRawMarkdown(initialPkg.markdownFull);
    }
  }, [isOpen, inputData, lkpdPackage]);

  if (!isOpen) return null;

  const currentPkg = lkpdPackage || buildClientLkpdPackage(inputData);

  const googleFormText = useMemo(() => {
    return formatForGoogleForms(currentPkg);
  }, [currentPkg]);

  const quizizzText = useMemo(() => {
    return formatForQuizizzText(currentPkg);
  }, [currentPkg]);

  const handleGenerateLkpdAI = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/generate-lkpd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materi: inputData.materi || 'PAI',
          faseKelas: inputData.faseKelas || 'Fase B (SD)',
          elemen: inputData.elemen || 'Akidah',
          modelPembelajaran: inputData.metodePembelajaran || 'Problem Based Learning (PBL)',
        }),
      });

      let md = '';
      if (res.ok) {
        const data = await res.json();
        if (data.lkpd && data.lkpd.trim().length > 50) {
          md = data.lkpd;
        }
      }

      if (!md) {
        const fallback = buildClientLkpdPackage(inputData);
        setLkpdPackage(fallback);
        setRawMarkdown(fallback.markdownFull);
      } else {
        setRawMarkdown(md);
        // Refresh structured package aligned with topic
        const updatedPkg = buildClientLkpdPackage(inputData);
        updatedPkg.markdownFull = md;
        setLkpdPackage(updatedPkg);
      }

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.warn('Fallback to client LKPD engine:', err);
      const fallback = buildClientLkpdPackage(inputData);
      setLkpdPackage(fallback);
      setRawMarkdown(fallback.markdownFull);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(label);
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.7 },
      });
      setTimeout(() => setCopyStatus(null), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownloadCsv = () => {
    downloadQuizizzCSVFile(currentPkg, `Quizizz_PAI_${(inputData.materi || 'Materi').replace(/\s+/g, '_')}.csv`);
    setCopyStatus('csv-downloaded');
    setTimeout(() => setCopyStatus(null), 2500);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>LKPD PAI - ${inputData.materi || 'Deep Learning'}</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 25px; line-height: 1.6; color: #111; }
            h1, h2, h3 { text-align: center; margin-bottom: 8px; }
            .box { border: 1px solid #999; padding: 12px; margin: 15px 0; border-radius: 6px; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 13px; }
            th, td { border: 1px solid #333; padding: 6px 10px; text-align: left; }
            th { background-color: #f3f4f6; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <h2>LEMBAR KERJA PESERTA DIDIK (LKPD) PAI & BUDI PEKERTI</h2>
          <p style="text-align:center; font-style:italic;">Berbasis Deep Learning (Mindful, Meaningful, Joyful) & Pedagogi Kasih Sayang</p>
          <hr/>
          <pre style="font-family:inherit; white-space:pre-wrap;">${rawMarkdown || currentPkg.markdownFull}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-teal-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-xs">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-base tracking-tight font-serif">
                  Generator &amp; Konverter LKPD Multi-Platform
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950 uppercase tracking-wider">
                  Siap Google Form &amp; Quizizz
                </span>
              </div>
              <p className="text-xs text-teal-100 mt-0.5">
                Topik: <strong className="text-white">{inputData.materi || 'Materi PAI SD'}</strong> &bull; Variasi: Pilihan Ganda HOTS, Menjodohkan, Isian Singkat, &amp; Essai
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 pt-2 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('google-form')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'google-form'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-700 border border-slate-200'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>1. Format Google Form (Tinggal Salin)</span>
            </button>

            <button
              onClick={() => setActiveTab('quizizz')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'quizizz'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-700 border border-slate-200'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>2. Format Quizizz / CSV</span>
            </button>

            <button
              onClick={() => setActiveTab('bank-soal')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'bank-soal'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-700 border border-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3. Bank Soal Variatif</span>
            </button>

            <button
              onClick={() => setActiveTab('cetak-lkpd')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'cetak-lkpd'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>4. Naskah Siswa (Siap Cetak)</span>
            </button>
          </div>

          {/* Regenerate AI Button */}
          <div className="pb-2">
            <button
              onClick={handleGenerateLkpdAI}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 text-xs font-bold transition-colors"
              title="Regenerasi LKPD dengan AI"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                  <span>Menyusun AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Regenerasi AI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Body based on Tab */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-100/50 space-y-4 text-xs">
          {/* TAB 1: GOOGLE FORM READY */}
          {activeTab === 'google-form' && (
            <div className="space-y-3">
              {/* Instructions banner */}
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-purple-900 flex items-start gap-2.5">
                <div className="p-1 rounded-md bg-purple-200 text-purple-800 shrink-0 mt-0.5">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-xs">Cara Praktis Menempelkan ke Google Form:</h4>
                  <ol className="list-decimal list-inside text-[11px] text-purple-800 space-y-0.5">
                    <li>Klik tombol <strong>&ldquo;Salin Semua Teks Google Form&rdquo;</strong> di bawah ini.</li>
                    <li>Buka <a href="https://forms.google.com" target="_blank" rel="noreferrer" className="underline font-bold hover:text-purple-950">forms.google.com</a> dan buat formulir baru bertema Kuis (Aktifkan <em>&ldquo;Jadikan ini kuis&rdquo;</em> di tab Setelan).</li>
                    <li>Tempelkan (*Paste*) teks soal, pilihan jawaban, kunci jawaban, dan poin skor sesuai format terstruktur di bawah.</li>
                  </ol>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between flex-wrap gap-2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">Format Google Form:</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold text-[11px]">
                    10 PG • 5 Menjodohkan • 5 Isian • 2 Essai
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => triggerCopy(googleFormText, 'google-form-all')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs transition-colors shadow-xs"
                  >
                    {copyStatus === 'google-form-all' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Tersalin ke Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Semua Teks Google Form</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Text Area / Preview */}
              <div className="bg-slate-900 text-emerald-300 p-4 rounded-xl font-mono text-[11px] leading-relaxed max-h-[50vh] overflow-y-auto border border-slate-800 select-all whitespace-pre-wrap shadow-inner">
                {googleFormText}
              </div>
            </div>
          )}

          {/* TAB 2: QUIZIZZ / SPREADSHEET */}
          {activeTab === 'quizizz' && (
            <div className="space-y-3">
              {/* Quizizz Instructions Banner */}
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 flex items-start gap-2.5">
                <div className="p-1 rounded-md bg-rose-200 text-rose-800 shrink-0 mt-0.5">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-xs">Cara Cepat Mengimpor ke Quizizz (Tanpa Ketik Manual):</h4>
                  <ol className="list-decimal list-inside text-[11px] text-rose-800 space-y-0.5">
                    <li>Klik tombol <strong>&ldquo;Unduh CSV Quizizz&rdquo;</strong> untuk mendapatkan file spreadsheet standar.</li>
                    <li>Buka <a href="https://quizizz.com" target="_blank" rel="noreferrer" className="underline font-bold hover:text-rose-950">Quizizz.com</a> &gt; Klik <strong>&ldquo;Create a Quiz&rdquo;</strong> &gt; Pilih opsi <strong>&ldquo;Import from Spreadsheet&rdquo;</strong>.</li>
                    <li>Upload file CSV ini, maka 10 Soal Pilihan Ganda HOTS beserta Kunci Jawaban akan langsung jadi otomatis!</li>
                  </ol>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between flex-wrap gap-2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">Tabel Soal Quizizz:</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-semibold text-[11px]">
                    {currentPkg.soalPilihanGanda.length} Butir Soal Siap Impor
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{copyStatus === 'csv-downloaded' ? 'File Terunduh!' : 'Unduh CSV Quizizz'}</span>
                  </button>

                  <button
                    onClick={() => triggerCopy(quizizzText, 'quizizz-text')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs transition-colors shadow-xs"
                  >
                    {copyStatus === 'quizizz-text' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Format Teks Quizizz</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Table Preview */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto max-h-[48vh]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0 border-b border-slate-200">
                      <tr>
                        <th className="p-2.5 w-10 text-center">No</th>
                        <th className="p-2.5 min-w-[200px]">Teks Pertanyaan (Stimulus + Soal)</th>
                        <th className="p-2.5 min-w-[130px]">Opsi 1 (A)</th>
                        <th className="p-2.5 min-w-[130px]">Opsi 2 (B)</th>
                        <th className="p-2.5 min-w-[130px]">Opsi 3 (C)</th>
                        <th className="p-2.5 min-w-[130px]">Opsi 4 (D)</th>
                        <th className="p-2.5 text-center min-w-[80px]">Kunci</th>
                        <th className="p-2.5 text-center min-w-[60px]">Waktu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {currentPkg.soalPilihanGanda.map((q, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-2.5 text-center font-bold text-slate-600">{idx + 1}</td>
                          <td className="p-2.5 text-slate-800 font-medium leading-snug">
                            {q.stimulus && <span className="text-slate-500 block text-[11px] mb-0.5">{q.stimulus}</span>}
                            {q.pertanyaan}
                          </td>
                          <td className={`p-2.5 text-xs ${q.kunci === 'A' ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-600'}`}>{q.opsi.A}</td>
                          <td className={`p-2.5 text-xs ${q.kunci === 'B' ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-600'}`}>{q.opsi.B}</td>
                          <td className={`p-2.5 text-xs ${q.kunci === 'C' ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-600'}`}>{q.opsi.C}</td>
                          <td className={`p-2.5 text-xs ${q.kunci === 'D' ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-600'}`}>{q.opsi.D}</td>
                          <td className="p-2.5 text-center font-bold text-emerald-700 bg-emerald-50/50">
                            {q.kunci}
                          </td>
                          <td className="p-2.5 text-center text-slate-500">45s</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BANK SOAL VARIATIF PER KATEGORI */}
          {activeTab === 'bank-soal' && (
            <div className="space-y-3">
              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 flex-wrap bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="font-bold text-slate-700 mr-1 text-xs">Pilih Bentuk Soal:</span>
                <button
                  onClick={() => setQuestionFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    questionFilter === 'all'
                      ? 'bg-teal-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Semua Bentuk ({currentPkg.soalPilihanGanda.length + currentPkg.soalMenjodohkan.length + currentPkg.soalIsianSingkat.length + currentPkg.soalEssai.length})
                </button>

                <button
                  onClick={() => setQuestionFilter('mcq')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    questionFilter === 'mcq'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  Pilihan Ganda ({currentPkg.soalPilihanGanda.length})
                </button>

                <button
                  onClick={() => setQuestionFilter('matching')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    questionFilter === 'matching'
                      ? 'bg-indigo-700 text-white'
                      : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
                  }`}
                >
                  Menjodohkan ({currentPkg.soalMenjodohkan.length})
                </button>

                <button
                  onClick={() => setQuestionFilter('short')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    questionFilter === 'short'
                      ? 'bg-amber-700 text-white'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  Isian Singkat ({currentPkg.soalIsianSingkat.length})
                </button>

                <button
                  onClick={() => setQuestionFilter('essay')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    questionFilter === 'essay'
                      ? 'bg-rose-700 text-white'
                      : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                  }`}
                >
                  Essai Reflektif ({currentPkg.soalEssai.length})
                </button>
              </div>

              {/* Questions List */}
              <div className="space-y-3 max-h-[52vh] overflow-y-auto pr-1">
                {/* 1. Multiple Choice Cards */}
                {(questionFilter === 'all' || questionFilter === 'mcq') && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        Bagian I: Pilihan Ganda Penalaran HOTS ({currentPkg.soalPilihanGanda.length} Butir)
                      </h4>
                    </div>

                    {currentPkg.soalPilihanGanda.map((q, idx) => (
                      <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                            Soal #{idx + 1}
                          </span>
                          <button
                            onClick={() => {
                              const text = `${q.stimulus}\n${q.pertanyaan}\nA. ${q.opsi.A}\nB. ${q.opsi.B}\nC. ${q.opsi.C}\nD. ${q.opsi.D}\nKunci: ${q.kunci}`;
                              triggerCopy(text, `mcq-${idx}`);
                            }}
                            className="text-[11px] font-semibold text-slate-500 hover:text-teal-700 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded hover:bg-slate-100 transition-colors"
                          >
                            {copyStatus === `mcq-${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copyStatus === `mcq-${idx}` ? 'Tersalin' : 'Salin Butir'}</span>
                          </button>
                        </div>

                        {q.stimulus && (
                          <div className="p-2 bg-slate-50 rounded-lg text-slate-600 italic border-l-2 border-emerald-500 text-[11px]">
                            {q.stimulus}
                          </div>
                        )}

                        <p className="font-semibold text-slate-800">{q.pertanyaan}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] pt-1">
                          <div className={`p-2 rounded-lg border ${q.kunci === 'A' ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-950' : 'bg-slate-50/70 border-slate-200 text-slate-700'}`}>
                            A. {q.opsi.A}
                          </div>
                          <div className={`p-2 rounded-lg border ${q.kunci === 'B' ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-950' : 'bg-slate-50/70 border-slate-200 text-slate-700'}`}>
                            B. {q.opsi.B}
                          </div>
                          <div className={`p-2 rounded-lg border ${q.kunci === 'C' ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-950' : 'bg-slate-50/70 border-slate-200 text-slate-700'}`}>
                            C. {q.opsi.C}
                          </div>
                          <div className={`p-2 rounded-lg border ${q.kunci === 'D' ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-950' : 'bg-slate-50/70 border-slate-200 text-slate-700'}`}>
                            D. {q.opsi.D}
                          </div>
                        </div>

                        <div className="p-2 rounded-lg bg-teal-50/70 border border-teal-100 text-[11px] text-teal-900">
                          <strong>Kunci: {q.kunci}</strong> &bull; <em>Pembahasan:</em> {q.pembahasan}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. Matching Cards */}
                {(questionFilter === 'all' || questionFilter === 'matching') && (
                  <div className="space-y-2.5 pt-2">
                    <h4 className="font-bold text-xs text-indigo-900 uppercase tracking-wide flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      Bagian II: Asesmen Menjodohkan Konsep ({currentPkg.soalMenjodohkan.length} Pasang)
                    </h4>

                    <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs space-y-2">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-indigo-50 text-indigo-950 font-bold">
                            <tr>
                              <th className="p-2 border border-indigo-200 w-10 text-center">No</th>
                              <th className="p-2 border border-indigo-200">Kolom A (Pernyataan / Premis)</th>
                              <th className="p-2 border border-indigo-200 text-center w-20">Pasangan</th>
                              <th className="p-2 border border-indigo-200">Kolom B (Konsep / Jawaban)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {currentPkg.soalMenjodohkan.map((m, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="p-2 text-center font-bold text-slate-600 border border-slate-200">{idx + 1}</td>
                                <td className="p-2 text-slate-800 border border-slate-200 font-medium">{m.premis}</td>
                                <td className="p-2 text-center font-bold text-indigo-700 bg-indigo-50/50 border border-slate-200">
                                  {String.fromCharCode(65 + idx)}
                                </td>
                                <td className="p-2 text-slate-800 border border-slate-200 font-semibold">{m.jawaban}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Short Answer Cards */}
                {(questionFilter === 'all' || questionFilter === 'short') && (
                  <div className="space-y-2.5 pt-2">
                    <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      Bagian III: Soal Isian Singkat &amp; Benar-Salah ({currentPkg.soalIsianSingkat.length} Butir)
                    </h4>

                    <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs divide-y divide-slate-100">
                      {currentPkg.soalIsianSingkat.map((s, idx) => (
                        <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-slate-800">{idx + 1}. {s.pertanyaan}</p>
                            <p className="text-[11px] text-amber-900 font-semibold mt-0.5">
                              &gt;&gt; Kunci Jawaban: <span className="bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">{s.kunciJawaban}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Essay Cards */}
                {(questionFilter === 'all' || questionFilter === 'essay') && (
                  <div className="space-y-2.5 pt-2">
                    <h4 className="font-bold text-xs text-rose-900 uppercase tracking-wide flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-600" />
                      Bagian IV: Soal Cerita &amp; Essai Reflektif ({currentPkg.soalEssai.length} Soal HOTS)
                    </h4>

                    {currentPkg.soalEssai.map((e, idx) => (
                      <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                            Kasus #{idx + 1}
                          </span>
                        </div>
                        <div className="p-2 bg-slate-50 rounded-lg text-slate-700 italic border-l-2 border-rose-500 text-[11px]">
                          &ldquo;{e.kasus}&rdquo;
                        </div>
                        <p className="font-semibold text-slate-800"><strong>Tantangan Analisis:</strong> {e.pertanyaan}</p>
                        <div className="p-2 bg-rose-50/70 rounded-lg text-[11px] text-rose-900 border border-rose-100">
                          <strong>Rubrik Guru:</strong> {e.rubrik}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: NASKAH SISWA (SIAP CETAK) */}
          {activeTab === 'cetak-lkpd' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">Pratinjau Naskah Lengkap LKPD:</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => triggerCopy(rawMarkdown || currentPkg.markdownFull, 'naskah-lkpd')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg border border-teal-200 transition-colors"
                  >
                    {copyStatus === 'naskah-lkpd' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copyStatus === 'naskah-lkpd' ? 'Tersalin' : 'Salin Naskah'}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-600" />
                    <span>Cetak / PDF</span>
                  </button>
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 max-h-[52vh] overflow-y-auto shadow-xs font-serif leading-relaxed">
                <div className="markdown-body prose prose-slate max-w-none text-xs">
                  <Markdown>{rawMarkdown || currentPkg.markdownFull}</Markdown>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 text-[11px] hidden sm:block">
            Kompatibel dengan Google Forms, Quizizz Spreadsheet, Microsoft Forms, &amp; Kahoot.
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
