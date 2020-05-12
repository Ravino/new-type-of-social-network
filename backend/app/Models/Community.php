<?php

namespace App\Models;

use App\CommunityMember;
use App\Traits\NPerGroup;
use Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spiritix\LadaCache\Database\LadaCacheTrait;

class Community extends Model
{
    use LadaCacheTrait;

    const ROLE_USER = 'user';
    const ROLE_ADMIN = 'admin';
    const ROLE_AUTHOR = 'author';

    public const PRIVACY_OPEN = 1;
    public const PRIVACY_CLOSED = 2;
    public const PRIVACY_PRIVATE = 3;

    public const TYPE_BUSINESS = 1;
    public const TYPE_THEMES = 2;
    public const TYPE_BRAND = 3;
    public const TYPE_INTEREST_GROUP = 4;
    public const TYPE_PUBLIC_PAGE = 5;
    public const TYPE_EVENT = 6;

    protected $fillable = [
        'name', 'description', 'notice', 'primary_image', 'url', 'website', 'location', 'is_verified', 'type', 'theme_id', 'privacy',
    ];

    protected $with = ['role'];

    /**
     * @return BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'community_members')->withPivot(['role']);
    }

    public function onlyFiveMembers()
    {
        return $this->users()->take(5);
    }

    /**
     * @return HasMany
     */
    public function members()
    {
        return $this->hasMany(CommunityMember::class);
    }

    /**
     * @return BelongsToMany
     */
    public function authors()
    {
        return $this->belongsToMany(User::class, 'community_members')->withPivot(['role'])->wherePivot('role', self::ROLE_AUTHOR);
    }

    /**
     * @return BelongsToMany
     */
    public function admins()
    {
        return $this->belongsToMany(User::class, 'community_members')->withPivot(['role'])->wherePivot('role', self::ROLE_ADMIN);
    }

    /**
     * @return HasOne
     */
    public function role()
    {
        return $this->hasOne(CommunityMember::class)->where('community_members.user_id', Auth::user()->id);
    }

    /**
     * @return BelongsTo
     */
    public function theme()
    {
        return $this->belongsTo(CommunityTheme::class);
    }

    /**
     * @return MorphMany
     */
    public function posts()
    {
        return $this->morphMany(Post::class, 'postable');
    }

    /**
     * @return HasOne
     */
    public function attachment() {
        return $this->hasOne(CommunityAttachment::class);
    }

    /**
     * @return string
     */
    public function getDateFormat()
    {
        return 'U';
    }

    public static function getPrivacyList()
    {
        return [
            self::PRIVACY_OPEN => 'Открытое',
            self::PRIVACY_CLOSED => 'Закрытое',
            self::PRIVACY_PRIVATE => 'Приватное',
        ];
    }

    public static function getTypeList()
    {
        return [
            self::TYPE_BUSINESS => 'Бизнес',
            self::TYPE_THEMES => 'Тематическое сообщество',
            self::TYPE_BRAND => 'Бренд или организация',
            self::TYPE_INTEREST_GROUP => 'Группа по интересам',
            self::TYPE_PUBLIC_PAGE => 'Публичная страница',
            self::TYPE_EVENT => 'Мероприятие',
        ];
    }
}
