<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Categories list.
     */
    public function categories(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                ['id' => 'all', 'name' => 'Semua Layanan'],
                ['id' => 'hair-styling', 'name' => 'Hair Styling'],
                ['id' => 'treatment', 'name' => 'Treatment'],
                ['id' => 'smoothing', 'name' => 'Smoothing'],
                ['id' => 'colouring', 'name' => 'Colouring'],
            ]
        ]);
    }

    /**
     * Get services with optional category filtering.
     */
    public function index(Request $request): JsonResponse
    {
        $category = $request->query('category');

        $services = [
            [
                'id' => 'haircut-owner',
                'title' => 'Haircut by Owner',
                'subtitle' => 'Potong rambut presisi sesuai bentuk wajah langsung oleh owner',
                'category' => 'hair-styling',
                'priceType' => 'fixed',
                'fixedPrice' => 60000,
                'duration' => '30 - 45 Menit',
                'badge' => 'Signature Deara',
                'popular' => true,
                'description' => 'Layanan unggulan potong rambut langsung dikerjakan oleh Owner Deara Beauty Salon. Termasuk konsultasi bentuk wajah, cuci rambut, dan blow dry rapi.',
                'benefits' => ['Konsultasi bentuk wajah mendalam', 'Teknik guntingan presisi & tekstur rambut ideal', 'Termasuk hair wash premium & blow styling', 'Tersedia di Cabang 1 Maguwo']
            ],
            [
                'id' => 'haircut-senior',
                'title' => 'Haircut Senior Stylist',
                'subtitle' => 'Potong rambut modis oleh tim stylist berpengalaman',
                'category' => 'hair-styling',
                'priceType' => 'fixed',
                'fixedPrice' => 45000,
                'duration' => '30 Menit',
                'popular' => false,
                'description' => 'Potong rambut dengan stylist profesional Deara untuk model layer, wolf cut, bob, atau perapian ujung rambut yang sehat.',
                'benefits' => ['Model rambut terkini (Korean, Layer, Bob)', 'Pembersihan rambut yang higienis', 'Hasil akhir natural & mudah dirawat di rumah']
            ],
            [
                'id' => 'hair-spa-loreall',
                'title' => 'Hair Spa L’Oreal Professionnel',
                'subtitle' => 'Nutrisi intensif untuk batang rambut kering, kusam & rusak',
                'category' => 'treatment',
                'priceType' => 'length_based',
                'prices' => ['S' => 85000, 'M' => 100000, 'L' => 125000, 'XL' => 150000],
                'duration' => '60 Menit',
                'badge' => 'Best Seller',
                'popular' => true,
                'description' => 'Perawatan deep conditioning dengan krim L’Oreal original disertai pijatan relaksasi kepala, leher, dan punggung.',
                'benefits' => ['Mengembalikan kelembutan & kilau alami', 'Mengurangi rambut bercabang', 'Pijatan relaksasi melepas penat']
            ],
            [
                'id' => 'creambath-traditional',
                'title' => 'Creambath Tradisional Aromaterapi',
                'subtitle' => 'Perawatan akar rambut & kesegaran kulit kepala',
                'category' => 'treatment',
                'priceType' => 'length_based',
                'prices' => ['S' => 65000, 'M' => 75000, 'L' => 90000, 'XL' => 110000],
                'duration' => '50 Menit',
                'popular' => false,
                'description' => 'Creambath dengan pilihan ekstrak alami (Ginseng, Lidah Buaya, Alpukat) untuk merangsang sirkulasi darah kulit kepala.',
                'benefits' => ['Menutrisi folikel rambut dari akar', 'Sensasi dingin dan segar di kepala', 'Termasuk pemijatan santai']
            ],
            [
                'id' => 'smoothing-silk',
                'title' => 'Smoothing Sutra / Keratin Straightening',
                'subtitle' => 'Pelurusan lembut alami tanpa hasil kaku seperti papan',
                'category' => 'smoothing',
                'priceType' => 'length_based',
                'prices' => ['S' => 200000, 'M' => 250000, 'L' => 320000, 'XL' => 400000],
                'duration' => '2.5 - 3.5 Jam',
                'badge' => 'Promo Favorit',
                'popular' => true,
                'description' => 'Metode pelurusan modern dengan formula keratin yang menjaga elastisitas rambut sehingga tetap jatuh lembut dan tampak berkilau alami.',
                'benefits' => ['Rambut lurus lembut natural (tidak kaku)', 'Formula aman meminimalisir rambut rapuh', 'Tahan lama 6 - 8 bulan dengan perawatan teratur']
            ],
            [
                'id' => 'colouring-fashion',
                'title' => 'Hair Colouring Fashion & Highlight',
                'subtitle' => 'Pewarnaan rambut berkelas dengan pilihan shade tren terkini',
                'category' => 'colouring',
                'priceType' => 'length_based',
                'prices' => ['S' => 180000, 'M' => 230000, 'L' => 300000, 'XL' => 380000],
                'duration' => '2 - 3 Jam',
                'badge' => 'Trendy Look',
                'popular' => true,
                'description' => 'Pewarnaan rambut penuh (single tone) maupun balayage/highlight modern menggunakan produk berkualitas agar warna merata dan rambut tetap ternutrisi.',
                'benefits' => ['Pilihan warna tren (Ash, Brown, Burgundy, Caramel)', 'Pigmen warna merata & tahan lama', 'Konsultasi shade yang cocok dengan undertone kulit']
            ]
        ];

        if ($category && $category !== 'all') {
            $services = array_values(array_filter($services, fn($s) => $s['category'] === $category));
        }

        return response()->json([
            'status' => 'success',
            'count' => count($services),
            'data' => $services
        ]);
    }
}
