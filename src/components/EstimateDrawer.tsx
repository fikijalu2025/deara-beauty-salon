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
import { useLanguage } from '../context/LanguageContext';

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
  const [selectedBranch, setSelectedBranch] = useState<'maguwo' | 'pakualaman'>('maguwo');
  const [note, setNote] = useState('');
  const { lang, t } = useLanguage();

  if (!isOpen) return null;

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const handleSendToWhatsApp = () => {
    const branchName = selectedBranch === 'maguwo'
      ? 'Deara Beauty Salon Cabang Maguwo - Cabang ke 1 (Jl. Raya Tajem No.55584)'
      : 'Deara Beauty Cabang Pakualaman - Cabang ke 2 (Jl. Masjid No.10, Pakualaman)';

    let msg = '';
    if (lang === 'en') {
      msg = `Hi Deara, I would like to book an appointment ✨\n\n`;
      msg += `*Preferred Branch:* ${branchName}\n`;
      if (clientName.trim()) {
        msg += `*Client Name:* ${clientName.trim()}\n`;
      }
      if (preferredDate.trim()) {
        msg += `*Preferred Date:* ${preferredDate.trim()}`;
        if (preferredTime.trim()) {
          msg += ` (Time: ${preferredTime.trim()})`;
        }
        msg += `\n`;
      }
      if (note.trim()) {
        msg += `*Special Note:* ${note.trim()}\n`;
      }

      msg += `\n*Selected Services:* \n`;
      selectedServices.forEach((s, idx) => {
        const sizeStr = s.selectedSize ? ` [Size ${s.selectedSize}]` : '';
        const durStr = s.duration ? ` · ${s.duration}` : '';
        msg += `${idx + 1}. ${s.name}${sizeStr} (${s.formattedPrice}${durStr})\n`;
      });

      msg += `\n*Estimated Total:* *${formatRupiah(totalPrice)}*\n\n`;
      msg += `Please confirm therapist and time slot availability. Thank you Deara team!`;
    } else {
      msg = `Hi Deara, aku mau reservasi ✨\n\n`;
      msg += `*Cabang Salon:* ${branchName}\n`;
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
    }

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
        <div className="w-screen max-w-md bg-[#FAF8F5] dark:bg-[#181512] border-l border-[#DDD5C7] dark:border-[#332C25] shadow-2xl flex flex-col transition-colors duration-300">
          {/* Header */}
          <div className="px-6 py-5 bg-white dark:bg-[#1E1A17] border-b border-[#E8E2D9] dark:border-[#2D2721] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C6D58] dark:text-[#D8B168]" />
              <h3 className="font-serif-brand text-xl text-[#242120] dark:text-[#FAF5EE]">
                {t('estimator.title')}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#7A7067] dark:text-[#A09384] hover:text-[#242120] dark:hover:text-white rounded-lg hover:bg-[#F2ECE1] dark:hover:bg-[#2C2620] cursor-pointer"
              aria-label={lang === 'en' ? 'Close estimate drawer' : 'Tutup estimasi'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {selectedServices.length === 0 ? (
              <div className="text-center py-12 px-4 bg-white dark:bg-[#1C1916] rounded-xl border border-[#E8E2D9] dark:border-[#302A24]">
                <div className="text-sm font-medium text-[#242120] dark:text-[#FAF5EE]">
                  {t('estimator.emptyTitle')}
                </div>
                <p className="text-xs text-[#7A7067] dark:text-[#A6998C] mt-1.5">
                  {t('estimator.emptyDesc')}
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#2E2824] dark:bg-[#D4A76A] dark:text-[#181410] rounded-lg hover:bg-[#433B35] dark:hover:bg-[#E2BA84] cursor-pointer"
                >
                  {t('estimator.seePrice')}
                </button>
              </div>
            ) : (
              <>
                {/* List of selected items */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#7A7067] dark:text-[#A09384]">
                    <span>{selectedServices.length} {t('estimator.countLabel')}</span>
                    <button
                      onClick={onClearAll}
                      className="text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 cursor-pointer"
                    >
                      {t('estimator.removeAll')}
                    </button>
                  </div>

                  <div className="divide-y divide-[#EFEAE2] dark:divide-[#28221D] bg-white dark:bg-[#1C1916] rounded-xl border border-[#E8E2D9] dark:border-[#302A24] overflow-hidden">
                    {selectedServices.map((service) => (
                      <div
                        key={service.id}
                        className="p-3.5 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="font-semibold text-xs text-[#242120] dark:text-[#FAF5EE] truncate">
                            {service.name}
                          </div>
                          <div className="text-[11px] text-[#7A7067] dark:text-[#9E9284] flex items-center gap-1.5 mt-0.5 font-mono">
                            {service.selectedSize && (
                              <span className="font-sans font-medium text-[#8C6D58] dark:text-[#D4A76A] bg-[#F7ECE1] dark:bg-[#322418] px-1.5 py-0.2 rounded text-[10px]">
                                {lang === 'en' ? `Size ${service.selectedSize}` : `Ukuran ${service.selectedSize}`}
                              </span>
                            )}
                            <span className="dark:text-[#E8E0D5]">{service.formattedPrice}</span>
                            {service.duration && (
                              <>
                                <span>·</span>
                                <span className="inline-flex items-center gap-1 text-[#8C6D58] dark:text-[#D8B168]">
                                  <Clock className="w-3 h-3 inline" />
                                  {lang === 'en' ? service.duration.replace(/Menit/gi, 'Mins').replace(/Jam/gi, 'Hours') : service.duration}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveService(service.id)}
                          className="p-1.5 text-[#9C8F84] hover:text-rose-600 dark:hover:text-rose-400 rounded-md cursor-pointer"
                          title={lang === 'en' ? 'Remove' : 'Hapus'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtotal card */}
                <div className="p-4 bg-[#F2ECE1] dark:bg-[#25201C] rounded-xl border border-[#DDD5C7] dark:border-[#3D352D] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#5C554E] dark:text-[#C5B9AC] uppercase tracking-wider">
                    {t('estimator.total')}
                  </span>
                  <span className="font-mono text-xl font-bold text-[#242120] dark:text-[#FAF5EE] tabular-nums">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>

                {/* Optional booking details */}
                <div className="bg-white dark:bg-[#1C1916] p-4 rounded-xl border border-[#E8E2D9] dark:border-[#302A24] space-y-3.5">
                  <div className="text-xs font-semibold text-[#423A33] dark:text-[#EAE4DC] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#8C6D58] dark:text-[#D8B168]" />
                    <span>{t('estimator.clientInfo')}</span>
                  </div>

                  {/* Branch Selection */}
                  <div>
                    <label className="block text-[11px] font-medium text-[#7A7067] dark:text-[#A09384] mb-1.5">
                      {t('estimate.selectBranch')}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedBranch('maguwo')}
                        className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          selectedBranch === 'maguwo'
                            ? 'bg-[#2E2824] text-white border-[#2E2824] dark:bg-[#D4A76A] dark:text-[#181410] dark:border-[#D4A76A] shadow-2xs'
                            : 'bg-[#FAF8F5] dark:bg-[#24201C] border-[#DDD5C7] dark:border-[#3D352E] text-[#5C554E] dark:text-[#C5B9AC] hover:border-[#8C6D58]'
                        }`}
                      >
                        <div className="text-[10px] font-semibold uppercase tracking-wider opacity-85">Cabang ke 1</div>
                        <div className="text-xs font-semibold truncate mt-0.5">Maguwo (Sleman)</div>
                        <div className="text-[10px] opacity-80 font-mono mt-0.5">10.00 - 20.00 WIB</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedBranch('pakualaman')}
                        className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          selectedBranch === 'pakualaman'
                            ? 'bg-[#2E2824] text-white border-[#2E2824] dark:bg-[#D4A76A] dark:text-[#181410] dark:border-[#D4A76A] shadow-2xs'
                            : 'bg-[#FAF8F5] dark:bg-[#24201C] border-[#DDD5C7] dark:border-[#3D352E] text-[#5C554E] dark:text-[#C5B9AC] hover:border-[#8C6D58]'
                        }`}
                      >
                        <div className="text-[10px] font-semibold uppercase tracking-wider opacity-85">Cabang ke 2</div>
                        <div className="text-xs font-semibold truncate mt-0.5">Pakualaman</div>
                        <div className="text-[10px] opacity-80 font-mono mt-0.5">09.00 - 19.00 WIB</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#7A7067] dark:text-[#A09384] mb-1">
                      {t('estimator.clientName')}
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder={t('estimator.clientNamePh')}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#24201C] border border-[#DDD5C7] dark:border-[#3D352E] dark:text-[#FAF5EE] placeholder-[#9C8F84] dark:placeholder-[#7A7067] rounded-lg focus:outline-none focus:border-[#8C6D58] dark:focus:border-[#D4A76A]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-[#7A7067] dark:text-[#A09384] mb-1">
                        {t('estimator.date')}
                      </label>
                      <input
                        type="text"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        placeholder={t('estimator.datePh')}
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#24201C] border border-[#DDD5C7] dark:border-[#3D352E] dark:text-[#FAF5EE] placeholder-[#9C8F84] dark:placeholder-[#7A7067] rounded-lg focus:outline-none focus:border-[#8C6D58] dark:focus:border-[#D4A76A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#7A7067] dark:text-[#A09384] mb-1">
                        {t('estimator.time')}
                      </label>
                      <input
                        type="text"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        placeholder={t('estimator.timePh')}
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#24201C] border border-[#DDD5C7] dark:border-[#3D352E] dark:text-[#FAF5EE] placeholder-[#9C8F84] dark:placeholder-[#7A7067] rounded-lg focus:outline-none focus:border-[#8C6D58] dark:focus:border-[#D4A76A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#7A7067] dark:text-[#A09384] mb-1">
                      {t('estimator.notes')}
                    </label>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={t('estimator.notesPh')}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#24201C] border border-[#DDD5C7] dark:border-[#3D352E] dark:text-[#FAF5EE] placeholder-[#9C8F84] dark:placeholder-[#7A7067] rounded-lg focus:outline-none focus:border-[#8C6D58] dark:focus:border-[#D4A76A]"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer CTA */}
          <div className="p-6 bg-white dark:bg-[#1E1A17] border-t border-[#E8E2D9] dark:border-[#2D2721] space-y-3">
            {selectedServices.length > 0 ? (
              <button
                onClick={handleSendToWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#18A04E] rounded-xl shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>{t('estimator.sendWhatsApp')}</span>
              </button>
            ) : (
              <a
                href={WHATSAPP_CONFIG.rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-[#242120] dark:text-[#FAF5EE] bg-[#EFEAE2] dark:bg-[#2B2520] hover:bg-[#E5DED4] dark:hover:bg-[#362E28] rounded-xl transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{t('estimator.directChat')}</span>
              </a>
            )}
            <div className="text-[11px] text-center text-[#8C7E72] dark:text-[#9E9082]">
              {t('estimator.disclaimer')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
