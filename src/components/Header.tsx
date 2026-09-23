import React from 'react';
import { Sparkles, Heart, BookOpen, Bookmark, FileText, Info, Award, GraduationCap, Smartphone } from 'lucide-react';

interface HeaderProps {
  onOpenGuide: () => void;
  onOpenSaved: () => void;
  savedCount: number;
  onOpenBahanAjar: () => void;
  onOpenIceBreaking: () => void;
  onOpenLKPD: () => void;
  onOpenAssessment: () => void;
  onOpenShareOnline: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGuide,
  onOpenSaved,
  savedCount,
  onOpenBahanAjar,
  onOpenIceBreaking,
  onOpenLKPD,
  onOpenAssessment,
  onOpenShareOnline,
}) => {
  return (
    <header className="border-b border-emerald-900/10 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 shrink-0">
            <BookOpen className="w-6 h-6 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 font-serif">
                Materi & Modul Ajar PAI SD <span className="text-emerald-700">Deep Learning</span>
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                Fase A, B, C (SD)
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                Permendikbudristek 12/2024
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Materi Ajar Komprehensif Siap Ajar & Modul RPP Guru &bull; Mindful, Meaningful, Joyful Learning
            </p>
          </div>
        </div>

        {/* Quick Tools & Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            id="btn-share-online-quick"
            onClick={onOpenShareOnline}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
            title="Buka di Smartphone / Bagikan Tautan Online"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-100" />
            <span>Buka di HP / Online</span>
          </button>

          <button
            id="btn-bahan-ajar-quick"
            onClick={onOpenBahanAjar}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>Bahan Ajar Siswa</span>
          </button>

          <button
            id="btn-icebreaking-quick"
            onClick={onOpenIceBreaking}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Ice Breaking Cinta</span>
          </button>

          <button
            id="btn-lkpd-quick"
            onClick={onOpenLKPD}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-teal-600" />
            <span>LKPD Siap Cetak</span>
          </button>

          <button
            id="btn-assessment-quick"
            onClick={onOpenAssessment}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100 transition-colors shadow-2xs"
          >
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>Asesmen & Rubrik</span>
          </button>

          <button
            id="btn-guide-modal"
            onClick={onOpenGuide}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            title="Panduan Deep Learning & Pedagogi Cinta"
          >
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Panduan</span>
          </button>

          <button
            id="btn-saved-drawer"
            onClick={onOpenSaved}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-white hover:bg-slate-900 transition-colors shadow-xs"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Arsip</span>
            {savedCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center ml-0.5">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
