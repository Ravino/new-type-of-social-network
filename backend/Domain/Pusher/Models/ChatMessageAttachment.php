<?php


namespace Domain\Pusher\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Storage;

/**
 * Class ChatMessageAttachment
 * @package Domain\Pusher\Models
 */
class ChatMessageAttachment extends Model
{
    protected $table = 'chat_message_attachments';

    protected $primaryKey = 'id';

    protected $fillable = [
        'original_name', 'path', 'url', 'user_id', 'size', 'tag', 'mime_type'
    ];

    /**
     * @return string
     */
    public function getS3UrlAttribute()
    {
        return Storage::disk('s3')->url($this->path);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return string
     */
    public function getDateFormat()
    {
        return 'U';
    }

    public static function boot()
    {
        parent::boot();
        static::creating(function ($file) {
            $file->user_id = auth()->user()->id;
            $file->url = $file->s3Url;
        });
    }
}
