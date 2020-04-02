<?php

namespace Domain\Pusher\Events;


class NewMessageEvent
{
    /**
     * Тело сообщения
     * @var string
     */
    protected $body;

    /**
     * Список индентификаторов получателей
     * @var array
     */
    protected $usersListIds = [];

    /**
     * Create a new event instance.
     * @param string $body
     * @param array $ids
     * @return void
     */
    public function __construct(string $body, array $ids)
    {
        $this->body = $body;
        $this->usersListIds = $ids;
    }

    /**
     * @return mixed
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * @return array
     */
    public function getUsersListIds(): array
    {
        return $this->usersListIds;
    }
}
