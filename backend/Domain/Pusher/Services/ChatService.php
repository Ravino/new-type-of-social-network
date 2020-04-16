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

    /**
     * @var ChatRepository
     */
    private $chatRepository;

    public function __construct(Dispatcher $dispatcher, LoggerInterface $logger, MessageRepository $repository, ChatRepository $chatRepository)
    {
        $this->chatRepository = $chatRepository;
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

    /**
     * Отправка сообщения пользователю
     * Создаст диалог, если диалога с данным пользователем не имеется
     *
     * @param string $body
     * @param int $user_id
     * @param int $author_id
     * @return int|mixed|null
     */
    public function sendToUser(string $body, int $user_id, int $author_id)
    {
        $chat_id = $this->chatRepository->getChatIdForCoupleUsers($user_id, $author_id);
        if(!$chat_id) {
            $chat_id = $this->chatRepository->createChatForCoupleUsers($user_id, $author_id);
        }
        $message_id = $this->repository->saveInChatById($chat_id, $body, $author_id);
        $message = $this->repository->getMessageById($message_id);
        $users_list = $this->chatRepository->getUsersIdListFromChat($chat_id, $author_id);
        $this->dispatcher->dispatch(new NewMessageEvent($message, $users_list));
        return $chat_id;
    }
}
