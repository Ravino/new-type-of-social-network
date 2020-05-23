<?php

namespace App\Http\Resources\User;


use App\Http\Resources\PrivacySettings;
use Domain\Neo4j\Service\UserService;
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
                'isOwner' => true,
                'isOnline' => $this->isOnline,
                'lastActivity' => $this->last_activity_dt,
                'profile' => new Profile($this->profile),
                'privacySettings' => new PrivacySettings($this->privacySettings),
                'stats' => [
                    'notificationsCount' => $this->notificationsCount,
                    'unreadMessagesCount' => $this->unreadMessagesCount,
                    'pendingFriendshipRequestsCount' => $this->pendingFriendshipRequestsCount,
                    'totalFriendsCount' => $this->totalFriendsCount,
                    'followCount' => (new UserService())->followCount($this->id),
                    'isFollow' => $this->isFollow,
                    'isFriend' => $this->isFriendWith(auth()->user()),
                ],
            ];
        }

        if($this->appendMutual) {
            return [
                'id' => $this->id,
                'isOwner' => false,
                'isOnline' => $this->isOnline,
                'lastActivity' => $this->last_activity_dt,
                'profile' => new Profile($this->profile),
                'mutualFriendsCount' => (int)$this->profile->mutual,
                'stats' => [
                    'followCount' => (new UserService())->followCount($this->id),
                    'isFollow' => $this->isFollow,
                    'isFriend' => $this->isFriendWith(auth()->user()),
                ],
            ];
        }

        return [
            'id' => $this->id,
            'isOwner' => false,
            'isOnline' => $this->isOnline,
            'lastActivity' => $this->last_activity_dt,
            'profile' => new Profile($this->profile),
            'stats' => [
                'followCount' => (new UserService())->followCount($this->id),
                'isFollow' => $this->isFollow,
                'isFriend' => $this->isFriendWith(auth()->user()),
            ],
        ];
    }
}


