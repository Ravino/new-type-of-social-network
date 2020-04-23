<?php


namespace Domain\Pusher\Repositories;


use Carbon\Carbon;
use Domain\Pusher\DTOs\Message;
use Domain\Pusher\Http\Resources\Chat\ChatCollection;
use Domain\Pusher\Http\Resources\Message\MessageCollection;
use Domain\Pusher\Models\ChatMessage;
use Domain\Pusher\Http\Resources\Message\Message as MessageResource;

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
        $items = ChatMessage::with('parent', 'attachments')->where('chat_id', $chat_id)->whereNull('deleted_at')
            ->join('profiles', 'profiles.user_id', '=', 'chat_messages.user_id')
            ->leftJoin('chat_message_status', 'chat_message_status.message_id', '=', 'chat_messages.id')
            ->orderBy('chat_messages.id')
            ->get([
                'profiles.*',
                'chat_messages.*',
            ]);

        return new MessageCollection($items, $user_id);
    }


    /**
     * Возвращает сообщение
     *
     * @param int $message_id
     * @return MessageResource
     */
    public function getMessageById(int $message_id)
    {
        $item = ChatMessage::with('parent', 'attachments')->where('id', $message_id)->whereNull('deleted_at')
            ->join('profiles', 'profiles.user_id', '=', 'chat_messages.user_id')
            ->leftJoin('chat_message_status', 'chat_message_status.message_id', '=', 'chat_messages.id')
            ->orderBy('chat_messages.id')
            ->get([
                'profiles.*',
                'chat_messages.*',
            ])->first();
        if($item) {
            return new MessageResource($item, \Auth::user()->id);
        }
        return null;
    }

    /**
     * Возвращает сообщение
     *
     * @param int $message_id
     * @return MessageResource
     */
    public function getMessageByIdInclDeleted(int $message_id)
    {
        $item = ChatMessage::with('parent', 'attachments')->where('id', $message_id)
            ->join('profiles', 'profiles.user_id', '=', 'chat_messages.user_id')
            ->leftJoin('chat_message_status', 'chat_message_status.message_id', '=', 'chat_messages.id')
            ->orderBy('chat_messages.id')
            ->get([
                'profiles.*',
                'chat_messages.*',
            ])->first();

        return new MessageResource($item, \Auth::user()->id);
    }

    /**
     * @param int $message_id
     * @return mixed
     */
    public function destroyMessage(int $message_id) {
        ChatMessage::where('id', $message_id)->update([
            'deleted_at' => time()
        ]);
        return true;
    }
}
