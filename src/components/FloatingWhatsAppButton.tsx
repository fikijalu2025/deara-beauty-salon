import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { WHATSAPP_CONFIG, formatRupiah, ServiceItem } from '../data/servicesData';

interface FloatingWidgetsProps {
  selectedServices: ServiceItem[];
  onOpenEstimator: () => void;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({
  selectedServices,
  onOpenEstimator,
}) => {
  const count = selectedServices.length;
  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Sticky Estimator trigger if items selected */}
      {count > 0 && (
        <button
          onClick={onOpenEstimator}
          className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#2E2824] text-white shadow-xl hover:bg-[#433B35] transition-all hover:scale-105 border border-white/20 animate-fade-in"
        >
          <div className="flex items-center gap-1.5 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E6B87D]" />
            <span className="font-semibold">{count} Dipilih:</span>
            <span className="font-mono text-[#E6B87D]">{formatRupiah(total)}</span>
          </div>
          <span className="text-xs font-semibold pl-2 border-l border-white/20">
            Lihat Booking →
          </span>
        </button>
      )}

      {/* Floating WhatsApp Action Button */}
      <a
        href={WHATSAPP_CONFIG.rawUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi WhatsApp Deara"
        className="pointer-events-auto group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#18A04E] text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap pr-1">
          Chat WhatsApp
        </span>
      </a>
    </div>
  );
};
