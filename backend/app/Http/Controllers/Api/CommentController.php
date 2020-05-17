<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\Comment\CommentCollection;
use App\Models\Comment;
use App\Http\Resources\Comment\Comment as CommentResource;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    /**
     * @param Request $request
     * @return CommentResource
     */
    public function commentPost(Request $request) {
        $comment_id = Comment::insertGetId([
            'body' => $request->get('body'),
            'author_id' => \Auth::user()->id,
            'commentable_id' => $request->get('postId'),
            'commentable_type' => Post::class,
            'reply_on' => $request->get('replyOn'),
            'created_at' => time(),
            'updated_at' => time(),
        ]);
        $comment = Comment::with('author')->find($comment_id);
        return new CommentResource($comment);
    }

    /**
     * @param Request $request
     * @param $id
     * @return CommentCollection
     */
    public function getPostComments(Request $request, $id) {
        $comments = Post::find($id)->comments()->with('author', 'author.profile', 'author.profile.avatar')->get();
        return new CommentCollection($comments);
    }
}
