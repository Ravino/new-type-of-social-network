<?php

namespace App\Models;

use App\Models\Profile\Relationship;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

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
        'first_name', 'last_name', 'birthday', 'city', 'sex', 'relationship', 'relationship_user_id',
    ];

    public function getDateFormat()
    {
        return 'U';
    }

    public function relationship()
    {
        return $this->hasOne(Relationship::class, 'id', 'relationship');
    }
}
