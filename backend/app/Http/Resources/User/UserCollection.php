<?php

namespace App\Http\Resources\User;


use App\Http\Resources\PrivacySettings;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'list' => $this->collection->map(function ($user) {
                if(\Auth::user()->id === $user->id) {
                    return [
                        'id' => $user->id,
                        'email' => $user->email,
                        'isOnline' => $user->isOnline,
                        'lastActivity' => $user->last_activity_dt,
                        'profile' => new Profile($user->profile),
                        'privacySettings' => new PrivacySettings($user->privacySettings)
                    ];
                } else {
                    return [
                        'id' => $user->id,
                        'isOnline' => $user->isOnline,
                        'lastActivity' => $user->last_activity_dt,
                        'profile' => new Profile($user->profile),
                        'mutualFriendsCount' => $user->mutual_count
                    ];
                }
            }),
        ];
    }
}


