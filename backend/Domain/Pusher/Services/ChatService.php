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
     *
     * @param string $body
     * @param int $chat_id
     * @param int $author_id
     * @param int|null $parent_id
     * @param int|null $parent_chat_id
     *
     */
    public function send(string $body, int $chat_id, int $author_id, int $parent_id = null, int $parent_chat_id = null)
    {
        $chatRepo = new ChatRepository();
        $message_id = $this->repository->saveInChatById($chat_id, $body, $author_id, $parent_id, $parent_chat_id);
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
     * @param int|null $parent_id
     * @return int|mixed|null
     */
    public function sendToUser(string $body, int $user_id, int $author_id, int $parent_id = null)
    {
        $chat_id = $this->chatRepository->getChatIdForCoupleUsers($user_id, $author_id);
        if(!$chat_id) {
            $chat_id = $this->chatRepository->createChatForCoupleUsers($user_id, $author_id);
        }
        $message_id = $this->repository->saveInChatById($chat_id, $body, $author_id, $parent_id);
        $message = $this->repository->getMessageById($message_id);
        $users_list = $this->chatRepository->getUsersIdListFromChat($chat_id, $author_id);
        $this->dispatcher->dispatch(new NewMessageEvent($message, $users_list));
        return $chat_id;
    }

    public function uploadFiles($files) {
//        $path = Storage::disk('s3')->put('chat/attachments/originals', $files->image, 'public');
//        $request->merge([
//            'size' => $request->image->getSize(),
//            'original_name' => $request->image->getClientOriginalName(),
//            'path' => $path,
//            'mime_type' => $request->image->getClientMimeType()
//        ]);
//        $image_upload = $this->imageUpload->create($request->only('original_name', 'path', 'title', 'size', 'tag', 'mime_type'));
//        return response()->json(['path' => $image_upload->url]);
    }
}
