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
        return $this->hasMany(PostLike::class, 'post_id', 'id')->where('user_id', \Auth::user()->id);
    }

    public function usersLikes()
    {
        return $this->hasManyThrough(
            User::class,
            PostLike::class,
            'post_id', 'id',
            'id',
            'user_id'
        );
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

    public static function getWithoutOldPosts($user, $limit, $offset)
    {
        $communities = $user->communities()->select('id')->get();
        $friends = DB::table('friendships')
            ->where('sender_id', $user->id)
            ->orWhere('recipient_id', $user->id)
            ->select('id', 'sender_id', 'recipient_id', 'status', 'created_at')
            ->get()
            ->toArray();

        $communitiesPosts = collect();

        foreach($communities as $community) {
            $communitiesPosts->push(Post::where('postable_type', Community::class)
                ->where('postable_id', $community->id)
                ->where('created_at', '>', Carbon::parse($community->pivot->created_at)->timestamp)
                ->pluck('id'));
        }

        $friendsPosts = collect();

        foreach($friends as $friend) {
            if ($friend->status) {
                if ($friend->sender_id !== $user->id) {
                    $friendsPosts->push(Post::where('postable_type', User::class)
                        ->where('postable_id', $friend->sender_id)
                        ->where('created_at', '>', Carbon::parse($friend->created_at)->timestamp)
                        ->pluck('id'));
                }

                if ($friend->recipient_id !== $user->id) {
                    $friendsPosts->push(Post::where('postable_type', User::class)
                        ->where('postable_id', $friend->recipient_id)
                        ->where('created_at', '>', Carbon::parse($friend->created_at)->timestamp)
                        ->pluck('id'));
                }
            }
        }

        $communitiesPosts = $communitiesPosts->collapse();
        $friendsPosts = $friendsPosts->collapse();
        $userPosts = $user->posts()->pluck('id');
        $postsIds = $communitiesPosts->merge($friendsPosts);
        $postsIds = $postsIds->merge($userPosts);

        return Post::whereIn('id', $postsIds)
            ->with(['postable', 'author'])
            ->limit($limit ?? 50)
            ->offset($offset ?? 0)
            ->get();
    }
}
