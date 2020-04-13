<?php

namespace App\Models\Geo;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{

    protected $table = 'geo_cities';

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
