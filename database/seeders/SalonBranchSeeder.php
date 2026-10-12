<?php

namespace Database\Seeders;

use App\Models\SalonBranch;
use Illuminate\Database\Seeder;

class SalonBranchSeeder extends Seeder
{
    public function run(): void
    {
        $branches = [
            [
                'branch_code' => 'maguwo',
                'number' => 1,
                'badge' => 'Cabang 1 (Utama)',
                'name' => 'Deara Beauty Salon Cabang Maguwo - Cabang ke 1',
                'short_name' => 'Cabang 1: Maguwo (Sleman)',
                'city' => 'Sleman, D.I. Yogyakarta',
                'address' => 'Jl. Raya Tajem No.55584, Kenayan, Wedomartani, Ngemplak, Sleman Regency, Special Region of Yogyakarta 55584',
                'maps_url' => 'https://maps.app.goo.gl/mzaBjsr6BBR3SrCT7',
                'opening_hours' => '10.00 - 20.00 WIB',
                'features' => [
                    'Signature Haircut by Owner',
                    'Parkir Mobil & Motor Luas',
                    'Akses Mudah Jl. Raya Tajem',
                    'Ruang Perawatan Nyaman Ber-AC'
                ]
            ],
            [
                'branch_code' => 'pakualaman',
                'number' => 2,
                'badge' => 'Cabang 2 (Pusat Kota)',
                'name' => 'Deara Beauty Cabang Pakualaman - Cabang ke 2',
                'short_name' => 'Cabang 2: Pakualaman (Kota)',
                'city' => 'Kota Yogyakarta',
                'address' => 'Jl. Masjid No.10, RT.36/RW.09, Gunungketur, Pakualaman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55111, Indonesia',
                'maps_url' => 'https://maps.app.goo.gl/Zff7RksY5JUeXXw68',
                'opening_hours' => '09.00 - 19.00 WIB',
                'features' => [
                    'Buka Lebih Pagi (09.00 WIB)',
                    'Dekat Kawasan Cagar Budaya Pakualaman',
                    'Suasana Tenang & Homey',
                    'Perawatan Lengkap & Stylist Berpengalaman'
                ]
            ]
        ];

        foreach ($branches as $branch) {
            SalonBranch::updateOrCreate(
                ['branch_code' => $branch['branch_code']],
                $branch
            );
        }
    }
}
