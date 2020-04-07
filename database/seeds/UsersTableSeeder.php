<?php
//namespace

use Illuminate\Database\Seeder;

use App\Models\Profile;
use App\Models\User;


class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $email = 'test@gmail.com';

        $user = User::where('email', $email)->first();

        if(!$user) {

            $user = User::create([
                'email' => $email,
                'password' => bcrypt('secret'),
                'token' => bcrypt('secret'),
                'last_activity_dt' => time(),
                'created_at' => time(),
                'updated_at' => time()
            ]);

            $user->profile()->create(factory(Profile::class)->make()->toArray());

        }



    }
}
