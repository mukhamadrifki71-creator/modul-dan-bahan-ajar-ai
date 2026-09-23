import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { X, Sparkles, Heart, Copy, Check, Wand2 } from 'lucide-react';

interface IceBreakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  materi: string;
  faseKelas: string;
}

export const IceBreakingModal: React.FC<IceBreakingModalProps> = ({
  isOpen,
  onClose,
  materi,
  faseKelas,
}) => {
  const [duration, setDuration] = useState('5 Menit');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/generate-icebreaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materi: materi || 'Kasih Sayang dan Akhlak Mulia',
          faseKelas: faseKelas || 'Fase D (SMP)',
          durasi: duration,
        }),
      });
      const data = await res.json();
      setResult(data.result || '');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-rose-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/20">
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Generator Ice Breaking Berbasis Kasih Sayang</h3>
              <p className="text-xs text-rose-100">
                Penyegar suasana penuh kehangatan & relevan dengan topik: {materi || 'PAI'}
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
          <div className="flex items-center justify-between gap-3 bg-rose-50/70 p-3 rounded-xl border border-rose-100">
            <div>
              <span className="font-bold text-rose-900 block">Durasi Permainan:</span>
              <span className="text-[11px] text-rose-700">Disesuaikan untuk awal sesi pembelajaran</span>
            </div>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-rose-200 bg-white text-xs font-semibold text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="3 Menit">3 Menit (Kilat)</option>
              <option value="5 Menit">5 Menit (Standar)</option>
              <option value="7 Menit">7 Menit (Interaktif Mendalam)</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Merancang Ice Breaking Kasih Sayang...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{result ? 'Hasilkan Opsi Lain' : 'Hasilkan 3 Opsi Ice Breaking'}</span>
              </>
            )}
          </button>

          {result && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 relative">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                  Rekomendasi Aktivitas Ice Breaking:
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
                </button>
              </div>
              <div className="markdown-body prose prose-slate max-w-none text-xs">
                <Markdown>{result}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
