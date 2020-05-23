<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $fillable = [
        'user_id',
        'likeable_id',
        'likeable_type',
    ];

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function($like) {
            $like->created_at = time();
            $like->updated_at = time();
        });
        static::created(function($like) {
            if ($like->likeable instanceof Post) {
                $like->likeable->increment('likes');
            } else if ($like->likeable instanceof PostAttachment) {
                $like->likeable->increment('likes');
            }
        });
        static::deleting(function($like) {
            if ($like->likeable instanceof Post) {
                $like->likeable->decrement('likes');
            } else if ($like->likeable instanceof PostAttachment) {
                $like->likeable->decrement('likes');
            }
        });
    }

    public function getDateFormat()
    {
        return 'U';
    }

    public function likeable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
