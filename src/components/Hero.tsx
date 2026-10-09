import React from 'react';
import { ArrowDown, MessageCircle, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { IMAGES } from '../assets/imageAssets';
import { WHATSAPP_CONFIG } from '../data/servicesData';

interface HeroProps {
  onOpenPriceList: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPriceList }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#F2ECE1] to-transparent pointer-events-none -z-10 opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#8C6D58]">
              <span>Deara Beauty Salon</span>
              <span aria-hidden="true">·</span>
              <span>Official Hair & Styling Price List</span>
            </div>

            <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl text-[#242120] leading-[1.12] tracking-tight text-balance">
              Sentuhan penataan rambut profesional & perawatan rambut impian Anda.
            </h1>

            <p className="text-base sm:text-lg text-[#615850] max-w-xl leading-relaxed">
              Dari Signature Haircut by Owner (Cabang Maguwo), Hair Treatment berprotein, L’Oreal Smoothing, hingga Fashion Colouring berdimensi dengan harga transparan resmi.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#layanan-harga"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenPriceList();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#2E2824] hover:bg-[#433B35] rounded-xl transition-all shadow-sm hover:shadow"
              >
                <span>Lihat Katalog & Price List</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={WHATSAPP_CONFIG.rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#242120] bg-white hover:bg-[#F7F4EE] border border-[#DDD5C7] rounded-xl transition-all shadow-xs"
              >
                <MessageCircle className="w-4.5 h-4.5 text-[#25D366]" />
                <span>Konsultasi & Reservasi via WhatsApp</span>
              </a>
            </div>

            {/* Micro reassurance */}
            <div className="pt-2 flex items-center gap-2 text-xs text-[#7A7067]">
              <Sparkles className="w-3.5 h-3.5 text-[#B88746]" />
              <span>Pilih layanan favorit Anda dan dapatkan konfirmasi jadwal instan dari tim Deara.</span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Studio Image Frame */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Outer decorative border frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E4DDD2] bg-[#EFEAE2] shadow-xl">
                <img
                  src={IMAGES.hero}
                  alt="Suasana interior studio perawatan Deara yang elegan, tenang, dan higienis"
                  className="w-full aspect-[4/3] sm:aspect-[16/11] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle scrim for ambiance */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Quiet caption badge */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs backdrop-blur-md bg-black/40 border border-white/20 rounded-lg p-3">
                  <div className="font-serif-brand text-sm font-semibold text-[#F7EBE1]">Deara Private Sanctuary</div>
                  <div className="text-white/80 text-[11px] mt-0.5">Ruang perawatan privat, nyaman, dan beraroma aromaterapi menenangkan.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Adjacency Trust Anchor Strip */}
        <div className="mt-14 pt-8 border-t border-[#E8E2D9] grid grid-cols-1 sm:grid-cols-3 gap-6 text-[#524B45]">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#EFEAE2] border border-[#DDD5C7] text-[#8C6D58] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-[#242120]">100% Steril & Higienis</div>
              <div className="text-xs text-[#7A7067] mt-0.5">Alat medis desinfeksi UV & pemakaian disposable sekali pakai.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#EFEAE2] border border-[#DDD5C7] text-[#8C6D58] shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-[#242120]">Terapis Bersertifikasi</div>
              <div className="text-xs text-[#7A7067] mt-0.5">Penanganan ramah, berpengalaman, dan konsultasi kebutuhan kulit.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#EFEAE2] border border-[#DDD5C7] text-[#8C6D58] shrink-0">
              <Sparkles className="w-5 h-5 text-[#B88746]" />
            </div>
            <div>
              <div className="font-semibold text-sm text-[#242120]">Produk Premium Berkualitas</div>
              <div className="text-xs text-[#7A7067] mt-0.5">Bahan organik dan serum aktif teruji klinis ramah kulit sensitif.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
