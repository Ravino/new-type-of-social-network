<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Spiritix\LadaCache\Database\LadaCacheTrait;

class CommunityMember extends Pivot
{
    use LadaCacheTrait;

    protected $table = 'community_members';

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    public function getDateFormat()
    {
        return 'U';
    }
}
