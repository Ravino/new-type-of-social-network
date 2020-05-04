<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\UploadFileRequest;
use App\Http\Resources\Post\AttachmentsCollection;
use App\Http\Resources\Post\Post as PostResource;
use App\Http\Requests\Post\Post as PostRequest;
use App\Http\Resources\Post\PostCollection;
use App\Models\Community;
use App\Models\Post;
use App\Models\PostAttachment;
use App\Models\PostLike;
use App\Models\User;
use App\Notifications\UserSystemNotifications;
use App\Services\S3UploadService;
use Illuminate\Support\Facades\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;

class PostController extends Controller
{

    public $uploadService;

    public function __construct(S3UploadService $uploadService)
    {
        $this->uploadService = $uploadService;
    }

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
        return new PostCollection($user->allPosts);
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
            'author_id' => \Auth::user()->id
        ]);
        if(isset($request->attachmentIds) && count($request->attachmentIds)) {
            PostAttachment::whereIn('id', $request->attachmentIds)->update(['post_id' => $post->id]);
        }
        Event::dispatch('user.post.created', ['user_id' => \Auth::user()->id, 'post' => $post]);
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
                    'author_id' => \Auth::user()->id
                ]);
                if(isset($request->attachmentIds) && count($request->attachmentIds)) {
                    PostAttachment::whereIn('id', $request->attachmentIds)->update(['post_id' => $post->id]);
                }
                Event::dispatch('community.post.created', ['community' => $community, 'post' => $post]);
                return new PostResource($post);
            } else {
                return response()->json(['message' => 'Вы не являетесь участником данного сообщества'], 422);
            }
        }
        return response()->json(['message' => 'Сообщество не найдено'], 404);
    }

    /**
     * @param Request $request
     * @return PostResource
     */
    public function addToMyPosts(Request $request)
    {
        $post = Post::find($request->id);
        $my_post = $post->replicate();
        $my_post->postable_type = User::class;
        $my_post->postable_id = \Auth::user()->id;
        $my_post->parent_id = $post->id;
        $my_post->save();
        return new PostResource($my_post);
    }

    /**
     * @param UploadFileRequest $request
     * @return AttachmentsCollection
     */
    public function uploadAttachments(UploadFileRequest $request) {
        $attachment_ids = $this->uploadService->uploadFiles(new PostAttachment(), 'post/attachments', $request->allFiles());
        $attachments = PostAttachment::whereIn('id', $attachment_ids)->get();
        return new AttachmentsCollection($attachments);
    }

    /**
     * @param $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function rate(Request $request) {
        if(!PostLike::where('user_id', \Auth::user()->id)->where('post_id', $request->postId)->exists()) {
            PostLike::create([
                'user_id' => \Auth::user()->id,
                'post_id' => $request->postId,
            ]);
            Event::dispatch('post.liked', ['post_id' => $request->postId, 'user_id' => \Auth::user()->id]);
            return response()->json(['message' => 'Вы успешно оценили данную запись'], 200);
        } else {
            PostLike::where('user_id', \Auth::user()->id)->where('post_id', $request->postId)->first()->delete();
            return response()->json(['message' => 'Вы успешно сняли свою оценку с данной записи'], 200);
        }
    }

    /**
     * @param Post $post
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function delete(Post $post)
    {
        $user_post = \Auth::user()->posts()->where('id', $post->id)->get();

        if ($user_post) {
            $post->delete();

            return response()->json([
                'message' => 'Вы успешно удалили запись.',
            ]);
        }

        return response()->json([
            'message' => 'Запись не найдена.',
        ]);
    }

    /**
     * @param Post $post
     * @param PostAttachment $postAttachment
     * @return PostResource|\Illuminate\Http\JsonResponse
     */
    public function deleteImage(Post $post, PostAttachment $postAttachment)
    {
        $user_post = \Auth::user()->posts()->where('id', $post->id)->get();

        if ($user_post) {
            $post->attachments()->where('id', $postAttachment->id)->delete();

            return new PostResource($post);
        }

        return response()->json([
            'message' => 'Запись не найдена.',
        ], 404);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore($id)
    {
        $user_post = \Auth::user()->posts()->where('id', $id)->restore();

        if ($user_post) {
            return response()->json([
                'message' => 'Вы успешно восстановили запись.',
            ]);
        }

        return response()->json([
            'message' => 'Запись не найдена.',
        ], 404);
    }

    /**
     * @param Request $request
     * @param $id
     * @return PostResource|\Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $user_post = \Auth::user()->posts()->where('id', $id)->first();

        if ($user_post) {
            $user_post->update(['body' => $request->body]);
            PostAttachment::whereIn('id', $request->attachmentIds)->update(['post_id' => $user_post->id]);

            return new PostResource($user_post);
        }

        return response()->json([
            'message' => 'Запись не найдена.',
        ], 404);
    }
}
