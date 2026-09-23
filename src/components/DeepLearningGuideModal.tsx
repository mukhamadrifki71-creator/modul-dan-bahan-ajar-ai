import React from 'react';
import { X, BookOpen, Heart, Sparkles, CheckCircle2, Award, Brain, HeartHandshake } from 'lucide-react';

interface DeepLearningGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeepLearningGuideModal: React.FC<DeepLearningGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20">
              <BookOpen className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                Panduan Teori: Deep Learning & Kurikulum Berbasis Cinta
              </h3>
              <p className="text-xs text-emerald-200">
                Sesuai Permendikbudristek No. 12 Tahun 2024 & Standar Kompetensi Lulusan Terkini
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed">
          {/* Section 1: 3 Pilar Deep Learning */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h4 className="font-bold text-sm text-slate-900">
                Tiga Pilar Utama Deep Learning (Pembelajaran Mendalam)
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs">
                  <Brain className="w-4 h-4 text-emerald-700" />
                  <span>Mindful Learning</span>
                </div>
                <p className="text-[11px] text-emerald-950/80">
                  Pembelajaran Sadar: Mengondisikan kesiapan mental, spiritual, hening reflektif (silent tadabbur), serta kepekaan mengamati fenomena kontekstual sebelum menganalisis konsep.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-blue-900 text-xs">
                  <Sparkles className="w-4 h-4 text-blue-700" />
                  <span>Meaningful Learning</span>
                </div>
                <p className="text-[11px] text-blue-950/80">
                  Pembelajaran Bermakna: Menemukan hakikat dan hikmah ajaran Islam, berdialog tanpa prasangka dalam kelompok heterogen, dan menghubungkan materi dengan solusi nyata di masyarakat.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                  <Heart className="w-4 h-4 text-amber-700 fill-amber-700" />
                  <span>Joyful Learning</span>
                </div>
                <p className="text-[11px] text-amber-950/80">
                  Pengalaman Menggembirakan: Lingkungan belajar yang aman psikologis, apresiasi antarteman (peer praise), kreasi produk inovatif, dan komitmen aksi kebaikan nyata.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Kurikulum Berbasis Cinta & Rahmatan lil 'Alamin */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h4 className="font-bold text-sm text-slate-900">
                Pedagogi Kasih Sayang (Rahmatan lil &lsquo;Alamin)
              </h4>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-3">
              <p className="text-slate-800">
                Pendidikan Agama Islam bukan sekadar transmisi doktrin atau hukum halal-haram kaku, melainkan penanaman cinta kepada Allah, Rasulullah, sesama manusia, dan seluruh alam semesta.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Mahabbah & Rifq:</strong> Menebar cinta kasih dan kelembutan tutur kata dalam proses bimbingan.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Tasamuh & Tawassuth:</strong> Toleransi aktif dan sikap moderat menghadapi keragaman pendapat.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Tawazun:</strong> Keseimbangan antara penalaran intelektual dan kepekaan nurani.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Tanpa Stigma:</strong> Memberikan remedial dengan tutor sebaya suportif tanpa melabeli siswa lambat.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Regulasi Permendikbudristek 12/2024 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h4 className="font-bold text-sm text-slate-900">
                Kepatuhan Standar Permendikbudristek No. 12 Tahun 2024
              </h4>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 pl-2">
              <li>Penyelarasan Capaian Pembelajaran (CP) dengan Keputusan BSKAP No. 032/H/KR/2024.</li>
              <li>Asesmen Pembelajaran berorientasi formatif berkelanjutan untuk memperbaiki proses belajar.</li>
              <li>Fleksibilitas guru dalam mengembangkan alur tujuan pembelajaran sesuai konteks satuan pendidikan.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
