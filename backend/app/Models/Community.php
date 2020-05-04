<?php

namespace App\Models;

use App\CommunityMember;
use App\Traits\NPerGroup;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{

    use NPerGroup;

    const ROLE_USER = 'user';
    const ROLE_ADMIN = 'admin';
    const ROLE_AUTHOR = 'author';

    protected $fillable = [
        'name', 'description', 'notice', 'primary_image', 'url', 'website', 'location', 'is_verified'
    ];

    protected $with = ['role'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
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
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function members()
    {
        return $this->hasMany(CommunityMember::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function authors()
    {
        return $this->belongsToMany(User::class, 'community_members')->withPivot(['role'])->wherePivot('role', Community::ROLE_AUTHOR);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function admins()
    {
        return $this->belongsToMany(User::class, 'community_members')->withPivot(['role'])->wherePivot('role', Community::ROLE_ADMIN);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function role()
    {
        return $this->hasOne(CommunityMember::class)->where('community_members.user_id', \Auth::user()->id);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function posts()
    {
        return $this->morphMany(Post::class, 'postable');
    }

    /**
     * @return string
     */
    public function getDateFormat()
    {
        return 'U';
    }
}
