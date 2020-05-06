<?php

namespace App\Http\Resources\User;


use App\Http\Resources\PrivacySettings;
use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{

    public $appendMutual;

    public function __construct($resource, $appendMutual = true)
    {
        parent::__construct($resource);
        $this->appendMutual = $appendMutual;
    }

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
            if($this->appendMutual) {
                return [
                    'id' => $this->id,
                    'uuid' => $this->uuid,
                    'isOnline' => $this->isOnline,
                    'lastActivity' => $this->last_activity_dt,
                    'profile' => new Profile($this->profile),
                    'mutualFriendsCount' => (int)$this->profile->mutual
                ];
            } else {
                return [
                    'id' => $this->id,
                    'uuid' => $this->uuid,
                    'isOnline' => $this->isOnline,
                    'lastActivity' => $this->last_activity_dt,
                    'profile' => new Profile($this->profile),
                ];
            }
        }
    }
}


