import React from 'react';
import { IMAGES } from '../assets/imageAssets';
import { Sparkles, Shield, Heart, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const StudioHighlight: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="suasana" className="py-16 sm:py-24 bg-[#F5EFE6]/50 border-y border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#8C6D58]">
            {t('ambiance.kicker')}
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl text-[#242120] mt-2">
            {t('ambiance.title')}
          </h2>
          <p className="text-sm sm:text-base text-[#665D54] mt-3 leading-relaxed">
            {t('ambiance.desc')}
          </p>
        </div>

        {/* 2-Column Split Image & Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Lounge Atmosphere */}
          <div className="bg-white rounded-2xl border border-[#E4DDD2] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#EFEAE2]">
              <img
                src={IMAGES.lounge}
                alt="Ruang tunggu dan konsultasi privat Deara yang hangat dan nyaman"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 text-white text-xs font-medium">
                {t('ambiance.card1Tag')}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="font-serif-brand text-2xl text-[#242120]">
                {t('ambiance.card1Title')}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
                {t('ambiance.card1Desc')}
              </p>
              <div className="pt-3 border-t border-[#F2ECE1] flex items-center gap-4 text-xs text-[#7A7067]">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#8C6D58]" />
                  <span>{t('ambiance.card1F1')}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#8C6D58]" />
                  <span>{t('ambiance.card1F2')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Skincare Quality & Organic Formulations */}
          <div className="bg-white rounded-2xl border border-[#E4DDD2] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#EFEAE2]">
              <img
                src={IMAGES.signatureGlow}
                alt="Produk skincare botanical pilihan dan alat higienis di Deara Studio"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 text-white text-xs font-medium">
                {t('ambiance.card2Tag')}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="font-serif-brand text-2xl text-[#242120]">
                {t('ambiance.card2Title')}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
                {t('ambiance.card2Desc')}
              </p>
              <div className="pt-3 border-t border-[#F2ECE1] flex items-center gap-4 text-xs text-[#7A7067]">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#8C6D58]" />
                  <span>{t('ambiance.card2F1')}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#8C6D58]" />
                  <span>{t('ambiance.card2F2')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
