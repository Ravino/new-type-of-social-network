<?php

namespace App\Http\Resources\Video;

use App\Http\Resources\Post\Post;
use App\Http\Resources\User\SimpleUser;
use App\Models\Post as PostModel;
use Illuminate\Http\Resources\Json\ResourceCollection;

class VideoCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'list' => $this->collection->map(function ($video) {
                if($video->creatableby instanceof PostModel) {
                    return [
                        'id' => $video->id,
                        'link' => $video->link,
                        'user' => new SimpleUser($video->user),
                        'post' => new Post($video->creatableby),
                        'createdAt' => $video->created_at,
                    ];
                }
            }),
        ];
    }
}
