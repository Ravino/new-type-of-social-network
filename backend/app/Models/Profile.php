<?php

namespace App\Models;

use App\Models\Geo\City;
use App\Models\Profile\Relationship;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    protected $primaryKey = 'user_id';

    protected $hidden = [
        'user_id'
    ];

    const SEX_MALE = 'm';
    const SEX_FEMALE = 'f';
    const SEX_UNDEFINED = 'n';

    const SEX_VARIANTS = [
        self::SEX_FEMALE => 'female',
        self::SEX_MALE => 'male',
        self::SEX_UNDEFINED => 'undefined'
    ];

    protected $fillable = [
        'first_name',
        'last_name',
        'birthday',
        'city',
        'sex',
        'relationship_id',
        'relationship_user_id',
        'user_pic',
        'geo_city_id',
    ];

    public function getDateFormat()
    {
        return 'U';
    }

    public function relationship()
    {
        return $this->hasOne(Relationship::class, 'id', 'relationship_id');
    }

    public function city()
    {
        return $this->hasOne(City::class, 'id', 'geo_city_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
