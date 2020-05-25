<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    protected $fillable = [
        'user_id',
        'original_name',
        'path',
        'mime_type',
        'size',
        'image_normal_path',
        'image_medium_path',
        'image_thumb_path',
        'image_normal_width',
        'image_normal_height',
        'image_thumb_width',
        'image_thumb_height',
        'image_medium_width',
        'image_medium_height',
        'image_original_width',
        'image_original_height',
        'like',
    ];

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    /**
     * @return string
     */
    public function getDateFormat()
    {
        return 'U';
    }

    public function users()
    {
        return $this->belongsTo(User::class, 'id', 'author_id');
    }

    public function albums()
    {
        return $this->belongsToMany(PhotoAlbum::class);
    }
}
