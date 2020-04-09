<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CommunityMember extends Pivot
{
    protected $table = 'community_members';
}
