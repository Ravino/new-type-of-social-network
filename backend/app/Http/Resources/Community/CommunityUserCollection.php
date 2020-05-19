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
                    'isOnline' => $user->isOnline,
                    'role' => $user->pivot ? $user->pivot->role : null,
                    'profile' => new Profile($user->profile)
                ];
            }),
        ];
    }
}
