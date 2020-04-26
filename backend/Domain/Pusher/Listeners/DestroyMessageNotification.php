<?php


namespace Domain\PusherListeners;

use Domain\Pusher\Events\DestroyMessageEvent;
use Domain\Pusher\Events\NewMessageEvent;
use Domain\Pusher\WampServer as Pusher;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class DestroyMessageNotification implements ShouldQueue
{

    use Queueable;

    /**
     * @param DestroyMessageEvent $event
     */
    public function handle(DestroyMessageEvent $event)
    {
        $idsOfUsers = $event->getUsersListIds();
        $body = $event->getMessage();
        foreach ($idsOfUsers as $user_id) {
            $body['userId'] = $user_id->user_id;
            \Log::debug($body);
            Pusher::sentDataToServer(['data' => $body, 'topic_id' => Pusher::channelForUser($user_id->user_id), 'event_type' => 'message.deleted']);
        }
    }
}
