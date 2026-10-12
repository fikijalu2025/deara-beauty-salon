<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SalonController extends Controller
{
    /**
     * Display the main Deara Beauty Salon React SPA entry point.
     */
    public function index()
    {
        // If precompiled dist/index.html is available, serve directly for high performance
        $distPath = base_path('dist/index.html');
        if (file_exists($distPath)) {
            return response(file_get_contents($distPath))->header('Content-Type', 'text/html');
        }

        return view('app', [
            'brand' => 'DEARA BEAUTY SALON',
            'phone' => '+62 851-4839-4233',
        ]);
    }
}
