<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    protected $fillable = [
        'user_id',
        'token',
        'user_agent',
        'ip',
        'is_active',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
