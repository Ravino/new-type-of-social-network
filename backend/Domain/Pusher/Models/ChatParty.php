<?php


namespace Domain\Pusher\Models;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ChatMessage
 * @package Domain\Pusher\Models
 */
class ChatParty extends Model
{
    /**
     * @var string
     */
    protected $table = 'chat_party';

    /**
     * @var array
     */
    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];
}
