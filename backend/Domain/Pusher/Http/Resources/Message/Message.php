<?php

namespace Domain\Pusher\Http\Resources\Message;

use App\Http\Resources\Community\Community;
use App\Http\Resources\User\User;
use App\Models\User as UserModel;
use App\Models\Community as CommunityModel;
use Illuminate\Http\Resources\Json\JsonResource;

class Message extends JsonResource
{

    /**
     * @var int
     */
    public $userId;

    public function __construct($resource, $user_id)
    {
        $this->userId = $user_id;
        parent::__construct($resource);
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'userPic' => $this->user_pic,
            'userId' => $this->user_id,
            'chatId' => $this->chat_id,
            'sex' => $this->sex,
            'body' => strip_tags($this->body, '<span><p>'),
            'isMine' => ($this->user_id == $this->userId),
            'isRead' => $this->is_read,
            'isEdited' => false,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'attachments' => new AttachmentsCollection($this->attachments),
        ];
    }
}
