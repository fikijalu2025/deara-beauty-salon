<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalonService extends Model
{
    protected $fillable = [
        'service_id',
        'title',
        'subtitle',
        'category',
        'price_type',
        'fixed_price',
        'prices',
        'duration',
        'badge',
        'popular',
        'description',
        'benefits',
        'owner_available',
    ];

    protected $casts = [
        'prices' => 'array',
        'benefits' => 'array',
        'popular' => 'boolean',
        'owner_available' => 'boolean',
        'fixed_price' => 'integer',
    ];
}
