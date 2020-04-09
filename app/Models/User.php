<?php

namespace App\Models;

use App\Models\User\PrivacySettings;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function privacySettings()
    {
        return $this->hasOne(PrivacySettings::class)->withDefault(
            [
                'page_type' => PrivacySettings::PAGE_TYPE_DEFAULT,
                'write_messages_permissions' => PrivacySettings::MESSAGES_PERMISSIONS_DEFAULT,
                'post_wall_permissions' => PrivacySettings::POST_WALL_PERMISSIONS_FRIENDS_DEFAULT,
                'view_wall_permissions' => PrivacySettings::VIEW_WALL_PERMISSIONS_DEFAULT,
                'view_friends_permissions' => PrivacySettings::VIEW_FRIENDS_PERMISSIONS_DEFAULT,
                'two_factor_auth_enabled' => PrivacySettings::TWO_FACTOR_AUTH_ENABLED_DEFAULT,
                'sms_confirm' => PrivacySettings::SMS_CONFIRM_DEFAULT,
            ]
        );
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function linkedSocialAccounts()
    {
        return $this->hasMany(LinkedSocialAccount::class);
    }

    public function getDateFormat()
    {
        return 'U';
    }

    public function isAdmin()
    {
        return (int) $this->is_admin === 1;
    }

    public function isSuperAdmin()
    {
        return (int) $this->is_admin === 1;
    }
}
