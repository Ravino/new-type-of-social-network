<?php

namespace App\Http\Resources\Video;

use App\Http\Resources\Post\Post;
use App\Http\Resources\User\SimpleUser;
use App\Models\Post as PostModel;
use Illuminate\Http\Resources\Json\ResourceCollection;

class VideoCollection extends ResourceCollection
{
    /**
     * @var bool
     */
    private $onlyVideoData;

    /**
     * VideoCollection constructor.
     * @param $resource
     * @param $onlyVideoData
     */
    public function __construct($resource, $onlyVideoData = false)
    {
        $this->onlyVideoData = $onlyVideoData;
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
        $onlyVideoData = $this->onlyVideoData;
        return [
            'list' => $this->collection->map(static function ($video) use ($onlyVideoData) {
                if ($onlyVideoData) {
                    return [
                        'id' => $video->id,
                        'link' => $video->link,
                        'createdAt' => $video->created_at,
                    ];
                }

                if($video->creatableby instanceof PostModel) {
                    return [
                        'id' => $video->id,
                        'link' => $video->link,
                        'user' => new SimpleUser($video->user),
                        'post' => new Post($video->creatableby),
                        'createdAt' => $video->created_at,
                    ];
                } else {
                    return [
                        'id' => $video->id,
                        'link' => $video->link,
                        'user' => new SimpleUser($video->user),
                        'createdAt' => $video->created_at,
                    ];
                }
            }),
        ];
    }
}
