<?php

namespace App\Models;

use App\Traits\Likeable;
use App\Traits\Commentable;
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
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function like() {
        return $this->morphMany(Like::class, 'likeable')
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
        )->where('likeable_type', Post::class);
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

    public static function getWithoutOldPosts($user, $limit, $offset, $isMyPosts = false, $onlyLiked = false, $orderBy = null)
    {
        $isFriend = $user->isFriendWith(auth()->user());

        if ($user->id !== \Auth::id()) {
            if (($user->privacySettings->page_type === 2 && !$isFriend) ||
                $user->privacySettings->page_type === 3) {
                return [];
            }
        }

        if ($isMyPosts) {
            $userPosts = $user->posts()->pluck('id');

            return Post::whereIn('id', $userPosts)
                ->with(['postable', 'author', 'usersLikes' => function ($query) {
                    return $query->limit(8)->get();
                }, 'parent' => function ($query) {
                    return $query->withTrashed()->get();
                }, 'attachments' => function ($query) {
                    return $query->withCount('comments');
                }])->withCount('comments', 'children')
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
        }, 'attachments' => function ($query) {
            return $query->withCount('comments');
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
        $orderByColumn = $orderBy ?? 'id';

        return $posts
            ->where(function ($query) use ($onlyLiked) {
                if ($onlyLiked) {
                    return $query->where('likes', '>', 0);
                }

                return $query;
            })
            ->limit($limit ?? 20)
            ->offset($offset ?? 0)
            ->orderBy($orderByColumn, 'desc')
            ->get();
    }

    /**
     * @param null|User $user
     * @return bool
     */
    public function userHasAccess($user = null)
    {
        $user = $user ?: auth()->user();
        if ($this->postable instanceof Community) {
            $role = $this->postable->role;
            return $role && in_array($role->role, [Community::ROLE_ADMIN, Community::ROLE_AUTHOR], true);
        }

        return $this->author_id === $user->id;
    }
}
