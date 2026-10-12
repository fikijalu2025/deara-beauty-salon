import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ThemeToggleProps {
  className?: string;
  variant?: 'compact' | 'labeled';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'compact',
}) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const label = isDark ? t('theme.light') : t('theme.dark');
  const tooltip = isDark ? 'Switch to light mode' : 'Switch to dark mode (Sophisticated Salon Ambiance)';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center gap-1.5 p-2 rounded-xl transition-all duration-300 select-none cursor-pointer border ${
        isDark
          ? 'bg-[#23201D] text-[#D8B168] hover:text-[#F3D798] hover:bg-[#2C2723] border-[#3E3731] shadow-inner'
          : 'bg-[#EFEAE2] text-[#6B5E52] hover:text-[#242120] hover:bg-[#E5DED4] border-[#DDD5C7] shadow-2xs'
      } ${className}`}
      aria-label={label}
      aria-pressed={isDark}
      title={tooltip}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-[#D8B168] transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-[#6B5E52] transition-transform duration-300 rotate-0 hover:-rotate-12" />
        )}
      </div>

      {variant === 'labeled' && (
        <span className="text-xs font-semibold whitespace-nowrap">
          {label}
        </span>
      )}
    </button>
  );
};
