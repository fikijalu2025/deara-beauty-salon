<?php

namespace Database\Seeders;

use App\Models\SalonService;
use Illuminate\Database\Seeder;

class SalonServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'service_id' => 'haircut-owner',
                'title' => 'Haircut by Owner',
                'subtitle' => 'Potong rambut presisi sesuai bentuk wajah langsung oleh owner',
                'category' => 'hair-styling',
                'price_type' => 'fixed',
                'fixed_price' => 60000,
                'prices' => null,
                'duration' => '30 - 45 Menit',
                'badge' => 'Signature Deara',
                'popular' => true,
                'description' => 'Layanan unggulan potong rambut langsung dikerjakan oleh Owner Deara Beauty Salon. Termasuk konsultasi bentuk wajah, cuci rambut, dan blow dry rapi.',
                'benefits' => [
                    'Konsultasi bentuk wajah mendalam',
                    'Teknik guntingan presisi & tekstur rambut ideal',
                    'Termasuk hair wash premium & blow styling',
                    'Tersedia di Cabang 1 Maguwo'
                ],
                'owner_available' => true,
            ],
            [
                'service_id' => 'haircut-senior',
                'title' => 'Haircut Senior Stylist',
                'subtitle' => 'Potong rambut modis oleh tim stylist berpengalaman',
                'category' => 'hair-styling',
                'price_type' => 'fixed',
                'fixed_price' => 45000,
                'prices' => null,
                'duration' => '30 Menit',
                'badge' => null,
                'popular' => false,
                'description' => 'Potong rambut dengan stylist profesional Deara untuk model layer, wolf cut, bob, atau perapian ujung rambut yang sehat.',
                'benefits' => [
                    'Model rambut terkini (Korean, Layer, Bob)',
                    'Pembersihan rambut yang higienis',
                    'Hasil akhir natural & mudah dirawat di rumah'
                ],
                'owner_available' => false,
            ],
            [
                'service_id' => 'hair-spa-loreall',
                'title' => 'Hair Spa L’Oreal Professionnel',
                'subtitle' => 'Nutrisi intensif untuk batang rambut kering, kusam & rusak',
                'category' => 'treatment',
                'price_type' => 'length_based',
                'fixed_price' => null,
                'prices' => ['S' => 85000, 'M' => 100000, 'L' => 125000, 'XL' => 150000],
                'duration' => '60 Menit',
                'badge' => 'Best Seller',
                'popular' => true,
                'description' => 'Perawatan deep conditioning dengan krim L’Oreal original disertai pijatan relaksasi kepala, leher, dan punggung.',
                'benefits' => [
                    'Mengembalikan kelembutan & kilau alami',
                    'Mengurangi rambut bercabang',
                    'Pijatan relaksasi melepas penat'
                ],
                'owner_available' => false,
            ],
            [
                'service_id' => 'creambath-traditional',
                'title' => 'Creambath Tradisional Aromaterapi',
                'subtitle' => 'Perawatan akar rambut & kesegaran kulit kepala',
                'category' => 'treatment',
                'price_type' => 'length_based',
                'fixed_price' => null,
                'prices' => ['S' => 65000, 'M' => 75000, 'L' => 90000, 'XL' => 110000],
                'duration' => '50 Menit',
                'badge' => null,
                'popular' => false,
                'description' => 'Creambath dengan pilihan ekstrak alami untuk merangsang sirkulasi darah kulit kepala.',
                'benefits' => [
                    'Menutrisi folikel rambut dari akar',
                    'Sensasi dingin dan segar di kepala',
                    'Termasuk pemijatan santai'
                ],
                'owner_available' => false,
            ],
            [
                'service_id' => 'smoothing-silk',
                'title' => 'Smoothing Sutra / Keratin Straightening',
                'subtitle' => 'Pelurusan lembut alami tanpa hasil kaku seperti papan',
                'category' => 'smoothing',
                'price_type' => 'length_based',
                'fixed_price' => null,
                'prices' => ['S' => 200000, 'M' => 250000, 'L' => 320000, 'XL' => 400000],
                'duration' => '2.5 - 3.5 Jam',
                'badge' => 'Promo Favorit',
                'popular' => true,
                'description' => 'Metode pelurusan modern dengan formula keratin yang menjaga elastisitas rambut sehingga tetap jatuh lembut dan tampak berkilau alami.',
                'benefits' => [
                    'Rambut lurus lembut natural (tidak kaku)',
                    'Formula aman meminimalisir rambut rapuh',
                    'Tahan lama 6 - 8 bulan dengan perawatan teratur'
                ],
                'owner_available' => false,
            ],
            [
                'service_id' => 'colouring-fashion',
                'title' => 'Hair Colouring Fashion & Highlight',
                'subtitle' => 'Pewarnaan rambut berkelas dengan pilihan shade tren terkini',
                'category' => 'colouring',
                'price_type' => 'length_based',
                'fixed_price' => null,
                'prices' => ['S' => 180000, 'M' => 230000, 'L' => 300000, 'XL' => 380000],
                'duration' => '2 - 3 Jam',
                'badge' => 'Trendy Look',
                'popular' => true,
                'description' => 'Pewarnaan rambut penuh maupun balayage/highlight modern menggunakan produk berkualitas agar warna merata dan rambut tetap ternutrisi.',
                'benefits' => [
                    'Pilihan warna tren (Ash, Brown, Burgundy, Caramel)',
                    'Pigmen warna merata & tahan lama',
                    'Konsultasi shade yang cocok dengan undertone kulit'
                ],
                'owner_available' => false,
            ]
        ];

        foreach ($services as $service) {
            SalonService::updateOrCreate(
                ['service_id' => $service['service_id']],
                $service
            );
        }
    }
}
