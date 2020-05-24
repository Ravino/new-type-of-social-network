<?php

namespace App\Http\Resources\Comment;

use App\Http\Resources\User\Image;
use App\Http\Resources\User\SimpleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class CommentCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'list' => $this->collection->map(function($comment) use ($request) {
                $data = [
                    'id' => $comment->id,
                    'body' => $comment->body,
                    'author' => new SimpleUser($comment->author),
                    'createdAt' => $comment->created_at,
                ];
                return $data;
            }),
        ];
    }
}
