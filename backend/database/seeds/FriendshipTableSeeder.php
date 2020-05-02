<?php

use Illuminate\Database\Seeder;

use App\Models\Profile;
use App\Models\User;


class FriendshipTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        while ($users->count() > 1) {
            $user1 = $users->random();
            $users->pull($user1->getKey());

            $user2 = $users->random();
            $users->pull($user2->getKey());

            $user1->beFriend($user2);
            $user2->acceptFriendRequest($user1);
        }
    }
}
