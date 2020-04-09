<?php


namespace Domain\Pusher\Services;


use Domain\Pusher\Events\NewMessageEvent;
use Domain\Pusher\Repositories\ChatRepository;
use Domain\Pusher\Repositories\MessageRepository;
use Illuminate\Contracts\Events\Dispatcher;
use Psr\Log\LoggerInterface;

class ChatService extends BaseService
{
    /**
     * @var MessageRepository
     */
    private $repository;

    public function __construct(Dispatcher $dispatcher, LoggerInterface $logger, MessageRepository $repository)
    {
        $this->repository = $repository;
        parent::__construct($dispatcher, $logger);
    }


    /**
     * Отправка сообщения
     * @param string $body тело сообщения
     * @param int $chat_id чат, куда шлется сообщение.
     * @param int $author_id отправитель
     */
    public function send(string $body, int $chat_id, int $author_id)
    {
        $chatRepo = new ChatRepository();
        $message_id = $this->repository->saveInChatById($chat_id, $body, $author_id);
        $message = $this->repository->getMessageById($message_id);
        $users_list = $chatRepo->getUsersIdListFromChat($chat_id, $author_id);
        $this->dispatcher->dispatch(new NewMessageEvent($message, $users_list));
    }
}
