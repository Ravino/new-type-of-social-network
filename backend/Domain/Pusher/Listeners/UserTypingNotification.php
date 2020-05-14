<?php


namespace Domain\Pusher\Listeners;

use Domain\Pusher\Events\UserTypingEvent;
use Domain\Pusher\WampServer as Pusher;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserTypingNotification implements ShouldQueue
{

    /**
     * @param UserTypingEvent $event
     */
    public function handle(UserTypingEvent $event)
    {
        $idsOfUsers = $event->getUsersListIds();
        $user = $event->getUserTyping();
        \Log::debug($user);
        foreach ($idsOfUsers as $user_id) {
            Pusher::sentDataToServer(['data' => $user, 'chatId' => $event->getChatId(), 'topic_id' => Pusher::channelForUser($user_id), 'event_type' => 'user.typing']);
        }
    }
}
