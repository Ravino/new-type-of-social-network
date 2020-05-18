<?php


namespace App\Traits;


use App\Models\Comment;

trait Commentable
{

    /**
     * @return mixed
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable')->with('reply','author', 'author.profile', 'author.profile.avatar');
    }
}
