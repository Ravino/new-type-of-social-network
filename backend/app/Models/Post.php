<?php

namespace App\Models;

use App\Traits\Likeable;
use App\Traits\Commentable;
use Domain\Pusher\Models\ChatMessage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Spiritix\LadaCache\Database\LadaCacheTrait;

class Post extends Model
{
    use SoftDeletes, LadaCacheTrait, Likeable, Commentable;

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
        return $this->hasMany(Like::class, 'likeable_id', 'id')
            ->where('user_id', \Auth::user()->id);
    }

    public function usersLikes()
    {
        return $this->hasManyThrough(
            User::class,
            Like::class,
            'likeable_id',
            'id',
            'id',
            'user_id'
        );
    }

    public function video()
    {
        return $this->morphOne(Video::class, 'creatableby');
    }

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id', 'id');
    }

    /**
     * @return string
     */
    public function getDateFormat()
    {
        return 'U';
    }

    public static function getWithoutOldPosts($user, $limit, $offset, $isMyPosts = false)
    {
        if ($isMyPosts) {
            $userPosts = $user->posts()->pluck('id');

            return Post::whereIn('id', $userPosts)
                ->with(['postable', 'author', 'usersLikes' => function ($query) {
                    return $query->limit(8)->get();
                }, 'parent' => function ($query) {
                    return $query->withTrashed()->get();
                }])->withCount('comments')->withCount('children')
                ->limit($limit ?? 20)
                ->offset($offset ?? 0)
                ->orderBy('id', 'desc')
                ->get();
        }

        $communities = $user->communities()->select('id')->get();
        $friends = DB::table('friendships')
            ->where('sender_id', $user->id)
            ->orWhere('recipient_id', $user->id)
            ->select('id', 'sender_id', 'recipient_id', 'status', 'created_at')
            ->get()
            ->toArray();

        $posts = self::with(['attachments', 'postable', 'author', 'usersLikes' => function ($query) {
            return $query->limit(8)->get();
        }, 'parent' => function ($query) {
            return $query->withTrashed()->get();
        }])->withCount('comments')->withCount('children');

        foreach($friends as $friend) {
            if ($friend->status) {
                if ($friend->sender_id !== $user->id) {
                    $posts->orWhere('postable_type', User::class)
                        ->where('postable_id', $friend->sender_id)
                        ->where('created_at', '>', Carbon::parse($friend->created_at)->timestamp);
                }

                if ($friend->recipient_id !== $user->id) {
                    $posts->orWhere('postable_type', User::class)
                        ->where('postable_id', $friend->recipient_id)
                        ->where('created_at', '>', Carbon::parse($friend->created_at)->timestamp);
                }
            }
        }

        foreach($communities as $community) {
            $posts->orWhere('postable_type', Community::class)
                ->where('postable_id', $community->id)
                ->where('created_at', '>', Carbon::parse($community->pivot->created_at)->timestamp);
        }
        $posts->orWhere('postable_type', User::class)
            ->where('postable_id', \Auth::user()->id);

        return $posts
            ->limit($limit ?? 20)
            ->offset($offset ?? 0)
            ->orderBy('id', 'desc')
            ->get();
    }
}
