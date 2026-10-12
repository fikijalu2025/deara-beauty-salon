import React from 'react';
import { MessageCircle, Clock, MapPin, Heart, Settings2, ExternalLink } from 'lucide-react';
import { WHATSAPP_CONFIG, SALON_INFO, SALON_BRANCHES } from '../data/servicesData';
import { DearaLogo } from './DearaLogo';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenManager: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenManager }) => {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-[#24201D] dark:bg-[#0F0D0B] text-[#D8CFCA] dark:text-[#C5BBAF] pt-16 pb-12 border-t border-[#3B342F] dark:border-[#241E19] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3B342F] dark:border-[#241E19]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <DearaLogo size={46} variant="gold" />
            <p className="text-xs sm:text-sm text-[#A89E97] max-w-sm leading-relaxed">
              {t('footer.desc')}
            </p>

            {/* Social Media & Contact from PDF */}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={WHATSAPP_CONFIG.rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1EBE5D] transition-colors w-fit"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>{lang === 'en' ? 'Reservation:' : 'Reservasi:'} {WHATSAPP_CONFIG.displayPhone}</span>
              </a>

              <div className="flex items-center gap-4 text-xs text-[#D8CFCA] pt-1">
                <a
                  href={SALON_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#C29D7D]">IG:</span>
                  <span>@deara_beautysalon</span>
                </a>
                <span>·</span>
                <a
                  href={SALON_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#C29D7D]">TikTok:</span>
                  <span>@deara_beautysalon</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
              {t('footer.navTitle')}
            </div>
            <ul className="space-y-2 text-xs text-[#A89E97]">
              <li>
                <a href="#layanan-harga" className="hover:text-white transition-colors">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#suasana" className="hover:text-white transition-colors">
                  {t('nav.ambiance')}
                </a>
              </li>
              <li>
                <a href="#lokasi-sosmed" className="hover:text-white transition-colors">
                  {t('nav.location')}
                </a>
              </li>
              <li>
                <a href="#cara-reservasi" className="hover:text-white transition-colors">
                  {t('nav.howToBook')}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {t('nav.faq')}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenManager}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left text-[#C29D7D]"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>{t('nav.manage')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Operational Hours & Note */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
              {t('footer.hoursTitle')}
            </div>
            <div className="space-y-2 text-xs text-[#A89E97]">
              <div className="p-3 rounded-xl bg-black/20 border border-white/5 space-y-2">
                <div className="flex items-center gap-1.5 text-white font-medium text-xs">
                  <Clock className="w-3.5 h-3.5 text-[#C29D7D]" />
                  <span>{lang === 'en' ? 'Branch Operating Hours' : 'Jam Operasional Cabang'}</span>
                </div>
                <div className="space-y-1.5 text-[11px] pt-1">
                  <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-1">
                    <span className="text-[#D8CFCA]">Cabang 1 (Maguwo):</span>
                    <span className="font-semibold text-[#E6B87D] font-mono">10.00 - 20.00 WIB</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#D8CFCA]">Cabang 2 (Pakualaman):</span>
                    <span className="font-semibold text-[#E6B87D] font-mono">09.00 - 19.00 WIB</span>
                  </div>
                </div>
                <div className="text-[10px] text-[#A89E97] pt-0.5">
                  {lang === 'en' ? 'Open everyday (Monday - Sunday)' : 'Buka setiap hari (Senin - Minggu)'}
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <div className="text-[11px] font-semibold text-[#FAF8F5] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C29D7D]" />
                  <span>{lang === 'en' ? '2 Salon Branches (Yogyakarta)' : '2 Lokasi Cabang (Yogyakarta)'}</span>
                </div>

                {SALON_BRANCHES.map((branch) => (
                  <div key={branch.id} className="p-2.5 rounded-lg bg-black/20 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#C29D7D]/20 text-[#E6B87D] uppercase">
                        {branch.badge}
                      </span>
                      <span className="text-[11px] text-[#A89E97]">{branch.city}</span>
                    </div>
                    <div className="text-white text-xs font-medium">{branch.shortName}</div>
                    <div className="text-[10px] text-[#E6B87D] font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C29D7D]" />
                      <span>{branch.openingHours}</span>
                    </div>
                    <div className="text-[11px] text-[#B8ACA2] line-clamp-2 leading-relaxed">
                      {branch.address}
                    </div>
                    <div className="pt-1">
                      <a
                        href={branch.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#E6B87D] hover:underline"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7067]">
          <div>
            © {new Date().getFullYear()} {t('footer.rights')}
          </div>
          <div className="flex items-center gap-1">
            <span>{t('footer.madeWith')}</span>
            <Heart className="w-3 h-3 text-[#C29D7D] fill-[#C29D7D]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
