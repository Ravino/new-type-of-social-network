<?php

namespace App\Models;

use App\Traits\Commentable;
use Domain\Pusher\Models\ChatMessage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spiritix\LadaCache\Database\LadaCacheTrait;

class Post extends Model
{
    use SoftDeletes, LadaCacheTrait, Commentable;

    protected $fillable = [
        'name', 'body', 'likes', 'views', 'author_id'
    ];

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
        'deleted_at' => 'timestamp',
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
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function author() {
        return $this->hasOne( User::class, 'id', 'author_id' );
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

    public function video()
    {
        return $this->morphOne(Video::class, 'creatableby');
    }

    /**
     * @return string
     */
    public function getDateFormat()
    {
        return 'U';
    }
}
