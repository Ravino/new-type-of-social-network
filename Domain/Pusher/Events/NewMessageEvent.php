<?php

namespace Domain\Pusher\Events;


class NewMessageEvent
{
    protected $message;

    /**
     * Create a new event instance.
     * @param string $message
     * @return void
     */
    public function __construct(string $message)
    {
        $this->message = $message;
    }

    /**
     * @return mixed
     */
    public function getMessage()
    {
        return $this->message;
    }

}
