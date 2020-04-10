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
                            'user' => new User($post->postable)
                        ];
                    } else if($post->postable instanceof CommunityModel) {
                        return [
                            'id' => $post->id,
                            'name' => $post->name,
                            'body' => $post->body,
                            'primaryImage' => $post->primary_image,
                            'likes' => $post->likes,
                            'views' => $post->views,
                            'community' => new Community($post->postable)
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
                    ];
                }
            }),
        ];
    }
}
