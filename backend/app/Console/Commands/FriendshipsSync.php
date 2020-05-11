<?php

namespace App\Console\Commands;

use App\Models\User;
use Carbon\Carbon;
use Domain\Pusher\Models\Profile;
use Hootlex\Friendships\Models\Friendship;
use Illuminate\Console\Command;
use Illuminate\Database\Query\Expression;
use MongoDB\BSON\ObjectId;
use Ramsey\Uuid\Uuid;

class FriendshipsSync extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'friendship:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set or unset user as admin by ID or email';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @throws \Exception
     */
    public function handle()
    {
        $mysql_users = User::with('profile')->get();
        foreach ($mysql_users as $user) {
            $user = $user->toArray();
            $user['oid'] = $user['id'];
            $user['name'] = $user['profile']['first_name'];
            $user = array_diff_key($user, array_flip(['profile', 'id']));
            $user['created_at'] = new Carbon($user['created_at']);
            $user['updated_at'] = new Carbon($user['updated_at']);
            if(!$neo_user = \Domain\Neo4j\Models\User::where('oid', $user['oid'])->first()) {
                $this->info("Creating user with email {$user['email']}");
                /** @var User $user */
                $user_created = \Domain\Neo4j\Models\User::insert($user);
                if($user_created) {
                    $this->info("User with email {$user['email']} created");
                }
            }
        }
        $friendships = Friendship::all();
        foreach ($friendships as $friendship) {
            $sender = \Domain\Neo4j\Models\User::where('oid', $friendship->sender_id)->first();
            $receiver = \Domain\Neo4j\Models\User::where('oid', $friendship->recipient_id)->first();
            $sender->friends()->attach($receiver);
            $this->info("Friendship between {$friendship->sender_id} and {$friendship->recipient_id} created");
        }
    }
}
