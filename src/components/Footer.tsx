import React from 'react';
import { MessageCircle, Clock, MapPin, Heart, Settings2 } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/servicesData';

interface FooterProps {
  onOpenManager: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenManager }) => {
  return (
    <footer className="bg-[#24201D] text-[#D8CFCA] pt-16 pb-12 border-t border-[#3B342F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3B342F]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="font-serif-brand text-3xl tracking-widest text-[#FAF8F5] uppercase">
              DEARA BEAUTY SALON
            </div>
            <p className="text-xs sm:text-sm text-[#A89E97] max-w-sm leading-relaxed">
              Salon kecantikan dan perawatan rambut profesional dengan produk berkualitas, stylist berpengalaman, dan penanganan eksklusif.
            </p>

            {/* Social Media & Contact from PDF */}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={WHATSAPP_CONFIG.rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1EBE5D] transition-colors w-fit"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Reservasi: {WHATSAPP_CONFIG.displayPhone}</span>
              </a>

              <div className="flex items-center gap-4 text-xs text-[#D8CFCA] pt-1">
                <a
                  href="https://instagram.com/deara_beautysalon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#C29D7D]">IG:</span>
                  <span>@deara_beautysalon</span>
                </a>
                <span>·</span>
                <a
                  href="https://tiktok.com/@deara_beautysalon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#C29D7D]">TikTok:</span>
                  <span>@deara_beautysalon</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
              Navigasi Cepat
            </div>
            <ul className="space-y-2 text-xs text-[#A89E97]">
              <li>
                <a href="#layanan-harga" className="hover:text-white transition-colors">
                  Katalog Layanan & Harga
                </a>
              </li>
              <li>
                <a href="#suasana" className="hover:text-white transition-colors">
                  Suasana Studio & Fasilitas
                </a>
              </li>
              <li>
                <a href="#cara-reservasi" className="hover:text-white transition-colors">
                  Panduan Alur Reservasi
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Tanya Jawab (FAQ)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenManager}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left text-[#C29D7D]"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>Kustomisasi / Input Data Price List</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Operational Hours & Note */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
              Jam Operasional & Reservasi
            </div>
            <div className="space-y-2 text-xs text-[#A89E97]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#C29D7D] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Buka Setiap Hari</div>
                  <div>09.00 – 20.00 WIB (Sesi Terakhir: 18.30 WIB)</div>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-2">
                <MapPin className="w-4 h-4 text-[#C29D7D] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Studio Privat Eksklusif</div>
                  <div>Alamat lengkap & panduan Google Maps dikirimkan otomatis setelah reservasi terkonfirmasi.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7067]">
          <div>
            © {new Date().getFullYear()} Deara Studio. Seluruh hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan dedikasi untuk keindahan Anda</span>
            <Heart className="w-3 h-3 text-[#C29D7D] fill-[#C29D7D]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
