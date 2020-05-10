<?php

use App\Models\Community;
use App\Models\CommunityTheme;
use Illuminate\Database\Seeder;

use App\Models\Profile;
use App\Models\User;


class CommunitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin_user = User::where('email', 'admin@mail.com')->first();
        if ($admin_user) {
            $first_community = Community::create($this->generateCommunity());
            $second_community = Community::create($this->generateCommunity());
            $users = User::where('id', '<>', $admin_user->id)->get();
            $relations = [];
            $relations[$admin_user->id] = ['role' => 'author'];
            foreach ($users as $user) {
                $relations[$user->id] = ['role' => 'user'];
            }
            $first_community->users()->attach($relations);
            $second_community->users()->attach($relations);
        } else {
            $this->command->line("User with email admin@mail.com not found");
        }
    }


    private function generateCommunity() {
        $faker = Faker\Factory::create('ru_RU');
        return [
            'name' => $faker->realText(15),
            'description' => $faker->realText(300),
            'notice' => $faker->realText(20),
            'primary_image' => 'https://lorempixel.com/640/480/people/',
            'url' => '',
            'website' => $faker->url,
            'location' => $faker->city . ', ' . $faker->country,
            'is_verified' => $faker->randomElement([false, true]),
            'type' => $faker->randomElement([
                Community::TYPE_BUSINESS,
                Community::TYPE_THEMES,
                Community::TYPE_BRAND,
                Community::TYPE_INTEREST_GROUP,
                Community::TYPE_PUBLIC_PAGE,
                Community::TYPE_EVENT,
            ]),
            'theme_id' => CommunityTheme::getAllChildren()->pluck('id')->random(),
            'privacy' => $faker->randomElement([
                Community::PRIVACY_OPEN,
                Community::PRIVACY_CLOSED,
                Community::PRIVACY_PRIVATE,
            ]),
        ];
    }
}
