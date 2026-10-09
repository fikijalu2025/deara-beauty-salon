import React from 'react';
import { MessageCircle, Clock, MapPin, Heart, Settings2, ExternalLink } from 'lucide-react';
import { WHATSAPP_CONFIG, SALON_INFO } from '../data/servicesData';
import { DearaLogo } from './DearaLogo';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenManager: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenManager }) => {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-[#24201D] text-[#D8CFCA] pt-16 pb-12 border-t border-[#3B342F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3B342F]">
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
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#C29D7D] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">{t('footer.everyDay')}</div>
                  <div>{t('footer.hoursDetail')}</div>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-2">
                <MapPin className="w-4 h-4 text-[#C29D7D] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Deara Beauty Salon</div>
                  <div className="text-[11px] leading-relaxed text-[#B8ACA2]">
                    {SALON_INFO.address}
                  </div>
                  <div className="pt-1.5">
                    <a
                      href={SALON_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#E6B87D] hover:underline"
                    >
                      <span>{t('location.openInApp')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
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
