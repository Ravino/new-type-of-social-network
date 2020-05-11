<?php


namespace Domain\Neo4j\Listeners;

use Carbon\Carbon;
use Domain\Neo4j\Models\User;

class UserUpdateListener
{

    public function handle($event) {
        $user = $event->user->toArray();
        $user['oid'] = $user['id'];
        $user['name'] = $user['profile']['first_name'];
        $user = array_diff_key($user, array_flip(['profile', 'id']));
        $user['created_at'] = new Carbon($user['created_at']);
        $user['updated_at'] = new Carbon($user['updated_at']);
        if(!$neo_user = User::where('oid', $user['oid'])->first()) {
            $this->info("Creating user with email {$user['email']}");
            /** @var User $user */
            $user_created = User::insert($user);
            if($user_created) {
                $this->info("User with email {$user['email']} created");
            }
        }
    }
}
