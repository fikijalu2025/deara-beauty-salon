import React from 'react';
import { MessageCircle, CalendarCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';

export const HowToBook: React.FC = () => {
  const { t, lang } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t('howToBook.s1Title'),
      desc: t('howToBook.s1Desc'),
      icon: Sparkles
    },
    {
      num: '02',
      title: t('howToBook.s2Title'),
      desc: t('howToBook.s2Desc'),
      icon: MessageCircle
    },
    {
      num: '03',
      title: t('howToBook.s3Title'),
      desc: t('howToBook.s3Desc'),
      icon: CalendarCheck
    }
  ];

  return (
    <section id="cara-reservasi" className="py-16 sm:py-24 bg-[#FAF8F5] dark:bg-[#141210] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#8C6D58] dark:text-[#D8B168]">
            {t('howToBook.kicker')}
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl text-[#242120] dark:text-[#FAF5EE] mt-2">
            {t('howToBook.title')}
          </h2>
          <p className="text-sm text-[#665D54] dark:text-[#BAACA0] mt-2.5">
            {t('howToBook.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative bg-white dark:bg-[#1A1715] rounded-2xl p-7 border border-[#E8E1D5] dark:border-[#302A24] shadow-xs hover:border-[#D1C4B5] dark:hover:border-[#473E36] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE1] dark:border-[#28221D]">
                    <span className="font-serif-brand text-3xl font-bold text-[#D4C3B3] dark:text-[#5E5246]">
                      {s.num}
                    </span>
                    <div className="p-2.5 bg-[#FAF6F0] dark:bg-[#25201B] rounded-xl text-[#8C6D58] dark:text-[#D8B168]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif-brand text-xl text-[#242120] dark:text-[#FAF5EE] mt-5">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C554E] dark:text-[#B5A89C] mt-2.5 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F2ECE1] dark:border-[#28221D] flex items-center gap-2 text-xs text-[#8C6D58] dark:text-[#D8B168] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Friendly & prompt booking assistance' : 'Proses reservasi ramah & responsif'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="mt-14 bg-[#2E2824] dark:bg-[#1F1A16] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-transparent dark:border-[#382E26]">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif-brand text-2xl sm:text-3xl text-[#FAF8F5] dark:text-[#FAF5EE]">
              {t('howToBook.bannerTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#B8ACA2] dark:text-[#C5B8AC] max-w-xl">
              {t('howToBook.bannerDesc')}
            </p>
          </div>

          <a
            href={WHATSAPP_CONFIG.rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#242120] bg-white dark:bg-[#D4A76A] dark:text-[#181410] hover:bg-[#F2ECE1] dark:hover:bg-[#E2BA84] rounded-xl transition-all shadow-md shrink-0 whitespace-nowrap"
          >
            <MessageCircle className="w-4.5 h-4.5 text-[#25D366] dark:text-[#18753B]" />
            <span>{t('howToBook.bannerBtn')}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
