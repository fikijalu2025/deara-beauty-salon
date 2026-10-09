import React from 'react';
import { MessageCircle, Settings2, Sparkles, Menu, X } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/servicesData';
import { DearaLogo } from './DearaLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenManager: () => void;
  selectedCount: number;
  onOpenEstimator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenManager,
  selectedCount,
  onOpenEstimator,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          {/* Zone 1: Wordmark & Official Logo */}
          <a
            href="#"
            className="flex items-center group whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
            aria-label="Deara Beauty Salon"
          >
            <DearaLogo size={38} variant="gold" />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C554E]">
            <a
              href="#layanan-harga"
              className="hover:text-[#242120] transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav.services')}
            </a>
            <a
              href="#suasana"
              className="hover:text-[#242120] transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav.ambiance')}
            </a>
            <a
              href="#lokasi-sosmed"
              className="hover:text-[#242120] transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav.location')}
            </a>
            <a
              href="#cara-reservasi"
              className="hover:text-[#242120] transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav.howToBook')}
            </a>
            <a
              href="#faq"
              className="hover:text-[#242120] transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav.faq')}
            </a>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Price list data manager button */}
            <button
              onClick={onOpenManager}
              title={t('nav.manage')}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#6B5E52] bg-[#EFEAE2] hover:bg-[#E5DED4] rounded-lg transition-colors whitespace-nowrap shrink-0 border border-[#DDD5C7]"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{t('nav.manage')}</span>
            </button>

            {/* Estimator indicator if items picked */}
            {selectedCount > 0 && (
              <button
                onClick={onOpenEstimator}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#8C5D39] bg-[#F7EFE6] border border-[#E8D1BE] rounded-lg transition-colors whitespace-nowrap shrink-0 hover:bg-[#F0E3D3]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C87D43]" />
                <span>{selectedCount} {t('nav.selected')}</span>
              </button>
            )}

            {/* Primary Action Button */}
            <a
              href={WHATSAPP_CONFIG.rawUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#2E2824] hover:bg-[#433B35] active:bg-[#1E1916] rounded-lg transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span className="hidden sm:inline">{t('nav.bookWhatsApp')}</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#5C554E] hover:text-[#242120] rounded-md"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D9] bg-[#FAF8F5] px-4 pt-4 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D9]">
            <span className="text-xs font-semibold text-[#7A7067]">Bahasa / Language:</span>
            <LanguageSwitcher />
          </div>

          <a
            href="#layanan-harga"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#4D453E] hover:text-[#242120]"
          >
            {t('nav.services')}
          </a>
          <a
            href="#suasana"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#4D453E] hover:text-[#242120]"
          >
            {t('nav.ambiance')}
          </a>
          <a
            href="#lokasi-sosmed"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#4D453E] hover:text-[#242120]"
          >
            {t('nav.location')}
          </a>
          <a
            href="#cara-reservasi"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#4D453E] hover:text-[#242120]"
          >
            {t('nav.howToBook')}
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#4D453E] hover:text-[#242120]"
          >
            {t('nav.faq')}
          </a>

          <div className="pt-2 border-t border-[#E8E2D9] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenManager();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium text-[#6B5E52] bg-[#EFEAE2] rounded-lg border border-[#DDD5C7]"
            >
              <Settings2 className="w-4 h-4" />
              <span>{t('nav.manage')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
