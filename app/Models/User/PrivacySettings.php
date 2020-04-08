<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class PrivacySettings extends Model
{

    protected $table = 'users_privacy_settings';

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    protected $fillable = [
        'page_type',
        'write_messages_permissions',
        'post_wall_permissions',
        'view_wall_permissions',
        'view_friends_permissions',
        'two_factor_auth_enabled',
        'sms_confirm',
    ];

    public static function rules($keys = [])
    {
        $rules = [
            'user_id' => 'required|integer',
            'page_type' => 'integer|nullable',
            'write_messages_permissions' => 'integer|nullable',
            'post_wall_permissions' => 'integer|nullable',
            'view_wall_permissions' => 'integer|nullable',
            'view_friends_permissions' => 'integer|nullable',
            'two_factor_auth_enabled' => 'integer|nullable|min:0|max:1',
            'sms_confirm' => 'integer|nullable|min:0|max:1',
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
}
