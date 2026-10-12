<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class BranchController extends Controller
{
    /**
     * Get all official Deara Beauty Salon branches.
     */
    public function index(): JsonResponse
    {
        $branches = [
            [
                'id' => 'maguwo',
                'number' => 1,
                'badge' => 'Cabang 1 (Utama)',
                'name' => 'Deara Beauty Salon Cabang Maguwo - Cabang ke 1',
                'shortName' => 'Cabang 1: Maguwo (Sleman)',
                'city' => 'Sleman, D.I. Yogyakarta',
                'address' => 'Jl. Raya Tajem No.55584, Kenayan, Wedomartani, Ngemplak, Sleman Regency, Special Region of Yogyakarta 55584',
                'mapsUrl' => 'https://maps.app.goo.gl/mzaBjsr6BBR3SrCT7',
                'openingHours' => '10.00 - 20.00 WIB',
                'features' => [
                    'Signature Haircut by Owner',
                    'Parkir Mobil & Motor Luas',
                    'Akses Mudah Jl. Raya Tajem',
                    'Ruang Perawatan Nyaman Ber-AC'
                ]
            ],
            [
                'id' => 'pakualaman',
                'number' => 2,
                'badge' => 'Cabang 2 (Pusat Kota)',
                'name' => 'Deara Beauty Cabang Pakualaman - Cabang ke 2',
                'shortName' => 'Cabang 2: Pakualaman (Kota)',
                'city' => 'Kota Yogyakarta',
                'address' => 'Jl. Masjid No.10, RT.36/RW.09, Gunungketur, Pakualaman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55111, Indonesia',
                'mapsUrl' => 'https://maps.app.goo.gl/Zff7RksY5JUeXXw68',
                'openingHours' => '09.00 - 19.00 WIB',
                'features' => [
                    'Buka Lebih Pagi (09.00 WIB)',
                    'Dekat Kawasan Cagar Budaya Pakualaman',
                    'Suasana Tenang & Homey',
                    'Perawatan Lengkap & Stylist Berpengalaman'
                ]
            ]
        ];

        return response()->json([
            'status' => 'success',
            'data' => $branches
        ]);
    }
}
