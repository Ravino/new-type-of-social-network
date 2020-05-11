<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Event;
use Storage;

class ImageUpload extends Model
{

    const TAG_PRIMARY = 'primary';
    const TAG_SECONDARY = 'secondary';

    protected $fillable = [
        'original_name', 'path', 'url', 'user_id', 'size', 'tag', 'mime_type',
        'image_original_width',
        'image_original_height',
        'image_normal_path',
        'image_normal_width',
        'image_normal_height',
        'image_medium_path',
        'image_medium_width',
        'image_medium_height',
        'image_thumb_path',
        'image_thumb_width',
        'image_thumb_height',
    ];

    public function getS3UrlAttribute()
    {
        return Storage::disk('s3')->url($this->image_thumb_path);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public static function boot()
    {
        parent::boot();
        static::created(static function($image) {
            if($image->tag === self::TAG_PRIMARY) {
                $affected = (new ImageUpload)
                    ->where('user_id', auth()->user()->id)
                    ->where('tag', self::TAG_PRIMARY)
                    ->where('id', '!=', $image->id)
                    ->update(['tag' => self::TAG_SECONDARY]);
                /**
                 * @todo For event
                 */
                Profile::where('user_id', auth()->id())->update(['user_pic' => $image->url]);
                Event::dispatch($affected ? 'user.profile.image.updated' : 'user.profile.image.created', ['user_id' => auth()->id()]);
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
