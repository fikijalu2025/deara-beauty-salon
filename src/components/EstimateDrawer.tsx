import React, { useState } from 'react';
import {
  X,
  Trash2,
  Calendar,
  Clock,
  User,
  MessageCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  ServiceItem,
  formatRupiah,
  buildWhatsAppLink,
  WHATSAPP_CONFIG
} from '../data/servicesData';

interface EstimateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: ServiceItem[];
  onRemoveService: (serviceId: string) => void;
  onClearAll: () => void;
}

export const EstimateDrawer: React.FC<EstimateDrawerProps> = ({
  isOpen,
  onClose,
  selectedServices,
  onRemoveService,
  onClearAll,
}) => {
  const [clientName, setClientName] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const handleSendToWhatsApp = () => {
    let msg = `Hi Deara, aku mau reservasi ✨\n\n`;

    if (clientName.trim()) {
      msg += `*Nama Klien:* ${clientName.trim()}\n`;
    }
    if (preferredDate.trim()) {
      msg += `*Rencana Jadwal:* ${preferredDate.trim()}`;
      if (preferredTime.trim()) {
        msg += ` (Pukul ${preferredTime.trim()})`;
      }
      msg += `\n`;
    }
    if (note.trim()) {
      msg += `*Catatan Khusus:* ${note.trim()}\n`;
    }

    msg += `\n*Layanan yang Dipilih:* \n`;
    selectedServices.forEach((s, idx) => {
      const sizeStr = s.selectedSize ? ` [Ukuran ${s.selectedSize}]` : '';
      const durStr = s.duration ? ` · ${s.duration}` : '';
      msg += `${idx + 1}. ${s.name}${sizeStr} (${s.formattedPrice}${durStr})\n`;
    });

    msg += `\n*Total Estimasi:* *${formatRupiah(totalPrice)}*\n\n`;
    msg += `Mohon konfirmasi ketersediaan slot waktu dan terapisnya ya Deara. Terima kasih!`;

    const url = buildWhatsAppLink(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#DDD5C7] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-[#E8E2D9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C6D58]" />
              <h3 className="font-serif-brand text-xl text-[#242120]">
                Estimasi Reservasi Anda
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#7A7067] hover:text-[#242120] rounded-lg hover:bg-[#F2ECE1]"
              aria-label="Tutup estimasi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {selectedServices.length === 0 ? (
              <div className="text-center py-12 px-4 bg-white rounded-xl border border-[#E8E2D9]">
                <div className="text-sm font-medium text-[#242120]">
                  Belum ada layanan yang dipilih
                </div>
                <p className="text-xs text-[#7A7067] mt-1.5">
                  Klik tombol <strong>+ Pilih</strong> pada kartu price list untuk menghitung total dan reservasi sekaligus.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#2E2824] rounded-lg hover:bg-[#433B35]"
                >
                  Lihat Price List
                </button>
              </div>
            ) : (
              <>
                {/* List of selected items */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#7A7067]">
                    <span>{selectedServices.length} Layanan Dipilih</span>
                    <button
                      onClick={onClearAll}
                      className="text-rose-600 hover:text-rose-800"
                    >
                      Hapus Semua
                    </button>
                  </div>

                  <div className="divide-y divide-[#EFEAE2] bg-white rounded-xl border border-[#E8E2D9] overflow-hidden">
                    {selectedServices.map((service) => (
                      <div
                        key={service.id}
                        className="p-3.5 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="font-semibold text-xs text-[#242120] truncate">
                            {service.name}
                          </div>
                          <div className="text-[11px] text-[#7A7067] flex items-center gap-1.5 mt-0.5 font-mono">
                            {service.selectedSize && (
                              <span className="font-sans font-medium text-[#8C6D58] bg-[#F7ECE1] px-1.5 py-0.2 rounded text-[10px]">
                                Ukuran {service.selectedSize}
                              </span>
                            )}
                            <span>{service.formattedPrice}</span>
                            {service.duration && (
                              <>
                                <span>·</span>
                                <span>{service.duration}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveService(service.id)}
                          className="p-1.5 text-[#9C8F84] hover:text-rose-600 rounded-md"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtotal card */}
                <div className="p-4 bg-[#F2ECE1] rounded-xl border border-[#DDD5C7] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#5C554E] uppercase tracking-wider">
                    Total Biaya
                  </span>
                  <span className="font-mono text-xl font-bold text-[#242120] tabular-nums">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>

                {/* Optional booking details */}
                <div className="bg-white p-4 rounded-xl border border-[#E8E2D9] space-y-3">
                  <div className="text-xs font-semibold text-[#423A33] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#8C6D58]" />
                    <span>Lengkapi Data Pemesan (Opsional)</span>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#7A7067] mb-1">
                      Nama Lengkap Anda
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Contoh: Sarah / Amanda"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-[#7A7067] mb-1">
                        Rencana Tanggal
                      </label>
                      <input
                        type="text"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        placeholder="Contoh: Sabtu, 15 Okt"
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#7A7067] mb-1">
                        Pilihan Jam
                      </label>
                      <input
                        type="text"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        placeholder="Contoh: 14.00 WIB"
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#7A7067] mb-1">
                      Catatan Tambahan
                    </label>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Contoh: Kulit sensitif / ada alergi"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer CTA */}
          <div className="p-6 bg-white border-t border-[#E8E2D9] space-y-3">
            {selectedServices.length > 0 ? (
              <button
                onClick={handleSendToWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#18A04E] rounded-xl shadow-md transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>Kirim Reservasi ke WhatsApp</span>
              </button>
            ) : (
              <a
                href={WHATSAPP_CONFIG.rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-[#242120] bg-[#EFEAE2] hover:bg-[#E5DED4] rounded-xl transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat Langsung WhatsApp Tanpa Pilih</span>
              </a>
            )}
            <div className="text-[11px] text-center text-[#8C7E72]">
              Pesan terformat otomatis dikirimkan ke nomor resmi Deara ({WHATSAPP_CONFIG.displayPhone}).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
