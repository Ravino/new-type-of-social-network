<?php

namespace App\Models\Geo;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{

    protected $table = 'geo_countries';

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    public function getDateFormat()
    {
        return 'U';
    }
}
