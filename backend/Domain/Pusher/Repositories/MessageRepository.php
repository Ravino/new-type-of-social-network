<?php


namespace Domain\Pusher\Repositories;


use Carbon\Carbon;
use Domain\Pusher\DTOs\Message;
use Domain\Pusher\Http\Resources\Message\MessageCollection;
use Domain\Pusher\Models\ChatMessage;

class MessageRepository
{

    /**
     * Сохраняет сообщениие
     *
     * @param int $chat_id
     * @param string $body
     * @param int $author_id
     * @param int|null $parent_id
     * @param int|null $parent_chat_id
     * @return int
     */
    public function saveInChatById(int $chat_id, string $body, int $author_id, int $parent_id = null, int $parent_chat_id = null) : int
    {
        return \DB::table('chat_messages')->insertGetId([
                'chat_id' => $chat_id,
                'body' => $body,
                'user_id' => $author_id,
                'parent_id' => $parent_id,
                'parent_chat_id' => $parent_chat_id,
                'created_at' => time(),
                'updated_at' => time()
            ]);
    }

    /**
     * Возвращает список сообщений в чате.
     *
     * @param int $chat_id
     * @param int|null $user_id
     * @return MessageCollection
     */
    public function getAllOfChatById(int $chat_id, int $user_id = null)
    {
        $items = ChatMessage::with('parent')->where('chat_id', $chat_id)
            ->join('profiles', 'profiles.user_id', '=', 'chat_messages.user_id')
            ->leftJoin('chat_message_status', 'chat_message_status.message_id', '=', 'chat_messages.id')
            ->orderBy('chat_messages.id')
            ->get();

        return new MessageCollection($items, $user_id);
    }


    // TODO: Нужно будет зарефакторить и убрать дублирование
    /**
     * Возвращает сообщение
     *
     * @param int $message_id
     * @return Message
     */
    public function getMessageById(int $message_id)
    {
        $item = \DB::table('chat_messages')
            ->join('profiles', 'profiles.user_id', '=', 'chat_messages.user_id')
            ->leftJoin('chat_message_status', 'chat_message_status.message_id', '=', 'chat_messages.id')
            ->where('chat_messages.id', '=', $message_id)
            ->orderBy('chat_messages.id')
            ->get([
                'chat_messages.id',
                'chat_messages.user_id',
                'profiles.first_name',
                'profiles.last_name',
                'chat_messages.body',
                'chat_message_status.is_read',
                'chat_messages.created_at',
                'chat_messages.updated_at',
                'chat_messages.chat_id'
            ])->first();

        $message = new Message();
        $message->id = $item->id;
        $message->firstName = $item->first_name;
        $message->lastName = $item->last_name;
        $message->chatId = $item->chat_id;
        $message->userPic = 'https://habrastorage.org/storage2/b92/bcf/532/b92bcf532c0a2889272ffd72ffb1f2b5.png';
        $message->body = $item->body;
        $message->isMine = false;
        $message->isRead = $item->is_read;
        $message->isEdited = false;
        $message->createdAt = $item->created_at;
        $message->updatedAt = $item->updated_at;

        return $message;
    }
}
