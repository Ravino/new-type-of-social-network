<?php

namespace Domain\Pusher\Http\Resources\Message;

use Illuminate\Http\Resources\Json\ResourceCollection;

class MessageCollection extends ResourceCollection
{

    /**
     * @var int
     */
    public $user_id;

    public function __construct($resource, int $user_id)
    {
        $this->user_id = $user_id;
        parent::__construct($resource);
    }

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        return [
            'list' => $this->collection->map(function ($message) {
                return [
                    'id' => $message->id,
                    'userId' => $message->user_id,
                    'firstName' => $message->first_name,
                    'lastName' => $message->last_name,
                    'userPic' => $message->user_pic,
                    'sex' => $message->sex,
                    'body' => strip_tags($message->body, '<span><p>'),
                    'isMine' => ($message->user_id === $this->user_id),
                    'isRead' => $message->is_read,
                    'isEdited' => false,
                    'createdAt' => $message->created_at,
                    'updatedAt' => $message->updated_at,
                    'attachments' => new AttachmentsCollection($message->attachments),
                    'replyOn' => $message->parent ? new Message($message->parent, $this->user_id) : null,
                    'isForward' => $message->parent_chat_id ? true : false,
                ];
            })
        ];
    }
}
