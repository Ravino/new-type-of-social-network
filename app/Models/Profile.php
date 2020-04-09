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
        'firstname', 'lastname', 'birthday', 'city', 'sex', 'relationship', 'relationship_user_id',
    ];

    //TODO: Please move this to request handler
    public static function rules($keys = [])
    {
        $rules = [
            'firstname' => 'required|string|min:1|max:255',
            'lastname' => 'required|string|min:1|max:255',
            'birthday' => 'date_format:Y-m-d|nullable',
            'sex' => Rule::in(array_keys(self::SEX_VARIANTS)),
            'city' => 'string|min:1|max:255',
            'relationship' => Rule::exists('profile_relationships', 'id') . '|nullable',
            'relationship_user_id' => 'nullable',
        ];

        if (count($keys)) {
            return array_filter($rules, function ($index) use ($keys) {
                return in_array($index, $keys);

            }, ARRAY_FILTER_USE_KEY);
        }

        return $rules;
    }

    public function getDateFormat()
    {
        return 'U';
    }

    public function relationship()
    {
        return $this->hasOne(Relationship::class, 'id', 'relationship');
    }
}
