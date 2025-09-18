<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class bookingsDone extends Model
{
     protected $fillable = [
        'user_id',
        'babysitter_id',
        'payment_method',
        'start_date',
        'end_date',
    ];
}
