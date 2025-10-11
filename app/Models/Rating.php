<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $fillable = [
        'booking_id',
        'babysitter_id',
        'parent_id',
        'ratings'
    ];
}
