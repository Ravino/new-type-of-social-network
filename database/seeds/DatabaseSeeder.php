<?php

use App\Models\Profile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        if(App::environment() == 'staging' || App::environment() == 'local') {
            $this->doSeed(UsersTableSeeder::class);
            $this->doSeed(ChatSeeder::class);
            $this->doSeed(ProfileRelationshipsSeeder::class);
        }
        Model::reguard();
    }

    /**
     * @param $seed_name
     */
    private function doSeed($seed_name)
    {
        $exists = DB::table('seeds')->where('seed_name', $seed_name)->exists();
        if (!$exists) {
            $this->call($seed_name);
            DB::table('seeds')->insert(array('seed_name' => $seed_name));
        }
    }
}
