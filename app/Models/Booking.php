<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'customer_name',
        'branch_code',
        'preferred_date',
        'preferred_time',
        'notes',
        'services',
        'total_estimated_price',
        'whatsapp_url',
        'status',
    ];

    protected $casts = [
        'services' => 'array',
        'total_estimated_price' => 'integer',
        'preferred_date' => 'date',
    ];
}
