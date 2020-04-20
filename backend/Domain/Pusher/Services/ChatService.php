<?php


namespace Domain\Pusher\Services;


use Domain\Pusher\Events\NewMessageEvent;
use Domain\Pusher\Models\ChatMessageAttachment;
use Domain\Pusher\Repositories\ChatRepository;
use Domain\Pusher\Repositories\MessageRepository;
use Illuminate\Contracts\Events\Dispatcher;
use Psr\Log\LoggerInterface;
use Storage;

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
     *
     * @param string $body
     * @param int $chat_id
     * @param int $author_id
     * @param int|null $parent_id
     * @param int|null $parent_chat_id
     * @param array $attachment_ids
     */
    public function send(string $body, int $chat_id, int $author_id, int $parent_id = null, int $parent_chat_id = null, array $attachment_ids = [])
    {
        $chatRepo = new ChatRepository();
        $message_id = $this->repository->saveInChatById($chat_id, $body, $author_id, $parent_id, $parent_chat_id);
        $message = $this->repository->getMessageById($message_id);
        $users_list = $chatRepo->getUsersIdListFromChat($chat_id, $author_id);
        if(count($attachment_ids)) {
            ChatMessageAttachment::whereIn('id', $attachment_ids)->update(["message_id" => $message_id]);
        }
        $this->dispatcher->dispatch(new NewMessageEvent($message, $users_list));
        return $message;
    }

    /**
     * Отправка сообщения пользователю
     * Создаст диалог, если диалога с данным пользователем не имеется
     *
     * @param string $body
     * @param int $user_id
     * @param int $author_id
     * @param array $attachment_ids
     * @return int|mixed|null
     */
    public function sendToUser(string $body, int $user_id, int $author_id, array $attachment_ids = [])
    {
        $chat_id = $this->chatRepository->getChatIdForCoupleUsers($user_id, $author_id);
        if(!$chat_id) {
            $chat_id = $this->chatRepository->createChatForCoupleUsers($user_id, $author_id);
        }
        $message_id = $this->repository->saveInChatById($chat_id, $body, $author_id);
        $message = $this->repository->getMessageById($message_id);
        $users_list = $this->chatRepository->getUsersIdListFromChat($chat_id, $author_id);
        if(count($attachment_ids)) {
            ChatMessageAttachment::whereIn('id', $attachment_ids)->update(["message_id" => $message_id]);
        }
        $this->dispatcher->dispatch(new NewMessageEvent($message, $users_list));
        return $message;
    }

    /**
     * Загрузка файлов чата в s3 Bucket
     *
     * @param $files
     * @return array
     */
    public function uploadFiles($files)
    {
        $attachment_ids = [];
        foreach ($files['files'] as $file) {
            $path = Storage::disk('s3')->put('chat/attachments/originals', $file, 'public');
            $data = [
                'size' => $file->getSize(),
                'original_name' => $file->getClientOriginalName(),
                'path' => $path,
                'mime_type' => $file->getClientMimeType()
            ];
            $attachment = ChatMessageAttachment::create($data);
            array_push($attachment_ids, $attachment->id);
        }
        return $attachment_ids;
    }
}
