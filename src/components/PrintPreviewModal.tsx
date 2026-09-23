import React from 'react';
import Markdown from 'react-markdown';
import { X, Printer, Download } from 'lucide-react';
import { ModulInputData } from '../types';
import { exportModulToWord } from '../utils/docxExport';

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  inputData: Partial<ModulInputData>;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  content,
  inputData,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Bar for Modal Controls (Hidden in Print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm">Pratinjau Cetak & Ekspor PDF</h3>
              <p className="text-[11px] text-slate-400">
                Format standar kedinasan dengan lembar pengesahan kepala sekolah
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                exportModulToWord(
                  `Modul_Ajar_${inputData.materi || 'PAI'}`,
                  content,
                  inputData
                )
              }
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Word (.docx)</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Sekarang / Simpan PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Paper */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-100 print:p-0 print:bg-white">
          <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-md print:shadow-none print:p-0 font-serif text-slate-900 leading-relaxed text-xs sm:text-sm">
            {/* Kop Modul */}
            <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
              <h1 className="text-base sm:text-lg font-bold tracking-tight uppercase">
                MODUL AJAR / RENCANA PELAKSANAAN PEMBELAJARAN (RPP)
              </h1>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">
                PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI
              </h2>
              <p className="text-xs text-slate-600 italic mt-0.5">
                Berbasis Deep Learning (Mindful, Meaningful, Joyful) & Kurikulum Berbasis Cinta (Rahmatan lil &lsquo;Alamin)
              </p>
              <p className="text-[11px] text-slate-500 font-sans mt-1">
                Satuan Pendidikan: {inputData.namaSekolah || 'Sekolah Penggerak / Negeri'} &bull; Tahun Ajaran: {inputData.tahunAjaran || '2025/2026'}
              </p>
            </div>

            {/* Tabel Identitas Ringkas */}
            <div className="mb-6 border border-slate-300 rounded-lg p-3 text-xs font-sans bg-slate-50/50">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-bold text-slate-700">Fase / Kelas:</span>{' '}
                  {inputData.faseKelas} ({inputData.semester || 'Ganjil/Genap'})
                </div>
                <div>
                  <span className="font-bold text-slate-700">Elemen PAI:</span>{' '}
                  {inputData.elemen}
                </div>
                <div>
                  <span className="font-bold text-slate-700">Materi Pokok:</span>{' '}
                  {inputData.materi}
                </div>
                <div>
                  <span className="font-bold text-slate-700">Alokasi Waktu:</span>{' '}
                  {inputData.jumlahPertemuan} ({inputData.alokasiWaktu})
                </div>
                <div>
                  <span className="font-bold text-slate-700">Model Pembelajaran:</span>{' '}
                  {inputData.metodePembelajaran}
                </div>
                <div>
                  <span className="font-bold text-slate-700">Penyusun:</span>{' '}
                  {inputData.namaGuru || 'Guru PAI'}
                </div>
              </div>
            </div>

            {/* Isi Markdown */}
            <div className="markdown-body prose prose-slate max-w-none text-xs sm:text-sm">
              <Markdown>{content}</Markdown>
            </div>

            {/* Lembar Tanda Tangan Pengesahan */}
            <div className="mt-12 pt-6 border-t border-slate-300 flex justify-between items-start text-xs font-sans">
              <div className="w-48 text-center">
                <p>Mengetahui,</p>
                <p className="font-bold">Kepala Sekolah</p>
                <div className="h-16" />
                <p className="font-bold underline">
                  {inputData.namaKepalaSekolah || '( ........................................ )'}
                </p>
                <p className="text-[11px] text-slate-600">
                  NIP. {inputData.nipKepalaSekolah || '........................................'}
                </p>
              </div>

              <div className="w-48 text-center">
                <p>
                  {inputData.namaSekolah ? `${inputData.namaSekolah}, ` : ''}
                  {new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="font-bold">Guru Pendidikan Agama Islam</p>
                <div className="h-16" />
                <p className="font-bold underline">
                  {inputData.namaGuru || '( ........................................ )'}
                </p>
                <p className="text-[11px] text-slate-600">
                  NIP. {inputData.nip || '........................................'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
