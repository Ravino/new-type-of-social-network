<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CommunityTheme extends Model
{

    public function getDateFormat()
    {
        return 'U';
    }

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    protected $fillable = [
        'parent_id',
        'name',
    ];

    /**
     * @return BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(__CLASS__, 'parent_id');
    }

    /**
     * @return HasMany
     */
    public function children()
    {
        return $this->hasMany(__CLASS__, 'parent_id');
    }

    /**
     * @return mixed
     */
    public static function getTree()
    {
        $all = self::all();
        return $all
            ->filter(static function ($theme) {
                return $theme->parent_id === 0;
            })
            ->load('children')
            ->values();
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public static function getParents()
    {
        $all = self::all();
        return $all
            ->filter(static function ($theme) {
                return $theme->parent_id === 0;
            })
            ->pluck('name', 'id')
            ->prepend('Root', 0);
    }
}
