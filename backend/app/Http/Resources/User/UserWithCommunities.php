<?php

namespace App\Http\Resources\User;

use App\Http\Resources\Community\CommentCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class UserWithCommunities extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'isOnline' => $this->isOnline,
            'communities' => new CommentCollection($this->communities),
            'profile' => new Profile($this->profile)
        ];
    }
}


