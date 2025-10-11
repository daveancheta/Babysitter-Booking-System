<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banning extends Model
{
    protected $fillable = [
        'ip_address'
    ];
}
