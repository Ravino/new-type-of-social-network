<?php

namespace App\Models;

use Domain\Pusher\Models\ChatMessage;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

    protected $fillable = [
        'name', 'body', 'likes', 'views'
    ];

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function postable() {
        return $this->morphTo();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function parent() {
        return $this->hasOne( Post::class, 'id', 'parent_id' );
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function attachments() {
        return $this->hasMany(PostAttachment::class, 'post_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function like() {
        return $this->hasMany(PostLike::class, 'post_id', 'id')->where('user_id', \Auth::user()->id);
    }

    /**
     * @return string
     */
    public function getDateFormat()
    {
        return 'U';
    }
}
