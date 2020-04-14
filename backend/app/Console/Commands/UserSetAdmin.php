<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class UserSetAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:admin {user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set user as admin by ID or email';

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
     * @return mixed
     */
    public function handle()
    {
        $user = $this->argument('user');
        $field = 'email';
        if (is_numeric($user)) {
            $field = 'id';
        }
        $r = \DB::table('users')->where($field, $user)->update(['is_admin' => 1]);
    }
}
