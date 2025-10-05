<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class cancelledBookings extends Model
{
     protected $fillable = [
        'booking_id',
        'user_id',
        'babysitter_id',
        'payment_method',
        'start_date',
        'end_date',
    ];
}
