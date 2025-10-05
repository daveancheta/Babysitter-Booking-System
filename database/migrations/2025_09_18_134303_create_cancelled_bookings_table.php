<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cancelled_bookings', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('booking_id');
            $table->bigInteger('user_id');
            $table->bigInteger('babysitter_id');
            $table->string('payment_method');
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cancelled_bookings');
    }
};
