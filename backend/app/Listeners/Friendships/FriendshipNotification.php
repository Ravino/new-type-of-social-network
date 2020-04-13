<?php


namespace App\Listeners\Friendships;

use App\Models\Notification;
use App\Models\User;
use Log;

class FriendshipNotification
{

    /**
     * @param $event
     * @param $users
     */
    public function handle($event, $users)
    {
        [$sender, $recipient] = $users;
        Notification::create([
            'sender_id' => $sender->id,
            'recipient_id' => $recipient->id,
            'action' => $event,
            'created_at' => time(),
            'updated_at' => time()
        ]);
    }
}
