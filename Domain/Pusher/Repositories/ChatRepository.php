<?php


namespace Domain\Pusher\Repositories;



use Domain\Pusher\Models\Dialog;

class ChatRepository
{

    /**
     * Возвращает список чатов пользователя
     * @param int $user_id
     * @return Dialog[]
     */
    public function getChatsByUserId(int $user_id) : array
    {
        $items =  \DB::table('chat')
            ->join('users', 'users.id', '=', 'chat.user_id')
            ->join('profiles', 'profiles.user_id', '=', 'users.id')
            ->whereRaw("chat.id IN (SELECT chat_id FROM chat_messages WHERE profiles.user_id = $user_id GROUP BY chat_id)")
            ->orderBy('chat.id', 'desc')
            ->get([
                'chat.id',
                'profiles.firstname',
                'chat.last_message_body',
                'chat.last_is_read',
                'chat.last_user_id',
                'chat.last_message_time'
            ])->toArray();

        $collection = [];
        foreach ($items as $item){
            $dialog = new Dialog();
            $dialog->id = $item->id;
            $dialog->name = $item->firstname;
            //todo: поменять после реализации механизма загрузки аватарок
            $dialog->userPic = 'https://habrastorage.org/storage2/b92/bcf/532/b92bcf532c0a2889272ffd72ffb1f2b5.png';
            $dialog->lastMessageText = $item->last_message_body;
            $dialog->lastMessageDT = $item->last_message_time;
            $dialog->isRead = (bool)$item->last_is_read;
            $dialog->isLastFromMe = ($user_id == $item->last_user_id);
            $dialog->isOnline = ($user_id == $item->last_user_id);
            $collection[] = $dialog;
        }
        return $collection;

    }

    /**
     * Возвращает список идентификаторов пользователей,
     * которые являются участниками чата. Если указана
     * $exclude_id, этот пользователь будет исключен из результатирующего
     * набора. Это может быть полезным, при оповещении всех участников
     * чата о новом сообщении, кроме самого автора.
     * @param int $chat_id идентификатор чата
     * @param int $exclude_id исключаемый пользователь
     * @return array список ID пользователей участников
     */
    public function getUsersIdListFromChat(int $chat_id, int $exclude_id = null) : array
    {
        $query = \DB::table('chat_party')
            ->join('profiles', 'profiles.user_id', '=', 'chat_party.user_id')
            ->where('chat_party.chat_id', '=', $chat_id);

        if($exclude_id){
            $query->where('chat_party.user_id', '<>', $exclude_id);
        }

        return $query->get('profiles.user_id')->toArray();
    }
}
