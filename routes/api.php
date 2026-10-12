<?php

use App\Http\Controllers\Api\BranchController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\BookingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| API endpoints for Deara Beauty Salon.
| Accessible via /api/... with JSON responses.
|
*/

Route::prefix('v1')->group(function () {
    Route::get('/branches', [BranchController::class, 'index']);
    Route::get('/categories', [ServiceController::class, 'categories']);
    Route::get('/services', [ServiceController::class, 'index']);
    Route::post('/estimate', [BookingController::class, 'createEstimate']);
    Route::post('/booking', [BookingController::class, 'createEstimate']);
});

// Root aliases for convenience
Route::get('/branches', [BranchController::class, 'index']);
Route::get('/categories', [ServiceController::class, 'categories']);
Route::get('/services', [ServiceController::class, 'index']);
Route::post('/estimate', [BookingController::class, 'createEstimate']);
Route::post('/booking', [BookingController::class, 'createEstimate']);
