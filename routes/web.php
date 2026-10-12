<?php

use App\Http\Controllers\SalonController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application.
| The main entry serves the React SPA rendered with Tailwind CSS.
|
*/

Route::get('/', [SalonController::class, 'index'])->name('home');

Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'application' => 'Deara Beauty Salon',
        'framework' => 'Laravel ' . app()->version(),
        'php' => PHP_VERSION,
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Single Page Application (SPA) catch-all route
Route::get('/{any}', [SalonController::class, 'index'])->where('any', '.*');
