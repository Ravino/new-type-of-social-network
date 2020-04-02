<?php


namespace Domain\Pusher\Repositories;


use Domain\Pusher\Models\Message;

class MessageRepository
{

    /**
     * Сохраняет сообщениие
     * @param int $chat_id
     * @param string $body
     * @param int $author_id
     * @return int
     */
    public function saveInChatById(int $chat_id, string $body, int $author_id) : int
    {
        return \DB::table('chat_messages')->insertGetId(
            ['chat_id' => $chat_id, 'body' => $body, 'user_id' => $author_id, 'created_at' => time(), 'updated_at' => time()]
        );
    }

    /**
     * Возвращает список сообщений в чате.
     * @param int $chat_id
     * @param int $user_id
     * @return array
     */
    public function getAllOfChatById(int $chat_id, int $user_id = null):array
    {
        $items = \DB::table('chat_messages')
            ->join('profiles', 'profiles.user_id', '=', 'chat_messages.user_id')
            ->join('chat_message_status', 'chat_message_status.message_id', '=', 'chat_messages.id')
            ->where('chat_messages.chat_id', '=', $chat_id)
            ->orderBy('chat_messages.id')
            ->get([
                'chat_messages.id',
                'chat_messages.user_id',
                'profiles.firstname',
                'profiles.lastname',
                'chat_messages.body',
                'chat_message_status.is_read',
                'chat_messages.created_at',
                'chat_messages.updated_at'
            ])->toArray();

        $collection = [];
        foreach ($items as $item){
            $message = new Message();
            $message->id = $item->id;
            $message->firstName = $item->firstname;
            $message->lastName = $item->lastname;
            $message->body = $item->body;
            $message->isMine = ($item->user_id == $user_id);
            $message->isRead = $item->is_read;
            $message->isEdited = false;
            $message->createdAt = $item->created_at;
            $message->updatedAt = $item->updated_at;
            $collection[] = $message;
        }

        return $collection;
    }
}
