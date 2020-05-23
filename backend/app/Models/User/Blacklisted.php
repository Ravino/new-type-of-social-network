<?php

namespace App\Models\User;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Blacklisted extends Model
{
    protected $table = 'users_blacklisted';

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    protected $fillable = [
        'user_id', 'blacklisted_id',
    ];

    /**
     * @return string
     */
    public function getDateFormat()
    {
        return 'U';
    }
}
