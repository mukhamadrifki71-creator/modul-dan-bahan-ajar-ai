import React from 'react';
import { X, Bookmark, Trash2, Download, FileText, ArrowRight, Clock } from 'lucide-react';
import { SavedModul } from '../types';
import { exportModulToWord } from '../utils/docxExport';

interface SavedModulDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedList: SavedModul[];
  onSelect: (modul: SavedModul) => void;
  onDelete: (id: string) => void;
}

export const SavedModulDrawer: React.FC<SavedModulDrawerProps> = ({
  isOpen,
  onClose,
  savedList,
  onSelect,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-bold text-sm">Arsip Modul Ajar Tersimpan</h3>
                <p className="text-[11px] text-slate-400">
                  {savedList.length} dokumen tersimpan di browser
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {savedList.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Bookmark className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-xs font-semibold">Belum ada modul yang diarsipkan</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Klik tombol &ldquo;Simpan&rdquo; setelah menghasilkan modul ajar untuk menyimpannya di sini.
                </p>
              </div>
            ) : (
              savedList.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900 line-clamp-1">
                        {item.materi || item.title}
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold shrink-0">
                        {item.elemen}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                      <span>{item.faseKelas}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                    <button
                      onClick={() => {
                        onSelect(item);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-bold text-xs"
                    >
                      <span>Buka Dokumen</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          exportModulToWord(
                            `Modul_Ajar_${item.materi}`,
                            item.content,
                            item.inputData
                          )
                        }
                        title="Unduh DOCX"
                        className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onDelete(item.id)}
                        title="Hapus dari arsip"
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
