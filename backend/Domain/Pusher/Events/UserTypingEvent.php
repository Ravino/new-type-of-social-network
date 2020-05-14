<?php

namespace Domain\Pusher\Events;


use App\Models\User;
use Domain\Pusher\Repositories\ChatRepository;
use App\Http\Resources\User\SimpleUser;
use Illuminate\Queue\SerializesModels;

class UserTypingEvent
{

    /**
     * Тело сообщения
     * @var string
     */
    protected $userId;

    /**
     * Список индентификаторов получателей
     * @var array
     */
    protected $chatId;

    /**
     * UserTypingEvent constructor.
     * @param int $userId
     * @param int $chatId
     */
    public function __construct(int $userId, int $chatId)
    {
        \Log::debug($userId);
        $this->userId = $userId;
        $this->chatId = $chatId;
    }

    /**
     * @return mixed
     */
    public function getUserTyping()
    {
        $user = User::find($this->userId);
        return new SimpleUser($user);
    }

    /**
     * @return array
     */
    public function getUsersListIds(): array
    {
        $chatRepo = new ChatRepository();
        return $chatRepo->getUsersIdListFromChat($this->chatId, $this->userId);
    }

    /**
     * @return int
     */
    public function getChatId(): int
    {
        return $this->chatId;
    }
}
