import React, { useState } from 'react';
import {
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Instagram,
  Video,
  MessageCircle,
  Clock,
  Sparkles,
  Compass,
  Building2,
  Navigation
} from 'lucide-react';
import { SALON_BRANCHES, SALON_INFO, BranchInfo } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';

export const SocialAndLocation: React.FC = () => {
  const [activeBranchId, setActiveBranchId] = useState<'maguwo' | 'pakualaman'>('maguwo');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { t, lang } = useLanguage();

  const activeBranch: BranchInfo =
    SALON_BRANCHES.find((b) => b.id === activeBranchId) || SALON_BRANCHES[0];

  const handleCopyAddress = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <section id="lokasi-sosmed" className="py-16 sm:py-24 bg-white dark:bg-[#141210] border-t border-[#E8E2D9] dark:border-[#2D2721] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EFE6] dark:bg-[#25201C] text-[11px] font-semibold tracking-widest uppercase text-[#8C6D58] dark:text-[#D8B168] border border-[#DDD5C7] dark:border-[#3D352E] mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t('location.branchesCount')}</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl text-[#242120] dark:text-[#FAF5EE]">
            {t('location.title')}
          </h2>
          <p className="text-sm sm:text-base text-[#665D54] dark:text-[#BAACA0] mt-3 leading-relaxed">
            {t('location.desc')}
          </p>
        </div>

        {/* Branch Selector Tabs */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-[#FAF8F5] dark:bg-[#1C1815] border border-[#E8E1D5] dark:border-[#332C25] rounded-2xl shadow-2xs">
            {SALON_BRANCHES.map((branch) => {
              const isActive = branch.id === activeBranchId;
              return (
                <button
                  key={branch.id}
                  onClick={() => setActiveBranchId(branch.id)}
                  type="button"
                  className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-[#29231E] border border-[#D5C7B7] dark:border-[#4A3F33] shadow-xs text-[#242120] dark:text-[#FAF5EE]'
                      : 'text-[#6B5E52] dark:text-[#A89C8E] hover:bg-white/60 dark:hover:bg-[#241E1A] border border-transparent'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isActive
                        ? 'bg-[#2E2824] dark:bg-[#D4A76A] text-white dark:text-[#181410]'
                        : 'bg-[#EFEAE2] dark:bg-[#25201C] text-[#8C6D58] dark:text-[#C5B099]'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#F2ECE1] dark:bg-[#332A22] text-[#8C6D58] dark:text-[#D8B168]">
                        {branch.badge}
                      </span>
                      <span className="text-xs font-semibold text-[#8C6D58] dark:text-[#D8B168]">
                        {branch.city}
                      </span>
                    </div>
                    <div className="font-semibold text-sm mt-1 truncate">
                      {branch.shortName}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#8C6D58] dark:text-[#D8B168] mt-1 font-medium">
                      <Clock className="w-3 h-3 shrink-0" />
                      <span>{lang === 'en' ? branch.openingHoursEn : branch.openingHours}</span>
                    </div>
                    <p className="text-[11px] text-[#7A7067] dark:text-[#A09384] line-clamp-1 mt-0.5">
                      {branch.address}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Grid: Google Maps Interactive Frame & Address Details for Active Branch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Map Embed Frame (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#DDD5C7] dark:border-[#332C25] bg-[#FAF8F5] dark:bg-[#1C1916] shadow-xs flex flex-col">
            <div className="p-4 sm:p-5 bg-[#FAF8F5] dark:bg-[#1C1916] border-b border-[#E8E2D9] dark:border-[#2D2721] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="w-4 h-4 text-[#C87D43] dark:text-[#E2B774] shrink-0" />
                <span className="font-semibold text-xs sm:text-sm text-[#242120] dark:text-[#FAF5EE] truncate">
                  {activeBranch.name}
                </span>
              </div>
              <a
                href={activeBranch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8C6D58] dark:text-[#D4A76A] hover:text-[#524538] dark:hover:text-[#FAF5EE] hover:underline shrink-0"
              >
                <span>{t('location.openInApp')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Interactive Responsive Iframe Map */}
            <div className="relative w-full h-[320px] sm:h-[380px] bg-[#EFEAE2] dark:bg-[#25201B]">
              <iframe
                key={activeBranch.id}
                title={`Google Maps ${activeBranch.name}`}
                src={activeBranch.embedMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full dark:invert-[0.88] dark:hue-rotate-180 dark:contrast-[0.92]"
              />
            </div>
          </div>

          {/* Address & Direction Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-[#E8E1D5] dark:border-[#332C25] bg-[#FAF8F5] dark:bg-[#1C1916] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#F2ECE1] dark:bg-[#332A22] text-[#8C6D58] dark:text-[#D8B168]">
                    {activeBranch.badge}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8C6D58] dark:text-[#D8B168]">
                    {activeBranch.city}
                  </span>
                </div>
                <h3 className="font-serif-brand text-2xl text-[#242120] dark:text-[#FAF5EE] mt-1.5 leading-snug">
                  {activeBranch.name}
                </h3>
              </div>

              {/* Full Address Block */}
              <div className="p-4 bg-white dark:bg-[#231F1B] rounded-xl border border-[#E5DDD0] dark:border-[#383129] space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#8C6D58] dark:text-[#D8B168] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#3E3832] dark:text-[#D5C9BC] leading-relaxed">
                    {activeBranch.address}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F2ECE1] dark:border-[#2D2721] flex justify-end">
                  <button
                    onClick={() => handleCopyAddress(activeBranch.address, activeBranch.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B5E52] dark:text-[#BAACA0] hover:text-[#242120] dark:hover:text-[#FAF5EE] transition-colors cursor-pointer"
                  >
                    {copiedId === activeBranch.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{t('location.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#8C6D58] dark:text-[#D8B168]" />
                        <span>{t('location.copyBtn')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Branch Highlights & Specific Operational Hours */}
              <div className="space-y-2.5 text-xs text-[#5C554E] dark:text-[#BAACA0]">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-[#231F1B] border border-[#E5DDD0] dark:border-[#383129]">
                  <Clock className="w-4 h-4 text-[#C87D43] dark:text-[#E2B774] shrink-0" />
                  <div>
                    <span className="text-[11px] font-semibold text-[#8C6D58] dark:text-[#D8B168] block">
                      {lang === 'en' ? 'Operational Hours' : 'Jam Operasional Buka'}
                    </span>
                    <span className="text-xs font-bold text-[#242120] dark:text-[#FAF5EE]">
                      {lang === 'en' ? `Open Everyday: ${activeBranch.openingHoursEn}` : `Buka Setiap Hari: ${activeBranch.openingHours}`}
                    </span>
                  </div>
                </div>

                {activeBranch.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#8C6D58] dark:text-[#D8B168] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Google Maps Navigation Button */}
            <div className="pt-6">
              <a
                href={activeBranch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#2E2824] dark:bg-[#D4A76A] dark:text-[#181410] hover:bg-[#433B35] dark:hover:bg-[#E2BA84] rounded-xl shadow-xs transition-all hover:shadow"
              >
                <Compass className="w-4 h-4 text-[#E6B87D] dark:text-[#181410]" />
                <span>{t('location.directionsBtn')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Dual Branch At-a-Glance Overview Cards */}
        <div className="mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#7A7067] dark:text-[#A09384] mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#8C6D58] dark:text-[#D8B168]" />
            <span>{lang === 'en' ? 'Both Branches at a Glance' : 'Daftar Lengkap 2 Cabang Deara'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SALON_BRANCHES.map((b) => (
              <div
                key={b.id}
                className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                  b.id === activeBranchId
                    ? 'border-[#8C6D58] dark:border-[#D4A76A] bg-white dark:bg-[#1E1A17] shadow-sm'
                    : 'border-[#E8E1D5] dark:border-[#302A24] bg-white dark:bg-[#1A1715]'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#F2ECE1] dark:bg-[#2C241E] text-[#8C6D58] dark:text-[#D8B168]">
                      {b.badge}
                    </span>
                    <span className="text-xs text-[#7A7067] dark:text-[#A09384] font-medium">
                      {b.city}
                    </span>
                  </div>
                  {b.id === activeBranchId && (
                    <span className="text-[11px] font-semibold text-[#8C6D58] dark:text-[#D8B168] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {lang === 'en' ? 'Active in map' : 'Ditampilkan di peta'}
                    </span>
                  )}
                </div>

                <h4 className="font-serif-brand text-lg sm:text-xl font-semibold text-[#242120] dark:text-[#FAF5EE]">
                  {b.name}
                </h4>

                {/* Operating hours pill */}
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF8F5] dark:bg-[#26201B] border border-[#E8E1D5] dark:border-[#383028] text-xs">
                  <Clock className="w-3.5 h-3.5 text-[#C87D43] dark:text-[#E2B774] shrink-0" />
                  <span className="text-[#6B5E52] dark:text-[#BAACA0]">
                    {lang === 'en' ? 'Hours: ' : 'Buka: '}
                  </span>
                  <span className="font-semibold text-[#242120] dark:text-[#FAF5EE]">
                    {lang === 'en' ? b.openingHoursEn : b.openingHours}
                  </span>
                </div>

                <div className="mt-2.5 text-xs text-[#5C554E] dark:text-[#C5B9AC] flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#8C6D58] dark:text-[#D8B168] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{b.address}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F2ECE1] dark:border-[#2D2620] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveBranchId(b.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        b.id === activeBranchId
                          ? 'bg-[#2E2824] text-white dark:bg-[#D4A76A] dark:text-[#181410]'
                          : 'bg-[#F5EFE6] dark:bg-[#26211D] text-[#5C554E] dark:text-[#D8CFCA] hover:bg-[#EFEAE2]'
                      }`}
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'View on Map' : 'Tampilkan di Peta'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyAddress(b.address, `card-${b.id}`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-[#6B5E52] dark:text-[#A89C8E] hover:bg-[#F5EFE6] dark:hover:bg-[#26211D] cursor-pointer"
                    >
                      {copiedId === `card-${b.id}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold">{t('location.copied')}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px]">{t('location.copyBtn')}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <a
                    href={b.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C6D58] dark:text-[#D8B168] hover:underline"
                  >
                    <span>{t('location.openInApp')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Channels Grid (TikTok, Instagram, WhatsApp) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. TikTok Card */}
          <div className="rounded-2xl border border-[#E8E1D5] dark:border-[#302A24] bg-white dark:bg-[#1A1715] p-6 sm:p-7 shadow-xs hover:border-[#D1C4B5] dark:hover:border-[#423930] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE1] dark:border-[#28221D]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-black dark:bg-[#28231E] border border-transparent dark:border-[#3D352E] flex items-center justify-center text-white shadow-xs">
                    <Video className="w-5 h-5 text-[#25F4EE]" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#242120] dark:text-[#FAF5EE]">TikTok Official</div>
                    <div className="text-xs text-[#8C7E72] dark:text-[#9E9284]">@deara_beautysalon</div>
                  </div>
                </div>
                <span className="text-[11px] text-[#242120] dark:text-[#E2D6CA] font-semibold bg-[#F5EFE6] dark:bg-[#2A241F] px-2 py-0.5 rounded">
                  {t('location.tiktokBadge')}
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#5C554E] dark:text-[#B5A89C] leading-relaxed">
                {t('location.tiktokDesc')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F2ECE1] dark:border-[#28221D]">
              <a
                href={SALON_INFO.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-black dark:bg-[#2E2822] hover:bg-neutral-800 dark:hover:bg-[#3D352D] rounded-xl transition-colors border border-transparent dark:border-[#423A31]"
              >
                <span>{t('location.tiktokBtn')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 2. Instagram Card */}
          <div className="rounded-2xl border border-[#E8E1D5] dark:border-[#302A24] bg-white dark:bg-[#1A1715] p-6 sm:p-7 shadow-xs hover:border-[#D1C4B5] dark:hover:border-[#423930] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE1] dark:border-[#28221D]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#242120] dark:text-[#FAF5EE]">Instagram Official</div>
                    <div className="text-xs text-[#8C7E72] dark:text-[#9E9284]">@deara_beautysalon</div>
                  </div>
                </div>
                <span className="text-[11px] text-[#8C5D39] dark:text-[#F3BA78] font-semibold bg-[#F7ECE1] dark:bg-[#342417] px-2 py-0.5 rounded border border-[#E8D1BE] dark:border-[#523A25]">
                  {t('location.igBadge')}
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#5C554E] dark:text-[#B5A89C] leading-relaxed">
                {t('location.igDesc')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F2ECE1] dark:border-[#28221D]">
              <a
                href={SALON_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:opacity-95 rounded-xl transition-opacity"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{t('location.igBtn')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3. WhatsApp Direct Card */}
          <div className="rounded-2xl border border-[#E8E1D5] dark:border-[#302A24] bg-white dark:bg-[#1A1715] p-6 sm:p-7 shadow-xs hover:border-[#D1C4B5] dark:hover:border-[#423930] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE1] dark:border-[#28221D]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-xs">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#242120] dark:text-[#FAF5EE]">WhatsApp Reservasi</div>
                    <div className="text-xs text-[#8C7E72] dark:text-[#9E9284] font-mono">{SALON_INFO.displayPhone}</div>
                  </div>
                </div>
                <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-transparent dark:border-emerald-800/40">
                  {t('location.waBadge')}
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#5C554E] dark:text-[#B5A89C] leading-relaxed">
                {t('location.waDesc')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F2ECE1] dark:border-[#28221D]">
              <a
                href={SALON_INFO.rawWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-xl transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
                <span>{t('location.waBtn')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
