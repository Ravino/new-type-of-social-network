<?php

namespace App\Models;

use App\CommunityMember;
use App\Models\Rbac\Role;
use App\Models\User\PrivacySettings;
use App\Notifications\ResetPassword as ResetPasswordNotification;
use App\Traits\Friendable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Laratrust\Traits\LaratrustUserTrait;

class User extends Authenticatable implements JWTSubject
{

    use LaratrustUserTrait, Notifiable, Friendable;

    const PERMISSION_ROLE_FOF = 'friendOfFriend';//friend of friend
    const PERMISSION_ROLE_FRIEND = 'friend';
    const PERMISSION_ROLE_GUEST = 'guest';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'token', 'last_activity_dt'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $with = ['profile', 'privacySettings'];

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
        $default = (int) Role::where('flag', Role::FLAG_DEFAULT)->get()->first()->id ?? 0;
        return $this->hasOne(PrivacySettings::class)->withDefault(
            [
                'page_type' => $default,
                'write_messages_permissions' => $default,
                'post_wall_permissions' => $default,
                'view_wall_permissions' => $default,
                'view_friends_permissions' => $default,
                'two_factor_auth_enabled' => PrivacySettings::TWO_FACTOR_AUTH_ENABLED_DEFAULT,
                'sms_confirm' => PrivacySettings::SMS_CONFIRM_DEFAULT,
            ]
        );
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function communities()
    {
        return $this->belongsToMany(Community::class, 'community_members')
            ->using(CommunityMember::class)->withPivot('role');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable')
            ->orderBy('created_at', 'desc');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function posts()
    {
        return $this->morphMany(Post::class, 'postable');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function allPosts()
    {
        return $this->morphMany(Post::class, 'postable')->with('postable')
            ->orWhereIn( 'postable_id', self::communities()->allRelatedIds())
            ->orWhereIn( 'postable_id', self::getFriends()->pluck('id'))->orderBy('posts.id', 'desc');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function linkedSocialAccounts()
    {
        return $this->hasMany(LinkedSocialAccount::class);
    }

    /**
     * @return int
     */
    public function getNotificationsCountAttribute()
    {
        return $this->unreadNotifications()->count();
    }

    /**
     * @return int
     */
    public function getPendingFriendshipRequestsCountAttribute()
    {
        return $this->getFriendRequests()->count();
    }

    /**
     * @return int
     */
    public function getTotalFriendsCountAttribute()
    {
        return $this->getFriends()->count();
    }

    /**
     * @return int
     */
    public function getUnreadMessagesCountAttribute() {
        return \DB::table('chat_message_status')->where('user_id', \Auth::user()->id)->where('is_read', false)->count();
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

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    /**
     * @param User $user
     * @return string
     */
    public function getUserPrivacyRole(User $user)
    {
        if ($this->getFriendsOfFriends()->contains($user)) {
            return Role::where('name', self::PERMISSION_ROLE_FOF)->get()->first();
        }
        if ($this->isFriendWith($user)) {
            return Role::where('name', self::PERMISSION_ROLE_FRIEND)->get()->first();
        }
        return Role::where('name', self::PERMISSION_ROLE_GUEST)->get()->first();
    }
}
