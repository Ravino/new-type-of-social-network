<?php

namespace App\Models;

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

    const RELATIONSHIP_MARRIED = 1;
    const RELATIONSHIP_NOT_MARRIED = 2;

    const RELATIONSHIP_VARIANTS = [
        self::RELATIONSHIP_MARRIED => 'Married',
        self::RELATIONSHIP_NOT_MARRIED => 'Not married',
    ];

    protected $fillable = [
        'firstname', 'lastname', 'birthday', 'city', 'sex', 'relationship',
    ];

    public static function rules($keys = [])
    {
        $rules = [
            'firstname' => 'required|string|min:1|max:255',
            'lastname' => 'required|string|min:1|max:255',
            'birthday' => 'date_format:Y-m-d|nullable',
            'sex' => Rule::in(array_keys(self::SEX_VARIANTS)),
            'city' => 'string|min:1|max:255',
            'relationship' => Rule::in(array_keys(self::RELATIONSHIP_VARIANTS)) . '|nullable',
        ];

        if (count($keys)) {
            return array_filter($rules, function ($index) use ($keys) {
                return in_array($index, $keys);

            }, ARRAY_FILTER_USE_KEY);
        }

        return $rules;
    }
}
