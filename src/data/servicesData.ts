export type HairSize = 'S' | 'M' | 'L' | 'XL';

export interface HairSizePrice {
  size: HairSize;
  sizeLabel: string;
  price: number;
  formattedPrice: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'styling' | 'owner' | 'package' | 'treatment-perm' | 'colouring';
  categoryLabel: string;
  price: number; // base or selected price
  formattedPrice: string;
  duration?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  notes?: string;
  sizePrices?: HairSizePrice[]; // If available in S, M, L, XL
  selectedSize?: HairSize;
  badge?: string;
}

export interface ServiceCategory {
  id: string;
  label: string;
}

export const CATEGORIES: ServiceCategory[] = [
  { id: 'all', label: 'Semua Layanan' },
  { id: 'styling', label: 'Hair Styling & Cut Team' },
  { id: 'owner', label: 'Haircut by Owner (Maguwo)' },
  { id: 'package', label: 'Paket Hemat Hair & Treatment' },
  { id: 'treatment-perm', label: 'Hair Treatment & Perm' },
  { id: 'colouring', label: 'Hair Colouring (Soft & Fashion)' },
];

export const INITIAL_SERVICES: ServiceItem[] = [
  // ================= PAGE 1: HAIR STYLING & CUT BY TEAM =================
  {
    id: 'hs-1',
    name: 'Hair Cut by Team',
    category: 'styling',
    categoryLabel: 'Hair Styling & Cut Team',
    price: 35000,
    formattedPrice: 'Rp 35.000',
    duration: '30-45 Menit',
    description: 'Potong rambut presisi oleh tim stylist profesional Deara sesuai dengan model potongan rambut yang Anda inginkan.',
    features: [
      'Konsultasi model rambut & bentuk wajah',
      'Pemotongan presisi oleh stylist tim Deara',
      'Finishing rapi & styling dasar'
    ],
    isPopular: true
  },
  {
    id: 'hs-2',
    name: 'Hair Cut Poni',
    category: 'styling',
    categoryLabel: 'Hair Styling & Cut Team',
    price: 15000,
    formattedPrice: 'Rp 15.000',
    duration: '15 Menit',
    description: 'Rapikan dan bentuk poni (curtain bangs, see-through bangs, blunt bangs) agar wajah terlihat lebih segar.',
    features: [
      'Request model poni kekinian',
      'Pengerjaan cepat & presisi'
    ]
  },
  {
    id: 'hs-3',
    name: 'Wash & Blow Dry',
    category: 'styling',
    categoryLabel: 'Hair Styling & Cut Team',
    price: 20000,
    formattedPrice: 'Rp 20.000',
    duration: '30 Menit',
    description: 'Cuci rambut bersih menyegarkan dilanjutkan pengeringan blow dry natural ber-volume.',
    features: [
      'Cuci rambut dengan shampoo berkualitas',
      'Pijat ringan kulit kepala',
      'Blow dry natural bouncy volume'
    ],
    notes: '*Extra charge untuk rambut tebal, panjang, atau extensions'
  },
  {
    id: 'hs-4',
    name: 'Wash & Catok (Blow / Straight)',
    category: 'styling',
    categoryLabel: 'Hair Styling & Cut Team',
    price: 35000,
    formattedPrice: 'Rp 35.000',
    duration: '45 Menit',
    description: 'Cuci rambut segar dan penataan catok lurus berkilau atau blow styling sesuai keinginan.',
    features: [
      'Cuci rambut higienis & hair tonic',
      'Pilihan styling: Lurus halus (Straight) atau Blow bervolume',
      'Aplikasi heat protectant vitamin'
    ],
    isPopular: true,
    notes: '*Extra charge untuk rambut tebal, panjang, atau extensions'
  },
  {
    id: 'hs-5',
    name: 'Wash & Curly Wave',
    category: 'styling',
    categoryLabel: 'Hair Styling & Cut Team',
    price: 45000,
    formattedPrice: 'Rp 45.000',
    duration: '45-60 Menit',
    description: 'Cuci rambut dan penataan gelombang curly / korean wavy look yang elegan dan tahan lama.',
    features: [
      'Cuci rambut & vitamin rambut',
      'Styling curly wave anggun & bertekstur',
      'Cocok untuk hangout, wisuda, atau event spesial'
    ],
    notes: '*Extra charge untuk rambut tebal, panjang, atau extensions'
  },
  {
    id: 'hs-6',
    name: 'Catok Only',
    category: 'styling',
    categoryLabel: 'Hair Styling & Cut Team',
    price: 25000,
    formattedPrice: 'Rp 25.000',
    duration: '25 Menit',
    description: 'Penataan catok cepat tanpa cuci rambut untuk persiapan meeting, foto, atau jalan-jalan.',
    features: [
      'Catok lurus rapi atau wave cepat',
      'Finishing serum anti-frizz'
    ],
    notes: '*Extra charge untuk rambut tebal, panjang, atau extensions'
  },
  {
    id: 'hs-7',
    name: 'Rapikan Alis',
    category: 'styling',
    categoryLabel: 'Hair Styling & Cut Team',
    price: 15000,
    formattedPrice: 'Rp 15.000',
    duration: '15 Menit',
    description: 'Merapikan bentuk alis dengan razor steril sesuai karakter dan proporsi bentuk wajah.',
    features: [
      'Alis rapi, simetris, dan natural',
      'Pisau cukur steril sekali pakai'
    ]
  },
  {
    id: 'hs-8',
    name: 'Hairdo / Braiding',
    category: 'styling',
    categoryLabel: 'Hair Styling & Cut Team',
    price: 25000,
    formattedPrice: 'Start Rp 25.000',
    duration: '30-45 Menit',
    description: 'Penataan rambut kepang artistik (braiding) atau sanggul modern simpel untuk acara pesta, wisuda, dan pre-wedding.',
    features: [
      'Pilihan variasi kepang kreatif',
      'Tahan lama dan nyaman seharian',
      'Opsional Hairspray (+ Rp 10.000)'
    ]
  },

  // ================= PAGE 1: HAIRCUT BY OWNER (MAGUWO) =================
  {
    id: 'ho-1',
    name: 'Signature Haircut by Owner',
    category: 'owner',
    categoryLabel: 'Haircut by Owner (Maguwo)',
    price: 50000,
    formattedPrice: 'Rp 50.000',
    duration: '45 Menit',
    description: 'Potong rambut eksklusif langsung ditangani oleh Owner Deara. Bebas request model layer, wolf cut, butterfly haircut, bob, dll.',
    features: [
      'Handled directly by Owner Deara',
      'Free request referensi gaya rambut',
      'Personal hair texture analysis',
      'Tersedia di Cabang Maguwo'
    ],
    isPopular: true,
    badge: 'Owner Signature'
  },
  {
    id: 'ho-2',
    name: 'Haircut Poni by Owner',
    category: 'owner',
    categoryLabel: 'Haircut by Owner (Maguwo)',
    price: 25000,
    formattedPrice: 'Rp 25.000',
    duration: '20 Menit',
    description: 'Pemotongan poni detail langsung oleh Owner untuk bingkai wajah yang paling proporsional.',
    features: [
      'Free request model poni (korean fringe, curtain, dll)',
      'Teknik gunting presisi Owner',
      'Tersedia di Cabang Maguwo'
    ],
    badge: 'Cabang Maguwo'
  },
  {
    id: 'ho-3',
    name: 'Haircut + Cuci by Owner',
    category: 'owner',
    categoryLabel: 'Haircut by Owner (Maguwo)',
    price: 75000,
    formattedPrice: 'Rp 75.000',
    duration: '50 Menit',
    description: 'Paket potong rambut oleh Owner dipadukan cuci rambut relaksasi dengan Free Tonic & Vitamin rambut berkualitas.',
    features: [
      'Potong rambut langsung oleh Owner',
      'Cuci rambut bersih & pijat kepala rileks',
      'Free Hair Tonic & Vitamin nourishing',
      'Tersedia di Cabang Maguwo'
    ],
    isPopular: true,
    badge: 'Favorite Owner'
  },
  {
    id: 'ho-4',
    name: 'Haircut + Cuci + Catok/Blow by Owner',
    category: 'owner',
    categoryLabel: 'Haircut by Owner (Maguwo)',
    price: 95000,
    formattedPrice: 'Rp 95.000',
    duration: '60-75 Menit',
    description: 'Pengalaman potong rambut paripurna oleh Owner: haircut presisi, cuci rambut segar, styling catok/blow profesional, plus Free Tonic & Vitamin.',
    features: [
      'Full treatment langsung oleh Owner',
      'Haircut + Cuci rambut relaksasi',
      'Finishing styling Catok / Blow bervolume',
      'Free Hair Tonic & Vitamin',
      'Tersedia di Cabang Maguwo'
    ],
    isPopular: true,
    badge: 'Best Value Owner'
  },

  // ================= PAGE 2: HAIR PACKAGE & TREATMENT PACKAGES =================
  {
    id: 'pkg-1',
    name: 'Haircut Packages A',
    category: 'package',
    categoryLabel: 'Paket Hemat Hair & Treatment',
    price: 50000,
    formattedPrice: 'Rp 50.000',
    duration: '45 Menit',
    description: 'Paket bundling potong rambut dan cuci rambut oleh tim stylist Deara dengan bonus tonic & vitamin.',
    features: [
      'Haircut by Team',
      'Cuci rambut menyegarkan',
      'Free Tonic & Vitamin rambut'
    ],
    isPopular: true,
    badge: 'Handle by Team'
  },
  {
    id: 'pkg-2',
    name: 'Haircut Packages B',
    category: 'package',
    categoryLabel: 'Paket Hemat Hair & Treatment',
    price: 75000,
    formattedPrice: 'Rp 75.000',
    duration: '60 Menit',
    description: 'Paket potong rambut lengkap dengan cuci rambut dan styling catok/blow berkilau.',
    features: [
      'Haircut by Team',
      'Cuci rambut higienis',
      'Catok / Blow styling natural',
      'Free Tonic & Vitamin rambut'
    ],
    isPopular: true,
    badge: 'Handle by Team'
  },
  {
    id: 'pkg-3',
    name: 'Haircut Packages C',
    category: 'package',
    categoryLabel: 'Paket Hemat Hair & Treatment',
    price: 120000,
    formattedPrice: 'Rp 120.000',
    duration: '90 Menit',
    description: 'Paket kombinasi mewah potong rambut, creambath menutrisi, dan styling catok/blow.',
    features: [
      'Haircut by Team',
      'Creambath relaksasi kepala & bahu',
      'Catok / Blow styling rapi',
      'Free Tonic & Vitamin rambut'
    ],
    badge: 'Handle by Team'
  },
  {
    id: 'pkg-t-1',
    name: 'Treatment Packages A (Makarizo Creambath)',
    category: 'package',
    categoryLabel: 'Paket Hemat Hair & Treatment',
    price: 135000,
    formattedPrice: 'Rp 135.000',
    duration: '90 Menit',
    description: 'Perawatan rambut sehat menyeluruh dengan krim Makarizo Creambath asli, potong rambut baru, dan styling memukau.',
    features: [
      'Makarizo Creambath nourishing',
      'Hair Cut by Team',
      'Hair Styling profesional',
      'Free Tonic & Vitamin rambut'
    ],
    isPopular: true,
    badge: 'Paket Perawatan A'
  },
  {
    id: 'pkg-t-2',
    name: 'Treatment Packages B (Makarizo Hair Mask)',
    category: 'package',
    categoryLabel: 'Paket Hemat Hair & Treatment',
    price: 145000,
    formattedPrice: 'Rp 145.000',
    duration: '90 Menit',
    description: 'Perbaikan serat rambut rusak dan kering dengan Makarizo Hair Mask intensif, potong rambut, dan styling.',
    features: [
      'Makarizo Hair Mask deep repair',
      'Hair Cut by Team',
      'Hair Styling profesional',
      'Free Tonic & Vitamin rambut'
    ],
    badge: 'Paket Perawatan B'
  },
  {
    id: 'pkg-t-3',
    name: 'Treatment Packages C (Makarizo Hair Spa)',
    category: 'package',
    categoryLabel: 'Paket Hemat Hair & Treatment',
    price: 155000,
    formattedPrice: 'Rp 155.000',
    duration: '100 Menit',
    description: 'Relaksasi total rambut & kulit kepala dengan Makarizo Hair Spa premium, pemotongan rambut, dan styling paripurna.',
    features: [
      'Makarizo Hair Spa luxury formula',
      'Hair Cut by Team',
      'Hair Styling profesional',
      'Free Tonic & Vitamin rambut'
    ],
    isPopular: true,
    badge: 'Paket Perawatan C'
  },

  // ================= PAGE 3: HAIR TREATMENT & PERM =================
  {
    id: 't-1',
    name: 'Creambath',
    category: 'treatment-perm',
    categoryLabel: 'Hair Treatment & Perm',
    price: 50000,
    formattedPrice: 'Rp 50.000 - Rp 80.000',
    duration: '60 Menit',
    description: 'Perawatan creambath tradisional dengan krim bernutrisi dan pijatan relaksasi pada kepala dan pundak.',
    features: [
      'Pijat relaksasi kepala, leher, dan bahu',
      'Menutrisi akar rambut agar tidak mudah rontok',
      'Rambut terasa lembut dan harum'
    ],
    sizePrices: [
      { size: 'S', sizeLabel: 'Rambut Pendek (S)', price: 50000, formattedPrice: 'Rp 50.000' },
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 60000, formattedPrice: 'Rp 60.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 70000, formattedPrice: 'Rp 70.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 80000, formattedPrice: 'Rp 80.000' }
    ]
  },
  {
    id: 't-2',
    name: 'Hair Mask',
    category: 'treatment-perm',
    categoryLabel: 'Hair Treatment & Perm',
    price: 60000,
    formattedPrice: 'Rp 60.000 - Rp 90.000',
    duration: '60 Menit',
    description: 'Masker rambut formulasi intensif untuk mengembalikan kelembapan alami batang rambut yang kering atau sering terkena panas.',
    features: [
      'Nutrisi mendalam ke kutikula rambut',
      'Mengurangi rambut mengembang & bercabang',
      'Termasuk bilas bersih dan pengeringan'
    ],
    sizePrices: [
      { size: 'S', sizeLabel: 'Rambut Pendek (S)', price: 60000, formattedPrice: 'Rp 60.000' },
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 70000, formattedPrice: 'Rp 70.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 80000, formattedPrice: 'Rp 80.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 90000, formattedPrice: 'Rp 90.000' }
    ]
  },
  {
    id: 't-3',
    name: 'Hair Spa',
    category: 'treatment-perm',
    categoryLabel: 'Hair Treatment & Perm',
    price: 75000,
    formattedPrice: 'Rp 75.000 - Rp 105.000',
    duration: '75 Menit',
    description: 'Sensasi spa rambut eksklusif untuk detoksifikasi kulit kepala, melancarkan peredaran darah, serta melembutkan tekstur rambut.',
    features: [
      'Aromaterapi menenangkan selama sesi',
      'Pijat relaksasi mendalam',
      'Melembapkan helai rambut dari pangkal hingga ujung'
    ],
    sizePrices: [
      { size: 'S', sizeLabel: 'Rambut Pendek (S)', price: 75000, formattedPrice: 'Rp 75.000' },
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 85000, formattedPrice: 'Rp 85.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 95000, formattedPrice: 'Rp 95.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 105000, formattedPrice: 'Rp 105.000' }
    ]
  },
  {
    id: 't-4',
    name: 'Keratin Treatment',
    category: 'treatment-perm',
    categoryLabel: 'Hair Treatment & Perm',
    price: 250000,
    formattedPrice: 'Rp 250.000 - Start Rp 550.000',
    duration: '120-150 Menit',
    description: 'Perawatan protein keratin konsentrat tinggi untuk menjinakkan rambut kusut (frizzy), rusak akibat bleaching, dan menjadikannya lurus berkilau alami.',
    features: [
      'Mengunci protein keratin ke inti batang rambut',
      'Rambut auto-lurus natural, halus, dan mudah disisir',
      'Hasil tahan berbulan-bulan dengan perawatan teratur'
    ],
    isPopular: true,
    sizePrices: [
      { size: 'S', sizeLabel: 'Rambut Pendek (S)', price: 250000, formattedPrice: 'Rp 250.000' },
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 350000, formattedPrice: 'Rp 350.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 450000, formattedPrice: 'Rp 450.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 550000, formattedPrice: 'Start Rp 550.000' }
    ]
  },
  {
    id: 't-5',
    name: 'Smoothing Reguler',
    category: 'treatment-perm',
    categoryLabel: 'Hair Treatment & Perm',
    price: 200000,
    formattedPrice: 'Rp 200.000 - Start Rp 500.000',
    duration: '150-180 Menit',
    description: 'Pelurusan rambut formula standar berkualitas untuk hasil lurus rapi, jatuh alami, dan tidak kaku.',
    features: [
      'Proses pelurusan merata oleh tim berpengalaman',
      'Hasil rambut lurus rapi dan tertata setiap saat',
      'Bebas kusut setelah keramas'
    ],
    sizePrices: [
      { size: 'S', sizeLabel: 'Rambut Pendek (S)', price: 200000, formattedPrice: 'Rp 200.000' },
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 300000, formattedPrice: 'Rp 300.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 400000, formattedPrice: 'Rp 400.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 500000, formattedPrice: 'Start Rp 500.000' }
    ]
  },
  {
    id: 't-6',
    name: 'L’Oreal Smoothing',
    category: 'treatment-perm',
    categoryLabel: 'Hair Treatment & Perm',
    price: 450000,
    formattedPrice: 'Rp 450.000 - Start Rp 750.000',
    duration: '180 Menit',
    description: 'Pelurusan rambut premium menggunakan produk original L’Oreal Professionnel X-Tenso untuk hasil lurus sutra lembut dan berkilau mewah.',
    features: [
      'Original L’Oreal Professionnel formula',
      'Rambut ekstra halus seperti sutra dan tidak rusak',
      'Hasil lurus natural dengan elastisitas prima'
    ],
    isPopular: true,
    sizePrices: [
      { size: 'S', sizeLabel: 'Rambut Pendek (S)', price: 450000, formattedPrice: 'Rp 450.000' },
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 550000, formattedPrice: 'Rp 550.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 650000, formattedPrice: 'Rp 650.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 750000, formattedPrice: 'Start Rp 750.000' }
    ]
  },
  {
    id: 'p-1',
    name: 'Blow Perm (Hair Ends Only)',
    category: 'treatment-perm',
    categoryLabel: 'Hair Treatment & Perm',
    price: 300000,
    formattedPrice: 'Rp 300.000',
    duration: '120 Menit',
    description: 'Perm pengeritingan permanen khusus pada ujung rambut (C-Curl / J-Curl) agar rambut selalu terlihat ter-blow rapi tanpa perlu catokan setiap hari.',
    features: [
      'Pengerjaan fokus pada ujung rambut (hair ends)',
      'Tampilan blow in / blow out natural ala Korea',
      'Rambut tampak ber-volume dan mudah ditata'
    ],
    isPopular: true,
    badge: 'Korean Trend'
  },
  {
    id: 'p-2',
    name: 'Down Perm Poni',
    category: 'treatment-perm',
    categoryLabel: 'Hair Treatment & Perm',
    price: 150000,
    formattedPrice: 'Rp 150.000',
    duration: '60 Menit',
    description: 'Menjinakkan poni yang suka mengembang, membandel, atau mencuat agar menempel rapi dan melengkung natural ke dahi.',
    features: [
      'Include Hair Cut Poni',
      'Include Styling Catok / Blow',
      'Poni rapi seharian tanpa lepek'
    ],
    badge: 'Include Cut & Styling'
  },

  // ================= PAGE 4: HAIR COLOURING =================
  {
    id: 'col-1',
    name: 'Cat Uban / Toning',
    category: 'colouring',
    categoryLabel: 'Hair Colouring (Soft & Fashion)',
    price: 80000,
    formattedPrice: 'Rp 80.000 - Start Rp 300.000',
    duration: '90 Menit',
    description: 'Pewarnaan penutup uban merata atau toning penyegar warna rambut kusam agar kembali hitam pekat atau cokelat alami berkilau.',
    features: [
      'Include Tonic & Vitamin rambut',
      'Include Finishing Styling',
      'Menutup uban hingga ke akar dengan rapi'
    ],
    notes: 'Include Tonic, Vitamin, Styling',
    sizePrices: [
      { size: 'S', sizeLabel: 'Rambut Pendek (S)', price: 80000, formattedPrice: 'Rp 80.000' },
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 150000, formattedPrice: 'Rp 150.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 220000, formattedPrice: 'Rp 220.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 300000, formattedPrice: 'Start Rp 300.000' }
    ]
  },
  {
    id: 'col-2',
    name: 'Bleaching / Highlight (Bleaching Only)',
    category: 'colouring',
    categoryLabel: 'Hair Colouring (Soft & Fashion)',
    price: 100000,
    formattedPrice: 'Rp 100.000 - Start Rp 400.000',
    duration: '90-120 Menit',
    description: 'Pengangkatan pigmen gelap rambut secara bertahap atau highlight serat rambut sebelum masuk warna target.',
    features: [
      'Include Tonic, Vitamin & Styling',
      'Formula bleaching minim patah',
      'Gradasi highlight rapi dan bersih'
    ],
    notes: 'Include Tonic, Vitamin, Styling',
    sizePrices: [
      { size: 'S', sizeLabel: 'Rambut Pendek (S)', price: 100000, formattedPrice: 'Rp 100.000' },
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 200000, formattedPrice: 'Rp 200.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 300000, formattedPrice: 'Rp 300.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 400000, formattedPrice: 'Start Rp 400.000' }
    ]
  },
  {
    id: 'col-3',
    name: 'Soft Colour Basic (Non Bleaching)',
    category: 'colouring',
    categoryLabel: 'Hair Colouring (Soft & Fashion)',
    price: 185000,
    formattedPrice: 'Rp 185.000 - Start Rp 440.000',
    duration: '120 Menit',
    description: 'Pewarnaan satu warna merata tanpa proses bleaching (pilihan: dark brown, chocolate, burgundy, ash brown level aman) sehingga rambut tetap sehat lembut.',
    features: [
      'Non Bleaching - rambut tetap sehat',
      'Include Tonic, Vitamin, dan Styling',
      'Pilihan warna kalem, elegan, dan profesional'
    ],
    isPopular: true,
    notes: 'Non Bleaching | Include Tonic, Vitamin, Styling',
    sizePrices: [
      { size: 'S', sizeLabel: 'Rambut Pendek (S)', price: 185000, formattedPrice: 'Rp 185.000' },
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 270000, formattedPrice: 'Rp 270.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 355000, formattedPrice: 'Rp 355.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 440000, formattedPrice: 'Start Rp 440.000' }
    ]
  },
  {
    id: 'col-4',
    name: 'Soft Colour Balayage (Non Bleaching)',
    category: 'colouring',
    categoryLabel: 'Hair Colouring (Soft & Fashion)',
    price: 265000,
    formattedPrice: 'Rp 265.000 - Start Rp 565.000',
    duration: '150 Menit',
    description: 'Teknik gradasi balayage sapuan lembut tanpa bleaching untuk efek dimensi warna mewah dan natural tanpa garis transisi yang kasar.',
    features: [
      'Non Bleaching - aman untuk rambut sensitif',
      'Gradasi dimensi balayage mewah',
      'Include Tonic, Vitamin, dan Styling'
    ],
    isPopular: true,
    notes: 'Non Bleaching | Include Tonic, Vitamin, Styling',
    sizePrices: [
      { size: 'S', sizeLabel: 'Rambut Pendek (S)', price: 265000, formattedPrice: 'Rp 265.000' },
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 365000, formattedPrice: 'Rp 365.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 465000, formattedPrice: 'Rp 465.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 565000, formattedPrice: 'Start Rp 565.000' }
    ]
  },
  {
    id: 'col-5',
    name: 'Peek A Boo / Ombre (Fashion Colour)',
    category: 'colouring',
    categoryLabel: 'Hair Colouring (Soft & Fashion)',
    price: 250000,
    formattedPrice: 'Rp 250.000 - Start Rp 550.000',
    duration: '180 Menit',
    description: 'Pewarnaan fashion tersembunyi (peek a boo di lapisan bawah) atau ombre gradasi ujung rambut. Paket sudah termasuk 2x bleaching dan 1 colour!',
    features: [
      'Include 2x Bleaching + 1 Colour target',
      'Include Tonic, Vitamin, dan Styling',
      'Pilihan warna pastel / vibrant / ash'
    ],
    notes: 'Include 2x Bleaching + 1 Colour, Tonic, Vitamin, Styling',
    sizePrices: [
      { size: 'S', sizeLabel: 'Rambut Pendek (S)', price: 250000, formattedPrice: 'Rp 250.000' },
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 350000, formattedPrice: 'Rp 350.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 450000, formattedPrice: 'Rp 450.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 550000, formattedPrice: 'Start Rp 550.000' }
    ]
  },
  {
    id: 'col-6',
    name: 'Fashion Highlight',
    category: 'colouring',
    categoryLabel: 'Hair Colouring (Soft & Fashion)',
    price: 330000,
    formattedPrice: 'Rp 330.000 - Start Rp 630.000',
    duration: '180 Menit',
    description: 'Highlight helai rambut bertekstur modern dengan warna fashion kontras atau ash tone. Sudah termasuk 2x bleaching dan 1 colour.',
    features: [
      'Include 2x Bleaching + 1 Colour',
      'Include Tonic, Vitamin, dan Styling',
      'Memberi efek volume rambut tebal berdimensi'
    ],
    notes: 'Include 2x Bleaching + 1 Colour, Tonic, Vitamin, Styling',
    sizePrices: [
      { size: 'S', sizeLabel: 'Rambut Pendek (S)', price: 330000, formattedPrice: 'Rp 330.000' },
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 430000, formattedPrice: 'Rp 430.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 530000, formattedPrice: 'Rp 530.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 630000, formattedPrice: 'Start Rp 630.000' }
    ]
  },
  {
    id: 'col-7',
    name: 'Full Bleaching Colour',
    category: 'colouring',
    categoryLabel: 'Hair Colouring (Soft & Fashion)',
    price: 350000,
    formattedPrice: 'Rp 350.000 - Start Rp 950.000',
    duration: '210-240 Menit',
    description: 'Transformasi total seluruh rambut dengan warna fashion memukau (Ash Grey, Platinum Blonde, Rose Gold, Lavender, dll). Paket lengkap 2x bleaching + 1 colour.',
    features: [
      'Include 2x Bleaching + 1 Colour',
      'Include Tonic, Vitamin, dan Styling',
      'Warna cerah, merata, dan pigmen terkunci rapi'
    ],
    isPopular: true,
    notes: 'Include 2x Bleaching + 1 Colour, Tonic, Vitamin, Styling',
    sizePrices: [
      { size: 'S', sizeLabel: 'Rambut Pendek (S)', price: 350000, formattedPrice: 'Rp 350.000' },
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 550000, formattedPrice: 'Rp 550.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 750000, formattedPrice: 'Rp 750.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 950000, formattedPrice: 'Start Rp 950.000' }
    ]
  },
  {
    id: 'col-8',
    name: 'Fashion Balayage',
    category: 'colouring',
    categoryLabel: 'Hair Colouring (Soft & Fashion)',
    price: 450000,
    formattedPrice: 'Rp 450.000 - Start Rp 750.000',
    duration: '210 Menit',
    description: 'Pewarnaan balayage tingkat tinggi dengan gradasi sapuan kuas multidimensi menggunakan warna-warna fashion trendy. Termasuk 2x bleaching dan 1 colour.',
    features: [
      'Include 2x Bleaching + 1 Colour',
      'Include Tonic, Vitamin, dan Styling',
      'Tampilan rambut layaknya model runway internasional'
    ],
    isPopular: true,
    notes: 'Include 2x Bleaching + 1 Colour | Tersedia ukuran M, L, XL',
    sizePrices: [
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 450000, formattedPrice: 'Rp 450.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 600000, formattedPrice: 'Rp 600.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 750000, formattedPrice: 'Start Rp 750.000' }
    ]
  },
  {
    id: 'col-9',
    name: 'Fashion Airtouch',
    category: 'colouring',
    categoryLabel: 'Hair Colouring (Soft & Fashion)',
    price: 550000,
    formattedPrice: 'Rp 550.000 - Start Rp 950.000',
    duration: '240 Menit',
    description: 'Teknologi pewarnaan premium paling mutakhir dengan pemisahan helai rambut menggunakan hembusan angin hair dryer. Hasil transisi warna terhalus tanpa garis batas.',
    features: [
      'Teknik Airtouch paling presisi & seamless',
      'Include 2x Bleaching + 1 Colour',
      'Include Tonic, Vitamin, dan Styling',
      'Transisi warna mulus tanpa bercak garis'
    ],
    isPopular: true,
    badge: 'Premium Technique',
    notes: 'Include 2x Bleaching + 1 Colour | Tersedia ukuran M, L, XL',
    sizePrices: [
      { size: 'M', sizeLabel: 'Rambut Sedang (M)', price: 550000, formattedPrice: 'Rp 550.000' },
      { size: 'L', sizeLabel: 'Rambut Panjang (L)', price: 750000, formattedPrice: 'Rp 750.000' },
      { size: 'XL', sizeLabel: 'Rambut Sangat Panjang (XL)', price: 950000, formattedPrice: 'Start Rp 950.000' }
    ]
  }
];

export interface BranchInfo {
  id: 'maguwo' | 'pakualaman';
  number: number;
  badge: string;
  name: string;
  shortName: string;
  city: string;
  address: string;
  mapsUrl: string;
  embedMapsUrl: string;
  openingHours: string;
  openingHoursEn: string;
  features: string[];
}

export const SALON_BRANCHES: BranchInfo[] = [
  {
    id: 'maguwo',
    number: 1,
    badge: 'Cabang ke 1',
    name: 'Deara Beauty Salon Cabang Maguwo - Cabang ke 1',
    shortName: 'Cabang Maguwo',
    city: 'Sleman, D.I. Yogyakarta',
    address: 'Jl. Raya Tajem No.55584, Kenayan, Wedomartani, Ngemplak, Sleman Regency, Special Region of Yogyakarta 55584',
    mapsUrl: 'https://maps.app.goo.gl/mzaBjsr6BBR3SrCT7',
    embedMapsUrl: 'https://maps.google.com/maps?q=Jl.+Raya+Tajem+No.55584,+Kenayan,+Wedomartani,+Ngemplak,+Sleman+Regency,+Special+Region+of+Yogyakarta+55584&t=&z=15&ie=UTF8&iwloc=&output=embed',
    openingHours: '10.00 - 20.00 WIB',
    openingHoursEn: '10:00 AM - 08:00 PM WIB',
    features: [
      'Tersedia layanan Haircut by Owner',
      'Akses jalan utama Jl. Raya Tajem (Maguwo)',
      'Area parkir kendaraan roda 2 & roda 4 yang nyaman'
    ]
  },
  {
    id: 'pakualaman',
    number: 2,
    badge: 'Cabang ke 2',
    name: 'Deara Beauty Cabang Pakualaman - Cabang ke 2',
    shortName: 'Cabang Pakualaman',
    city: 'Kota Yogyakarta',
    address: 'Jl. Masjid No.10, RT.36/RW.09, Gunungketur, Pakualaman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55111, Indonesia',
    mapsUrl: 'https://maps.app.goo.gl/Zff7RksY5JUeXXw68',
    embedMapsUrl: 'https://maps.google.com/maps?q=Jl.+Masjid+No.10,+RT.36/RW.09,+Gunungketur,+Pakualaman,+Kota+Yogyakarta,+Daerah+Istimewa+Yogyakarta+55111&t=&z=15&ie=UTF8&iwloc=&output=embed',
    openingHours: '09.00 - 19.00 WIB',
    openingHoursEn: '09:00 AM - 07:00 PM WIB',
    features: [
      'Pusat Kota Yogyakarta (area cagar budaya Pakualaman)',
      'Suasana privat, tenang, dan homey sanctuary',
      'Layanan Hair Styling, Smoothing, Colouring & Treatment lengkap'
    ]
  }
];

export const SALON_INFO = {
  brandName: 'DEARA BEAUTY SALON',
  tagline: 'Beauty Salon & Hair Care Treatment',
  phone: '6285148394233',
  displayPhone: '+62 851-4839-4233',
  instagram: 'deara_beautysalon',
  instagramUrl: 'https://www.instagram.com/deara_beautysalon',
  tiktok: 'deara_beautysalon',
  tiktokUrl: 'https://www.tiktok.com/@deara_beautysalon',
  branches: SALON_BRANCHES,
  address: SALON_BRANCHES[0].address,
  mapsUrl: 'https://maps.app.goo.gl/mzaBjsr6BBR3SrCT7',
  embedMapsUrl: SALON_BRANCHES[0].embedMapsUrl,
  maguwoBranch: 'Deara Beauty Salon Cabang Maguwo - Cabang ke 1',
  pakualamanBranch: 'Deara Beauty Cabang Pakualaman - Cabang ke 2',
  rawWhatsAppUrl: 'https://api.whatsapp.com/send/?phone=6285148394233&text=Hi+Deara%2C+aku+mau+reservasi+%E2%9C%A8&type=phone_number&app_absent=0'
};

export const WHATSAPP_CONFIG = {
  phoneNumber: '6285148394233',
  displayPhone: '+62 851-4839-4233',
  defaultGreeting: 'Hi Deara, aku mau reservasi ✨',
  rawUrl: SALON_INFO.rawWhatsAppUrl
};

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_CONFIG.phoneNumber}&text=${encoded}&type=phone_number&app_absent=0`;
}

export const LOCAL_STORAGE_KEY = 'deara_salon_pricelist_pdf_v2';
