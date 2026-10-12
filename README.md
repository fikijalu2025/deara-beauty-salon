# Deara Beauty Salon - Official Platform (Laravel 11 + React Vite)

Platform website resmi **Deara Beauty Salon** dengan katalog layanan lengkap, kalkulator estimasi biaya, filter kategori interaktif, pemilihan cabang (Maguwo & Pakualaman), dan pemesanan reservasi instan terintegrasi WhatsApp.

---

## 🌸 Fitur Utama
- **Katalog Layanan & Price List Interaktif**:
  - Filter kategori cepat: *Hair Styling*, *Treatment*, *Smoothing*, *Colouring*.
  - Pemilihan panjang rambut dinamis (S, M, L, XL) dengan estimasi harga real-time.
- **2 Cabang Resmi di Yogyakarta**:
  - **Cabang 1: Maguwo (Sleman)** — Jam Buka: 10.00 - 20.00 WIB (Layanan Signature *Haircut by Owner*).
  - **Cabang 2: Pakualaman (Kota Yogyakarta)** — Jam Buka: 09.00 - 19.00 WIB (Buka lebih pagi, suasana tenang).
  - Integrasi Google Maps langsung, 1-klik salin alamat, dan pemilih cabang pada form reservasi.
- **Drawer Estimasi & WhatsApp Direct Checkout**:
  - Hitung total estimasi biaya secara otomatis.
  - Generate pesan reservasi WhatsApp lengkap dengan nama, tanggal, jam, dan cabang yang dituju.
- **Mode Tampilan**:
  - Dark Mode & Light Mode (Warm Salon Aesthetics).
  - Dukungan dwibahasa (Bahasa Indonesia & English).
- **Backend Laravel 11 REST API**:
  - Endpoint `/health`, `/api/branches`, `/api/services`, `/api/categories`, dan `/api/estimate`.

---

## 🛠️ Tech Stack
- **Backend**: Laravel 11 (PHP 8.2+) Serverless Architecture
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion
- **Tooling**: Vite 8, Composer
- **Deployment**: Vercel Serverless (`vercel-php`)

---

## 🚀 Panduan Deploy ke Vercel
Lihat panduan lengkap langkah demi langkah di [LARAVEL_VERCEL_DEPLOYMENT.md](./LARAVEL_VERCEL_DEPLOYMENT.md).

Semua file konfigurasi (`vercel.json`, `api/index.php`, `.env.example`, dan `APP_KEY` bawaan) telah diatur secara standar industri, sehingga Anda cukup mengimpor repositori ke Vercel dan menekan tombol **Deploy**.

---

## 💻 Menjalankan Secara Lokal
```bash
# 1. Install dependencies
composer install
npm install

# 2. Setup environment
cp .env.example .env

# 3. Jalankan migrasi dan seeder
php artisan migrate --seed

# 4. Jalankan server lokal
php artisan serve
npm run dev
```

---

## 📄 Lisensi
Hak Cipta © 2026 Deara Beauty Salon. Semua Hak Dilindungi.
