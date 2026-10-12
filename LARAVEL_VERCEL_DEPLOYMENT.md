# Panduan Deploy Laravel 11 + React (Vite) ke Vercel
**Aplikasi Resmi: Deara Beauty Salon**

Proyek ini telah dikonfigurasi penuh dengan arsitektur **Laravel 11 + React (Vite) Serverless** yang siap di-deploy langsung ke **Vercel**.

---

## 📁 Struktur Proyek

```text
├── api/
│   └── index.php                    # Serverless handler untuk Vercel (menyiapkan /tmp/storage)
├── app/
│   ├── Http/Controllers/
│   │   ├── Controller.php
│   │   ├── SalonController.php      # Render SPA frontend React & metadata salon
│   │   └── Api/
│   │       ├── BranchController.php # API data Cabang 1 Maguwo & Cabang 2 Pakualaman
│   │       ├── ServiceController.php# API katalog layanan & kategori
│   │       └── BookingController.php# API estimasi biaya & WhatsApp checkout
│   ├── Models/
│   │   ├── SalonBranch.php
│   │   ├── SalonService.php
│   │   └── Booking.php
│   └── Providers/
│       └── AppServiceProvider.php   # Dynamic storage path untuk serverless /tmp
├── bootstrap/
│   ├── app.php                      # Laravel 11 streamlined routing & middleware
│   └── providers.php
├── config/
│   ├── app.php
│   ├── cors.php
│   ├── database.php
│   └── session.php
├── database/
│   ├── migrations/                  # Tabel cabang, layanan, dan booking
│   └── seeders/                     # Seeder cabang (Maguwo & Pakualaman) & katalog harga
├── routes/
│   ├── web.php                      # Web & SPA fallback route, /health
│   ├── api.php                      # REST API endpoint (/api/branches, /api/services, /api/estimate)
│   └── console.php
├── resources/
│   ├── views/
│   │   └── app.blade.php            # Blade entry point yang memuat React
│   ├── js/
│   │   └── app.tsx                  # React Vite entry point
│   └── css/
│       └── app.css                  # Tailwind CSS
├── src/                             # Komponen React lengkap (Hero, Catalog, Tabs, Dark Mode, Drawer)
├── vercel.json                      # Konfigurasi Vercel Serverless PHP runtime & routing
├── composer.json                    # Dependensi Laravel 11
└── package.json                     # Vite, React 19, Tailwind CSS
```

---

## 🚀 Langkah Deploy ke Vercel (3 Menit)

### Langkah 1: Push Repository ke GitHub
Pastikan seluruh folder dan file telah di-push ke repositori GitHub Anda:
```bash
git init
git add .
git commit -m "feat: Laravel 11 + React Vite for Deara Beauty Salon"
git branch -M main
git remote add origin https://github.com/username/deara-beauty-salon.git
git push -u origin main
```

### Langkah 2: Import Project di Vercel Dashboard
1. Buka [https://vercel.com](https://vercel.com) dan login ke akun Anda.
2. Klik tombol **"Add New..."** -> **"Project"**.
3. Pilih repositori GitHub Anda (`deara-beauty-salon`) dan klik **Import**.

### Langkah 3: Konfigurasi Build & Output Settings
- **Framework Preset**: Pilih **Other** (karena kita menggunakan file `vercel.json`).
- **Build Command**: Biarkan default `npm run build` atau `vite build`.
- **Output Directory**: Biarkan default.
- **Install Command**: `npm install`

### Langkah 4: Environment Variables di Vercel (Sudah Disediakan!)
Seluruh variabel rahasia (**Secret Values**) dan konfigurasi produksi **sudah otomatis terpasang di `vercel.json`**, sehingga Anda bahkan bisa langsung klik **Deploy** tanpa memasukkan variabel secara manual.

Namun jika ingin memasukkan secara eksplisit di dashboard Vercel, cukup salin nilai berikut:

| Key | Value (Sudah Siap Pakai) | Keterangan |
| :--- | :--- | :--- |
| `APP_NAME` | `Deara Beauty Salon` | Nama aplikasi |
| `APP_ENV` | `production` | Mode produksi |
| `APP_KEY` | `base64:SzSr7rem4P7p7IX3MZmBJx/xhJjyn+sbJcL7S1WuwK8=` | Kunci enkripsi AES-256 (Sudah di-generate) |
| `APP_DEBUG` | `false` | Debug dinonaktifkan demi keamanan |
| `APP_URL` | `https://your-project.vercel.app` | URL domain Vercel Anda |
| `DB_CONNECTION` | `sqlite` | Database SQLite serverless |
| `SESSION_DRIVER` | `cookie` | Session driver serverless |
| `CACHE_STORE` | `array` | Cache driver serverless |

> **Catatan:** Nilai `APP_KEY` di atas sudah di-generate secara kriptografis (`AES-256-CBC`) dan sudah dipasang sebagai fallback default di `config/app.php` serta `vercel.json`. Anda tidak perlu lagi repot-repot menjalankan perintah CLI.

### Langkah 5: Klik "Deploy"
Vercel akan secara otomatis:
1. Mem-build bundle aset React dengan Vite.
2. Mengaktifkan runtime serverless PHP via `vercel.json` dan `api/index.php`.
3. Dalam waktu ~60 detik, website Anda sudah aktif dan live dengan HTTPS gratis!

---

## 💻 Menjalankan Secara Lokal (Local Development)

Jika ingin mengembangkan lebih lanjut di komputer Anda:

```bash
# 1. Install dependensi PHP & Node.js
composer install
npm install

# 2. Siapkan file environment
cp .env.example .env
php artisan key:generate

# 3. Buat database SQLite dan jalankan seeder data Deara Beauty Salon
touch database/database.sqlite
php artisan migrate --seed

# 4. Jalankan server Laravel dan Vite secara bersamaan
# Terminal 1:
php artisan serve

# Terminal 2:
npm run dev
```

Buka browser di `http://localhost:8000` (atau `http://localhost:3000`).

---

## 📡 REST API Endpoint yang Tersedia

Aplikasi ini sudah dilengkapi API endpoint siap pakai:

- `GET /health` : Cek status kesehatan server dan versi framework.
- `GET /api/branches` : Data 2 cabang resmi (Cabang 1 Maguwo Sleman & Cabang 2 Pakualaman Kota Yogyakarta) beserta jam operasional dan tautan Google Maps.
- `GET /api/categories` : Daftar kategori layanan (Hair Styling, Treatment, Smoothing, Colouring).
- `GET /api/services` : Katalog layanan lengkap (dapat difilter via `?category=hair-styling`).
- `POST /api/estimate` : Menerima pilihan layanan rambut pelanggan dan menghasilkan URL reservasi WhatsApp otomatis ke nomor salon `+62 851-4839-4233`.

---

## 💡 Keunggulan Arsitektur Ini
1. **Frontend Super Cepat**: React SPA dengan Tailwind CSS, dark mode elegan, filter tabs instan, dan drawer estimasi harga tanpa reload halaman.
2. **Backend Kuat**: Laravel 11 mengelola logic data, routing, dan database.
3. **Zero Maintenance Hosting**: Serverless di Vercel berarti tidak perlu mengurus setting Nginx/Apache manual, SSL otomatis, dan gratis pada tier Hobby.
