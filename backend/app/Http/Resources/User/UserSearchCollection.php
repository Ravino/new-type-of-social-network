<?php

namespace App\Http\Resources\User;


use App\Http\Resources\PrivacySettings;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserSearchCollection extends ResourceCollection
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
                return [
                    'id' => $user->id,
                    'lastActivity' => $user->last_activity_dt,
                    'isOnline' => $this->isOnline($user),
                    'profile' => new Profile($user->profile)
                ];
            }),
        ];
    }

    public function isOnline($user): bool
    {
        $period = config('user_activity_margin');
        return $user->last_activity_dt > strtotime("-$period minutes");
    }
}


