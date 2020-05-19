<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;

class LikeController extends Controller
{
    public function likePost(Request $request)
    {
        $isExistLike = Like::where('user_id', \Auth::user()->id)
            ->where('likeable_type', Post::class)
            ->where('likeable_id', $request->postId)
            ->exists();
        if (!$isExistLike) {
            Like::create([
                'user_id' => \Auth::user()->id,
                'likeable_type' => Post::class,
                'likeable_id' => $request->postId,
            ]);
            Event::dispatch('post.liked', ['post_id' => $request->postId, 'user_id' => \Auth::user()->id]);

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
}
