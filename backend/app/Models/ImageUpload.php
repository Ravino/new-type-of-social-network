<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
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
                (new ImageUpload)->where('user_id', auth()->user()->id)->update(['tag' => self::TAG_SECONDARY]);
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
