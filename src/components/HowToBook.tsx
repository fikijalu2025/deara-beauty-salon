import React from 'react';
import { MessageCircle, CalendarCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/servicesData';

export const HowToBook: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Pilih Layanan & Paket',
      desc: 'Eksplorasi price list lengkap di atas. Anda bisa memilih 1 layanan atau beberapa layanan sekaligus menggunakan fitur estimasi.',
      icon: Sparkles
    },
    {
      num: '02',
      title: 'Kirim Chat WhatsApp',
      desc: 'Klik tombol reservasi. Format pesan terisi otomatis sehingga Anda cukup mengirimkan pesan ke nomor resmi Deara 0851-4839-4233.',
      icon: MessageCircle
    },
    {
      num: '03',
      title: 'Konfirmasi Jadwal',
      desc: 'Admin Deara akan membalas ketersediaan jam dan mengunci slot khusus Anda. Datang tepat waktu dan rasakan relaksasi maksimal.',
      icon: CalendarCheck
    }
  ];

  return (
    <section id="cara-reservasi" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#8C6D58]">
            Alur Reservasi Cepat
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl text-[#242120] mt-2">
            3 Langkah Mudah Reservasi
          </h2>
          <p className="text-sm text-[#665D54] mt-2.5">
            Tanpa formulir rumit atau proses berbelit. Cukup beberapa ketukan langsung via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-7 border border-[#E8E1D5] shadow-xs hover:border-[#D1C4B5] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE1]">
                    <span className="font-serif-brand text-3xl font-bold text-[#D4C3B3]">
                      {s.num}
                    </span>
                    <div className="p-2.5 bg-[#FAF6F0] rounded-xl text-[#8C6D58]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif-brand text-xl text-[#242120] mt-5">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C554E] mt-2.5 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F2ECE1] flex items-center gap-2 text-xs text-[#8C6D58] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Proses reservasi ramah & responsif</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="mt-14 bg-[#2E2824] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif-brand text-2xl sm:text-3xl text-[#FAF8F5]">
              Ingin berkonsultasi mengenai kondisi kulit Anda terlebih dahulu?
            </h3>
            <p className="text-xs sm:text-sm text-[#B8ACA2] max-w-xl">
              Admin kami dengan senang hati membantu merekomendasikan treatment paling pas untuk kebutuhan Anda.
            </p>
          </div>

          <a
            href={WHATSAPP_CONFIG.rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#242120] bg-white hover:bg-[#F2ECE1] rounded-xl transition-all shadow-md shrink-0 whitespace-nowrap"
          >
            <MessageCircle className="w-4.5 h-4.5 text-[#25D366]" />
            <span>Chat WhatsApp Sekarang</span>
          </a>
        </div>
      </div>
    </section>
  );
};
