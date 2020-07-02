<?php

use Carbon\Carbon;
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

        $emails = [
            'viktoria.mamontova@arma3.in.ua',
            'alex@arma3.in.ua',
            'marianka.kabanova@arma3.in.ua',
            'everon@arma3.in.ua',
            'gastovsky@arma3.in.ua',
            'targettius@gmail.com'
        ];
//        $countOfUsers = App::environment() != 'testing' ? 10 : 1;
//
//        if (App::environment() != 'testing') {
//            $email1 = $this->command->ask('Enter email of first user', 'test@gmail.com');
//            $email2 = $this->command->ask('Enter email of admin user', 'admin@mail.com');
//            $countOfUsers = $this->command->ask('How many users you want to generate', 10);
//        }
        $faker = Faker\Factory::create();
        for ($i = 0; $i <= 7; $i++) {
            $fakeEmail = $faker->email;
            $user = User::where('email', $fakeEmail)->first();
            if (!$user) {
                /** @var User $user */
                $user = User::create([
                    'email' => $emails[$i],
                    'password' => bcrypt('secret'),
                    'token' => bcrypt('secret'),
                    'last_activity_dt' => time(),
                    'created_at' => time(),
                    'updated_at' => time(),
                ]);
                $user->profile()->create($this->generateProfile());
                $this->createInMongo($user);
                $this->command->line("Generate user with email {$user->email}");
            } else {
                $i--;
            }
        }
    }

    private function generateProfile() {
        $faker = Faker\Factory::create('ru_RU');
        $rand = $faker->numberBetween(0, 1000);
        return [
            'first_name' => $faker->firstName,
            'last_name' => $faker->lastName,
            'birthday' => $faker->dateTimeBetween('-70 years', '-20 years')->format('Y-m-d'),
            'geo_city_id' => null,
            'sex' => $faker->randomElement(['n', 'm', 'f']),
            'user_pic' => "https://i.picsum.photos/id/$rand/500/500.jpg",
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }

    protected function createInMongo($user) {
        $user = User::with('profile')->find($user->id);
        $user = $user->toArray();
        $profile = $user['profile'];
        $user = array_diff_key($user, array_flip(['profile']));
        $user['created_at'] = new Carbon($user['created_at']);
        $user['updated_at'] = new Carbon($user['updated_at']);
        $profile['created_at'] = new Carbon($profile['created_at']);
        $profile['updated_at'] = new Carbon($profile['updated_at']);
        $user = \Domain\Pusher\Models\User::create($user);
        $user->profile()->save(
            new \Domain\Pusher\Models\Profile($profile)
        );
    }
}
