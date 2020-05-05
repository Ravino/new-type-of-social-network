<?php


namespace Domain\PusherListeners;

use Domain\Pusher\Events\NewMessageEvent;
use Domain\Pusher\WampServer as Pusher;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewMessageNotification implements ShouldQueue
{

    use Queueable;

    /**
     * @param NewMessageEvent $event рассылка сообщений
     */
    public function handle(NewMessageEvent $event)
    {
        $idsOfUsers = $event->getUsersListIds();
        $body = $event->getMessage();
        foreach ($idsOfUsers as $user_id) {
            $body = json_decode(json_encode($body), true);
            $body['isMine'] = false;
            Pusher::sentDataToServer(['data' => $body, 'topic_id' => Pusher::channelForUser($user_id), 'event_type' => 'message.new']);
        }
    }
}
