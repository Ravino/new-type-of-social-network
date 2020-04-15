<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Http\Resources\Post\Post as PostResource;
use App\Http\Requests\Post\Post as PostRequest;
use App\Http\Resources\Post\PostCollection;
use App\Models\Community;
use App\Models\Post;
use App\Models\User;
use App\Notifications\UserSystemNotifications;
use Illuminate\Support\Facades\Notification;

class PostController extends Controller
{

    /**
     * @return PostCollection
     */
    public function index() {
        return new PostCollection(\Auth::user()->posts, false);
    }

    /**
     * @return PostCollection
     */
    public function myPosts() {
        return new PostCollection(\Auth::user()->allPosts);
    }

    /**
     * @param $id
     * @return PostCollection|\Illuminate\Http\JsonResponse
     */
    public function userPosts($id) {
        $user = User::find($id);
        if($user) {
            if($user->canShowWallTo(\Auth::user())) {
                return new PostCollection($user->allPosts);
            }
            return response()->json(['message' => 'Not allowed'], 403);
        }
        return response()->json(['message' => 'Пользователь не найден'], 404);
    }

    /**
     * @param $community_id
     * @return PostCollection|\Illuminate\Http\JsonResponse
     */
    public function communityPosts($community_id) {
        $community = Community::find($community_id);
        if($community) {
            return new PostCollection($community->posts, false);
        }
        return response()->json(['message' => 'Сообщество не найдено'], 404);
    }

    /**
     * @param $id
     * @return PostResource|\Illuminate\Http\JsonResponse
     */
    public function get($id) {
        $post = Post::find($id);
        if($post) {
            return new PostResource($post);
        }
        return response()->json(['message' => 'Пост не найден'], 404);
    }

    /**
     * @param PostRequest $request
     * @return PostResource
     */
    public function storeByUser(PostRequest $request) {
        $post = \Auth::user()->posts()->create([
            'name' => $request->name,
            'body' => $request->body,
        ]);
        $friend_ids = \Auth::user()->getFriends()->pluck('id');
        $friends = User::whereIn('id', $friend_ids)->get();
        $details = [
            'sender' => [
                'firstName' => \Auth::user()->profile->first_name,
                'lastName' => \Auth::user()->profile->last_name,
                'id' => \Auth::user()->id,
                'postId' => $post->id
            ],
            'body' => 'User {0, string} created new post',
            'type' => 'user.post.created',
        ];
        Notification::send($friends, new UserSystemNotifications($details));
        return new PostResource($post);
    }

    /**
     * @param PostRequest $request
     * @param $community_id
     * @return PostResource|\Illuminate\Http\JsonResponse
     */
    public function storeByCommunity(PostRequest $request, $community_id) {
        $community = Community::with('users')->find($community_id);
        if($community) {
            if($community->users->contains(auth()->user()->id)) {
                $post = $community->posts()->create([
                    'name' => $request->name,
                    'body' => $request->body,
                ]);
                $details = [
                    'community' => [
                        'name' => $community->name,
                        'id' => $community->id,
                        'postId' => $post->id
                    ],
                    'body' => 'There is new post in community {0, string}',
                    'type' => 'community.post.created',
                ];
                Notification::send($community->users, new UserSystemNotifications($details));
                return new PostResource($post);
            } else {
                return response()->json(['message' => 'Вы не являетесь участником данного сообщества'], 422);
            }
        }
        return response()->json(['message' => 'Сообщество не найдено'], 404);
    }
}
