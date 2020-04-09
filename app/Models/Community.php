<?php

namespace App\Models;

use App\CommunityMember;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{

    const ROLE_USER = 'user';
    const ROLE_ADMIN = 'admin';
    const ROLE_AUTHOR = 'author';

    protected $fillable = [
        'name', 'description', 'notice', 'primary_image', 'url', 'website', 'location', 'is_verified'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'community_members')->withPivot(['role']);
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
     * @return string
     */
    public function getDateFormat()
    {
        return 'U';
    }
}
