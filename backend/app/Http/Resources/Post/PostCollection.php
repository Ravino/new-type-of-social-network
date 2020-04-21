<?php

namespace App\Http\Resources\Post;

use App\Http\Resources\Community\Community;
use App\Http\Resources\User\User;
use App\Models\Community as CommunityModel;
use App\Models\User as UserModel;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PostCollection extends ResourceCollection
{

    /**
     * @var boolean
     */
    public $injectRelation;

    public function __construct($resource, $injectRelation = true)
    {
        $this->injectRelation = $injectRelation;
        parent::__construct($resource);
    }

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'list' => $this->collection->map(function ($post) {
                if($this->injectRelation) {
                    if($post->postable instanceof UserModel) {
                        return [
                            'id' => $post->id,
                            'name' => $post->name,
                            'body' => $post->body,
                            'primaryImage' => $post->primary_image,
                            'likes' => $post->likes,
                            'views' => $post->views,
                            'sharesCount' => 25,
                            'commentsCount' => 48,
                            'attachments' => new AttachmentsCollection($post->attachments),
                            'user' => new User($post->postable),
                            'createdAt' => $post->created_at,
                            'sharedFrom' => $post->parent_id ? new PostWithoutParent($post->parent) : null,
                        ];
                    } else if($post->postable instanceof CommunityModel) {
                        return [
                            'id' => $post->id,
                            'name' => $post->name,
                            'body' => $post->body,
                            'primaryImage' => $post->primary_image,
                            'likes' => $post->likes,
                            'views' => $post->views,
                            'sharesCount' => 25,
                            'commentsCount' => 48,
                            'attachments' => new AttachmentsCollection($post->attachments),
                            'community' => new Community($post->postable),
                            'createdAt' => $post->created_at,
                            'sharedFrom' => $post->parent_id ? new PostWithoutParent($post->parent) : null,
                        ];
                    }
                } else {
                    return [
                        'id' => $post->id,
                        'name' => $post->name,
                        'body' => $post->body,
                        'primaryImage' => $post->primary_image,
                        'likes' => $post->likes,
                        'views' => $post->views,
                        'sharesCount' => 25,
                        'commentsCount' => 48,
                        'createdAt' => $post->created_at,
                        'attachments' => new AttachmentsCollection($post->attachments),
                        'sharedFrom' => $post->parent_id ? new PostWithoutParent($post->parent) : null,
                    ];
                }
            }),
        ];
    }
}
