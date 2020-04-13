<?php

namespace App\Models\Geo;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{

    protected $table = 'geo_regions';

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

    public function country()
    {
        return $this->hasOne(Country::class, 'id', 'country_id');
    }
}
