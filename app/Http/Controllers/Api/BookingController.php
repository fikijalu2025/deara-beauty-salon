<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Generate reservation estimate and direct WhatsApp reservation link.
     */
    public function createEstimate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'client_name' => 'nullable|string|max:100',
            'branch' => 'required|in:maguwo,pakualaman',
            'preferred_date' => 'nullable|string',
            'preferred_time' => 'nullable|string',
            'note' => 'nullable|string|max:500',
            'items' => 'required|array|min:1',
            'items.*.title' => 'required|string',
            'items.*.price' => 'required|numeric',
            'items.*.length' => 'nullable|string',
        ]);

        $branchName = $validated['branch'] === 'maguwo'
            ? 'Deara Beauty Salon Cabang Maguwo - Cabang ke 1 (Jl. Raya Tajem, Wedomartani - Buka 10.00-20.00 WIB)'
            : 'Deara Beauty Cabang Pakualaman - Cabang ke 2 (Jl. Masjid No.10, Pakualaman - Buka 09.00-19.00 WIB)';

        $totalPrice = 0;
        $itemsText = [];

        foreach ($validated['items'] as $item) {
            $totalPrice += $item['price'];
            $lengthNote = !empty($item['length']) ? " [Panjang {$item['length']}]" : "";
            $priceFormatted = 'Rp ' . number_format($item['price'], 0, ',', '.');
            $itemsText[] = "• {$item['title']}{$lengthNote} ({$priceFormatted})";
        }

        $totalFormatted = 'Rp ' . number_format($totalPrice, 0, ',', '.');

        $messageLines = [
            "Halo Admin Deara Beauty Salon, saya ingin reservasi jadwal perawatan rambut:",
            "",
            "*Cabang Salon:* {$branchName}",
        ];

        if (!empty($validated['client_name'])) {
            $messageLines[] = "*Nama:* " . $validated['client_name'];
        }
        if (!empty($validated['preferred_date'])) {
            $messageLines[] = "*Rencana Tanggal:* " . $validated['preferred_date'];
        }
        if (!empty($validated['preferred_time'])) {
            $messageLines[] = "*Rencana Jam:* " . $validated['preferred_time'];
        }

        $messageLines[] = "";
        $messageLines[] = "*Layanan yang dipilih:*";
        $messageLines = array_merge($messageLines, $itemsText);
        $messageLines[] = "";
        $messageLines[] = "*Total Estimasi:* {$totalFormatted}";

        if (!empty($validated['note'])) {
            $messageLines[] = "*Catatan / Request:* " . $validated['note'];
        }

        $messageLines[] = "";
        $messageLines[] = "Apakah di tanggal dan jam tersebut slot masih tersedia? Terima kasih!";

        $fullMessage = implode("\n", $messageLines);
        $waPhone = '6285148394233';
        $waUrl = "https://wa.me/{$waPhone}?text=" . rawurlencode($fullMessage);

        return response()->json([
            'status' => 'success',
            'total_price' => $totalPrice,
            'total_formatted' => $totalFormatted,
            'whatsapp_url' => $waUrl,
            'message' => $fullMessage,
        ]);
    }
}
