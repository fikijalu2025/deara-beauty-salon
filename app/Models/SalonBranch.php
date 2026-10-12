<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalonBranch extends Model
{
    protected $fillable = [
        'branch_code',
        'number',
        'badge',
        'name',
        'short_name',
        'city',
        'address',
        'maps_url',
        'opening_hours',
        'features',
    ];

    protected $casts = [
        'features' => 'array',
        'number' => 'integer',
    ];
}
