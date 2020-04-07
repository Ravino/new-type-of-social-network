<?php


namespace Domain\Pusher\Repositories;


use Carbon\Carbon;
use DB;
use Domain\Pusher\Helpers\ArrayUtils;
use Domain\Pusher\Models\Dialog;

class ChatRepository
{

    /**
     * Возвращает список чатов пользователя
     * @param int $user_id
     * @return Dialog[]
     */
    public function getChatsByUserId(int $user_id): array
    {
        $items = DB::table('chat')
            ->join('profiles', 'profiles.user_id', '=', 'chat.user_id')
            ->whereRaw("chat.id IN (SELECT chat_id FROM chat_party WHERE user_id = $user_id GROUP BY chat_id)")
            ->orderBy('chat.id', 'desc')
            ->get([
                'chat.id',
                'profiles.firstname',
                'chat.last_message_body',
                'chat.last_is_read',
                'chat.last_user_id',
                'chat.last_message_time'
            ])->toArray();


        $attendees = DB::table('chat_party')
            ->join('profiles', 'chat_party.user_id', '=', 'profiles.user_id')
            ->join('users', 'chat_party.user_id', '=', 'users.id')
            ->whereIn('chat_party.chat_id',  array_column($items, 'id'))
            ->where('chat_party.user_id', '<>', $user_id)
            ->get([
                'chat_party.chat_id',
                'users.last_activity_dt',
                'profiles.firstname',
                'profiles.lastname',
                'profiles.birthday',
                'profiles.city',
                'profiles.user_pic'
            ])->toArray();

        foreach( $attendees as $attendee) {
            $attendee->lastActivityDT = Carbon::create($attendee->last_activity_dt)->timestamp;
            $attendee->userPic = $attendee->user_pic;
            unset($attendee->user_pic);
            unset($attendee->last_activity_dt);
        }

        $collection = [];
        foreach ($items as $item) {
            $dialog = new Dialog();
            $dialog->id = $item->id;
            $dialog->name = $item->firstname;
            $dialog->lastMessageText = $item->last_message_body;
            $dialog->lastMessageDT = Carbon::createFromTimestamp($item->last_message_time)->toDateTimeString();
            $dialog->isRead = (bool)$item->last_is_read;
            $dialog->isLastFromMe = ($user_id == $item->last_user_id);
            $dialog->isOnline = ($user_id == $item->last_user_id);
            $dialog->attendees = ArrayUtils::objArraySearch($attendees, 'chat_id', $item->id);
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
    public function getUsersIdListFromChat(int $chat_id, int $exclude_id = null): array
    {
        $query = \DB::table('chat_party')
            ->join('profiles', 'profiles.user_id', '=', 'chat_party.user_id')
            ->where('chat_party.chat_id', '=', $chat_id);

        if ($exclude_id) {
            $query->where('chat_party.user_id', '<>', $exclude_id);
        }

        return $query->get('profiles.user_id')->toArray();
    }
}
