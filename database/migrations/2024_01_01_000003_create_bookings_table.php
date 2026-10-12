<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name')->nullable();
            $table->string('branch_code'); // 'maguwo' or 'pakualaman'
            $table->date('preferred_date')->nullable();
            $table->string('preferred_time')->nullable();
            $table->text('notes')->nullable();
            $table->json('services'); // selected services payload
            $table->unsignedInteger('total_estimated_price')->default(0);
            $table->text('whatsapp_url')->nullable();
            $table->string('status')->default('pending'); // 'pending', 'confirmed', 'completed', 'cancelled'
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
