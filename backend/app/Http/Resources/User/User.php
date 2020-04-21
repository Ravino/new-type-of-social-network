<?php

namespace App\Http\Resources\User;


use App\Http\Resources\PrivacySettings;
use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        if(\Auth::user()->id === $this->id) {
            return [
                'id' => $this->id,
                'email' => $this->email,
                'isOnline' => $this->isOnline,
                'lastActivity' => $this->last_activity_dt,
                'profile' => new Profile($this->profile),
                'privacySettings' => new PrivacySettings($this->privacySettings),
                'stats' => [
                    'notificationsCount' => $this->notificationsCount,
                    'unreadMessagesCount' => $this->unreadMessagesCount,
                    'pendingFriendshipRequestsCount' => $this->pendingFriendshipRequestsCount,
                    'totalFriendsCount' => $this->totalFriendsCount,
                ]
            ];
        } else {
            return [
                'id' => $this->id,
                'isOnline' => $this->isOnline,
                'lastActivity' => $this->last_activity_dt,
                'profile' => new Profile($this->profile),
                'mutualFriendsCount' => $this->mutualFriendsCount
            ];
        }
    }
}


