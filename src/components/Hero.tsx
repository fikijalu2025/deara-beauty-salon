import React from 'react';
import { ArrowDown, MessageCircle, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { IMAGES } from '../assets/imageAssets';
import { WHATSAPP_CONFIG } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenPriceList: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPriceList }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#F2ECE1] dark:from-[#241D17]/60 to-transparent pointer-events-none -z-10 opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl text-[#242120] dark:text-[#FAF5EE] leading-[1.12] tracking-tight text-balance">
              {t('hero.title')}
            </h1>

            <p className="text-base sm:text-lg text-[#615850] dark:text-[#C5B8A8] max-w-xl leading-relaxed">
              {t('hero.desc')}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#layanan-harga"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenPriceList();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#2E2824] dark:bg-[#D4A76A] dark:text-[#1A1612] hover:bg-[#433B35] dark:hover:bg-[#E2BA84] rounded-xl transition-all shadow-sm hover:shadow"
              >
                <span>{t('hero.btnPrice')}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={WHATSAPP_CONFIG.rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#242120] dark:text-[#FAF5EE] bg-white dark:bg-[#25201C] hover:bg-[#F7F4EE] dark:hover:bg-[#312B26] border border-[#DDD5C7] dark:border-[#3E362E] rounded-xl transition-all shadow-xs"
              >
                <MessageCircle className="w-4.5 h-4.5 text-[#25D366]" />
                <span>{t('hero.btnWhatsApp')}</span>
              </a>
            </div>

            {/* Micro reassurance */}
            <div className="pt-2 flex items-center gap-2 text-xs text-[#7A7067] dark:text-[#A89C8F]">
              <Sparkles className="w-3.5 h-3.5 text-[#B88746] dark:text-[#E2B774]" />
              <span>{t('hero.reassurance')}</span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Studio Image Frame */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Outer decorative border frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E4DDD2] dark:border-[#383028] bg-[#EFEAE2] dark:bg-[#201C18] shadow-xl">
                <img
                  src={IMAGES.hero}
                  alt="Suasana interior studio perawatan Deara yang elegan, tenang, dan higienis"
                  className="w-full aspect-[4/3] sm:aspect-[16/11] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle scrim for ambiance */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Quiet caption badge */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs backdrop-blur-md bg-black/50 border border-white/20 rounded-lg p-3">
                  <div className="font-serif-brand text-sm font-semibold text-[#F7EBE1]">
                    {t('hero.privateSanctuary')}
                  </div>
                  <div className="text-white/80 text-[11px] mt-0.5">
                    {t('hero.privateSanctuaryDesc')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Adjacency Trust Anchor Strip */}
        <div className="mt-14 pt-8 border-t border-[#E8E2D9] dark:border-[#2D2620] grid grid-cols-1 sm:grid-cols-3 gap-6 text-[#524B45] dark:text-[#C5B9AC]">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#EFEAE2] dark:bg-[#25201C] border border-[#DDD5C7] dark:border-[#3D342C] text-[#8C6D58] dark:text-[#D8B168] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-[#242120] dark:text-[#FAF5EE]">{t('hero.proof1Title')}</div>
              <div className="text-xs text-[#7A7067] dark:text-[#A09384] mt-0.5">{t('hero.proof1Desc')}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#EFEAE2] dark:bg-[#25201C] border border-[#DDD5C7] dark:border-[#3D342C] text-[#8C6D58] dark:text-[#D8B168] shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-[#242120] dark:text-[#FAF5EE]">{t('hero.proof2Title')}</div>
              <div className="text-xs text-[#7A7067] dark:text-[#A09384] mt-0.5">{t('hero.proof2Desc')}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#EFEAE2] dark:bg-[#25201C] border border-[#DDD5C7] dark:border-[#3D342C] text-[#8C6D58] dark:text-[#D8B168] shrink-0">
              <Sparkles className="w-5 h-5 text-[#B88746] dark:text-[#E2B774]" />
            </div>
            <div>
              <div className="font-semibold text-sm text-[#242120] dark:text-[#FAF5EE]">{t('hero.proof3Title')}</div>
              <div className="text-xs text-[#7A7067] dark:text-[#A09384] mt-0.5">{t('hero.proof3Desc')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
