<?php


namespace Domain\Pusher\Repositories;


use Domain\Pusher\Http\Resources\Message\MessageCollection;
use Domain\Pusher\Models\ChatMessage;
use Domain\Pusher\Http\Resources\Message\Message as MessageResource;

class MessageRepository
{

    /**
     * Сохраняет сообщениие
     *
     * @param string $chat_id
     * @param string $body
     * @param string $author_id
     * @param string|null $parent_id
     * @param string|null $parent_chat_id
     * @return string
     */
    public function saveInChatById(string $chat_id, string $body, string $author_id, string $parent_id = null, string $parent_chat_id = null) : string
    {
        return ChatMessage::create([
                'chat_id' => $chat_id,
                'body' => $body,
                'user_id' => $author_id,
                'parent_id' => $parent_id,
                'parent_chat_id' => $parent_chat_id,
            ])->id;
    }

    /**
     * Возвращает список сообщений в чате.
     *
     * @param string $chat_id
     * @param string|null $user_id
     * @return MessageCollection
     */
    public function getAllOfChatById(string $chat_id, string $user_id = null)
    {
        $items = ChatMessage::with('user', 'attachments')->where('chat_id', $chat_id)
            ->orderBy('created_at', 'asc')
            ->get();
        return new MessageCollection($items, $user_id);
    }


    /**
     * Возвращает сообщение
     *
     * @param string $message_id
     * @return MessageResource
     */
    public function getMessageById(string $message_id, $user_id = null)
    {
        $item = ChatMessage::with('user')->find($message_id);
        if($item) {
            return new MessageResource($item, $user_id ? $user_id :\Auth::user()->id);
        }
        return null;
    }

    /**
     * @param string $message_id
     * @return bool
     */
    public function destroyMessage(string $message_id) {
        ChatMessage::destroy($message_id);
        return true;
    }
}
