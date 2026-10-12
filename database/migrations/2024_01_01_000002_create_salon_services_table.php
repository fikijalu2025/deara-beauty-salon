<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('salon_services', function (Blueprint $table) {
            $table->id();
            $table->string('service_id')->unique();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('category'); // 'hair-styling', 'treatment', 'smoothing', 'colouring'
            $table->enum('price_type', ['fixed', 'length_based'])->default('fixed');
            $table->unsignedInteger('fixed_price')->nullable();
            $table->json('prices')->nullable(); // {'S': 85000, 'M': 100000, ...}
            $table->string('duration')->nullable();
            $table->string('badge')->nullable();
            $table->boolean('popular')->default(false);
            $table->text('description')->nullable();
            $table->json('benefits')->nullable();
            $table->boolean('owner_available')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('salon_services');
    }
};
