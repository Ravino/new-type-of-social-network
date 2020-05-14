<?php

namespace App\Console\Commands;

use App\Models\Community;
use App\Models\User;
use Carbon\Carbon;
use Domain\Neo4j\Models\Community as Neo4jCommunity;
use Domain\Neo4j\Models\User as Neo4jUser;
use Domain\Neo4j\Repositories\BaseRepository;
use Exception;
use GraphAware\Neo4j\Client\ClientInterface;
use Illuminate\Console\Command;

class CommunitySync extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'community:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Push community to Neo4j';

    /**
     * @var ClientInterface
     */
    protected $client;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->client = (new BaseRepository())->getClient();
    }

    /**
     * Execute the console command.
     *
     * @throws Exception
     */
    public function handle()
    {
        $sql = 'match (a:Community)-[r]-() delete r';
        $this->client->run($sql)->records();

        $mysql_community = Community::all();
        /** @var Community $community */
        foreach ($mysql_community as $community) {
            $data = $community->toArray();
            $data['oid'] = $community->id;
            $data['created_at'] = new Carbon($community['created_at']);
            $data['updated_at'] = new Carbon($community['updated_at']);
            if (!$neo_community = Neo4jCommunity::where('oid', $data['oid'])->first()) {
                $this->info("Creating community {$data['name']}");
                /** @var User $community */
                $neo_community = Neo4jCommunity::create($data);
                if ($neo_community) {
                    $this->info("Community {$community['name']} created");
                }
            }
            $community->refresh();
            $this->members($neo_community, $community->users);
        }
    }

    /**
     * @param Neo4jCommunity $neo_community
     * @param User[] $users
     */
    private function members($neo_community, $users)
    {
        foreach ($users as $user) {
            /** @var Neo4jUser $member */
            $member = Neo4jUser::where('oid', $user->id)->first();
            $neo_community->members()->attach($member);
            $this->info("Set user {$user->id} as community {$neo_community->name} member");
        }
    }
}
