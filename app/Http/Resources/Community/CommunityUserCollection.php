<?php

namespace App\Http\Resources\Community;

use App\Http\Resources\User\Profile;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CommunityUserCollection extends ResourceCollection
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
            'list' => $this->collection->map(function($user) {
                return [
                    'id' => $user->id,
                    'email' => $user->email,
                    'role' => $user->pivot->role,
                    'users' => new Profile($user->profile)
                ];
            }),
        ];
    }
}
