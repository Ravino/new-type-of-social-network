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
     * @return string
     */
    public function getDateFormat()
    {
        return 'U';
    }
}
