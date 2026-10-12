<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('salon_branches', function (Blueprint $table) {
            $table->id();
            $table->string('branch_code')->unique(); // 'maguwo', 'pakualaman'
            $table->integer('number')->default(1);
            $table->string('badge');
            $table->string('name');
            $table->string('short_name');
            $table->string('city');
            $table->text('address');
            $table->text('maps_url');
            $table->string('opening_hours');
            $table->json('features')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('salon_branches');
    }
};
