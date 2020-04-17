<?php


namespace Domain\Pusher\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ChatMessage
 * @package Domain\Pusher\Models
 */
class ChatMessage extends Model
{
    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function parent() {
        return $this->hasOne( ChatMessage::class, 'id', 'parent_id' )
            ->join('profiles', 'profiles.user_id', '=', 'chat_messages.user_id')
            ->leftJoin('chat_message_status', 'chat_message_status.message_id', '=', 'chat_messages.id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function parent_chat() {
        return $this->hasOne( Chat::class, 'id', 'parent_chat_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function attachments() {
        return $this->hasMany(ChatMessageAttachment::class, 'message_id', 'id');
    }
}
