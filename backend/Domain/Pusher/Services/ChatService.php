<?php


namespace Domain\Pusher\Services;


use Domain\Pusher\Events\NewMessageEvent;
use Domain\Pusher\Http\Resources\Message\AttachmentsCollection;
use Domain\Pusher\Models\ChatMessageAttachment;
use Domain\Pusher\Repositories\ChatRepository;
use Domain\Pusher\Repositories\MessageRepository;
use Illuminate\Contracts\Events\Dispatcher;
use Intervention\Image\Facades\Image;
use Intervention\Image\Image as InterventionImage;
use Psr\Log\LoggerInterface;
use Ramsey\Uuid\Uuid;
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
     * @return \Domain\Pusher\Http\Resources\Message\Message
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
     * @return AttachmentsCollection
     */
    public function uploadFiles($files)
    {
        $attachment_ids = [];
        foreach ($files['files'] as $file) {
            $imageName = Uuid::uuid4() . '.' . $file->getClientOriginalExtension();
            $original = Storage::disk('s3')->put("chat/attachments/originals", $file, 'public');

            if(@is_array(getimagesize($file))) {
                $original_img = Image::make($file);
                $normal = $this->prepareImage($file, 600);
                $medium = $this->prepareImage($file, 250);
                $thumb = $this->prepareImage($file, 60);
                Storage::disk('s3')->put("chat/attachments/normals/$imageName", $normal->stream(), 'public');
                Storage::disk('s3')->put("chat/attachments/mediums/$imageName", $medium->stream(), 'public');
                Storage::disk('s3')->put("chat/attachments/thumbs/$imageName", $thumb->stream(), 'public');
                $original_width = $original_img->getWidth();
                $original_height = $original_img->getHeight();

                $medium_width = $medium->getWidth();
                $medium_height = $medium->getHeight();

                $normal_width = $normal->getWidth();
                $normal_height = $normal->getHeight();

                $thumb_width = $thumb->getWidth();
                $thumb_height = $thumb->getHeight();
            } else {
                $normal_width = null;
                $normal_height = null;
                $thumb_width = null;
                $thumb_height = null;
                $medium_width = null;
                $medium_height = null;
                $original_width = null;
                $original_height = null;
            }
            $data = [
                'size' => $file->getSize(),
                'original_name' => $file->getClientOriginalName(),
                'path' => $original,
                'image_normal_path' => "chat/attachments/normals/$imageName",
                'image_medium_path' => "chat/attachments/mediums/$imageName",
                'image_thumb_path' => "chat/attachments/thumbs/$imageName",
                'mime_type' => $file->getClientMimeType(),
                'image_normal_width' => $normal_width,
                'image_normal_height' => $normal_height,
                'image_thumb_width' => $thumb_width,
                'image_thumb_height' => $thumb_height,
                'image_medium_width' => $medium_width,
                'image_medium_height' => $medium_height,
                'image_original_width' => $original_width,
                'image_original_height' => $original_height,
            ];
            $attachment = ChatMessageAttachment::create($data);
            array_push($attachment_ids, $attachment->id);
        }
        return new AttachmentsCollection(ChatMessageAttachment::whereIn('id', $attachment_ids)->get());
    }

    public function prepareImage($image, $size) : InterventionImage {
        $new_image = Image::make($image);
        if($new_image->width() > $new_image->height()) {
            $width = $size;
            $height = null;
        } else if($new_image->width() < $new_image->height()){
            $width = null;
            $height = $size;
        } else {
            $width = $size;
            $height = $size;
        }
        $new_image->resize($width, $height, function ($constraint) {$constraint->aspectRatio();$constraint->upsize();});
        return $new_image;
    }

    /**
     * @param $user_ids
     * @return \Domain\Pusher\Http\Resources\Chat\Chat
     */
    public function getChatForUsers($user_ids) {
        $chat_id = null;
        if(count($user_ids) === 1) {
            $chat_id = $this->chatRepository->getChatIdForCoupleUsers($user_ids[0], \Auth::user()->id);
        }
        if(!$chat_id) {
            $chat_id = $this->chatRepository->createChatForUsers($user_ids, \Auth::user()->id);
        }
        return $this->chatRepository->getChatById($chat_id);
    }
}
