<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'babysitter_id',
        'status',
        'payment_method',
        'start_date',
        'end_date',
    ];
}
