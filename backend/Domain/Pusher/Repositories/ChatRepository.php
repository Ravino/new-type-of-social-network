<?php


namespace Domain\Pusher\Repositories;


use Carbon\Carbon;
use DB;
use Domain\Pusher\Helpers\ArrayUtils;
use Domain\Pusher\DTOs\Dialog;
use Domain\Pusher\Http\Resources\Chat\ChatCollection;
use Domain\Pusher\Models\Chat;
use Domain\Pusher\Http\Resources\Chat\Chat as ChatResource;

class ChatRepository
{

    /**
     * Возвращает список чатов пользователя
     *
     * @param int $user_id
     * @param $search
     * @return ChatCollection
     */
    public function getChatsByUserId(int $user_id, $search = null)
    {
        $query = Chat::with(['attendees' => function($query) use ($user_id) {
            $query->where('profiles.user_id', '<>', $user_id);
        }])->whereNull('deleted_at');

        if(!empty($search) || strlen($search) > 3) {
            $query->whereHas('attendees', function($profile) use ($search, $user_id) {
                $profile
                    ->where('profiles.first_name', 'LIKE', "%{$search}%")
                    ->orWhere('profiles.last_name', 'LIKE', "%{$search}%")
                    ->where('profiles.user_id', '<>', $user_id);
            });
        }

        $items = $query->join('profiles', 'profiles.user_id', '=', 'chat.user_id')
        ->whereRaw("chat.id IN (SELECT chat_id FROM chat_party WHERE user_id = $user_id GROUP BY chat_id)")
        ->orderBy('chat.last_message_time', 'desc')
        ->get([
            'chat.id',
            'chat.name',
            'chat.last_message_body',
            'chat.last_is_read',
            'chat.last_user_id',
            'chat.last_message_time'
        ]);
        return new ChatCollection($items, $user_id);
    }

    /**
     * Возвращает список чатов пользователя
     *
     * @param int $id
     * @return ChatResource
     */
    public function getChatById(int $id)
    {
        $user_id = \Auth::user()->id;
        $items = Chat::with(['attendees' => function($query) use ($user_id) {
            $query->where('profiles.user_id', '<>', $user_id);
        }])->where('id', $id)
            ->join('profiles', 'profiles.user_id', '=', 'chat.user_id')
            ->whereRaw("chat.id IN (SELECT chat_id FROM chat_party WHERE user_id = $user_id GROUP BY chat_id)")
            ->orderBy('chat.last_message_time', 'desc')
            ->first([
                'chat.id',
                'chat.name',
                'chat.last_message_body',
                'chat.last_is_read',
                'chat.last_user_id',
                'chat.last_message_time'
            ]);

        return new ChatResource($items, $user_id);
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

    /**
     * Возвращает ID чата если он уже существует
     * для пары пользователей который были
     * переданы в параметрах
     *
     * @param $first_user
     * @param $second_user
     * @return mixed|null
     */
    public function getChatIdForCoupleUsers($first_user, $second_user) {
        $chat = DB::table('chat_party')->select('chat_id')
            ->whereRaw("chat.id IN (SELECT chat_id FROM chat_party WHERE user_id = $first_user)")
            ->whereRaw("chat.id IN (SELECT chat_id FROM chat_party WHERE user_id = $second_user)")
            ->groupBy('chat_id')
            ->havingRaw('COUNT(chat_id) = 2')->first();

        if($chat) {
            return $chat->chat_id;
        }
        return null;
    }

    /**
     * Создает чат для двух пользователей
     *
     * @param $reciever_id
     * @param $author_id
     * @return int
     */
    public function createChatForCoupleUsers($reciever_id, $author_id) {
        $chat_id = \DB::table('chat')->insertGetId(
            ['user_id' => $author_id, 'created_at' => time(), 'updated_at' => time()]
        );
        DB::table('chat_party')->insert([
            ['chat_id' => $chat_id, 'user_id' => $author_id, 'created_at' => time()],
            ['chat_id' => $chat_id, 'user_id' => $reciever_id, 'created_at' => time()]
        ]);
        return $chat_id;
    }

    /**
     * Создает чат для нескольких пользователей
     *
     * @param $receiver_ids
     * @param $author_id
     * @return int
     */
    public function createChatForUsers($receiver_ids, $author_id) {
        $chat_id = \DB::table('chat')->insertGetId(
            ['user_id' => $author_id, 'created_at' => time(), 'updated_at' => time()]
        );
        $party = [];
        foreach ($receiver_ids as $receiver_id) {
            $party[] = ['chat_id' => $chat_id, 'user_id' => $receiver_id, 'created_at' => time()];
        }
        array_push($party, ['chat_id' => $chat_id, 'user_id' => $author_id, 'created_at' => time()]);
        DB::table('chat_party')->insert($party);
        return $chat_id;
    }

    /**
     * @param $user_id
     * @param $chat_id
     * @return bool
     */
    public function isUserInChat($user_id, $chat_id) {
        return DB::table('chat_party')->where('user_id', $user_id)->where('chat_id', $chat_id)->exists();
    }

    /**
     * @param $chat_id
     * @param $user_id
     * @return ChatResource
     */
    public function insertToChartParty($chat_id, $user_id) {
        DB::table('chat_party')->insert([
            ['chat_id' => $chat_id, 'user_id' => $user_id, 'created_at' => time()]
        ]);
        return $this->getChatById($chat_id);
    }

    /**
     * @param int $chat_id
     * @return bool
     */
    public function destroyChat(int $chat_id) {
        Chat::where('id', $chat_id)->update([
            'deleted_at' => time()
        ]);
        return true;
    }
}
