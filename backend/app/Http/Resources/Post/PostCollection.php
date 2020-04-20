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
                            'primaryImage' => [
                                'https://picsum.photos/200/300?grayscale',
                                'https://picsum.photos/200/300?abstract',
                                'https://picsum.photos/200/300?transport',
                                'https://picsum.photos/200/300?technics',
                                'https://picsum.photos/200/300?cats',
                            ],
                            'likes' => $post->likes,
                            'views' => $post->views,
                            'sharesCount' => 25,
                            'commentsCount' => 48,
                            'user' => new User($post->postable),
                            'createdAt' => $post->created_at,
                            'sharedFrom' => new PostWithoutParent($post->parent),
                        ];
                    } else if($post->postable instanceof CommunityModel) {
                        return [
                            'id' => $post->id,
                            'name' => $post->name,
                            'body' => $post->body,
                            'primaryImage' => [
                                'https://picsum.photos/200/300?fashion',
                                'https://picsum.photos/200/300?business',
                                'https://picsum.photos/200/300?city',
                                'https://picsum.photos/200/300?nature',
                                'https://picsum.photos/200/300?grayscale',
                            ],
                            'likes' => $post->likes,
                            'views' => $post->views,
                            'sharesCount' => 25,
                            'commentsCount' => 48,
                            'community' => new Community($post->postable),
                            'createdAt' => $post->created_at,
                            'sharedFrom' => new PostWithoutParent($post->parent),
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
                        'sharedFrom' => new PostWithoutParent($post->parent),
                    ];
                }
            }),
        ];
    }
}
