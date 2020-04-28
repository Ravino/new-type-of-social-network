<?php


namespace Domain\Pusher\Models;

use App\Models\Profile;
use App\Models\User;
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

    public function attendees() {
        return $this->belongsToMany(Profile::class, 'chat_party', 'chat_id', 'user_id')
            ->join('users', 'profiles.user_id', '=', 'users.id')->select('profiles.*', 'users.*');
    }

    public function getDateFormat()
    {
        return 'U';
    }
}
