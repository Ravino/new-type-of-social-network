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
            $this->doSeed(CommunitiesTableSeeder::class);
            $this->doSeed(PostsTableSeeder::class);
        }
        Model::reguard();
    }

    /**
     * @param $seedName
     */
    private function doSeed($seedName)
    {
        $this->command->line("Trying to execute seed " . $seedName);
        $exists = DB::table('seeds')->where('seed_name', $seedName)->exists();
        if (!$exists) {
            try {
                $this->call($seedName);
            } catch (\Exception $e) {
                $this->command->line("Error: " . $e->getMessage());
            }
            DB::table('seeds')->insertOrIgnore(array('seed_name' => $seedName));
        } else {
            $this->command->line("Seed with name '" . $seedName . "' was executed earlier ");
        }
    }
}
