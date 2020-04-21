<?php

namespace App\Http\Resources\Post;

use App\Http\Resources\Community\Community;
use App\Http\Resources\User\User;
use App\Models\User as UserModel;
use App\Models\Community as CommunityModel;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AttachmentsCollection extends ResourceCollection
{

    /**
     * AttachmentsCollection constructor.
     * @param $resource
     */
    public function __construct($resource)
    {
        parent::__construct($resource);
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'list' => $this->collection->map(function ($attachment) {
                return [
                    'id' => $attachment->id,
                    'originalName' => $attachment->original_name,
                    'url' => $attachment->s3Url,
                    'mimeType' => $attachment->mime_type,
                    'size' => $attachment->size,
                ];
            })
        ];
    }
}
