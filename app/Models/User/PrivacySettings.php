<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class PrivacySettings extends Model
{

    const PAGE_TYPE_DEFAULT = 1;
    const PAGE_TYPE_OPEN = 1;
    const PAGE_TYPE_FRIENDS_ONLY = 2;
    const PAGE_TYPE_CLOSED = 3;

    const MESSAGES_PERMISSIONS_DEFAULT = 1;
    const MESSAGES_PERMISSIONS_ALL = 1;
    const MESSAGES_PERMISSIONS_FRIENDS_ONLY = 2;

    const POST_WALL_PERMISSIONS_FRIENDS_DEFAULT = 1;
    const POST_WALL_PERMISSIONS_FRIENDS_ONLY = 1;
    const POST_WALL_PERMISSIONS_ME_ONLY = 2;
    const POST_WALL_PERMISSIONS_ALL = 3;
    const POST_WALL_PERMISSIONS_SELECTED_FRIENDS = 3;

    const VIEW_WALL_PERMISSIONS_DEFAULT = 1;
    const VIEW_WALL_PERMISSIONS_ALL = 1;
    const VIEW_WALL_PERMISSIONS_FRIENDS_ONLY = 2;
    const VIEW_WALL_PERMISSIONS_SELECTED_FRIENDS = 3;

    const VIEW_FRIENDS_PERMISSIONS_DEFAULT = 1;
    const VIEW_FRIENDS_PERMISSIONS_ALL = 1;
    const VIEW_FRIENDS_PERMISSIONS_FRIENDS_ONLY = 2;
    const VIEW_FRIENDS_PERMISSIONS_FRIENDS = 3;

    const TWO_FACTOR_AUTH_ENABLED_DEFAULT = 0;
    const TWO_FACTOR_AUTH_ENABLED_FALSE = 0;
    const TWO_FACTOR_AUTH_ENABLED_TRUE = 0;

    const SMS_CONFIRM_DEFAULT = 0;
    const SMS_CONFIRM_DISABLED = 0;
    const SMS_CONFIRM_ENABLED = 0;

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

    public function getPageTypes()
    {
        return [

        ];
    }
}
