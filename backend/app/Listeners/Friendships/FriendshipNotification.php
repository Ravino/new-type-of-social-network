<?php


namespace App\Listeners\Friendships;

use App\Notifications\UserSystemNotifications;

class FriendshipNotification
{

    /**
     * @param $event
     * @param $users
     */
    public function handle($event, $users)
    {
        [$sender, $recipient] = $users;

        $details = [
            'sender' => [
                'firstName' => $sender->profile->first_name,
                'lastName' => $sender->profile->last_name,
                'id' => $sender->id
            ],
            'body' => 'User {0, string} sent you friend request',
            'type' => $event,
        ];
        $recipient->notify(new UserSystemNotifications($details));
    }
}
