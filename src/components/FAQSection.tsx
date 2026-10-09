import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'Bagaimana cara reservasi jadwal di Deara Beauty Salon?',
    a: 'Sangat mudah! Pilih layanan yang Anda inginkan dari katalog price list di atas, tentukan ukuran rambut (S, M, L, XL bila tersedia), lalu klik tombol "Pesan di WA" atau gunakan tombol "+ Pilih" untuk memilih beberapa treatment sekaligus. Format pesan terisi otomatis untuk chat WhatsApp kami di 0851-4839-4233.'
  },
  {
    q: 'Bagaimana cara booking layanan Haircut by Owner?',
    a: 'Layanan Haircut by Owner (Signature Haircut, Haircut Poni, Haircut + Cuci + Styling) tersedia khusus di Cabang Maguwo. Anda bebas request model rambut referensi apa saja. Disarankan booking beberapa hari sebelumnya via WhatsApp karena slot harian Owner terbatas.'
  },
  {
    q: 'Bagaimana panduan penentuan ukuran panjang rambut (S, M, L, XL)?',
    a: 'Ukuran S adalah rambut pendek (di atas bahu/pipi). Ukuran M adalah rambut sebahu atau sedikit di bawah bahu. Ukuran L adalah rambut panjang se-tali bra/tulang belikat. Ukuran XL adalah rambut di bawah pinggang atau sangat panjang/tebal. Stylist kami juga akan mengonfirmasi langsung saat konsultasi.'
  },
  {
    q: 'Apakah paket Fashion Colouring sudah termasuk bleaching dan vitamin?',
    a: 'Ya! Paket Fashion Colouring di Deara Beauty Salon sudah include 2x Bleaching + 1 Colour target, plus Hair Tonic, Vitamin, dan finishing styling catok/blow agar kondisi rambut tetap kuat dan berkilau.'
  },
  {
    q: 'Apakah ada extra charge untuk rambut tertentu?',
    a: 'Untuk rambut yang sangat tebal, panjang ekstra, atau menggunakan sambungan hair extensions terdapat extra charge penyesuaian produk dan durasi pengerjaan. Untuk perataan warna belang, cat bekas hitam, atau bleaching bertahap berlaku over charge mulai Rp 80.000.'
  },
  {
    q: 'Metode pembayaran apa saja yang diterima di Deara Beauty Salon?',
    a: 'Kami menerima pembayaran tunai (Cash), Transfer Bank (BCA, Mandiri, BRI, BNI), QRIS (GoPay, OVO, Dana, ShopeePay), serta Debit Card.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E8E2D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#8C6D58]">
            Informasi & Bantuan
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl text-[#242120] mt-2">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xs sm:text-sm text-[#665D54] mt-2">
            Ketahui lebih banyak seputar etika reservasi, layanan, dan kenyamanan Anda di Deara.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E8E1D5] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-medium text-sm sm:text-base text-[#242120] hover:bg-[#FAF8F5] transition-colors"
                >
                  <span className="font-serif-brand text-lg">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8C6D58] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C554E] leading-relaxed border-t border-[#F5EFE6]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
