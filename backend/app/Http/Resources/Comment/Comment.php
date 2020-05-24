<?php

namespace App\Http\Resources\Comment;

use App\Http\Resources\User\Image;
use App\Http\Resources\User\SimpleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class Comment extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'body' => $this->body,
            'author' => new SimpleUser($this->author),
            'createdAt' => $this->created_at,
        ];

        return $data;
    }
}
