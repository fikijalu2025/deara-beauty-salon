import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'id' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Nav
    'nav.services': 'Layanan & Harga',
    'nav.ambiance': 'Suasana Studio',
    'nav.location': 'Lokasi & Maps',
    'nav.howToBook': 'Cara Reservasi',
    'nav.faq': 'FAQ',
    'nav.manage': 'Kelola Price List',
    'nav.selected': 'Dipilih',
    'nav.bookWhatsApp': 'Reservasi WhatsApp',
    'theme.toggle': 'Ganti Tema',
    'theme.dark': 'Mode Gelap',
    'theme.light': 'Mode Terang',

    // Hero
    'hero.kicker': 'Deara Beauty Salon · Official Price List',
    'hero.title': 'Sentuhan penataan rambut profesional & perawatan rambut impian Anda.',
    'hero.desc': 'Dari Signature Haircut by Owner (Cabang Maguwo), Hair Treatment berprotein, L’Oreal Smoothing, hingga Fashion Colouring berdimensi dengan harga transparan resmi.',
    'hero.btnPrice': 'Lihat Katalog & Price List',
    'hero.btnWhatsApp': 'Konsultasi & Reservasi via WhatsApp',
    'hero.reassurance': 'Pilih layanan favorit Anda dan dapatkan konfirmasi jadwal instan dari tim Deara.',
    'hero.privateSanctuary': 'Deara Private Sanctuary',
    'hero.privateSanctuaryDesc': 'Ruang perawatan privat, nyaman, dan beraroma aromaterapi menenangkan.',
    'hero.proof1Title': '100% Steril & Higienis',
    'hero.proof1Desc': 'Alat medis desinfeksi UV & pemakaian disposable sekali pakai.',
    'hero.proof2Title': 'Terapis Bersertifikasi',
    'hero.proof2Desc': 'Penanganan ramah, berpengalaman, dan konsultasi kebutuhan rambut.',
    'hero.proof3Title': 'Produk Premium Berkualitas',
    'hero.proof3Desc': 'Formula aktif teruji klinis ramah kulit kepala sensitif.',

    // Services Catalog
    'services.kicker': 'Deara Beauty Salon · Official Price List',
    'services.title': 'Daftar Layanan & Treatment Rambut',
    'services.desc': 'Price list resmi Deara Beauty Salon. Pilih model potongan rambut, paket perawatan, hair spa, hingga pewarnaan fashion dengan pilihan panjang rambut (S, M, L, XL).',
    'services.manageBtn': 'Kelola & Edit Price List',
    'services.noticeOwner': 'Haircut by Owner: Tersedia khusus di Cabang Maguwo (Bebas request model rambut).',
    'services.noticeExtra': 'Catatan Tambahan: Extra charge untuk rambut tebal, panjang, & extensions. Over charge colouring (bleaching/mix warna/bekas hitam) mulai Rp 80.000.',
    'services.searchPlaceholder': 'Cari layanan (contoh: owner, creambath, balayage, smoothing)...',
    'services.quickSearch': 'Pencarian Populer:',
    'services.resultsCount': 'Menampilkan {count} layanan untuk pencarian',
    'services.clearSearch': 'Hapus pencarian',
    'services.sort': 'Urutkan:',
    'services.sortFeatured': 'Rekomendasi / Populer',
    'services.sortAsc': 'Harga Terendah',
    'services.sortDesc': 'Harga Tertinggi',
    'services.notFoundTitle': 'Layanan Tidak Ditemukan',
    'services.notFoundDesc': 'Tidak ada layanan yang cocok dengan kata kunci pencarian Anda.',
    'services.resetFilter': 'Reset Filter',
    'services.hairLength': 'Pilih Panjang Rambut:',
    'services.included': 'Termasuk dalam sesi:',
    'services.bookOnWa': 'Pesan di WA',
    'services.choose': 'Pilih',
    'services.chosen': 'Terpilih',
    'services.favorite': 'Favorit',
    'services.durationLabel': 'Estimasi Waktu',
    'services.durationTooltip': 'Estimasi durasi pengerjaan',
    'services.tabAll': 'Semua Layanan',
    'services.tabHairStyling': 'Hair Styling',
    'services.tabTreatment': 'Treatment',
    'services.tabSmoothing': 'Smoothing',
    'services.tabColouring': 'Colouring',
    'services.categoryFilterTitle': 'Kategori Layanan:',

    // Estimator
    'estimator.title': 'Estimasi Reservasi Anda',
    'estimator.emptyTitle': 'Belum ada layanan yang dipilih',
    'estimator.emptyDesc': 'Klik tombol + Pilih pada kartu price list untuk menghitung total dan reservasi sekaligus.',
    'estimator.seePrice': 'Lihat Price List',
    'estimator.countLabel': 'Layanan Dipilih',
    'estimator.removeAll': 'Hapus Semua',
    'estimator.total': 'Total Biaya',
    'estimator.clientInfo': 'Lengkapi Data Pemesan (Opsional)',
    'estimator.clientName': 'Nama Lengkap Anda',
    'estimator.clientNamePh': 'Contoh: Sarah / Amanda',
    'estimator.date': 'Rencana Tanggal',
    'estimator.datePh': 'Contoh: Sabtu, 15 Okt',
    'estimator.time': 'Pilihan Jam',
    'estimator.timePh': 'Contoh: 14.00 WIB',
    'estimator.notes': 'Catatan Tambahan',
    'estimator.notesPh': 'Contoh: Rambut tebal / ada bekas bleaching',
    'estimator.sendWhatsApp': 'Kirim Reservasi ke WhatsApp',
    'estimator.directChat': 'Chat Langsung WhatsApp Tanpa Pilih',
    'estimator.disclaimer': 'Pesan terformat otomatis dikirimkan ke nomor resmi Deara (+62 851-4839-4233).',

    // Studio Ambiance
    'ambiance.kicker': 'Sanctuary & Ambiance',
    'ambiance.title': 'Pengalaman Perawatan Eksklusif & Tenang',
    'ambiance.desc': 'Setiap sudut Deara dirancang khusus untuk kenyamanan privasi Anda. Nikmati atmosfer salon yang hangat, higienis, dan menenangkan pikiran dari kepenatan harian.',
    'ambiance.card1Title': 'Konsultasi Personal Sebelum Setiap Sesi',
    'ambiance.card1Desc': 'Kami memahami bahwa setiap tekstur dan kondisi rambut memiliki kebutuhan khusus. Stylist kami meluangkan waktu mendiskusikan model rambut impian dan perawatan yang paling cocok.',
    'ambiance.card1Tag': 'Ruang Konsultasi & Lounge Privat',
    'ambiance.card1F1': 'Pendekatan Individual',
    'ambiance.card1F2': 'Teh Herbal Selamat Datang',
    'ambiance.card2Title': 'Standar Produk Terpilih & Keamanan Teruji',
    'ambiance.card2Desc': 'Hanya menggunakan formula terpercaya (Makarizo, L’Oreal Professionnel, dll) yang aman dan menutrisi batang rambut agar tetap kuat berkilau.',
    'ambiance.card2Tag': 'Bahan Aktif Premium & Formula Teruji',
    'ambiance.card2F1': 'Sterilisasi Alat UV Medical',
    'ambiance.card2F2': 'Hasil Natural & Tahan Lama',

    // Location & Social
    'location.kicker': 'Lokasi & Media Sosial',
    'location.title': 'Kunjungi Deara & Temukan Inspirasi Rambut Anda',
    'location.desc': 'Temukan 2 cabang resmi Deara di Yogyakarta (Cabang 1 Maguwo di Sleman & Cabang 2 Pakualaman di Pusat Kota Yogyakarta) dengan Google Maps dan ikuti konten gaya rambut serta promo terbaru.',
    'location.branchesCount': '2 Cabang Resmi di Yogyakarta',
    'location.switchBranch': 'Pilih Cabang',
    'location.branch1Short': 'Cabang 1 (Maguwo)',
    'location.branch2Short': 'Cabang 2 (Pakualaman)',
    'location.branch1Tag': 'Sleman (Jl. Raya Tajem)',
    'location.branch2Tag': 'Kota Jogja (Pakualaman)',
    'location.branchOwnerSpecial': 'Tersedia Haircut by Owner khusus di Cabang Maguwo',
    'location.branchPakualamanSpecial': 'Suasana privat & tenang di pusat Kota Yogyakarta',
    'location.mapCardTitle': 'Google Maps Lokasi Salon',
    'location.openInApp': 'Buka di Aplikasi Maps',
    'location.addressTitle': 'Alamat Lengkap Salon',
    'location.copyBtn': 'Salin Alamat',
    'location.copied': 'Alamat Tersalin!',
    'location.hours': 'Cabang 1: 10.00 - 20.00 WIB · Cabang 2: 09.00 - 19.00 WIB',
    'location.parking': 'Akses mudah dengan area parkir kendaraan nyaman',
    'location.maguwo': 'Tersedia Haircut by Owner khusus di Cabang Maguwo',
    'location.directionsBtn': 'Petunjuk Arah Google Maps',
    'location.tiktokBadge': 'Video & Tren',
    'location.tiktokDesc': 'Tonton video transformasi gaya rambut, proses balayage, tutorial blow dry, hingga ulasan pelanggan langsung di feed TikTok kami.',
    'location.tiktokBtn': 'Buka TikTok @deara_beautysalon',
    'location.igBadge': 'Galeri Foto',
    'location.igDesc': 'Katalog visual beresolusi tinggi, hasil karya Haircut by Owner, promo eksklusif bulanan, dan jadwal ketersediaan slot terkini.',
    'location.igBtn': 'Follow IG @deara_beautysalon',
    'location.waBadge': 'Chat Cepat',
    'location.waDesc': 'Konsultasi pemilihan gaya rambut atau booking slot perawatan langsung terhubung dengan admin resmi Deara Beauty Salon.',
    'location.waBtn': 'Chat Langsung WhatsApp',
    'estimate.selectBranch': 'Pilih Cabang Kunjungan',
    'estimate.branch1': 'Deara Cabang 1 - Maguwo (Jl. Raya Tajem)',
    'estimate.branch2': 'Deara Cabang 2 - Pakualaman (Jl. Masjid No.10)',

    // How to book
    'howToBook.kicker': 'Alur Reservasi Cepat',
    'howToBook.title': '3 Langkah Mudah Reservasi',
    'howToBook.desc': 'Tanpa formulir rumit atau proses berbelit. Cukup beberapa ketukan langsung via WhatsApp.',
    'howToBook.s1Title': 'Pilih Layanan & Paket',
    'howToBook.s1Desc': 'Eksplorasi price list lengkap di atas. Anda bisa memilih 1 layanan atau beberapa layanan sekaligus menggunakan fitur estimasi.',
    'howToBook.s2Title': 'Kirim Chat WhatsApp',
    'howToBook.s2Desc': 'Klik tombol reservasi. Format pesan terisi otomatis sehingga Anda cukup mengirimkan pesan ke nomor resmi Deara 0851-4839-4233.',
    'howToBook.s3Title': 'Konfirmasi Jadwal',
    'howToBook.s3Desc': 'Admin Deara akan membalas ketersediaan jam dan mengunci slot khusus Anda. Datang tepat waktu dan rasakan relaksasi maksimal.',
    'howToBook.bannerTitle': 'Ingin berkonsultasi mengenai model rambut Anda terlebih dahulu?',
    'howToBook.bannerDesc': 'Admin kami dengan senang hati membantu merekomendasikan treatment dan potongan paling pas untuk bentuk wajah Anda.',
    'howToBook.bannerBtn': 'Chat WhatsApp Sekarang',

    // FAQ
    'faq.kicker': 'Informasi & Bantuan',
    'faq.title': 'Pertanyaan yang Sering Diajukan',
    'faq.desc': 'Ketahui lebih banyak seputar etika reservasi, layanan, dan kenyamanan Anda di Deara.',

    // Footer
    'footer.desc': 'Salon kecantikan dan perawatan rambut profesional dengan produk berkualitas, stylist berpengalaman, dan penanganan eksklusif.',
    'footer.navTitle': 'Navigasi Cepat',
    'footer.hoursTitle': 'Jam Operasional & Reservasi',
    'footer.everyDay': 'Buka Setiap Hari (Senin - Minggu)',
    'footer.hoursDetail': 'Cabang 1 (Maguwo): 10.00 – 20.00 WIB · Cabang 2 (Pakualaman): 09.00 – 19.00 WIB',
    'footer.rights': 'Deara Beauty Salon. Seluruh hak cipta dilindungi.',
    'footer.madeWith': 'Dibuat dengan dedikasi untuk keindahan rambut Anda',

    // Manager
    'manager.kicker': 'Pusat Data & Katalog',
    'manager.title': 'Kelola & Input Data Price List',
    'manager.tabVisual': 'Input & Edit Visual',
    'manager.tabJson': 'Impor / Ekspor JSON Price List',
    'manager.close': 'Tutup',
  },
  en: {
    // Nav
    'nav.services': 'Services & Prices',
    'nav.ambiance': 'Studio Ambiance',
    'nav.location': 'Location & Maps',
    'nav.howToBook': 'How to Book',
    'nav.faq': 'FAQ',
    'nav.manage': 'Manage Price List',
    'nav.selected': 'Selected',
    'nav.bookWhatsApp': 'Book via WhatsApp',
    'theme.toggle': 'Toggle Theme',
    'theme.dark': 'Dark Mode',
    'theme.light': 'Light Mode',

    // Hero
    'hero.kicker': 'Deara Beauty Salon · Official Price List',
    'hero.title': 'Professional hair styling & your dream hair treatments.',
    'hero.desc': 'From Signature Haircut by Owner (Maguwo Branch), protein hair treatments, L’Oreal Smoothing, to dimensional Fashion Colouring with transparent pricing.',
    'hero.btnPrice': 'Explore Catalog & Price List',
    'hero.btnWhatsApp': 'Consult & Reserve via WhatsApp',
    'hero.reassurance': 'Pick your favorite service and get instant schedule confirmation from the Deara team.',
    'hero.privateSanctuary': 'Deara Private Sanctuary',
    'hero.privateSanctuaryDesc': 'Private, serene care space infused with calming aromatherapy.',
    'hero.proof1Title': '100% Sterile & Hygienic',
    'hero.proof1Desc': 'Medical UV disinfection & single-use disposable tools.',
    'hero.proof2Title': 'Certified Stylists',
    'hero.proof2Desc': 'Friendly, experienced care tailored to your hair needs.',
    'hero.proof3Title': 'Premium Quality Products',
    'hero.proof3Desc': 'Clinically verified active formulas safe for sensitive scalp.',

    // Services Catalog
    'services.kicker': 'Deara Beauty Salon · Official Price List',
    'services.title': 'Hair Services & Treatment Catalog',
    'services.desc': 'Official Deara Beauty Salon price list. Select haircuts, pampering packages, hair spa, or fashion colouring with hair length options (S, M, L, XL).',
    'services.manageBtn': 'Manage & Edit Price List',
    'services.noticeOwner': 'Haircut by Owner: Available exclusively at Maguwo Branch (Free request of any hairstyle reference).',
    'services.noticeExtra': 'Additional Notes: Extra charge for thick, long, & extension hair. Colouring over charge (bleaching/mix colour/black base) starts from Rp 80,000.',
    'services.searchPlaceholder': 'Search services (e.g. owner, creambath, balayage, smoothing)...',
    'services.quickSearch': 'Popular Searches:',
    'services.resultsCount': 'Showing {count} services matching',
    'services.clearSearch': 'Clear search',
    'services.sort': 'Sort by:',
    'services.sortFeatured': 'Recommended / Popular',
    'services.sortAsc': 'Lowest Price',
    'services.sortDesc': 'Highest Price',
    'services.notFoundTitle': 'No Services Found',
    'services.notFoundDesc': 'No service matches your search keywords.',
    'services.resetFilter': 'Reset Filter',
    'services.hairLength': 'Select Hair Length:',
    'services.included': 'Included in this session:',
    'services.bookOnWa': 'Book on WA',
    'services.choose': 'Select',
    'services.chosen': 'Selected',
    'services.favorite': 'Favorite',
    'services.durationLabel': 'Est. Duration',
    'services.durationTooltip': 'Estimated service duration',
    'services.tabAll': 'All Services',
    'services.tabHairStyling': 'Hair Styling',
    'services.tabTreatment': 'Treatment',
    'services.tabSmoothing': 'Smoothing',
    'services.tabColouring': 'Colouring',
    'services.categoryFilterTitle': 'Category Filter:',

    // Estimator
    'estimator.title': 'Your Reservation Estimate',
    'estimator.emptyTitle': 'No services selected yet',
    'estimator.emptyDesc': 'Click the + Select button on any price card to calculate total and reserve simultaneously.',
    'estimator.seePrice': 'View Price List',
    'estimator.countLabel': 'Services Selected',
    'estimator.removeAll': 'Remove All',
    'estimator.total': 'Total Cost',
    'estimator.clientInfo': 'Client Details (Optional)',
    'estimator.clientName': 'Your Full Name',
    'estimator.clientNamePh': 'E.g., Sarah / Amanda',
    'estimator.date': 'Preferred Date',
    'estimator.datePh': 'E.g., Saturday, Oct 15',
    'estimator.time': 'Preferred Time',
    'estimator.timePh': 'E.g., 2:00 PM',
    'estimator.notes': 'Additional Notes',
    'estimator.notesPh': 'E.g., Thick hair / past bleaching history',
    'estimator.sendWhatsApp': 'Send Reservation to WhatsApp',
    'estimator.directChat': 'Direct WhatsApp Chat Without Selection',
    'estimator.disclaimer': 'Formatted reservation inquiry is sent directly to Deara (+62 851-4839-4233).',

    // Studio Ambiance
    'ambiance.kicker': 'Sanctuary & Ambiance',
    'ambiance.title': 'Exclusive & Peaceful Treatment Experience',
    'ambiance.desc': 'Every corner of Deara is curated for your personal comfort. Enjoy a warm, hygienic, and relaxing salon ambiance away from daily hustle.',
    'ambiance.card1Title': 'Personal Consultation Before Every Session',
    'ambiance.card1Desc': 'We recognize that every hair texture has unique demands. Our stylists take time to discuss your vision and recommended care.',
    'ambiance.card1Tag': 'Consultation & Private Lounge',
    'ambiance.card1F1': 'Individual Approach',
    'ambiance.card1F2': 'Complimentary Herbal Welcome Tea',
    'ambiance.card2Title': 'Selected Quality Standards & Tested Safety',
    'ambiance.card2Desc': 'Using trusted formulas (Makarizo, L’Oreal Professionnel, etc.) that nourish the hair cuticle for lasting strength and shine.',
    'ambiance.card2Tag': 'Premium Active Ingredients',
    'ambiance.card2F1': 'Medical UV Tool Sterilization',
    'ambiance.card2F2': 'Natural & Long-Lasting Finish',

    // Location & Social
    'location.kicker': 'Location & Social Media',
    'location.title': 'Visit Deara & Discover Hair Inspiration',
    'location.desc': 'Discover Deara’s 2 official salon branches in Yogyakarta (Branch 1 Maguwo in Sleman & Branch 2 Pakualaman in Central Yogyakarta) on Google Maps and follow trending styles and promos.',
    'location.branchesCount': '2 Official Branches in Yogyakarta',
    'location.switchBranch': 'Select Branch',
    'location.branch1Short': 'Branch 1 (Maguwo)',
    'location.branch2Short': 'Branch 2 (Pakualaman)',
    'location.branch1Tag': 'Sleman (Jl. Raya Tajem)',
    'location.branch2Tag': 'Central Jogja (Pakualaman)',
    'location.branchOwnerSpecial': 'Haircut by Owner available exclusively at Maguwo Branch',
    'location.branchPakualamanSpecial': 'Private and peaceful sanctuary in central Yogyakarta',
    'location.mapCardTitle': 'Google Maps Salon Location',
    'location.openInApp': 'Open in Google Maps App',
    'location.addressTitle': 'Official Salon Address',
    'location.copyBtn': 'Copy Address',
    'location.copied': 'Address Copied!',
    'location.hours': 'Branch 1: 10:00 AM - 08:00 PM · Branch 2: 09:00 AM - 07:00 PM WIB',
    'location.parking': 'Accessible location with dedicated customer parking',
    'location.maguwo': 'Haircut by Owner available exclusively at Maguwo Branch',
    'location.directionsBtn': 'Google Maps Directions',
    'location.tiktokBadge': 'Videos & Trends',
    'location.tiktokDesc': 'Watch hair transformation clips, balayage tutorials, styling blows, and real customer reviews on our TikTok feed.',
    'location.tiktokBtn': 'Open TikTok @deara_beautysalon',
    'location.igBadge': 'Photo Gallery',
    'location.igDesc': 'High-resolution hair portfolio, Haircut by Owner lookbooks, monthly promo alerts, and daily slot updates.',
    'location.igBtn': 'Follow IG @deara_beautysalon',
    'location.waBadge': 'Fast Chat',
    'location.waDesc': 'Hair consultation or service booking directly connected with official Deara Beauty Salon admin.',
    'location.waBtn': 'Chat on WhatsApp',
    'estimate.selectBranch': 'Select Preferred Branch',
    'estimate.branch1': 'Deara Branch 1 - Maguwo (Jl. Raya Tajem)',
    'estimate.branch2': 'Deara Branch 2 - Pakualaman (Jl. Masjid No.10)',

    // How to book
    'howToBook.kicker': 'Quick Booking Process',
    'howToBook.title': '3 Easy Steps to Reserve',
    'howToBook.desc': 'No tedious forms or long waiting. Just a few taps straight to WhatsApp.',
    'howToBook.s1Title': 'Select Services & Packages',
    'howToBook.s1Desc': 'Browse the complete price list. Pick a single service or combine multiple treatments with the estimate tool.',
    'howToBook.s2Title': 'Send WhatsApp Message',
    'howToBook.s2Desc': 'Tap the reservation button. The message is pre-filled so you can instantly text our official number 0851-4839-4233.',
    'howToBook.s3Title': 'Confirm Your Slot',
    'howToBook.s3Desc': 'Our team confirms availability and reserves your chair. Arrive on time and enjoy total pampering.',
    'howToBook.bannerTitle': 'Want to consult about your hairstyle first?',
    'howToBook.bannerDesc': 'Our team is happy to recommend the best cut and treatment suited to your face shape.',
    'howToBook.bannerBtn': 'Chat on WhatsApp Now',

    // FAQ
    'faq.kicker': 'Help & Information',
    'faq.title': 'Frequently Asked Questions',
    'faq.desc': 'Learn more about booking policies, treatments, and your salon experience at Deara.',

    // Footer
    'footer.desc': 'Professional hair care and beauty salon with trusted products, experienced stylists, and tailored care.',
    'footer.navTitle': 'Quick Links',
    'footer.hoursTitle': 'Operating Hours & Bookings',
    'footer.everyDay': 'Open Everyday (Monday - Sunday)',
    'footer.hoursDetail': 'Branch 1 (Maguwo): 10:00 AM – 08:00 PM · Branch 2 (Pakualaman): 09:00 AM – 07:00 PM WIB',
    'footer.rights': 'Deara Beauty Salon. All rights reserved.',
    'footer.madeWith': 'Crafted with passion for your hair beauty',

    // Manager
    'manager.kicker': 'Data & Catalog Center',
    'manager.title': 'Manage & Input Price List Data',
    'manager.tabVisual': 'Visual Input & Edit',
    'manager.tabJson': 'Import / Export JSON Price List',
    'manager.close': 'Close',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'id',
  setLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('deara_app_lang');
      if (saved === 'en' || saved === 'id') return saved;
    } catch {
      // ignore
    }
    return 'id';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('deara_app_lang', newLang);
      document.documentElement.lang = newLang;
      document.title = newLang === 'en'
        ? 'Deara Beauty Salon · Official Services & Price List'
        : 'Deara - Katalog Jasa & Price List Reservasi';
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'en'
      ? 'Deara Beauty Salon · Official Services & Price List'
      : 'Deara - Katalog Jasa & Price List Reservasi';
  }, [lang]);

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['id']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
