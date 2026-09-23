import React, { useState } from 'react';
import { Smartphone, QrCode, Copy, Check, ExternalLink, X, Share2, Globe, Sparkles } from 'lucide-react';

interface ShareOnlineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareOnlineModal: React.FC<ShareOnlineModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-dev-ccdtzxelucalbrxk4ruh7k-480405589500.asia-east1.run.app';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(currentUrl)}&margin=10&color=065f46`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Generator Modul & Bahan Ajar PAI SD Deep Learning',
          text: 'Aplikasi Generator Modul & Bahan Ajar PAI SD Deep Learning berbasis Permendikbudristek 12/2024.',
          url: currentUrl,
        });
      } catch (err) {
        console.log('Share dismissed', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Smartphone className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight flex items-center gap-2">
                Buka di HP / Online <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">Siap Diakses</span>
              </h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                Akses aplikasi dari smartphone, tablet, atau bagikan ke rekan guru
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* QR Code Section */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
            <div className="bg-white p-2.5 rounded-xl shadow-xs border border-emerald-100 shrink-0">
              <img
                src={qrCodeUrl}
                alt="QR Code Akses HP"
                className="w-36 h-36 rounded-lg object-contain"
                loading="eager"
              />
            </div>
            <div className="text-center sm:text-left space-y-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                <QrCode className="w-3 h-3" /> Scan Lewat Kamera HP
              </span>
              <h4 className="font-bold text-sm text-slate-800">
                Arahkan Kamera HP / Google Lens
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buka aplikasi Kamera di HP Anda, arahkan ke QR Code di samping untuk langsung membuka aplikasi di browser HP (Chrome / Safari).
              </p>
            </div>
          </div>

          {/* Link Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-600" /> Tautan Aplikasi (URL Online):
              </span>
              {copied && <span className="text-emerald-700 text-xs font-bold flex items-center gap-1"><Check className="w-3 h-3" /> Berhasil Disalin!</span>}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-xs shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Tersalin' : 'Salin Link'}</span>
              </button>
            </div>
          </div>

          {/* Tips Akses di HP */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              💡 Tips Agar Tampil Seperti Aplikasi di HP:
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600 pl-1">
              <li>
                <strong>Android (Chrome):</strong> Buka link &rarr; klik titik tiga (⋮) di kanan atas &rarr; pilih <em>"Tambahkan ke Layar Utama" (Add to Home Screen)</em>.
              </li>
              <li>
                <strong>iPhone (Safari):</strong> Buka link &rarr; klik ikon <em>Share (Bagikan)</em> di bawah &rarr; pilih <em>"Tambah ke Layar Utama"</em>.
              </li>
              <li>
                Aplikasi langsung siap digunakan kapan pun di HP dengan tampilan layar penuh yang responsif!
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handleNativeShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors"
            >
              <Share2 className="w-4 h-4 text-emerald-700" />
              <span>Bagikan ke WhatsApp / Guru Lain</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
