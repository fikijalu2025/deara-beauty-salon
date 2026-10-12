import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'compact'
}) => {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-1 bg-[#EFEAE2] dark:bg-[#25211D] border border-[#DDD5C7] dark:border-[#3D352E] rounded-xl text-xs transition-colors shadow-2xs ${className}`}
      role="group"
      aria-label={lang === 'en' ? 'Select language' : 'Pilih bahasa'}
    >
      <div
        className="pl-1.5 pr-1 text-[#8C7E72] dark:text-[#A09486] flex items-center"
        aria-hidden="true"
        title={lang === 'en' ? 'Language' : 'Bahasa'}
      >
        <Globe className="w-3.5 h-3.5" />
      </div>

      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={() => setLang('id')}
          className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
            lang === 'id'
              ? 'bg-white dark:bg-[#342D26] text-[#242120] dark:text-[#FAF5EE] shadow-xs ring-1 ring-[#D8CEBF] dark:ring-[#52463B]'
              : 'text-[#6E6358] dark:text-[#B0A496] hover:text-[#242120] dark:hover:text-[#F5EFE6] hover:bg-[#E5DED4]/60 dark:hover:bg-[#2F2924]'
          }`}
          aria-pressed={lang === 'id'}
          title="Bahasa Indonesia"
          aria-label="Ganti ke Bahasa Indonesia"
        >
          {variant === 'full' ? '🇮🇩 ID' : 'ID'}
        </button>

        <button
          type="button"
          onClick={() => setLang('en')}
          className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
            lang === 'en'
              ? 'bg-white dark:bg-[#342D26] text-[#242120] dark:text-[#FAF5EE] shadow-xs ring-1 ring-[#D8CEBF] dark:ring-[#52463B]'
              : 'text-[#6E6358] dark:text-[#B0A496] hover:text-[#242120] dark:hover:text-[#F5EFE6] hover:bg-[#E5DED4]/60 dark:hover:bg-[#2F2924]'
          }`}
          aria-pressed={lang === 'en'}
          title="English"
          aria-label="Switch to English"
        >
          {variant === 'full' ? '🇬🇧 EN' : 'EN'}
        </button>
      </div>
    </div>
  );
};
