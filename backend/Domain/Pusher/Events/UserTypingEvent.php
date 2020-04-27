<?php

namespace Domain\Pusher\Events;


use App\Models\User;
use Domain\Pusher\Repositories\ChatRepository;
use App\Http\Resources\User\SimpleUser;

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
     * Create a new event instance.
     * @param string $body
     * @param array $ids
     * @return void
     */
    public function __construct(int $userId, int $chatId)
    {
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
