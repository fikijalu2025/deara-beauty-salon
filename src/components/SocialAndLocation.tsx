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
  Compass
} from 'lucide-react';
import { SALON_INFO } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';

export const SocialAndLocation: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(SALON_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="lokasi-sosmed" className="py-16 sm:py-24 bg-white border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#8C6D58]">
            {t('location.kicker')}
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl text-[#242120] mt-2">
            {t('location.title')}
          </h2>
          <p className="text-sm sm:text-base text-[#665D54] mt-3 leading-relaxed">
            {t('location.desc')}
          </p>
        </div>

        {/* Top Grid: Google Maps Interactive Frame & Address Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Map Embed Frame (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#DDD5C7] bg-[#FAF8F5] shadow-xs flex flex-col">
            <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#E8E2D9] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C87D43]" />
                <span className="font-semibold text-xs sm:text-sm text-[#242120]">
                  {t('location.mapCardTitle')}
                </span>
              </div>
              <a
                href={SALON_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8C6D58] hover:text-[#524538] hover:underline"
              >
                <span>{t('location.openInApp')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Interactive Responsive Iframe Map */}
            <div className="relative w-full h-[320px] sm:h-[380px] bg-[#EFEAE2]">
              <iframe
                title="Google Maps Deara Beauty Salon"
                src={SALON_INFO.embedMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Address & Direction Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-[#E8E1D5] bg-[#FAF8F5] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8C6D58]">
                  {t('location.addressTitle')}
                </span>
                <h3 className="font-serif-brand text-2xl text-[#242120] mt-1">
                  Deara Beauty Salon
                </h3>
              </div>

              {/* Full Address Block */}
              <div className="p-4 bg-white rounded-xl border border-[#E5DDD0] space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#8C6D58] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#3E3832] leading-relaxed">
                    {SALON_INFO.address}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F2ECE1] flex justify-end">
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B5E52] hover:text-[#242120] transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">{t('location.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#8C6D58]" />
                        <span>{t('location.copyBtn')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Perks */}
              <div className="space-y-2 text-xs text-[#5C554E]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8C6D58]" />
                  <span>{t('location.hours')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#8C6D58]" />
                  <span>{t('location.parking')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8C6D58]" />
                  <span>{t('location.maguwo')}</span>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Navigation Button */}
            <div className="pt-6">
              <a
                href={SALON_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#2E2824] hover:bg-[#433B35] rounded-xl shadow-xs transition-all hover:shadow"
              >
                <Compass className="w-4 h-4 text-[#E6B87D]" />
                <span>{t('location.directionsBtn')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Channels Grid (TikTok, Instagram, WhatsApp) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. TikTok Card */}
          <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6 sm:p-7 shadow-xs hover:border-[#D1C4B5] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE1]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-xs">
                    <Video className="w-5 h-5 text-[#25F4EE]" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#242120]">TikTok Official</div>
                    <div className="text-xs text-[#8C7E72]">@deara_beautysalon</div>
                  </div>
                </div>
                <span className="text-[11px] text-[#242120] font-semibold bg-[#F5EFE6] px-2 py-0.5 rounded">
                  {t('location.tiktokBadge')}
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#5C554E] leading-relaxed">
                {t('location.tiktokDesc')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F2ECE1]">
              <a
                href={SALON_INFO.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-black hover:bg-neutral-800 rounded-xl transition-colors"
              >
                <span>{t('location.tiktokBtn')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 2. Instagram Card */}
          <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6 sm:p-7 shadow-xs hover:border-[#D1C4B5] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE1]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xs">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#242120]">Instagram Official</div>
                    <div className="text-xs text-[#8C7E72]">@deara_beautysalon</div>
                  </div>
                </div>
                <span className="text-[11px] text-[#8C5D39] font-semibold bg-[#F7ECE1] px-2 py-0.5 rounded">
                  {t('location.igBadge')}
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#5C554E] leading-relaxed">
                {t('location.igDesc')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F2ECE1]">
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
          <div className="rounded-2xl border border-[#E8E1D5] bg-white p-6 sm:p-7 shadow-xs hover:border-[#D1C4B5] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE1]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-xs">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#242120]">WhatsApp Reservasi</div>
                    <div className="text-xs text-[#8C7E72] font-mono">{SALON_INFO.displayPhone}</div>
                  </div>
                </div>
                <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  {t('location.waBadge')}
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#5C554E] leading-relaxed">
                {t('location.waDesc')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F2ECE1]">
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
