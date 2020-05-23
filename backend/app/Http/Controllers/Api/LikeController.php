<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\SimpleUsers;
use App\Models\Like;
use App\Models\Post;
use App\Models\PostAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;

class LikeController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function likePost(Request $request)
    {
        $isExistLike = Like::where('user_id', \Auth::user()->id)
            ->where('likeable_type', Post::class)
            ->where('likeable_id', $request->postId)
            ->exists();

        if (!$isExistLike) {
            $like = Like::create([
                'user_id' => \Auth::user()->id,
                'likeable_type' => Post::class,
                'likeable_id' => $request->postId,
            ]);

            if ($like->likeable->author_id !== \Auth::user()->id) {
                Event::dispatch('post.liked', ['post_id' => $request->postId, 'user_id' => \Auth::user()->id]);
            }

            return response()->json(['message' => 'Вы успешно оценили данную запись'], 200);
        } else {
            Like::where('user_id', \Auth::user()->id)
                ->where('likeable_type', Post::class)
                ->where('likeable_id', $request->postId)
                ->first()
                ->delete();

            return response()->json(['message' => 'Вы успешно сняли свою оценку с данной записи'], 200);
        }
    }

    /**
     * @param Post $post
     * @param Request $request
     * @return SimpleUsers
     */
    public function getPostUsersLikes(Post $post, Request $request)
    {
        $usersLikes = $post->usersLikes()
            ->limit($request->query('limit') ?? 20)
            ->offset($request->query('offset') ?? 0)
            ->get();

        return new SimpleUsers($usersLikes);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function likePostImage(Request $request)
    {
        $isExistLike = Like::where('user_id', \Auth::user()->id)
            ->where('likeable_type', PostAttachment::class)
            ->where('likeable_id', $request->imageId)
            ->exists();

        if (!$isExistLike) {
            $like = Like::create([
                'user_id' => \Auth::user()->id,
                'likeable_type' => PostAttachment::class,
                'likeable_id' => $request->imageId,
            ]);

            if ($like->likeable->author_id !== \Auth::user()->id) {
                // TODO: если нужно добавить ивент когда пользователь лайкает изображение в посте.
//                Event::dispatch('post.liked', ['post_id' => $request->imageId, 'user_id' => \Auth::user()->id]);
            }

            return response()->json(['message' => 'Вы успешно оценили данное изображение'], 200);
        } else {
            Like::where('user_id', \Auth::user()->id)
                ->where('likeable_type', PostAttachment::class)
                ->where('likeable_id', $request->imageId)
                ->first()
                ->delete();

            return response()->json(['message' => 'Вы успешно сняли свою оценку с данного изображения'], 200);
        }
    }
}
