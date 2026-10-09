import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS_ID: FAQItem[] = [
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

const FAQS_EN: FAQItem[] = [
  {
    q: 'How do I make a reservation at Deara Beauty Salon?',
    a: 'It is very simple! Browse through our services catalog above, choose your hair length (S, M, L, XL if applicable), and tap "Book on WA" or use the "+ Select" button to combine multiple treatments. A pre-filled reservation message will open directly in WhatsApp (+62 851-4839-4233).'
  },
  {
    q: 'How do I book a Haircut by Owner session?',
    a: 'Haircut by Owner services (Signature Cut, Bangs/Fringe, Haircut + Wash + Styling) are exclusively available at our Maguwo Branch. You are welcome to request any hairstyle reference. We recommend booking several days in advance via WhatsApp as daily slots for the Owner are limited.'
  },
  {
    q: 'What is the guide for hair length categories (S, M, L, XL)?',
    a: 'Size S represents short hair (above shoulders or cheek length). Size M is shoulder length or just below shoulders. Size L is mid-back (bra-strap level). Size XL is waist-length or exceptionally dense/long hair. Our stylist will also verify this with you during consultation.'
  },
  {
    q: 'Does the Fashion Colouring package include bleaching and vitamins?',
    a: 'Yes! Fashion Colouring packages at Deara Beauty Salon include 2x Bleaching + 1 target shade, plus Hair Tonic, Vitamin treatment, and finishing blow/curling styling to keep your hair fiber nourished and radiant.'
  },
  {
    q: 'Are there extra charges for specific hair conditions?',
    a: 'For unusually dense hair, extra-long lengths, or hair extensions, there is a minor surcharge for added product and salon time. For corrective hair toning, removing black box dye, or multi-step bleaching, overcharges start from Rp 80,000.'
  },
  {
    q: 'What payment methods are accepted at Deara Beauty Salon?',
    a: 'We accept Cash, Bank Transfers (BCA, Mandiri, BRI, BNI), QRIS (GoPay, OVO, Dana, ShopeePay), and Debit Cards.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { lang, t } = useLanguage();

  const faqs = lang === 'en' ? FAQS_EN : FAQS_ID;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E8E2D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#8C6D58]">
            {t('faq.kicker')}
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl text-[#242120] mt-2">
            {t('faq.title')}
          </h2>
          <p className="text-xs sm:text-sm text-[#665D54] mt-2">
            {t('faq.desc')}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => {
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
                  <div className="flex items-center gap-3">
                    <span className="font-serif-brand text-lg">{item.q}</span>
                  </div>
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
