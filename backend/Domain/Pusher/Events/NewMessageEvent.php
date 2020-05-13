<?php

namespace Domain\Pusher\Events;


use Domain\Pusher\DTOS\Message;

class NewMessageEvent
{
    /**
     * Тело сообщения
     * @var string
     */
    protected $message_id;

    /**
     * Список индентификаторов получателей
     * @var int
     */
    protected $author_id;

    /**
     * @var
     */
    protected $chat_id;

    /**
     * Create a new event instance.
     * @param string $body
     * @param array $ids
     * @return void
     */
    public function __construct($message_id, $author_id, $chat_id)
    {
        $this->message_id = $message_id;
        $this->author_id = $author_id;
        $this->chat_id = $chat_id;
    }

    /**
     * @return mixed
     */
    public function getMessageId()
    {
        return $this->message_id;
    }

    /**
     * @return int
     */
    public function getAuthorId()
    {
        return $this->author_id;
    }

    /**
     * @return mixed
     */
    public function getChatId()
    {
        return $this->chat_id;
    }
}
