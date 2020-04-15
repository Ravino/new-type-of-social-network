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
        $user1 = User::where('email', 'test@gmail.com')->first();
        $user2 = User::where('email', 'admin@mail.com')->first();
        Log::debug($user1);
        Log::debug($user2);

        $users = User::all();
        for ($i = 0; $i <= count($users) / 2; $i++) {
            if($user1->id !== $users[$i]->id) {
                User::find($user1->id)->beFriend($users[$i]);
                User::find($users[$i]->id)->beFriend($user1);
            }
        }
        for ($i = count($users) / 2; $i <= count($users); $i++) {
            if($user2->id !== $users[$i]->id) {
                User::find($user2->id)->beFriend($users[$i]);
                User::find($users[$i]->id)->beFriend($user2);
            }
        }
    }
}
