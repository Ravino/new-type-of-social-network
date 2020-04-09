<?php


namespace Domain\PusherListeners;

use Domain\Pusher\Events\NewMessageEvent;
use Domain\Pusher\WampServer as Pusher;

class NewMessageNotification
{

    /**
     * @param NewMessageEvent $event рассылка сообщений
     */
    public function handle(NewMessageEvent $event)
    {
        $idsOfUsers = $event->getUsersListIds();
        $body = $event->getMessage();
        foreach ($idsOfUsers as $user_id) {
            Pusher::sentDataToServer(['data' => $body, 'topic_id' => Pusher::channelForUser($user_id->user_id)]);
        }
    }
}
