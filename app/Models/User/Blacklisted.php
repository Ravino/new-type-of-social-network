<?php

namespace App\Models\User;

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

    public static function rules($keys = [])
    {
        $rules = [
            'user_id' => 'required|integer',
            'blacklisted_id' => 'required|integer',
        ];

        if (count($keys)) {
            return array_filter($rules, function ($index) use ($keys) {
                return in_array($index, $keys);

            }, ARRAY_FILTER_USE_KEY);
        }

        return $rules;
    }
}
