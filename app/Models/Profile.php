<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

class Profile extends Model
{

    const SEX_MALE = 'm';
    const SEX_FEMALE = 'f';
    const SEX_UNDEFINED = 'n';

    const SEX_VARIANTS = [
        self::SEX_FEMALE => 'female',
        self::SEX_MALE => 'male',
        self::SEX_UNDEFINED => 'undefined'
    ];

    protected $fillable = [
        'firstname', 'lastname', 'birthday', 'city', 'sex'
    ];

//    public static function validationRules()
//    {
//        return [
//            'firstname' => ['string', 'max:255'],
//            'lastname' => ['string', 'max:255'],
//            'sex' => Rule::in(['male', 'female']),
//            'birthday' => 'date_format:Y-m-d'
//        ];
//    }
}
