<?php

namespace App\Models;

use App\Notifications\ResetPassword as ResetPasswordNotification;
use App\Notifications\UserSystemNotifications;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Event;
use Storage;

class ImageUpload extends Model
{

    const TAG_PRIMARY = 'primary';
    const TAG_SECONDARY = 'secondary';

    protected $fillable = [
        'original_name', 'path', 'url', 'user_id', 'size', 'tag', 'mime_type'
    ];

    public function getS3UrlAttribute()
    {
        return Storage::disk('s3')->url($this->path);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public static function boot()
    {
        parent::boot();
        static::creating(function($image) {
            if($image->tag === self::TAG_PRIMARY) {
                $affected = (new ImageUpload)->where('user_id', auth()->user()->id)->where('tag', self::TAG_PRIMARY)->update(['tag' => self::TAG_SECONDARY]);
                Event::dispatch($affected ? 'user.profile.image.updated' : 'user.profile.image.created', ['user_id' => \Auth::user()->id]);
            }
        });
        static::creating(function ($image) {
            $image->user_id = auth()->user()->id;
            $image->url = $image->s3Url;
        });
    }

    public function getDateFormat()
    {
        return 'U';
    }
}
