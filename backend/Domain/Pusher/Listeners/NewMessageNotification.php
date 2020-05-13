<?php


namespace Domain\PusherListeners;

use Domain\Pusher\Events\NewMessageEvent;
use Domain\Pusher\Repositories\ChatRepository;
use Domain\Pusher\Repositories\MessageRepository;
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
        $chatRepo = new ChatRepository();
        $messageRepo = new MessageRepository();
        $author_id = $event->getAuthorId();
        $message_id = $event->getMessageId();
        $chat_id = $event->getChatId();
        $users_list = $chatRepo->getUsersIdListFromChat($chat_id, $author_id);
        $message = $messageRepo->getMessageById($message_id);
        foreach ($users_list as $user_id) {
            $message = json_decode(json_encode($message), true);
            $message['isMine'] = false;
            Pusher::sentDataToServer(['data' => $message, 'topic_id' => Pusher::channelForUser($user_id), 'event_type' => 'message.new']);
        }
    }
}
