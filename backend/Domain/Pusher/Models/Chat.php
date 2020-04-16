<?php


namespace Domain\Pusher\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ChatMessage
 * @package Domain\Pusher\Models
 */
class Chat extends Model
{
    /**
     * @var string
     */
    protected $table = 'chat';

    /**
     * @var array
     */
    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];
}
