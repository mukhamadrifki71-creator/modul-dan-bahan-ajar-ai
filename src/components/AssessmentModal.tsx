import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { X, Award, Copy, Check, Printer, Sparkles } from 'lucide-react';
import { ModulInputData } from '../types';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputData: Partial<ModulInputData>;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  inputData,
}) => {
  const [assessmentContent, setAssessmentContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/generate-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materi: inputData.materi || 'PAI Kasih Sayang',
          faseKelas: inputData.faseKelas || 'Fase D',
        }),
      });
      const data = await res.json();
      setAssessmentContent(data.assessment || '');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!assessmentContent) return;
    await navigator.clipboard.writeText(assessmentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Paket Asesmen PAI - ${inputData.materi || 'HOTS & Rubrik'}</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 25px; line-height: 1.6; color: #111; }
            h1, h2, h3 { text-align: center; margin-bottom: 8px; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { border: 1px solid #333; padding: 8px; text-align: left; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <h2>PAKET ASESMEN LENGKAP PENDIDIKAN AGAMA ISLAM</h2>
          <p style="text-align:center; font-style:italic;">Asesmen HOTS Studi Kasus & Rubrik Observasi Karakter Kasih Sayang (Rahmatan lil 'Alamin)</p>
          <hr/>
          <pre style="font-family:inherit; white-space:pre-wrap;">${assessmentContent}</pre>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-indigo-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Paket Asesmen HOTS & Rubrik Karakter</h3>
              <p className="text-xs text-indigo-100">
                Studi Kasus Kontekstual &bull; Rubrik Sikap Kasih Sayang &bull; Self-Assessment Metakognitif
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {!assessmentContent ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-700 mx-auto flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">
                Generate Instrumen & Rubrik Asesmen Lengkap
              </h4>
              <p className="text-slate-500 max-w-md mx-auto text-xs">
                AI akan merumuskan 3 butir Soal HOTS berbasis studi kasus etika modern, kunci jawaban, rubrik penilaian analitis, dan lembar observasi afektif Karakter Kasih Sayang.
              </p>
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="py-2.5 px-5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold inline-flex items-center gap-2 transition-colors shadow-sm"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Menyusun Paket Asesmen...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Buat Paket Asesmen Sekarang</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-800 text-xs">
                  Instrumen Asesmen PAI ({inputData.materi || 'Deep Learning'}):
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[11px] font-semibold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition-colors"
                  >
                    <Printer className="w-3 h-3" />
                    <span>Cetak Asesmen</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-h-[50vh] overflow-y-auto">
                <div className="markdown-body prose prose-slate max-w-none text-xs">
                  <Markdown>{assessmentContent}</Markdown>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="text-xs text-indigo-700 hover:text-indigo-900 font-semibold underline"
                >
                  {isLoading ? 'Sedang meregenerasi...' : '🔄 Regenerasi Paket Asesmen Lain'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
